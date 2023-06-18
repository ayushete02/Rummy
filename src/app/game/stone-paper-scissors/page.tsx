'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";


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
    const [showDialog, setShowDialog] = useState(false);
    const [address, setAddress] = useState('');
    const [bolAddress, setBolAddress] = useState(false);

    useEffect(() => {
        if (userOption && computerOption) {
            const result = getGameResult(userOption, computerOption);
            setGameResult(result);
            setShowDialog(true);
            console.log(GameResult.Win);
            updateUserData(result === GameResult.Win);
        }
    }, [computerOption]);

    const playAgain = () => {
        setUserOption(null);
        setComputerOption(null);
        setGameResult(null);
        setShowDialog(false);
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
                return "green";
            case GameResult.Lose:
                return "red";
            case GameResult.Draw:
                return "yellow";
            default:
                return "";
        }
    };

    const updateUserData = async (isWin: boolean) => {
        try {
            console.log("im in sps");
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "walletAddress": address,
                    "isWin": isWin
                }),
            };

            const response = await fetch("/api/updates", requestOptions);
            const data = await response.text();
            console.log(data);
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
                {showDialog && (
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
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={playAgain}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                >
                                    Play Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StonePaperScissorsGame;
