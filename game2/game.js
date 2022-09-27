// Vælg ord eller sætning
// Start spillet
// Loop til rigtig svar eller blive hængt
// Genstart
let theWord = "abekatten"; // Change this to word or sentece
let userTries = 0;
let maxTries = 5; // number of allowed attempts
let winner = false;
const alphabet = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","z","æ","ø","å"
];
let game = document.getElementById('game');
console.log("The word is: " + theWord);
let statusWord = document.getElementById("statusWord");
// Making the letters to array with boolean
var wordObj = [];
for(let i = 0; i < theWord.length; i++){
    if(theWord[i] == " "){
        wordObj.push({
            letter:theWord[i],
            on:true
        })
    }
    wordObj.push({
        letter:theWord[i],
        on:false
    })
}
// This stops the game win or hang
const stopGame = () =>{
    game.innerHTML = '';
    let msg = document.createElement('h1');
    if(winner == true){
        msg.innerText = "Du vandt! YEAAAH";
    }else{
        msg.innerText = "NOOOO, Du tabte hovedet!";
    }
    game.append(msg);
}

// Check if user have all word on.
const checkForWin = (wordObj) =>{
    winner = true;
    for(let i = 0; wordObj.length > i; i++){
        if(wordObj[i].on == false){
            winner = false;
            //console.log("No winner");
        }
    }
    if(winner == true){
        console.log("We have a winner");
        stopGame();
    }
    if(userTries >= maxTries){
        stopGame();
        console.log("We have reached the max tries");
    }
    //console.log(winner);
}
const checkForLetter = (letter) =>{
    let noMatch = true;
    for(let i = 0; wordObj.length > i; i++){
        if(wordObj[i].letter == letter){
            //console.log("We have a match!");
            wordObj[i].on = true;
            noMatch = false;
            buildStatusWord(wordObj);
        }else{
            //console.log("No match letter");
            // Set number of tries to stop the game here:
        }
    }
    if(noMatch == true){
        userTries ++;
    }
    checkForWin(wordObj);
    console.log("Misset antal: " + userTries);
}
// Build the letters:
const buildStatusWord = (wordObj) =>{
    statusWord.innerHTML = "";
    for(let i = 0; wordObj.length > i; i++){
        if(wordObj[i].on == true){
            statusWord.innerHTML = statusWord.innerHTML + wordObj[i].letter;
        }else if(wordObj[i].letter == " "){
            statusWord.innerHTML = statusWord.innerHTML + " - ";
        }else{
            statusWord.innerHTML = statusWord.innerHTML + " _ ";
        }
    }
}
buildStatusWord(wordObj);
// Build the buttons:
for(let i = 0; i < alphabet.length; i++){
    let button = document.createElement('button');
    button.innerText = alphabet[i];
    button.addEventListener('click', (event) => {
        let letter = event.target.innerText;
        event.target.setAttribute('disabled','');
        checkForLetter(letter);
    })
    game.append(button);
}
