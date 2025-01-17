let randomNumber = parseInt(Math.random() * 100 + 1); // Generate a random number between 1 and 100

const submit = document.querySelector('#subt'); // Button for submitting guesses
const userInput = document.querySelector('#guessField'); // Input field for user guess
const guessesSlot = document.querySelector('.guesses'); // Slot to display past guesses
const remaining = document.querySelector('.lastResult'); // Display remaining attempts
const lowOrHi = document.querySelector('.lowOrHi'); // Hint for "low" or "high"
const starOver = document.querySelector('.resultParas'); // Section for displaying new game button
const p = document.createElement('p'); // Create paragraph element for "Start New Game"

let prevGuess = []; // Array to store previous guesses
let numGuess = 1; // Track the number of guesses
let playGame = true; // State to manage game flow

// Main event listener for submitting guesses
if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission (if inside a form)
    const guess = parseInt(userInput.value); // Get user input
    validateGuess(guess); // Validate and process the guess
  });
}

// Function to validate the guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number.');
  } else if (guess < 1) {
    alert('Please enter a number greater than 1.');
  } else if (guess > 100) {
    alert('Please enter a number less than 100.');
  } else {
    prevGuess.push(guess); // Add guess to previous guesses
    if (numGuess === 11) { // Max guesses reached
      displayGuess(guess);
      displayMessage(`Game over! The random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess); // Display the current guess
      checkGuess(guess); // Check if the guess is correct
    }
  }
}

// Function to check the user's guess
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed right!`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`The number is TOO LOW. Try again!`);
  } else if (guess > randomNumber) {
    displayMessage(`The number is TOO HIGH. Try again!`);
  }
}

// Function to display guesses and remaining attempts
function displayGuess(guess) {
  userInput.value = ''; // Clear input field
  guessesSlot.innerHTML += `${guess} `; // Display the guess
  numGuess++; // Increment guess count
  remaining.innerHTML = `${11 - numGuess}`; // Update remaining attempts
}

// Function to display messages
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// Function to handle the end of the game
function endGame() {
  userInput.value = ''; // Clear input field
  userInput.setAttribute('disabled', ''); // Disable input field
  p.classList.add('button'); // Add styling to the paragraph
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`; // Add "Start New Game" button
  starOver.appendChild(p); // Append the paragraph to the container
  playGame = false; // Disable further game play
  newGame(); // Attach event listener for the new game
}

// Function to reset the game
function newGame() {
  const newGameButton = document.querySelector('#newGame'); // Select new game button
  newGameButton.addEventListener('click', function () {
    randomNumber = parseInt(Math.random() * 100 + 1); // Generate a new random number
    prevGuess = []; // Reset guesses
    numGuess = 1; // Reset guess count
    guessesSlot.innerHTML = ''; // Clear previous guesses
    remaining.innerHTML = `${11 - numGuess}`; // Reset remaining attempts
    userInput.removeAttribute('disabled'); // Enable input field
    starOver.removeChild(p); // Remove the "Start New Game" button
    playGame = true; // Enable game play
  });
}
