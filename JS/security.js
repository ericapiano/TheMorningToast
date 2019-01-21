$(document).ready(function() {
  // console.log( "ready!" );

  // track which question we are on
  var questionCounter = 0;
  // initial time of 15 seconds for each question
  var time = 15;
  // will keep tally of right guesses for end game
  var correctGuesses = 0;
  //will keep tally of wrong guesses for end game
  var incorrectGuesses = 0;

  // question & answer array
  var questions = [
    {
    question: "Where does Jackie want to move?",
    choices: ["Cleveland", "No where... true NYC stan", "Nashville", "LA"],
    correctAnswer: "Cleveland",
    // image: "<img src='images/purple.jpg' class='img-rounded shadow'>"
  }, 
  {
    question: "Where is Camp Toast?",
    choices: ["NY", "NJ", "PA", "CT"],
    correctAnswer: "PA",
    // image: "<img src='images/image.gif' class='img-rounded shadow'>"
  }, 

  {
    question: "Who is the oldest Oshry sister?",
    choices: ["Jackie", "Claudia", "Olivia", "Margo"],
    correctAnswer: "Olivia",
    // image: "<img src='images/triplets.jpg' class='img-rounded shadow'>"
  }, 
  {
    question: "Which show does The Morning Toast not recap?",
    choices: ["Housewives", "90 Day Fiance", "Kardashians", "Bachelor"],
    correctAnswer: "90 Day Fiance",
    // image: "<img src='images/woopah.gif' class='img-rounded shadow'>"
  },
  {
    question: "Who does Claudia only want good things for?",
    choices: ["Kelly Ripa", "SJP", "Tiffany Thorton", "Lisa Vanderpump"],
    correctAnswer: "Tiffany Thorton",
    // image: "<img src='images/monica.jpg' class='img-rounded shadow'>"
  
  // {
  //   question: "How many times was Ross divorced?",
  //   choices: ["1", "2", "3", "4"],
  //   correctAnswer: "3",
  //   image: "<img src='images/divorce.gif' class='img-rounded shadow'>"
  }];
  

// create question contents according to question count
function questionContent() {
  // a for loop would be cool here...
    $("#gameScreen").append("<p><strong>" + 
      questions[questionCounter].question + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[0] + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[1] + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[2] + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[3] + 
      "</strong></p>");
}

// user guessed correctly
function userWin() {
  $("#gameScreen").html("<p>Correct!</p>");
  correctGuesses++;
  setTimeout(nextQuestion, 2000);
  questionCounter++;
}

// user guessed incorrectly
function userLoss() {
  $("#gameScreen").html("<p>Nope!</p>");
  incorrectGuesses++;
  setTimeout(nextQuestion, 2000);
  questionCounter++;
}

// user ran out of time
function userTimeout() {
  if (time === 0) {
    $("#gameScreen").html("<p>You ran out of time!</p>");
    incorrectGuesses++;
    // var correctAnswer = questions[questionCounter].correctAnswer;
    // $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
    //   correctAnswer + 
    //   "</span></p>" + 
    //   questions[questionCounter].image);
    setTimeout(nextQuestion, 2000);
    questionCounter++;
  }
}

// screen that shows final score and nice message :)
function resultsScreen() {
  if (correctGuesses > incorrectGuesses) {
    var endMessage = "Someone's a true Steen! Welcome!";
  }
  else {
    var endMessage = "Sorry, you're not steeny enough";
  }
  $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
    correctGuesses + "</strong> right.</p>" + 
    "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p> <br>");
  $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
  $("#bottomText").html(bottomText);
  gameReset();
  $("#start").click(nextQuestion);
}

// game clock currently set to 15 seconds
function timer() {
  clock = setInterval(countDown, 1000);
  function countDown() {
    if (time < 1) {
      clearInterval(clock);
      userTimeout();
    }
    if (time > 0) {
      time--;
    }
    $("#timer").html("<strong>" + time + "</strong>");
  }
}

// moves question counter forward to show next question
function nextQuestion() {
  if (questionCounter < questions.length) {
    time = 10;
    $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    questionContent();
    timer();
    userTimeout();
  }
  else {
    resultsScreen();
  }
// console.log(questionCounter);
// console.log(questions[questionCounter].correctAnswer);
}

// reset score and counter parameters on restart
function gameReset() {
  questionCounter = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
}

  function startGame() {
    $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    $("#start").hide();
    // $("#gameScreen").append("<div id='question'>");
    // var nextQuestion = questionContent(questionCounter);
    // $("#gameScreen").append(nextQuestion);

  // $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
  // questionCounter++;
  questionContent();
    timer();
    userTimeout();
  }

  // this starts the game
  $("#start").click(nextQuestion);

  // click function to trigger right or wrong screen
$("#gameScreen").on("click", ".choices", (function() {
  // alert("clicked!");
  var userGuess = $(this).text();
  if (userGuess === questions[questionCounter].correctAnswer) {
    clearInterval(clock);
    userWin();
  }
  else {
    clearInterval(clock);
    userLoss();
  }
}));
});