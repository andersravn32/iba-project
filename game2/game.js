const gameContainer = document.getElementById('gameContainer')
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z','æ','ø','å'];
const onePlayerBtn = document.getElementById('oneplayerBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
// The actual game:
const game = (type, players) => {
    let userTries = 0; // This will count the tries by current user.
    let maxTries = 5; // This is the max tries
    let string = "";
    let clue = "";
    // Build current player obj
    let currentPlayer = {
        name:"",
        score:""
    }
    // Determine which game mode is on, 0: one player game, 1: two player game
    if(type == 0){
        // Set current playername:
        currentPlayer.name = players.name;
        // code to generete randowm word:
        // We're using an static example
        string = "123 some long ass text æøå";
        clue = "the letters abc";
    }else{
        // Set current playername
        // Swich player turns as well
        if(players[0].turn == true){
            players[0].turn == false;
            currentPlayer.name = players[0].name;
        }else{
            players[0].turn == true;
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



    // Create the signs, we will run this every try until word is geuss or max tries is reached by user
    const updateStatus = (wo) =>{
        gameContainer.innerHTML = "";
        let statusWord = document.createElement('p')
        statusWord.setAttribute('id', 'statusWord');
        gameContainer.append(statusWord);
        
        // Creating delay effect
        let speed = 200; // The speed of our effect
        let i = 0; // our conter on the delay input
        let length = wo.letters.length; // This is the length of the word.
        const delayInput = () =>{ //  create a loop function
            setTimeout(function() { //  call a setTimeout when the loop is called
                if(wo.letters[i].used == false){ // If the letter is not choosen yet
                    statusWord.innerText = statusWord.innerText + "_"; // Show a underscore
                }else if(wo.letters[i].letter == " "){ // If letter is a space 
                    statusWord.innerText = statusWord.innerText + "-"; // show a hyphen
                }else{ // Else show everything else as they are
                    statusWord.innerText = statusWord.innerText + wo.letters[i].letter;
                }
                i++; // increment our counter
                if (i < length) { //  if the counter < count of the letters combined, call the loop function
                delayInput(); //  a little recursion to use as loop
                } // End of setTimeout()
            }, speed)
        }
        delayInput(); // Run the delay
    }
    updateStatus(wo);
    // Append the reset button to
    const appendResetBtn = () =>{
        let resetButton = document.createElement('button');
        resetButton.innerText = "Ny spil - vælg spil";
        resetButton.addEventListener('click', () => {
            location.reload();
        })
        gameContainer.append(resetButton);
    }
    // Add the reset game button
    appendResetBtn();

    // listen to input (the game loop):
    // check letter is present in the word obj:
    const letterIsHere = (letterToCheck, wo) =>{
        for(let i = 0; wo.letters.length > i; i++){
            if(wo.letters[i].letter == letterToCheck){
                return true;
            }else{
                return false;
            }
        }
    }


    // Build the buttons / keypress watch:


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
const showKey = (e) =>{
    // this event get the keyup value
}
document.addEventListener('keyup', showKey)
