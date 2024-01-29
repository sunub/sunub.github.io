// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLsNVaJMGq_PXdn7ORGqMPvX0ls8bpf8A",
  authDomain: "sunub-blog.firebaseapp.com",
  databaseURL:
    "https://sunub-blog-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sunub-blog",
  storageBucket: "sunub-blog.appspot.com",
  messagingSenderId: "500147997868",
  appId: "1:500147997868:web:f13bd764a034de62d92309",
  measurementId: "G-CPS9PG4E6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
