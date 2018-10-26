// data 
    // TODO: object library of questions and answers 
window.onload = function ()
{
    console.log($(".userDash > p"));
    var qTimer;
    var qAndA = [
        {
            q: "What is the capital of Ireland?",
            c: "Dublin",
            w: ["Cork", "Belfast", "Calway"]
        },  
        {
            q: "What do the stripes on the American flag represent?",
            c: "The 13 original colonies", 
            w: ["Freedom and Liberty", "Nothing Special", "The number of US States"]
        },
        {
            q: "This show about yuppie New Yorkers ran for 10 seasons in the 90s",
            c: "What is Friends?",
            w: ["What is Roseanne?", "What is Married with Children?", "What is Law & Order?"]
        }
    ]

    // global  variable - will store the current question the user is at 
    var currentQ = 0; 
    var correctAnswerDiv; 
    var correctAnswerPos; 
    var answersCorrect = 0; 
    var answersIncorrect = 0; 

    // load the timer div into global var 
    var timerDiv = $("#timerCount"); 

//  function definitions 
    var checkAnswer = function (usrAnswer) {
        // load the correct answer 
        var correctAnswer = qAndA[currentQ].c; 
        console.log(correctAnswer);
        if (usrAnswer == correctAnswer) {
            screenUpdate("correct");
            // TODO: add correctAnswers counter
            answersCorrect++; 
            // clear the timer 
            clearInterval(qTimer);
            // load the next question after 4 seconds 
            setTimeout(() => {
                // set index to next question before loading question 
                currentQ++;
                loadQuestion(); 
            }, 4000);
        }
        else {
            screenUpdate("incorrect");
            // add incorrectAnswers counter 
            answersIncorrect++;
            // clear the timer 
            clearInterval(qTimer);
            // load next question after 2 seconds 
            setTimeout(() => {
                // set index to next question 
                currentQ++; 
                loadQuestion(); 
            }, 2000);

        }

    }
    
    var loadQuestion = function () {
        // check that there is  a question to load 
        if (currentQ < qAndA.length) {
            // ensure that answers have correct classes for a fresh question 
            screenUpdate("clear");

            correctAnswerPos =  Math.floor(Math.random()*3);
            correctAnswerDiv = $("#"+correctAnswerPos);

            // load an object reflecting current question and answers

            var qAndAtoLoad = qAndA[currentQ];
            console.log(qAndAtoLoad);
            
            // Load question value and correct answer value  into DOM 
            
            $("#question").text(qAndAtoLoad.q);
            correctAnswerDiv.find("p").text(qAndAtoLoad.c);
            
            // find remaining empty answer paragraphs 
            
            var emptySlots = $(".answer p:empty");
            
            // load wrong answers into those places 
            
            emptySlots.each(function (index, element) {
                // element == this
                $(this).text(qAndAtoLoad.w[index]);
            });

            // question now loaded, intiate a timer 

            var qTime = 5; 
            timerDiv.text(qTime);
                qTimer = setInterval(() => {

                // if timer has not run out, run again 
                
                if (qTime >0) { // update timer on screen
                    qTime--;
                    timerDiv.text(qTime);
                }
                else { // call stop function 
                    qTimerStop();
                    screenUpdate("incorrect"); // update screen for wrong answer
                    // wait 2 seconds then load the next question 
                    // change you're incorrect text to you're out of time
                    console.log("change timeout text");
                    $("#timerCount").text("Time's up!"); 
                    $("#timerCount").addClass("userAlert");
                    // record the time out as an incorrect answer 
                    answersIncorrect++; 
                    setTimeout(() => {
                        currentQ++;
                        console.log("currentQ:"+" "+currentQ);
                        if (currentQ < qAndA.length) {
                        loadQuestion();
                        }
                        else {
                            // load newgame 
                            screenUpdate("newGame");
                        }
                    }, 2000);

                }
                }, 1000); 
                // stop timer function held locally within load question 
                function qTimerStop() {
                    clearInterval(qTimer);
                } 
        }
        else {
            // load new game screen 
            console.log("calling screenUpdate --> newGame");
            screenUpdate("newGame");
        }
    }

    function screenUpdate(t) {
        console.log("invoking screenUpdate");
        // if t = win 
        if (t == "correct") {
            console.log("invoking screenupdate-->correct answer")
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            
            
        }
        else if (t == "incorrect") {
            console.log("invoking screenupdate --> incorrect");
            // correctAnswerDiv.removeClass("answer");
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            $("#timerCount").text("Sorry, that's incorrect.");
        }
        else if (t == "clear") {
            console.log("invoking screenUpdate --> clear");
            // change count down color back to black 
            $("#timerCount").removeClass("userAlert");
            // remove unneeded classes (highlights for incorrect/correct answers)
            $(".answerCorrect").removeClass("answerCorrect");
            $(".answerIncorrect").removeClass("answerIncorrect");
            // clear the p elements containing answers & clear user dashboard
            console.log("clear questions");
            $(".answer > p").text("");
            $(".userDash > p").text("");
            // hide buttons  
            $("button").addClass("hide");
            // remove all hide classes 
            $(".questionContainer, .answer").removeClass("hide");
            $(".questionContainer, .answer").removeClass("invisible");
        }
        else if (t == "newGame") {
            console.log("invoking screenupdate --> newGame");
            // $(".answerCorrect, .answerIncorrect").addClass("answer");
            $(".answerCorrect").removeClass("answerCorrect");
            $(".answerIncorrect").removeClass("answerIncorrect");
            // clear the p elements containing answers 
            $(".answer > p").text("");
            $("#2, #3").addClass("invisible");
            // clear the user dashboard 
            $(".userDash > p, #timerCount, #question").text("");
            $("#question").text("Play Again?")
            // stick the number of correct answers in answer 0 div 
            $("#0 > p").text(answersCorrect+" questions answered correctly."); 
            $("#1 > p").text(answersIncorrect+" questions answered incorrectly.");

            // set currentQ to start
            currentQ = 0;
            // provide a reset button 
            var resetBtn =  $("<button>", {
                "class" : "bigBtn", 
                text: "New Game!"
            });
            
            $(".userDash").append(resetBtn);

        }
        else {
            console.log("invoke return 0");
            return 0; 
        }
    }

    function splash (t) {
        if (t == "load") {
            // add a div right after container to contain start game Button
            $("<div>").addClass("startGame").appendTo(".container");
            // load a big fat start button into the page
            $("<button>").text("Start Game").appendTo(".startGame");
            // hide question and answer  divs for now, before game started 
            $(".questionContainer, .answers, .timer").addClass("hide");

        }
        else if (t == "start") {
            // kill the button div content 
            $(".startGame").empty(); 
            // load questions function 
            // unhide previously hidden divs 
            $(".questionContainer, .answers, .timer").removeClass("hide");
            loadQuestion(); 
        }

    }

    // procedural calls 

    splash("load"); 

    // event handlers 
    $(".answers").on("click", ".answer",  function () {
        checkAnswer($(this).text());
        // TODO: clear qTimer  
    })

    $("body").on("click", ".userDash button", function () {
        // load question
        answersCorrect = answersIncorrect = 0; 
        screenUpdate("clear");
        loadQuestion();
    })

    $("body").on("click", ".startGame", function () {
        splash("start");
    });


        

    
}
        

        

    

