import React, { useEffect, useState } from 'react';
import { IHomeDetail, IHome } from '../../interfaces/HomeInterface';
import { Card, CardContent, CardMedia } from '@mui/material';
import { getRoadNameAddress, getEMDNameAddress } from '../../utils/addressUtils';
import { IAddress } from '../../interfaces/AddressInterface';
import home from '../../pages/Home';
import { getRent } from '../../utils/moneyUtils';
import { getDay, getMonth, getYear } from '../../utils/timeUtils';
import { IContract } from '../../interfaces/ContractInterface';
import '../../styles/ContractCard.css';

interface Props {
  status: string;
  homeDetail: IHomeDetail;
  contract: IContract;
}
const ContractHomeCard = ({ status, homeDetail, contract }: Props) => {
  const { home, homeOption, hostPersonality } = homeDetail;
  return (
    <div className="homeCard">
      <h2>계약 중인 집 카드</h2>
      <Card>
        <CardMedia component="img" image="/assets/mainLogo.png" />
        <CardContent className="cardContent">
          <div>{status === 'completed' ? '태그보여줘야함' : ''}</div>
          <div>{status === 'applied' ? getEMDNameAddress(home.address) : getRoadNameAddress(home.address)}</div>
          <div>
            {home.hostName} {home.hostGender === 'M' ? '할아버지' : '할머니'}
          </div>
          <div>월 {getRent(home.rent)}만원</div>
          <div>
            기간: {getYear(contract.startAt)}년 {getMonth(contract.startAt)}월 {getDay(contract.startAt)}일 ~{' '}
            {getYear(contract.expiredAt)}년 {getMonth(contract.expiredAt)}월 {getDay(contract.expiredAt)}일
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ContractHomeCard;
