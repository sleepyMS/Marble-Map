import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Shuffle from "../Shuffle/Shuffle";
import "bootstrap/dist/css/bootstrap.min.css";
import gameDB from "./gameDB.json";

const RenderModal = ({ show, setShow, cell, cellCnt }) => {
  let cellDataBases = {
    "01": { title: "VS", write: "게임 내용" },
    "03": { title: "VS" },
    "04": { title: "VS" },
    10: { title: "VS" },
    16: { title: "VS" },
    26: { title: "VS" },
    30: { title: "VS" },
    40: { title: "VS" },
    52: { title: "VS" },
    54: { title: "VS" },
    56: { title: "VS" },
    "00": { title: "상식퀴즈", game: "gameQuize" },
    "02": { title: "청개구리 가위바위보", game: "none" },
    "05": { title: "세금", game: "none" },
    "06": { title: "동문서답", game: "gameEastWest" },
    20: { title: "단어 완성하기", game: "gameTwoWord" },
    36: { title: "한글자씩 늘려 말하기", game: "gameFiveLetter" },
    40: { title: "단어 완성하기", game: "gameTwoWord" },
    50: { title: "연금", game: "none" },
    51: { title: "청개구리 가위바위보", game: "none" },
    53: { title: "동문서답", game: "gameEastWest" },
    55: { title: "초성퀴즈", game: "none" },
  };

  let teamImgs = [
    "img/team1.jpg",
    "img/team2.jpg",
    "img/team3.jpg",
    "img/team4.jpg",
    "img/team5.jpg",
    "img/team6.jpg",
  ];

  let gameImgs = [
    "img/game1-1.jpg",
    "img/game1-2.jpg",
    "img/game1-3.jpg",
    "img/game1-4.jpg",
    "img/game1-5.jpg",
  ];
  const [selectedItems, setSelectedItems] = useState([]); // 이미 선택된 항목들을 저장할 상태
  const [currentGame, setCurrentGame] = useState([]);
  const [teamGame, setTeamGame] = useState(false);
  const [getTeamGameCnt, setGetTeamGameCnt] = useState(0);

  // num개의 중복되지 않는 랜덤 항목을 선택하는 함수
  const selectRandomItems = (arr, num) => {
    let availableItems = arr.filter((item) => !selectedItems.includes(item)); // 이미 선택된 항목들을 제외
    if (availableItems.length < num) {
      console.warn("더 이상 선택할 수 있는 항목이 충분하지 않습니다.");
      return [];
    }
    const shuffled = [...availableItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const handleSelect = (gameKey) => {
    // gameKey가 유효한지 검사
    if (!gameKey || !gameDB[gameKey]) {
      console.warn("유효하지 않은 gameKey입니다:", gameKey);
      return;
    }
    const items = selectRandomItems(gameDB[gameKey], 4);
    setSelectedItems((prev) => [...prev, ...items]); // 이미 선택된 항목들에 새로 선택된 항목들을 추가
    setCurrentGame(items);
  };

  useEffect(() => {
    handleSelect(cellDataBases[cell]?.game);
  }, [cellCnt]);

  useEffect(() => {
    if (teamGame == "img/game1-1.jpg") {
      handleSelect("gameQuiet");
    } else if (teamGame == "img/game1-2.jpg") {
      handleSelect("gameBodyLanguage");
    }
  }, [getTeamGameCnt]);

  useEffect(() => {
    if (teamGame == true) {
      setGetTeamGameCnt(getTeamGameCnt + 1);
    }
  }, [teamGame]);

  // cellDataBases[cell]가 undefined인지를 먼저 확인한 후에 title에 접근
  const title = cellDataBases[cell] ? cellDataBases[cell].title : "VS";
  // const write = cellDataBases[cell] ? cellDataBases[cell].write : "Untitled";

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
            {/* {write} */}
            {cellDataBases[cell]?.title == "VS" ? (
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Shuffle images={teamImgs} type={"대결 상대"} />
                  <Shuffle
                    images={gameImgs}
                    type={"대결 종목"}
                    getTeamGameCnt={getTeamGameCnt}
                    setGetTeamGameCnt={setGetTeamGameCnt}
                    setTeamGame={setTeamGame}
                  />
                </div>
                <div
                  style={{
                    display: teamGame ? "block" : "none",
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                  }}
                >
                  <ul
                    style={{
                      fontSize: "3rem",
                    }}
                  >
                    {currentGame.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <button onClick={() => setTeamGame(!teamGame)}>닫기</button>
                </div>
              </div>
            ) : (
              <ul
                style={{
                  fontSize: "3rem",
                }}
              >
                {currentGame.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setTeamGame(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RenderModal;
