import React, { useState } from 'react';
import './App.css';

function Tile({ position, value, onTileClick, className }) {
  return (
    <button 
      className={`Tile ${className}`} 
      onClick={() => onTileClick(position)}
    >
      {value}
    </button>
  );
}

function GameBoard() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [gameState, setGameState] = useState('ONGOING');

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combination: combo };
      }
    }
    return null;
  };

  const onTileClick = (position) => {
    if (gameState === 'ONGOING' && !board[position]) {
      const newBoard = [...board];
      newBoard[position] = turn;
      setBoard(newBoard);

      const winnerInfo = checkWinner(newBoard);
      if (winnerInfo) {
        setGameState(`${winnerInfo.winner} Won The Game!`);
      } else if (newBoard.every(tile => tile !== '')) {
        setGameState("It's a Draw");
      } else {
        setTurn(turn === 'X' ? 'O' : 'X');
      }
    }
  };

  const getTileClass = (index) => {
    const winnerInfo = checkWinner(board);
    if (winnerInfo?.combination.includes(index)) {
      return 'winning';
    }
    return '';
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setTurn('X');
    setGameState('ONGOING');
  };

  return (
    <div className='GameContainer'>
      <div className="header">
        <h2 className={gameState === 'ONGOING' ? 'current-player' : ''}>
          {gameState === 'ONGOING' 
            ? `Current Turn: ${turn}` 
            : `Game Over: ${gameState}`
          }
        </h2>
      </div>

      <div className='Board'>
        {board.map((value, index) => (
          <Tile
            key={index}
            position={index}
            value={value}
            className={getTileClass(index)}
            onTileClick={onTileClick}
          />
        ))}
      </div>

      <div className='ButtonContainer'>
        <button className='ResetButton' onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;