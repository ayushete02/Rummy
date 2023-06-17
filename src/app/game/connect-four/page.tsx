"use client"
import React, { useState, useEffect } from 'react';
import { range } from 'lodash';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import Navbar from '@/components/navbar';
import { Button, Modal } from 'antd';


const ROWS = 6;
const COLS = 7;
const WINNING_LENGTH = 4;

const createEmptyGrid = () => range(ROWS).map(() => range(COLS).fill(null));

const ConnectFour = () => {
    const [grid, setGrid] = useState(createEmptyGrid());
    const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
    const [winner, setWinner] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
        if (currentPlayer === 'yellow') {
            // Simulate computer's move
            const computerMove = generateComputerMove();
            handleCellClick(computerMove.row, computerMove.col);
        }
    }, [currentPlayer]);

    const handleCellClick = (row: number, col: number) => {
        if (winner || grid[row][col]) return;

        const updatedGrid = [...grid];
        updatedGrid[row][col] = currentPlayer;
        setGrid(updatedGrid);

        if (checkWin(updatedGrid, row, col, currentPlayer)) {
            setWinner(currentPlayer);
            showModal()
            setIsPopupOpen(true);
            return;
        }

        if (checkDraw(updatedGrid)) {
            setWinner('draw');
            showModal()
            setIsPopupOpen(true);
            return;
        }

        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    };

    const generateComputerMove = () => {
        const availableMoves: { row: number; col: number }[] = [];

        for (let col = 0; col < COLS; col++) {
            for (let row = ROWS - 1; row >= 0; row--) {
                if (!grid[row][col]) {
                    availableMoves.push({ row, col });
                    break;
                }
            }
        }

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    };

    const checkWin = (
        grid: (string | null)[][],
        row: number,
        col: number,
        player: 'red' | 'yellow'
    ) => {
        let count = 0;

        // Check horizontal
        for (let c = 0; c < COLS; c++) {
            if (grid[row][c] === player) {
                count++;
                if (count === WINNING_LENGTH) return true;
            } else {
                count = 0;
            }
        }

        // Check vertical
        count = 0;
        for (let r = 0; r < ROWS; r++) {
            if (grid[r][col] === player) {
                count++;
                if (count === WINNING_LENGTH) return true;
            } else {
                count = 0;
            }
        }

        // Check diagonal from top-left to bottom-right
        count = 0;
        let r = row;
        let c = col;
        while (r > 0 && c > 0) {
            r--;
            c--;
        }
        while (r < ROWS && c < COLS) {
            if (grid[r][c] === player) {
                count++;
                if (count === WINNING_LENGTH) return true;
            } else {
                count = 0;
            }
            r++;
            c++;
        }

        // Check diagonal from top-right to bottom-left
        count = 0;
        r = row;
        c = col;
        while (r > 0 && c < COLS - 1) {
            r--;
            c++;
        }
        while (r < ROWS && c >= 0) {
            if (grid[r][c] === player) {
                count++;
                if (count === WINNING_LENGTH) return true;
            } else {
                count = 0;
            }
            r++;
            c--;
        }

        return false;
    };

    const checkDraw = (grid: (string | null)[][]) => {
        return grid.every(row => row.every(cell => cell !== null));
    };

    const resetGame = () => {
        setGrid(createEmptyGrid());
        setCurrentPlayer('red');
        setWinner(null);
        handleCancel()
        setIsPopupOpen(false);
    };

    return (
        <>
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
            type="primary"
            loading={loading}
            onClick={resetGame}
          >
            Play again
          </Button>,
        ]}
      >
                                        {winner === 'draw' ? 'It\'s a draw!' : `${winner} wins!`}

      </Modal>
        <Navbar/>
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Connect Four</h1>
            <div className="bg-gray-600 rounded-3xl p-4">
                <div className="grid grid-cols-7 gap-2">
                    {grid.map((row: any[], rowIndex: number) =>
                        row.map((cell: string | null, colIndex: number) => (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                className={clsx(
                                    'w-12 h-12 rounded-full',
                                    {
                                        'bg-red-500': cell === 'red',
                                        'bg-yellow-500': cell === 'yellow',
                                        'bg-white': cell === null,
                                    },
                                    'focus:outline-none'
                                )}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                disabled={winner !== null || currentPlayer === 'yellow'}
                            />
                        ))
                    )}
                </div>
            </div>

           
        </div>
        </>
    );
};

export default ConnectFour;
