// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "./env.mjs";
import {
  getFirestore,
  initializeFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import Blog from "./blog";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABSE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { useFetchStreams: false });

export default db;
