import React from 'react';

const ContractAppliedContent = () => {
  const removeApplication = () => {
    console.log('신청 취소 요청 보내기');
  };
  return (
    <div className="contractContent">
      <div>담당자의 승인을 기다려주세요</div>
      <button onClick={removeApplication}>신청 취소</button>
    </div>
  );
};
export default ContractAppliedContent;
