import { useState } from "react";

const TURNS = {
  X: "×",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  console.log(board);

  const [turn, setTurn] = useState(TURNS.X);

  // null == no winner, false == draw
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
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

  const updateBoard = (index) => {
    // don't update this position if it's already filled
    // or there is already a winner
    if (board[index] || winner) {
      return;
    }

    // update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // update turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // check for winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
