"use strict";

window.Questions = (function () {
    var questionList = [
        {
            question: "3 + 4(5-3) = ?",
            ch1: "11",
            chx: "12",
            ch2: "13",
            answer: "11"
        },
        {
            question: "6 ÷ 2(1+2) = ? ",
            ch1: "9",
            chx: "10",
            ch2: "1",
            answer: "1"
        },
        {
            question: "3^4 / 3^2",
            ch1: "2",
            chx: "9",
            ch2: "81",
            answer: "9"
        },
        {
            question: "9 - 3 ÷ 1/3 + 1 = ?",
            ch1: "1",
            chx: "12",
            ch2: "5",
            answer: "1"
        },
        {
            question: "48 ÷ 2(9 + 3) = ?",
            ch1: "30",
            chx: "25",
            ch2: "2",
            answer: "2"
        }
    ];

    var questions = {
        "show": function () {
            return questionList;
        }
    };

    return questions;
})();
