/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

export default function Timer() {
  const [timer, setTimer] = useState(0);
  const increment = useRef(null);

  useEffect(() => {
    increment.current = setInterval(() => {
      setTimer((time) => time + 1);
    }, 1000);
    setTimeout(() => { clearInterval(increment.current); }, 40000000);
  }, []);

  const formatTime = {
    getSeconds: `0${(timer % 60)}`.slice(-2),
    getMinutes: `0${Math.floor(timer / 60) % 60}`.slice(-2),
  };
  //   const config = {
  //     1: '0 0',
  //     2: '-14px 0',
  //   };

  return (
    <div className="timer">
      <div className="timer__container">
        <div className="timer__number" style={{ background: 'url(\'../../images/minesweeper-sprites_9TPZzv3.png\')' }} />
      </div>
    </div>
  );
}
