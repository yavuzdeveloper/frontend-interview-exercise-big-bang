import React from "react";

interface WinnerCardProps {
  playerName: string;
  opponent: string;
  score: { player: number; opponent: number; tie: number };
  onRestart: () => void;
}

const WinnerCard: React.FC<WinnerCardProps> = ({
  playerName,
  opponent,
  score,
  onRestart,
}) => {
  return (
    <div className="winner-card">
      <h3>Game Over!</h3>
      <p>
        🏆{" "}
        {score.player > score.opponent
          ? `${playerName} wins the game! 🎉`
          : score.opponent > score.player
          ? `${opponent} wins the game! 🎉`
          : "It's a tie game! 🤝"}
      </p>
      <button onClick={onRestart} className="restart-button">
        🔄 Play Again
      </button>
    </div>
  );
};

export default WinnerCard;
