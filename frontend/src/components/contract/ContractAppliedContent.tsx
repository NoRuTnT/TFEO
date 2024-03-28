import React from 'react';
import '../../styles/contract/ContractAppliedContent.css';
import { cancelApply } from '../../api/ContractApis';
interface Props {
  homeNo: number;
}
const ContractAppliedContent = ({ homeNo }: Props) => {
  const removeApplication = async () => {
    const response = await cancelApply(homeNo);
    if (response) window.location.reload();
  };
  return (
    <div className="contractContent">
      <div className="authentication">담당자의 승인을 기다려주세요</div>
      <div className="contractBtn">
        <button onClick={removeApplication}>신청 취소</button>
      </div>
    </div>
  );
};
export default ContractAppliedContent;
