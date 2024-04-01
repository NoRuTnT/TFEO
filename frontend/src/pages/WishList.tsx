import * as React from 'react';
import WishCard from '../components/wish/WishCard';
import Footer from '../components/footer/Footer';
import { useEffect, useState } from 'react';
import { IHome, IHomeDetail } from '../interfaces/HomeInterface';
import Home from '../components/home/Home';
import { getWishList } from '../api/WishApis';
import Wish from '../components/wish/Wish';

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
        <div>신청한 집이 없습니다.</div>
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
