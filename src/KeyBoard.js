import './KeyBoard.css';

function Keyboard({ onKeyPress }) {
    const keysRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const keysRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keysRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  
    const renderKey = (key) => (
      <button key={key} onClick={() => onKeyPress(key)}>
        {key}
      </button>
    );
  
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
  