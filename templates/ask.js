// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Firebase Config (Replace with your own credentials)
const firebaseConfig = {
    apiKey: "AIzaSyB27XAakIGwqLuUwhQ3B2uUUz0gfn_JaLg",
    authDomain: "legalpathshala-d0ece.firebaseapp.com",
    projectId: "legalpathshala-d0ece",
    storageBucket: "legalpathshala-d0ece.appspot.com",
    messagingSenderId: "16024881233",
    appId: "1:16024881233:web:290d1bd4f12704cd2bd070",
    measurementId: "G-MF57ZHCRMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", async () => {
        const category = document.getElementById("category").value;
        const questionTitle = document.getElementById("questiontitle").value;
        const questionDetails = document.getElementById("questiondetails").value;
        const anonymous = document.getElementById("anonymous").checked;
        const email = document.getElementById("email").value;
        const file = document.getElementById("questionattachment").files[0];

        if (!category || !questionTitle || !questionDetails) {
            alert("Please fill out all required fields.");
            return;
        }

        console.log("Submitting question...");
        console.log("Category:", category);
        console.log("Title:", questionTitle);
        console.log("Details:", questionDetails);
        console.log("Anonymous:", anonymous);
        console.log("Email:", email);
        console.log("File selected:", file ? file.name : "No file uploaded");

        let attachmentURL = "";
        if (file) {
            try {
                console.log("Uploading file...");
                const storageRef = ref(storage, 'legal_questions/' + file.name);
                const snapshot = await uploadBytes(storageRef, file);
                attachmentURL = await getDownloadURL(snapshot.ref);
                console.log("File uploaded:", attachmentURL);
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("File upload failed. Please try again.");
                return;
            }
        }

        try {
            console.log("Saving question to Firestore...");
            await addDoc(collection(db, "legal_questions"), {
                category,
                questionTitle,
                questionDetails,
                anonymous,
                email: anonymous ? "" : email,
                attachmentURL,
                timestamp: serverTimestamp()
            });

            alert("Your question has been submitted successfully!");
            
            // Reset form fields
            document.getElementById("questiontitle").value = "";
            document.getElementById("questiondetails").value = "";
            document.getElementById("email").value = "";
            document.getElementById("category").value = "";
            document.getElementById("questionattachment").value = null; // Fix file input reset
            document.getElementById("anonymous").checked = false;
        } catch (error) {
            console.error("Error saving question:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
