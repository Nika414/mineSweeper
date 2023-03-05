import { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [timer, setTimer] = useState(2400000);
  const decrement = useRef(null);

  useEffect(() => {
    decrement.current = setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    setTimeout(() => { clearInterval(decrement.current); }, 2400000);
  }, []);

  const formatTime = () => {
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes}`;
  };

  return (
    <div className="timer">
      <div>{formatTime()}</div>
    </div>
  );
}
