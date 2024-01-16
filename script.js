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
  isP1Win: false,
  isP2Win: false,
  p1Marker: playerOne.marker,
  p2Marker: playerTwo.marker,
  getTurn: function () {
    if (this.turn === playerOne) {
      console.log("It is " + playerOne.name + "'s turn");
    } else {
      console.log("It is " + playerTwo.name + "'s turn");
    }
  },
  updateGrid: function (row, column, value) {
    if (gameboard.grid[row][column] === 0) {
      gameboard.grid[row][column] = value;
    } else {
      console.log("Sorry, that spot is taken, please try again");
      this.playerTurn();
    }
  },
  nextTurn: function () {
    this.getTurn();
    if (this.turn === playerOne) {
      // Player One's Turn
      this.p1Turn();
    } else {
      this.updateGrid(
        prompt("Player Two's turn - Choose a row (0, 1 or 2)"),
        prompt("Player Two's turn - Choose a column (0, 1 or 2)"),
        playerTwo.value
      );
      gameflow.turn = playerOne;
      console.log(gameboard.grid);
      this.nextTurn();
    }
  },
  playerTurn: function () {
    this.updateGrid(
      prompt(gameflow.turn.name + "'s turn - Choose a row (0, 1 or 2)"),
      prompt(gameflow.turn.name + "'s turn - Choose a column (0, 1 or 2)"),
      gameflow.turn.value
    );
    if (gameflow.turn === playerOne) {
      gameflow.turn = playerTwo;
    } else {
      gameflow.turn = playerOne;
    }
    console.log(gameboard.grid);
    this.playerTurn();
  },
};
