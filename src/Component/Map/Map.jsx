import React, { useState, useEffect } from "react";
import Dice from "../Dice/Dice";
import "./Map.css";

const Map = () => {
  const [boardSizeRow, setBoardSizeRow] = useState(5); // 보드 행 크기 상태
  const [boardSizeCol, setBoardSizeCol] = useState(7); // 보드 열 크기 상태
  const [board, setBoard] = useState([]); // 보드 상태

  useEffect(() => {
    // 보드 초기화
    setBoard(generateEmptyBoard());
  }, [boardSizeRow, boardSizeCol]); // boardSizeRow 또는 boardSizeCol 상태가 변경될 때마다 useEffect가 실행됨

  const generateEmptyBoard = () => {
    return Array.from({ length: boardSizeRow }, () =>
      Array.from({ length: boardSizeCol }, () => null)
    );
  };

  const [diceResult, setDiceResult] = useState(null); // 주사위 결과 상태

  // 주사위를 굴리는 함수
  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1; // 1부터 6 사이의 난수 생성
    setDiceResult(result); // 주사위 결과 업데이트
  };

  const renderBoard = () => {
    return (
      <div className="board-wrap">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => {
                // 가장자리 칸인지 확인
                if (
                  rowIndex !== 0 &&
                  rowIndex !== boardSizeRow - 1 &&
                  colIndex !== 0 &&
                  colIndex !== boardSizeCol - 1
                ) {
                  return <div className="cell-none"></div>;
                } else {
                  return (
                    <div key={`${rowIndex}-${colIndex}`} className="cell">
                      {/* 여기에 셀 내용 추가 */}
                    </div>
                  ); // 가운데 칸은 비움
                }
              })}
            </div>
          ))}
        </div>
        <div className="dice-wrap">
          <Dice />
        </div>
      </div>
    );
  };

  return <div className="Map">{renderBoard()}</div>;
};

export default Map;
