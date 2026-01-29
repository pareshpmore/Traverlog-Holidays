import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS5rq36ljJP9sJ16XgpE45Ot0ezoONHAw",
  authDomain: "travelog-holiday.firebaseapp.com",
  projectId: "travelog-holiday",
  storageBucket: "travelog-holiday.firebasestorage.app",
  messagingSenderId: "251438869616",
  appId: "1:251438869616:web:81d6e49fa35bff2cd698b5",
  measurementId: "G-V4G85VGJ2Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
