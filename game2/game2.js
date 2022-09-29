// mode 2
const alphabet = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","æ","ø","å"
];
const players = [];
let cplayer = null;
let game = document.getElementById('game');
let wo = [];
let userTries = 0;
let maxTries = 4;

let playReset = document.createElement('button');
playReset.innerText = "Spil / reset";

// Run this to setup players
const setPlayers = () =>{
    cplayer = null; // Reset current player
    const promptPlayer = (number) =>{
        let playername = prompt("Spiller " + number + ":");
        console.log(playername);
        if(playername == "" || playername == undefined){
            return "Spiller " + number;
        }else{
            return playername;
        }
    }
    let playerone = promptPlayer(1);
    let playertwo = promptPlayer(2);
    players.push({
        name:playerone,
        turn: true,
        score:0
    });
    players.push({
        name:playertwo,
        turn: false,
        score:0
    });
}
// main game
const playGame = (players) =>{
    game.innerHTML = ""; // reset game

    // put reset in
    game.append(playReset);

    // check whos turn is it
    if(players[0].turn == true){
        cplayer = 0;
    }else{
        cplayer = 1;
    }

    const promptWord = () => {
        let promptedWord = prompt(players[cplayer].name + ", skriv ord / ordene").toLowerCase();
        if(promptedWord == ""){
            return promptWord();
        }
        return promptedWord;
    }
    let word = promptWord();
    // let exampeString = "test";
    wo = createWordsObject(word);
    let statusWord = document.createElement('p');
    statusWord.setAttribute('id', 'statusWord');
    game.append(statusWord);

    buildTheLetters(wo);
    
    // console.log(wo);
    buildButtons(game, wo);

}
// Create a words object
const createWordsObject = (word) =>{
    var wordArray = [];
    for(let i = 0; i < word.length; i++){
        if(word[i] == " "){
            wordArray.push({letter:word[i], on:true})
        }else{
            wordArray.push({letter:word[i], on:false})
        }
    }
    return wordArray;
}

// Append button
const appendButton = () =>{

}
// Button build function:
const buildButtons = (game, wo) =>{
    let btnContainer = document.createElement('div');
    btnContainer.setAttribute('id', 'btnContainer');
    game.append(btnContainer);
    for(let i = 0; i < alphabet.length; i++){
        let button = document.createElement('button');
        button.innerText = alphabet[i];
        button.addEventListener('click', (event) => {
            let letter = event.target.innerText;
            event.target.classList.add('taken');
            event.target.setAttribute('disabled','');
            checkForLetter(letter, wo);
        });
        btnContainer.append(button);
    }
}
// Build word letters
const buildTheLetters = (wo) =>{
    let sw = document.getElementById('statusWord');
    letters = "";
    for(let i = 0; wo.length > i; i++){
        if(wo[i].on == true){
            letters = letters + wo[i].letter;
        }else if(wo[i].letter == " "){
            letters = letters + " ";
        }else{
            letters = letters + "_";
        }
    }
    sw.innerText = letters;
}
// Show all letters:
const showAllLetters = (wo) =>{
    let sw = document.getElementById('statusWord');
    letters = "";
    for(let i = 0; wo.length > i; i++){
        letters = letters + wo[i].letter;
    }
    sw.innerText = letters;
}
// This is function when click on a letter:
const checkForLetter = (letter, wo) =>{
    let noMatch = true;
    for(let i = 0; wo.length > i; i++){
        if(wo[i].letter == letter.toLowerCase()){
            //console.log("We have a match!");
            wo[i].on = true;
            noMatch = false;
            buildTheLetters(wo);
        }else{
            //console.log("No match letter");
            // Set number of tries to stop the game here:
        }
    }
    if(noMatch == true){
        userTries ++;
    }
    checkForWin(wo);
}
// Check if user wins 
// Check if user have all word on.
const checkForWin = (wo) =>{
    let winner = true;
    for(let i = 0; wo.length > i; i++){
        if(wo[i].on == false){
            winner = false;
            //console.log("No winner");
        }
    }
    if(winner == true){
        // We have a win
        console.log("We have a win");
        stopGame(cplayer, userTries);
    }
    if(userTries >= maxTries){
        showAllLetters(wo);
        console.log("Max tries");
        // We have a max tries
        stopGame(cplayer, userTries);
    }
    //console.log(winner);
}
// Lost or win:
const stopGame = (cplayer, score) => {
    let player = players[cplayer];
    if(score == maxTries){
        console.log("Player " + player.name + " lost score");
        // save score to ls or print to html
    }else{
        console.log("Player " + player.name + " have score: " + score);
        // save score to ls or print to html
    }
    if(players[0].turn == true){
        players[0].turn = false;
        players[1].turn = true;
    }else{
        players[1].turn = false;
        players[0].turn = true;
    }
    userTries = 0;
    let nextPlayer = document.createElement('button');
    nextPlayer.innerText = "Næste spiller";
    game.append(nextPlayer);
    nextPlayer.addEventListener('click', (e) => {
        game.innerHTML = ""; // Remove elements from game
        playGame(players);
    })
}
playReset.addEventListener('click',() =>{
    game.innerHTML = ""; // remove all from game
    userTries = 0; // Reset usertries
    setPlayers();
    playGame(players);
})
game.append(playReset);
