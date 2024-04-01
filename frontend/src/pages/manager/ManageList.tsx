import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/MainPage.css';
import '../../styles/home/HomeDetail.css';
import '../../styles/manager/ManagerHome.css';
import '../../styles/manager/ManageList.css';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import ManagerFooter from '../../components/footer/ManagerFooter';
import { appliedList, doneList, inProgressList } from '../../api/ManagerApis';
import { IContractManageList } from '../../interfaces/ContractInterface';
import { getRoadAddress } from '../../utils/addressUtils';

// 관리자 - 계약 관리 페이지
const ManageList: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('신청중');
  const [contractList, setContractList] = useState<IContractManageList[]>();
  // 현재 경로에 따른 텍스트 색상 결정 함수
  const getTextStyle = (path: string) => ({
    color: location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await appliedList();
      if (response) setContractList(response);
    };
    fetchData();
  }, []);
  // 메뉴 항목 클릭 핸들러
  const handleMenuClick = async (menu: string) => {
    setSelectedMenu(menu);
    console.log(contractList);
    if (menu === '신청중') {
      const response = await appliedList();
      if (response) setContractList(response);
      return;
    }
    if (menu === '계약중') {
      const response = await inProgressList();
      if (response) setContractList(response);
      return;
    }
    if (menu === '완료') {
      const response = await doneList();
      if (response) setContractList(response);
      return;
    }
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
        {contractList &&
          contractList.map((item, index) => (
            <div key={index} className="match-list-container">
              <div style={{ width: '90px', textAlign: 'center', marginLeft: '5px' }}>{item.hostName}</div>

              <div style={{ width: '90px', textAlign: 'center', marginLeft: '15px' }}>{item.memberName}</div>

              <div style={{ width: '180px', textAlign: 'center', marginLeft: '15px' }}>
                {getRoadAddress(item.address)}
              </div>
              <div style={{ width: '180px', textAlign: 'center', marginLeft: '15px' }}>
                <div>
                  {item.startAt} ~ {item.expiredAt}
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
