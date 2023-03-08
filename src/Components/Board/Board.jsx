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
      setNonBombCount((height * width) - bombAmount);
      setGameOver(false);
      setEmojiStatus('smile');
      setBombCounter(bombAmount);
    }
  }, [boardNeedUpdating]);

  function handeBombFounded(prev, rowNum, colNum, newMarkup) {
    if (!newMarkup[rowNum][colNum].flagged && !newMarkup[rowNum][colNum].question) { return prev + 1; }
    if (newMarkup[rowNum][colNum].flagged && !newMarkup[rowNum][colNum].question) { return prev - 1; }
    return prev;
  }
  function toggleFlag(e, rowNum, colNum) {
    e.preventDefault();
    const newMarkup = cloneDeep(markup);
    if (newMarkup[rowNum][colNum].value === 'B') {
      setBombFounded((prev) => (handeBombFounded(prev, rowNum, colNum, newMarkup)));
    }
    if (bombFounded === bombAmount) {
      setEmojiStatus('win');
      setGameOver(true);
    }
    if (!newMarkup[rowNum][colNum].flagged && !newMarkup[rowNum][colNum].question) {
      newMarkup[rowNum][colNum].flagged = true;
      setBombCounter((prev) => prev - 1);
      setMarkup(newMarkup);
      return;
    }
    if (newMarkup[rowNum][colNum].question) {
      newMarkup[rowNum][colNum].question = false;
      setMarkup(newMarkup);
      return;
    }
    if (newMarkup[rowNum][colNum].flagged && !newMarkup[rowNum][colNum].question) {
      newMarkup[rowNum][colNum].flagged = false;
      newMarkup[rowNum][colNum].question = true;
      setBombCounter((prev) => prev + 1);
      setMarkup(newMarkup);
    }
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
    setNonBombCount(revealedBoard.newNonBombCount);
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
