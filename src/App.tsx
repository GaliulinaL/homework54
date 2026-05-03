import { useState } from 'react'
import './App.css'

type Cell = {
  hasItem: boolean;
  clicked: boolean;
};

const createCells = (): Cell[] => {
  const arr: Cell[] = [];

  for (let i = 0; i < 36; i++) {
    arr.push({ hasItem: false, clicked: false });
  }

  const randomIndex = Math.floor(Math.random() * 36);
  arr[randomIndex].hasItem = true;

  return arr;
};

const App = () => {
  const [cells, setCells] = useState<Cell[]>(createCells());
  const [tries, setTries] = useState(0);
  const [found, setFound] = useState(false);

  const handleClick = (index: number) => {
    if (cells[index].clicked || found) return;

    const newCells = [...cells];
    newCells[index] = {
      ...newCells[index],
      clicked: true,
    };

    setCells(newCells);
    setTries(tries + 1);

    if (newCells[index].hasItem) {
      setFound(true);
    }
  };

  const reset = () => {
    setCells(createCells());
    setTries(0);
    setFound(false);
  };

  return (
      <div>
        <h1>Найдите ❤️</h1>

        <div className="grid">
          {cells.map((cell, index) => (
              <div
                  key={index}
                  className={`cell ${cell.clicked ? 'open' : ''}`}
                  onClick={() => handleClick(index)}
              >
                {cell.clicked && cell.hasItem && '❤️'}
              </div>
          ))}
        </div>

        <p>Попытки: {tries}</p>

        {found && <p>Найдено!</p>}

        <button onClick={reset}>Reset</button>
      </div>
  );
};

export default App;

