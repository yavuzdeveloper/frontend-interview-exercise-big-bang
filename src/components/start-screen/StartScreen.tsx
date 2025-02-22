import { characters } from "../../constant";
import "./StartScreen.css";

interface StartScreenProps {
  onStart: () => void;
  handlePlayerNameChange: (name: string) => void;
  handleOpponentChange: (name: string) => void;
  handleRoundsChange: (rounds: number) => void;
  playerName: string;
  opponent: string;
  rounds: number;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  handlePlayerNameChange,
  handleOpponentChange,
  handleRoundsChange,
  playerName,
  opponent,
  rounds,
}) => {
  return (
    <div className="start-screen">
      <h2>Rock Paper Scissors Lizard Spock</h2>
      <div className="input-group">
        <label htmlFor="playerName">Your Name:</label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={e => handlePlayerNameChange(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="input-group">
        <label htmlFor="opponent">Choose Opponent:</label>
        <select
          id="opponent"
          value={opponent}
          onChange={e => handleOpponentChange(e.target.value)}
        >
          {characters.map(character => (
            <option key={character} value={character}>
              {character}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="rounds">Number of Rounds:</label>
        <input
          type="number"
          id="rounds"
          value={rounds}
          onChange={e => handleRoundsChange(parseInt(e.target.value, 10))}
          min="1"
          max="10"
          placeholder="Enter number of rounds"
        />
      </div>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default StartScreen;
