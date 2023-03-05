/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import { useState } from 'react';

export default function Cell({
  cell, onClick, onRightClick, setEmojiStatus,
}) {
  const [isBombDetected, setIsBombDetected] = useState(false);

  function updateSelector() {
    if (cell.flagged) {
      return 'cell_flagged';
    }
    if (cell.value === 'B' && cell.revealed) {
      return 'cell_bomb';
    }
    if (cell.value === 0 && cell.revealed) {
      return 'cell_zero';
    }
    if (cell.value === 1 && cell.revealed) {
      return 'cell_one';
    }
    if (cell.value === 2 && cell.revealed) {
      return 'cell_two';
    }
    if (cell.value === 3 && cell.revealed) {
      return 'cell_three';
    }
    if (cell.value === 4 && cell.revealed) {
      return 'cell_four';
    }
    if (cell.value === 5 && cell.revealed) {
      return 'cell_five';
    }
    if (cell.value === 6 && cell.revealed) {
      return 'cell_six';
    }
    if (cell.value === 7 && cell.revealed) {
      return 'cell_seven';
    }
    if (cell.value === 8 && cell.revealed) {
      return 'cell_eight';
    }
    return '';
  }
  function handleClick() {
    if (cell.value === 'B') {
      setIsBombDetected(true);
    }
    onClick(cell.colNum, cell.rowNum);
  }

  function handleRightClick(e) {
    onRightClick(e, cell.colNum, cell.rowNum);
  }

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      // 'attention'
      onMouseDown={() => { setEmojiStatus('attention'); }}
      // 'smile'
      onMouseUp={() => { setEmojiStatus('smile'); }}
      className={`cell ${updateSelector()} ${isBombDetected && 'cell_bomb-selected'}`}
    />
  );
}
