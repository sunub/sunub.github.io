// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://sunub-blog.appspot.com");

const darkHeroImageRef = ref(storage, "hero-image__dark-image.avif");
const darkBridgeRef = ref(storage, "hero-image__dark-bridge.avif");
const lightHeroImageRef = ref(storage, "hero-image__light-image.avif");
const lightBridgeRef = ref(storage, "hero-image__light-bridge.avif");

const getLightHeroImageURL = async () => {
  return {
    lightHeroImage: await getDownloadURL(lightHeroImageRef),
    lightBridge: await getDownloadURL(lightBridgeRef),
  };
};

const getDarkHeroImageURL = async () => {
  return {
    darkHeroImage: await getDownloadURL(darkHeroImageRef),
    darkBridge: await getDownloadURL(darkBridgeRef),
  };
};

export { getLightHeroImageURL, getDarkHeroImageURL };
