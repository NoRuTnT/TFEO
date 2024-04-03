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
      setContainerMarginTop(visibleHomes.length === 1 ? '255px' : '0%');
      // setContainerMarginTop('0%');
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
    <div className="page-container" style={{ marginTop: containerMarginTop }}>
      {isButtonVisible && (
        <button className="mapBtn" onClick={shouldDisplay ? handleButtonClick : undefined}>
          <span className="text">지도</span>
          <MapIcon style={{ fontSize: 20 }} />
        </button>
      )}
      <hr className="custom-hr" onClick={shouldDisplay ? resetStyles : undefined} />
      {shouldDisplay ? (
        <>
          <div className="home-count" onClick={resetStyles} {...handlers}>
            <div style={{ fontSize: '17px' }}>
              함께 할 학생을 찾는 어르신 <b>{visibleHomes.length}</b>분
            </div>
          </div>
          {visibleHomes.map((home, index) => (
            <Home key={index} settings={settings} home={home} />
          ))}
        </>
      ) : (
        <div className="home-count">알맞은 집이 없습니다</div>
      )}
    </div>
  );
};

export default HomeList;
