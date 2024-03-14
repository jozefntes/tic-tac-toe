import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // loop through all the winner combos
  // to see if X or O won
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    // Check that the positions are not null and that they are the same
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // no winnner yet
  return null;
};

export const checkEndGame = (boardToCheck) => {
    // check if there is a draw
    // if there is no more empty spaces on the board
    // will return true if every space is not null (×, o)
    return boardToCheck.every((square) => square !== null);
  };
