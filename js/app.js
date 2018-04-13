/*
* Create a list that holds all of your cards
*/


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

let allCards = document.getElementsByClassName('card');

let cards = [...allCards];

let restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
let moves = document.querySelector('.score-panel .moves');
let movesNum = 0 ;
let timer = document.querySelector('.timer span');
let sec = 0;
let mins= 0;
let hours = 0;
let interval;
let clickedCards = [];

//*********************************************************

function startGame(){

  let shuffled = shuffle(cards);
  deck.innerHTML = "" ;
  for (dec of shuffled){
    deck.appendChild(dec);
    dec.classList.remove('open','show','match');
    dec.addEventListener('click',click);
    moves.innerHTML= 0;
    timer.innerHTML = 'mins ' + mins + ' sec ' + sec;

  }
  restart.addEventListener('click',startGame);

} //startGame function

startGame();

// Reset timer and moves

restart.addEventListener('click',stopTimerCounter);
restart.addEventListener('click',function resetMoves(){
  movesNum= 0 ;
  moves.innerHTML= movesNum;
});
//*****************************************

// click function

function click(){

  if (clickedCards.length < 2 && !this.classList.contains('open') && !this.classList.contains('match') ) {

    this.classList.add('open','show');
    clickedCards.push(this);

  }
  match();

}

// Matching function

function match(){
  if (clickedCards.length===1) {
    startTimerCounter();
  }
  if (clickedCards.length === 2) {
    movesNum++ ;
    moves.innerHTML = movesNum ;
    //debugger;
    if (clickedCards[0].innerHTML === clickedCards[1].innerHTML ) {
      clickedCards[0].classList.add('match');
      clickedCards[1].classList.add('match');
      clickedCards=[]; // make new empty array

    }
    else {
      // debugger ;
      function removeAll() {
        clickedCards[0].classList.remove('open','show');
        clickedCards[1].classList.remove('open','show');
        clickedCards=[];
      }
      setTimeout(removeAll, 800);

    }
  }

  rating();
}

// Timer function

function startTimerCounter() {

   interval = setInterval(function(){
        timer.innerHTML= 'mins ' + mins + ' sec ' + sec;
        sec++;
      if (sec === 60){
          mins++;
          sec = 0;

      }
      if (mins === 60) {
        hours++  ;
        mins = 0;
        sec = 0;
      }
  }, 1000);

}

// Stop timer

function stopTimerCounter(){
  let sec = 0;
  let mins= 0;
  let hours = 0;
  clearInterval(interval);
  timer.innerHTML =  'mins ' + mins + ' sec' + sec ;
}

//*****************************************************

// Rating function

let stars = document.getElementsByClassName('stars');
let starsArr = [...stars];

function rating(){

if(movesNum === 3){

 starsArr.pop();
 debugger;
stars.innerHTML = starsArr;

  }

  if(movesNum === 8) {

    starsArr.splice(1,1);
    stars.innerHTML = starsArr;
  }

}
