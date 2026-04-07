/**
 * 🔔 Notifications Service for Savanna & Beyond
 * Handles Email and WhatsApp alerts for Travelers and Admins.
 */

import admin from "firebase-admin";
import nodemailer from "nodemailer";

/**
 * ─── HELPERS ─────────────────────────────────
 */

function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

/**
 * ─── CORE SENDERS ────────────────────────────
 */

async function sendEmail({ to, subject, html }) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Savanna & Beyond" <expeditions@savannabeyond.co.ke>`;

  if (!user || !pass) {
    console.error("[Email] Missing SMTP user/pass. Skipping email dispatch.");
    return { success: false, error: "Missing Credentials" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html
    });
    console.log(`[Email] Success! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] Error:", error);
    return { success: false, error: error.message };
  }
}

async function sendWhatsAppMessage({ to, message }) {
  console.log(`[WhatsApp-DISABLED] Would have sent to ${to}: ${message}`);
  return { success: true, message: "WhatsApp Disabled" };
}

/**
 * ─── TRAVELER NOTIFICATIONS ──────────────────
 */

export async function sendTravelerConfirmationEmail(booking, amountPaid, balanceDue) {
  await sendEmail({
    to: booking.travelerEmail,
    subject: `✅ Booking Confirmed — ${booking.ref} | Savanna & Beyond`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 40px;">
        <img src="https://savannabeyond.co.ke/logo.png" width="180" alt="Savanna & Beyond" />
        <h1 style="color: #3D2B1F; font-size: 28px; margin-top: 32px;">Your Safari is Confirmed.</h1>
        <p style="color: #6B6158; font-size: 16px; line-height: 1.7;">
          Dear ${booking.travelerName},<br><br>
          We have received your payment and your expedition is now secured. The Mara awaits.
        </p>

        <div style="background: white; border: 1px solid #E8E0D5; border-left: 4px solid #8B6914; padding: 24px; margin: 32px 0; border-radius: 4px;">
          <p style="color: #8B6914; font-size: 11px; letter-spacing: 0.1em; margin: 0 0 16px;">BOOKING DETAILS</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #6B6158; padding: 8px 0; font-size: 14px;">Booking Reference</td>
              <td style="color: #3D2B1F; font-weight: bold; text-align: right; font-size: 14px;">${booking.ref}</td>
            </tr>
            <tr>
              <td style="color: #6B6158; padding: 8px 0; font-size: 14px;">Package</td>
              <td style="color: #3D2B1F; text-align: right; font-size: 14px;">${booking.packageName}</td>
            </tr>
            <tr>
              <td style="color: #6B6158; padding: 8px 0; font-size: 14px;">Travel Date</td>
              <td style="color: #3D2B1F; text-align: right; font-size: 14px;">${formatDate(booking.travelDate)}</td>
            </tr>
            <tr>
              <td style="color: #6B6158; padding: 8px 0; font-size: 14px;">Your Stay</td>
              <td style="color: #3D2B1F; text-align: right; font-size: 14px;">${booking.lodgeName}</td>
            </tr>
            <tr>
              <td style="color: #6B6158; padding: 8px 0; font-size: 14px;">Travelers</td>
              <td style="color: #3D2B1F; text-align: right; font-size: 14px;">${booking.travelers}</td>
            </tr>
            <tr style="border-top: 1px solid #E8E0D5;">
              <td style="color: #6B6158; padding: 12px 0 8px; font-size: 14px;">Deposit Paid</td>
              <td style="color: #8B6914; font-weight: bold; text-align: right; font-size: 16px;">$${amountPaid} USD</td>
            </tr>
            ${balanceDue > 0 ? `
            <tr>
              <td style="color: #6B6158; padding: 8px 0; font-size: 14px;">Balance Due</td>
              <td style="color: #3D2B1F; text-align: right; font-size: 14px;">$${balanceDue} USD by ${formatDate(booking.balanceDueDate)}</td>
            </tr>` : `
            <tr>
              <td colspan="2" style="color: #2D7A4F; padding: 8px 0; font-size: 14px; text-align: center;">✓ Paid in Full</td>
            </tr>`}
          </table>
        </div>

        <h2 style="color: #3D2B1F; font-size: 18px;">What Happens Next</h2>
        <ol style="color: #6B6158; font-size: 15px; line-height: 2;">
          <li>Our Nairobi team will contact you within 24 hours to finalise your itinerary</li>
          <li>You'll receive your detailed day-by-day schedule and lodge confirmation</li>
          <li>Your guide's contact details are shared 7 days before departure</li>
          ${balanceDue > 0 ? `<li>Balance of $${balanceDue} due by ${formatDate(booking.balanceDueDate)}</li>` : ''}
        </ol>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://wa.me/254718592358?text=Hi, my booking ref is ${booking.ref}" style="background: #8B6914; color: white; padding: 16px 32px; text-decoration: none; font-size: 15px; border-radius: 2px; letter-spacing: 0.05em;">WHATSAPP YOUR GUIDE TEAM</a>
        </div>

        <p style="color: #9B9189; font-size: 13px; border-top: 1px solid #E8E0D5; padding-top: 24px; margin-top: 40px;">
          Savanna & Beyond Expeditions Ltd · Nairobi, Kenya<br>
          expeditions@savannabeyond.co.ke · +254 718 592 358<br>
          Licensed by KATO · KWS Certified Guides
        </p>
      </div>
    `
  });
}

