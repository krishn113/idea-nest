// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiaycZXdkxDUrGEQGNT3BACI5a1g__CJw",
  authDomain: "ideanest-79280.firebaseapp.com",
  projectId: "ideanest-79280",
  storageBucket: "ideanest-79280.firebasestorage.app",
  messagingSenderId: "617329004927",
  appId: "1:617329004927:web:2087e32b66fdb37e720a4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;