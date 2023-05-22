const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0;

const moveCountElement = document.getElementById('move-counter');

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
    moveCount++;
    document.getElementById('move-count').textContent = moveCount;
  }
  
  

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

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
    boxes.forEach(box => {
      box.classList.remove('flip');
      box.addEventListener('click', flipBox);
    });
  
    resetBoard();
  
    moveCount = 0;
    moveCountElement.textContent = moveCount;
  updateStarRating();

  stopTimer();
  seconds = 0;
  minutes = 0;
  timerElement.textContent = '00:00';

  // Start timer
  startTimer();
}

cards.forEach(card => card.addEventListener('click', flipCard));


