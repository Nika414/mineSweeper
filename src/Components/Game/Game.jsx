import { useState } from 'react';
import Board from '../Board/Board';
import BombCounter from '../BombCounter/BombCounter';
import Emoji from '../Emoji/Emoji';
import Stopwatch from '../Stopwatch/Stopwatch';

export default function Game({ bombAmount, width, height }) {
  const [emojiStatus, setEmojiStatus] = useState('smile');
  const [needUpdate, setNeedUpdate] = useState(true);
  const [timerNeedUpdate, setTimerNeedUpate] = useState(true);
  const [bombCounter, setBombCounter] = useState(bombAmount);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="game">
      <div className="game__header">
        <BombCounter bombCounter={bombCounter} />
        <Emoji emojiStatus={emojiStatus} onClick={() => { setNeedUpdate(true); setTimerNeedUpate(false); }} />
        <Stopwatch gameOver={gameOver} timerNeedUpdate={timerNeedUpdate} setTimerNeedUpate={setTimerNeedUpate} />
      </div>
      <Board
        width={width}
        height={height}
        bombAmount={bombAmount}
        setEmojiStatus={setEmojiStatus}
        clearNeedUpdate={() => setNeedUpdate(false)}
        boardNeedUpdating={needUpdate}
        setBombCounter={setBombCounter}
        gameOver={gameOver}
        setGameOver={setGameOver}
        setNeedUpdate={setNeedUpdate}
      />
    </div>
  );
}
