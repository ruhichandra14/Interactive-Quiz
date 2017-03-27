
//json data for the questions
var questions = [{
    question: "What is 9*9?",
    choices: [2, 5, 81, 15, 20],
    correctAnswer: 81,
	questionId: 1
    }, {
    question: "What is 4*6?",
    choices: [3, 24, 9, 12, 18],
    correctAnswer: 24,
	questionId: 2
	}, {
    question: "What is 0*10?",
    choices: [72, 99, 108, 134, 0],
    correctAnswer: 0,
	questionId:3
	}, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 7,
	questionId: 4
	}, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 64,
	questionId: 5
}];

  
//intialising all the variables  
var index = 0;
var scores = 0;
var scoresArray = [];
var resultRecorder = 0;
var questionaireRecorder = [];


//Calling the function to display the first question
displayQuestion();



//Function to display questions by mapping through the json data provided above
function displayQuestion(){
	var random = Math.random();
	var perQuestion = 0;
    var qElement = $('<div class="demo">');
    var question = $('<p class = "question-para">').append(questions[index].question);

    //If loop to check if the Json data is present for the index value
    //Corresponding(w.r.t index) question is appended in the dom 
    if(index < 6){
    	var questionNumber = $('<p>').append("Question " + questions[index].questionId);
        $('.nav-question').append(questionNumber);
    }
   
    (qElement.append(question)).wrapAll("<div></div>");
    $('#middle').append(qElement);

    //Corresponding(w.r.t index) options for the particular question are adds in the dom 
    var optionButtons = createButtons(index);
    qElement.append(optionButtons);

    //Function which creates the button corresponding to the options and adds to the dom
    function createButtons(index) {
	    var buttonList = $('<ul class="question-dept">');
	    var item;
	    var input = '';
	    for (var i = 0; i < questions[index].choices.length; i++) {
	        item = $('<li  id =  questions.questionId>');
	        input = '<button class="ripple"> '+ questions[index].choices[i] + '</button><input type="radio" name="answer" class="ripple new" value =' + questions[index].choices[i] + '    />';
	        input += questions[index].choices[i];
	        item.append(input);
	        buttonList.append(item);
	    }
	    return buttonList;
    }

	
	//Click function on button to record the selected option
    $('.ripple').on('click',function(event){
    	//Questionaire keeps the track of question,selected and correct option ; to be displayed at the end
    	var questionaire = $('<ul class ="solution">');
    	questionaire.append('<li>' + 'Question : ' + questions[index].question + ' </li> <li> '+ 'Selected Option : ' + event.target.innerHTML + ' </li><li> ' + 'Correct Option : ' +  questions[index].correctAnswer + ' </li>');         
    	questionaireRecorder.push(questionaire);

    	//Checks if the selected option is correct
    	//scores tracks the overall score for the test
    	//perQuestion keeeps tracks of the current questions marks 
	    if(event.target.innerHTML ==  questions[index].correctAnswer){
			scores++;
			perQuestion++;
		}
		scoresArray.push(perQuestion);
        event.preventDefault();

      
        //This part records the position at which cliked happen inside the button
        var div = $('<div/>'),
        btnOffset = $(this).offset(),
      	xPosition = event.pageX - btnOffset.left,
      	yPosition = event.pageY - btnOffset.top;
      	//They add the class which created ripple effect using the css properties
        div.addClass('ripple-effect');
        var ripple = $(".ripple-effect");
        //Ripple height and width settings
        ripple.css("height", $(this).height());
	    ripple.css("width", $(this).height());
	    //Adding styling to the div
        div.css({ top: yPosition - (ripple.height()/2), left: xPosition - (ripple.width()/2),background: $(this).data("ripple-color")
        }) 
        .appendTo($(this));
        //To set the time duration for ripple effect
        window.setTimeout(function(){
        	div.remove();
    	}, 2000);

        //Function to hide the current question after the user hhas selected the option 
        //index is then incresed so that next question can be seen
        window.setTimeout(function(){
    		$('.demo').hide();
    		index ++;

    		//Checking if question index number is valid to display next question
    		//And indicate that test is in active mode
    		if(index < 5){
    			$('.button')[0].innerHTML = "Test Active";
    			displayQuestion();
    	    }

    	    //Checking if the last question is over
    	    //Making the button to show scores now and hiding/removing the not required elements
	  	    if(index==5){
	  	    	$('.button')[0].innerHTML = "Show Scores";
	  	    	$('#instructions').remove();
	  	    	$('.nav-question').remove();
	  	    	$('#middle').hide();
	  	    	$('#sidebar').hide();
				$('.demo').remove();

				//Checking if show scores button has been clicked
				//Showing the graph and the Answer key 
				$('.button').on('click',function(){
					$('#middle').show();
  	    	        $('#sidebar').show();
					$('.questions-heading')[0].innerHTML = "Answer Key";
  	    	        $('.instructions-heading')[0].innerHTML = "Graphical Representation";
					resultRecorder++;
					$('#sidebar').append('<ul class="chart">');

					//Checking the result recorder value if show scores has been clicked 
					//By looping through the answer recorder array and checking if the score is 1/0 and 
					//accordingly displaying wrong and correct (differently styled ) graphs
					//then show the graph and answerr key
                    var QNo = 0;
		            if(resultRecorder == 1 ){
						for(i=0;i<scoresArray.length;i++){
                            QNo = i+1;
							if(scoresArray[i]==1){
								$('ul').append('<li class="correctGraph"><span> Q. '+ QNo + '</span></li>');
							}
							else{
								$('ul').append('<li class="wrongGraph"><span>Q. '+ QNo + '</span></li>');
							}
						}
		            }
		            //Add the answer key to the 2nd section 
                    $('#middle').append(questionaireRecorder);
			    });
				
			}
		}, 1000);
    });
}


