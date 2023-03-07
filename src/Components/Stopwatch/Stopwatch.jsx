import React, { useEffect, useState } from 'react';
import { numbersMapping } from '../../utils/constants';

export default function Stopwatch({
  gameOver, timerNeedUpdate, setTimerNeedUpate,
}) {
  const [stopwatch, setStopwatch] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!gameOver) {
      setTimer(0);
      setStopwatch(setInterval(() => {
        setTimer((value) => {
          if (value >= 999) {
            clearInterval(stopwatch);
            return 999;
          }
          return value + 1;
        });
      }, 1000));
    } if (gameOver || (timerNeedUpdate !== false)) {
      clearInterval(stopwatch);
    }
    setTimerNeedUpate(true);
    return () => clearInterval(stopwatch);
  }, [gameOver, timerNeedUpdate]);

  const formatTime = () => {
    const getSeconds = `00${(timer)}`.slice(-3);
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
