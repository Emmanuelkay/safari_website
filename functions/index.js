import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import admin from "firebase-admin";
import { getDataConnect } from "firebase-admin/data-connect";
import * as notifications from "./notifications.js";

admin.initializeApp();

const dataConnect = getDataConnect({
  serviceId: "safariwebsite",
  location: "us-east4"
});

setGlobalOptions({ region: "us-central1" });

const PAYPAL_API = process.env.PAYPAL_MODE === "live" 
  ? "https://api-m.paypal.com" 
  : "https://api-m.sandbox.paypal.com";

const allowedOrigins = [
  "http://localhost:5173",
  "https://safari-web-2026-10649.web.app",
  "https://safari-web-2026-10649.firebaseapp.com",
  "https://savannabeyond.co.ke"
];

/**
 * 🔐 Helper: Get PayPal OAuth token
 */
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to get PayPal access token");
  return data.access_token;
}

/**
 * 📝 Endpoint 1: Create PayPal Order
 */
export const createPayPalPayment = onCall({
  secrets: [
    "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_MODE",
    "TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_NUMBER"
  ],
  cors: allowedOrigins,
}, async (request) => {
  const { 
    bookingRef, 
    packageName, 
    amountUSD, 
    paymentType, 
    travelerEmail, 
    travelerName,
    travelers,
    travelDate
  } = request.data;

  // 1. Validate Booking in Firestore
  const bookingSnap = await admin.firestore().collection("bookings")
    .where("ref", "==", bookingRef)
    .limit(1)
    .get();

  if (bookingSnap.empty) {
    throw new HttpsError("not-found", "Booking reference not found.");
  }

  const booking = bookingSnap.docs[0].data();
  const allowedStatuses = ['ENQUIRY', 'QUOTE_SENT', 'DEPOSIT_PENDING', 'INITIATED'];
  if (!allowedStatuses.includes(booking.status)) {
    throw new HttpsError("failed-precondition", "Booking is not in a payable state.");
  }

  try {
    const accessToken = await getPayPalAccessToken();

    // 2. Create PayPal Order
    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: bookingRef,
        description: `${packageName} — ${paymentType === 'deposit' ? '30% Deposit' : 'Full Payment'} | Savanna & Beyond`,
        custom_id: bookingRef,
        soft_descriptor: 'SAVANNA&BEYOND',
        amount: {
          currency_code: 'USD',
          value: amountUSD.toFixed(2),
          breakdown: {
            item_total: { currency_code: 'USD', value: amountUSD.toFixed(2) }
          }
        },
        items: [{
          name: packageName,
          description: `${paymentType === 'deposit' ? '30% deposit' : 'Full payment'} — ${travelers} traveler(s), departing ${travelDate}`,
          unit_amount: { currency_code: 'USD', value: amountUSD.toFixed(2) },
          quantity: '1',
          category: 'DIGITAL_GOODS'
        }]
      }],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'Savanna & Beyond',
            locale: 'en-US',
            landing_page: 'LOGIN',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: `${process.env.APP_BASE_URL || "https://savannabeyond.co.ke"}/booking/confirmation?ref=${bookingRef}`,
            cancel_url: `${process.env.APP_BASE_URL || "https://savannabeyond.co.ke"}/booking/cancelled?ref=${bookingRef}`
          }
        }
      }
    };

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `${bookingRef}-${Date.now()}`,
      },
      body: JSON.stringify(orderPayload)
    });

    const order = await response.json();
    if (!response.ok) throw new Error(order.message || "Failed to create PayPal order.");

    // 3. Save PENDING record to Data Connect
    const mutation = `
      mutation CreatePayment($amount: Float!, $currency: String!, $status: String!, $paymentMethod: String!, $bookingRef: String!, $travelerEmail: String, $travelerName: String, $paymentType: String, $paypalOrderId: String) {
        payment_insert(data: {
          amount: $amount,
          currency: $currency,
          status: $status,
          paymentMethod: $paymentMethod,
          bookingRef: $bookingRef,
          travelerEmail: $travelerEmail,
          travelerName: $travelerName,
          paymentType: $paymentType,
          paypalOrderId: $paypalOrderId
        })
      }
    `;

    await dataConnect.executeGraphql(mutation, {
      variables: {
        amount: parseFloat(amountUSD),
        currency: 'USD',
        status: 'PENDING',
        paymentMethod: 'PayPal',
        bookingRef,
        travelerEmail,
        travelerName,
        paymentType,
        paypalOrderId: order.id
      }
    });

    // 4. Update Booking status to INITIATED
    await bookingSnap.docs[0].ref.update({
      status: 'INITIATED',
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });

    return { orderID: order.id };
  } catch (error) {
    console.error("PayPal Order Creation Failed:", error);
    throw new HttpsError("internal", error.message || "Payment initiation failed.");
  }
});

