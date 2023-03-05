/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
export const revealZeroCells = (originalArr, colNum, rowNum, newNonMinesCount) => {
  const arr = JSON.parse(JSON.stringify(originalArr));

  console.log(arr[colNum][rowNum]);
  if (arr[colNum][rowNum].revealed) {
    // console.log(arr[colNum][rowNum])
    return;
  }
  const flipped = [];
  flipped.push(arr[colNum][rowNum]);
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
      single.colNum > 0
      && single.rowNum > 0
      && arr[single.colNum - 1][single.rowNum - 1].value === 0
      && !arr[single.colNum - 1][single.rowNum - 1].revealed
    ) {
      flipped.push(arr[single.colNum - 1][single.rowNum - 1]);
    }
    if (
      single.colNum < arr.length - 1
      && single.rowNum < arr[0].length - 1
      && arr[single.colNum + 1][single.rowNum + 1].value === 0
      && !arr[single.colNum + 1][single.rowNum + 1].revealed
    ) {
      flipped.push(arr[single.colNum + 1][single.rowNum + 1]);
    }
    if (
      single.colNum < arr.length - 1
      && single.rowNum > 0
      && arr[single.colNum + 1][single.rowNum - 1].value === 0
      && !arr[single.colNum + 1][single.rowNum - 1].revealed
    ) {
      flipped.push(arr[single.colNum + 1][single.rowNum - 1]);
    }
    if (
      single.colNum > 0
      && single.rowNum < arr[0].length - 1
      && arr[single.colNum - 1][single.rowNum + 1].value === 0
      && !arr[single.colNum - 1][single.rowNum + 1].revealed
    ) {
      flipped.push(arr[single.colNum - 1][single.rowNum + 1]);
    }

    // Single ones
    if (
      single.colNum > 0
      && arr[single.colNum - 1][single.rowNum].value === 0
      && !arr[single.colNum - 1][single.rowNum].revealed
    ) {
      flipped.push(arr[single.colNum - 1][single.rowNum]);
    }
    if (
      single.colNum < arr.length - 1
      && arr[single.colNum + 1][single.rowNum].value === 0
      && !arr[single.colNum + 1][single.rowNum].revealed
    ) {
      flipped.push(arr[single.colNum + 1][single.rowNum]);
    }
    if (
      single.rowNum > 0
      && arr[single.colNum][single.rowNum - 1].value === 0
      && !arr[single.colNum][single.rowNum - 1].revealed
    ) {
      flipped.push(arr[single.colNum][single.rowNum - 1]);
    }
    if (
      single.rowNum < arr[0].length - 1
      && arr[single.colNum][single.rowNum + 1].value === 0
      && !arr[single.colNum][single.rowNum + 1].revealed
    ) {
      flipped.push(arr[single.colNum][single.rowNum + 1]);
    }

    // Start Revealing Items
    if (
      single.colNum > 0
      && single.rowNum > 0
      && !arr[single.colNum - 1][single.rowNum - 1].revealed
    ) {
      // Top Left Reveal

      arr[single.colNum - 1][single.rowNum - 1].revealed = true;
      newNonMinesCount--;
    }

    if (single.rowNum > 0 && !arr[single.colNum][single.rowNum - 1].revealed) {
      // Top Reveal
      arr[single.colNum][single.rowNum - 1].revealed = true;
      newNonMinesCount--;
    }

    if (
      single.colNum < arr.length - 1
      && single.rowNum > 0
      && !arr[single.colNum + 1][single.rowNum - 1].revealed
    ) {
      // Top Right Reveal
      arr[single.colNum + 1][single.rowNum - 1].revealed = true;
      newNonMinesCount--;
    }

    if (single.colNum > 0 && !arr[single.colNum - 1][single.rowNum].revealed) {
      // Left Reveal
      arr[single.colNum - 1][single.rowNum].revealed = true;
      newNonMinesCount--;
    }

    if (single.colNum < arr.length - 1 && !arr[single.colNum + 1][single.rowNum].revealed) {
      // Right Reveal
      arr[single.colNum + 1][single.rowNum].revealed = true;
      newNonMinesCount--;
    }

    if (
      single.colNum > 0
      && single.rowNum < arr[0].length - 1
      && !arr[single.colNum - 1][single.rowNum + 1].revealed
    ) {
      // Bottom Left Reveal
      arr[single.colNum - 1][single.rowNum + 1].revealed = true;
      newNonMinesCount--;
    }

    if (single.rowNum < arr[0].length - 1 && !arr[single.colNum][single.rowNum + 1].revealed) {
      // Bottom Reveal
      arr[single.colNum][single.rowNum + 1].revealed = true;
      newNonMinesCount--;
    }

    if (
      single.colNum < arr.length - 1
      && single.rowNum < arr[0].length - 1
      && !arr[single.colNum + 1][single.rowNum + 1].revealed
    ) {
      // Bottom Right Reveal
      arr[single.colNum + 1][single.rowNum + 1].revealed = true;
      newNonMinesCount--;
    }
  }
  //   console.log(arr);
  return { arr, newNonMinesCount };
};
