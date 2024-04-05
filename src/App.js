import './App.css';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import Board from './Board'; 
import Keyboard from './KeyBoard';
import Alert from './Alert';


function App() {
  // Initialize values
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [guessResult, setGuessResult] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  async function validateGuess(guess) {
    try {
      const response = await fetch('https://wordle-apis.vercel.app/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: guess }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not validate guess:", error);
      return null;
    }
  }

  const handleGuessSubmit = async () => {
    const result = await validateGuess(currentGuess);
    if (result) {
      // console.log(result);
      if (result.is_valid_word) {
        setGuessHistory(prevGuessHistory => [...prevGuessHistory, currentGuess]);
        setGuessResult(prevGuessResult => [...prevGuessResult, result.score]);
        setCurrentGuess('');
      } else {
        setAlertMessage('Not a valid English word');
        setShowAlert(true);
      }
    } else {
      console.log('Error validating guess.');
    }
};

  const handleKeyPress = async (key) => {
    if (key === 'ENTER') {
      if (currentGuess.length < 5) {
        setAlertMessage('Not enough letters');
        setShowAlert(true);
      } else {
        await handleGuessSubmit();
      }
    } else if (key === 'DELETE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else {
      if (currentGuess.length < 5)
        setCurrentGuess(currentGuess => currentGuess + key);
    }
};

useEffect(() => {
  console.log(guessResult);
  if (guessResult && guessResult.length > 0) {
    if (guessResult[guessResult.length - 1].every(x => x === 2)) {
      setWin(true);
      setGameOver(true);
      setShowAlert(true);
      setAlertMessage('You Succeed!');
    }
    else if (!win && guessResult.length === 6) {
      setGameOver(true);
      setShowAlert(true);
      setAlertMessage('You Lost!');
    }
  }
}, [guessResult]);

  
  // 重新开始游戏
  const restartGame = () => {
  setCurrentGuess('');
  setGuessHistory([]);
  setGuessResult([]);
  setGameOver(false);
  setWin(false);
  setShowAlert(false);
  setAlertMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">Wordle</header>
      <Board currentGuess={currentGuess} guessHistory={guessHistory} guessResult={guessResult} />
      <Keyboard onKeyPress={handleKeyPress} guessHistory={guessHistory} guessResult={guessResult}/>
      {showAlert && (
        <Alert
          message={alertMessage}
          type={gameOver ? (win ? "success" : "error") : "info"}
          onClose={() => setShowAlert(false)}
        />
      )}
      <button className = "restartButton" onClick={restartGame}>Restart</button>
    </div>
  )
}
export default App;