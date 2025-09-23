// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,   // typo fixed: VITE_ not VIET_
  authDomain: "taskflow-ba113.firebaseapp.com",
  projectId: "taskflow-ba113",
  storageBucket: "taskflow-ba113.appspot.com",   // fix: remove `.firebasestorage.app`
  messagingSenderId: "580676384596",
  appId: "1:580676384596:web:7387e324cbfaa851edbac1",
  measurementId: "G-03BNKSRCN9"
};

const app = initializeApp(firebaseConfig);

// ✅ export these for your Login/SignUp
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
