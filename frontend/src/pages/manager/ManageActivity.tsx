import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/MainPage.css';
import '../../styles/home/HomeDetail.css';
import '../../styles/manager/ManagerHome.css';
import '../../styles/manager/ManageActivity.css';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import ManagerFooter from '../../components/footer/ManagerFooter';

// 관리자 - 활동 관리 페이지
const ManageActivity: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('승인');

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
    { img: '/test/home1.png', subtitle: ['박중현', '김태윤'], timestamp: ['3월 3주차', '2024.03.25'] },
    { img: '/test/home2.png', subtitle: ['이하은', '이민지'], timestamp: ['3월 4주차', '2024.04.25'] },
    { img: '/test/home3.png', subtitle: ['서해광', '문준형'], timestamp: ['4월 1주차', '2024.05.25'] },

    // ... add more items as needed
  ];

  return (
    <div>
      <header className="student-header">
        <Link to="/manager-home" className="home-button">
          <HomeIcon style={{ color: 'white', fontSize: '30px' }} />
        </Link>
        <h1 style={{ margin: 'auto', color: 'white', fontSize: '22px' }}>올리사랑 관리</h1>
      </header>
      <div className="select">
        <select name="year" id="">
          <option value="">2022년</option>
          <option value="">2023년</option>
          <option value="">2024년</option>
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
      </div>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          fontSize: '20px',
          margin: '20px',
        }}
      >
        <span style={menuStyle('승인')} onClick={() => handleMenuClick('승인')}>
          승인
        </span>
        <span style={menuStyle('제출')} onClick={() => handleMenuClick('제출')}>
          제출
        </span>
        <span style={menuStyle('미제출')} onClick={() => handleMenuClick('미제출')}>
          미제출
        </span>
      </div>
      <hr style={{ width: '90%', color: 'black', margin: 'auto', borderWidth: '2px', marginBottom: '10px' }} />
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          fontSize: '17px',
          width: '80%',
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <p style={{ width: '25%' }}>사진</p>
        <p style={{ width: '45%' }}>나래벗</p>
        <p style={{ width: '20%' }}>기간</p>
      </div>
      <div className="activity-list-container">
        {listItems.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-img">
              <img src={item.img} alt="이미지 로딩 실패" />
            </div>
            <div className="item-subtitle">
              <div>{item.subtitle[0]}</div>
              <div>{item.subtitle[1]}</div>
            </div>
            <div className="item-timestamp">
              <div
                style={{
                  width: '80%',
                  height: '30px',
                  textAlign: 'center',
                  borderRadius: '5px',
                  backgroundColor: '#f9eae1',
                  fontWeight: 'bold',
                  paddingTop: '4px',
                  fontSize: '14px',
                }}
              >
                {item.timestamp[0]}
              </div>
              <div>{item.timestamp[1]}</div>
            </div>
          </div>
        ))}
      </div>
      <ManagerFooter />
    </div>
  );
};

export default ManageActivity;
