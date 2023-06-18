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
  // Image URLs for game options
};

const getGameResult = (
  userOption: GameOption,
  computerOption: GameOption
): GameResult => {
  // Determine game result
};

const StonePaperScissorsGame: React.FC = () => {
  const [userOption, setUserOption] = useState<GameOption | null>(null);
  const [computerOption, setComputerOption] = useState<GameOption | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (userOption && computerOption) {
      const result = getGameResult(userOption, computerOption);
      setGameResult(result);
      setShowDialog(true);
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
    // Return color based on game result
  };

  const updateUserData = async (isWin: boolean) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isWin,
        }),
      };

      const response = await fetch("/api/updates", requestOptions);
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    // Game UI components
  );
};

export default StonePaperScissorsGame;
