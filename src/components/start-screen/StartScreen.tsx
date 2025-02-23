import React from "react";

import { characters } from "../../constant";
import "./StartScreen.css";

interface StartScreenProps {
  onStart: () => void;
  handleGameStateChange: (
    key: string,
    value: string | number | boolean
  ) => void;
  playerName: string;
  opponent: string;
  rounds: number;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  handleGameStateChange,
  playerName,
  opponent,
  rounds,
}) => {
  return (
    <div className="start-screen">
      <div className="input-group">
        <label htmlFor="playerName">* Your Name:</label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={e => handleGameStateChange("playerName", e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="input-group">
        <label htmlFor="opponent">* Choose Opponent:</label>
        <select
          id="opponent"
          value={opponent}
          onChange={e => handleGameStateChange("opponent", e.target.value)}
          className={!opponent ? "placeholder-selected" : ""}
        >
          <option value="" disabled>
            Select an opponent
          </option>
          {characters.map(character => (
            <option key={character} value={character}>
              {character}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="rounds">* Number of Rounds:</label>
        <input
          type="number"
          id="rounds"
          value={rounds}
          onChange={e =>
            handleGameStateChange("rounds", parseInt(e.target.value, 10))
          }
          min="1"
          max="10"
          placeholder="Enter number of rounds"
        />
      </div>
      <button onClick={onStart}>🚀 Start Game</button>
    </div>
  );
};

export default StartScreen;
