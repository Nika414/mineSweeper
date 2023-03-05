import { useState } from 'react';
import Board from '../Board/Board';
import Emoji from '../Emoji/Emoji';
import Timer from '../Timer/Timer';

export default function Game() {
  const [emojiStatus, setEmojiStatus] = useState('smile');

  return (
    <div className="game">
      <div className="game__header">
        <Emoji emojiStatus={emojiStatus} />
        <Timer />
      </div>
      <Board setEmojiStatus={setEmojiStatus} />
    </div>
  );
}
