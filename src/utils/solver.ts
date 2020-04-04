const MATRIX_SIZE = 9;
type Matrix = Array<Array<number>>;

const isPossibleToSet = (
    matrix: Matrix,
    rowPos: number,
    columnPos: number,
    candidateNum: number
): boolean => {
    // check given row
    for (let i = 0; i < MATRIX_SIZE; i++) {
        if (matrix[rowPos][i] === candidateNum) {
            return false;
        }
    }

    // TODO: merge row&column checks
    // check given column
    for (let i = 0; i < MATRIX_SIZE; i++) {
        if (matrix[i][columnPos] === candidateNum) {
            return false;
        }
    }

    // check belonging box
    const rowBoxStart = rowPos > 2 ? ( rowPos > 5 ? 6 : 3) : 0;
    const colBoxStart = columnPos > 2 ? ( columnPos > 5 ? 6 : 3) : 0;
    for (let i = rowBoxStart; i < rowBoxStart + 3; i++) {
        for (let j = colBoxStart; j < colBoxStart + 3; j++) {
            if (matrix[i][j] === candidateNum) {
                return false;
            }
        }
    }

    return true;
};

export const isGivenSudokuValid = (matrix: Matrix) => {
    for (let i = 0; i < MATRIX_SIZE; i++) {
        for (let j = 0; j < MATRIX_SIZE; j++) {
            if (matrix[i][j]) {
                console.warn("in if ", matrix[i][j]);
                // check same row & column
                for (let k = 0; k < MATRIX_SIZE; k++) {
                    if (k !== i && matrix[k][j] === matrix[i][j]) {
                        return false;
                    }
                    if (k !== j && matrix[i][k] === matrix[i][j]) {
                        return false;
                    }
                }
                // check belonging box
                const rowBoxStart = i > 2 ? ( i > 5 ? 6 : 3) : 0;
                const colBoxStart = j > 2 ? ( j > 5 ? 6 : 3) : 0;
                const boxSubArray = [];
                for (let m = rowBoxStart; m < rowBoxStart + 3; m++) {
                    for (let n = colBoxStart; n < colBoxStart + 3; n++) {
                        if (matrix[n][m]) {
                            boxSubArray.push(matrix[n][m]);
                        }
                    }
                }
                boxSubArray.sort((a, b) => a - b);
                let testBoxEl = boxSubArray[0];
                for (let k = 1; k < boxSubArray.length; k ++) {
                    console.log(testBoxEl, boxSubArray[k])
                    if (testBoxEl === boxSubArray[k]) { return false; }
                    testBoxEl = boxSubArray[k];
                }
            }
        }
    }
    return true;
};

export const solveSudokuArray = (array: Array<number>) => {
    let convertedMatrix: Matrix = [];
    let tempArray: Array<number> = [];
    for (let i = 0; i < array.length; i++) {
        if (!Number.isInteger(array[i])) { array[i] = 0; }
        tempArray.push(array[i]);
        if ((i + 1) % MATRIX_SIZE === 0) {
            convertedMatrix.push(tempArray);
            tempArray = [];
        }
    }
    if (!isGivenSudokuValid(convertedMatrix)) {
        // console.warn("Invalid Sudoku!", convertedMatrix);
        return "Invalid Sudoku!";
    }
    if (solveSudoku(convertedMatrix)) {
        return convertedMatrix.flat();
    } else {
        return "Not possible to solve this sudoku setup!";
    }
}

const solveSudoku = (matrix: Matrix): boolean => {
    const indicesRange = Array.from(Array(MATRIX_SIZE).keys());
    let foundIndices: Array<number> = [];
    for (let i of indicesRange) {
        for (let j of indicesRange) {
            if (matrix[i][j] === 0) {
                foundIndices = [i, j];
                break;
            }
        }
        if (foundIndices.length) {
            break;
        }
    }
    if (!foundIndices.length) {
        return true;
    }

    const [foundI, foundJ] = foundIndices; 
    for (let candidate = 1; candidate <= MATRIX_SIZE; candidate++) {
        if (isPossibleToSet(matrix, foundI, foundJ, candidate)) {
            matrix[foundI][foundJ] = candidate;
            if (solveSudoku(matrix)) {
                return true;
            } else {
                matrix[foundI][foundJ] = 0;
            } 
        }
    }
    return false;
};
