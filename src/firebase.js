// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTX3fB5ma_MiSS3ftfGfeLitbpMvA3M6g",
  authDomain: "hooshjoo-test.firebaseapp.com",
  projectId: "hooshjoo-test",
  storageBucket: "hooshjoo-test.firebasestorage.app",
  messagingSenderId: "263592477990",
  appId: "1:263592477990:web:c8e6e9395ac435b1b9ade7",
  measurementId: "G-4FVBCR3P0Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);