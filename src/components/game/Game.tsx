import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import "./Game.css";
import { rules } from "../../constant";

// Define the props interface for the Game component
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
  // Hooks for navigation and URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get playerName and opponent from props or URL, default to "Player 1" and "Player 2" if not provided
  const playerName =
    propPlayerName || searchParams.get("playerName") || "Player 1";
  const opponent = propOpponent || searchParams.get("opponent") || "Player 2";

  // Get totalRounds from URL or use propRounds as fallback
  const totalRoundsFromURL = searchParams.get("totalRounds");
  const totalRounds = totalRoundsFromURL
    ? parseInt(totalRoundsFromURL, 10)
    : propRounds;

  // Redirect to the start screen if totalRounds is invalid
  useEffect(() => {
    if (isNaN(totalRounds)) {
      alert("Invalid number of rounds. Redirecting to start screen.");
      navigate("/");
    }
  }, [totalRounds, navigate]);

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

  // State variables for game logic
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [score, setScore] = useState<{
    player: number;
    opponent: number;
    tie: number;
  }>({
    player: initialPlayerScore,
    opponent: initialOpponentScore,
    tie: initialTieScore,
  });
  const [currentRound, setCurrentRound] = useState<number>(
    parseInt(searchParams.get("currentRound") || "1", 10) // Current round, default to 1
  );
  const [winner, setWinner] = useState<string | null>(null);
  const { width, height } = useWindowSize(); // Get window dimensions for Confetti

  // Update URL with playerName, opponent, rounds, and score information
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

    // Add score information to URL
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

  // Determine the winner when all rounds are completed
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

  // Clear the winner message after 7 seconds
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        setWinner(null);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [winner]);

  // Function to determine the winner and the reason
  const determineWinner = (
    playerChoice: string,
    opponentChoice: string
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

  // Function to handle player's choice
  const handlePlayerChoice = (choice: string) => {
    const opponentChoice = getOpponentChoice();
    const { result, reason } = determineWinner(choice, opponentChoice);
    setPlayerChoice(choice);
    setOpponentChoice(opponentChoice);
    setResult(result);
    setReason(reason);

    // Update score based on the result
    if (result.includes(playerName)) {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (result.includes(opponent)) {
      setScore(prev => ({ ...prev, opponent: prev.opponent + 1 }));
    } else if (result === "It's a tie!") {
      setScore(prev => ({ ...prev, tie: prev.tie + 1 }));
    }

    // Increment the current round
    setCurrentRound(prev => prev + 1);
  };

  // Function to generate opponent's choice randomly
  const getOpponentChoice = (): string => {
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // Function to restart the game
  const handleRestart = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setResult("");
    setReason("");
    setScore({ player: 0, opponent: 0, tie: 0 });
    setCurrentRound(1); // Reset the round counter
  };

  // Function to exit the game and return to the start screen
  const handleExitGame = () => {
    setScore({ player: 0, opponent: 0, tie: 0 });
    onRestart();
    navigate("/");
  };

  return (
    <div className="Game">
      <div className="game-header">
        <h2 className="game-title">Rock Paper Scissors Lizard Spock</h2>
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

        {/* Display winner card if all rounds are completed */}
        {currentRound > totalRounds ? (
          <div className="winner-card">
            <h3>Game Over!</h3>
            <p>
              {score.player > score.opponent
                ? `${playerName} wins the game! 🎉`
                : score.opponent > score.player
                ? `${opponent} wins the game! 🎉`
                : "It's a tie game! 🤝"}
            </p>
            <button onClick={handleRestart} className="restart-button">
              Play Again
            </button>
          </div>
        ) : (
          <p className="round-info">
            Round: <span>{currentRound}</span> / <span>{totalRounds}</span>
          </p>
        )}
      </div>
      <div className="player-info">
        <div
          className={`player ${result.includes(playerName) ? "winner" : ""}`}
        >
          <h2>{playerName}</h2>
          <p>Score: {score.player}</p>
        </div>
        {/* Display tie score */}
        <div
          className={`middle-card ${result === "It's a tie!" ? "tie-bg" : ""}`}
        >
          <h2>Tie</h2>
          <p>Score: {score.tie}</p>
        </div>
        <div className={`player ${result.includes(opponent) ? "winner" : ""}`}>
          <h2>{opponent}</h2>
          <p>Score: {score.opponent}</p>
        </div>
      </div>
      <div className="choices">
        {["rock", "paper", "scissors", "lizard", "spock"].map(choice => (
          <button
            key={choice}
            onClick={() => handlePlayerChoice(choice)}
            disabled={currentRound > totalRounds}
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>

      {/* Display result and choices if both player and opponent have made a choice */}
      {playerChoice && opponentChoice && (
        <div
          className={`result ${
            result.includes(playerName)
              ? "win"
              : result.includes(opponent)
              ? "lose"
              : "tie"
          }`}
        >
          <h3 className="result-title">
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
      )}

      {/* Action buttons for restarting or exiting the game */}
      <div className="action-buttons">
        <button onClick={handleRestart} className="restart-button">
          Restart Game
        </button>
        <button onClick={handleExitGame} className="exit-button">
          Exit Game
        </button>
      </div>
    </div>
  );
};

export default Game;
