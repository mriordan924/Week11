// add sounds to game
const clickSoundX = document.getElementById("clickSoundX");
const clickSoundO = document.getElementById("clickSoundO");

function playClickSound(player) {
    const clickSound = player === "X" ? clickSoundX : clickSoundO;
    clickSound.currentTime = 0; // rewinds sound
    clickSound.play();
}
// create const to select buttons
const buttons = document.querySelectorAll("button[id]");
const newGameButton = document.getElementById("newGame");
const turnIndicator = document.getElementById("turnIndicator");

// game variables. first player is X
let currentPlayer = "X";
// let gameBoard = []; used empty strings instead so i don't have to worry about index/easier to keep track
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false; 
let cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', buttonClick);
});
// function for turn indactor
function updateTurnIndicator() {
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

// button event functions to allow empty button to change to X or O, check to see if there is a win, switch players until there is OR alert if there is a tie
function buttonClick(event) {
  const buttonId = event.target.id;
  const cell = event.target;

//   if (!gameOver && gameBoard[buttonId] === "") {
     // gameBoard[buttonId] = currentPlayer;
    // event.target.textContent = currentPlayer;

    if (!gameOver && cell.getAttribute("data-value") === "") {
        playClickSound(currentPlayer);
        cell.setAttribute("data-value", currentPlayer);
        cell.classList.add(currentPlayer.toLowerCase());
        gameBoard[buttonId] = currentPlayer;
        // currentPlayer = currentPlayer === "X" ? "O" : "X";
        // updateTurnIndicator(); move below. this was causing game winner alert to pop up after losing player took unnecessary last move

    if (checkWin(currentPlayer)) {
      showModal(`Player ${currentPlayer} WINS!`);
      gameOver = true;
    

    // } else if (!gameBoard.includes("")) {
    //   alert("It's a draw!");
    //   gameOver = true;
    // }

    } else if (!Array.from(cells).some(cell => cell.getAttribute("data-value") === "")) {
        showModal("It's a DRAW!");
        gameOver = true;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
  }
}

// I want my x's and o's to be images so i tried to change function above but didn't work and now my x's and o's are gone. back to modifying above function instead.

// const cells = document.querySelector('.cell');

// cells.forEach(cell => {
//     cell.addEventListener("click", () => {
//       if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
//         cell.classList.add(currentPlayer.toLowerCase());
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//       }
//     });
//   });


// function to check if a player has won by creating winning combinations using button ids
function checkWin(player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => combo.every(position => gameBoard[position] === player));
}

//add sounds to new game

function playNewGameSound() {
    const newGameSound = document.getElementById("newGameSound");
    newGameSound.currentTime = 0;
    newGameSound.play();
  }
  
// new game (changed when added images for x and o)
function startNewGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
          cell.setAttribute("data-value", ""); // reset data value
          cell.classList.remove("x", "o"); // remove class for X or O
        });
        gameOver = false;
        currentPlayer = "X";
        updateTurnIndicator();
        playNewGameSound();
      }

//   gameBoard = [];
//   gameBoard = ["", "", "", "", "", "", "", "", ""];
//   buttonscell.forEach(button => (button.textContent = ""));
//   gameOver = false;
//   currentPlayer = "X";
// }

// button event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));
newGameButton.addEventListener("click", startNewGame);

updateTurnIndicator();

// popup with sound
function playYaySound() {
    const yaySound = document.getElementById("yaySound");
    yaySound.currentTime = 0;
    yaySound.play();
  }

const messageModal = document.getElementById("messageModal");
const messageText = document.getElementById("messageText");
const closeModalButton = document.getElementById("closeModal");

// customize message
function showModal(message) {
  messageText.textContent = message;
  messageModal.style.display = "flex";
}

// close button (yay!) trying to add confetti also
closeModalButton.addEventListener("click", () => {
    playYaySound();
    showConfetti();
    messageModal.style.display = "none";

  
});
// i want more confetti!
function showConfetti() {
    confetti({
      particleCount: 2000,  // more pieces
      spread: 300,         // spread further
      size: {              // change size
        width: 500,
        height: 500
      }
    });
  }
  


