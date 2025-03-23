// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Config (Replace with your own Firebase credentials)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB27XAakIGwqLuUwhQ3B2uUUz0gfn_JaLg",
    authDomain: "legalpathshala-d0ece.firebaseapp.com",
    projectId: "legalpathshala-d0ece",
    storageBucket: "legalpathshala-d0ece.firebasestorage.app",
    messagingSenderId: "16024881233",
    appId: "1:16024881233:web:290d1bd4f12704cd2bd070",
    measurementId: "G-MF57ZHCRMG"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// Handle Subscribe Button Click
document.getElementById("subscribeBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();

    if (email) {
        try {
            await addDoc(collection(db, "newsletter_subscribers"), {
                email: email,
                subscribedAt: new Date()
            });
            alert("Subscribed successfully!");
        } catch (error) {
            console.error("Error subscribing: ", error);
        }
    } else {
        alert("Please enter a valid email!");
    }
});



