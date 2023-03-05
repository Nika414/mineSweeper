/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import CreateGridBoard from '../../utils/CreateGridBoard';
import Cell from '../Cell/Cell';
import { revealZeroCells } from '../../utils/revealZeroCells';

const bombAmount = 20;

export default function Board({ setEmojiStatus, boardNeedUpdating }) {
  const [markup, setMarkup] = useState([]);
  const [bombLocation, setBombLocation] = useState([]);
  const [nonBombCount, setNonBombCount] = useState(0);
  const [bombFounded, setBombFounded] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const gridBoard = CreateGridBoard(16, 16, bombAmount);
    setMarkup(gridBoard.board);
    setBombLocation(gridBoard.bombLocation);
    setNonBombCount(16 * 16 - 20);
  }, [boardNeedUpdating]);

  function toggleFlag(e, colNum, rowNum) {
    e.preventDefault();
    const newMarkup = JSON.parse(JSON.stringify(markup));
    if (newMarkup[colNum][rowNum].value === 'B') {
      setBombFounded((prev) => (newMarkup[colNum][rowNum].flagged ? prev - 1 : prev + 1));
    } if (bombFounded === bombAmount) {
      setEmojiStatus('win');
      setGameOver(true);
    }
    newMarkup[colNum][rowNum].flagged = !newMarkup[colNum][rowNum].flagged;
    setMarkup(newMarkup);
  }

  function revealCell(colNum, rowNum) {
    const newMarkup = cloneDeep(markup);
    if (newMarkup[colNum][rowNum].value === 'B') {
      for (let i = 0; i < bombLocation.length; i += 1) {
        newMarkup[bombLocation[i][0]][bombLocation[i][1]].revealed = true;
      }
      setMarkup(newMarkup);
      setGameOver(true);
      setEmojiStatus('endGame');
    }
    const revealedBoard = revealZeroCells(newMarkup, colNum, rowNum, nonBombCount);
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
