// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VIET_FIREBASE_APIKEY,
  authDomain: "taskflow-ba113.firebaseapp.com",
  projectId: "taskflow-ba113",
  storageBucket: "taskflow-ba113.firebasestorage.app",
  messagingSenderId: "580676384596",
  appId: "1:580676384596:web:7387e324cbfaa851edbac1",
  measurementId: "G-03BNKSRCN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);