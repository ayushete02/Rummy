'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button, Modal } from 'antd';


enum GameOption {
    Rock = "rock",
    Paper = "paper",
    Scissors = "scissors",
}

enum GameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
}

const gameOptions: GameOption[] = [
    GameOption.Rock,
    GameOption.Paper,
    GameOption.Scissors,
];

const getImageSource = (option: GameOption): string => {
    

    switch (option) {
        case GameOption.Rock:
            return "https://nehalhazem.github.io/rockPaperScissors.io/img/rock.png";
        case GameOption.Paper:
            return "https://nehalhazem.github.io/rockPaperScissors.io/img/paper.png";
        case GameOption.Scissors:
            return "https://nehalhazem.github.io/rockPaperScissors.io/img/scissors.png";
        default:
            return "";
    }
};

const getGameResult = (
    userOption: GameOption,
    computerOption: GameOption
): GameResult => {
    if (userOption === computerOption) {
        return GameResult.Draw;
    } else if (
        (userOption === GameOption.Rock && computerOption === GameOption.Scissors) ||
        (userOption === GameOption.Paper && computerOption === GameOption.Rock) ||
        (userOption === GameOption.Scissors && computerOption === GameOption.Paper)
    ) {
        return GameResult.Win;
    } else {
        return GameResult.Lose;
    }
};

const StonePaperScissorsGame: React.FC = () => {
    const [userOption, setUserOption] = useState<GameOption | null>(null);
    const [computerOption, setComputerOption] = useState<GameOption | null>(null);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);
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
        if (userOption && computerOption) {
            const result = getGameResult(userOption, computerOption);
            setGameResult(result);
        }
    }, [computerOption]);

    const playAgain = () => {
        setUserOption(null);
        setComputerOption(null);
        setGameResult(null);
        handleCancel();
    };

    const makeComputerOption = () => {
        const randomIndex = Math.floor(Math.random() * gameOptions.length);
        setComputerOption(gameOptions[randomIndex]);
    };

    const selectOption = (option: GameOption) => {
        setUserOption(option);
        makeComputerOption();
    };

    const getResultColor = (): string => {
        switch (gameResult) {
            case GameResult.Win:
                showModal()
                return "green";
            case GameResult.Lose:
                showModal()
                return "red";
            case GameResult.Draw:
                showModal()
                return "yellow";
            default:
                return "";
        }
    };

    return (<>
    
    <Navbar/>
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
            onClick={playAgain}
          >
            Play again
          </Button>,
        ]}
      >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-black p-8 rounded-lg">
                            <h2
                                className={`text-2xl font-bold text-center mb-4 ${getResultColor()}`}
                            >
                                {gameResult === GameResult.Win && "You win!"}
                                {gameResult === GameResult.Lose && "You lose!"}
                                {gameResult === GameResult.Draw && "It's a draw!"}
                            </h2>
                            <div className="flex space-x-4 mt-4">
                                <div className="flex-1">
                                    <h3 className="font-bold">You</h3>
                                    {userOption && (
                                        <img
                                            src={getImageSource(userOption)}
                                            alt={userOption}
                                            className="w-24 h-24 object-cover mt-2"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold">Computer</h3>
                                    {computerOption && (
                                        <img
                                            src={getImageSource(computerOption)}
                                            alt={computerOption}
                                            className="w-24 h-24 object-cover mt-2"
                                        />
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </div>
      </Modal>
        <div className="flex justify-center items-center h-screen">
            <div className="space-x-4">
                <h1 className="text-4xl font-bold mb-4">Stone Paper Scissors</h1>
                <div className="flex space-x-4">
                    {gameOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => selectOption(option)}
                            className={`w-32 h-32 border-2 border-gray-400 rounded-lg ${userOption === option ? "border-blue-500" : ""
                                }`}
                        >
                            <img
                                src={getImageSource(option)}
                                alt={option}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
              
            </div>
        </div>
    </>

    );
};

export default StonePaperScissorsGame;
