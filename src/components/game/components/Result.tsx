import React from "react";

interface ResultProps {
  result: string;
  reason: string;
  playerName: string;
  opponent: string;
  playerChoice: string;
  opponentChoice: string;
}

const Result: React.FC<ResultProps> = ({
  result,
  reason,
  playerName,
  opponent,
  playerChoice,
  opponentChoice,
}) => {
  return (
    <div
      className={`result ${
        result.includes(playerName)
          ? "win"
          : result.includes(opponent)
          ? "lose"
          : "tie"
      }`}
    >
      <h3>
        {result}
        {reason && <span className="reason"> ({reason})</span>}
      </h3>
      <div className="choices-display">
        <p className="choice-text">
          <span className="choice-label">{playerName} chose:</span>
          <span className="choice-value">{playerChoice}</span>
        </p>
        <p className="choice-text">
          <span className="choice-label">{opponent} chose:</span>
          <span className="choice-value">{opponentChoice}</span>
        </p>
      </div>
    </div>
  );
};

export default Result;
