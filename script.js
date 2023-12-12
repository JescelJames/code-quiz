////DEPENDENCIES
var startContainer = document.getElementById('start-container');
var quizContainer = document.getElementById('quiz-container');
var timerEl = document.getElementById('timer');
var startButtonEl = document.getElementById("start-button");
var questionEl = document.getElementById('question');
var answerOptionsEl = document.getElementById('answer-options');
var submitButtonEl = document.getElementById('submit-answer');
var resultEl = document.getElementById('result');

////DATA
var questionsObj = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
  { question: "What is the capital of France?", answers: ["Paris", "London", "Rome"], correct: "Paris" },
  { question: "Who wrote Hamlet?", answers: ["Shakespeare", "Dickens", "Chaucer"], correct: "Shakespeare" }
];
var currentQuestionIndexVar = 0;
var score = 0;

////FUNCTIONS
function initFunc() { //clicking the start button starts the startQuiz function.
  startButtonEl.addEventListener('click', startQuiz);  //clicking startButtonEl starts starQuiz function.
};
 
function startQuiz() {  //once startButtonEl inside init() is clicked...
  console.log('Start Quiz button clicked');  //it tests if startButtonEl works, then...
  startContainer.style.display = 'none';  //start-container div gets cleared...
  quizContainer.style.display = 'block';  //quiz-container div begins...
  timerFunction();  // and the timer starts in the backgroud...
  displayQuestion();  // along with the displaying of questions.
  
};

function timerFunction() {  //this timer is called inside startQuiz...
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

function displayQuestion() {  //this displays the questions
  if (currentQuestion >= questionsObj.length) {
      clearInterval(timerEl);
      showResults();
      return;
  }
  var currentQuestion = questionsObj[currentQuestionIndexVar]
      questionEl.textContent = currentQuestion.question;
      answerOptionsEl.innerHTML = '';

      currentQuestion.answers.forEach(function(answer) {
        var liEl = document.createElement('li');
            liEl.textContent = answer;
            liEl.addEventListener('click', selectAnswer);  //when an answer is clicked
            answerOptionsEl.appendChild(liEl);
        });
      
};

function selectAnswer(event) {  //this handles the logic when the user selects an answer. 
                                //the event parameter is triggered when user clicks on of the answer options.

  var selectedAnswer = event.target.textContent;  //extracts the text content of the HTML element the user clicks
                                                  //and stores it in a variable. 

  var correctAnswer = questionsObj[currentQuestionIndexVar].correct;  //gets the correct answer for the current question,

  if (selectedAnswer === correctAnswer) {
    score++;
    var pEl = document.createElement('p');

  }
  currentQuestionIndexVar++;
  if (currentQuestionIndexVar < questionsObj.length) {
    displayQuestion();
  }
  else {
    showResults();
  }
};

function showResults() {
  clearInterval(timerEl);
  questionEl.style.display = 'none';
  answerOptionsEl.style.display = 'none';
  submitButtonEl.style.display = 'none';
  resultEl.textContent = "Your score: " + score + "/" + questionsObj.length
}

////USER INTERACTION


////INITIALIZATION
initFunc();
