import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/home/HomeList.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { IHomeDetail } from '../../interfaces/HomeInterface';
import { getEMDNameAddress } from '../../utils/addressUtils';

interface HomeProps {
  settings: any; // settings의 타입에 맞게 수정
  home: IHomeDetail;
}

const Wish: React.FC<HomeProps> = ({ settings, home }) => {
  return (
    <div className="list-container">
      <Link to={{ pathname: '/home-detail', search: `?homeNo=${home.home.homeNo}` }}>
        <div className="img-container">
          {/*집주인의 사진을 보여줄 캐러셀*/}
          <div className="carousel-container-left">
            <div className="slide-left">
              <img
                style={{ width: '225px', height: '240px' }}
                src={`https://j10a707.p.ssafy.io${home.hostImageList[0]}`}
                alt={`Owner `}
              />
            </div>
            host
          </div>
          {/* 집의 사진을 보여줄 캐러셀 */}
          <div className="carousel-container">
            {/* <Slider {...settings}> */}
            {home.homeImageList.map((img: any, index: number) => (
              <div key={index} className="slide-right">
                <img
                  src={`https://j10a707.p.ssafy.io${img.homeImageUrl}`}
                  style={{ width: '225px', height: '240px' }}
                  alt={`Home ${index}`}
                />
              </div>
            ))}
            {/* </Slider> */}
          </div>
        </div>
        <div className="content-container">
          <div>{getEMDNameAddress(home.home.address)}</div>
          <div>
            {home.home.hostName} {home.home.hostGender == 'F' ? '할머니' : '할아버지'}
          </div>
          <div>월 {home.home.rent} 만원</div>
        </div>
      </Link>
    </div>
  );
};

export default Wish;
