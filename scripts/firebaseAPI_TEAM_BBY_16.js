import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqdewSRhZg08-Ld3qTR8koCL28eJMqc98",
  authDomain: "olympic-k.firebaseapp.com",
  projectId: "olympic-k",
  storageBucket: "olympic-k.appspot.com",
  messagingSenderId: "211145123118",
  appId: "1:211145123118:web:fbda8a9e8d8b7a4ae286bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

