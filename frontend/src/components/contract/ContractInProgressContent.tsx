import React from 'react';
import { Link } from 'react-router-dom';

const ContractInProgressContent = () => {
  return (
    <>
      <div className="contractContent">계약 진행 중</div>
      <Link to="/contract-form">
        <div>계약서 확인하기</div>
      </Link>
    </>
  );
};
export default ContractInProgressContent;
