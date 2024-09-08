import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user);
    // 성공하면 대시보드로 리디렉션
    window.location.href = '/dashboard';
  } catch (error) {
    const errorMessage = error.message;
    document.getElementById("error-message").innerText = errorMessage;
  }
});
