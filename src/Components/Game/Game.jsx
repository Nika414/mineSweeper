import { useState } from 'react';
import Board from '../Board/Board';
import Emoji from '../Emoji/Emoji';
import Stopwatch from '../Stopwatch/Stopwatch';
import Timer from '../Timer/Timer';

export default function Game() {
  const [emojiStatus, setEmojiStatus] = useState('smile');

  return (
    <div className="game">
      <div className="game__header">
        <Timer />
        <Emoji emojiStatus={emojiStatus} />
        <Stopwatch />
      </div>
      <Board setEmojiStatus={setEmojiStatus} />
    </div>
  );
}
