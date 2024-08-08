import React, { useState, useRef, useEffect } from "react";

function DragPiece({ src }) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const pieceRef = useRef(null);

  // 마우스 다운 이벤트
  const onMouseDown = (e) => {
    const elem = pieceRef.current;
    if (elem) {
      const rect = elem.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  // 마우스 이동 이벤트 처리
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const elem = pieceRef.current;
    if (elem) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      requestAnimationFrame(() => {
        elem.style.left = `${newX}px`;
        elem.style.top = `${newY}px`;
      });
    }
  };

  // 마우스 업 이벤트
  const onMouseUp = () => {
    setIsDragging(false);
  };

  // 드래그 상태 변경에 따른 이벤트 리스너 추가 및 제거
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <img
      ref={pieceRef}
      src={src}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        cursor: "grab",
        userSelect: "none",
        width: "100px",
        height: "100px",
      }}
      draggable="false"
      alt="Draggable Piece"
    />
  );
}

export default DragPiece;
