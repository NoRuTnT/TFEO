import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import '../styles/ActivityCertification.css'; // CSS 파일을 적절히 수정해야 할 수도 있습니다.
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';

const MakeActivity: React.FC = () => {
  const [profileImage, setProfileImage] = useState('/test/profile.png'); // 기본 이미지 경로 설정

  // 이미지 업로드 핸들러 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // 이미지를 상태에 저장합니다 (예: URL.createObjectURL을 사용)
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 텍스트 상태와 버튼 텍스트 상태를 관리합니다.
  const [content, setContent] = useState('');
  const [buttonText, setButtonText] = useState('등록');

  // 내용 등록 혹은 수정 핸들러
  const handleContentSubmit = () => {
    // '등록' 상태라면 내용을 등록하는 로직을 실행합니다.
    // 이 예에서는 단순히 버튼 텍스트를 '수정'으로 변경합니다.
    if (buttonText === '등록') {
      setButtonText('수정');
    } else {
      // '수정' 상태라면 내용을 수정하는 로직을 실행합니다.
      // 이 예제에서는 추가적인 조건이나 로직이 없으므로 그대로 둡니다.
    }
  };

  // 내용 삭제 핸들러
  const handleContentDelete = () => {
    // 내용을 삭제합니다.
    setContent('');
    // 버튼 텍스트를 '등록'으로 다시 변경합니다.
    setButtonText('등록');
  };

  return (
    <div className="main-page">
      <div className="back-button">
        <Link to="/activity-certification">뒤로 가기</Link>
      </div>
      <h2>텍스트 제목</h2>
      <div className="image-upload-section">
        <div className="image-placeholder">{/* 이미지 경로를 설정하실 때 이 div에 적용하세요 */}</div>
        <img src={profileImage} alt="프로필 이미지" className="profile-image" />
        <button className="image-upload-button">
          <label htmlFor="image-upload">사진 등록하기</label>
          <input
            type="file"
            id="image-upload"
            style={{ display: 'none' }} // 파일 입력 숨기기
            onChange={handleImageUpload}
          />
        </button>
      </div>
      <textarea
        className="text-box"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용 입력하기"
      ></textarea>
      <div className="action-buttons">
        <button onClick={handleContentSubmit}>{buttonText}</button>
        <button onClick={handleContentDelete}>삭제</button>
      </div>
      <Footer />
    </div>
  );
};

export default MakeActivity;
