import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityContent.css'; // 이 페이지 전용 스타일을 위한 새 CSS 파일 경로

const ActivityContent: React.FC = () => {
  return (
    <div className="main-page">
      {/* 뒤로 가기 버튼 */}
      <div className="back-button-container">
        <Link to="/activity-certification">
          {' '}
          <button>뒤로가기</button>
        </Link>
      </div>

      {/* 페이지 제목 */}
      <div className="page-title">
        <h1>활동내역 | 2024.03.06 오전 3:10</h1>
      </div>

      {/* 사진 컨테이너 */}
      <div className="photo-container">
        <img src="/test/home3.png" alt="설명" /> {/* 이미지 경로 */}
      </div>

      {/* 사진 설명 */}
      <div className="photo-description">
        <p>주변에 꽃이 아름답게 피었습니다.</p>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default ActivityContent;
