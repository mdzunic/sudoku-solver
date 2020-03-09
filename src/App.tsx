import React, { useState } from 'react';
import './App.css';
import Grid from "./components/Grid";
import { SUDOKU_SIZE } from "./utils/consts";
import { solveSudokuArray } from "./utils/solver";

function App() {
  let cells: Array<number> = Array(SUDOKU_SIZE * 9);
  const [value, setValue] = useState(cells);
  const solveSudoku = () => {
    setValue(solveSudokuArray(value));
  };
  const [info] = useState();
  return (
    <div className="App">
      <header className="App-header">
        <h1>SUDOKU Solver</h1>
      </header>
      <button onClick={solveSudoku}>Solve</button>
      <Grid cells={value}/>
      <h2>{info}</h2>
    </div>
  );
}

export default App;
