// mode 2
const alphabet = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","æ","ø","å"
];
const players = [
];
let cplayer = null;
const setPlayers = () =>{
    cplayer = null;

    players.push({
        name:prompt("Player One: "),
        turn: true,
        score:0
    });
    players.push({
        name:prompt("Player two: "),
        turn: false,
        score:0
    });
}
let userTries = 0;
let maxTries = 4;
// main game
const playGame = (players) =>{
    let game = document.getElementById('game');
    game.innerHTML = "";

    if(players[0].turn == true){
        cplayer = 0;
    }else{
        cplayer = 1;
    }

    let word = prompt(players[cplayer].name + ", skriv ord / ordene").toLowerCase();
    // let exampeString = "test";
    let wo = createWordsObject(word);
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
// Button build function:
const buildButtons = (game, wo) =>{
    let btnContainer = document.createElement('div');
    btnContainer.setAttribute('id', 'btnContainer');
    for(let i = 0; i < alphabet.length; i++){
        let button = document.createElement('button');
        button.innerText = alphabet[i];
        button.addEventListener('click', (event) => {
            let letter = event.target.innerText;
            event.target.setAttribute('disabled','');
            checkForLetter(letter, wo);
        })
        btnContainer.append(button);
        game.append(btnContainer);
    }
}
// Build word letters
const buildTheLetters = (wordObj) =>{
    let sw = document.getElementById('statusWord');
    letters = "";
    for(let i = 0; wordObj.length > i; i++){
        if(wordObj[i].on == true){
            letters = letters + wordObj[i].letter;
        }else if(wordObj[i].letter == " "){
            letters = letters + " ";
        }else{
            letters = letters + "_";
        }
    }
    sw.innerText = letters;
}
// This is function when click on a letter:
const checkForLetter = (letter, wo) =>{
    let noMatch = true;
    for(let i = 0; wo.length > i; i++){
        if(wo[i].letter == letter){
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
const checkForWin = (myobj) =>{
    let winner = true;
    for(let i = 0; myobj.length > i; i++){
        if(myobj[i].on == false){
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
        console.log("Max tries");
        // We have a max tries
        stopGame(cplayer, userTries);
    }
    //console.log(winner);
}
// Lost or win:
const stopGame = (cplayer, score) => {
    let game = document.getElementById('game');
    game.innerHTML = "";
    let player = players[cplayer];
    if(score == maxTries){
        console.log("Player " + player.name + " lost score");
        // save score to ls
    }else{
        console.log("Player " + player.name + " have score: " + score);
        // save score to ls
    }
    console.log(players);
    if(players[0].turn == true){
        players[0].turn = false;
        players[1].turn = true;
    }else{
        players[1].turn = false;
        players[0].turn = true;
    }
    playGame(players);
    userTries = 0;
}
setPlayers();
playGame(players);
