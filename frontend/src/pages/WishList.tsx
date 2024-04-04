import * as React from 'react';
import WishCard from '../components/wish/WishCard';
import Footer from '../components/footer/Footer';
import { useEffect, useState } from 'react';
import { IHome, IHomeDetail } from '../interfaces/HomeInterface';
import Home from '../components/home/Home';
import { getWishList } from '../api/WishApis';
import Wish from '../components/wish/Wish';
import FavoriteIcon from '@mui/icons-material/Favorite';
const WishList: React.FC = () => {
  const [homeList, setHomeList] = useState<IHomeDetail[]>();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getWishList();
      if (response) setHomeList(response);
    };
    fetchData();
  }, []);
  if (!homeList || homeList.length < 1)
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '120px', height: '120px' }}>
            <FavoriteIcon style={{ color: 'darkgrey', width: '100%', height: '100%' }} />
          </div>
          <div style={{ fontWeight: 'bold', marginTop: '5px', fontSize: '22px', color: 'darkgrey' }}>
            아직 찜한 집이 없어요.
          </div>
          <div style={{ marginTop: '10px', fontSize: '18px', color: 'darkgrey' }}>함께 하고 싶은</div>
          <div style={{ fontSize: '18px', color: 'darkgrey' }}>인생 선배를 찾아보세요.</div>
        </div>
        <Footer />
      </>
    );
  return (
    <div className="main-page">
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}> 위시리스트</div>
      {homeList.map((home, index) => (
        <Wish key={index} settings={settings} home={home} />
      ))}
      <Footer />
    </div>
  );
};

export default WishList;
