import './KeyBoard.css';

function Keyboard({ onKeyPress, guessHistory, guessResult }) {
  const keysRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keysRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keysRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  
  const renderKey = (key) => {
    let keyClass = 'keyClass';
    guessHistory.forEach((guess, index) => {
      if (guess.includes(key)) {
        const charIndex = guess.indexOf(key);
        const scores = guessResult[index];
        
        if (scores[charIndex] === 2) {
          if (!keyClass.includes('correct')) {
            keyClass = 'keyClass correct';
          }
        } else if (scores[charIndex] === 1) {
          if (!keyClass.includes('correct') || !keyClass.includes('present')) {
            keyClass = 'keyClass present';
          }
        } else {
          if (!keyClass.includes('correct') || !keyClass.includes('present') || !keyClass.includes('absent')) {
            keyClass = 'keyClass absent';
          }
        }
        console.log(key, keyClass)
      }
    });
  
    return (
      <button key={key} className={keyClass} onClick={() => onKeyPress(key)}>
        {key}
      </button>
    );
  };
  
    return (
      <div className="keyboard">
        <div className="key-row">{keysRow1.map(renderKey)}</div>
        <div className="key-row">{keysRow2.map(renderKey)}</div>
        <div className="key-row">
          <button className='longButton' onClick={() => onKeyPress('ENTER')}>Enter</button>
          {keysRow3.map(renderKey)}
          <button className='longButton' onClick={() => onKeyPress('DELETE')}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default Keyboard;
  