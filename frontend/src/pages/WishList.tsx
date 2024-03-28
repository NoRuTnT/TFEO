import * as React from 'react';
import WishCard from '../components/wish/WishCard';

const WishList: React.FC = () => {
  return (
    <div className="main-page">
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}> 위시리스트</div>
      <WishCard />
    </div>
  );
};

export default WishList;
