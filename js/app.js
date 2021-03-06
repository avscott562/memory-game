/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//card and gameboard variables
let icons = ["fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-bicycle", "fa fa-leaf"]
let cardIcons = [...icons, ...icons];
let deck = document.querySelector('.deck');
let ele, icon, firstCard, secondCard, timeClock;
let cardCount = 0;
let matchedCards = 0;
let cards = document.querySelectorAll('.card');
//move variables
let moves = 0;
let movesDisplay = document.querySelector('.moves');
//ratings variables
let stars = document.getElementsByClassName('fa fa-star');
let starCount = 3;
//timer variables
let timer = document.querySelector('.timer');
let clock = 0;
let min = 0;
let sec = 0;
let hasStarted = false;
//modal variables
let modal = document.querySelector('.modal');
let closeX = document.querySelector('.m-close');
let mStop = document.getElementById('m-stop');
let replay = document.getElementById('m-replay');
let mMoves = document.getElementById('m-moves');
let mRating = document.getElementById('m-rating');
let mTime = document.getElementById('m-time');
//new game variable
let restart = document.querySelector('.restart');

//create cards
function createCards() {
  for(let i = 0; i < cardIcons.length; i++) {
    ele = document.createElement('li');
    ele.classList.add('card');
    icon = document.createElement('i');
    icon.setAttribute('class', cardIcons[i]);
    ele.appendChild(icon);
    deck.appendChild(ele);
  }
  let cards = document.querySelectorAll('.card');
  //add eventlistener to turn over card
   cards.forEach(function(card) {
     card.addEventListener('click', turnCard)
   });
}

//add eventlistener to start a new game
restart.addEventListener('click', newGame)

//set up new game as page loads
shuffle(cardIcons);
createCards();
timer.innerHTML = "00:00 has elapsed";

//create new gameboard
function newGame() {
  //close modal if open
  closeModal()
  //empty the deck
  deck.innerHTML = "";
  //shuffle cards
  shuffle(cardIcons);
  //create deck
  createCards(cardIcons);
  //reset card and matched cards count
  cardCount = 0;
  matchedCards = 0;
  //reset moves
  moves = 0;
  movesDisplay.innerHTML = moves;
  //reset timer
  stopTimer();
  timer.innerHTML = "00:00 has elapsed";
  clock = 0;
  min = 0;
  sec = 0;
  hasStarted = false;
  //reset stars
  for(i = 0; i < 3; i++) {
    stars[i].style.display = 'inline-block';
  };
  starCount = 3
}

//function to turn over unmatched cards
function turnCard() {
  //start timer
  if(!hasStarted) {
    hasStarted = true;
    timeClock = setInterval(function() {
      clock = clock + 1;
      min = Math.floor(clock / 60);
      if(min < 10) {
        min = '0' + min;
      };
      sec = clock % 60;
      if(sec < 10) {
        sec = '0' + sec;
      };
      timer.innerHTML = min + ':' + sec + " has elapsed";
    }, 1000);
  }
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

//function to disable clicking
function disableClick () {
  let cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.removeEventListener('click', turnCard)
  });
}

//fuction to check if cards match
function compare() {
  //disable other cards from being clicked during comparison
  disableClick()
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
    }, 400);
  } else {
    //add delay to unmatched cards
    setTimeout(function() {
      //flip cards back over that do not match
      firstCard.classList.remove('open', 'show');
      secondCard.classList.remove('open', 'show');
    }, 400);
  }
  //add eventlistener back to unmatched cards
  enableClick()
  //reset card counter
  cardCount = 0;
  //increment moves counter
  movesCounter()
  ratings()
}

function enableClick () {
  let cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    if(!card.classList.contains('match')) {
      card.addEventListener('click', turnCard);
    }
  });
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
    mTime.innerHTML = min + ':' + sec;
    mMoves.innerHTML = moves;
    if(starCount === 1) {
      mRating.innerHTML = starCount + " Star";
    } else {
      mRating.innerHTML = starCount + " Stars"
    };
    modal.style.display = 'block';    
    stopTimer()
  }
}

//star rating function
function ratings() {
  if(moves >= 12 && moves < 18) {
    stars[0].style.display = 'none';
    starCount = 2;
  } else if(moves >= 18){
    stars[0].style.display = 'none';
    stars[1].style.display = 'none';
    starCount = 1;
  }
}

//timer function to stop clock
function stopTimer() {
  clearInterval(timeClock);
}

//move counter function
function movesCounter() {
  moves = moves + 1;
  movesDisplay.innerHTML = moves;
}

//add click event to replay button
replay.addEventListener('click', newGame);

//add click event to close button and x
closeX.addEventListener('click', closeModal);
mStop.addEventListener('click', closeModal);

//function to closeModal
function closeModal() {
  modal.style.display = 'none';
}
