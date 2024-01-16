// create the gameboard factory function, then wrap it in an IIFE

let gameboard = {
  grid: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

const players = {
  playerOneName: "",
  playerTwoName: "",
  playerOneMarker: "",
  PlayerTwoMarker: "",
};

function createPlayer(name, marker) {
  return { name, marker };
}

createPlayer("Sam", "X");
