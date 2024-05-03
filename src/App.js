import "./App.css";
import Map from "./Component/Map/Map";
import React, { useState } from "react";

function App() {

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
