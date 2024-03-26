import React, { useEffect, useState } from 'react';
import ContractProgressBar from '../components/contract/ContractProgressBar';
import Footer from '../components/footer/Footer';
import ContractHomeCard from '../components/contract/ContractHomeCard';
import ContractCompletedContent from '../components/contract/ContractCompletedContent';
import ContractAppliedContent from '../components/contract/ContractAppliedContent';
import ContractInProgressContent from '../components/contract/ContractInProgressContent';
import { IHome, IHomeDetail, IHomeOption, IHostPersonality } from '../interfaces/HomeInterface';
import '../styles/contract/Contract.css';
import { IContract } from '../interfaces/ContractInterface';
import { IAddress } from '../interfaces/AddressInterface';

const Contract = () => {
  const [status, setStatus] = useState<string>('applied');
  const [homeDetail, setHomeDetail] = useState<IHomeDetail>({
    home: {
      homeNo: 1,
      address: {
        si: '서울특별시',
        emd: '흑석동',
        sgg: '동작구',
        ro: '흑석3로',
        detail: 'oo아파트 302동',
      },
      guardianName: '',
      guardianPhone: '',
      hostAccountNo: '',
      hostAge: 64,
      hostBank: '',
      hostGender: 'M',
      hostPhone: '',
      hostName: '김복순',
      hostRegisterNo: '',
      lat: 36,
      lng: 44,
      introduce: '안녕로봇',
      rent: 200000,
      maintenanceFee: 40000,
      noneRegisterMember: false,
      relation: '자녀',
    },
    homeOption: {
      airConditioner: false,
      breakfast: false,
      gas: false,
      elevator: false,
      heating: false,
      internet: false,
      microwave: false,
      moveInDate: false,
      parking: false,
      sink: false,
      refrigerator: false,
      station: false,
      toilet: false,
      type: '',
      washingMachine: false,
    },
    hostPersonality: {
      clean: false,
      cold: false,
      daytime: false,
      hot: false,
      extrovert: false,
      introvert: false,
      pet: false,
      nighttime: false,
      noTouch: false,
      smoke: false,
    },
    homeImageList: [],
    hostImageList: [],
  });
  const [contract, setContract] = useState<IContract>({
    contractNo: 1,
    contractUrl: 'asdf.url',
    expiredAt: '2024-09-21',
    hostSign: false,
    studentSign: false,
    progress: 'applied',
    startAt: '2024-03-22',
  });
  const setApplied = () => {
    setStatus('applied');
  };
  const setInProgress = () => {
    setStatus('in-progress');
  };
  const setCompleted = () => {
    setStatus('completed');
  };
  const renderByStatus = (status: string) => {
    switch (status) {
      case 'applied':
        console.log('applied');
        return <ContractAppliedContent />;
      case 'in-progress':
        console.log('in-progress');
        return <ContractInProgressContent />;
      case 'completed':
        console.log('completed');
        return <ContractCompletedContent />;
    }
  };
  return (
    <div className="contract">
      <ContractProgressBar status={status} />
      <ContractHomeCard status={status} homeDetail={homeDetail} contract={contract} />
      {renderByStatus(status)}
      <button onClick={setApplied}>applied</button>
      <button onClick={setInProgress}>inProgress</button>
      <button onClick={setCompleted}>completed</button>
      <hr />
      <Footer />
    </div>
  );
};
export default Contract;
