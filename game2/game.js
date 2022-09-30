const gameContainer = document.getElementById('gameContainer')
const onePlayerBtn = document.getElementById('oneplayerBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');

let ls = localStorage;
// Update latest scores:
const updateScores = () =>{
    // Først reset
    let scoreList = document.getElementById('scores');
    scoreList.innerHTML = "";
    if(ls.getItem('scores')){
        let scores = JSON.parse(ls.getItem('scores'));
        console.log(scores);
        for(let i = 0; i < scores.length;i++){
            let li = document.createElement('li');
            if(scores[i].score == "hanged"){
                li.innerText = scores[i].name + " døde under forsøg";
            }else{
                li.innerText = scores[i].name + " med " + scores[i].score + " forsøg";
            }
            scoreList.append(li);
        }
    }else{
        // Show something else
    }
}
updateScores();
// The actual game:
const game = (type, players) => {
    let userTries = 0; // This will count the tries by current user.
    let maxTries = 6; // This is the max tries
    let string = "";
    let clue = "";
    const saveScore = (name, score) =>{
        if(ls.getItem('scores')){
            let scores = JSON.parse(ls.getItem('scores'));
            console.log(scores);
            scores.unshift({name:name, score:score});
            ls.setItem('scores', JSON.stringify(scores));
        }else{
            let scores = [{name:name, score:score}];
            ls.setItem('scores', JSON.stringify(scores));
        }
    }
    gameContainer.innerHTML = "";
    // Build current player obj
    let currentPlayer = {
        name:"",
        score:""
    }
    // Determine which game mode is on, 0: one player game, 1: two player game
    if(type == 0){
        // Set current playername:
        currentPlayer.name = players.name;
        currentPlayer.turn = true;
        // code to generete randowm word:
        // We're using an static example
        string = "abbc ddeffgg";
        clue = "the letters abcdefg";
    }else{
        // Set current playername
        // Swich player turns as well
        if(players[0].turn == true){
            players[0].turn = false;
            currentPlayer.name = players[0].name;
        }else{
            players[0].turn = true;
            currentPlayer.name = players[1].name
        }
        // Ask the users to generate word:
        const askForWord = (question) =>{
            let stringFromUser = prompt(question);
            if(stringFromUser == "" || stringFromUser == undefined){
                askForWord('Det var en ugyldig word, prøv igen');
            }
            return stringFromUser;
        }
        let stringFromUser = askForWord('Det er dit tur ' + currentPlayer.name + ', kig væk mens den anden spiller sætte ord:');
        string = stringFromUser;
    }
    if(string == "" || string == undefined){
        console.log("Something went wrong");
    }else{
        //console.log("Everthing looks fine, build the word object");
    }
    // Building word obj:
    const woFromString = (string) =>{
        let obj = {
            letters:[]
        }
        for(let i = 0; string.length > i; i++){
            // check if it in alphabet: If letter or another charactor set to used
            if(string[i].match(/[a-zA-ZæøåÆØÅ]/i)){
                obj.letters.push({letter: string[i],used:false});
            }else{
                obj.letters.push({letter: string[i],used:true});
            }
        }
        return obj;
    }
    let wo = woFromString(string);

    // Build statusWord on display:
    let statusWord = document.createElement('p');
    statusWord.setAttribute('id', 'statusWord');
    gameContainer.append(statusWord);
    // Create the signs, we will run this every try until word is geuss or max tries is reached by user
    const updateStatus = (wo) =>{
        statusWord.innerText = "";
        for(let i = 0; wo.letters.length > i; i++){
            if(wo.letters[i].used == false){ // If the letter is not choosen yet
                statusWord.innerText = statusWord.innerText + "_"; // Show a underscore
            }else if(wo.letters[i].letter == " "){ // If element is a space
                statusWord.innerText = statusWord.innerText + "-"; // show a hyphen
            }else{ // Else show everything else as they are, special characters and numericals
                statusWord.innerText = statusWord.innerText + wo.letters[i].letter.toLowerCase();
            }
        }
    }
    updateStatus(wo);
    // listen to input (the game loop):
    // build the letters
    const createLetterBtns = () =>{
        // create a container and Append to gameContainer
        let buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('id', 'buttonContainer');
        gameContainer.append(buttonContainer);
        const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','æ','ø','å'];
        for(let i = 0; i < alphabet.length; i++){
            let btn = document.createElement('button');
            btn.style.cursor = "pointer";
            btn.innerText = alphabet[i];
            btn.addEventListener('click', (event) => {
                let letter = event.target.innerText;
                event.target.classList.add('taken');
                btn.setAttribute('disabled','');
                // User clicked letter, check if letter exists in wo:
                checkForLetter(letter); 
            });
            buttonContainer.append(btn);
        }
    }
    createLetterBtns();
    // Append the reset button to
    const appendResetBtn = () =>{
        let resetButton = document.createElement('button');
        resetButton.innerText = "Ny spil - vælg spil";
        resetButton.addEventListener('click', () => {
            location.reload();
        })
        stats.append(resetButton);
    }

    // check letter is present in the word obj:
    const checkForLetter = (letterToCheck) =>{
        let noMatch = true;
        for(let i = 0; i < wo.letters.length; i++){
            if(wo.letters[i].letter.toLowerCase() == letterToCheck){
                // We find a match
                noMatch = false;
                // Set the letter to used:
                wo.letters[i].used = true;
                // Since we found a match, code to checkIfWin goes here:

                if(checkIfWin()){
                    // We have a surviver:
                    stopGame(1);
                }else{
                    // Update status word:
                    updateStatus(wo);
                }
            }
        }
        if(noMatch == true){
            userTries++;
            // Check if the user has the max tries:
            if(maxTries == userTries){
                // Stop the game and set the other player
                stopGame(0);
            }
        }
    }
    const checkIfWin = () => {
        let win = true;
        for(let i = 0; wo.letters.length > i; i++){
            if(wo.letters[i].used == false){
                win = false;
            }
        }
        return win;
    }
    const stopGame = (win) => {
        // Empty gameContainer
        document.getElementById('buttonContainer').remove();
        let message = document.createElement('h3');
        // Check if user has not hanged:
        if(win == 1){
            updateStatus(wo);
            message.innerText = "Tillykke! Du overlevede, med " + userTries + " forsøg!";
            // save score and name to ls
            saveScore(currentPlayer.name, userTries);
            updateScores();
        }else{
            // show the word:
            statusWord.innerText = "";
            for(let i = 0; wo.letters.length > i; i++){
                statusWord.innerText = statusWord.innerText + wo.letters[i].letter;
            }
            // Current user hanged:
            message.innerText = "Tillykke, du er død! Bedre held næste gang.";
            // Save score and name
            saveScore(currentPlayer.name, 'hanged');
            updateScores();
        }
        gameContainer.append(message);
        let buttonForNext = document.createElement('button');
        buttonForNext.innerText = "Spil videre";
        buttonForNext.addEventListener('click', () => {
            game(type, players);
        })
        gameContainer.append(buttonForNext);
    }
    
    // Add the reset game button, as users can reset a game
    // appendResetBtn();
    console.log(wo);
}
// Asking word a word in 2 player game:
// set up one player game: Name
const setupOnePlayer = () =>{
    let playername = prompt('Indtast navn:');
    if(playername == ""){
        playername = "Ukendt spiller";
    };
    let player = {name:playername};
    game(0,player);
}
// set up two player game: Name
const setupTwoPlayer = () =>{
    let player1 = prompt('Indtast spiller 1 navn:');
    if(player1 == ""|| player1 == undefined){
        player1 = "Ukendt spiller 1";
    };
    let player2 = prompt('Indtast spiller 2 navn:');
    if(player2 == ""|| player2 == undefined){
        player2 = "Ukendt spiller 2";
    };
    // Array of the players, player one as default turn.
    let players = [
        {name: player1, turn:true},
        {name: player2}
    ]
    game(1,players);
};

onePlayerBtn.addEventListener('click', setupOnePlayer);
twoPlayerBtn.addEventListener('click', setupTwoPlayer);
