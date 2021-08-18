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
    // cardDivPlayer2.addEventListener("click", (e) => {
    //   const selectedCard = e.target.parentNode;
    //   const stagingArea = document.querySelector(".staging");
    //   stagingArea.append(selectedCard);
    // });
    player2CardSlot.append(cardDivPlayer2);
  }
  console.log(player1Deck.cards[1].suit);
  console.log(player2Deck.cards);
  console.log(player2Deck.cards[3]);
  // cardComparison(player1Deck.cards[1], player2Deck.cards[1]);
}

//awesome! This function is working. It creates a deck of cards, shuffles it, and splits it to the two players
//the for loops also creates two "hands" and displays it in the respective player slots (using bootstrap)

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

//First create a conditional function
// write event listener in a function. For example using a conditional (class is present, add event listener)

const cardsClick = document.querySelector(".cards");

cardsClick.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    const selectedCard = e.target;
    selectedCard.classList.add("selectedCard");
    const stagingArea = document.querySelector(".staging");
    stagingArea.append(selectedCard);
  }
});

//Awesome, this works. This sends the card from the player's hand to the staging area.

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

//This involves two things.
//First, the button to push the card to the table. (Play Card Button)
//Second, the game logic to push the card (if card is > value on table, replace card with card in Staging area)

document.querySelector(".playCard").addEventListener("click", (e) => {
  const selectedCardStagingArea = document.querySelector(".selectedCard");
  const gameTable = document.querySelector(".gameTable");
  // console.log(gameTable.childNodes[0]);
  if (gameTable.childNodes.length === 0) {
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
      // console.log(gameTable.childNodes[0]);
      // console.log(
      //   CARD_VALUE_MAP[selectedCardStagingArea.getAttribute("value")] *
      //     SUIT_VALUE_MAP[selectedCardStagingArea.getAttribute("suit")]
      // );
      //   CARD_VALUE_MAP[cardOne.getAttribute("value")] *
      // SUIT_VALUE_MAP[cardOne.getAttribute("suit")];
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
    // console.log(selectedCardStagingArea.getAttribute("value"))
  ) {
    console.log("hello!");
    if (selectedCardStagingArea.classList.contains("player1Hand")) {
      selectedCardStagingArea.classList.remove("player1Hand");
      selectedCardStagingArea.classList.add("playerPlayedCard");
      //need to create a remove line to remove the present node... gameTable.childNodes.
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
  }
});

//Great, the function to move the card from the staging area(".selectedCard") to the game table works
// Now I need to set up the game logic

////////////////////////////////////////////////////////////////////////////////////////////////////

/////////
// Win Alert
////////

document.querySelector(".PlayerWin").addEventListener("click", (e) => {
  if (player1CardSlot.length === "0") {
    alert("Player 1 wins!");
  } else if (player2CardSlot.length === "0") {
    alert("Player 2 wins!");
  } else {
    alert("Why you trying to end the game early?");
  }
});
