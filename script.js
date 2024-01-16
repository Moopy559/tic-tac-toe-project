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

let gameFlow = {
  isP1Turn: true,
  isP1Win: false,
  isP2Win: false,
  p1Marker: playerOne.marker,
  p2Marker: playerTwo.marker,
  getTurn: function () {
    if (this.isP1Turn === true) {
      console.log("It is " + playerOne.name + "'s turn");
    } else {
      console.log("It is " + playerTwo.name + "'s turn");
    }
  },
  updateGrid: function (row, column, value) {
    gameboard.grid[row][column] = value;
  },
  nextTurn: function () {
    if (this.isP1Turn === true) {
      // Player One's Turn
      this.updateGrid(
        prompt("Player One's turn - Choose a row (0, 1 or 2)"),
        prompt("Player One's turn - Choose a column (0, 1 or 2)"),
        playerOne.value
      );
      gameFlow.isP1Turn = false;
      console.log(gameboard.grid);
      this.nextTurn();
    } else {
      this.updateGrid(
        prompt("Player Two's turn - Choose a row (0, 1 or 2)"),
        prompt("Player Two's turn - Choose a column (0, 1 or 2)"),
        playerTwo.value
      );
      gameFlow.isP1Turn = true;
      console.log(gameboard.grid);
      this.nextTurn();
    }
  },
  p1Turn: function () {
    this.updateGrid(
      prompt("which row?"),
      prompt("which column?"),
      playerOne.value
    );
  },
  p2Turn: function () {
    this.updateGrid(
      prompt("which row?"),
      prompt("which column?"),
      playerTwo.value
    );
  },
};
