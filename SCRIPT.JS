"script2.js" 
let tiles = Array.from(document.getElementsByClassName('tile'));
let blankTile = document.getElementById('tile-blank');
let timerElement = document.getElementById('timer');
let startScreen = document.getElementById('start-screen');
let gameScreen = document.getElementById('game-screen');
let endScreen = document.getElementById('end-screen');
let startGameBtn = document.getElementById('start-game-btn');
let endMessage = document.getElementById('end-message');

let timeLeft = 300; // 5 minutes in seconds
let timerInterval;

// Initialize the tiles
const shuffleBoard = () => {
  let numbers = [...Array(8).keys()].map(i => i + 1);
  numbers.push('blank'); // Add the blank tile
  numbers = shuffle(numbers);

  for (let i = 0; i < tiles.length; i++) {
    if (numbers[i] === 'blank') {
      tiles[i].classList.add('blank');
      tiles[i].textContent = '';
    } else {
      tiles[i].classList.remove('blank');
      tiles[i].textContent = numbers[i];
    }
  }
};

// Shuffle the board
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Handle tile movements
tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    let blankIndex = tiles.findIndex(t => t.classList.contains('blank'));
    let clickedIndex = tiles.indexOf(tile);

    if (isAdjacent(clickedIndex, blankIndex)) {
      swapTiles(clickedIndex, blankIndex);
      if (checkWin()) {
        clearInterval(timerInterval);
        setTimeout(() => showEndScreen("You won!"), 100);
      }
    }
  });
});

// Check if tiles are adjacent
const isAdjacent = (index1, index2) => {
  let row1 = Math.floor(index1 / 3), col1 = index1 % 3;
  let row2 = Math.floor(index2 / 3), col2 = index2 % 3;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
};

// Swap two tiles
const swapTiles = (index1, index2) => {
  let temp = tiles[index1].textContent;
  tiles[index1].textContent = tiles[index2].textContent;
  tiles[index2].textContent = temp;

  tiles[index1].classList.toggle('blank');
  tiles[index2].classList.toggle('blank');
};

// Check if the puzzle is solved
const checkWin = () => {
  for (let i = 0; i < 8; i++) {
    if (tiles[i].textContent != i + 1) {
      return false;
    }
  }
  return true;
};

// Reset the game
const resetGame = () => {
  shuffleBoard();
  startTimer();
};

// Start the game
startGameBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  resetGame();
});

// Timer countdown logic
const startTimer = () => {
  clearInterval(timerInterval);
  timeLeft = 300; // Reset to 5 minutes
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showEndScreen("Time's up! You lost.");
    } else {
      timeLeft--;
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerElement.textContent = Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
    }
  }, 1000);
};

// Show end screen
const showEndScreen = (message) => {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  endMessage.textContent = message;
};

// Restart the game
const restartGame = () => {
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
};

// Initialize the board on page load
window.onload = () => {
  // Start screen is shown initially
};
