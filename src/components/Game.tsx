import React, { useState } from "react";
import "./Game.css";

// Define the choices and their types
type ChoiceKey = "rock" | "paper" | "scissors" | "lizard" | "spock";
type Choices = {
  [key in ChoiceKey]: string;
};

const choices: Choices = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
  lizard: "Lizard",
  spock: "Spock",
};

// Define the rules for determining the winner
const rules: {
  [key in ChoiceKey]: { winsAgainst: ChoiceKey[]; reason: string[] };
} = {
  rock: {
    winsAgainst: ["scissors", "lizard"],
    reason: ["Crushes Scissors", "Crushes Lizard"],
  },
  paper: {
    winsAgainst: ["rock", "spock"],
    reason: ["Covers Rock", "Disproves Spock"],
  },
  scissors: {
    winsAgainst: ["paper", "lizard"],
    reason: ["Cuts Paper", "Decapitates Lizard"],
  },
  lizard: {
    winsAgainst: ["paper", "spock"],
    reason: ["Eats Paper", "Poisons Spock"],
  },
  spock: {
    winsAgainst: ["scissors", "rock"],
    reason: ["Smashes Scissors", "Vaporizes Rock"],
  },
};

// Game component
const Game: React.FC = () => {
  // State for player's choice, computer's choice, result, and reason
  const [playerChoice, setPlayerChoice] = useState<ChoiceKey | null>(null);
  const [computerChoice, setComputerChoice] = useState<ChoiceKey | null>(null);
  const [result, setResult] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  // Function to determine the winner and the reason
  const determineWinner = (
    playerChoice: ChoiceKey,
    computerChoice: ChoiceKey
  ): { result: string; reason: string } => {
    if (playerChoice === computerChoice) {
      return { result: "It's a tie!", reason: "" };
    }

    if (rules[playerChoice].winsAgainst.includes(computerChoice)) {
      const reasonIndex =
        rules[playerChoice].winsAgainst.indexOf(computerChoice);
      return {
        result: "You win!",
        reason: rules[playerChoice].reason[reasonIndex],
      };
    } else {
      const reasonIndex =
        rules[computerChoice].winsAgainst.indexOf(playerChoice);
      return {
        result: "Computer wins!",
        reason: rules[computerChoice].reason[reasonIndex],
      };
    }
  };

  // Function to handle player's choice
  const handlePlayerChoice = (choice: ChoiceKey) => {
    const computerChoice = getComputerChoice();
    const { result, reason } = determineWinner(choice, computerChoice);
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(result);
    setReason(reason);
  };

  // Function to generate computer's choice
  const getComputerChoice = (): ChoiceKey => {
    const choicesArray = Object.keys(choices) as ChoiceKey[];
    const randomIndex = Math.floor(Math.random() * choicesArray.length);
    return choicesArray[randomIndex];
  };

  return (
    <div className="Game">
      <div className="choices">
        {(Object.keys(choices) as ChoiceKey[]).map(key => (
          <button key={key} onClick={() => handlePlayerChoice(key)}>
            {choices[key]}
          </button>
        ))}
      </div>
      {playerChoice && computerChoice && (
        <div className="result">
          <p>You chose: {choices[playerChoice]}</p>
          <p>Computer chose: {choices[computerChoice]}</p>
          <p>{result}</p>
          {reason && <p>Reason: {reason}</p>}
        </div>
      )}
    </div>
  );
};

export default Game;
