// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Firebase Authentication 추가

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA00d9FP3IKaMUtbv9XuktEF20hBBwGLIs",
  authDomain: "smat-store.firebaseapp.com",
  projectId: "smat-store",
  storageBucket: "smat-store.appspot.com",
  messagingSenderId: "879265156297",
  appId: "1:879265156297:web:526c169c842fa02f785118",
  measurementId: "G-NBN6H2Q0M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Firebase Authentication 초기화

export { auth };
