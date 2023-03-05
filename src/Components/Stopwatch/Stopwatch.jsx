import React, { useEffect, useState, useRef } from 'react';

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

    return `${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch__container">
        <div>{formatTime()}</div>
      </div>
    </div>
  );
}
