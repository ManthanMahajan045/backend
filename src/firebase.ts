import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Shared RoadSense Firebase project. Environment variables can override these
// values for local/staging environments.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDrvaJONaD-CK2_W1dLkUA-NtwhFBChPkU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "road-sense-bca4e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "road-sense-bca4e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "road-sense-bca4e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1032531366359",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1032531366359:web:4855fc7461fbb3d4c13b92",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
