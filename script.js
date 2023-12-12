//DEPENDENCIES
var timerEl = document.getElementById('timer');
var startButtonEl = document.getElementById("start-quiz");
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
  
};


function timerFunction() {
  var secondsRemaining = 10;
  var timer = setInterval(function() {
    if (secondsRemaining <= 0) {
      clearInterval(timer);
      timerEl.textContent = "Time's up!";
      } else {
      timerEl.textContent = secondsRemaining + ' seconds remaining';
      secondsRemaining--;
      }
    }, 1000);
  };


function startButtonFunction() {
  console.log('Start Quiz button clicked');
  timerFunction();
};


function submitButtonFunction() {
  // Code for what happens when submit is clicked
  console.log('Submit button clicked');
  
};


function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex]

    questionEl.textContent = currentQuestion.question;
    answerOptionsEl.innerHTML = '';
    // currentQuestion.answers.forEach




};


//USER INTERACTION
startButtonEl.addEventListener('click', startButtonFunction);
submitButtonEl.addEventListener('click', submitButtonFunction);



//INITIALIZATION
init();
