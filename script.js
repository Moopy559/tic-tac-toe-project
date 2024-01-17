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

// MAIN GAME LOGIC
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

    this.checkWins();
    // Determines which player should be going next.
    if (gameflow.turn === playerOne) {
      gameflow.turn = playerTwo;
    } else {
      gameflow.turn = playerOne;
    }
    // Displays the current state of the game grid and then prompts the next player to take their turn.
    console.log(gameboard.grid);
  },
  // Updates the grid array with new values
  updateGrid: function (row, column, value) {
    gameboard.grid[row][column] = value;
    gameflow.count++;
  },
  // Checks against each possible win scenario and updates gameWon key accordingly.
  checkWins: function () {
    this.hozWin(0);
    this.hozWin(1);
    this.hozWin(2);
    this.vertWin(0);
    this.vertWin(1);
    this.vertWin(2);
    this.diagWin(0, 0, 2, 2);
    this.diagWin(2, 0, 0, 2);
  },
  hozWin: function (row) {
    let check = gameboard.grid[row].every(
      (element) => element === gameflow.turn.value
    );
    if (check) {
      console.log(gameflow.turn.name + " wins!");
      gameflow.gameWon = true;
    }
  },

  vertWin: function (column) {
    let col1 = gameboard.grid[0][column];
    let col2 = gameboard.grid[1][column];
    let col3 = gameboard.grid[2][column];
    let colArray = [col1, col2, col3];

    let check = colArray.every((element) => element === gameflow.turn.value);

    if (check) {
      console.log(gameflow.turn.name + " wins!");
      gameflow.gameWon = true;
    }
  },

  diagWin: function (a, b, c, d) {
    let pointA = gameboard.grid[a][b];
    let pointB = gameboard.grid[1][1];
    let pointC = gameboard.grid[c][d];
    let colArray = [pointA, pointB, pointC];

    let check = colArray.every((element) => element === gameflow.turn.value);

    if (check) {
      console.log(gameflow.turn.name + " wins!");
      gameflow.gameWon = true;
    }
  },
  playGame: function () {
    displayController.container.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        // Checks if the selected cell is available, and if so, updates cell content and respective grid array element.
        if (
          gameboard.grid[button.getAttribute("row")][
            button.getAttribute("column")
          ] === 0
        ) {
          displayController.clickCell(button);
          gameflow.updateGrid(
            button.getAttribute("row"),
            button.getAttribute("column"),
            gameflow.turn.value
          );
          gameflow.playerTurn();
        } else {
          // Informs user cell is taken and prompts them to try again
          console.log("Sorry, that spot is taken, please try again");
        }
      });
    });
  },
};

// DISPLAY RENDERER
let displayController = {
  body: document.querySelector("body"),
  container: document.getElementById("grid-container"),
  buttons: document.querySelectorAll(".grid-buttons"),
  grid: gameboard.grid,
  createDiv: document.createElement("div"),
  createButton: document.createElement("button"),
  renderGame: function () {
    this.createGrid();
  },
  // Dynamically populates DOM with divs and buttons to form gameboard grid
  createGrid: function () {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const button = document.createElement("button");
        button.setAttribute("id", i + "-" + j);
        button.setAttribute("row", i);
        button.setAttribute("column", j);
        this.container.appendChild(button);
      }
    }
    this.container.querySelectorAll("button").forEach((button) => {
      button.classList.add("grid-buttons");
    });
  },
  // Updates a clicked cell with the current player's marker
  clickCell: function (button) {
    button.textContent = gameflow.turn.marker;
  },
};

// START GAME
displayController.renderGame();
gameflow.playGame();
