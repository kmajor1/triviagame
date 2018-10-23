// data 
    // TODO: object library of questions and answers 
window.onload = function ()
{
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
    var wins = 0; 
    var losses = 0; 
    var answersCorrect = 0; 
    var answersIncorrect =0; 

    // load the timer div into global var 
    var timerDiv = $(".timer"); 




// TODO: functions 
    var checkAnswer = function (usrAnswer) {
        // load the correct answer 
        var correctAnswer = qAndA[currentQ].c; 
        console.log(correctAnswer);
        if (usrAnswer == correctAnswer) {
            alert("Well done!");
            // TODO: add correctAnswers counter
        }
        else {
            alert("ok, Homer Simpson");
            // TODO: add incorrectAnswers counter 
        }

    // start a nextQ timer function
        // clear message 
        // clear highlight on correct answer div 
        // increment currentQ
        // call loadQuestion 
    }
    

    var loadQuestion = function () {
        // ensure that answers have correct classes for a fresh question 
        screenUpdate("clear");

        var correctAnswerPos =  Math.floor(Math.random()*3);
        var correctAnswerDiv = $("#"+correctAnswerPos);

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
        var qTimer = setInterval(() => {

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

    function screenUpdate(t) {
        // if t = win 
        if (t == "win") {

        }
        else if (t == "clear") {
            // clears the screen and updates classes for fresh q 
            $(".answerCorrect").addClass("answer");
            $(".answerIncorrect").addClass("answer");
            $(".answerCorrect").removeClass("answerCorrect");
            $(".answerIncorrect").removeClass("answerIncorrect");
            // clear the text 
            
            $(".answer p").text("");

            // randomly select a place to put the correct answer

            
        }
        else if (t == "loss") {
            correctAnswerDiv.removeClass("answer");
            correctAnswerDiv.addClass("answerCorrect"); 
            $(".answer").not(correctAnswerDiv).addClass("answerIncorrect");
            $(".answerIncorrect").removeClass("answer");
            $(".userDash").text("You Lose, Jerk.");
        }
        else {
            return 0; 
        }
    }
    
    }

    loadQuestion(); 

    // event handlers 
    $(".answers").on("click", ".answer",  function () {
        checkAnswer($(this).text());
        // TODO: clear qTimer  
    })
        

    
}
        

        

    

