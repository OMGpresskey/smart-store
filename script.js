import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_hAZ7WXBrJF_rNLAzJpaohtyEtn6W09k",
    authDomain: "login-a9fa2.firebaseapp.com",
    projectId: "login-a9fa2",
    storageBucket: "login-a9fa2.appspot.com",
    messagingSenderId: "144571069147",
    appId: "1:144571069147:web:4d6f3a768e9d34be2952fe",
    measurementId: "G-SSPC0WD2RW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login form submission
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                document.getElementById('loginMessage').textContent = 'Login successful!';
                document.getElementById('loginMessage').style.color = 'green';
                
                // Redirect to Inception.html
                window.location.href = 'Inception.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Please verify your email address.';
                document.getElementById('loginMessage').style.color = 'red';
            }
        } catch (error) {
            document.getElementById('loginMessage').textContent = 'Invalid email or password.';
            document.getElementById('loginMessage').style.color = 'red';
        }
    });
}

// Handle signup form submission
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);

            document.getElementById('signupMessage').textContent = 'Sign up successful! Please check your email to verify your address.';
            document.getElementById('signupMessage').style.color = 'green';
        } catch (error) {
            document.getElementById('signupMessage').textContent = 'Error during sign up: ' + error.message;
            document.getElementById('signupMessage').style.color = 'red';
        }
    });
}

// Handle Google Sign In
const provider = new GoogleAuthProvider();

if (document.getElementById('googleSignInBtn')) {
    document.getElementById('googleSignInBtn').addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            document.getElementById('loginMessage').textContent = 'Google Sign-In successful!';
            document.getElementById('loginMessage').style.color = 'green';
            
            // Redirect to Inception.html
            window.location.href = 'Inception.html';
        } catch (error) {
            document.getElementById('loginMessage').textContent = 'Google Sign-In failed: ' + error.message;
            document.getElementById('loginMessage').style.color = 'red';
        }
    });
}

// Toggle between login and signup forms
if (document.getElementById('showSignupForm')) {
    document.getElementById('showSignupForm').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupSection').style.display = 'block';
    });
}

if (document.getElementById('showLoginForm')) {
    document.getElementById('showLoginForm').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signupSection').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });
}

// Redirect user to home page after email verification
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.emailVerified) {
            // User is signed in and email is verified
            console.log('User is signed in and email is verified.');
        } else {
            // User is signed in but email is not verified
            console.log('User is signed in but email is not verified.');
        }
    }
});
