import React, { useState, useEffect } from "react";
import "./Dice.css";

const Dice = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(1);
  const [dice, setDice] = useState([]);

  useEffect(() => {
    // 보드 초기화
    setTimeout(() => {
      setDice(generateEmptyDice());
    }, 300);
  }, [result]); // result 상태가 변경될 때마다 useEffect가 실행됨

  const generateEmptyDice = () => {
    let newDice = [];
    for (let i = result; i < result + 6; i++) {
      newDice.push(i > 6 ? i - 6 : i);
    }
    return newDice;
  };

  const rollDice = () => {
    if (!isRolling) {
      setIsRolling(true);
      const newResult = Math.floor(Math.random() * 6) + 1;
      setResult(newResult);
      setTimeout(() => {
        setIsRolling(false);
      }, 2000); // 2초 후에 결과를 결정하고 애니메이션을 멈춤
    }
  };

  return (
    <div
      className={`dice-container ${isRolling ? "rolling" : ""}`}
      onClick={rollDice}
    >
      <div className="dice">
        {dice.map((num, numIndex) => {
          return (
            <div
              key={numIndex}
              className={`side side${numIndex + 1} dice${num}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Dice;
