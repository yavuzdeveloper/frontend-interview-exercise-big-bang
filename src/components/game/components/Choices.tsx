import React from "react";

import { Choice } from "../../../types";

interface ChoicesProps {
  currentRound: number;
  totalRounds: number;
  onChoice: (choice: Choice) => void;
}

const Choices: React.FC<ChoicesProps> = ({
  currentRound,
  totalRounds,
  onChoice,
}) => {
  return (
    <div className="choices">
      {["rock", "paper", "scissors", "lizard", "spock"].map(choice => (
        <button
          key={choice}
          onClick={() => onChoice(choice as Choice)}
          disabled={currentRound > totalRounds}
        >
          {choice === "rock" && "🪨"}
          {choice === "paper" && "📄"}
          {choice === "scissors" && "✂️"}
          {choice === "lizard" && "🦎"}
          {choice === "spock" && "🖖"}{" "}
          {choice.charAt(0).toUpperCase() + choice.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Choices;
