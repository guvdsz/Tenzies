import { useState } from "react";
import { useRef } from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from 'react-confetti'
function App() {
  const [dice, setDice] = useState(() => generateDiceValues());
  function generateDiceValues() {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);
      numbers.push({ value: randomNumber, isHeld: false, id: i });
    }
    return numbers;
  }
  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          if (!die.isHeld) {
            return {
              ...die,
              value: Math.ceil(Math.random() * 6),
            };
          }
          return die;
        });
      });
    }
    else {
      setDice(generateDiceValues())
    }
  }
  function hold(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          };
        }
        return die;
      });
    });
  }
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  
  const diceComponents = dice.map((dice) => {
    return (
      <Die
        value={dice.value}
        isHeld={dice.isHeld}
        id={dice.id}
        key={dice.id}
        hold={hold}
      />
    );
  });
  return (
    <>
      <main>
        {gameWon && <Confetti/>}
        <header>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </header>
        <div className="dice-container">{diceComponents}</div>
        <button onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  );
}

export default App;
