import React, { useState } from "react";
import "./Preview.css";

const Preview = () => {
  const [started, setStarted] = useState(false);
  return (
    <div className="preview-wrap" style={{ zIndex: started ? "-1" : "10" }}>
      <div className="preview">
        <div className="title">MOTIV</div>
        <div className="str-btn-wrap">
          <button
            type="button"
            onClick={() => setStarted(!started)}
            className="str-btn"
          >
            Game Start!!!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
