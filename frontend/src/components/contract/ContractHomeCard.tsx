import React, { useEffect, useState } from 'react';
import { IHomeDetail, IHome } from '../../interfaces/HomeInterface';
import { Card, CardContent, CardMedia } from '@mui/material';
import { getRoadAddress } from '../../utils/addressUtils';
import { IAddress } from '../../interfaces/AddressInterface';
import home from '../../pages/Home';
import { getRent } from '../../utils/moneyUtils';
import { getDay, getMonth, getYear } from '../../utils/timeUtils';
import { IContract } from '../../interfaces/ContractInterface';
import '../../styles/contract/ContractCard.css';
import { image } from 'html2canvas/dist/types/css/types/image';

interface Props {
  status: string;
  homeDetail: IHomeDetail;
  contract: IContract;
}
const ContractHomeCard = ({ status, homeDetail, contract }: Props) => {
  const { home, homeOption, hostPersonality, homeImageList, hostImageList } = homeDetail;
  return (
    <div className="homeCard">
      <Card>
        <CardMedia
          sx={{ height: (theme) => theme.spacing(30) }}
          image={`https://j10a707.p.ssafy.io${homeImageList[0].homeImageUrl}`}
        />
        <CardContent className="cardContent">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {hostPersonality.clean ? <div className="host-filter">청결한</div> : ''}
            {hostPersonality.smoke ? '' : <div className="host-filter">비흡연</div>}
            {hostPersonality.extrovert ? '' : <div className="host-filter">관심이 많은</div>}
            {hostPersonality.introvert ? <div className="host-filter">내향적인</div> : ''}
            {hostPersonality.nighttime ? <div className="host-filter">밤에 활동하는</div> : ''}
          </div>
          <div className="address">{getRoadAddress(home.address)}</div>
          <div>
            {home.hostName} {home.hostGender === 'M' ? '할아버지' : '할머니'}
          </div>
          <div>월 {home.rent}만원</div>
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
