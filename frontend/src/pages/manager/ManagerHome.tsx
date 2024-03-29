import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MainPage.css';
import '../../styles/home/HomeDetail.css';
import '../../styles/manager/ManagerHome.css';

import { radians } from 'pdf-lib';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AddHomeIcon from '@mui/icons-material/AddHome';

// 관리자 - 학생 정보 관리
const ActivityContent: React.FC = () => {
  return (
    <div className="page-wrapper" style={{ border: '1px solid black', margin: '0px', padding: '0px' }}>
      <div
        className="page-header"
        style={{ height: '100px', backgroundColor: 'pink', textAlign: 'center', fontSize: '20px' }}
      >
        <h1>스물다섯 여든하나</h1>
        <h1>관리자 페이지</h1>
      </div>
      <div className="status-container" style={{ height: '200px', textAlign: 'center' }}>
        <p>2024.03.25</p>
        <div className="status-box" style={{ borderRadius: '20px', backgroundColor: '#EEEEEE', height: '80%' }}>
          <div className="status-info">
            <div style={{ textAlign: 'center' }}>
              <p>전체 학생</p>
              <p>100건</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p>전체 학생</p>
              <p>100건</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p>전체 학생</p>
              <p>100건</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p>전체 학생</p>
              <p>100건</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="list-info" style={{ height: '300px' }}>
        <ul>
          <li>
            <div className="list-component">
              <ManageAccountsIcon className="icon"></ManageAccountsIcon>신규 등록 학생 10건
            </div>
          </li>
          <li>
            <div className="list-component">
              <VolunteerActivismIcon className="icon"></VolunteerActivismIcon>신규 집 등록 10건
            </div>
          </li>
          <li>
            <div className="list-component">
              <Diversity1Icon className="icon"></Diversity1Icon>올리 사랑 인증 10건
            </div>
          </li>
          <li>
            <div className="list-component">
              <AddHomeIcon className="icon"></AddHomeIcon>계약 승인 대기 10건
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityContent;
