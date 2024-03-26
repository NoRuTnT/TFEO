import React from 'react';
import '../../styles/contract/ContractAppliedContent.css';

const ContractAppliedContent = () => {
  const removeApplication = () => {
    console.log('신청 취소 요청 보내기');
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
