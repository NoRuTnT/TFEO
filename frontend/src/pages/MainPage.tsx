import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import ImageSlider from '../components/ImageSlider';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';

const MainPage: React.FC = () => {
  const images = ['/test/home1.png', '/test/home2.png', '/test/home3.png'];

  return (
    <div className="main-page">
      <div className="background-image-container">
        <img src="/assets/mainLogo.png" alt="로고 이미지" />
      </div>

      <div className="background-image-container">
        <img src="/assets/mainBanner.png" alt="배경 이미지" />
      </div>

      <div>
        뭔가 기준을 세워야 함. 내 대학교 기준 거리순, 월세 낮은 순 등
        <ImageSlider images={images} />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;