const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const words = ['Meat', 'Hammer', 'Washing machine', 'Dirty', 'Crab', 
               'Slow', 'Food', 'Thin', 'Bucket', 'Meal', 'Snail', 
               'Down', 'Student', 'Pretty', 'Basket', 'Sun', 
               'Drink', 'Bottle', 'Hamburger', 'Winter'];

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

/**
  * Representation of points 
  */
let score = 0;

document.addEventListener('keydown', letterEvent);

/**
 * Code to check the letter the player used
 */
function letterEvent(event) {
  if (startButton.style.display === 'block') {
    return; 
  }

  const pressedKey = event.key.toLowerCase();
  if (pressedKey.match(/^[a-z]$/)) {
    if (!usedLetters.includes(pressedKey)) {
      guessLetter(pressedKey);
    }
  } else {
    return;
  }
}


/**  
  * Code to enable a reset button
  */
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);

/**
  * Initialize the game
  */
startButton.addEventListener('click', startGame);
function startGame() {
  startButton.style.display = 'none';
  selectRandomWord();
  drawStick();
  drawWordContainer();
  document.addEventListener('keydown', letterEvent);
}

/**  
  * Reset the game
  */
function resetGame() {
  selectedWord = [];
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  score = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  wordContainer.innerHTML = '';
  usedLettersElement.innerHTML = '';
  startButton.style.display = 'block';
  drawStick();
}

/** 
  * Represents an array of body parts.
  */
const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters = [];
let mistakes = 0;
let hits = 0;

/**
 * Adds a letter to the usedLettersElement.
 */
const addLetter = (letter) => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
};

/**
 * Adds a body part to the canvas.
 */
const addBodyPart = (bodyPart) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

/** 
 *Code to guess a letter
*/
function guessLetter(letter) {
  if (selectedWord.includes(letter.toUpperCase())) {
    correctLetter(letter);
  } else {
    wrongLetter(letter);
  }
}

/**
 * Checks if the letter is correct.
 */
const correctLetter = (letter) => {
  let foundMatch = false;
  const { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
    const letterElement = children[i].querySelector('.letter');
    if (letterElement.textContent.toLowerCase() === letter.toLowerCase()) {
      letterElement.classList.remove('hidden');
      foundMatch = true;
      hits++;
      score++;
    }
  }
  if (foundMatch && !usedLetters.includes(letter)) {
    usedLetters.push(letter);
    addLetter(letter);
  }
  drawScore();
  if (hits === selectedWord.length) {
    endGame();
    alert("Congratulations! You guessed the word and earned " + score + " points!");
  }
};

/**
 * Use addBodyPart based on mistakes.
 */
const wrongLetter = (letter) => {
  addBodyPart(bodyParts[mistakes]);
  mistakes++;
  if (!usedLetters.includes(letter.toUpperCase())) {
      usedLetters.push(letter.toUpperCase());
      addLetter(letter.toUpperCase());
  }
  if (mistakes === bodyParts.length) {
      endGame();
  }
};
  
/**
 * Ends the game.
 */
const endGame = () => {
  document.removeEventListener('keydown', letterEvent);
  startButton.style.display = 'block';
  let message;
  if (mistakes === bodyParts.length) {
    message = "You lost! The word was: " + selectedWord.join('');
  } else {
    message = `Congratulations! You guessed the word "${selectedWord.join('')}" and earned ${score} points!`;
  }
  alert(message);

  resetGame();
};


/**
 * Shows the score on the canvas.
 */
function drawScore() {
    ctx.font = "15px SF Pixelate";
    ctx.fillStyle = "#d95d39";
    ctx.fillText("Score: " + score, 10, 20);
}

/**
 * Shows the container of the word to guess.
 */
function drawWordContainer() {
  wordContainer.innerHTML = '';
  selectedWord.forEach((letter) => {
    const letterContainer = document.createElement('div');
    letterContainer.classList.add('letter-container');

    const letterElement = document.createElement('span');
    letterElement.classList.add('letter', 'hidden');
    letterElement.textContent = letter;

    const underlineElement = document.createElement('div');
    underlineElement.classList.add('underline');

    letterContainer.appendChild(letterElement);
    letterContainer.appendChild(underlineElement);
    wordContainer.appendChild(letterContainer);
  });
}

/**
 * Select a random word.
 */
const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

/**
 * Draw the stick from which it hangs.
 */
const drawStick = () => {
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.scale(20, 20);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#d95d39';
  ctx.fillRect(0, 7, 4, 1); 
  ctx.fillRect(1, 0, 1, 8); 
  ctx.fillRect(2, 0, 3, 1); 
  ctx.fillRect(4, 1, 1, 1); 
};
