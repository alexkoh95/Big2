# Big2
This is my first project - making a Big2 game 
V1.0 

//////////
// Game Description
//////////

This is a beta version/MVP of the game daidi/Big 2. A deck of cards is split evenly amongst players and the first player to finish playing all the cards in their hand wins the round. 

As this is a beta version, this is only a 2 player hot-seat game. Furthermore, only one card can be played out per hand instead of the usual poker hand combinations (doubles, triples, four-of-a-kind, 5-card combinations) 

Cards have two characterstics, suit and value. The suits' value are in ascending order: Diamonds, Clubs, Hearts, Spades. The value of the cards starts at 3 at the lowest and 2 as the highest. 

Thus, a 2 of Spades is the highest value card and 3 of Diamonds the lowest value. 

//Example:// 
Jack of Hearts > Jack of Diamond 
Jack of Heart > 5 of Heart 
Jack of Heart < King of Clubs 



//////////
// How to play
//////////

1. First click the "Start Game & Deal Cards" button. This generates a deck of cards, shuffles it, and distributes it evenly amongst the players (Player 1, Player 2)
2. Player 1 will have a look at this hand. If he has the 3 of Diamonds, he will play that card first by clicking on the card to move it  to the "Staging Area" before clicking on the "Play Card" button to move it to the table.
3. If player 1 does not have the 3 of Diamonds, player 1 will click on the "Flip Player 1 Cards" button to hide his cards as Player 2 comes to the computer.
4. Player 2 will play the 3 of Diamonds card (if Player 1 does not have it)
5. Players can either choose to play a card of a higher value (by clicking on it to move it to the "Staging Area" button followed by clicking on "Play Card" button) OR by clicking on the "Pass" button.
6. The first player to finish all the cards in their hand can click on the "Player Win" button, which declares the winner of the game (if any) and resets the table the for the next round. 

//////////
// Future Changes
//////////

Future Patch Changes Planned:
1. Sort cards by value upon dealing
2. Allow for doubles, triples, four-of-a-kind, and poker combination hands 
3. Allow for 4 players
4. Automate game functions (e.g. automatically move between rounds after a player plays a card or skips) 

//////////
// Coding Journey
//////////

Creating the Game Elements

1. Assigning values to card characteristics (e.g. 3 = 3 points, 4 = 4 points, J = 11 points... and Suits - "♦": 1.01, "♣": 1.02,...)
2. Creating the cards (suits, values, deck, card) 
3. Functions (freshDeck, cardComparison


Starting the Game
1. startGameDealCards function - create new deck, shuffle, split deck amongst players, create cards with DOM
2. Assigning function to Start Button 

Moving the card
1. cardsClick + eventListener to move card to staging area. Assign class to it

Flip Card
1. Flip card for Player 1 and Player 2. Use a toggle to add a class value, which will change the card based on CSS 

Play Card button
1. The button will move the card from the staging area to the table 
2. The button will use the game logic (e.g. can only play the card if higher value)
3. (1) Check if staging area is empty (return "You must play a card" if empty).    // (2) If game table is empty always play card
// (3) If game table has card apply function checkCardValue to compare 
// (4) If game table card > staging area card, return error message AND return card to respective hand 
4. Hard part for this code is keeping track of the values assigned to the card using classList. Must be careful to remove the values when appropriate (e.g. line 269-270 classList.remove "selectedCard") if not it will cause the pass and play card button to fail 

Pass Button
1. Removes card from table

Win Game Button:
1. Check if there are no cards in the player hand 
2. Remove cards of player who lost. 


