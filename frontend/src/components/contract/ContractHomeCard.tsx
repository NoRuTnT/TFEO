import React, { useEffect, useState } from 'react';
import { IHomeContractCard } from '../../interfaces/HomeInterface';
import { Card, CardContent, CardMedia } from '@mui/material';

const ContractHomeCard = () => {
  const [homeContractCard, setHomeContractCard] = useState<IHomeContractCard>();
  // 더미용
  useEffect(() => {
    setHomeContractCard({
      homeNo: 1,
      address: {
        si: '서울특별시',
        sgg: '강남구',
        emd: '역삼동',
        ro: '테헤란로 212',
        detail: '멀티캠퍼스 1501호',
      },
      hostName: '김태윤',
      rent: 200000,
      startAt: '2024-03-19',
      expiredAt: '2024-09-18',
      progress: 'applied',
      hostPersonality: {
        smoke: false,
        pet: false,
        clean: false,
        daytime: false,
        nighttime: false,
        extrovert: false,
        introvert: false,
        cold: true,
        hot: false,
        noTouch: true,
      },
      hostBank: '하나은행',
      hostAccountNo: '2345-2345-123456',
      hostImageList: ['hostImage1.url', 'hostImage2.url'],
      homeImageList: ['homeImage1.url', 'homeImage2.url', 'homeImage3.url'],
    });
  }, []);
  const show = () => {
    console.log(homeContractCard);
  };
  const getAddress = () => {
    if (!homeContractCard) return '';
    const address = homeContractCard.address;
    return address.si + ' ' + address.sgg + ' ' + address.emd;
  };
  return (
    <div className="homeCard">
      <h2>계약 중인 집 카드</h2>
      <div>status</div>
      <button onClick={show}>콘솔 찍기</button>
      <Card>
        <CardMedia component="img" image="/assets/mainLogo.png" />
        <CardContent>
          <div>{homeContractCard?.hostName}</div>
          <div>{getAddress()}</div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ContractHomeCard;
