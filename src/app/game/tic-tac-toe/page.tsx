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

  const [address, setAddress] = useState('');
  const [bolAddress, setBolAddress] = useState(false);

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
        console.log("this is board :", board[a]);
        console.log(typeof (board[a]));
        showModal();
        if (board[a] == "X") {
          updateUserData(true);
        }
        else {
          updateUserData(false);
        }
        return;
      }
    }

    if (board.every((cell) => cell !== '')) {
      setGameOver(true);
      setMessage("It's a tie!");
      showModal();
      //updateUserData(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setPlayer('X');
    setGameOver(false);
    setMessage('');
  };

  const updateUserData = async (isWin: boolean) => {
    try {
      if (bolAddress) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "walletAddress": address,
          "isWin": isWin
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("/api/updates", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
        try {
          const ethereum = (window as any).ethereum;
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          setAddress(accounts[0]);
          setBolAddress(true);
          console.log('Connected account address:', address);
        } catch (error) {
          console.error('Error connecting wallet:', error);
          alert('Failed to connect to MetaMask');
        }
      } else {
        alert('MetaMask is not installed');
      }
    };

    connectWallet();
  }, []);


  return (
    <div className="bg-black">
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
      {/* <Navbar /> */}

      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Tic Tac Toe</title>
        </Head>
        <div className="">
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
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
