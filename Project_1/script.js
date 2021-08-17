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
    //remember how to return a HTML elementx
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


const computerDeckElement = document.querySelector(".computer-deck");
const computerCardSlot = document.querySelector(".computer-card-slot");

const playerDeckElement = document.querySelector(".player-deck");
const playerCardSlot = document.querySelector(".player-card-slot");

const text = document.querySelector(".text");