/**
 * 💳 Endpoint 2: Capture PayPal Order
 */
export const capturePayPalPayment = onCall({
  secrets: ["PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_MODE"],
  cors: allowedOrigins,
}, async (request) => {
  const { orderID, bookingRef } = request.data;

  try {
    const accessToken = await getPayPalAccessToken();

    // 1. Capture the payment
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": `capture-${orderID}`
      },
    });

    const captureData = await response.json();
    if (!response.ok) {
       // Mark failed in DB
       const mutation = `
         mutation UpdatePaymentStatus($paypalOrderId: String!, $status: String!) {
           payment_update(where: { paypalOrderId: { eq: $paypalOrderId } }, data: { status: $status })
         }
       `;
       await dataConnect.executeGraphql(mutation, { variables: { paypalOrderId: orderID, status: 'FAILED' } });
       throw new Error(captureData.message || "Payment capture failed.");
    }

    const captureId = captureData.purchase_units[0].payments.captures[0].id;
    const captureStatus = captureData.purchase_units[0].payments.captures[0].status;

    // 2. Update status to AWAITING_WEBHOOK
    const mutation = `
      mutation UpdatePaymentStatus($paypalOrderId: String!, $status: String!, $paypalCaptureId: String, $captureStatus: String) {
        payment_update(where: { paypalOrderId: { eq: $paypalOrderId } }, data: { 
          status: $status, 
          paypalCaptureId: $paypalCaptureId, 
          captureStatus: $captureStatus 
        })
      }
    `;
    await dataConnect.executeGraphql(mutation, {
      variables: {
        paypalOrderId: orderID,
        status: 'AWAITING_WEBHOOK',
        paypalCaptureId: captureId,
        captureStatus: captureStatus
      }
    });

    return { status: 'PROCESSING', orderID, captureID: captureId };
  } catch (error) {
    console.error("PayPal Capture Failed:", error);
    throw new HttpsError("internal", error.message || "Payment verification failed.");
  }
});

/**
 * 🪝 Endpoint 3: PayPal Webhook (The Source of Truth)
 */
export const paypalWebhook = onRequest({
  secrets: [
    "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_MODE", "PAYPAL_WEBHOOK_ID",
    "TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_NUMBER", "ADMIN_WHATSAPP_NUMBER",
    "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"
  ],
}, async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");

  const event = req.body;
  const headers = req.headers;

  // 1. Verify Signature
  const isValid = await verifyPayPalWebhookSignature({
    webhookId: process.env.PAYPAL_WEBHOOK_ID,
    webhookEvent: event,
    headers: {
      'paypal-auth-algo': headers['paypal-auth-algo'],
      'paypal-cert-url': headers['paypal-cert-url'],
      'paypal-transmission-id': headers['paypal-transmission-id'],
      'paypal-transmission-sig': headers['paypal-transmission-sig'],
      'paypal-transmission-time': headers['paypal-transmission-time']
    }
  });

  if (!isValid) {
    console.error("Invalid Webhook Signature");
    return res.status(401).send("Unauthorized");
  }

  // 2. Immediate Ack
  res.status(200).send({ received: true });

  // 3. Process Async
  try {
    const resource = event.resource;
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentSuccess(resource);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePaymentDenied(resource);
        break;
      case 'PAYMENT.CAPTURE.REVERSED':
      case 'PAYMENT.CAPTURE.REFUNDED':
        console.log(`Payment reversed/refunded: ${resource.id}`);
        break;
      default:
        console.log(`Unhandled Webhook Event: ${event.event_type}`);
    }
  } catch (err) {
    console.error("Webhook Processing Error:", err);
  }
});

/**
 * ──────────────────────────────────────────────
 * HANDLERS
 * ──────────────────────────────────────────────
 */

