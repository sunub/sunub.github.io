import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWKVJ6iTVusk9SLU59d4xhJzJo5VXavOo",
  authDomain: "obsidian-database-3f9f5.firebaseapp.com",
  projectId: "obsidian-database-3f9f5",
  storageBucket: "obsidian-database-3f9f5.appspot.com",
  messagingSenderId: "782241552237",
  appId: "1:782241552237:web:cbc7662ca21da79e8c2c64",
  measurementId: "G-L9K7BW9VXF",
};

const app = initializeApp(firebaseConfig);
const storageDB = getStorage(app);
const gsRef = ref(storageDB, "gs://obsidian-database-3f9f5.appspot.com/");
