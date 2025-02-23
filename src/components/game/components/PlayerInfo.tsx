import React from "react";

interface PlayerInfoProps {
  playerName: string;
  opponent: string;
  score: { player: number; opponent: number; tie: number };
  result: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  playerName,
  opponent,
  score,
  result,
}) => {
  return (
    <div className="player-info">
      <div className={`player ${result.includes(playerName) ? "winner" : ""}`}>
        <h2>{playerName}</h2>
        <p className="score-text">
          🏆 Score: <span className="score-value">{score.player}</span>
        </p>
      </div>
      <div
        className={`middle-card ${result === "It's a tie!" ? "tie-bg" : ""}`}
      >
        <h2>Tie</h2>
        <p className="score-text">
          🏆 Score: <span className="score-value">{score.tie}</span>
        </p>
      </div>
      <div className={`player ${result.includes(opponent) ? "winner" : ""}`}>
        <h2>{opponent}</h2>
        <p className="score-text">
          🏆 Score: <span className="score-value">{score.opponent}</span>
        </p>
      </div>
    </div>
  );
};

export default PlayerInfo;
