import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import ImageSlider from '../components/ImageSlider';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import MapBox from '../components/home/MapBox';
const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="background-image-container">
        <img src="/assets/mainLogo.png" alt="로고 이미지" />
      </div>

      <button>지도로 보기</button>
      <MapBox />
      <Footer />
    </div>
  );
};

export default MainPage;
