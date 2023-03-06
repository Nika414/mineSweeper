/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import { cloneDeep } from 'lodash';

export const revealZeroCells = (originalArr, rowNum, colNum, newNonMinesCount) => {
  const arr = cloneDeep(originalArr);

  console.log(arr[rowNum][colNum]);
  if (arr[rowNum][colNum].revealed) {
    return;
  }
  const flipped = [];
  flipped.push(arr[rowNum][colNum]);
  while (flipped.length !== 0) {
    const single = flipped.pop();

    if (!single.revealed) {
      newNonMinesCount--;
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

    // Single ones
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

    // Start Revealing Items
    if (
      single.rowNum > 0
      && single.colNum > 0
      && !arr[single.rowNum - 1][single.colNum - 1].revealed
    ) {
      // Top Left Reveal

      arr[single.rowNum - 1][single.colNum - 1].revealed = true;
      newNonMinesCount--;
    }

    if (single.colNum > 0 && !arr[single.rowNum][single.colNum - 1].revealed) {
      // Top Reveal
      arr[single.rowNum][single.colNum - 1].revealed = true;
      newNonMinesCount--;
    }

    if (
      single.rowNum < arr.length - 1
      && single.colNum > 0
      && !arr[single.rowNum + 1][single.colNum - 1].revealed
    ) {
      // Top Right Reveal
      arr[single.rowNum + 1][single.colNum - 1].revealed = true;
      newNonMinesCount--;
    }

    if (single.rowNum > 0 && !arr[single.rowNum - 1][single.colNum].revealed) {
      // Left Reveal
      arr[single.rowNum - 1][single.colNum].revealed = true;
      newNonMinesCount--;
    }

    if (single.rowNum < arr.length - 1 && !arr[single.rowNum + 1][single.colNum].revealed) {
      // Right Reveal
      arr[single.rowNum + 1][single.colNum].revealed = true;
      newNonMinesCount--;
    }

    if (
      single.rowNum > 0
      && single.colNum < arr[0].length - 1
      && !arr[single.rowNum - 1][single.colNum + 1].revealed
    ) {
      // Bottom Left Reveal
      arr[single.rowNum - 1][single.colNum + 1].revealed = true;
      newNonMinesCount--;
    }

    if (single.colNum < arr[0].length - 1 && !arr[single.rowNum][single.colNum + 1].revealed) {
      // Bottom Reveal
      arr[single.rowNum][single.colNum + 1].revealed = true;
      newNonMinesCount--;
    }

    if (
      single.rowNum < arr.length - 1
      && single.colNum < arr[0].length - 1
      && !arr[single.rowNum + 1][single.colNum + 1].revealed
    ) {
      // Bottom Right Reveal
      arr[single.rowNum + 1][single.colNum + 1].revealed = true;
      newNonMinesCount--;
    }
  }
  //   console.log(arr);
  return { arr, newNonMinesCount };
};
