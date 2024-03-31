import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MainPage.css';
import '../styles/home/HomeDetail.css';
import MapDetailBox from '../components/home/MapDetailBox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IHomeDetail, IHomeImage } from '../interfaces/HomeInterface';
import { applyHomeApi, getHomeDetail } from '../api/HomeApis';
import { getEMDNameAddress } from '../utils/addressUtils';
import { getHomeOptionTags } from '../utils/homeOptionTagUtils';
import { Button } from '@mui/material';
import { getRent } from '../utils/moneyUtils';
import { getKoreanDate } from '../utils/timeUtils';
import SwipeableViews from 'react-swipeable-views';
import { addWish, removeWish } from '../api/WishApis';

const HomeDetail: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const toggleFavorite = async () => {
    if (!homeDetail) return;
    if (isFavorite) {
      const response = await removeWish(homeDetail.home.homeNo);
      setIsFavorite(!isFavorite);
    } else {
      const response = await addWish(homeDetail.home.homeNo);
      setIsFavorite(!isFavorite);
    }
  };

  const nextImage = () => {
    if (homeDetail && homeDetail.homeImageList) {
      setCurrentImageIndex((prevIndex) => (prevIndex === homeDetail.homeImageList.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevImage = () => {
    if (homeDetail && homeDetail.homeImageList) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? homeDetail.homeImageList.length - 1 : prevIndex - 1));
    }
  };

  const location = useLocation();
  const [homeDetail, setHomeDetail] = useState<IHomeDetail>();
  const [startAt, setStartAt] = useState<string>(getKoreanDate());
  useEffect(() => {
    const homeNofromUrl = new URLSearchParams(location.search).get('homeNo');
    const homeNo = homeNofromUrl ? parseInt(homeNofromUrl, 10) : null;
    const fetchData = async () => {
      if (!homeNo) return;
      const response = await getHomeDetail(homeNo);
      if (response) {
        console.log(response.homeImageList);
        setHomeDetail(response);
      }
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
      </div>
      <SwipeableViews
        style={{ zIndex: 52 }}
        enableMouseEvents
        index={currentImageIndex}
        onChangeIndex={(index: number) => setCurrentImageIndex(index)}
      >
        {homeDetail.homeImageList.map((homeImage: IHomeImage, key: number) => (
          <div key={key} style={{ width: '100%', height: '100%' }}>
            <img src={`https://j10a707.p.ssafy.io${homeImage.homeImageUrl}`} className="swipeable-image" alt="House" />
          </div>
        ))}
      </SwipeableViews>
      <div className="content-wrapper">
        <div className="detail-description">
          <p style={{ fontWeight: 'bold', fontSize: '17px' }}>{getEMDNameAddress(homeDetail.home.address)}</p>
        </div>

        <div className="owner-description" style={{ fontSize: '20px' }}>
          <hr style={{ margin: '15px 0' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`https://j10a707.p.ssafy.io${homeDetail.hostImageList[0].hostImageUrl}`}
              alt="Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <div style={{ marginLeft: '10px', fontSize: '18px' }}>
              <div>
                안녕하세요, {homeDetail.home.hostName} 입니다.
                <br />
                {homeDetail.home.hostAge}세,{homeDetail.home.hostGender === 'M' ? '할아버지' : '할머니'}
              </div>
            </div>
          </div>
          <div style={{ fontSize: '16px', marginTop: '20px' }}>{homeDetail.home.introduce}</div>
          <hr style={{ margin: '15px 0' }} />
        </div>

        <div className="option-wrapper" style={{ textAlign: 'center', display: 'inline-block' }}></div>

        <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>함께 사용해요!</div>
        {getHomeOptionTags(homeDetail.homeOption) &&
          getHomeOptionTags(homeDetail.homeOption).reduce((acc: ReactNode[], option: string, index: number) => {
            if (index % 2 === 0) {
              acc.push(
                <div className="option-wrapper" key={index}>
                  <div className="option">{option}</div>
                  {getHomeOptionTags(homeDetail.homeOption)[index + 1] && (
                    <div className="option">{getHomeOptionTags(homeDetail.homeOption)[index + 1]}</div>
                  )}
                </div>,
              );
            }
            return acc;
          }, [])}

        <hr style={{ margin: '15px 0' }} />

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
          <div className="register-div">월세 : {homeDetail.home.rent}만원</div>
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
