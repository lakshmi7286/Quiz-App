const question = [
    {
        question: "What is the time complexity of Binary Search in a sorted array?",
        answer: [
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n log n)", correct: false },
            { text: "O(1)", correct: false }
        ]
    },
    {
        question: "Which data structure uses the FIFO (First In First Out) principle?",
        answer: [
            { text: "Stack", correct: false },
            { text: "Tree", correct: false },
            { text: "Queue", correct: true },
            { text: "Graph", correct: false }
        ]
    },
    {
        question: "Which of the following sorting algorithms has the best average-case time complexity?",
        answer: [
            { text: "Bubble Sort", correct: false },
            { text: "Selection Sort", correct: false },
            { text: "Insertion Sort", correct: false },
            { text: "Merge Sort", correct: true }
        ]
    },
    {
        question: "What is the maximum number of children a binary tree node can have?",
        answer: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "Unlimited", correct: false }
        ]
    },
    {
        question: "Which data structure is used for implementing recursion?",
        answer: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handledNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handledNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
