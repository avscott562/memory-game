/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var cardIcons = ["fa-bomb", "fa-bomb", "fa-diamond", "fa-diamond",
"fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
"fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-bicycle",
"fa-bicycle", "fa-leaf", "fa-leaf"];
var deck = document.querySelector('.deck');
var cards = document.querySelectorAll('.card');
var firstCard;
var firstCardClass;
var secondCard;
var secondCardClass;
var cardCount = 0;

//create cards
function createCards() {
  for(var i = 0; i < cardIcons.length; i++) {
    var ele = document.createElement('li');
    ele.classList.add('card');
    var icon = document.createElement('i');
    icon.classList.add('fa', cardIcons[i]);
    ele.appendChild(icon);
    deck.appendChild(ele);
  }
}

createCards();

//create gameboard
function newGame() {

}

//function to turn over cards and log them
function turnCard() {
  //do not perform if card already flipped or matched
  if(!this.classList.contains('match' || 'open' || 'show')) {
    //flip card
    this.classList.add('open', 'show');
    //disable clicking so same card cant be clicked twice
    this.removeEventListener('click', turnCard);
    if(cardCount === 0){
      //set card as first card flipped
      firstCard = this;
      cardCount = cardCount + 1;
    } else if (cardCount === 1){
      //set card as second card flipped
      secondCard = this;
      compare()
    }
  }
}

//fuction to check if cards match
function compare() {
  //grab icon for each card
  firstCardClass = firstCard.querySelector('i');
  //console.log(firstCardClass.classList);
  //secondCardClass = secondCard.querySelector('i');
  console.log(secondCardClass.classList);
  //compare icon class lists to see if they are the same
  if (firstCardClass.classList === secondCardClass.classList) { //this won't work.  needs to be same data to make equal true not data that looks similar
    //add class to show they match
    firstCard.classList.add('match');
    secondCard.classList.add('match');
  } else {
    //add eventlistener back to unmatched cards
    firstCard.addEventListener('click', turnCard);
    secondCard.addEventListener('click', turnCard);
    //flip cards that do not match back over
    firstCard.classList.remove('open', 'show');
    secondCard.classList.remove('open', 'show');
  }
  //reset card counter
  cardCount = 0;
}


//add eventlistener to turn over card
 cards.forEach(function(card) {
   card.addEventListener('click', turnCard)
 });


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


//need winner popup modal function

//need restart button and function

//need star rating function

//need timer function to start and stop when game begins and ends

//need move counter function


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
