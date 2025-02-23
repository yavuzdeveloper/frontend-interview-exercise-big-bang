import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import automataLogo from "../assets/automata.png";
import Game from "../components/game/Game";
import StartScreen from "../components/start-screen/StartScreen";
import Toast from "../components/toast/Toast";
import { Character } from "../types";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState({
    playerName: "",
    opponent: "" as Character,
    rounds: 3,
    gameStarted: false,
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleGameStateChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setGameState(prev => ({ ...prev, [key]: value }));
  };

  const onStart = () => {
    const { playerName, opponent } = gameState;
    if (!playerName || !opponent) {
      setToastMessage("⚠️ Please ensure all required fields are filled in.");
      return;
    }
    handleGameStateChange("gameStarted", true);
  };

  const onRestart = () => {
    handleGameStateChange("gameStarted", false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              gameState.gameStarted ? (
                <Navigate to="/game" replace />
              ) : (
                <>
                  {!gameState.gameStarted && (
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
                  <StartScreen
                    onStart={onStart}
                    handleGameStateChange={handleGameStateChange}
                    playerName={gameState.playerName}
                    opponent={gameState.opponent}
                    rounds={gameState.rounds}
                  />
                </>
              )
            }
          />
          <Route
            path="/game"
            element={
              <Game
                playerName={gameState.playerName}
                opponent={gameState.opponent}
                rounds={gameState.rounds}
                onRestart={onRestart}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
