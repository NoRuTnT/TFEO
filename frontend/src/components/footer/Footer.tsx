import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="icon-container">
        <img src="/assets/icons/footer/homeIcon.png" alt="홈" />
        <span className="icon-description">홈</span>
      </Link>
      <Link to="/find-house" className="icon-container">
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
  );
};

export default Footer;
