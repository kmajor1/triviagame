// data 
    // TODO: object library of questions and answers 
window.onload = function ()
{
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
    ]

    // global  variable - will store the current question the user is at 
    var currentQ = 0; 
    var correctAnswerDiv; 
    var correctAnswerPos; 
    var wins = 0; 
    var losses = 0; 
    var answersCorrect = 0; 
    var answersIncorrect = 0; 

    // load the timer div into global var 
    var timerDiv = $(".timer"); 

    // ready a reset button for later use 
    







// TODO: functions 
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
            // load the next question after 2 seconds 
            setTimeout(() => {
                // set index to next question before loading question 
                currentQ++;
                loadQuestion(); 
            }, 2000);
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

    // start a nextQ timer function
        // clear message 
        // clear highlight on correct answer div 
        // increment currentQ
        // call loadQuestion 
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
                    console.log(qTime);
                    qTime--;
                    timerDiv.text(qTime);
                }
                else { // call stop function 
                    qTimerStop();
                    screenUpdate("loss"); // update screen for wrong answer
                    // wait 2 seconds then load the next question 
                    setTimeout(() => {
                        currentQ++;
                        console.log("currentQ:"+" "+currentQ);
                        if (currentQ < qAndA.length) {
                        loadQuestion();
                        }
                        else {
                            alert("game over!");
                            // TODO:  add reset button 
                            // event handler needed
                        }
                    }, 2000);

                }
                }, 1000); 
                // stop timer function held locally within load question 
                // TODO: qTimerStop 
                function qTimerStop() {
                    clearInterval(qTimer);
                } 
        }
        else {
            // load new game screen 
            screenUpdate("newGame");
        }
    }

    function screenUpdate(t) {
        // if t = win 
        if (t == "correct") {
            correctAnswerDiv.removeClass("answer");
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            $(".answerIncorrect").removeClass("answer");
            $(".userDash").text("Correct!!");
        }
        else if (t == "incorrect") {
            correctAnswerDiv.removeClass("answer");
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            $(".answerIncorrect").removeClass("answer");
            $(".userDash").text("Incorrect!");
        }
        else if (t == "clear") {
            // clears the screen and updates classes for fresh question 
            $(".answerCorrect, .answerIncorrect").addClass("answer");
            $(".answerCorrect").removeClass("answerCorrect");
            $(".answerIncorrect").removeClass("answerIncorrect");
            // clear the p elements containing answers & clear user dashboard
            $(".answer p").text(""); 
            $(".userDash").text("");
        }
        else if (t == "newGame") {
            $(".answerCorrect, .answerIncorrect").addClass("answer");
            $(".answerCorrect").removeClass("answerCorrect");
            $(".answerIncorrect").removeClass("answerIncorrect");
            // clear the p elements containing answers 
            $(".answer p").text("");
            // clear the user dashboard 
            $(".userDash, .timer, #question").text("");
            $("#question").text("Play Again?")

            // set currentQ to start
            currentQ = 0;
            // provide a reset button 
            var resetBtn =  $("<button>", {
                "class" : "btn-success", 
                text: "New Game!",
                "id": "resetBtn"
            });
            
            $(".userDash").append(resetBtn);

        }
        else {
            return 0; 
        }
    }

    loadQuestion(); 

    // event handlers 
    $(".answers").on("click", ".answer",  function () {
        checkAnswer($(this).text());
        // TODO: clear qTimer  
    })

    $("body").on("click", "#resetBtn", function () {
        // load question
        alert("test");
        screenUpdate("clear");
        loadQuestion();
    })
        

    
}
        

        

    