async function handlePaymentSuccess(resource) {
  const bookingRef = resource.custom_id;
  const captureId = resource.id;
  const amountPaid = resource.amount.value;

  // Idempotency check: Look up payment by captureId
  const query = `query GetPayment($paypalCaptureId: String!) { payments(where: { paypalCaptureId: { eq: $paypalCaptureId } }) { id status } }`;
  const result = await dataConnect.executeGraphql(query, { variables: { paypalCaptureId: captureId } });
  
  if (result.data?.payments?.[0]?.status === 'CONFIRMED') {
     console.log(`Payment ${captureId} already processed.`);
     return;
  }

  // 1. Update Payment Status in Data Connect
  const mutation = `
    mutation ConfirmPayment($paypalCaptureId: String!, $status: String!, $paypalEventId: String, $amountConfirmed: Float, $confirmedAt: Timestamp) {
      payment_update(where: { paypalCaptureId: { eq: $paypalCaptureId } }, data: {
        status: $status,
        paypalEventId: $paypalEventId,
        amountConfirmed: $amountConfirmed,
        confirmedAt: $confirmedAt
      })
    }
  `;
  await dataConnect.executeGraphql(mutation, {
    variables: {
      paypalCaptureId: captureId,
      status: 'CONFIRMED',
      paypalEventId: resource.id,
      amountConfirmed: parseFloat(amountPaid),
      confirmedAt: new Date().toISOString()
    }
  });

  // 2. Update Booking Status in Firestore
  const bookingSnap = await admin.firestore().collection("bookings").where("ref", "==", bookingRef).limit(1).get();
  if (bookingSnap.empty) return;
  
  const bookingDoc = bookingSnap.docs[0];
  const bookingData = bookingDoc.data();
  
  const totalAmount = bookingData.totalAmountUSD || 0;
  const balanceDue = Math.max(0, totalAmount - parseFloat(amountPaid));
  const newStatus = balanceDue <= 0 ? 'CONFIRMED_FULL' : 'CONFIRMED_DEPOSIT';

  await bookingDoc.ref.update({
    status: newStatus,
    depositPaid: parseFloat(amountPaid),
    depositPaidAt: admin.firestore.FieldValue.serverTimestamp(),
    balanceDue: balanceDue,
    paymentMethod: 'PAYPAL',
    paypalCaptureId: captureId,
    lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    activityLog: admin.firestore.FieldValue.arrayUnion({
      event: 'PAYMENT_CONFIRMED',
      amount: amountPaid,
      method: 'PayPal',
      timestamp: new Date().toISOString()
    })
  });

  // 3. Trigger Notifications
  await Promise.allSettled([
    notifications.sendTravelerConfirmationEmail(bookingData, amountPaid, balanceDue),
    notifications.sendTravelerWhatsApp(bookingData, amountPaid, balanceDue),
    notifications.sendAdminAlert(bookingData, amountPaid)
  ]);
}

async function handlePaymentDenied(resource) {
  const bookingRef = resource.custom_id;
  const query = `mutation FailPayment($paypalCaptureId: String!, $status: String!, $deniedAt: Timestamp) { 
    payment_update(where: { paypalCaptureId: { eq: $paypalCaptureId } }, data: { status: $status, deniedAt: $deniedAt }) 
  }`;
  await dataConnect.executeGraphql(query, { 
    variables: { paypalCaptureId: resource.id, status: 'DENIED', deniedAt: new Date().toISOString() } 
  });

  const bookingSnap = await admin.firestore().collection("bookings").where("ref", "==", bookingRef).limit(1).get();
  if (!bookingSnap.empty) {
    await bookingSnap.docs[0].ref.update({ status: 'PAYMENT_FAILED' });
    const booking = bookingSnap.docs[0].data();
    await notifications.sendPaymentFailedEmail(booking);
  }
}

async function verifyPayPalWebhookSignature({ webhookId, webhookEvent, headers }) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      auth_algo: headers['paypal-auth-algo'],
      cert_url: headers['paypal-cert-url'],
      transmission_id: headers['paypal-transmission-id'],
      transmission_sig: headers['paypal-transmission-sig'],
      transmission_time: headers['paypal-transmission-time'],
      webhook_id: webhookId,
      webhook_event: webhookEvent
    })
  });
  const data = await response.json();
  return data.verification_status === 'SUCCESS';
}

/**
 * 🔍 Endpoint 4: Get Booking Payment Status (for polling)
 */
export const getBookingPaymentStatus = onCall({
  cors: allowedOrigins,
}, async (request) => {
  const { bookingRef } = request.data;
  if (!bookingRef) throw new HttpsError("invalid-argument", "Booking reference is required.");

  const bookingSnap = await admin.firestore().collection("bookings")
    .where("ref", "==", bookingRef)
    .limit(1)
    .get();

  if (bookingSnap.empty) throw new HttpsError("not-found", "Booking not found.");
  
  return { status: bookingSnap.docs[0].data().status };
});
