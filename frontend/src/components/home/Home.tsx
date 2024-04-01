import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
interface HomeProps {
  settings: any; // settings의 타입에 맞게 수정
  home: any;
}

const dummys = ['/test/home1.png', '/test/home2.png', '/test/home3.png'];

const Home: React.FC<HomeProps> = ({ settings, home }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSwipe = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Link to={{ pathname: '/home-detail', search: `?homeNo=${home.home_no}` }}>
      <div className="list-container">
        <div className="img-container">
          {/*집주인의 사진을 보여줄 캐러셀*/}
          <div className="carousel-container-left">
            <div style={{ height: '100%' }}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={`https://j10a707.p.ssafy.io${home.host_image_url}`}
                alt={`Owner `}
              />
              {/*<img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="/test/owner3.png" />*/}
            </div>
          </div>
          {/* 집의 사진을 보여줄 캐러셀 */}
          <div className="carousel-home-container">
            <SwipeableViews index={currentSlide} onChangeIndex={handleSwipe}>
              {/*각 슬라이드를 매핑하여 표시*/}
              {home.home_image.map((img: any, index: number) => (
                <div key={index} className="slide-right" style={{ width: '150%', height: '100%', objectFit: 'cover' }}>
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={`https://j10a707.p.ssafy.io${img.home_image_url}`}
                    alt={`Home ${index}`}
                  />
                </div>
              ))}
              {/*{dummys.map((imgSrc, index) => (*/}
              {/*  <div key={index} style={{ width: '130%', height: '100%', objectFit: 'cover' }}>*/}
              {/*    <img*/}
              {/*      style={{ width: '100%', height: '100%', objectFit: 'cover' }}*/}
              {/*      src={imgSrc}*/}
              {/*      alt={`Home ${index}`}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*))}*/}
            </SwipeableViews>
          </div>
        </div>
        <div className="home-content-container">
          <div className="filters-container">
            {home.smoke === 1 && <div className="filter">비흡연</div>}
            {home.extrovert === 1 && <div className="filter">집을 자주 비우는</div>}
            {home.noTouch === 0 && <div className="filter">적극적인</div>}
            {home.introvert === 1 && <div className="filter">집돌이 / 집순이</div>}
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '17px' }}>{home.address}</div>
          <div>
            {home.host_name} {home.gender == 0 ? '할머니' : '할아버지'}
          </div>
          <div style={{ fontSize: '14px' }}>월 {home.rent} 만원</div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
