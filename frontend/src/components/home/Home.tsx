import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import Slider from 'react-slick';

interface HomeProps {
  settings: any; // settings의 타입에 맞게 수정
  home: any;
}

const Home: React.FC<HomeProps> = ({ settings, home }) => {
  return (
    <div className="list-container">
      <div className="img-container">
        {/*집주인의 사진을 보여줄 캐러셀*/}
        <div className="carousel-container-left">
          <div className="slide-left">
            <img src={home.host_image} alt={`Owner `} />
          </div>
          host
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            {home.home_image.map((img: any, index: number) => (
              <div key={index} className="slide-right">
                <img src={img.home_image_url} alt={`Home ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="content-container">
        <div>{home.address}</div>
        <div>
          {home.host_name} {home.gender == 1 ? '할머니' : '할아버지'}
        </div>
        <div>월 {home.rent} 만원</div>
      </div>
    </div>
  );
};

export default Home;
