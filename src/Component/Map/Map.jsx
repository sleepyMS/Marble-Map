import React, { useState, useEffect } from "react";
import RenderModal from "../Modal/RenderModal";
import Dice from "../Dice/Dice";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Map.css";
import DragPiece from "../DragPiece/DragPiece";

const Map = () => {
  const [boardSizeRow, setBoardSizeRow] = useState(6); // 보드 행 크기 상태
  const [boardSizeCol, setBoardSizeCol] = useState(7); // 보드 열 크기 상태
  const [board, setBoard] = useState([]); // 보드 상태
  const [cell, setCell] = useState("");
  const [show, setShow] = useState(false);

  const pieces = [
    // 예시 이미지 경로와 ID를 여기에 추가하세요.
    { id: "piece1", src: "../../../public/img/team1.jpg" },
    { id: "piece2", src: "../../../public/img/team2.jpg" },
    // 모든 장기말 이미지를 추가하세요.
  ];

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
                      style={{ fontSize: "4rem" }}
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
        {pieces.map((piece) => (
          <DragPiece key={piece.id} id={piece.id} src={piece.src} />
        ))}
      </div>
    );
  };

  return <div className="Map">{renderBoard()}</div>;
};

export default Map;
