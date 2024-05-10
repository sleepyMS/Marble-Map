import React, { useState, useEffect, useCallback } from "react";
import RenderModal from "../Modal/RenderModal";
import Dice from "../Dice/Dice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Board.css";
import DragPiece from "../DragPiece/DragPiece";

const Board = () => {
  const [boardSizeRow, setBoardSizeRow] = useState(6); // 보드 행 크기 상태
  const [boardSizeCol, setBoardSizeCol] = useState(7); // 보드 열 크기 상태
  const [board, setBoard] = useState([]); // 보드 상태
  const [cell, setCell] = useState("");
  const [show, setShow] = useState(false);
  const [cellCnt, setCellCnt] = useState(0);

  // 장기말 이미지
  const pieces = [
    { id: "piece1", src: "img/team1.jpg" },
    { id: "piece2", src: "img/team2.jpg" },
    { id: "piece3", src: "img/team3.jpg" },
    { id: "piece4", src: "img/team4.jpg" },
    { id: "piece5", src: "img/team5.jpg" },
    { id: "piece6", src: "img/team6.jpg" },
  ];

  const generateEmptyBoard = useCallback(() => {
    return Array.from({ length: boardSizeRow }, () =>
      Array.from({ length: boardSizeCol }, () => null)
    );
  }, [boardSizeRow, boardSizeCol]);

  useEffect(() => {
    // 보드 초기화
    setBoard(generateEmptyBoard());
  }, [generateEmptyBoard]); // boardSizeRow 또는 boardSizeCol 상태가 변경될 때마다 useEffect가 실행

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
                    id={`cell-${rowIndex}-${colIndex}`}
                    key={`${rowIndex}-${colIndex}`}
                    className={`cell cell-${rowIndex}-${colIndex}`}
                    onClick={() => {
                      setShow(true);
                      setCell("" + rowIndex + colIndex);
                      setCellCnt(cellCnt + 1);
                    }}
                    style={{ fontSize: "4rem" }}
                  >
                    {`${rowIndex}-${colIndex}`}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
      <RenderModal
        show={show}
        setShow={setShow}
        cell={cell}
        cellCnt={cellCnt}
      />
      <div className="dice-wrap">
        <Dice />
      </div>
      {pieces.map((piece) => (
        <DragPiece key={piece.id} id={piece.id} src={piece.src} />
      ))}
    </div>
  );
};

export default Board;
