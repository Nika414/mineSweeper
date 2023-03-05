/* eslint-disable no-continue */
/* eslint-disable consistent-return */

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CreateGridBoard(row, col, bombsTotal) {
  const board = [];
  const bombLocation = [];

  for (let colNum = 0; colNum < row; colNum += 1) {
    const subCol = [];
    for (let rowNum = 0; rowNum < col; rowNum += 1) {
      subCol.push({
        value: 0,
        revealed: false,
        colNum,
        rowNum,
        flagged: false,
      });
    }
    board.push(subCol);
  }

  let bombsCount = 0;
  while (bombsCount < bombsTotal) {
    const colNum = getRandomInt(0, row - 1);
    const rowNum = getRandomInt(0, col - 1);

    if (board[colNum][rowNum].value === 0) {
      board[colNum][rowNum].value = 'B';
      bombLocation.push([colNum, rowNum]);
      bombsCount += 1;
    }
  }

  for (let rowIndex = 0; rowIndex < row; rowIndex += 1) {
    for (let colIndex = 0; colIndex < col; colIndex += 1) {
      if (board[rowIndex][colIndex].value === 'B') {
        continue;
      }

      if (rowIndex > 0 && board[rowIndex - 1][colIndex].value === 'B') {
        board[rowIndex][colIndex].value += 1;
      }

      if (
        rowIndex > 0
        && colIndex < col - 1
        && board[rowIndex - 1][colIndex + 1].value === 'B'
      ) {
        board[rowIndex][colIndex].value += 1;
      }

      if (colIndex < col - 1 && board[rowIndex][colIndex + 1].value === 'B') {
        board[rowIndex][colIndex].value += 1;
      }

      if (
        rowIndex < row - 1
        && colIndex < col - 1
        && board[rowIndex + 1][colIndex + 1].value === 'B'
      ) {
        board[rowIndex][colIndex].value += 1;
      }

      if (rowIndex < row - 1 && board[rowIndex + 1][colIndex].value === 'B') {
        board[rowIndex][colIndex].value += 1;
      }

      if (rowIndex > 0 && colIndex > 0 && board[rowIndex - 1][colIndex - 1].value === 'B') {
        board[rowIndex][colIndex].value += 1;
      }

      if (colIndex > 0 && board[rowIndex][colIndex - 1].value === 'B') {
        board[rowIndex][colIndex].value += 1;
      }

      if (
        rowIndex < row - 1
        && colIndex > 0
        && board[rowIndex + 1][colIndex - 1].value === 'B'
      ) {
        board[rowIndex][colIndex].value += 1;
      }
    }
  }
  return { board, bombLocation };
}
