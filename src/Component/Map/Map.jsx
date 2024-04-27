import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import RenderModal from "../Game/Modal/RenderModal";
import "bootstrap/dist/css/bootstrap.min.css";
import Dice from "../Dice/Dice";
import "./Map.css";

const Map = () => {
  const [boardSizeRow, setBoardSizeRow] = useState(5); // 보드 행 크기 상태
  const [boardSizeCol, setBoardSizeCol] = useState(7); // 보드 열 크기 상태
  const [board, setBoard] = useState([]); // 보드 상태
  const [cell, setCell] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = (breakpoint) => {
    setShow(true);
  };

  useEffect(() => {
    // 보드 초기화
    setBoard(generateEmptyBoard());
  }, [boardSizeRow, boardSizeCol]); // boardSizeRow 또는 boardSizeCol 상태가 변경될 때마다 useEffect가 실행됨

  const generateEmptyBoard = () => {
    return Array.from({ length: boardSizeRow }, () =>
      Array.from({ length: boardSizeCol }, () => null)
    );
  };

  const renderBoard = () => {
    return (
      <div className="board-wrap">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => {
                // 가장자리 칸인지 확인
                if (
                  rowIndex !== 0 &&
                  rowIndex !== boardSizeRow - 1 &&
                  colIndex !== 0 &&
                  colIndex !== boardSizeCol - 1
                ) {
                  return <div className="cell-none"></div>; // 가운데 칸은 비움
                } else {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="cell"
                      onClick={() => {
                        handleShow(true);
                        setCell("" + rowIndex + colIndex);
                      }}
                    >
                      {`${rowIndex}-${colIndex}`}
                    </div>
                  );
                }
              })}
              <RenderModal show={show} setShow={setShow} cell={cell} />
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
