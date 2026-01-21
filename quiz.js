
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

const questions = [
    {
        q: "Which language runs in a web browser?",
        options: ["Python", "C", "JavaScript", "Java"],
        ans: 2
    },
    {
        q: "What does HTML stand for?",
        options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "None of these"
        ],
        ans: 1
    },
    {
        q: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "#", "**"],
        ans: 1
    }
];

let index = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const quizBox = document.getElementById("quizBox");

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = `⏱ ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱ ${timeLeft}s`;

        if (timeLeft <= 5) timerEl.style.color = "yellow";
        else timerEl.style.color = "white";

        if (timeLeft === 0) {
            clearInterval(timer);
            autoSubmit();
        }
    }, 1000);
}

function loadQuestion() {
    startTimer();
    nextBtn.disabled = true;
    optionsEl.innerHTML = "";

    const q = questions[index];
    questionEl.textContent = q.q;
    scoreEl.textContent = `Score: ${score}`;

    progressFill.style.width =
        ((index) / questions.length) * 100 + "%";

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = opt;
        div.onclick = () => checkAnswer(div, i);
        optionsEl.appendChild(div);
    });
}

function checkAnswer(selected, i) {
    clearInterval(timer);
    const correct = questions[index].ans;
    const options = document.querySelectorAll(".option");

    options.forEach(o => o.onclick = null);

    if (i === correct) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("wrong");
        selected.style.animation = "shake 0.3s";
        options[correct].classList.add("correct");
    }

    scoreEl.textContent = `Score: ${score}`;
    nextBtn.disabled = false;
}

function autoSubmit() {
    const correct = questions[index].ans;
    document.querySelectorAll(".option")[correct].classList.add("correct");
    nextBtn.disabled = false;
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    progressFill.style.width = "100%";

    quizBox.innerHTML = `
        <h2>Quiz Completed</h2>
        <p style="font-size:20px">Final Score: <b>${score}/${questions.length}</b></p>
        <button onclick="location.href='home.html'">Back to Home</button>
    `;
}

loadQuestion();
