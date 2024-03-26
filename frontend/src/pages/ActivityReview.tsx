import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityContent.css'; // 이 페이지 전용 스타일을 위한 새 CSS 파일 경로

// ToggleButton 컴포넌트의 Props 타입을 정의합니다.
interface ToggleButtonProps {
  text: string;
}

// ToggleButton 컴포넌트를 타입스크립트로 정의합니다.
const ToggleButton: React.FC<ToggleButtonProps> = ({ text }) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 버튼 활성화 상태

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  const buttonStyle: React.CSSProperties = {
    // 버튼 스타일을 정의합니다.
    backgroundColor: isActive ? '#F9EAE1' : 'transparent',
    border: '1px solid black',
    borderRadius: '20px',
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={toggleButton}>
      {text}
    </button>
  );
};

const ActivityContent: React.FC = () => {
  const keywords: string[] = [
    // 키워드 목록을 정의합니다.
    '친절해요',
    '주변에 편의시설이 많아요',
    '집이 깨끗해요',
    '옵션이 설명과 같아요',
    '치안이 좋아요',
    '어르신이 저를 존중해요',
    '학교와 가까워요',
    '월세가 저렴해요',
    '방이 넓어요',
    '집까지 가는 길이 편해요',
    '교통이 편해요',
  ];

  return (
    <div className="main-page">
      <div style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px' }}>어르신과 함께한 6개월은 어떠셨나요?</div>
      <div style={{ fontSize: '16px', marginBottom: '10px' }}> 키워드를 골라주세요 </div>
      <div>
        {keywords.map((keyword) => (
          <ToggleButton key={keyword} text={keyword} />
        ))}
      </div>
      <div>
        <textarea
          placeholder="리뷰를 작성해 주세요."
          style={{
            width: '280px',
            height: '230px',
            margin: '10px 0',
            padding: '10px',
            border: '1px solid black',
            borderRadius: '10px',
            color: 'grey',
          }}
        />
      </div>
      <div>
        <button style={{ marginRight: '10px' }}>취소</button>
        <button>등록</button>
      </div>
    </div>
  );
};

export default ActivityContent;
