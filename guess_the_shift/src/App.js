import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [word, setWord] = useState('');
  const [shiftedWord, setShiftedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [randomShift, setRandomShift] = useState(null);

  const handleWordChange = (e) => setWord(e.target.value);

  const handleGuessChange = (e) => setGuess(e.target.value);

  const shiftWord = (word, shift) => {
    return word.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        let shiftedCode;
        if (code >= 65 && code <= 90) {
          shiftedCode = ((code - 65 + shift) % 26) + 65;
        } else if (code >= 97 && code <= 122) {
          shiftedCode = ((code - 97 + shift) % 26) + 97;
        }
        return String.fromCharCode(shiftedCode);
      }
      return char;
    }).join('');
  };

  const handleSubmitWord = (e) => {
    e.preventDefault();
    const shift = Math.floor(Math.random() * 26) + 1;
    const shifted = shiftWord(word, shift);
    setRandomShift(shift);
    setShiftedWord(shifted);
    setMessage('');
    setGuess('');
  };

  const handleSubmitGuess = (e) => {
    e.preventDefault();
    if (parseInt(guess) === randomShift) {
      setMessage('Correct! You guessed the right shift.');
    } else {
      setMessage(`Incorrect. The correct shift was ${randomShift}.Better Luck next time`);
    }
  };

  const handleExitGame = () => {
    setWord('');
    setShiftedWord('');
    setGuess('');
    setMessage('');
    setRandomShift(null);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="column left">
          <h1>Guess the Caesar Cipher Shift</h1>
        </div>
        <div className="column right">
          <form onSubmit={handleSubmitWord}>
            <h1 className="name">Game On!!!</h1>
            <label className='bold'>
              Enter a word:
              <input type="text" value={word} onChange={handleWordChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
          {shiftedWord && (
            <>
              <h2>Shifted Word: {shiftedWord}</h2>
              <form onSubmit={handleSubmitGuess}>
                <label className='bold'>
                  Guess the shift value:
                  <input type="number" value={guess} onChange={handleGuessChange} />
                </label>
                <button type="submit">Guess</button>
              </form>
            </>
          )}
          {message && <h2>{message}</h2>}
          <button className="exit-button" onClick={handleExitGame}>Exit Game</button>
        </div>
      </div>
    </div>
  );
};

export default App;

