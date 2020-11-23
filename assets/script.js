// Create Variables Here

    // Settings/Starting/Ending/Scores
var startButton = document.getElementById('begin-quiz');
var quizContainer = document.getElementById('quiz-container');
var text= document.getElementById('text');
var timer = document.getElementById('timer');
var nav = document.querySelector('nav');
var highscores = document.getElementById('highscores-nav');

    //Game Play Settings/User Info/Other
var quizTitle = document.getElementById('quiz-title');
var quizAnswers = document.getElementById('quiz-answers');
var answerButton = document.getElementsByClassName('answer-button');
var answerResponse = document.getElementById('button-response');
var userInput = document.getElementById('input-user');
var initials = document.getElementById('initials');
var submitUserInfo = document.getElementById('submit-button');

// Hide userInput and quizAnswers from the main view page 
userInput.style.display = 'none';
quizAnswers.style.display = 'none';


// Question Section (Arrays, switches, brainstorm on whiteboard)
var questions = [
    {
        //Questions 1 (Answer is #4)
        question: 'What is NOT a math method?: ',
        choices: ['1. Math.PI()', '2. Math.max()', '3. Math.sqrt()', '4. Math.cover()'],
        answer: '4. Math.cover()'
    },
    {
        // Question 2 (Answer is #1)
        question: 'Math.random() method is always 0 to 1, but never actually _______. ',
        choices: ['1. 1', '2. 0', '3. None of these', '4. Both of these'],
        answer: '1. 1'
    },
    {
        // Question 3 (Answer is #3)
        question: '______ is a fall back condition in case "if" does not work or is false. ',
        choices: ['1. "Else" ', '2. "Arrays"', '3. "Else if" ', '4. All of the Above'],
        answer: '3. "Else if" '
    },
    {
        // Question 4 (Answer is #2)
        question: 'What is NOT a data type?',
        choices: ['1. string', '2. console.log', '3. boolean', '4. number'],
        answer: '2. console.log'
    },
    {
        // Question 5 (Answer is #4)
        question: 'DOM stands for: ',
        choices: ['1. Document Opportunity Mean', '2. Deploy Object Matter', '3. Decide Open Memory ' , '4. Document Object Model'],
        answer: '4. Document Object Model'
    }
];

// Score Section PreWork

// Time/Countdown Clock to be displayed to User

var score = 0;
var scoreArr= [];
var timerInterval = false;
var timerSeconds = 0;
var currentQuestion = 0;

function countdown() {
    // use interval function that counts down
    timerInterval = setInterval(function() {
        timerSeconds --;
        timer.textContent = timerSeconds;

        // if user runs out of time, alert and end game
        if (timerSeconds < 1) {
            timer.textContent = 0;
            // call end quiz
            endQuiz();

            // clear timer
            clearInterval(timerInterval);
        };
        
        // clear timer if current question is 5
        if (currentQuestion === 5) {
            timer.textContent = timerSeconds;
            clearInterval(timerInterval);
        }
        // 1000 for the proper second intervals (go to that w3 link)
    }, 1000)

}

// BEGIN QUIZ

function beginQuiz() {
    // Start the timer at 75 seconds (the mock up says 75 so yeah?)
    timerSeconds = 75;
    timer.textContent = timerSeconds;

    // Starting Countdown Timer Clock
    countdown();

    // Proceed to next question
    nextQuestion();

    // Start button will go away once we start (double check eventListener)
    startButton.style.display = 'none';

    userInput.style.display = 'none';

}

function nextQuestion() {
    // Contents of the next page
    quizTitle.textContent = 'Question ' + (currentQuestion + 1);
    text.textContent = questions[currentQuestion].question;

    // Answer blocks (confirm in html and css)
    // REMINDER FOR ME: media query about screen size and border radius
    quizAnswers.style.display = 'block';

    // Assigning answer buttons to choices
    // check notes for reminder about numbers (indexes)
    answerButton[0].textContent = questions[currentQuestion].choices[0];
    answerButton[1].textContent = questions[currentQuestion].choices[1];
    answerButton[2].textContent = questions[currentQuestion].choices[2];
    answerButton[3].textContent = questions[currentQuestion].choices[3];

    // eventListener for Answer Button(click, and confirm)
    for (i = 0; i < answerButton.length; i++) {
        answerButton[i].addEventListener('click', checkAnswer);
    }
}

// QUESTIONS SECTION 2 (correct or incorrect)

