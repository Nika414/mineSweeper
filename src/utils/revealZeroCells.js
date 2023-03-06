import { cloneDeep } from 'lodash';

export const revealZeroCells = (originalArr, rowNum, colNum, newNonMinesCount) => {
  const arr = cloneDeep(originalArr);
  if (arr[rowNum][colNum].revealed) {
    return;
  }
  const flipped = [];
  flipped.push(arr[rowNum][colNum]);
  while (flipped.length !== 0) {
    const single = flipped.pop();

    if (!single.revealed) {
      newNonMinesCount -= 1;
      single.revealed = true;
    }

    if (single.value !== 0) {
      break;
    }

    if (
      single.rowNum > 0
      && single.colNum > 0
      && arr[single.rowNum - 1][single.colNum - 1].value === 0
      && !arr[single.rowNum - 1][single.colNum - 1].revealed
    ) {
      flipped.push(arr[single.rowNum - 1][single.colNum - 1]);
    }
    if (
      single.rowNum < arr.length - 1
      && single.colNum < arr[0].length - 1
      && arr[single.rowNum + 1][single.colNum + 1].value === 0
      && !arr[single.rowNum + 1][single.colNum + 1].revealed
    ) {
      flipped.push(arr[single.rowNum + 1][single.colNum + 1]);
    }
    if (
      single.rowNum < arr.length - 1
      && single.colNum > 0
      && arr[single.rowNum + 1][single.colNum - 1].value === 0
      && !arr[single.rowNum + 1][single.colNum - 1].revealed
    ) {
      flipped.push(arr[single.rowNum + 1][single.colNum - 1]);
    }
    if (
      single.rowNum > 0
      && single.colNum < arr[0].length - 1
      && arr[single.rowNum - 1][single.colNum + 1].value === 0
      && !arr[single.rowNum - 1][single.colNum + 1].revealed
    ) {
      flipped.push(arr[single.rowNum - 1][single.colNum + 1]);
    }

    if (
      single.rowNum > 0
      && arr[single.rowNum - 1][single.colNum].value === 0
      && !arr[single.rowNum - 1][single.colNum].revealed
    ) {
      flipped.push(arr[single.rowNum - 1][single.colNum]);
    }
    if (
      single.rowNum < arr.length - 1
      && arr[single.rowNum + 1][single.colNum].value === 0
      && !arr[single.rowNum + 1][single.colNum].revealed
    ) {
      flipped.push(arr[single.rowNum + 1][single.colNum]);
    }
    if (
      single.colNum > 0
      && arr[single.rowNum][single.colNum - 1].value === 0
      && !arr[single.rowNum][single.colNum - 1].revealed
    ) {
      flipped.push(arr[single.rowNum][single.colNum - 1]);
    }
    if (
      single.colNum < arr[0].length - 1
      && arr[single.rowNum][single.colNum + 1].value === 0
      && !arr[single.rowNum][single.colNum + 1].revealed
    ) {
      flipped.push(arr[single.rowNum][single.colNum + 1]);
    }

    if (
      single.rowNum > 0
      && single.colNum > 0
      && !arr[single.rowNum - 1][single.colNum - 1].revealed
    ) {
      arr[single.rowNum - 1][single.colNum - 1].revealed = true;
      newNonMinesCount -= 1;
    }

    if (single.colNum > 0 && !arr[single.rowNum][single.colNum - 1].revealed) {
      arr[single.rowNum][single.colNum - 1].revealed = true;
      newNonMinesCount -= 1;
    }

    if (
      single.rowNum < arr.length - 1
      && single.colNum > 0
      && !arr[single.rowNum + 1][single.colNum - 1].revealed
    ) {
      arr[single.rowNum + 1][single.colNum - 1].revealed = true;
      newNonMinesCount -= 1;
    }

    if (single.rowNum > 0 && !arr[single.rowNum - 1][single.colNum].revealed) {
      arr[single.rowNum - 1][single.colNum].revealed = true;
      newNonMinesCount -= 1;
    }

    if (single.rowNum < arr.length - 1 && !arr[single.rowNum + 1][single.colNum].revealed) {
      arr[single.rowNum + 1][single.colNum].revealed = true;
      newNonMinesCount -= 1;
    }

    if (
      single.rowNum > 0
      && single.colNum < arr[0].length - 1
      && !arr[single.rowNum - 1][single.colNum + 1].revealed
    ) {
      arr[single.rowNum - 1][single.colNum + 1].revealed = true;
      newNonMinesCount -= 1;
    }

    if (single.colNum < arr[0].length - 1 && !arr[single.rowNum][single.colNum + 1].revealed) {
      arr[single.rowNum][single.colNum + 1].revealed = true;
      newNonMinesCount -= 1;
    }

    if (
      single.rowNum < arr.length - 1
      && single.colNum < arr[0].length - 1
      && !arr[single.rowNum + 1][single.colNum + 1].revealed
    ) {
      arr[single.rowNum + 1][single.colNum + 1].revealed = true;
      newNonMinesCount = 1;
    }
  }
  return { arr, newNonMinesCount };
};
