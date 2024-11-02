import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzeFsIugmFTvu9pdfHHz5MnDvScqsgdE0",
  authDomain: "wordle-clone-c698c.firebaseapp.com",
  projectId: "wordle-clone-c698c",
  storageBucket: "wordle-clone-c698c.appspot.com",
  messagingSenderId: "698223129106",
  appId: "1:698223129106:web:70cc8ef00ee5c1acbe1ecb",
};

const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
