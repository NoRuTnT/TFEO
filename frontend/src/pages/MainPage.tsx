import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import ImageSlider from '../components/ImageSlider';

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

      <footer className="footer">
        <Link to="/" className="icon-container">
          <img src="/assets/icons/footer/homeIcon.png" alt="홈" />
          <span className="icon-description">홈</span>
        </Link>
        <Link to="/find-home" className="icon-container">
          <img src="/assets/icons/footer/findHomeIcon.png" alt="집찾기" />
          <span className="icon-description">집찾기</span>
        </Link>
        <Link to="/wish-list" className="icon-container">
          <img src="/assets/icons/footer/wishIcon.png" alt="찜목록" />
          <span className="icon-description">찜목록</span>
        </Link>
        <Link to="/menu" className="icon-container">
          <img src="/assets/icons/footer/menuIcon.png" alt="메뉴" />
          <span className="icon-description">메뉴</span>
        </Link>
        <Link to="/my-info" className="icon-container">
          <img src="/assets/icons/footer/infoIcon.png" alt="내 정보" />
          <span className="icon-description">내 정보</span>
        </Link>
      </footer>
    </div>
  );
};

export default MainPage;
