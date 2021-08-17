//////////
// Creating the Game Elements
/////////

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

  createCardHTML() {
    //remember how to return a HTML element
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color); //this adds the color to the card (adds class of "color")
    cardDiv.dataset.value = `${this.value} ${this.suit}}`; //this adds the "data" for the card. Aka the suit and value
    return cardDiv;
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

// function dealCards() {
//   for (let i = 0; i < player1Deck.length; i++) {
//     player1CardSlot.append(createCardHTML(player1Deck[i]));
//   }
// }

const deck = new Deck();
console.log(deck.cards);
deck.shuffle();

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
    console.log("a");
    const cardDivPlayer1 = document.createElement("div");
    cardDivPlayer1.innerText = player1Deck.cards[i].suit;
    cardDivPlayer1.classList.add("card", player1Deck.cards[i].color);
    cardDivPlayer1.classList.add("col-sm-1"); //this is for bootstrap
    cardDivPlayer1.dataset.value = `${player1Deck.cards[i].value} ${player1Deck.cards[i].suit}`;
    player1CardSlot.append(cardDivPlayer1);
  }

  for (let i = player2Deck.cards.length - 1; i >= 0; i--) {
    const cardDivPlayer2 = document.createElement("div");
    cardDivPlayer2.innerText = player2Deck.cards[i].suit;
    cardDivPlayer2.classList.add("card", player2Deck.cards[i].color);
    cardDivPlayer2.classList.add("col-sm-1"); // this is for bootstrap
    cardDivPlayer2.dataset.value = `${player2Deck.cards[i].value} ${player2Deck.cards[i].suit}`;
    player2CardSlot.append(cardDivPlayer2);
  }
}

// for (let i = 0; i < player1Deck.length; i++) {
//   player1CardSlot[i].appendChild(player1Cards[i].createCardHTML());
//   }
// }

document.querySelector(".Start").addEventListener("click", (e) => {
  startGameDealCards();
});

//awesome! This function is working. It creates a deck of cards, shuffles it, and splits it to the two players
//the for loops also creates two "hands" and displays it in the "player1cardslot" (26 cards)

//Now lets create a "flip" so one player cannot see the other player's cards (when they hotseat)

let inRound = false;

//I need to create a flipCard function

// function flipCards(){
//   card.classList.toggle("flipCard");
