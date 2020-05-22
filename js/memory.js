"use strict";

var ansContent = document.getElementsByClassName("answers")[0];
var testContent = document.getElementsByClassName("test")[0];
var resContent = document.getElementsByClassName("result")[0];
var nextBtn = document.getElementById("next");
var score = 0;
var flagSeqObj;



function clearAllHtml() {
    testContent.innerHTML = "";
    ansContent.innerHTML = "";
    resContent.innerHTML = "";
}

function correct(amount) {
    score += amount;
    resContent.innerHTML = "Your score untilnow is : " + score;
}

function incorrect() {
    resContent.innerHTML = "Your score untilnow is : " + score;
}

//The below function starts the memory test
function memory() {
    clearAllHtml();
    ansContent.style.pointerEvents = 'auto';
    document.getElementById("next").style.visibility = "hidden";
    testContent.innerHTML = "Memorize the order of the flags!";
    var afgFlag = {url: "https://www.worldometers.info/img/flags/af-flag.gif", name: "Afghanistan"};
    var argFlag = {url: "https://www.worldometers.info/img/flags/ar-flag.gif", name: "Argentina"};
    var czFlag = {url: "https://www.worldometers.info/img/flags/ez-flag.gif", name: "Czech"};
    var swFlag = {url: "https://www.worldometers.info/img/flags/sw-flag.gif", name: "Sweden"};
    var flagSeq = [];
    var possibleFlags = [afgFlag.url, argFlag.url, czFlag.url, swFlag.url];
    var possibleFlagsName = [afgFlag.name, argFlag.name, czFlag.name, swFlag.name];
    var httpsListsource = [];
    var sourcesList = [];

    //randomizing the flags in the list with push
    for (var p=0; p<9; p++) {
        var thisPosition = Math.floor(Math.random() * Math.floor(4));

        flagSeq.push(possibleFlagsName[thisPosition]);
        sourcesList.push('<img src="' + possibleFlags[thisPosition]
        + ' "height="50" width="70" display: block;/>');
        httpsListsource.push(possibleFlags[thisPosition]);
    }
    var temp = document.createElement("div");
    var sourcesString = sourcesList.join(" ");

    temp.className = "img";
    temp.innerHTML = sourcesString;
    ansContent.appendChild(temp);
    //Timeout for the flags and the flags disappear after 5 seconds
    setTimeout(memorizeFlags, 5000);
    function memorizeFlags() {
        testContent.innerHTML = "Memorize the order of flgas?";
        ansContent.innerHTML = "";
        var flagContainer = "https://images.pexels.com/photos/242236/pexels-photo" +
            "-242236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

        var whiteFlagSeq = [];
        var flagObjects = [];
        var counter = 0;
        var correctAnswers = 0;

        //The counter +1 everytime you click
        function counterUp() {
            counter += 1;
        }
        //Function to compare with the flags list when clicked on an alternativ
        var clickedWhiteFlag = function(event) {
            var clickedOnIndex = flagSeqObj[event.target.id]["ind"];
            var clickedOn = flagSeq[event.target.id];

            //If clicked on right answer/flag
            if (markedFlagName(counter) == clickedOn) {
                event.target.src = httpsListsource[clickedOnIndex];
                correctAnswers += 1;
                //If you have correct on all 9
                if (correctAnswers === 9) {
                    ansContent.style.pointerEvents = 'none';
                    correct(correctAnswers);
                    testContent.innerHTML = "Welldone you made it through";
                    // next button becomds visible
                    nextBtn.style.visibility = "visible";
                }

                // if clicked wrong
            } else {
                incorrect();
                ansContent.style.pointerEvents = 'none';
                testContent.innerHTML = "You failed this part";
                //Next button becomes vissible.
                nextBtn.style.visibility = "visible";
            } try {
                //Unselecting the last selection
                document.getElementById(counter + 10).style.color = "black";
                counterUp();
                document.getElementById(counter + 10).style.color = "green";
            } catch (err) {
                console.log("Error occured");
            }
        };

        //Printing white spots for the flags x8
        for (var q=0; q<9; q++) {
            var thisWhiteSpot = [];
            var whiteFlagobj = {};

            thisWhiteSpot.push('<img src="' + flagContainer + '"id="' + q +
            '" height="50" width="90" display: block;/>');

            var temp = document.createElement("div");
            var whiteImagestr = thisWhiteSpot.join(" ");

            // Making a list for the white background for the flags
            whiteFlagobj = {url: whiteImagestr, name: flagSeq[q]};
            flagObjects.push(whiteFlagobj);

            // A list of flagnames to compare with the flag sequence
            whiteFlagSeq.push(whiteFlagobj.name);
            flagSeqObj = [];

            //Creating a sequence for the flags as a array with objects to get +
            //the right index even with two flags of same kind
            for (var y = 0; y<flagSeq.length; y++) {
                var thisObj = {name: flagSeq[y], ind: y};

                flagSeqObj.push(thisObj);
            }

            temp.className = "whiteFlag";
            temp.innerHTML = whiteFlagobj.url;

            temp.addEventListener("click", clickedWhiteFlag);

            ansContent.appendChild(temp);
        }

        var sortedFlagSeq = flagSeq.concat().sort();

        console.log(flagSeq);
        //Forlopp to create a list with flagnames and number
        for (y=0; y<sortedFlagSeq.length; y++) {
            var temp2 = document.createElement("div");
            var positionList = parseInt([y]) + 1;
            var thisId = (parseInt([y]) + 10).toString();

            temp2.className = "flagName";
            temp2.id = thisId;
            temp2.innerHTML = positionList + "." + sortedFlagSeq[y];
            ansContent.appendChild(temp2);
        }

        document.getElementById(10).style.color = "green";

        //marks the current flagname to place
        function markedFlagName(counter) {
            return sortedFlagSeq[counter];
        }
    }
}(memory);
