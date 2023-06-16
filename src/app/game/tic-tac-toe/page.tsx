"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button, Modal } from 'antd';
import Navbar from '@/components/navbar';


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [player, setPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    checkWinner();
    if (player === 'O' && !gameOver) {
      setTimeout(makeComputerMove, 500);
    }
  }, [board]);

  const makeMove = (index: number) => {
    if (board[index] === '' && !gameOver) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const makeComputerMove = () => {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        emptyCells.push(i);
      }
    }
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      makeMove(emptyCells[randomIndex]);
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setGameOver(true);
        setMessage(`${board[a]} wins!`);
        showModal()

        return;
      }
    }

    if (board.every((cell) => cell !== '')) {
      setGameOver(true);
      setMessage("It's a tie!");
      showModal()
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setPlayer('X');
    setGameOver(false);
    setMessage('');
  };

  return (

    <div className='bg-black'>
      <Modal
        open={open}
        centered
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" href="/" onClick={handleCancel}>
            Back
          </Button>,

          <Button
            key="link"
            href="/game/tic-tac-toe"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Play again
          </Button>,
        ]}
      >
        {message}
      </Modal>
      <Navbar/>

    
      <div className="min-h-screen flex items-center justify-center ">

        <Head>
          <title >Tic Tac Toe</title>
        </Head>
        <div className=''>
          <h1 className="text-5xl text-center mb-6 font-semibold">Tic Tac Toe</h1>
          <div className="bg-white p-4 min-w-3xl w-[550px] h-[550px] max-w-3xl rounded-lg shadow-md">
            <div className="grid grid-cols-3 gap-6 text-4xl justify-center m-auto">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className={`border w-[150px] h-[150px] border-gray-300 m-auto rounded-lg p-4 flex items-center justify-center max-w-xl text-8xl cursor-pointer ${cell === 'X' ? 'text-red-500' : 'text-blue-500'
                    }`}
                  onClick={() => makeMove(index)}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="mt-4">
            {gameOver && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={resetGame}
              >
                Play Again
              </button>
            )}
            {message && <p className="mt-4">{message}</p>}
          </div> */}
        </div>
      </div>

    </div>

  );
};

export default TicTacToe;
