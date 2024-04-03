import React, { useEffect, useState } from 'react';
import './Alert.css';

function Alert({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      {message}
      <button onClick={() => {setVisible(false); if (onClose) onClose();}}>Close</button>
    </div>
  );
}

export default Alert;
