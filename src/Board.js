import './Board.css';

function Board({ currentGuess, guessHistory, guessResult }) {
    return (
        <div className='board'>
            {Array.from({ length: 6 }).map((_, guessIndex) => (
                <div key={guessIndex} className='row'>
                    {Array.from({ length: 5 }).map((_, charIndex) => {
                        const char = guessHistory.length > guessIndex
                                ? guessHistory[guessIndex][charIndex]
                                : guessIndex === guessHistory.length && currentGuess[charIndex]
                                    ? currentGuess[charIndex]
                                    : ''
                        return (
                            <div className='underBorder'>
                                <div key={charIndex} 
                                    className={`cell ${getColorForChar(guessResult[guessIndex], charIndex)}`}>
                                    <div className='cell-content'>
                                        {char}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
  }
  
  function getColorForChar(guessScores, charIndex) {
    if (!guessScores || guessScores.length === 0) return '';
    const score = guessScores[charIndex];
    if (score === 2) return 'correct'; // green
    if (score === 1) return 'present'; // yellow
    return 'absent'; // gray
  }
  
  export default Board;
  