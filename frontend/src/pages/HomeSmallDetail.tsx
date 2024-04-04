import React, { useState } from 'react';
import '../styles/home/HomeSmallDetail.css';
import SwipeableViews from 'react-swipeable-views';

const HomeSmallDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const images: string[] = [
    '/test/owner1.png',
    '/test/home1.png',
    '/test/home2.png',
    '/test/home3.png',
    // 추가 이미지를 계속 넣어주세요
  ];

  return (
    <div className="small-page-wrapper">
      <SwipeableViews
        enableMouseEvents
        index={currentImageIndex}
        onChangeIndex={(index: number) => setCurrentImageIndex(index)}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} className="small-swipeable-image" alt="House" />
          </div>
        ))}
      </SwipeableViews>

      <div className="small-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`small-dot ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          ></span>
        ))}
      </div>

      <div className="small-content-wrapper">
        <div className="name-container">
          <p>집주인(김옥순 어르신의 집)</p>
        </div>

        <div className="explaination-wrapper">
          <p>위치(관악구 신림동)</p>
          집이나 호스트에 대한 간략한 설명 부분
        </div>
      </div>
    </div>
  );
};

export default HomeSmallDetail;
