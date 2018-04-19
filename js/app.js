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

/* Start Defining all cards , restart , moves and stars elements  */

// Declare all cards
let allCards = document.getElementsByClassName('card');

// Declare array of cards
let cards = [...allCards];

// Declare restart button
let restart = document.querySelector('.restart');

// Declare container of all cards
const deck = document.querySelector('.deck');

// Declare number of moves
let moves = document.querySelector('.score-panel .moves');

// Reset moves
let movesNum = 0 ;

// Declare timer
let timer = document.querySelector('.timer span');

// Reset second, minutes , hours
let sec = 0;
let mins= 0;
let hours = 0;
let interval;

// Declare container of stars
let starsContainer = document.querySelector('.stars') ;

// Declare stars each on its own
let stars = document.querySelectorAll('.stars li');

// Declare modal message
let modal = document.getElementById('modal');

// Declare play again button of the modal
let playAgain =document.getElementById('playAgain');

// Make new array of cards have been clicked
let clickedCards = [];

/* End Defining all cards , restart , moves and stars elements  */

/* ************************************************************* */

// Start startGame function
function startGame(){
  sec = 0;
  mins = 0;
  clickedCards = [];
  timer.innerHTML = 'mins ' + ' ' + mins + ' sec ' + ' ' +  sec;
  stars[2].style.visibility = 'visible';
  stars[1].style.visibility = 'visible';
  modal.style.display = "none";
  modal.innerHTML="";
  deck.style.display = 'flex' ;

  let shuffled = shuffle(cards);
  deck.innerHTML = "" ;
  for (dec of shuffled){
    deck.appendChild(dec);
    dec.classList.remove('open','show','match');
    dec.addEventListener('click',click);
    moves.innerHTML= 0;

  }
  restart.addEventListener('click',startGame);

}

startGame();

// End startGame function

// Reset timer and moves and stars rating

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
    clearInterval(interval);
    startTimerCounter();
  }
  if (clickedCards.length === 2) {
    movesNum++ ;
    moves.innerHTML = movesNum ;

    if (clickedCards[0].innerHTML === clickedCards[1].innerHTML ) {
      clickedCards[0].classList.add('match');
      clickedCards[1].classList.add('match');
      clickedCards=[]; // make new empty array

    }
    else {
      function removeAll() {
        clickedCards[0].classList.remove('open','show');
        clickedCards[1].classList.remove('open','show');
        clickedCards=[];
      }
      setTimeout(removeAll, 800);

    }
  }

  rating();
  modalMessage();
}



// Start Timer function

function startTimerCounter() {

   interval = setInterval(function(){
        timer.innerHTML= 'mins ' + ' ' + mins + ' sec ' + ' ' +  sec;
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

// Stop timer function

function stopTimerCounter(){
  clearInterval(interval);
  timer.innerHTML =  'mins ' + mins + ' sec' + sec ;
}

//*****************************************************

// Rating function

function rating(){

if(movesNum === 10){

    stars[2].style.visibility = 'hidden';
    stars.innerHTML = stars;
  }

  else if(movesNum === 16 ) {

    stars[1].style.visibility = 'hidden';
    stars.innerHTML = stars;
  }

}



// Modal message function

function modalMessage() {

  let matchedCards = document.querySelectorAll('.match');

  if(matchedCards.length === 16) {
    //debugger;
    stopTimerCounter();
    deck.style.display = 'none' ;
    modal.setAttribute('style','display:block') ;

    let timeModal = document.createElement('p');
    timeModal.innerHTML = 'Time : ' + 'mins ' + ' ' + mins + ' sec ' + ' ' +  sec;
    modal.appendChild(timeModal).after(playAgain);

    let movesModal = document.createElement('p');
    movesModal.innerHTML= 'Moves : '+ movesNum;
    modal.appendChild(movesModal).after(playAgain);

    let ratingModal = document.createElement('p');
    ratingModal.innerHTML= "Rating "+ starsContainer.innerHTML ;
    modal.appendChild(ratingModal).after(playAgain);
  }

}
