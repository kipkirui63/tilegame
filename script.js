const cards = document.querySelectorAll('.card');
const timerElement =  document.getElementById('.timer');
const movesLabel = document.querySelector('.moves');



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let seconds = 0;
let minutes = 0;

/*const moveCountElement = document.getElementById('move-counter');*/




function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}
function flipBox() {
    if (lockBoard) return;
    if (this === firstBox) return;
  
    this.classList.add('flip');
  
    if (!hasFlippedBox) {
      hasFlippedBox = true;
      firstBox = this;
    } else {
      secondBox = this;
      checkForMatch();
      incrementMoveCount();
    }
  }
  function incrementMoveCount() {
   
  }
  
  

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (firstCard.dataset.framework == secondCard.dataset.framework){
    alert("Match")
  }

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();
  }, 1500);
  moves++;
  movesLabel.textContent = moves;
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();
function restartGame() {
    cards.forEach(card => {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
    });
  
    resetBoard();
  
    movesLabel = 0;
    moveLabelElement.textContent = moveCount;
  updateStarRating();

  stopTimer();
  seconds = 0;
  minutes = 0;
  updateTimer();
  timerElement.textContent = '00:00';

  startTimer();
}
function startTimer() {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      updateTimer();
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
  }
  
  function updateTimer() {
    const formattedMinutes = padTime(minutes);
    const formattedSeconds = padTime(seconds);
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }
  
  function padTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  function restartGame(){
    stopTimer();
    movesLabel = 0
    document.querySelector('.moves').textContent = movesLabel;
    document.querySelector('.timer').textContent = timerElement;
  };

cards.forEach(card => card.addEventListener('click', flipCard));











