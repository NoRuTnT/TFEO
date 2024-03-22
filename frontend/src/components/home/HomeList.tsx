import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import MapIcon from '@mui/icons-material/Map';

const HomeList: React.FC = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [containerMarginTop, setContainerMarginTop] = useState('5%');

  const ownerImages = ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'];
  const homeImages = ['/test/home1.png', '/test/home2.png', '/test/home3.png'];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleButtonClick = () => {
    setIsButtonVisible(false); // 버튼 숨기기
    setContainerMarginTop('70%'); // margin-top 변경. 모바일 테스트 시 175%로 변경
  };

  // 다른 동작을 위한 함수 예시
  const resetStyles = () => {
    setIsButtonVisible(true); // 버튼 다시 보이게 하기
    setContainerMarginTop('5%'); // margin-top 원래대로
  };

  return (
    <div className="page-container" style={{ marginTop: containerMarginTop }}>
      {isButtonVisible && (
        <button className="btn" onClick={handleButtonClick}>
          <span className="text">지도</span>
          <MapIcon style={{ fontSize: 40 }} />
        </button>
      )}

      <hr className="custom-hr" onClick={resetStyles} />
      <div className="home-count" onClick={resetStyles}>
        나와 함께할 공유자 count 명
      </div>
      {/*집주인의 사진을 보여줄 캐러셀*/}
      <div className="list-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {ownerImages.map((img, index) => (
              <div key={index} className="slide-left">
                <img src={img} alt={`Owner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {homeImages.map((img, index) => (
              <div key={index} className="slide-right">
                <img src={img} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="list-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {ownerImages.map((img, index) => (
              <div key={index} className="slide-left">
                <img src={img} alt={`Owner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {homeImages.map((img, index) => (
              <div key={index} className="slide-right">
                <img src={img} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="list-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {ownerImages.map((img, index) => (
              <div key={index} className="slide-left">
                <img src={img} alt={`Owner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {homeImages.map((img, index) => (
              <div key={index} className="slide-right">
                <img src={img} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="list-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {ownerImages.map((img, index) => (
              <div key={index} className="slide-left">
                <img src={img} alt={`Owner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {homeImages.map((img, index) => (
              <div key={index} className="slide-right">
                <img src={img} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="list-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {ownerImages.map((img, index) => (
              <div key={index} className="slide-left">
                <img src={img} alt={`Owner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {homeImages.map((img, index) => (
              <div key={index} className="slide-right">
                <img src={img} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeList;
