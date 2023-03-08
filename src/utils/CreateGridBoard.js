function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function createGridBoard(row, col, bombsTotal) {
  const board = [];
  const bombLocation = [];

  for (let rowNum = 0; rowNum < row; rowNum += 1) {
    const subCol = [];
    for (let colNum = 0; colNum < col; colNum += 1) {
      subCol.push({
        value: 0,
        revealed: false,
        rowNum,
        colNum,
        flagged: false,
        question: false,
      });
    }
    board.push(subCol);
  }

  let bombsCount = 0;
  while (bombsCount < bombsTotal) {
    const rowNum = getRandomInt(0, row - 1);
    const colNum = getRandomInt(0, col - 1);

    if (board[rowNum][colNum].value === 0) {
      board[rowNum][colNum].value = 'B';
      bombLocation.push([rowNum, colNum]);
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
