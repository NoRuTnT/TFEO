import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import '../styles/home/HomeDetail.css';
import MapDetailBox from '../components/home/MapDetailBox';
const ActivityContent: React.FC = () => {
  return (
    <div className="page-wrapper">
      {/* 뒤로 가기 버튼 */}
      <div className="back-button">
        <Link to="/">
          <button>뒤로가기</button>
        </Link>
      </div>

      <div className="heart-button">
        <button>찜하기</button>
      </div>

      {/* 사진 영역 */}
      <div
        className="photo-slider"
        style={{ width: '100%', height: '33vh', overflowX: 'scroll', whiteSpace: 'nowrap' }}
      >
        {/* 슬라이더 이미지들 */}
        <img src="/test/owner1.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />
        <img src="/test/home1.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />
        <img src="/test/home2.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />
        <img src="/test/home3.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />
        {/* 추가 이미지를 계속 넣어주면 됩니다 */}
      </div>

      {/* 집에 대한 설명 */}
      <div className="content-wrapper">
        <div className="description-container" style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>
          <p>위치(관악구 신림동),</p>
          <p>집주인(김옥순 어르신의 집)</p>
        </div>

        <div className="owner-description">집에 대한 설명이 간략하게 들어가는 부분. (방2개, 화장실 2개)</div>

        {/* 집 주인에 대한 설명 */}
        <div className="owner-description" style={{ fontSize: '20px' }}>
          <hr />
          <p>집 주인에 대한 설명이 들어가는 부분</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/test/owner3.png" alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div style={{ marginLeft: '10px' }}>
              <div>안녕하세요, ~~~ 입니다.</div>
            </div>
          </div>
          저는 ~~~ 살입니다.
          ㅁㄴㅇㄻㄴㅇㄹㅇㄴㅁㄹㄴㅁㅇㄹㅇㄴㅇㄴㅁㄴㅁㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁ
          <hr />
        </div>

        <div className="option-wrapper">
          <div className="option-left">전자레인지</div>
          <div className="option-right">에어컨</div>
        </div>
        <hr />

        <div className="mapbox">
          <MapDetailBox />
        </div>

        {/* 리뷰 영역 */}
        <div className="reviews-container">
          <div className="review-box" style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="profileImage.jpg"
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <div style={{ marginLeft: '10px' }}>
                <div>작성자</div>
                <div>작성일자</div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <p>리뷰 내용이 들어가는 부분</p>
            </div>
          </div>
          {/* 추가 리뷰를 계속 넣어주면 됩니다 */}

          <div className="review-box" style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="profileImage.jpg"
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <div style={{ marginLeft: '10px' }}>
                <div>작성자</div>
                <div>작성일자</div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <p>리뷰 내용이 들어가는 부분</p>
            </div>
          </div>

          <div className="review-box" style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="profileImage.jpg"
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <div style={{ marginLeft: '10px' }}>
                <div>작성자</div>
                <div>작성일자</div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <p>리뷰 내용이 들어가는 부분</p>
            </div>
          </div>
        </div>
      </div>
      {/* 집 신청 버튼과 찜 버튼 */}
      <div className="bottom-container">
        <div className="left-container">
          <div className="register-div">월세 : ~~~원</div>
        </div>
        <div className="register-btn">
          <button>집 신청하기</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityContent;
