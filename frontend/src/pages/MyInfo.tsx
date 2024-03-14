import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import '../styles/MyInfo.css';

const MyInfo: React.FC = () => {
  // 이미지 상태를 관리하기 위한 state 추가
  const [profileImage, setProfileImage] = useState('/test/profile.png'); // 기본 이미지 경로 설정

  // 이미지 업로드 핸들러 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // 이미지를 상태에 저장합니다 (예: URL.createObjectURL을 사용)
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <div className="background-image-container">
        <img src="/assets/mainLogo.png" alt="로고 이미지" />
      </div>
      <div className="profile-image-container">
        <img src={profileImage} alt="프로필 이미지" className="profile-image" />
        <button className="image-upload-button">
          <label htmlFor="image-upload">사진 등록</label>
          <input
            type="file"
            id="image-upload"
            style={{ display: 'none' }} // 파일 입력 숨기기
            onChange={handleImageUpload}
          />
        </button>
      </div>
      <div className="info-buttons-container">
        <Link to="/apply-list">집신청 리스트</Link>
        <Link to="/activity-certification">활동인증</Link>
        <Link to="/edit-profile">내정보수정</Link>
        <Link to="/view-contract">계약서보기</Link>
        <Link to="/register-certificate">재학증명서 등록</Link>
        <Link to="/current-home-info">현재 집정보</Link>
      </div>
      <Footer />
    </div>
  );
};

export default MyInfo;
