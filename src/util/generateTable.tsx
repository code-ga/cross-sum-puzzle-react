const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
export function generateTable(rows: number, columns: number) {
  const answerTable = new Array(rows)
    .fill(0)
    .map(() => new Array(columns).fill(0));
  const sumOfEachRow = new Array(rows).fill(0);
  const sumOfEachColumn = new Array(columns).fill(0);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      answerTable[i][j] = randomInt(0, 9);
      sumOfEachRow[i] += answerTable[i][j];
      sumOfEachColumn[j] += answerTable[i][j];
    }
  }
  

  const questionTable = new Array(rows)
    .fill(0)
    .map(() => new Array(columns).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const num = randomInt(0, 9);
      questionTable[i][j] = num;
    }
  }
  return {
    answerTable: answerTable as number[][],
    questionTable: questionTable as number[][],
    sumOfEachRow: sumOfEachRow as number[],
    sumOfEachColumn: sumOfEachColumn as number[],
  };
}

export function checkSolved(questionTable: number[][], answerTable: number[][]) {
  for (let i = 0; i < questionTable.length; i++) {
    for (let j = 0; j < questionTable.length; j++) {
      if (questionTable[i][j] != answerTable[i][j]) {
        return false;
      }
    }
  }
  return true;
}