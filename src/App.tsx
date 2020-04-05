import React, { useState } from 'react';
import './App.css';
import Grid from "./components/Grid";
import { SUDOKU_SIZE } from "./utils/consts";
import { solveSudokuArray } from "./utils/solver";

let restartSudoku = false;

const initNewEmptyCells = () => Array(SUDOKU_SIZE * 9);

function App() {
  const [value, setValue] = useState(initNewEmptyCells());
  const [buttonLabel, setButtonLabel] = useState("Solve");
  const [info, setInfo] = useState<string>();

  const performAction = () => {
    if (restartSudoku) {
      setValue(initNewEmptyCells());
      setButtonLabel("Solve");
      setInfo("");
      restartSudoku = false;
    } else {
      const sudokuValue: number[] | string = solveSudokuArray(value);
      if (Array.isArray(sudokuValue)) {
        setValue(sudokuValue);
        setInfo("");
      } else {
        setInfo(sudokuValue);
      }
      setButtonLabel("Restart");
      restartSudoku = true;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SUDOKU Solver</h1>
      </header>
      <button className="App-button" onClick={performAction}>
        {buttonLabel}
      </button>
      <Grid cells={value}/>
      <h2 className="App-info">{info}</h2>
    </div>
  );
}

export default App;
