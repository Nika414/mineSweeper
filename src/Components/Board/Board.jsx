import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import createGridBoard from '../../utils/createGridBoard';
import Cell from '../Cell/Cell';
import { revealZeroCells } from '../../utils/revealZeroCells';

const bombAmount = 20;

export default function Board({ setEmojiStatus, boardNeedUpdating, clearNeedUpdate }) {
  const [markup, setMarkup] = useState([]);
  const [bombLocation, setBombLocation] = useState([]);
  const [nonBombCount, setNonBombCount] = useState(0);
  const [bombFounded, setBombFounded] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (boardNeedUpdating) {
      const gridBoard = createGridBoard(16, 16, bombAmount);
      setMarkup(gridBoard.board);
      setBombLocation(gridBoard.bombLocation);
      setNonBombCount(16 * 16 - 20);
      clearNeedUpdate();
      setGameOver(false);
    }
  }, [boardNeedUpdating]);

  function toggleFlag(e, rowNum, colNum) {
    e.preventDefault();
    const newMarkup = cloneDeep(markup);
    if (newMarkup[rowNum][colNum].value === 'B') {
      setBombFounded((prev) => (newMarkup[rowNum][colNum].flagged ? prev - 1 : prev + 1));
    } if (bombFounded === bombAmount) {
      setEmojiStatus('win');
      setGameOver(true);
    }
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

  if (!markup) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      { markup.map((singleCol) => (
        <div className={`board ${gameOver && 'board_inactive'}`}>
          {(singleCol.map((singleItem) => (
            <Cell
              cell={singleItem}
              setEmojiStatus={setEmojiStatus}
              onClick={revealCell}
              onRightClick={toggleFlag}
            />
          )))}
        </div>
      )) }
    </div>
  );
}
