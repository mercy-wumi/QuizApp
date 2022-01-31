const startBtn = document.querySelector('#start-btn');
const quiz = document.querySelector('#quiz');
const instruction = document.querySelector('.instruction');
const question = document.getElementById('question');
const optionOne = document.getElementById('optionOne');
const optionTwo = document.getElementById('optionTwo');
const optionThree = document.getElementById('optionThree');
const optionFour = document.getElementById('optionFour');
const optionFive = document.getElementById('optionFive');
const timer = document.getElementById('timer');
const progress = document.getElementById('progress');
const result = document.getElementById('result');
const scoreResult = document.getElementById('my-results')
const reset = document.querySelector('.restart-btn')
const chooseOption = document.querySelectorAll('.btn-option')

let allQuestions = [
    {
        question: 'Which of the following is not a git command?',
        answers: {
            optOne: 'git clone',
            optTwo: 'git pull',
            optThree: 'git mega',
            optFour: 'git add',
            optFive: 'git checkout'
        },
        correctAnswer: 'git mega'
    },
    {
        question: 'The following are programming languages except?',
        answers: {
            optOne: 'Javascript',
            optTwo: 'python',
            optThree: 'C++',
            optFour: 'Java',
            optFive: 'CSS'
        },
        correctAnswer: 'CSS'
    },
    {
        question: 'One of the following is not a javascript library',
        answers: {
            optOne: 'ReactJs',
            optTwo: 'Angular',
            optThree: 'Vue',
            optFour: 'Jquery',
            optFive: 'Django'
        },
        correctAnswer: 'Django'
    },
    {
        question: 'Frontend stacks are these except',
        answers: {
            optOne: 'Nodejs',
            optTwo: 'HTML',
            optThree: 'CSS',
            optFour: 'Vanilla JS',
            optFive: 'ReactJS'
        },
        correctAnswer: 'Nodejs'
    },
    {
        question: 'The following are tech opportunities except',
        answers: {
            optOne: 'Software Engineer',
            optTwo: 'Full stack Engineer',
            optThree: 'Backend Engineer',
            optFour: 'Frontend Engineer',
            optFive: 'Content Creator'
        },
        correctAnswer: 'Content Creator'
    }
];

let time = 10;
let counter;
let score = 0;
let loadQuestion = 0;
const lastQuestion = allQuestions.length - 1;

const renderQuestion = () => {
    let quizallQuestions = allQuestions[loadQuestion];
    question.innerHTML = quizallQuestions.question;
    optionOne.innerHTML = quizallQuestions.answers.optOne;
    optionTwo.innerHTML = quizallQuestions.answers.optTwo;
    optionThree.innerHTML = quizallQuestions.answers.optThree;
    optionFour.innerHTML = quizallQuestions.answers.optFour;
    optionFive.innerHTML = quizallQuestions.answers.optFive;

    for (let i = 0; i < chooseOption.length; i++) {
        chooseOption[i].setAttribute('onclick', 'checkAnswer(this)')
    }
}

const renderProgress = () => {
    for (let i = 0; i <= lastQuestion; i++) {
        progress.innerHTML += '<div class="progressBtn" id= ' + i + '></div>';
    }
}

function timerQuiz() {
    timer.textContent = time + 's';
    time--;

    timer.style.color = 'black'
    if (time < 9) {
        let addZero = timer.textContent;
        timer.textContent = "0" + addZero;
    }
    if (time < 4) {
        timer.style.color = 'red';
    }
    if (time < 0) {
        if (loadQuestion < lastQuestion) {
            time = 10
            increaseProgress()
            loadQuestion++;
            renderQuestion();

        } else {
            clearInterval(counter);
            renderResult();
        }
    }
}
function increaseProgress() {
    document.getElementById(loadQuestion).style.backgroundColor = 'teal'
}

const checkAnswer = (answer) => {
    increaseProgress()

    let userAns = answer.textContent;
    let correctAns = allQuestions[loadQuestion].correctAnswer;
    answer.classList.add('selected')
    if (userAns === correctAns) {
        score += 1;
    }
    time = 10
    if (loadQuestion < lastQuestion) {
        loadQuestion++;
        answer.classList.remove('selected')
        renderQuestion()
    }
    else {
        clearInterval(counter)
        renderResult()
    }
}

const renderResult = () => {
    quiz.style.display = 'none';
    result.style.display = 'block'
    scoreResult.innerHTML = score + ' / 5'
}

const startQuiz = () => {
    instruction.style.display = 'none';
    renderQuestion(loadQuestion);
    timerQuiz();
    clearInterval(counter)
    quiz.style.display = 'flex';
    renderProgress();
    counter = setInterval(timerQuiz, 1000)


}

startBtn.addEventListener('click', startQuiz)
