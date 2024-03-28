import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/MainPage.css'; // 상대경로 수정 필요
// import '../styles/home/HomeDetail.css'; // 상대경로 수정 필요
import '../../styles/manager/ManagerHome.css';

import { radians } from 'pdf-lib';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
const ActivityContent: React.FC = () => {
  return (
    <div className="page-wrapper" style={{ border: '1px solid black', margin: '0px', padding: '0px' }}>
      <div className="page-header" style={{ height: '100px', backgroundColor: 'pink' }}>
        <h1>스물다섯 여든하나</h1>
        <h1>관리자 페이지</h1>
      </div>
      <div className="status-container">
        <div></div>
      </div>
      <div className="list-info">
        <div>
          <p>
            신규 등록 학생 <h2>10</h2>건
          </p>
        </div>
        <div>
          <p>
            신규 집 등록 <h2>10</h2>건
          </p>
        </div>
        <div>
          <p>올리 사랑 인증</p>
        </div>
        <div>
          <p>계약 승인 대기</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityContent;
