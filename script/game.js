function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = `You won, <span id="winner-name">PLAYER NAME</span>!`;
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else {
  //   activePlayer = 0;
  // }
  // alternative way
  activePlayer = (activePlayer + 1) % 2;

  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  // using an alternative way
  if (event.target.tagName != "LI" || gameIsOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;
  // - 1 for making an array start from zero like that used to be.

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  //first square bracket for main array, there are 3 rows, that is the main array.
  //second square bracket for array inner an array, basically second square bracket for handling which column that selected by user.
  // activePlayer + 1 because we want to player 1 equal to 1 and player 2 equal to 2. 0 for not any player in this game because by default we declare activePlayer = 0, see app.js

  const playerId = checkForGameOver();

  if (playerId !== 0) {
    endGame(playerId);
  }

  // currentRound = currentRound + 1;
  // or using a shorter way
  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Checking the rows for the equality belongs to same player
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Checking the columns for the equality belongs to same player
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Checking diagonal: Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Checking diagonal: Bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  // Checking for draw
  if (currentRound === 9) {
    return -1;
  }

  // Checking for not have a winner
  return 0;
}

function endGame(playerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (playerId > 0) {
    const winnerName = players[playerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
