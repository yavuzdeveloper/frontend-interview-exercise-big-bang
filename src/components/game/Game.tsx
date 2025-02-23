import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import "./Game.css";
import { useGameLogic } from "../../hooks/useGameLogic";
import WinnerCard from "./components/WinnerCard";
import PlayerInfo from "./components/PlayerInfo";
import Choices from "./components/Choices";
import Result from "./components/Result";

interface GameProps {
  playerName: string;
  opponent: string;
  rounds: number;
  onRestart: () => void;
}

const Game: React.FC<GameProps> = ({
  playerName: propPlayerName,
  opponent: propOpponent,
  rounds: propRounds,
  onRestart,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // Get initial values from URL or props
  const playerName =
    propPlayerName || searchParams.get("playerName") || "Player 1";
  const opponent = propOpponent || searchParams.get("opponent") || "Player 2";
  const totalRounds = parseInt(
    searchParams.get("totalRounds") || propRounds.toString(),
    10
  );

  // Get initial scores from URL or default to 0
  const initialPlayerScore = parseInt(
    searchParams.get("playerScore") || "0",
    10
  );
  const initialOpponentScore = parseInt(
    searchParams.get("opponentScore") || "0",
    10
  );
  const initialTieScore = parseInt(searchParams.get("tieScore") || "0", 10);

  // Get currentRound from URL or default to 1
  const initialCurrentRound = parseInt(
    searchParams.get("currentRound") || "1",
    10
  );

  const {
    playerChoice,
    opponentChoice,
    result,
    reason,
    score,
    currentRound,
    winner,
    handlePlayerChoice,
    handleRestart,
  } = useGameLogic(playerName, opponent, totalRounds, {
    player: initialPlayerScore,
    opponent: initialOpponentScore,
    tie: initialTieScore,
    currentRound: initialCurrentRound,
  });

  // Update URL with game state
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Add playerName, opponent, and totalRounds to URL if not already present
    if (!params.has("playerName")) {
      params.set("playerName", playerName);
    }
    if (!params.has("opponent")) {
      params.set("opponent", opponent);
    }
    if (!params.has("totalRounds")) {
      params.set("totalRounds", totalRounds.toString());
    }

    // Add score and current round to URL
    params.set("playerScore", score.player.toString());
    params.set("opponentScore", score.opponent.toString());
    params.set("tieScore", score.tie.toString());
    params.set("currentRound", currentRound.toString());

    // Update URL
    setSearchParams(params);
  }, [
    playerName,
    opponent,
    totalRounds,
    score,
    currentRound,
    searchParams,
    setSearchParams,
  ]);

  const handleExitGame = () => {
    onRestart();
    navigate("/");
  };

  return (
    <div className="Game">
      <h2 className="game-title">
        🪨 Rock 📄 Paper ✂️ Scissors 🦎 Lizard 🖖 Spock
      </h2>
      <div className="game-header">
        {winner && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"]}
            gravity={0.2}
            wind={0.05}
          />
        )}
        {currentRound > totalRounds ? (
          <WinnerCard
            playerName={playerName}
            opponent={opponent}
            score={score}
            onRestart={handleRestart}
          />
        ) : (
          <p className="round-info">
            Round: <span>{currentRound}</span> / <span>{totalRounds}</span>
          </p>
        )}
      </div>
      <PlayerInfo
        playerName={playerName}
        opponent={opponent}
        score={score}
        result={result}
      />
      <Choices
        currentRound={currentRound}
        totalRounds={totalRounds}
        onChoice={handlePlayerChoice}
      />
      {playerChoice && opponentChoice && (
        <Result
          result={result}
          reason={reason}
          playerName={playerName}
          opponent={opponent}
          playerChoice={playerChoice}
          opponentChoice={opponentChoice}
        />
      )}
      <div className="action-buttons">
        <button onClick={handleRestart} className="restart-button">
          🔄 Restart Game
        </button>
        <button onClick={handleExitGame} className="exit-button">
          🚪 Exit Game
        </button>
      </div>
    </div>
  );
};

export default Game;
