import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Shared RoadSense Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyDrvaJONaD-CK2_WldLkUA-NtwhFBChPkU",
  authDomain: "road-sense-bca4e.firebaseapp.com",
  projectId: "road-sense-bca4e",
  storageBucket: "road-sense-bca4e.firebasestorage.app",
  messagingSenderId: "1032531366359",
  appId: "1:1032531366359:web:4855fc7461fbb3d4c13b92",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
