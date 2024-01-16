// create the gameboard factory function, then wrap it in an IIFE

let gameboard = {
  grid: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

function createPlayer(name, marker) {
  return {
    name,
    marker,
  };
}

let playerOne = createPlayer("Player One", "X");
let playerTwo = createPlayer("Player Two", "O");

let gameFlow = {
  isP1Turn: true,
  isP1Win: false,
  isP2Win: false,
  p1Marker: playerOne.marker,
  p2Marker: playerTwo.marker,
};
