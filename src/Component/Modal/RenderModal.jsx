import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RenderModal = ({ show, setShow, cell }) => {
  let cellDataBases = {
    "00": { title: "초성게임", write: "게임 내용" },
    "01": { title: "상식게임" },
  };
  let randomGame = {
    "": {}
  };

  // cellDataBases[cell]가 undefined인지를 먼저 확인한 후에 title에 접근
  const title = cellDataBases[cell] ? cellDataBases[cell].title : "Untitled";
  const write = cellDataBases[cell] ? cellDataBases[cell].write : "Untitled";

  return (
    <div
      className="show"
      style={{ display: "block", position: "initial", textAlign: "center" }}
    >
      <Modal
        show={show}
        fullscreen={true}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {write}
          </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RenderModal;
