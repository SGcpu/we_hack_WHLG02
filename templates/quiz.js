// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Config (Replace with your credentials)
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

// Store the selected quiz
let selectedQuiz = null;

// Function to Display Quizzes
function displayQuizzes() {
    const quizListDiv = document.getElementById("quizList");

    quizzes.forEach(quiz => {
        const quizDiv = document.createElement("div");
        quizDiv.innerHTML = `<h3>${quiz.title}</h3> <button onclick="startQuiz('${quiz.quizId}')">Start Quiz</button>`;
        quizListDiv.appendChild(quizDiv);
    });
}

// Function to Start Quiz
window.startQuiz = (quizId) => {
    selectedQuiz = quizzes.find(q => q.quizId === quizId);
    if (!selectedQuiz) return;

    document.getElementById("quizTitle").innerText = selectedQuiz.title;
    document.getElementById("quizList").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    
    renderQuiz();
};

// Function to Render Quiz Questions
function renderQuiz() {
    const quizForm = document.getElementById("quizForm");
    quizForm.innerHTML = ""; // Clear existing content

    selectedQuiz.questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;

        q.options.forEach((option, optionIndex) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `q${index}`;
            input.value = optionIndex;
            questionDiv.appendChild(input);

            const label = document.createElement("label");
            label.textContent = ` ${option}`;
            questionDiv.appendChild(label);

            questionDiv.appendChild(document.createElement("br"));
        });

        quizForm.appendChild(questionDiv);
    });
}

// Function to Submit Quiz
document.getElementById("submitQuiz").addEventListener("click", async () => {
    if (!selectedQuiz) {
        alert("No quiz selected!");
        return;
    }

    const responses = {};

    selectedQuiz.questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        responses[`q${index + 1}`] = selectedOption ? parseInt(selectedOption.value) : null;
    });

    try {
        await addDoc(collection(db, "quiz_responses"), {
            quizId: selectedQuiz.quizId,
            quizTitle: selectedQuiz.title,
            responses,
            submittedAt: new Date()
        });

        alert("Quiz submitted successfully!");
    } catch (error) {
        console.error("Error submitting quiz:", error);
        alert("Error submitting quiz.");
    }
});

// Load quizzes on page load
displayQuizzes();
