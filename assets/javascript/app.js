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
            c: "The number of original colonies", 
            w: ["Freedom and Liberty", "The number of Coca-Colas President Trump drinks a day", "The number of US States"]
        },
        {
            q: "Which TV show was re-introduced as \"The Conners\" in 2018?",
            c: "Roseanne",
            w: ["Friends", "Married with Children", "Big Bang Theory"]
        },
        {
            q: "Which Canadian province is the largest by area?",
            c: "Quebec", 
            w: ["Ontario", "Nunavut", "Alberta"]
        },
        {
            q: "Which of these is a DC Universe character?",
            c: "Aquaman",
            w: ["Spiderman", "Starlord", "Taserface"]

        },
        {
            q: "Arnold Schwarzenegger DID NOT star in which of these films?", 
            c: "Demolition Man", 
            w: ["Twins", "Commando", "True Lies"]

        }


    ]
    var isClicked = false; 

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
            answersCorrect++; 
            // clear the timer 
            clearInterval(qTimer);
            // load the next question after 4 seconds 
            setTimeout(() => {
                // set index to next question before loading question 
                currentQ++;
                loadQuestion(); 
            }, 2500);
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
            isClicked = false; 

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

            var qTime = 10; 
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
                    }, 4000);

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
            // update the view when a user selects a correct answer 
            console.log("invoking screenupdate-->correct answer")
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            $("#timerCount").text("Correct!");
            $("#timerCount").addClass("userSuccess");
        }
        else if (t == "incorrect") {
            // update view when a user selects the wrong answer 
            console.log("invoking screenupdate --> incorrect");
            // correctAnswerDiv.removeClass("answer");
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            $("#timerCount").text("Sorry, that's incorrect.");
            $("#timerCount").addClass("userAlert");
        }
        else if (t == "clear") {
            // clears the view such that new questions can be loaded 
            console.log("invoking screenUpdate --> clear");
            // clear newGameButton class from question div 
            $(".questionContainer").removeClass("newGameButton");
            // change count down color back to black 
            $("#timerCount").removeClass("userAlert");
            $("#timerCount").removeClass("userSuccess");
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
            // loads view such that user can start a new game 
            console.log("invoking screenupdate --> newGame");
            // remove the answer class from the answer divs 
            $(".answerCorrect").removeClass("answerCorrect");
            $(".answerIncorrect").removeClass("answerIncorrect");
            // clear the p elements containing answers 
            $(".answer > p").text("");
            $("#2, #3").addClass("invisible");
            // clear the user dashboard 
            $(".userDash > p, #timerCount, #question").text("");
            $("#question").text("Click here to play again!")
            // remove answer class from the answer options 
            $(".answer").removeClass("answer");
            // stick the number of correct answers in answer 0 div 
            $("#0 > p").text(answersCorrect+" questions answered correctly."); 
            $("#1 > p").text(answersIncorrect+" questions answered incorrectly.");

            // set currentQ to start
            currentQ = 0;
            // add new game class to the questionContainer 
            $(".questionContainer").addClass("newGameButton");

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
        if (isClicked) {
            return 
        }
        else { 
            isClicked = true; 
            checkAnswer($(this).text());
        }
        
        }
    )

    $("body").on("click", ".startGame", function () {
        splash("start");
    });

    $("body").on("click", ".newGameButton", function () {
        answersCorrect = answersIncorrect = 0; // reset global variables 
        // FIXME: Not a great solution, but messed up with my classes so need to do this
        $("#2, #3").removeClass("invisible");
        $("#0, #1, #2, #3").addClass("answer");
        screenUpdate("clear"); // call function to clear screen
        loadQuestion(); // call function to load new questions 
    })


        

    
}
        

        

    

