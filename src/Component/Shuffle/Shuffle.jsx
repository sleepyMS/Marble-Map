import React, { useState, useEffect } from "react";

const Shuffle = () => {
  // 이미지 리스트 예시입니다. 실제 이미지 경로로 교체해주세요.
  const images = [
    "img/team1.jpg",
    "img/team2.jpg",
    "img/team3.jpg",
    "img/team4.jpg",
    "img/team5.jpg",
    "img/team6.jpg",
  ];

  // 현재 보여줄 이미지의 상태와 선택된 이미지의 상태를 관리
  const [currentImage, setCurrentImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [shuffleImage, setShuffleImage] = useState(true);

  // 이미지를 랜덤으로 바꿈
  const changeImageRandomly = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  };

  // 컴포넌트가 마운트될 때와 currentImage 상태가 바뀔 때마다 이미지를 자동으로 바꿈
  useEffect(() => {
    const intervalId = setInterval(changeImageRandomly, 10); // 1초마다 이미지 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 제거
  }, [currentImage]);

  // 버튼을 눌렀을 때, 셔플중이면 정지 OR 정지 상태면 셔플 진행
  const handleSelectImage = () => {
    if (shuffleImage) {
      setSelectedImage(currentImage);
      setShuffleImage(!shuffleImage);
    } else {
      setSelectedImage("");
      setShuffleImage(!shuffleImage);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {selectedImage ? (
          <img
            src={selectedImage}
            style={{ width: "300px", height: "300px" }}
            alt="Selected"
          />
        ) : (
          <img
            src={currentImage}
            style={{ width: "300px", height: "300px" }}
            alt="Current"
          />
        )}
      </div>
      <button onClick={handleSelectImage}>대결 상대</button>
    </div>
  );
};

export default Shuffle;
