
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Check for local ADC or provided credentials
const app = initializeApp();
const db = getFirestore();

async function createTestBooking() {
  const testOrderId = "TEST_ORDER_999";
  const docRef = await db.collection('bookings').add({
    fullName: "Test Webhook User",
    email: "webhook@test.com",
    status: "PENDING_PAYMENT",
    paypalOrderId: testOrderId,
    safariName: "Nairobi in a Morning",
    totalAmount: 190,
    depositAmount: 57,
    createdAt: new Date().toISOString()
  });

  console.log(`Created test booking: ${docRef.id} with paypalOrderId: ${testOrderId}`);
}

createTestBooking().catch(console.error);
