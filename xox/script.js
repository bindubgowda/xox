const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const popupBtn = document.getElementById("popupBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let startingPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

statusText.textContent = `Player ${currentPlayer}'s turn`;

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", manualRestart);
popupBtn.addEventListener("click", popupRestart);

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        showPopup(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        showPopup("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
}

function popupRestart() {
    popup.style.display = "none";
    autoRestart();
}

function manualRestart() {
    autoRestart();
}

function autoRestart() {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;

    // Change starting player
    startingPlayer = startingPlayer === "X" ? "O" : "X";
    currentPlayer = startingPlayer;

    statusText.textContent = `Player ${currentPlayer}'s turn`;
}
