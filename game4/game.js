// Shorthand query selector function
const $ = (foo) => {
  if (document.querySelectorAll(foo).length > 1) {
    return document.querySelectorAll(foo);
  }
  return document.querySelector(foo);
};

// Game object
const game = {
  // Game state
  cards: [],
  currentCard: null,

  players: [],
  currentPlayer: 0,

  finished: false,
  progress: 0,

  // Game config
  config: {
    playerCount: 2,
    cardCount: 100,
    shuffleCards: true,
  },

  // Game methods
  start() {
    // Create new cards element, and append to game element
    var cardList = document.createElement("ul");
    cardList.setAttribute("id", "cards");

    // Populate game cards array
    for (let i = 0; i < Math.floor(this.config.cardCount / 2); i++) {
      // Push first object to array
      this.cards.push({
        pairId: i,
        disabled: false,
      });

      // Push second object to array
      this.cards.push({
        pairId: i,
        disabled: false,
      });
    }

    // Shuffle cards based on config
    if (this.config.shuffleCards) {
      this.cards.sort(() => Math.random() - 0.5);
    }

    // Generate players
    for (let i = 0; i < this.config.playerCount; i++) {
      this.players.push({
        name: prompt("Indtast dit navn") || "Benny",
        color: prompt("Indtast en hex kode") || "#262626",
        score: 0,
      });
    }
    $("#game").appendChild(cardList);

    // Initial update
    this.update();

    // Initial render
    this.render();
  },

  update() {
    // Get every card which is disabled
    const finishedCount = this.cards.filter((card) => {
      return card.disabled == true;
    }).length;

    // Update progress
    this.progress = (finishedCount / this.config.cardCount) * 100;

    // Reset innerHTML of players element
    $("#scoreboard").querySelector(".players").innerHTML = "";

    // Create players elements
    this.players.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("player");
      playerElement.style.color = player.color;

      // Check if player if active
      if (player == this.players[this.currentPlayer]) {
        playerElement.classList.add("player-active");
      }

      playerElement.innerHTML = `<p>${player.name}</p><p>Score: ${player.score}`;
      $("#scoreboard").querySelector(".players").appendChild(playerElement);
    });

    // Update innerText to reflect current state of the game.
    $(".progress").innerText = `${this.progress}% gennemført - ${finishedCount}/${this.config.cardCount}`;

    // Check if game is done
    if (finishedCount == this.config.cardCount) {
      this.finished = true;
      return alert("Done");
    }
  },

  render() {
    // Render cards
    this.cards.forEach((card) => {
      // Create card element
      var cardElement = document.createElement("li");

      // Add name attribute
      cardElement.setAttribute("name", card.pairId);

      // Card card class
      cardElement.classList.add("card");
      cardElement.innerHTML = `<span>${card.pairId}</span>`;

      // Confitionally add eventlistener
      if (!card.disabled) {
        cardElement.addEventListener("click", (e) => {
          this.handleClick(e, card);
        });
      }

      // Append to parent element
      $("#cards").appendChild(cardElement);
    });
  },

  // Logic methods
  handleClick(e, card) {

    // Disable event if card is disabled eg. a pair was found
    if (card.disabled) {
      return;
    }
    
    // Check that classList of the target does not include card-clicked, to prevent bug
    if ([...e.target.classList].includes("card-clicked")){
      return;
    }
    
    // Removed card-clicked class from every card element
    $(".card").forEach((element) => {
      element.classList.remove("card-clicked");
    });

    // Check for duplicates in previous move
    if (this.currentCard && this.currentCard.pairId == card.pairId) {
      return this.addDisabled(card);
    }

    if (!this.currentCard) {
      // Adds card-clicked to click event target
      e.target.classList.add("card-clicked");
      this.currentCard = card;
      return this.update();
    }

    if (!this.players[this.currentPlayer + 1]) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }
    this.currentCard = null;
    return this.update();
  },

  addDisabled(card) {
    $(`[name="${card.pairId}"]`).forEach((element) => {
      element.removeEventListener("click", null);
      element.classList.add("card-disabled");
      element.style.backgroundColor = this.players[this.currentPlayer].color;
    });

    // Update disabled attributes on card elements
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].pairId == card.pairId) {
        this.cards[i].disabled = true;
      }
    }

    // Increase score of player who made the move
    this.players[this.currentPlayer].score++;
    this.currentCard = null;
    this.update();
  },
};

game.start();