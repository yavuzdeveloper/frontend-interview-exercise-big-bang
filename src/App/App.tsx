import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import automataLogo from "../assets/automata.png";
import Game from "../components/game/Game";
import "./App.css";
import { Character } from "../types";
import StartScreen from "../components/start-screen/StartScreen";

function App() {
  // State variables to manage player name, selected opponent, number of rounds, and game status
  const [playerName, setPlayerName] = useState<string>("");
  const [opponent, setOpponent] = useState<Character>("" as Character);
  const [rounds, setRounds] = useState<number>(3);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Handler to update the player's name
  const handlePlayerNameChange = (name: string) => {
    setPlayerName(name);
  };

  // Handler to update the selected opponent
  const handleOpponentChange = (opponent: string) => {
    setOpponent(opponent as Character);
  };

  // Handler to update the number of rounds
  const handleRoundsChange = (rounds: number) => {
    setRounds(rounds);
  };

  // Function to start the game
  const onStart = () => {
    // Check if the player name and opponent are selected
    if (playerName === "" || opponent === ("" as Character)) {
      alert("Please enter your name and select an opponent.");
      return;
    }
    // If valid, set the game status to started
    setGameStarted(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Homepage (StartScreen) */}
          <Route
            path="/"
            element={
              gameStarted ? (
                // If the game has started, navigate to the game page
                <Navigate to="/game" replace />
              ) : (
                <>
                  {!gameStarted && (
                    <a
                      href="https://automata.tech/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={automataLogo}
                        className="logo automata"
                        alt="Automata logo"
                      />
                    </a>
                  )}
                  <h2 className="game-title">
                    🪨 Rock 📄 Paper ✂️ Scissors 🦎 Lizard 🖖 Spock
                  </h2>

                  {/* StartScreen component for player input */}
                  <StartScreen
                    onStart={onStart}
                    handlePlayerNameChange={handlePlayerNameChange}
                    handleOpponentChange={handleOpponentChange}
                    playerName={playerName}
                    opponent={opponent}
                    rounds={rounds}
                    handleRoundsChange={handleRoundsChange}
                  />
                </>
              )
            }
          />
          {/* Game page (Game) */}
          <Route
            path="/game"
            element={
              <Game
                playerName={playerName}
                opponent={opponent}
                rounds={rounds}
                onRestart={() => setGameStarted(false)} // Restart the game by resetting the game status
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
