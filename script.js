//DEPENDENCIES
var startContainer = document.getElementById('start-container');
var quizContainer = document.getElementById('quiz-container');
// var timerEl = document.getElementById('timer');
var startButtonEl = document.getElementById("start-button");
var questionEl = document.getElementById('question');
var answerOptionsEl = document.getElementById('answer-options');
var submitButtonEl = document.getElementById('submit-answer');
var resultEl = document.getElementById('result');

//DATA
var questions = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
  { question: "What is the capital of France?", answers: ["Paris", "London", "Rome"], correct: "Paris" },
  { question: "Who wrote Hamlet?", answers: ["Shakespeare", "Dickens", "Chaucer"], correct: "Shakespeare" }
];
var currentQuestionIndex = 0;
var score = 0;

//FUNCTIONS
function init() {
  startQuiz();
  
  
};
 
function startQuiz() {
  console.log('Start Quiz button clicked');
  startContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  displayQuestion();
  
};

// function timerFunction() {
//   var secondsRemaining = 10;
//   var timer = setInterval(function() {
//     if (secondsRemaining <= 0) {
//       clearInterval(timer);
//       timerEl.textContent = "Time's up!";
//       } else {
//       timerEl.textContent = secondsRemaining + ' seconds remaining';
//       secondsRemaining--;
//       }
//     }, 1000);
// };


function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex]
      questionEl.textContent = currentQuestion.question;
      answerOptionsEl.innerHTML = '';
      currentQuestion.answers.forEach(function(answer) {
        var liEl = document.createElement('li');
            liEl.textContent = answer;
            liEl.addEventListener('click', selectAnswer);
            answerOptionsEl.appendChild(liEl);
    });
};

function selectAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var correctAnswer = questions[currentQuestionIndex].correct;

  if (selectedAnswer === correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  }
  else {
    showResults();

  }
};

function showResults() {
  questionEl.style.display = 'none';
  answerOptionsEl.style.display = 'none';
  submitButtonEl.style.display = 'none';
  resultEl.textContent = "Your score: " + score + "/" + questions.length
}

//USER INTERACTION
 startButtonEl.addEventListener('click', startQuiz);
submitButtonEl.addEventListener('click', selectAnswer);

//INITIALIZATION
init();
