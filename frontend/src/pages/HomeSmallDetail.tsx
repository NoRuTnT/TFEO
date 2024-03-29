import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import '../styles/home/HomeDetail.css';
import MapDetailBox from '../components/home/MapDetailBox';
import { radians } from 'pdf-lib';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
const ActivityContent: React.FC = () => {
  return (
    <div
      className="page-wrapper"
      style={{ height: '130px', borderRadius: '20px', border: '1px solid black', margin: '0px', padding: '0px' }}
    >
      <div className="back-button">
        <IconButton>
          <CancelIcon>
            <button>나가기</button>
          </CancelIcon>
        </IconButton>
      </div>

      <div className="heart-button">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* <button>찜하기</button> */}
      </div>
      <div className="container-box" style={{ display: 'inline-flex' }}>
        <div className="photo-box">
          <img
            src="/test/owner1.png"
            style={{ width: '120px', height: '100%', display: 'inline-block', borderRadius: '20px 0px 0px 20px' }}
            alt="House"
          />
        </div>
        <div className="detail-box" style={{ padding: '5px' }}>
          <p>위치 (관악구 신림동)</p>
          <p>집주인(김옥순 어르신의 집)</p>
          <p>4월 1일~6일</p>
          <p>$86 /박</p>
          <div className="star-icon">
            <p>
              <StarIcon>별표</StarIcon>
              4.89
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityContent;
