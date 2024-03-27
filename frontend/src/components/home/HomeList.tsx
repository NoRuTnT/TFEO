import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import MapIcon from '@mui/icons-material/Map';
import { useHomeStore } from '../../store/HomeStore';
import Home from './Home';

const HomeList: React.FC = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [containerMarginTop, setContainerMarginTop] = useState('0%');
  const { visibleHomes, isMapLoaded } = useHomeStore(); // 현재 화면에 보이는 집들의 목록을 가져옴

  // 지도가 로드되었고, visibleHomes가 업데이트 되었는지 확인하기 위한 상태
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [initialDisplay, setInitialDisplay] = useState(true);
  useEffect(() => {
    // 지도가 로드되었고 visibleHomes에 데이터가 있을 경우 내용을 보여주도록 설정
    if (visibleHomes.length == 0) {
      setShouldDisplay(false);
    } else {
      setShouldDisplay(true);
    }
  }, [visibleHomes]);

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
      {shouldDisplay && (
        <>
          <div className="home-count" onClick={resetStyles}>
            어르신 {visibleHomes.length} 명
          </div>
          {visibleHomes.map((home, index) => (
            <Home key={index} settings={settings} home={home} />
          ))}
        </>
      )}
    </div>
  );
};

export default HomeList;
