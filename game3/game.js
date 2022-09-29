var fields = document.querySelectorAll("#grid div")
var showCurrentPlayer = document.getElementById("currentPlayer")
let currentPlayer = "Red players";

showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn";


var winner = document.getElementById("winner");
let gameOver = "false";



//Turn counter
let displayCurrentTurn = document.getElementById("theCurrentTurn");
  let currentTurn = 00;

  function addTurn() {
    currentTurn++;
    displayCurrentTurn.innerHTML = "Turns:" + currentTurn;

    if(currentTurn <= 9) {
        displayCurrentTurn.innerHTML = "Turns: " + "0" + currentTurn;
    }
  }




//Array with all possible combinations that the players will have to occupy to win
var winningFields = [
    //Horizontal
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],

    //Verticel
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],

    //Diagonally left down
    [3, 11, 19, 27],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [7, 15, 23, 31],
    [15, 23, 31, 39],
    [14, 22, 30, 38],
    
    //Diagonally right down
    [3, 9, 15, 21],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [20, 26, 32, 38]
]




//Function that check if there should be 4 connecting
function checkConnect() {
    for (let i = 0; i < winningFields.length; i++) {
        var field1 = fields[winningFields[i][0]]
        var field2 = fields[winningFields[i][1]]
        var field3 = fields[winningFields[i][2]]
        var field4 = fields[winningFields[i][3]]
    
        if(
            field1.classList.contains("yellowPlayer") &&
            field2.classList.contains("yellowPlayer") &&
            field3.classList.contains("yellowPlayer") &&
            field4.classList.contains("yellowPlayer")
        ) {
            winner.innerHTML = "Yellow wins";
            gameOver = "true";

            showCurrentPlayer.innerHTML = ""
        }
    
        if(
            field1.classList.contains("redPlayer") &&
            field2.classList.contains("redPlayer") &&
            field3.classList.contains("redPlayer") &&
            field4.classList.contains("redPlayer")
        ) {
            winner.innerHTML = "Red wins";
            gameOver = "true";

            showCurrentPlayer.innerHTML = ""
        }
    }
    }

    

