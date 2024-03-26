import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import MapIcon from '@mui/icons-material/Map';
import { useHomeStore } from '../../store/HomeStore';
import Home from './Home';

const HomeList: React.FC = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [containerMarginTop, setContainerMarginTop] = useState('0%');
  const { school, subway, apartment, pets, selectFilter, homes } = useHomeStore();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleButtonClick = () => {
    setIsButtonVisible(false); // 버튼 숨기기
    setContainerMarginTop('175%'); // margin-top 변경. 모바일 테스트 시 175%로 변경
  };

  // 다른 동작을 위한 함수 예시
  const resetStyles = () => {
    setIsButtonVisible(true); // 버튼 다시 보이게 하기
    setContainerMarginTop('0%'); // margin-top 원래대로
  };

  return (
    <div className="page-container" style={{ marginTop: containerMarginTop }}>
      {isButtonVisible && (
        <button className="btn" onClick={handleButtonClick}>
          <span className="text">지도</span>
          <MapIcon style={{ fontSize: 25 }} />
        </button>
      )}
      <hr className="custom-hr" onClick={resetStyles} />
      <div className="home-count" onClick={resetStyles}>
        어르신 {homes.length} 명
      </div>
      {homes.map((home, index) => (
        <Home key={index} settings={settings} home={home} />
      ))}
    </div>
  );
};

export default HomeList;
