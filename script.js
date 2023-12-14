///DEPENDENCIES
    //first <div='start-container'>
var startContainerEl = document.getElementById('start-container');
var startButtonEl = document.getElementById("start-button");
    //second <div='quiz-container'>
var quizContainerEl = document.getElementById('quiz-container');
var timerEl = document.getElementById('timer');
var questionEl = document.getElementById('question');
var answerOptionsEl = document.getElementById('answer-options');
    //third <div='result-container'>
var resultContainerEl = document.getElementById('result-container');
var resultEl = document.getElementById('result');
var formEl = document.getElementById('form');
var userNameEl = document.getElementById('user-name');
var submitButtonEl = document.getElementById('submit-button');
    //fourth <div='high-score-container'>
var highScoreContainerEl = document.getElementById('high-score-container');
var submittedNameEl = document.getElementById('submitted-name');


///DATA
var questionsObj = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
  { question: "What is the capital of France?", answers: ["Paris", "London", "Rome"], correct: "Paris" },
  { question: "Who wrote Hamlet?", answers: ["Shakespeare", "Dickens", "Chaucer"], correct: "Shakespeare" }
];
var currentQuestionIndexVar = 0;
var scoreVar = 0;
var timerVar;

///FUNCTIONS
function initFunc() { //clicking the start button starts the startQuiz function.
  startButtonEl.addEventListener('click', startQuizFunc);  //clicking startButtonEl starts starQuiz function.
  renderScores();
};
 
function startQuizFunc() {  //once startButtonEl inside init() is clicked...
  console.log('Start Quiz button clicked');  //it tests if startButtonEl works, then...
  startContainerEl.style.display = 'none';  //start-container div gets cleared...
  quizContainerEl.style.display = 'block';  //quiz-container div begins. note: this is display:none in html.
  timerFunc();  // and the timer starts in the backgroud...
  displayQuestionFunc();  // along with the displaying of questions.
};

function timerFunc() {  //this timer is called inside startQuiz function...
  var secondsRemainingVar = 10;
      timerVar = setInterval(function() {
    if (secondsRemainingVar <= 0) {
      clearInterval(timerVar);
      timerEl.textContent = "Time's up!";
      showResultsFunc();
      } else {
      timerEl.textContent = secondsRemainingVar + ' seconds remaining';
      secondsRemainingVar--;
      }
    }, 1000);
};

function displayQuestionFunc() {  //this displays the questions
  if (currentQuestion >= questionsObj.length) {
      clearInterval(timerVar);
      showResultsFunc();
      return;
  }
  var currentQuestion = questionsObj[currentQuestionIndexVar]
      questionEl.textContent = currentQuestion.question;
      answerOptionsEl.innerHTML = '';

      currentQuestion.answers.forEach(function(answerParam) {
        var liEl = document.createElement('li');
            liEl.textContent = answerParam;
            liEl.addEventListener('click', selectAnswerFunc);  //when an answer is clicked
            answerOptionsEl.appendChild(liEl);
        });
};

function selectAnswerFunc(eventParam) {  //This function handles the logic when the user selects an answer. 
                                //the eventParam parameter is triggered when user clicks on of the answer options.
  var selectedAnswerVar = eventParam.target.textContent;  //extracts the text content of the HTML element the user clicks
  var correctAnswerVar = questionsObj[currentQuestionIndexVar].correct;  //gets the correct answer for the current question,

  if (selectedAnswerVar === correctAnswerVar) {
    scoreVar++;
        // var pEl = document.createElement('p');
  }
  currentQuestionIndexVar++;
  if (currentQuestionIndexVar < questionsObj.length) {
    displayQuestionFunc();
  }
  else {
    showResultsFunc();
  }
};

function showResultsFunc() {
  clearInterval(timerVar);
  questionEl.style.display = 'none';
  answerOptionsEl.style.display = 'none';
  resultContainerEl.style.display = 'block';
  
      //create, build, place h2
  var h2El = document.createElement('h2');
      h2El.textContent = 'All Done!';
      h2El.setAttribute('style', 'text-align: center;')
      resultContainerEl.appendChild(h2El);
        
  resultEl.setAttribute('style', 'text-align: center;')
  resultEl.textContent = "Your score: " + scoreVar + "/" + questionsObj.length
}

function userNameFunc(eventParam) {
  eventParam.preventDefault();
  console.log('submit button has been clicked');
  
  startContainerEl.style.display = 'none';
  quizContainerEl.style.display = 'none';
  resultContainerEl.style.display = 'none';
  highScoreContainerEl.style.display = 'block';
    
    var submittedName = userNameEl.value
    var userScore = scoreVar;


    var existingNames = JSON.parse(localStorage.getItem("user-names")) || [];
    existingNames.push(submittedName);
  
    var existingScores = JSON.parse(localStorage.getItem("user-scores")) || [];
    existingScores.push({ name: submittedName, score: userScore });
    localStorage.setItem("user-scores", JSON.stringify(existingScores));
    
    renderScores();

};
 
function renderScores() {
  var storedScoresVar = JSON.parse(localStorage.getItem('user-scores')) || [];
  storedScores.sort(function(a, b) {
    return b.score - a.score;
}); // Sort by score in descending order

  submittedNameEl.innerHTML = ''; // Clear existing content
  var olEl = document.createElement('ol'); // Create an ordered list

  storedScoresVar.forEach(function(user) {
      var liEl = document.createElement('li');
      liEl.textContent = user.name + ' - Score: ' + user.score;
      olEl.appendChild(liEl);
  });

  submittedNameEl.appendChild(olEl); // Append the list to the container
}




////USER INTERACTION
submitButtonEl.addEventListener('click', userNameFunc);


////INITIALIZATION
initFunc();
