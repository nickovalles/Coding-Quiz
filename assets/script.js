// Create Variables Here

    // Settings/Starting/Ending/Scores
var startButton = document.getElementById('begin-quiz');
var quizContainer = document.getElementById('quiz-container');
var text= document.getElementById('text');
//var timer = document.getElementById('timer');
var nav = document.querySelector('nav');
var highscores = document.getElementById('highscores-nav');

    //Game Play Settings/User Info/Other
var quizTitle = document.getElementById('quiz-title');
var quizAnswers = document.getElementById('quiz-answers');
var answerButton = document.getElementsByClassName('answer-button');
var answerResponse = document.getElementById('answer-response');
var userInput = document.getElementById('input-user');
var initials = document.getElementById('initials');
var submitUserInfo = document.getElementById('submit-button');


// Question Section (Arrays, switches, brainstorm on whiteboard)


// Score Section PreWork

// Time/Countdown Clock to be displayed to User

// Display Issues

// BEGIN QUIZ

// QUESTIONS SECTION 2 (correct or incorrect)


// CONCLUDE QUIZ

// High Scores Section (figure out how to save stuff. localStorage)

// localStorage(own section???)



// ALL THE EVENT LISTENERS
startButton.addEventListener('click', beingQuiz);
highscores.addEventListener('click', highScores);


// Notes
// Check why all the text keeps getting centered and the event listener isn't working
// open console log next push