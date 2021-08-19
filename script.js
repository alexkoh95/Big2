//////////
// Creating the Game Elements
/////////

const CARD_VALUE_MAP = {
  2: 15,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const SUIT_VALUE_MAP = {
  "♦": 1.01,
  "♣": 1.02,
  "♥": 1.03,
  "♠": 1.04,
};

const SUITS = ["♥", "♦", "♠", "♣"]; //this is a global constant variable (aka a static variable)

const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1)); //this selects a random card and stores it in newIndex
      const oldValue = this.cards[newIndex]; //this swaps the old card with the new random card
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue; //this is taking cards from the end of the deck and flipping it with the cards at the front randomly
    }
  }
}

class Card {
  constructor(suit, value) {
    (this.suit = suit), (this.value = value);
  }

  get color() {
    return this.suit === "♥" || this.suit === "♦" ? "red" : "black";
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

const deck = new Deck();
console.log(deck.cards);
deck.shuffle();

function cardComparison(cardOne, cardTwo) {
  const cardOneValue =
    CARD_VALUE_MAP[cardOne.getAttribute("value")] *
    SUIT_VALUE_MAP[cardOne.getAttribute("suit")];
  const cardTwoValue =
    CARD_VALUE_MAP[cardTwo.getAttribute("value")] *
    SUIT_VALUE_MAP[cardTwo.getAttribute("suit")];
  if (cardOneValue > cardTwoValue) {
    return true;
  } else {
    console.log(cardOneValue);
    console.log(cardTwo.getAttribute("value"));
    console.log(cardTwo.getAttribute("suit"));
    console.log(cardTwoValue);
    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

//////////
// Starting the Game
/////////

let player1Deck, player2Deck, inround;

const player1DeckElement = document.querySelector(".player1-deck");
const player1CardSlot = document.querySelector(".player1-card-slot");

const player2DeckElement = document.querySelector(".player2-deck");
const player2CardSlot = document.querySelector(".player2-card-slot");

function startGameDealCards() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  player1Deck = new Deck(deck.cards.slice(0, deckMidpoint));
  player2Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));

  console.log(player1Deck);
  console.log(player2Deck);

  console.log(player1Deck.cards.length);

  for (let i = player1Deck.cards.length - 1; i >= 0; i--) {
    const cardDivPlayer1 = document.createElement("div");
    cardDivPlayer1.innerText = player1Deck.cards[i].suit;
    cardDivPlayer1.classList.add("card", player1Deck.cards[i].color);
    cardDivPlayer1.classList.add("col-sm-2"); //this is for bootstrap
    cardDivPlayer1.classList.add("player1Cards", "player1Hand"); //this is for flipping cards
    cardDivPlayer1.dataset.value = `${player1Deck.cards[i].value} ${player1Deck.cards[i].suit}`;
    cardDivPlayer1.setAttribute("value", `${player1Deck.cards[i].value}`);
    cardDivPlayer1.setAttribute("suit", `${player1Deck.cards[i].suit}`);
    player1CardSlot.append(cardDivPlayer1);
  }

  for (let i = player2Deck.cards.length - 1; i >= 0; i--) {
    const cardDivPlayer2 = document.createElement("div");
    cardDivPlayer2.innerText = player2Deck.cards[i].suit;
    cardDivPlayer2.classList.add("card", player2Deck.cards[i].color);
    cardDivPlayer2.classList.add("col-sm-2"); //this is for bootstrap
    cardDivPlayer2.classList.add("player2Cards", "player2Hand"); //this is for flipping cards
    cardDivPlayer2.dataset.value = `${player2Deck.cards[i].value} ${player2Deck.cards[i].suit}`;
    cardDivPlayer2.setAttribute("value", `${player2Deck.cards[i].value}`);
    cardDivPlayer2.setAttribute("suit", `${player2Deck.cards[i].suit}`);
    player2CardSlot.append(cardDivPlayer2);
  }
  console.log(player1Deck.cards[1].suit);
  console.log(player2Deck.cards);
  console.log(player2Deck.cards[3]);
  const player2Cards = document.querySelectorAll(".player2Hand");
  for (let i = 0; i < player2Cards.length; i++) {
    player2Cards[i].classList.toggle("is-flipped");
  }
}


//////////
// Start Button
//////////
document.querySelector(".Start").addEventListener("click", (e) => {
  startGameDealCards();
});

////////////////////////////////////////////////////////////////////////////////////////////////////

////////
// Select Card (click on card to move it to the "staging" area)
///////

const cardsClick = document.querySelector(".cards");
cardsClick.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    const selectedCard = e.target;
    selectedCard.classList.add("selectedCard");
    const stagingArea = document.querySelector(".staging");
    stagingArea.append(selectedCard);
  }
});

/////////
// Creating a "flip" for the players to flip their cards
////////

