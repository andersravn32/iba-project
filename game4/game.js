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
    playerCount: 1,
    cardCount: 10,
    shuffleCards: false,
  },

  // Game methods
  start() {
    // Reset inner html of game element
    $("#game").innerHTML = "";

    // Create new cards element, and append to game element
    var cardList = document.createElement("ul");
    cardList.setAttribute("id", "cards");

    $("#game").appendChild(cardList);

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
    if (card.disabled) {
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

    // Adds card-clicked to click event target
    e.target.classList.add("card-clicked");
    this.currentCard = card;
    this.update();
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
    this.update();
  },
};

game.start();
