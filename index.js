const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("game-status");
const restartBtn = document.getElementById("restart-btn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let selectOptions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellIsClicked));
  restartBtn.addEventListener("click", restartGame);
  gameStatus.textContent = `Make your move, ${currentPlayer}`;
  running = true;
}

function cellIsClicked() {
  const cellIndex = this.getAttribute("index");

  if (selectOptions[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();

  if (running) {
    changePlayer();
  }
}

function updateCell(cell, index) {
  selectOptions[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "O" ? "X" : "O";
  gameStatus.textContent = `Make your move, ${currentPlayer}`;
}

function checkWinner() {
  let roundFinished = false;

  for (let index = 0; index < winConditions.length; index++) {
    const condition = winConditions[index];
    const cellA = selectOptions[condition[0]];
    const cellB = selectOptions[condition[1]];
    const cellC = selectOptions[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundFinished = true;
      break;
    }
  }

  if (roundFinished) {
    gameStatus.textContent = `${currentPlayer} takes it home!`;
    running = false;
  } else if (!selectOptions.includes("")) {
    gameStatus.textContent = `It's a draw`;
    running = false;
  }
}

function restartGame() {
  currentPlayer = "O";
  selectOptions = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `Make your move, ${currentPlayer}`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
