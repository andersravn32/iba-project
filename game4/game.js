const $ = (foo) => {
  if (document.querySelectorAll(foo).length > 1) {
    return document.querySelectorAll(foo);
  }
  return document.querySelector(foo);
};

// Create game object
const game = {
  cards: [],
  icons: ['<i class="fa-solid fa-mug-saucer"></i>', '<i class="fa-solid fa-seedling"></i>'],
  current: null,
  tries: 0,
  done: false,
};

// Create array
for (let i = 0; i < game.icons.length; i++) {
  // Push first card to array
  game.cards.push({
    name: `card${i}`,
    clicked: false,
    disabled: false,
  });

  // Push second card to array
  game.cards.push({
    name: `card${i}`,
    clicked: false,
    disabled: false,
  });
}

// Shuffle cards array
game.cards.sort(() => Math.random() - 0.5);

// Toggles disabled state on object based on name parameter
const addDisabled = (name) => {
  game.cards
    .filter((card) => {
      return card.name == name;
    })
    .forEach((card) => {
      card.disabled = true;
    });
};

// Toggles clicked state on object based on name parameter
const removeClicked = (name) => {
  game.cards
    .filter((card) => {
      return card.name == name;
    })
    .forEach((card) => {
      card.clicked = false;
    });
};

// Update function, updates game logic
const update = (event, card) => {
  // Update tries counter
  game.tries++;

  // Checks previous guess against current card name
  if (game.current == card.name) {
    addDisabled(card.name);
    removeClicked(card.name);
  }

  // If previous guess is wrong, remove clicked class
  removeClicked(game.current);

  // Update current state
  game.current = event.target.attributes.name.value;

  // Track game done state
  game.done = true;
  game.cards.forEach((card) => {
    if (!card.disabled){
        game.done = false;
    }
  })

  // Check if game is done
  if (game.done){
    alert("Game over")
  }
};

// Render method
const render = () => {
  $("#cards").innerHTML = "";
  game.cards.forEach((card, index) => {
    // Create card element
    var cardElement = document.createElement("li");

    // Set card attributes
    cardElement.setAttribute("name", card.name);
    cardElement.classList.add("card");
    cardElement.innerText = card.name;

    if (card.disabled) {
      cardElement.classList.add("card-disabled");
    }

    if (card.clicked) {
      cardElement.classList.add("card-clicked");
    }

    if (!card.disabled && !card.clicked) {
      cardElement.addEventListener("click", (e) => {
        // If card is already clicked, do nothing
        if (card.clicked) {
          return;
        }

        // Update clicked state
        card.clicked = true;

        // Update game logic
        update(e, card);

        // Re-render
        render();
      });
    }

    // Append new element as child
    $("#cards").appendChild(cardElement);
  });
};

render();
