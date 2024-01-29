import dotenv from "dotenv";
import { sql } from "@vercel/postgres";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import Blog from "./blog";

dotenv.config();

(async () => {
  const redirectsTable = await sql`
    SELECT * FROM redirects;
  `;

  if (redirectsTable.fields.length > 0) {
    console.log(
      "Redirects의 데이터베이스 테이블이 존재하여 새로운 테이블을 생성하지 않았습니다.",
    );
  } else {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS redirects (
          id SERIAL PRIMARY KEY,
          source VARCHAR(255) NOT NULL,
          destination VARCHAR(255) NOT NULL,
          permanent BOOLEAN NOT NULL
        );
      `;
      console.log(
        "Redirects의 데이터베이스 테이블이 성공적으로 생성되었습니다.",
      );
    } catch (error) {
      console.log("Redirects의 데이터베이스 테이블 생성에 실패했습니다.");
      console.error(error);
    }
  }

  const viewsTable = await sql`
    SELECT * FROM views;
  `;

  if (viewsTable.fields.length > 0) {
    console.log(
      "Views의 데이터베이스 테이블이 존재하여 새로운 테이블을 생성하지 않았습니다.",
    );
  } else {
    try {
      await sql`
      CREATE TABLE IF NOT EXISTS views (
        slug VARCHAR(255) NOT NULL,
        count INTEGER NOT NUll
        );
        `;
      console.log("Views의 데이터베이스 테이블이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.log("Views의 데이터베이스 테이블 생성에 실패했습니다.");
      console.error(error);
    }
  }
})();

(async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog (
        id SERIAL PRIMARY KEY,
        metdata JSONB NOT NULL,
        slug VARCHAR(255) NOT NULL,
        content TEXT NOT NULL
      );
    `;
    console.log("Blog의 데이터베이스 테이블이 성공적으로 생성되었습니다.");
  } catch (error) {
    console.log("Blog의 데이터베이스 테이블 생성에 실패했습니다.");
    console.error(error);
  }
})();

(() => {
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
  const db = getFirestore(app);

  const post = Blog.posts;
  const metadata = Blog.getMetadata();

  async function setBlogPostDoc(slug, metadata, content) {
    const postsRef = doc(db, "posts", slug);
    await setDoc(postsRef, { metadata, content });
  }

  async function setBlogMetadataDoc(metadata) {
    const metadataCollection = collection(db, "metadata");

    await addDoc(metadataCollection, metadata);
  }

  async function getBlogPostDoc(slug) {
    const docRef = doc(db, "posts", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  post.forEach(async ({ slug, metadata, content }) => {
    try {
      await setBlogPostDoc(slug, metadata, content);
    } catch (error) {
      console.error("블로그 포스트 업로드에 실패하였습니다.");
      console.error(error);
    }
  });

  metadata.forEach(async (data) => {
    try {
      await setBlogMetadataDoc(data);
    } catch (error) {
      console.error("메타데이터 업로드에 실패하였습니다.");
      console.error(error);
    }
  });
})();
