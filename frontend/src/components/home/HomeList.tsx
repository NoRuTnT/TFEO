import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import MapIcon from '@mui/icons-material/Map';
import { useHomeStore } from '../../store/HomeStore';
import Home from './Home';
import { useSwipeable } from 'react-swipeable';

const HomeList: React.FC = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [containerMarginTop, setContainerMarginTop] = useState('0%');
  const { visibleHomes } = useHomeStore();

  const shouldDisplay = visibleHomes.length > 0;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonClick = () => {
    scrollToTop();
    setTimeout(() => {
      setIsButtonVisible(false);
      setContainerMarginTop('165%');
    }, 300);
  };

  const resetStyles = () => {
    scrollToTop();
    setTimeout(() => {
      setIsButtonVisible(true);
      setContainerMarginTop('0%');
    }, 300);
  };

  // 항상 useSwipeable을 호출하되, shouldDisplay가 false일 때는 빈 이벤트 핸들러 객체를 전달합니다.
  const handlers = useSwipeable({
    onSwipedUp: shouldDisplay ? (eventData) => resetStyles() : () => {},
    delta: 10,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="page-container" style={{ marginTop: containerMarginTop }} {...handlers}>
      {isButtonVisible && (
        <button className="mapBtn" onClick={shouldDisplay ? handleButtonClick : undefined}>
          <span className="text">지도</span>
          <MapIcon style={{ fontSize: 20 }} />
        </button>
      )}
      <hr className="custom-hr" onClick={shouldDisplay ? resetStyles : undefined} />
      {shouldDisplay ? (
        <>
          <div className="home-count" onClick={resetStyles}>
            어르신 {visibleHomes.length} 명
          </div>
          {visibleHomes.map((home, index) => (
            <Home key={index} settings={settings} home={home} />
          ))}
        </>
      ) : (
        <div className="home-count">너에게 줄 집은 없어</div>
      )}
    </div>
  );
};

export default HomeList;
