/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 var cards = document.querySelectorAll('.card');
 var firstCard;
 var secondCard;
 var cardCount = 0;

//need function to turn over card
function turnCard() {
  if(!this.classList.contains('match' || 'open' || 'show')) {
    this.classList.add('open', 'show');
    this.removeEventListener('click', turnCard);
    console.log(cardCount)
    if(cardCount === 0){
      firstCard = this;
      cardCount = cardCount + 1;
    } else if (cardCount === 1){
      secondCard = this;      
    }
    console.log(this);
    console.log(firstCard);
    console.log(cardCount);
    console.log(secondCard);
  }
}

//need fuction for checking if cards match
function compare() {

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
