/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

const numbersMapping = {
  0: 'stopwatch__item_zero',
  1: 'stopwatch__item_one',
  2: 'stopwatch__item_two',
  3: 'stopwatch__item_three',
  4: 'stopwatch__item_four',
  5: 'stopwatch__item_five',
  6: 'stopwatch__item_six',
  7: 'stopwatch__item_seven',
  8: 'stopwatch__item_eight',
  9: 'stopwatch__item_nine',
};

export default function Stopwatch() {
  const [stopwatch, setStopwatch] = useState(0);
  const increment = useRef(null);

  useEffect(() => {
    increment.current = setInterval(() => {
      setStopwatch((time) => time + 1);
    }, 1000);
    setTimeout(() => { clearInterval(increment.current); }, 40000000);
  }, []);

  const formatTime = () => {
    const getSeconds = `0${(stopwatch % 60)}`.slice(-2);
    const minutes = `${Math.floor(stopwatch / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return (
      <div className="stopwatch__container">
        <div className={`stopwatch__item ${numbersMapping[getMinutes[0]]}`} />
        <div className={`stopwatch__item ${numbersMapping[getMinutes[1]]}`} />
        <span className="stopwatch__item stopwatch__item-span">:</span>
        <div className={`stopwatch__item ${numbersMapping[getSeconds[0]]}`} />
        <div className={`stopwatch__item ${numbersMapping[getSeconds[1]]}`} />
      </div>
    );
  };

  return (
    <div className="stopwatch">
      {formatTime()}
    </div>
  );
}
