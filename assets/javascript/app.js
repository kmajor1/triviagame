// data 
    // TODO: object library of questions and answers 
window.onload = function ()
{
    var qAndA = {
        1:  {
            q: "What is the capital of Ireland?",
            c: "Dublin",
            w1: "Cork",
            w2: "Belfast",
            w3: "Calway"
        },

        2: {
            q: "What do the stripes on the American flag represent?",
            c: "The 13 original colonies", 
            w1: "Freedom and Liberty",
            w2: "Nothing Special",
            w3: "The number of US States"
        },


    }

    // global  variable - will store the current question the user is at 
    var currentQ = 2; 

    // checkAnswer object 


// TODO: functions 
    // TODO: checkAnswer (qAnswer, usrAnswer) 
    // if qAnswer == timeout then 
        // display times up msg 
    // else if qAnswer == usrAnswer then 
        // highlight the correct answer with color 
        // display some sort of congratulations message
    // else then 
        // highlight the incorrect answer selected by the user with color
        // display a sorry message of some sort 

    // start a nextQ timer function
        // clear message 
        // clear highlight on correct answer div 
        // increment currentQ
        // call loadQuestion 

    var loadQuestion = function () {
        var correctAnswerPos =  Math.floor(Math.random()*3);
        console.log (correctAnswerPos);
        var correctAnswerDiv = $("#"+correctAnswerPos);
        var qAndAtoLoad = qAndA[currentQ];
        console.log(qAndAtoLoad);
        $("#question").text(qAndAtoLoad.q);
        correctAnswerDiv.text(qAndAtoLoad.c);
    }
        // call loadQuestionObject(currentQ) 
        // place that pair in a new object 
        // take answer from new object, place in "answer" div with ID matching local var
        // update custom data-qplaced attribute with 'true' 
        // cycle through remaining divs, placing wrong answers in first matched element 
        // call qTimer 
        
    // TODO: qTimer function (place in container)
        // refer to stopwatch example 
        // when count gets to zero, call checkAnswer, passing   

    // function calls

    loadQuestion(); 

    // event handlers 
    // TODO: onClick event tied to each answer div (or group of them)
        // TODO: clear qTimer  
        // TODO: call checkAnswer (currentQ, answerSelected) 


}
        

        

    