export async function sendTravelerWhatsApp(booking, amountPaid, balanceDue) {
  const message = `✅ *Booking Confirmed — Savanna & Beyond*

Hi ${booking.travelerName}! Your safari is secured 🦁

📋 *Ref:* ${booking.ref}
🌿 *Safari:* ${booking.packageName}
🏕 *Stay:* ${booking.lodgeName}
📅 *Dates:* ${formatDate(booking.travelDate)}
👥 *Travelers:* ${booking.travelers}

💰 *Deposit paid:* $${amountPaid} USD
${balanceDue > 0 ? `⏳ *Balance due:* $${balanceDue} by ${formatDate(booking.balanceDueDate)}` : `✓ *Paid in full*`}

Our Nairobi team will be in touch within 24 hours to finalise your itinerary.

Questions? Reply to this message anytime.

_Savanna & Beyond · expeditions@savannabeyond.co.ke_`;

  await sendWhatsAppMessage({ to: booking.travelerWhatsApp, message });
}

export async function sendPaymentFailedEmail(booking) {
  await sendEmail({
    to: booking.travelerEmail,
    subject: `⚠️ Payment Action Required — ${booking.ref} | Savanna & Beyond`,
    html: `<p>Dear ${booking.travelerName}, we were unable to process your payment for booking ${booking.ref}. Please try again or contact us for assistance.</p>`
  });
}

/**
 * ─── ADMIN NOTIFICATIONS ─────────────────────
 */

export async function sendAdminAlert(booking, amountPaid, isFraud = false) {
  const expectedDeposit = (booking.totalAmount || booking.totalAmountUSD || 0) * 0.3;
  const adminMessage = isFraud 
    ? `🚨 *SECURITY ALERT: POSSIBLE FRAUD* 🚨\n\n*Amount Manipulation Attempt Detected via External Tool (e.g. Burp Suite)!*\n\n*Ref:* ${booking.ref}\n*Guest:* ${booking.travelerName}\n*Amount Captured:* $${amountPaid} USD\n*Required Deposit:* $${expectedDeposit.toFixed(2)} USD\n\n⚠️ *Action:* Do NOT confirm this booking. Verify the transaction in the PayPal dashboard immediately.`
    : `💰 *NEW PAYMENT RECEIVED*\n\n*Ref:* ${booking.ref}\n*Guest:* ${booking.travelerName}\n*Package:* ${booking.packageName}\n*Travel date:* ${formatDate(booking.travelDate)}\n*Amount paid:* $${amountPaid} USD (PayPal)\n*Traveler email:* ${booking.travelerEmail}\n*Traveler WhatsApp:* ${booking.travelerWhatsApp}\n\nAction required: Send itinerary within 24 hours.\nDashboard: https://savannabeyond.co.ke/admin/bookings/${booking.ref}`;

  await sendEmail({
    to: 'expeditions@savannabeyond.co.ke',
    subject: isFraud ? `🚨 FRAUD ALERT — ${booking.ref} — $${amountPaid}` : `💰 Payment Received — ${booking.ref} — $${amountPaid}`,
    html: `<p>${adminMessage.replace(/\n/g, '<br>')}</p>`
  });
}

/**
 * ─── SCHEDULER ───────────────────────────────
 */

export async function scheduleBalanceReminder(booking, balanceDue, balanceDueDate) {
  if (balanceDue <= 0) return;
  console.log(`[Scheduler] Scheduling balance reminder for ${booking.ref} on ${balanceDueDate}`);
  // Implementation: Use Google Cloud Tasks or a simple Firestore collection for a CRON job
}
