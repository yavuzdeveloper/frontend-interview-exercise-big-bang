import { useState, useEffect } from "react";

import { rules } from "../constant";
import { Choice } from "../types";

interface GameLogic {
  playerChoice: Choice | null;
  opponentChoice: Choice | null;
  result: string;
  reason: string;
  score: { player: number; opponent: number; tie: number };
  currentRound: number;
  winner: string | null;
  handlePlayerChoice: (choice: Choice) => void;
  handleRestart: () => void;
}

interface InitialState {
  player: number;
  opponent: number;
  tie: number;
  currentRound: number;
}

export const useGameLogic = (
  playerName: string,
  opponent: string,
  totalRounds: number,
  initialState: InitialState
): GameLogic => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [score, setScore] = useState<{
    player: number;
    opponent: number;
    tie: number;
  }>({
    player: initialState.player,
    opponent: initialState.opponent,
    tie: initialState.tie,
  });
  const [currentRound, setCurrentRound] = useState<number>(
    initialState.currentRound
  );
  const [winner, setWinner] = useState<string | null>(null);

  const determineWinner = (
    playerChoice: Choice,
    opponentChoice: Choice
  ): { result: string; reason: string } => {
    if (playerChoice === opponentChoice) {
      return { result: "It's a tie!", reason: "" };
    }

    if (rules[playerChoice].winsAgainst.includes(opponentChoice)) {
      const reasonIndex =
        rules[playerChoice].winsAgainst.indexOf(opponentChoice);
      return {
        result: `${playerName} wins!`,
        reason: rules[playerChoice].reason[reasonIndex],
      };
    } else {
      const reasonIndex =
        rules[opponentChoice].winsAgainst.indexOf(playerChoice);
      return {
        result: `${opponent} wins!`,
        reason: rules[opponentChoice].reason[reasonIndex],
      };
    }
  };

  const getOpponentChoice = (): Choice => {
    const choices: Choice[] = ["rock", "paper", "scissors", "lizard", "spock"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handlePlayerChoice = (choice: Choice) => {
    const opponentChoice = getOpponentChoice();
    const { result, reason } = determineWinner(choice, opponentChoice);
    setPlayerChoice(choice);
    setOpponentChoice(opponentChoice);
    setResult(result);
    setReason(reason);

    if (result.includes(playerName)) {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (result.includes(opponent)) {
      setScore(prev => ({ ...prev, opponent: prev.opponent + 1 }));
    } else if (result === "It's a tie!") {
      setScore(prev => ({ ...prev, tie: prev.tie + 1 }));
    }

    setCurrentRound(prev => prev + 1);
  };

  const handleRestart = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setResult("");
    setReason("");
    setScore({ player: 0, opponent: 0, tie: 0 });
    setCurrentRound(1);
    setWinner(null);
  };

  useEffect(() => {
    if (currentRound > totalRounds) {
      let winnerMessage = "";
      if (score.player > score.opponent) {
        winnerMessage = `${playerName} wins the game!`;
      } else if (score.opponent > score.player) {
        winnerMessage = `${opponent} wins the game!`;
      } else {
        winnerMessage = "It's a tie game!";
      }
      setWinner(winnerMessage);
    }
  }, [currentRound, totalRounds, score, playerName, opponent]);

  return {
    playerChoice,
    opponentChoice,
    result,
    reason,
    score,
    currentRound,
    winner,
    handlePlayerChoice,
    handleRestart,
  };
};
