function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players");
    return;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  // using an alternative way
  if (event.target.tagName != "LI") {
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
  console.log(gameData);
  //first square bracket for main array, there are 3 rows, that is the main array.
  //second square bracket for array inner an array, basically second square bracket for handling which column that selected by user.
  // activePlayer + 1 because we want to player 1 equal to 1 and player 2 equal to 2. 0 for not any player in this game because by default we declare activePlayer = 0, see app.js

  switchPlayer();
}
