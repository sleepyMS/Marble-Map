import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";

const Shuffle = ({ images, type }) => {
  // 현재 보여줄 이미지의 상태와 선택된 이미지의 상태를 관리
  const [currentImage, setCurrentImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [shuffleImage, setShuffleImage] = useState(true);

  // 이미지를 랜덤으로 바꿈
  const changeImageRandomly = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  }, [images]); // images 배열이 변경될 때만 함수를 새로 생성

  // 컴포넌트가 마운트될 때와 currentImage 상태가 바뀔 때마다 이미지를 자동으로 바꿈
  useEffect(() => {
    const intervalId = setInterval(changeImageRandomly, 10); // 0.01초마다 이미지 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 제거
  }, [changeImageRandomly]);

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

  const randomGameSelected = (e) => {
    alert(e);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {selectedImage ? (
          <img
            src={selectedImage}
            style={{ width: "500px", height: "500px" }}
            onClick={() => randomGameSelected(selectedImage)}
            alt="Selected"
          />
        ) : (
          <img
            src={currentImage}
            style={{ width: "500px", height: "500px" }}
            alt="Current"
          />
        )}
      </div>
      <Button variant="outline-dark" onClick={handleSelectImage}>
        {type}
      </Button>
    </div>
  );
};

export default Shuffle;
