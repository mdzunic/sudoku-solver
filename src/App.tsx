import React, { useState } from 'react';
import './App.css';
import Grid from "./components/Grid";
import { SUDOKU_SIZE } from "./utils/consts";
import { solveSudokuArray } from "./utils/solver";

let finished = false;

function App() {
  let cells: Array<number> = Array(SUDOKU_SIZE * 9);
  const [value, setValue] = useState(cells);
  const [buttonLabel, setButtonLabel] = useState("Solve");
  const [info, setInfo] = useState("");

  const solveSudoku = () => {
    if (finished) {
      cells = Array(SUDOKU_SIZE * 9);
      setValue(cells);
      setButtonLabel("Solve");
      setInfo("");
      finished = false;
    } else {
      const sudokuValue: number[] | string = solveSudokuArray(value);
      if (Array.isArray(sudokuValue)) {
        setValue(sudokuValue);
        setInfo("");
      } else {
        setValue(Array(SUDOKU_SIZE * 9));
        setInfo(sudokuValue);
      }
      setButtonLabel("Restart");
      finished = true;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SUDOKU Solver</h1>
      </header>
  <button className="App-button" onClick={solveSudoku}>{buttonLabel}</button>
      <Grid cells={value}/>
      <h2 className="App-info">{info}</h2>
    </div>
  );
}

export default App;
