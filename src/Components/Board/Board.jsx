import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import createGridBoard from '../../utils/createGridBoard';
import Cell from '../Cell/Cell';
import { revealZeroCells } from '../../utils/revealZeroCells';

export default function Board({
  setEmojiStatus,
  boardNeedUpdating,
  clearNeedUpdate,
  width,
  height,
  bombAmount,
  setBombCounter,
  gameOver,
  setGameOver,
}) {
  const [markup, setMarkup] = useState([]);
  const [bombLocation, setBombLocation] = useState([]);
  const [nonBombCount, setNonBombCount] = useState(0);
  const [bombFounded, setBombFounded] = useState(0);

  useEffect(() => {
    if (boardNeedUpdating) {
      const gridBoard = createGridBoard(height, width, bombAmount);
      setMarkup(gridBoard.board);
      setBombLocation(gridBoard.bombLocation);
      setNonBombCount(height * width - bombAmount);
      setGameOver(false);
      setEmojiStatus('smile');
      setBombCounter(bombAmount);
    }
  }, [boardNeedUpdating]);

  function toggleFlag(e, rowNum, colNum) {
    e.preventDefault();
    const newMarkup = cloneDeep(markup);
    setBombCounter((prev) => prev - 1);
    if (newMarkup[rowNum][colNum].value === 'B') {
      setBombFounded((prev) => (newMarkup[rowNum][colNum].flagged ? prev - 1 : prev + 1));
    } if (bombFounded === bombAmount) {
      setEmojiStatus('win');
      setGameOver(true);
    }
    console.log(2);
    newMarkup[rowNum][colNum].flagged = !newMarkup[rowNum][colNum].flagged;
    setMarkup(newMarkup);
  }

  function revealCell(rowNum, colNum) {
    const newMarkup = cloneDeep(markup);
    if (newMarkup[rowNum][colNum].value === 'B') {
      for (let i = 0; i < bombLocation.length; i += 1) {
        newMarkup[bombLocation[i][0]][bombLocation[i][1]].revealed = true;
      }
      setMarkup(newMarkup);
      setGameOver(true);
      setEmojiStatus('endGame');
    }
    const revealedBoard = revealZeroCells(newMarkup, rowNum, colNum, nonBombCount);
    setMarkup(revealedBoard.arr);
    setNonBombCount(revealedBoard.newNonMinesCount);
  }

  return (
    <div className={`board ${gameOver && 'board_inactive'}`}>
      { markup.map((singleCol) => (
        <div>
          {(singleCol.map((singleItem) => (
            <Cell
              cell={singleItem}
              setEmojiStatus={setEmojiStatus}
              onClick={revealCell}
              onRightClick={toggleFlag}
              gameOver={gameOver}
              boardNeedUpdating={boardNeedUpdating}
              clearNeedUpdate={clearNeedUpdate}
            />
          )))}
        </div>
      )) }
    </div>
  );
}
