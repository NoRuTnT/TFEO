import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { styled, useTheme } from '@mui/material/styles';

const ManagerFooter: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  // 현재 경로에 따라 색상 변경을 위한 로직
  const getIconColor = (path: string) => {
    return location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText;
  };

  // 현재 경로에 따른 텍스트 색상 결정
  const getTextStyle = (path: string) => ({
    color: location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });

  const icons = {
    Home: styled(ManageAccountsIcon)({
      color: getIconColor('/manage-home'),
      fontSize: '28px',
    }),
    Heart: styled(VolunteerActivismIcon)({
      color: getIconColor('/manage-activity'),
      fontSize: '28px',
    }),
    Contract: styled(Diversity1Icon)({
      color: getIconColor('/manage-list'),
      fontSize: '28px',
    }),
    Profile: styled(AddHomeIcon)({
      color: getIconColor('/manage-student'),
      fontSize: '28px',
    }),
  };

  return (
    <footer className="footer">
      <Link to="/manage-home" className="icon-container">
        <icons.Home />
        <span className="icon-description" style={getTextStyle('/manage-home')}>
          학생관리
        </span>
      </Link>
      <Link to="/manage-activity" className="icon-container">
        <icons.Heart />
        <span className="icon-description" style={getTextStyle('/manage-activity')}>
          올리사랑
        </span>
      </Link>
      <Link to="/manage-list" className="icon-container">
        <icons.Contract />
        <span className="icon-description" style={getTextStyle('/manage-list')}>
          매칭 관리
        </span>
      </Link>
      <Link to="/manage-student" className="icon-container">
        <icons.Profile />
        <span className="icon-description" style={getTextStyle('/manage-student')}>
          집등록
        </span>
      </Link>
    </footer>
  );
};

export default ManagerFooter;
