import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import MapIcon from '@mui/icons-material/Map';
import { useHomeStore } from '../../store/HomeStore';
import Home from './Home';
import { useSwipeable } from 'react-swipeable'; // react-swipeable 라이브러리에서 useSwipeable 훅을 임포트

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤을 최상단으로 부드럽게 이동
  };

  const handleButtonClick = () => {
    scrollToTop(); // 스크롤 이동
    setTimeout(() => {
      setIsButtonVisible(false); // 버튼 숨기기
      setContainerMarginTop('165%'); // margin-top 변경
    }, 300);
  };

  const resetStyles = () => {
    scrollToTop();
    setTimeout(() => {
      setIsButtonVisible(true); // 버튼 다시 보이게 하기
      setContainerMarginTop('0%'); // margin-top 원래대로
    }, 300);
  };

  // swipeable 핸들러 생성, 위쪽으로의 flick(빠른 스와이프) 이벤트 감지
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => resetStyles(), // 위쪽으로 스와이프 할 때 resetStyles 함수 호출
    // 스와이프 감지 기준 설정, 필요에 따라 조정 가능
    delta: 10, // 최소 움직임 픽셀
    // preventDefaultTouchmoveEvent: true, // 스와이프 중 스크롤 방지
    trackTouch: true,
    trackMouse: false, // 마우스로의 스와이프는 추적하지 않음
  });

  return (
    <div className="page-container" style={{ marginTop: containerMarginTop }} {...handlers}>
      {isButtonVisible && (
        <button className="mapBtn" onClick={handleButtonClick}>
          <span className="text">지도</span>
          <MapIcon style={{ fontSize: 20 }} />
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
