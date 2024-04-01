import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MainPage.css';
import '../../styles/home/HomeDetail.css';
import '../../styles/manager/ManagerHome.css';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AddHomeIcon from '@mui/icons-material/AddHome';

// 관리자 - 학생 정보 관리

const ActivityContent: React.FC = () => {
  return (
    <div style={{ height: '100vh' }}>
      <div
        style={{
          height: '80px',
          backgroundColor: '#E07068',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '20px',
          color: 'white',
        }}
      >
        스물다섯 여든하나
        <br />
        관리자 홈
      </div>
      <div
        className="status-container"
        style={{
          height: '300px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="status-box"
          style={{
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#EEEEEE',
            width: '90%',
            height: '90%',
          }}
        >
          <p style={{ color: 'gray' }}>2024.03.25</p>
          <div className="status-info">
            <div className="status-content">
              <div className="status-title">전체 학생</div>
              <div style={{ color: '#e07068', fontSize: '35px', fontWeight: 'bold', display: 'flex' }}>
                100
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: 'normal',
                    color: 'black',
                    marginLeft: '5px',
                    marginTop: '15px',
                  }}
                >
                  건
                </p>
              </div>
            </div>
            <div className="status-content">
              <div className="status-title">올리사랑 인증</div>
              <div style={{ color: '#e07068', fontSize: '35px', fontWeight: 'bold', display: 'flex' }}>
                100
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: 'normal',
                    color: 'black',
                    marginLeft: '5px',
                    marginTop: '15px',
                  }}
                >
                  건
                </p>
              </div>
            </div>
            <div className="status-content">
              <div className="status-title">전체 매칭 수</div>
              <div style={{ color: '#e07068', fontSize: '35px', fontWeight: 'bold', display: 'flex' }}>
                100
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: 'normal',
                    color: 'black',
                    marginLeft: '5px',
                    marginTop: '15px',
                  }}
                >
                  건
                </p>
              </div>
            </div>
            <div className="status-content">
              <div className="status-title">전체 집</div>
              <div style={{ color: '#e07068', fontSize: '35px', fontWeight: 'bold', display: 'flex' }}>
                100
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: 'normal',
                    color: 'black',
                    marginLeft: '5px',
                    marginTop: '15px',
                  }}
                >
                  건
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ margin: '0 auto', width: '90%' }} />
      <div className="manager-list-container">
        <div className="list-component">
          <ManageAccountsIcon style={{ fontSize: '50px', color: '#b7b7b7' }} className="icon"></ManageAccountsIcon>
          <div className="new-list">신규 등록 학생</div>
          <div className="new-count"> 10</div>
          <div style={{ fontSize: '22px' }}>건</div>
        </div>

        <div className="list-component">
          <Diversity1Icon style={{ fontSize: '50px', color: '#b7b7b7' }} className="icon"></Diversity1Icon>
          <div className="new-list">올리 사랑 인증</div>
          <div className="new-count"> 10</div>
          <div style={{ fontSize: '22px' }}>건</div>
        </div>

        <div className="list-component">
          <AddHomeIcon style={{ fontSize: '50px', color: '#b7b7b7' }} className="icon"></AddHomeIcon>
          <div className="new-list">계약 승인 대기</div>
          <div className="new-count"> 10</div>
          <div style={{ fontSize: '22px' }}>건</div>
        </div>

        <div className="list-component">
          <VolunteerActivismIcon
            style={{ fontSize: '50px', color: '#b7b7b7' }}
            className="icon"
          ></VolunteerActivismIcon>
          <div className="new-list">신규 집 등록</div>
          <div className="new-count"> 10</div>
          <div style={{ fontSize: '22px' }}>건</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityContent;
