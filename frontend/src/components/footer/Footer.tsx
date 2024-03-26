import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled, useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
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
    Home: styled(HomeIcon)({
      color: getIconColor('/'),
      fontSize: '28px',
    }),
    Heart: styled(FavoriteIcon)({
      color: getIconColor('/wish-list'),
      fontSize: '28px',
    }),
    Contract: styled(ContentPasteIcon)({
      color: getIconColor('/contract'),
      fontSize: '28px',
    }),
    Profile: styled(AccountCircleIcon)({
      color: getIconColor('/my-info'),
      fontSize: '28px',
    }),
  };

  return (
    <footer className="footer">
      <Link to="/" className="icon-container">
        <icons.Home />
        <span className="icon-description" style={getTextStyle('/')}>
          홈
        </span>
      </Link>
      <Link to="/wish-list" className="icon-container">
        <icons.Heart />
        <span className="icon-description" style={getTextStyle('/wish-list')}>
          위시리스트
        </span>
      </Link>
      <Link to="/contract" className="icon-container">
        <icons.Contract />
        <span className="icon-description" style={getTextStyle('/contract')}>
          계약
        </span>
      </Link>
      <Link to="/my-info" className="icon-container">
        <icons.Profile />
        <span className="icon-description" style={getTextStyle('/my-info')}>
          내 정보
        </span>
      </Link>
    </footer>
  );
};

export default Footer;
