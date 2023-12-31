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
var clearStorageButtonEl = document.getElementById('clear-storage-button');


///DATA
var questionsObj = [
  { question: "What will be the output of the following JavaScript code: console.log(typeof typeof 1);", answers: ["string", "number", "object", "undefined"], correct: "string" },
  { question: "Which HTML tag is used to define an internal style sheet?", answers: ["<style>", "<link>", "<script>", "<css>"], correct: "<style>" },
  { question: "What does the CSS display: flex; property do?", answers: ["It makes the element float.", "It enables flexible box layout.", "It hides the element.", "It makes the element inline."], correct: "It enables flexible box layout." },
  { question: "Which method in the Fetch API is used to parse the response of a fetch request as JSON?", answers: [".json()", ".parseJson()", ".getText()", ".parse()"], correct: ".json()" }
];
var currentQuestionIndexVar = 0;
var scoreVar = 0;
var timerVar;
// var secondsRemainingVar;
var secondsRemainingVar = 20;

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
    
  timerVar = setInterval(function() {
    console.log("Timer tick, Seconds Remaining: ", secondsRemainingVar); // Log each tick for ts
    if (secondsRemainingVar <= 0) {
      clearInterval(timerVar);
      timerEl.textContent = "Time's up!";
      showResultsFunc();
      return;
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

function selectAnswerFunc(eventParam) { //the eventParam parameter is triggered when user clicks on of the answer options. 
                                
  var selectedAnswerVar = eventParam.target.textContent;  //extracts the text content of the HTML element the user clicks
  var correctAnswerVar = questionsObj[currentQuestionIndexVar].correct;  //gets the correct answer for the current question,
  console.log("Selected Answer: ", selectedAnswerVar); // Log the selected answer for ts

  if (selectedAnswerVar === correctAnswerVar) {
    scoreVar++;
    console.log("Correct Answer. Score: ", scoreVar); // Log correct answer
  }
  
  if (selectedAnswerVar !== correctAnswerVar) {
    secondsRemainingVar -= 5; 
    timerEl.textContent = secondsRemainingVar + ' seconds remaining';
      if (secondsRemainingVar <= 0) {
        clearInterval(timerVar);
        timerEl.textContent = "Time's up!";
        showResultsFunc();
        return;
      }
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
  console.log("Quiz ended. Final Score: ", scoreVar); // Log the end of the quiz and final score for ts
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
};

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
      storedScoresVar.sort(function(a, b) {// Sort by score in descending order
      return b.score - a.score;
      }); 

      submittedNameEl.innerHTML = ''; // Clear existing content
  
      var olEl = document.createElement('ol'); // Create 

      storedScoresVar.forEach(function(user) {
        var liEl = document.createElement('li');
            liEl.textContent = user.name + ' - Score: ' + user.score;
      
          olEl.appendChild(liEl); //place
        });

  submittedNameEl.appendChild(olEl); // place
};

function clearLocalStorage() {
  localStorage.clear();
  renderScores(); // Update the display after clearing the storage
};



////USER INTERACTION
submitButtonEl.addEventListener('click', userNameFunc);
clearStorageButtonEl.addEventListener('click', clearLocalStorage);

////INITIALIZATION
initFunc();
