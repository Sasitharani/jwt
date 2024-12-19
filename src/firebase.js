// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4W1dohbl5nfe89RvnlFQbibap8nPw85s",
    authDomain: "contests4all-6f4fc.firebaseapp.com",
    projectId: "contests4all-6f4fc",
    storageBucket: "contests4all-6f4fc.appspot.com",
    messagingSenderId: "318873810167",
    appId: "1:318873810167:web:7ddcbd46fc4ba3e9ae0ff2",
    measurementId: "G-7XSB9L9VKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, firebaseConfig };
