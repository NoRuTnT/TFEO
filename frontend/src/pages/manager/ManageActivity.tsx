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

import HomeIcon from '@mui/icons-material/Home';
import { flexbox } from '@mui/system';

import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled, useTheme } from '@mui/material/styles';

// import Footer from '../components/footer/Footer';
import ManagerFooter from '../../components/footer/ManagerFooter';

// 관리자 - 활동 관리
const ActivityContent: React.FC = () => {
  const theme = useTheme();

  // 현재 경로에 따른 텍스트 색상 결정
  const getTextStyle = (path: string) => ({
    color: location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });

  return (
    <div className="page-wrapper" style={{ margin: '0px', padding: '0px' }}>
      <div className="header" style={{ height: '150px' }}>
        <HomeIcon></HomeIcon>인증 활동 관리
        <header className="select">
          <select name="year" id="">
            <option value="">2014</option>
            <option value="">2015</option>
            <option value="">2016</option>
            <option value="">2017</option>
            <option value="">2018</option>
            <option value="">2019</option>
          </select>
          <select name="month" id="">
            <option value="">1월</option>
            <option value="">2월</option>
            <option value="">3월</option>
            <option value="">4월</option>
            <option value="">5월</option>
            <option value="">6월</option>
            <option value="">7월</option>
            <option value="">8월</option>
            <option value="">9월</option>
            <option value="">10월</option>
            <option value="">11월</option>
            <option value="">12월</option>
          </select>
        </header>
        <div className="menu" style={{ display: 'flexbox' }}>
          <span>승인</span>
          <span>제출</span>
          <span>미제출</span>
        </div>
      </div>
      <div className="main">
        <hr />
        <span>사진</span>
        <span>나래벗</span>
        <span>기간</span>
        <hr />
        <ul>
          <li>
            <div>
              김어른
              <hr />
            </div>
          </li>
          <li>
            <div>
              김어른
              <hr />
            </div>
          </li>
          <li>
            <div>
              김어른
              <hr />
            </div>
          </li>
          <li>
            <div>
              김어른
              <hr />
            </div>
          </li>
        </ul>
      </div>
      <ManagerFooter />
    </div>
  );
};

export default ActivityContent;
