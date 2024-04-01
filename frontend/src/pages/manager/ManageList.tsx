import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/MainPage.css';
import '../../styles/home/HomeDetail.css';
import '../../styles/manager/ManagerHome.css';
import '../../styles/manager/ManageList.css';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import ManagerFooter from '../../components/footer/ManagerFooter';

// 관리자 - 활동 관리 페이지
const ManageList: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('신청중');

  // 현재 경로에 따른 텍스트 색상 결정 함수
  const getTextStyle = (path: string) => ({
    color: location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });

  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  // 선택된 메뉴 항목에 따른 스타일
  const menuStyle = (menu: string) => ({
    fontWeight: selectedMenu === menu ? 'bold' : 'normal',
    color: selectedMenu === menu ? theme.palette.primary.main : 'black',
    borderBottom: selectedMenu === menu ? '2px solid' : 'none', // 클릭 시 밑줄 스타일 추가
    paddingBottom: selectedMenu === menu ? '3px' : '0', // 밑줄과 텍스트 사이 간격 조정
    margin: '0 15px', // 간격 조정
    cursor: 'pointer', // 마우스 오버 시 커서 변경
  });

  const listItems = [
    {
      old: '박중현',
      young: '김태윤',
      address: '서울시 역삼동 멀티캠퍼스 111',
      timestamp: ['2023.09.25', '2024.03.25'],
    },
    {
      old: '박중현',
      young: '김태윤',
      address: '서울시 역삼동 멀티캠퍼스 111',
      timestamp: ['2023.10.25', '2024.04.25'],
    },
    {
      old: '박중현',
      young: '김태윤',
      address: '서울시 역삼동 멀티캠퍼스 111',
      timestamp: ['2023.11.25', '2024.05.25'],
    },

    // ... add more items as needed
  ];
  return (
    <div>
      <header className="student-header">
        <Link to="/manager-home" className="home-button">
          <HomeIcon style={{ color: 'white', fontSize: '30px' }} />
        </Link>
        <h1 style={{ margin: 'auto', color: 'white', fontSize: '22px' }}>매칭 관리</h1>
      </header>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          fontSize: '20px',
          marginTop: '80px',
        }}
      >
        <span style={menuStyle('신청중')} onClick={() => handleMenuClick('신청중')}>
          신청중
        </span>
        <span style={menuStyle('계약중')} onClick={() => handleMenuClick('계약중')}>
          계약중
        </span>
        <span style={menuStyle('완료')} onClick={() => handleMenuClick('완료')}>
          완료
        </span>
      </div>
      <hr
        style={{
          width: '90%',
          color: 'black',
          margin: 'auto',
          borderWidth: '2px',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      />
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          fontSize: '17px',
          width: '90%',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <p style={{ width: '20%' }}>어르신</p>
        <p style={{ width: '15%' }}>학생</p>
        <p style={{ width: '40%' }}>주소</p>
        <p style={{ width: '20%' }}>기간</p>
      </div>
      <div className="match-container">
        {listItems.map((item, index) => (
          <div key={index} className="match-list-container">
            <div style={{ width: '90px', textAlign: 'center', marginLeft: '5px' }}>{item.old}</div>

            <div style={{ width: '90px', textAlign: 'center', marginLeft: '15px' }}>{item.young}</div>

            <div style={{ width: '180px', textAlign: 'center', marginLeft: '15px' }}>{item.address}</div>
            <div style={{ width: '180px', textAlign: 'center', marginLeft: '15px' }}>
              <div>
                {item.timestamp[0]} ~ {item.timestamp[1]}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ManagerFooter />
    </div>
  );
};

export default ManageList;