function checkAnswer(event) {

    // if CORRECT answer is chosen, inform user it's correct, increase score and current question
    if (event.target.textContent === questions[currentQuestion].answer) {
        answerResponse.style.display = 'block';
        answerResponse.textContent = 'Correct!';
        answerResponse.className = 'answer-response';
        currentQuestion++;
        score++;

        // answer response will disappear after set time
        setTimeout(function(){
            answerResponse.style.display = 'none';
        }, 800);

        // end game if user is currently on question 5
        if (currentQuestion === questions.length) {
            // call end quiz
            endQuiz();
          
        // else go to next question    
        } else {
            nextQuestion();
        };

    // else if answer chosen is INCORRECT decrease timer and increase current question
    } else {
        currentQuestion++;
        answerResponse.style.display = 'block';
        answerResponse.textContent = 'Incorrect!';
        answerResponse.className = 'answer-response';

        // Answer response will disppear
        setTimeout(function() {
            answerResponse.style.display = 'none';
        }, 800);

        // End game if < 10 secs
        if (timerSeconds < 10) {
            timerSeconds -= 10;
            // call end quiz
            endQuiz;

        // End game if question 5
        } else if (currentQuestion === 5) {
            // call end quiz
            endQuiz();
        
        // Subtract Time a move to the next
        } else {
            timerSeconds -= 10;
            nextQuestion();
        };
    }
};

// CONCLUDE QUIZ

function endQuiz() {

    // Move to display end game
    quizAnswers.style.display = 'none';
    text.textContent = "Your final score is " + score + ".";
    userInput.style.display = 'block';

    // let the user know they ran out of time or that the quiz is over
    if (timerSeconds <= 0) {
        quizTitle.textContent = 'You ran out of time!';
    } 
    
    else {
        quizTitle.textContent = "Quiz Over!";
    }

    // user input with initials
    submitUserInfo.addEventListener('click', saveHighScore);

}

// High Scores Section (figure out how to save stuff. localStorage)

// SAVING HIGH SCORE
function saveHighScore(event) {

    event.preventDefault();

    // no info no nothing
    if (initials.value.length === 0) {
        return

    // ELSE - save high score    
    } else {
        newScore = {
            userName: initials.value.trim(),
            userScore: score
        };
        scoreArr.push(newScore);

        // Sort to the Top
        scoreArr.sort((a, b) => b.userScore - a.userScore);

        // make array a string 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify (future reference)

        localStorage.setItem('score', JSON.stringify(scoreArr));

        // take user to high scores
        highScores();
    }
}

// localStorage(own section???) - loading high score

function loadHighScore() {

    // Local storage... check bootcampspot or w3/mdn for Parse info
    savedScores = parse(localStorage.getItem('score'));

    // score Arr (array)
    if (savedScores !== null) {
        scoreArr = savedScores;

        // Return score array now
        return scoreArr;
    }
}

// VIEWING HIGH SCORE

function loadHighScore() {

    // parse string value from local storage into new array
    savedScores = JSON.parse(localStorage.getItem('score'));

    // if there are no saved scores then save into score array
    if (savedScores !== null) {
        scoreArr = savedScores;

        // return new score array value
        return scoreArr;
    }
}

// LOAD SCORES from localStore
function highScores() {
    event.preventDefault();
    // clears timeInterval
    if (timerInterval) {
        clearInterval(timerInterval);
    };

    // New List Section -> check HTML notes
    var ol = document.createElement('ol');
    var returnButton = document.createElement('button');
    var clearButton = document.createElement('button');
    returnButton.textContent = 'Go Back';
    clearButton.textContent = 'Clear High Scores';
    quizContainer.appendChild(ol);
    quizContainer.appendChild(returnButton);
    quizContainer.appendChild(clearButton);

    // Removes other elements not associated
    startButton.style.display = 'none';
    nav.style.visibility = 'hidden';
    quizTitle.textContent = 'High Scores';
    text.textContent = '';
    quizAnswers.style.display = 'none';
    userInput.style.display = 'none';

    // Sort list

    for (i = 0; i < scoreArr.length; i++) {
        var score = scoreArr[i].userName + ' : ' + scoreArr[i].userScore;

        li = document.createElement('li');
        li.textContent = score;
        ol.appendChild(li);
    }

    // Event Listener
    returnButton.addEventListener('click', function() {
        location.href = 'index.html'
    });

    clearButton.addEventListener('click', function() {
        localStorage.clear();
        ol.innerHTML = '';
    });
};


loadHighScore();



// ALL THE EVENT LISTENERS
startButton.addEventListener('click', beginQuiz);
highscores.addEventListener('click', highScores);


