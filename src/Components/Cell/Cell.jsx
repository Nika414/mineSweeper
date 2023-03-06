import { useEffect, useState } from 'react';
import { cellsMapping } from '../../utils/constants';

export default function Cell({
  cell, onClick, onRightClick, setEmojiStatus, gameOver, boardNeedUpdating, clearNeedUpdate,
}) {
  const [selector, setSelector] = useState('');

  useEffect(() => {
    if (boardNeedUpdating) {
      setSelector('');
      clearNeedUpdate();
    }

    if (gameOver && cell.flagged && cell.value !== 'B') {
      setSelector('cell_incorrect-bomb');
    }
  }, [cell]);

  function handleClick() {
    if (cell.value === 'B') {
      setSelector('cell_bomb-selected');
    }
    onClick(cell.rowNum, cell.colNum);
  }

  function handleRightClick(e) {
    onRightClick(e, cell.rowNum, cell.colNum);
  }

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      onMouseDown={() => { setEmojiStatus('attention'); }}
      onMouseUp={() => { setEmojiStatus('smile'); }}
      className={`cell ${selector} ${cell.revealed && cellsMapping[cell.value]} ${cell.flagged && 'cell_flagged'}`}
    />
  );
}
