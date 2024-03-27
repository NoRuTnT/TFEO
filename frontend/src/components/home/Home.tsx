import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import { useHomeStore } from '../../store/HomeStore';
import Slider from 'react-slick';

interface HomeProps {
  settings: any; // settings의 타입에 맞게 수정
  home: any;
}

const Home: React.FC<HomeProps> = ({ settings, home }) => {
  const { homes } = useHomeStore();
  return (
    <div className="list-container">
      <div className="img-container">
        {/*집주인의 사진을 보여줄 캐러셀*/}
        <div className="carousel-container-left">
          <Slider {...settings}>
            {home.hostImg.map((img: string, index: number) => (
              <div key={index} className="slide-left">
                <img src={img} alt={`Owner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {home.homeImg.map((img: string, index: number) => (
              <div key={index} className="slide-right">
                <img src={img} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div>서울특별시 동작구 흑석동</div>
    </div>
  );
};

export default Home;
