//DEPENDENCIES

var timerEl = document.getElementById('timer');
var submitButtonEl = document.getElementById('submit');


//DATA

//FUNCTIONS
function init() {
  timerFunction();
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


function submitButtonFunction() {
  // Code for what happens when submit is clicked
  console.log('Submit button clicked');
};


// //USER INTERACTION
submitButtonEl.addEventListener('click', submitButtonFunction);



//INITIALIZATION
init();