//Field gets taken up by Player
    for (let x = 0; x < fields.length; x++) {
        fields[x].onclick = () => {
          if (fields[x + 7].classList.contains("filled") &&!fields[x].classList.contains("filled") && gameOver == "false") {
            if (currentPlayer == "Red players") {
              fields[x].classList.add("filled")
              fields[x].classList.add("redPlayer")
              currentPlayer = "Yellow players"
              showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"

              checkConnect()
            } else if (currentPlayer == "Yellow players"){
              fields[x].classList.add("filled")
              fields[x].classList.add("yellowPlayer")
              currentPlayer = "Red players"
              showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
              

              checkConnect()
              addTurn()
            } 
          } else if(fields[x + 14]. classList.contains("filled") &&!fields[x + 7].classList.contains("") && gameOver == "false") {
            if (currentPlayer == "Red players") {
                fields[x + 7].classList.add("filled")
                fields[x + 7].classList.add("redPlayer")
                currentPlayer = "Yellow players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
  
                checkConnect()
              } else if (currentPlayer == "Yellow players"){
                fields[x + 7].classList.add("filled")
                fields[x + 7].classList.add("yellowPlayer")
                currentPlayer = "Red players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
                
  
                checkConnect()
                addTurn()
              } 

          } else if(fields[x + 21]. classList.contains("filled") &&!fields[x + 14].classList.contains("") && gameOver == "false") {
            if (currentPlayer == "Red players") {
                fields[x + 14].classList.add("filled")
                fields[x + 14].classList.add("redPlayer")
                currentPlayer = "Yellow players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
  
                checkConnect()
              } else if (currentPlayer == "Yellow players"){
                fields[x + 14].classList.add("filled")
                fields[x + 14].classList.add("yellowPlayer")
                currentPlayer = "Red players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
                
  
                checkConnect()
                addTurn()
              } 

          } else if(fields[x + 28]. classList.contains("filled") &&!fields[x + 21].classList.contains("") && gameOver == "false") {
            if (currentPlayer == "Red players") {
                fields[x + 21].classList.add("filled")
                fields[x + 21].classList.add("redPlayer")
                currentPlayer = "Yellow players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
  
                checkConnect()
              } else if (currentPlayer == "Yellow players"){
                fields[x + 21].classList.add("filled")
                fields[x + 21].classList.add("yellowPlayer")
                currentPlayer = "Red players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
                
  
                checkConnect()
                addTurn()
              } 

          } else if(fields[x + 35]. classList.contains("filled") &&!fields[x + 28].classList.contains("") && gameOver == "false") {
            if (currentPlayer == "Red players") {
                fields[x + 28].classList.add("filled")
                fields[x + 28].classList.add("redPlayer")
                currentPlayer = "Yellow players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
  
                checkConnect()
              } else if (currentPlayer == "Yellow players"){
                fields[x + 28].classList.add("filled")
                fields[x + 28].classList.add("yellowPlayer")
                currentPlayer = "Red players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
                
  
                checkConnect()
                addTurn()
              } 

          } else if(fields[x + 42]. classList.contains("filled") &&!fields[x + 35].classList.contains("") && gameOver == "false") {
            if (currentPlayer == "Red players") {
                fields[x + 35].classList.add("filled")
                fields[x + 35].classList.add("redPlayer")
                currentPlayer = "Yellow players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
  
                checkConnect()
              } else if (currentPlayer == "Yellow players"){
                fields[x + 35].classList.add("filled")
                fields[x + 35].classList.add("yellowPlayer")
                currentPlayer = "Red players"
                showCurrentPlayer.innerHTML = "It is " + currentPlayer + " turn"
                
  
                checkConnect()
                addTurn()
              } 
          }
        }
      }        


//Timer
window.onload = function() {


var displayedCentiseconds = document.getElementById("centiseconds")
var displayedSeconds = document.getElementById("seconds")

var seconds = 0;
var centiseconds = 0;


if(gameOver == "false") {
    var interval = setInterval(timer, 10);
} else {
    clearInterval(interval)
}


function timer() {
    centiseconds++;

    if(centiseconds <= 9) {
        displayedCentiseconds.innerHTML = "0" + centiseconds;
    } else {
        displayedCentiseconds.innerHTML = centiseconds;
    }

    if(centiseconds > 99) {
        seconds++;
        centiseconds = 0;
        displayedCentiseconds.innerHTML = 00;
    }

    if(seconds <= 9) {
        displayedSeconds.innerHTML = "0" + seconds;
    } else {
        displayedSeconds.innerHTML = seconds;
    }

    if(gameOver == "false") {
    } else {
        clearInterval(interval)


        var secondsString = seconds.toString();
        var centisecondsString = centiseconds.toString();
        var turnsString = currentTurn.toString();

        window.localStorage.setItem("latestSeconds", secondsString);
        window.localStorage.setItem("latestCentiseconds", centisecondsString);
        window.localStorage.setItem("latestNumberOfTurns", turnsString);
    }
}
}

var latestSeconds = document.getElementById("latestSeconds");
var latestCentiseconds = document.getElementById("latestCentiseconds");
var latestNumberOfTurns = document.getElementById("latestNumberOfTurns");


latestSeconds.innerHTML = localStorage.getItem("latestSeconds");
latestCentiseconds.innerHTML = localStorage.getItem("latestCentiseconds");

if(currentTurn <= 9) {
latestNumberOfTurns.innerHTML = "Turns: " + "0" + localStorage.getItem("latestNumberOfTurns");
} else {
    latestNumberOfTurns.innerHTML = "Turns: " + localStorage.getItem("latestNumberOfTurns");
}



