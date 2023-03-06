import React, { useEffect, useState } from 'react';
import { numbersMapping } from '../../utils/constants';

export default function Stopwatch({ gameOver }) {
  const [stopwatch, setStopwatch] = useState(0);
  let increment;

  useEffect(() => {
    if (!gameOver) {
      increment = setInterval(() => {
        setStopwatch((time) => time + 1);
      }, 1000);
    }
    if (gameOver) {
      clearInterval(increment);
    }
  }, [gameOver]);

  const formatTime = () => {
    const getSeconds = `00${(stopwatch)}`.slice(-3);
    const secondsArr = Array.from(getSeconds);

    return (
      <div className="stopwatch__container">
        <div className={`stopwatch__item stopwatch__item_${numbersMapping[secondsArr[0]]}`} />
        <div className={`stopwatch__item stopwatch__item_${numbersMapping[secondsArr[1]]}`} />
        <div className={`stopwatch__item stopwatch__item_${numbersMapping[secondsArr[2]]}`} />
      </div>
    );
  };

  return (
    <div className="stopwatch">
      {formatTime()}
    </div>
  );
}
