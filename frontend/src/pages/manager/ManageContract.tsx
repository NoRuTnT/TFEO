import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getContractDetail } from '../../api/ManagerApis';
import { IContractInfo } from '../../interfaces/ContractInterface';
import ContractAppliedContent from '../../components/contract/ContractAppliedContent';
import ContractInProgressContent from '../../components/contract/ContractInProgressContent';
import ContractCompletedContent from '../../components/contract/ContractCompletedContent';
import Footer from '../../components/footer/Footer';
import ContractProgressBar from '../../components/contract/ContractProgressBar';
import ContractHomeCard from '../../components/contract/ContractHomeCard';
const ManageContract = () => {
  const location = useLocation();
  const contractNoString = new URLSearchParams(location.search).get('contractNo');
  const contractNo = contractNoString ? parseInt(contractNoString, 10) : null;
  const [contractInfo, setContractInfo] = useState<IContractInfo>();
  useEffect(() => {
    const fetchData = async () => {
      if (!contractNo) return;
      const response = await getContractDetail(contractNo);
      setContractInfo(response);
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
            role={'MANAGER'}
          />
        );
      case 'IN_PROGRESS':
        console.log('in-progress');
        return (
          <ContractInProgressContent
            homeDetail={contractInfo.home}
            contract={contractInfo.contract}
            member={contractInfo.member}
            role="MANAGER"
          />
        );
      case 'DONE':
        console.log('completed');
        return <ContractCompletedContent contractNo={contractInfo.contract.contractNo} role="MANAGER" />;
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
export default ManageContract;