document.querySelector(".Player1Flip").addEventListener("click", (e) => {
  const player1Cards = document.querySelectorAll(".player1Hand");
  for (let i = 0; i < player1Cards.length; i++) {
    player1Cards[i].classList.toggle("is-flipped");
  }
  //ok the flip is working.
  //Improvements = making sure the flip is ONLY for what is inside the hand area
});

document.querySelector(".Player2Flip").addEventListener("click", (e) => {
  const player2Cards = document.querySelectorAll(".player2Hand");
  for (let i = 0; i < player2Cards.length; i++) {
    player2Cards[i].classList.toggle("is-flipped");
  }
  //ok the flip is working. CSS solution: need to put an !important behind.
  //Not too sure why but Josiah thinks it could be because they are all class names so they don't override each other
  //So !important is used to override all the other stylings
});

////////////////////////////////////////////////////////////////////////////////////////////////////

/////////
// Sending the cards from the Staging area to be played
////////

//Purpose:
//First, the button to push the card to the table. (Play Card Button)
//Second, the game logic to push the card (if card is > value on table, replace card with card in Staging area)
//It involves the following logic 
// (1) Check if staging area is empty (return "You must play a card" if empty). 
// (2) If game table is empty always play card
// (3) If game table has card apply function checkCardValue to compare 
// (4) If game table card > staging area card, return error message AND return card to respective hand 

document.querySelector(".playCard").addEventListener("click", (e) => {
  const selectedCardStagingArea = document.querySelector(".selectedCard");
  const stagingArea = document.querySelector(".staging");
  const gameTable = document.querySelector(".gameTable");
  console.log(stagingArea.childNodes.length);
  if (stagingArea.childNodes.length === 0) {
    alert("You must play a card!");
  } else if (gameTable.childNodes.length === 0) {
    if (selectedCardStagingArea.classList.contains("player1Hand")) {
      selectedCardStagingArea.classList.remove("player1Hand");
      selectedCardStagingArea.classList.add("playerPlayedCard");
      gameTable.append(selectedCardStagingArea);
      console.log(
        document.querySelector(".playerPlayedCard").getAttribute("value")
      );
      console.log(
        document.querySelector(".playerPlayedCard").getAttribute("suit")
      );
    } else {
      selectedCardStagingArea.classList.remove("player2Hand");
      selectedCardStagingArea.classList.add("playerPlayedCard");
      gameTable.append(selectedCardStagingArea);
    }
  } else if (
    cardComparison(
      selectedCardStagingArea,
      document.querySelector(".playerPlayedCard")
    )
  ) {
    if (selectedCardStagingArea.classList.contains("player1Hand")) {
      selectedCardStagingArea.classList.remove("player1Hand");
      selectedCardStagingArea.classList.add("playerPlayedCard");
      gameTable.removeChild(gameTable.childNodes[0]);
      gameTable.append(selectedCardStagingArea);
    } else {
      selectedCardStagingArea.classList.remove("player2Hand");
      selectedCardStagingArea.classList.add("playerPlayedCard");
      gameTable.removeChild(gameTable.childNodes[0]);
      gameTable.append(selectedCardStagingArea);
    }
  } else {
    alert("You must play a card of higher value!");
    if (selectedCardStagingArea.classList.contains("player1Hand")) {
      selectedCardStagingArea.classList.remove("selectedCard");
      document
        .querySelector(".player1-card-slot")
        .appendChild(selectedCardStagingArea);
    } else {
      selectedCardStagingArea.classList.remove("selectedCard");
      document
        .querySelector(".player2-card-slot")
        .appendChild(selectedCardStagingArea);
    }
  }
});



////////////////////////////////////////////////////////////////////////////////////////////////////

/////////
// Pass Button
////////

document.querySelector(".pass").addEventListener("click", (e) => {
  const gameTable = document.querySelector(".gameTable");
  gameTable.removeChild(gameTable.childNodes[0]);
});

/////////
// Win Alert
////////

// Win alert + remove cards on table on losing player's hand 

document.querySelector(".PlayerWin").addEventListener("click", (e) => {
  const player1CardSlot = document.querySelector(".player1-card-slot");
  const player2CardSlot = document.querySelector(".player2-card-slot");
  if (player1CardSlot.childNodes.length === 0) {
    alert("Player 1 wins!");
    while (player2CardSlot.firstChild) {
      player2CardSlot.removeChild(player2CardSlot.lastChild);
    }
  } else if (player2CardSlot.childNodes.length === 0) {
    alert("Player 2 wins!");
    while (player1CardSlot.firstChild) {
      player1CardSlot.removeChild(player1CardSlot.lastChild);
    }
  } else {
    alert("Game is not over until a player finishes their hand!");
  }
});


//Future changes

//1. sort cards by value upon dealing 
//2. Do doubles/combination hands 
//3. 4 players 
//4. Automate the "flip" function to game logic (e.g. always flip cards on opponent turn)