import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
            <img src={`http://j10a707.p.ssafy.io${home.host_image_url}`} alt={`Owner `} />
          </div>
          host
        </div>
        {/* 집의 사진을 보여줄 캐러셀 */}
        <div className="carousel-container">
          <Slider {...settings}>
            <div className="slide-right">
              <img src={`http://j10a707.p.ssafy.io${home.home_image_0}`} alt={`Home 0`} />
            </div>
            <div className="slide-right">
              <img src={`http://j10a707.p.ssafy.io${home.home_image_1}`} alt={`Home 1`} />
            </div>
            <div className="slide-right">
              <img src={`http://j10a707.p.ssafy.io${home.home_image_2}`} alt={`Home 2`} />
            </div>
          </Slider>
        </div>
      </div>
      <div className="content-container">
        <div>{home.address}</div>
        <div>
          {home.host_name} {home.gender == 0 ? '할머니' : '할아버지'}
        </div>
        <div>월 {home.rent} 만원</div>
        <Link to={{ pathname: '/home-detail', search: `?homeNo=${home.home_no}` }}>
          <Button>방 보러가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
