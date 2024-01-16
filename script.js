// create the gameboard factory function, then wrap it in an IIFE

let gameboard = {
  grid: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

function createPlayer(name, marker, value) {
  return {
    name,
    marker,
    value,
  };
}

let playerOne = createPlayer("Player One", "X", 1);
let playerTwo = createPlayer("Player Two", "O", 2);

let gameflow = {
  turn: playerOne,
  count: 0,
  gameWon: false,
  playerTurn: function () {
    // Checks if all turns have been taken or if a player has won, and if so, closes the game.
    if (gameflow.count >= 9) {
      console.log("Game over!");
      return;
    } else if (gameflow.gameWon) {
      return;
    }
    // Feeds the current player's info and inputs into the updateGrid function.
    this.updateGrid(
      prompt(gameflow.turn.name + "'s turn - Choose a row (0, 1 or 2)"),
      prompt(gameflow.turn.name + "'s turn - Choose a column (0, 1 or 2)"),
      gameflow.turn.value
    );
    this.hozWinA();
    // Determines which player should be going next.
    if (gameflow.turn === playerOne) {
      gameflow.turn = playerTwo;
    } else {
      gameflow.turn = playerOne;
    }
    // Displays the current state of the game grid and then prompts the next player to take their turn.
    console.log(gameboard.grid);
    this.playerTurn();
  },
  // Updates the grid array with new values
  updateGrid: function (row, column, value) {
    if (gameboard.grid[row][column] === 0) {
      gameboard.grid[row][column] = value;
      gameflow.count++;
    } else {
      // Logic that prevents players from taking up spots that are already taken. Will ask them to try again.
      console.log("Sorry, that spot is taken, please try again");
      this.playerTurn();
    }
  },
  hozWinA: function () {
    let check = gameboard.grid[0].every(
      (element) => element === gameflow.turn.value
    );
    if (check) {
      console.log(gameflow.turn.name + " wins!");
      gameflow.gameWon = true;
    }
  },
};

gameflow.playerTurn();
