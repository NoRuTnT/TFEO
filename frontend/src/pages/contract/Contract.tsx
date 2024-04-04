import React, { useEffect, useState } from 'react';
import ContractProgressBar from '../../components/contract/ContractProgressBar';
import Footer from '../../components/footer/Footer';
import ContractHomeCard from '../../components/contract/ContractHomeCard';
import ContractCompletedContent from '../../components/contract/ContractCompletedContent';
import ContractAppliedContent from '../../components/contract/ContractAppliedContent';
import ContractInProgressContent from '../../components/contract/ContractInProgressContent';
import { useLocation } from 'react-router-dom';
import { IHome, IHomeDetail, IHomeOption, IHostPersonality } from '../../interfaces/HomeInterface';
import '../../styles/contract/Contract.css';
import { IContract, IContractInfo } from '../../interfaces/ContractInterface';
import { IAddress } from '../../interfaces/AddressInterface';
import { customAxios } from '../../api/customAxios';
import { getMemberContract } from '../../api/ContractApis';
import { getMemberDetail } from '../../api/MemberApis';
import HomeIcon from '@mui/icons-material/Home';

const Contract = () => {
  const [contractInfo, setContractInfo] = useState<IContractInfo>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMemberContract();
      if (!result) return;
      setContractInfo(result);
    };
    fetchData();
  }, []);
  const renderByStatus = (status: string) => {
    if (!contractInfo) return;
    switch (status) {
      case 'APPLIED':
        console.log('applied');
        return (
          <ContractAppliedContent
            homeNo={contractInfo.home.home.homeNo}
            memberNo={contractInfo.member.memberNo}
            role="USER"
          />
        );
      case 'IN_PROGRESS':
        console.log('in-progress');
        return (
          <ContractInProgressContent
            homeDetail={contractInfo.home}
            contract={contractInfo.contract}
            member={contractInfo.member}
            role="USER"
          />
        );
      case 'DONE':
        console.log('completed');
        return (
          <ContractCompletedContent
            contractNo={contractInfo.contract.contractNo}
            role="USER"
            homeNo={contractInfo.home.home.homeNo}
            memberNo={contractInfo.member.memberNo}
          />
        );
    }
  };
  if (!contractInfo) {
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
            <HomeIcon style={{ color: 'darkgrey', width: '100%', height: '100%' }} />
          </div>
          <div style={{ fontWeight: 'bold', marginTop: '5px', fontSize: '22px', color: 'darkgrey' }}>
            아직 신청한 집이 없어요.
          </div>
          <div style={{ marginTop: '10px', fontSize: '18px', color: 'darkgrey' }}>함께 하고 싶은</div>
          <div style={{ fontSize: '18px', color: 'darkgrey' }}>인생 선배를 찾아보세요.</div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <div className="contract">
        <ContractProgressBar status={contractInfo.contract.progress} />
        <ContractHomeCard
          status={contractInfo.contract.progress}
          homeDetail={contractInfo.home}
          contract={contractInfo.contract}
        />
        {renderByStatus(contractInfo.contract.progress)}
        <hr />
        <Footer />
      </div>
    );
  }
};
export default Contract;
