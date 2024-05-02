import logo from "./logo.svg";
import "./App.css";
import Map from "./Component/Map/Map";
import DragPiece from "./Component/DragPiece/DragPiece";
import React, { useState } from "react";

function App() {
  // const pieceImageUrl1 = "../public/img/team1.jpg";
  // const pieceImageUrl2 = "../public/img/team2.jpg";

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Map />
    </div>
  );
}

export default App;
