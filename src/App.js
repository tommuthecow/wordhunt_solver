import React, { useState } from 'react';
import './App.css'

import huntWords from './functions/huntWords';
const dictionary = require('./functions/buildTrie');

const initial = [
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
];

function App() {
  const [whArr, setWhArr] = useState(() => getDeepCopy(initial));
  const [foundWords, setFoundWords] = useState(new Set());

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    var val = e.target.value || '';
    var grid = getDeepCopy(whArr);

    if (val.length === 0 || /^[a-zA-Z]+$/.test(val)) {
      grid[row][col] = val.toUpperCase();
    }

    setWhArr(grid);
  }

  function handleHunt() {
    const isGridFilled = whArr.every(row => row.every(cell => cell !== ''));
    
    if (isGridFilled) {
      const words = huntWords(whArr, dictionary); // Call the huntWords function with the grid
      setFoundWords(words);
    } else {
      alert('Please fill all cells in the grid.');
    }
  }

  function resetGrid() {
    setWhArr(getDeepCopy(initial));
    setFoundWords(new Set());
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className = "completeContainer">
        <div className= "wordContainer">
            <h1 className = "foundWordsHeading">FOUND WORDS</h1>
            <ul>
              {Array.from(foundWords).map((word, index) => (
                <li className = "word" key={index}>{word}</li>
              ))}
            </ul>
          </div>
          <div>
          <h2 className="title"> WORD HUNT SOLVER </h2>
          <table>
            <tbody> 
              {
                [0,1,2,3,4].map((row, rIndex) => {
                  return <tr key={rIndex}>
                    {[0,1,2,3,4].map((col, cIndex) => {
                      return <td key={rIndex + cIndex}>
                        <input 
                          onChange={(e) => onInputChange(e, row, col)}
                          value={/^[a-zA-Z]+$/.test(whArr[row][col]) ? whArr[row][col] : ''}
                          maxLength={1}
                          className="cellInput"
                        />
                      </td>
                    })}
                  </tr>
                })
              }
            </tbody>
        </table>
        <div className="buttonContainer">
            <button className="huntButton" onClick={handleHunt}> HUNT</button>
            <button className="resetButton" onClick={resetGrid}>RESET</button>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
