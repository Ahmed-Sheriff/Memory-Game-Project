/*
* Create a list that holds all of your cards
*/
let allCards = document.getElementsByClassName('card');

let cards = [...allCards];

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

/* ******************************************************** */

/* Defining all cards , restart , moves and stars elements  */

let restart = document.querySelector('.restart');
const deck = document.querySelector('.deck')
let selectedCard = [];

//*********************************************************

restart.addEventListener('click',startGame);
//document.body.onLoad=

function startGame(){
    selectedCard=[];
  let shuffled = shuffle(cards);
  deck.innerHTML = "" ;
  for (dec of shuffled){
    deck.appendChild(dec);
  }
  for(card of cards){
    card.classList.remove('open','show','match');
  }

} //startGame function

startGame();

let clicked = function(){
  console.log('clicked cards');
  this.classList.toggle('open');
  this.classList.toggle('show');
};

function match(){
  selectedCard.push(this); // fill the array with 2 cards
  let len = selectedCard.length;
  if (len === 2 ) {
    if (selectedCard[0].innerHTML === selectedCard[1].innerHTML) {
        selectedCard[0].classList.add('match');
        selectedCard[1].classList.add('match');
        selectedCard=[]; // make new empty array
      
    }
    else {

      selectedCard[0].classList.remove('open','show');
      selectedCard[1].classList.remove('open','show');
      selectedCard=[]; // make new empty array
    }
  }

}

for (card of cards){
  card.addEventListener('click', clicked);
  card.addEventListener('click', match);
}
