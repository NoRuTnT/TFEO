import React, { useEffect, useState } from 'react';
import { IHomeDetail, IHome } from '../../interfaces/HomeInterface';
import { Card, CardContent, CardMedia } from '@mui/material';
import { getRoadNameAddress, getEMDNameAddress } from '../../utils/addressUtils';
import { IAddress } from '../../interfaces/AddressInterface';
import home from '../../pages/Home';
import { getRent } from '../../utils/moneyUtils';
import { getDay, getMonth, getYear } from '../../utils/timeUtils';
import { IContract } from '../../interfaces/ContractInterface';
import '../../styles/contract/ContractCard.css';

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
        <div className="cardImg">
          <img src="/test/home1.png" />
        </div>
        <CardContent className="cardContent">
          <div>{status === 'completed' ? '태그보여줘야함' : ''}</div>
          <div className="address">
            {status === 'applied' ? getEMDNameAddress(home.address) : getRoadNameAddress(home.address)}
          </div>
          <div>
            {home.hostName} {home.hostGender === 'M' ? '할아버지' : '할머니'}
          </div>
          <div>월 {getRent(home.rent)}만원</div>
          <div>
            기간: {getYear(contract.startAt)}.{getMonth(contract.startAt)}.{getDay(contract.startAt)} ~{' '}
            {getYear(contract.expiredAt)}.{getMonth(contract.expiredAt)}.{getDay(contract.expiredAt)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ContractHomeCard;
