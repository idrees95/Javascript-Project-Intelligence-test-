"use strict";

var nextBtn = document.getElementById("next");
var testContent = document.getElementsByClassName("test")[0];
var resContent = document.getElementsByClassName("result")[0];
var ansContent = document.getElementsByClassName("answers")[0];
var score = 0;


function correct(amount) {
    score += amount;
    resContent.innerHTML = "Your score untilnow is : " + score;
}

function incorrect() {
    resContent.innerHTML = "Your score untilnow is : " + score;
}


// The function below starts fizzbuzz game
function fizzBuzz() {
    nextBtn.style.visibility = "hidden";
    ansContent.style.pointerEvents = 'auto';

    var startFizzBuzz = Math.floor(Math.random() * 100);
    var seqFizzBuzz = [];
    var alternativesFizzBuzz = ["Fizz", "Buzz", "FizzBuzz", startFizzBuzz + 5];

    seqFizzBuzz.push(startFizzBuzz);
    seqFizzBuzz.push(startFizzBuzz + 1);
    seqFizzBuzz.push(startFizzBuzz + 2);
    seqFizzBuzz.push(startFizzBuzz + 3);
    seqFizzBuzz.push(startFizzBuzz + 4);
    seqFizzBuzz.push(startFizzBuzz + 5);

    // Loop through fizzbuzz Sequence and change numbers with fizz or buzz
    for (var p=0; p<seqFizzBuzz.length; p++) {
        //If the number is divisible by 3
        if (seqFizzBuzz[p] % 3 === 0) {
            seqFizzBuzz[p] = "Fizz";
            // else if the number is divisible by 5
        } else if (seqFizzBuzz[p] % 5 === 0) {
            seqFizzBuzz[p] = "Buzz";
            //else if the number is divisible both by 3 & 5
        } else if ((seqFizzBuzz[p] % 5 === 0) || (seqFizzBuzz[p] % 3 === 0)) {
            seqFizzBuzz[p] = "FizzBuzz";
        }
    }

    var correctRes = seqFizzBuzz.pop();

    seqFizzBuzz.push("-->?<--");
    testContent.innerHTML = seqFizzBuzz;
    ansContent.innerHTML = "";
    //creating a button for every alternativ
    for (var a=0; a<alternativesFizzBuzz.length; a++) {
        var temp = document.createElement("div");

        temp.className = "choice";
        temp.innerHTML = alternativesFizzBuzz[a];
        // Selecting one of the alternatives
        temp.addEventListener("click", function(event) {
            var yourAnswer = event.target.innerHTML;

            var answerString = document.createElement("div");

            ansContent.style.pointerEvents = 'none';
            answerString.className = "choice";
            //To check if the choosen answer is correct
            if (yourAnswer == correctRes) {
                answerString.style.color = "green";
                answerString.innerHTML = "Welldone, The correct answer is " + correctRes;
                correct(3);
            } else { // If the choosen answer is wrong
                answerString.style.color = "red";
                answerString.innerHTML = "Wrong answer, The correct answer is " + correctRes;
                incorrect();
            }

            nextBtn.style.visibility = "visible";
            ansContent.appendChild(answerString);
        });
        ansContent.appendChild(temp);
    }
}(fizzBuzz);
