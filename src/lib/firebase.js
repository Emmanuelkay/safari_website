import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace with your project's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc49UcUp86fqOZkX2cyJy33bJi6pOxFqI",
  authDomain: "safari-web-2026-10649.firebaseapp.com",
  projectId: "safari-web-2026-10649",
  storageBucket: "safari-web-2026-10649.firebasestorage.app",
  messagingSenderId: "255346497800",
  appId: "1:255346497800:web:6b91aba6106fd668b2f4bd",
  measurementId: "G-NPYHYZTXR5"
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
