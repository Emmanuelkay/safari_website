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
  "http://localhost:4173",
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
  
  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials in Secret Manager.");
  }

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
  if (!response.ok) {
    console.error("[PayPal Auth] Response:", JSON.stringify(data));
    throw new Error(`PayPal Access Token Error: ${data.error_description || data.error || response.statusText}`);
  }
  return data.access_token;
}

// [The createPayPalPayment and capturePayPalPayment functions have been removed as part of the shift to client-side initiation]


/**
 * 🪝 Endpoint 3: PayPal Webhook (The Source of Truth)
 */
export const paypalWebhook = onRequest({
  secrets: [
    "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_MODE", "PAYPAL_WEBHOOK_ID"
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

  // 1. Update Booking Status in Firestore
  const bookingSnap = await admin.firestore().collection("bookings").where("ref", "==", bookingRef).limit(1).get();
  if (bookingSnap.empty) return;
  
  const bookingDoc = bookingSnap.docs[0];
  const bookingData = bookingDoc.data();
  
  const totalAmount = bookingData.totalAmount || bookingData.totalAmountUSD || 0;
  const actualPaid = parseFloat(amountPaid);
  const expectedDeposit = totalAmount * 0.3;

  // 🛡️ SECURITY: Anti-Manipulation Validation
  // Ensure the amount paid matches the expected 30% deposit (within a small margin)
  if (actualPaid < (expectedDeposit - 0.05)) {
    console.error(`[SECURITY ALERT] Possible Amount Manipulation Attempt! Ref: ${bookingRef} | Expected: ${expectedDeposit} | Paid: ${actualPaid}`);
    await bookingDoc.ref.update({
      status: 'FLAGGED_UNDERPAID',
      depositPaid: actualPaid,
      paypalCaptureId: captureId,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
    // Notify admin specifically about potential fraud/manipulation
    await notifications.sendAdminAlert(bookingData, actualPaid, true);
    return;
  }

  const balanceDue = Math.max(0, totalAmount - actualPaid);
  const newStatus = balanceDue <= 0 ? 'CONFIRMED_FULL' : 'CONFIRMED_DEPOSIT';

  await bookingDoc.ref.update({
    status: newStatus,
    depositPaid: actualPaid,
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
    notifications.sendTravelerConfirmationEmail(bookingData, actualPaid, balanceDue),
    notifications.sendAdminAlert(bookingData, actualPaid)
  ]);
}

async function handlePaymentDenied(resource) {
  const bookingRef = resource.custom_id;
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
