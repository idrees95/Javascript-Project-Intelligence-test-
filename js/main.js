/* global fizzBuzz, memory */
"use strict";

var nextBtn = document.getElementById("next");
var testContent = document.getElementsByClassName("test")[0];
var btnNextQuestion = document.getElementById("nextquestion");
var btnStart = document.getElementById("start");
var letsgoButton = document.getElementById("letsgo");
var resContent = document.getElementsByClassName("result")[0];
var ansContent = document.getElementsByClassName("answers")[0];
var currentStep = -1;
var score = 0;
var maxScore = 27;
var showQuestions = window.Questions.show();

nextBtn.style.visibility = "hidden";
btnNextQuestion.style.visibility = "hidden";
letsgoButton.style.visibility = "hidden";

testContent.innerHTML = "Welcome to my intelligence test";

btnStart.addEventListener("click", function() {
    console.log("btnStart log 1");
    next();
    game();
    document.getElementById("start").style.visibility = "hidden";
});

nextBtn.addEventListener("click", function() {
    next();
    game();
});

btnNextQuestion.addEventListener("click", function() {
    next();
    game();
});

function next() {
    btnNextQuestion.style.visibility = "hidden";
    currentStep += 1;
    clearAllHtml();
    console.log("step: " + currentStep);
    console.log("score: " + score);
}

//Function that decides which part of test is starting
function game() {
    console.log("currentStep: " + currentStep);
    //Start the test
    if (currentStep === 0) {
        letsgoButton.style.visibility = "visible";
        testContent.innerHTML = "The first part of the test is simple math questions";
        ansContent.innerHTML =
        "You will get 5 questions with 3 alternatives each";
        letsgoButton.addEventListener("click", showQuestion);
    } else if ((currentStep === 1)||(currentStep === 2)||
        (currentStep === 3)||(currentStep === 4)) {
        showQuestion(currentStep);
    //If currentStep is 5 then fizzbuzz starts
    } else if (currentStep === 5) {
        letsgoButton.removeEventListener("click", showQuestion);
        letsgoButton.style.visibility = "visible";
        testContent.innerHTML = "The second part of the test is FizzBuzz";
        ansContent.innerHTML =
        "Your next challange is to complete this FizzBuzz sequence";
        letsgoButton.addEventListener("click", function() {
            fizzBuzz();
            letsgoButton.style.visibility = "hidden";
        });
    // If currentStep is 6 then memory starts
    } else if (currentStep === 6 ) {
        nextBtn.style.visibility = "hidden";
        letsgoButton.style.visibility = "visible";
        testContent.innerHTML =
        "Welcome to third part of the test which is a memory game";
        ansContent.innerHTML =
        "You will see a number of flags for 5 seconds and " +
        "you have to memorize and remember which order the flags were in." +
        "Match the right flag in the right place.";
        letsgoButton.addEventListener("click", function() {
            memory();
        });
    } else if (currentStep === 7) {
        gameOver();
    }
}

function clearAllHtml() {
    testContent.innerHTML = "";
    ansContent.innerHTML = "";
    resContent.innerHTML = "";
}
//A function to show Questions
function showQuestion() {
    ansContent.style.pointerEvents = 'auto';
    letsgoButton.style.visibility = "hidden";
    //Clicking on a alternativ
    var clickAnswer = function(event) {
        var yourAnswer = event.target.innerHTML;
        var answerString = document.createElement("div");

        answerString.className = "choice";
        //If the answer is correct
        if (yourAnswer == correctAnswer) {
            answerString.style.color = "green";
            answerString.innerHTML = "Right! The right answer is " + correctAnswer;
            correct(3);
        //or if the answer is wrong
        } else {
            answerString.style.color = "red";
            answerString.innerHTML = "Wrong! The right answer is " + correctAnswer;
            incorrect();
        }

        btnNextQuestion.style.visibility = "visible";
        ansContent.appendChild(answerString);
        ansContent.style.pointerEvents = 'none';
    };

    var question =
        showQuestions[currentStep].question;

    var choices = [showQuestions[currentStep].ch1, showQuestions[currentStep].chx,
        showQuestions[currentStep].ch2];

    var correctAnswer = showQuestions[currentStep].answer;

    testContent.innerHTML = question;
    ansContent.innerHTML = "";
    // Making the alternatives clickable
    for (var j=0; j<choices.length; j++) {
        var tempdiv = document.createElement("div");

        tempdiv.className = "choice";
        tempdiv.innerHTML = choices[j];
        tempdiv.addEventListener("click", clickAnswer);
        ansContent.appendChild(tempdiv);
    }
}
function correct(amount) {
    score += amount;
    resContent.innerHTML = "Your score untilnow is : " + score;
}

function incorrect() {
    resContent.innerHTML = "Your score untilnow is : " + score;
}

// fizzBuzz();
var x = document.createElement('script');

x.type='text/javascript';
x.src = 'js/fizzbuzz.js';
document.getElementsByTagName("head")[0].appendChild(x);

//Function to show the results and add your score from different tests
function gameOver() {
    var scorePercentage = ((score / maxScore) * 100).toFixed();

    console.log(scorePercentage);
    nextBtn.style.visibility = "hidden";
    testContent.InnerHTML = "You have completed the test.";

    resContent.innerHTML =
        "Your end result is : " + score + " / " +
        maxScore + ". Which makes it " + scorePercentage + " %";
}
