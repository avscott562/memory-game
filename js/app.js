/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var cardIcons = ["fa fa-bomb", "fa fa-bomb", "fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-bicycle",
"fa fa-bicycle", "fa fa-leaf", "fa fa-leaf"];
var deck = document.querySelector('.deck');
var restart = document.querySelector('.restart');
var ele;
var icon;
var cards = document.querySelectorAll('.card');
var firstCard;
var firstCardClass;
var secondCard;
var secondCardClass;
var cardCount = 0;
var matchedCards = 0;

//create cards
function createCards() {
  for(var i = 0; i < cardIcons.length; i++) {
    ele = document.createElement('li');
    ele.classList.add('card');
    icon = document.createElement('i');
    icon.setAttribute('class', cardIcons[i]);
    ele.appendChild(icon);
    deck.appendChild(ele);
  }
  var cards = document.querySelectorAll('.card');
  //add eventlistener to turn over card
   cards.forEach(function(card) {
     card.addEventListener('click', turnCard)
   });
}

//add eventlistener to start a new game
restart.addEventListener('click', newGame)

shuffle(cardIcons);
createCards();
//var children = deck.children;
//console.log(children.length);

//create gameboard
function newGame() {
  //empty the deck
  var children = deck.children;
  console.log(children.length);
  // for(i = 0; i < children.length; i++) {
  //     deck.removeChild(children[i]);
  // }
  //shuffle cards
  shuffle(cardIcons);
  //create deck
  createCards(cardIcons);
  //reset card and matched cards count
  cardCount = 0;
  matchedCards = 0;
}


//function to turn over unmatched cards
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
  //compare icon class lists to see if they are the same
  if (firstCard.innerHTML === secondCard.innerHTML) {
    //add class to show they match and remove flip classes
    firstCard.classList.add('match');
    firstCard.classList.remove('open', 'show');
    secondCard.classList.add('match');
    secondCard.classList.remove('open', 'show');
    //increase matched cards count
    matchedCards = matchedCards + 2;
    setTimeout(function() {
      youWin()
    }, 300);
  } else {
    //add delay to unmatched cards
    setTimeout(function() {
      //add eventlistener back to unmatched cards
      firstCard.addEventListener('click', turnCard);
      secondCard.addEventListener('click', turnCard);
      //flip cards back over that do not match
      firstCard.classList.remove('open', 'show');
      secondCard.classList.remove('open', 'show');
    }, 1000);
  }
  //reset card counter
  cardCount = 0;
}


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
function youWin() {
  if(matchedCards === 16) {
    alert('Great Job!');
  }
}

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
