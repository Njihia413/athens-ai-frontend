// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5CMvx0DBDrI4R0gvKHkbV_zMkIQebW98",
    authDomain: "athens-ai.firebaseapp.com",
    projectId: "athens-ai",
    storageBucket: "athens-ai.firebasestorage.app",
    messagingSenderId: "1050800448792",
    appId: "1:1050800448792:web:8f74ff3649472a7492aa6d",
    measurementId: "G-H9WSGWT93W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
