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
          />
        );
    }
  };
  if (!contractInfo) {
    return (
      <>
        <div>신청한 집이 없습니다.</div>
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
