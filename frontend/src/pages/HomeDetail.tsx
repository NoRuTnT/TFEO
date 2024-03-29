import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MainPage.css';
import '../styles/home/HomeDetail.css';
import MapDetailBox from '../components/home/MapDetailBox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwipeableViews from 'react-swipeable-views';
import { IHomeDetail } from '../interfaces/HomeInterface';
import { applyHomeApi, getHomeDetail } from '../api/HomeApis';
import { getEMDNameAddress } from '../utils/addressUtils';
import { getHomeOptionTags } from '../utils/homeOptionTagUtils';
import { Button } from '@mui/material';
import { getRent } from '../utils/moneyUtils';
import { getKoreanDate } from '../utils/timeUtils';

const HomeDetail: React.FC = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const images: string[] = [
        '/test/owner1.png',
        '/test/home1.png',
        '/test/home2.png',
        '/test/home3.png',
        // 추가 이미지를 계속 넣어주세요
    ];

    const options = ['배고파', '졸려', '나빼고', '다 자다니', '너무해', '그치만', '나는 잘 못하니까..'];

}
  const location = useLocation();
  const [homeDetail, setHomeDetail] = useState<IHomeDetail>();
  const [startAt, setStartAt] = useState<string>(getKoreanDate());
  useEffect(() => {
    const homeNofromUrl = new URLSearchParams(location.search).get('homeNo');
    const homeNo = homeNofromUrl ? parseInt(homeNofromUrl, 10) : null;
    const fetchData = async () => {
      if (!homeNo) return;
      const response = await getHomeDetail(homeNo);
      if (response) setHomeDetail(response);
    };
    if (homeNo) fetchData();
  }, []);
  if (!homeDetail)
    return (
      <>
        <div>요청하신 집의 정보를 찾을 수 없습니다.</div>
      </>
    );
  const applyHome = async () => {
    const response = await applyHomeApi(homeDetail.home.homeNo, startAt);
    if (response) alert(response);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setStartAt(selectedDate);
    console.log(startAt);
  };
  return (
    <div className="page-wrapper">
      <div className="top-button-container"></div>
      <Link to="/">
        <div
          style={{
            position: 'fixed',
            width: '33px',
            height: '33px',
            zIndex: '55',
            left: '0',
            margin: '20px',
            backgroundColor: 'white',
            paddingTop: '2px',
            paddingRight: '2px',
            borderRadius: '50%',
          }}
        >
          <ArrowBackIosNewIcon style={{ color: '#E07068', marginLeft: '2px' }} />
        </div>
      </Link>

      <div
        style={{
          position: 'fixed',
          width: '33px',
          height: '33px',
          zIndex: '55',
          right: '0',
          margin: '20px',
          backgroundColor: 'white',
          padding: '5px',
          borderRadius: '50%',
        }}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <FavoriteIcon style={{ color: '#E07068' }} />
        ) : (
          <FavoriteBorderIcon style={{ color: '#E07068' }} />
        )}
      {/* 뒤로 가기 버튼 */}
      <div className="back-button">
        <Link to="/">
          <Button>뒤로가기</Button>
        </Link>
      </div>

      <SwipeableViews
        style={{ zIndex: 52 }}
        enableMouseEvents
        index={currentImageIndex}
        onChangeIndex={(index: number) => setCurrentImageIndex(index)}
      >
        {images.map((image, index) => (
          <div key={index} style={{ width: '100%', height: '100%' }}>
            <img src={image} className="swipeable-image" alt="House" />
          </div>
        ))}
      </SwipeableViews>

      <div className="heart-button">
        {/*Todo: 하트 아이콘 가져오고, api 연동*/}
        <Button>찜하기</Button>
      </div>
      {/* 사진 영역 */}
      {/*Todo: MUI carousel로 고치기?*/}
      <div className="photo-slider" style={{ height: '33vh', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
        {/* 슬라이더 이미지들 */}
        {homeDetail.hostImageList.map((hostImage: string, key: number) => {
          return (
            <img
              src={hostImage}
              style={{ width: '100%', height: '100%', display: 'inline-block' }}
              alt="House"
              key={key}
            />
          );
        })}
        {homeDetail.homeImageList.map((homeImage: string, key: number) => {
          return (
            <img
              src={homeImage}
              style={{ width: '100%', height: '100%', display: 'inline-block' }}
              alt="House"
              key={key}
            />
          );
        })}
        {/*<img src="/test/owner1.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />*/}
        {/*<img src="/test/home1.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />*/}
        {/*<img src="/test/home2.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />*/}
        {/*<img src="/test/home3.png" style={{ width: '100%', height: '100%', display: 'inline-block' }} alt="House" />*/}
        {/* 추가 이미지를 계속 넣어주면 됩니다 */}
      </div>
      {/* 집에 대한 설명 */}
      <div className="content-wrapper">
        <div className="name-description-container" style={{ fontSize: '23px', fontWeight: 'bold', margin: '20px 0' }}>
            <p>{getEMDNameAddress(homeDetail.home.address)}</p>
            <p>
                {homeDetail.home.hostName} {homeDetail.home.hostGender === 'M' ? '할아버지' : '할머니'}의 집
            </p>
        </div>

        <div className="detail-description">
          <p style={{ fontWeight: 'bold', fontSize: '17px' }}>위치(관악구 신림동)</p>
          집에 대한 설명이 간략하게 들어가는 부분. (방2개, 화장실 2개)
        </div>

        {/* 집 주인에 대한 설명 */}
        <div className="owner-description" style={{ fontSize: '20px' }}>
          <hr style={{ margin: '15px 0' }} />
          {/*<p>집 주인에 대한 설명이 들어가는 부분</p>*/}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/test/owner3.png" alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div style={{ marginLeft: '10px', fontSize: '18px' }}>
              <div>
                안녕하세요, ~~~ 입니다.
                <br />
                dsfsafdsfs
              </div>
            </div>
          </div>
          <div style={{ fontSize: '16px', marginTop: '20px' }}>
            소개 또는 태그 가져오기. 저는 ~~~ 살입니다.
            ㅁㄴㅇㄻㄴㅇㄹㅇㄴㅁㄹㄴㅁㅇㄹㅇㄴㅇㄴㅁㄴㅁㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㄴㅁ
          </div>
          <hr style={{ margin: '15px 0' }} />
          <hr />
          {/*<div style={{ display: 'flex', alignItems: 'center' }}>*/}
          {/*  <img src="/test/owner3.png" alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />*/}
          {/*  <div style={{ marginLeft: '10px' }}>*/}
          {/*    <div></div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {homeDetail.home.introduce}
          <hr />
        </div>

        <div className="option-wrapper" style={{ textAlign: 'center', display: 'inline-block' }}>
          {getHomeOptionTags(homeDetail.homeOption) &&
            getHomeOptionTags(homeDetail.homeOption).map((homeOption, key) => {
              return <Button key={key}>{homeOption}</Button>;
            })}
        </div>

        <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>함께 사용해요!</div>
        {options.reduce((acc: JSX.Element[], option: string, index: number) => {
          if (index % 2 === 0) {
            acc.push(
              <div className="option-wrapper" key={index}>
                <div className="option">{option}</div>
                {options[index + 1] && <div className="option">{options[index + 1]}</div>}
              </div>,
            );
          }
          return acc;
        }, [])}

        <hr style={{ margin: '15px 0' }} />

        {/*<div className="mapbox">*/}
        {/*  <MapDetailBox lat={homeDetail.home.lat} lng={homeDetail.home.lng} />*/}
        {/*</div>*/}

        {/* 리뷰 영역 */}
        <div className="reviews-container">
          <div className="review-box" style={{ border: '1px solid black', marginTop: '10px', padding: '10px' }}>
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
          <div className="register-div">월세 : {getRent(homeDetail.home.rent)}만원</div>
        </div>
        <div className="center-container">
          <div>
            입주 일자 : <input type="date" value={startAt} onChange={onChange} />
          </div>
        </div>
        <div className="register-btn">
          <button onClick={applyHome}>집 신청하기</button>
        </div>
      </div>
    </div>
        );
        };


export default HomeDetail;
