const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High tech modern language", correct: false },
            { text: "Hyperlinks and Text management", correct: false},
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which property is used to change background color in CSS?",
        answers: [            
            { text: "color", correct: false },
            { text: "background-color", correct: true },
            { text: "bgcolor", correct: false },
            { text: "text-color", correct: false }
        ]
    },
    {
        question: "Which of the following is a javascript framework?",
        answers: [
            { text: "Django", correct: false },
            { text: "Laravel", correct: false },
            { text: "React", correct: true },
            { text: "Flask", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style System", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true }
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "<style>", correct: true }, 
            { text: "<css>", correct: false },
            { text: "<script>", correct: false },
            { text: "<link>", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        answers: [
            { text: "String", correct: false },
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Character", correct: true }
        ]
    },
    {
        question: "Which of the following is used to create a hyperlink in HTML?",
        answers: [
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "<hyperlink>", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a valid CSS selector?",
        answers: [
            { text: ".class", correct: false },
            { text: "#id", correct: false },
            { text: "*", correct: false },
            { text: "!element", correct: true }
        ]
    },
    {
        question: "Which of the following is used to define a function in JavaScript?",
        answers: [
            { text: "function", correct: true },
            { text: "def", correct: false },
            { text: "func", correct: false },
            { text: "define", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a valid HTML element?",
        answers: [
            { text: "<div>", correct: false },
            { text: "<span>", correct: false },
            { text: "<section>", correct: false },
            { text: "<block>", correct: true }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add('correct'); 
        score++;
    } else {
        selectedBtn.classList.add('wrong'); 
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        
        setTimeout(showScore, 1000); 
    }
}

function showScore() {
    resetState();
    questionElement.innerText = "Quiz Finished!";
    finalScoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
    scoreContainer.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

document.getElementById('restart-btn').addEventListener('click', startQuiz);

startQuiz();