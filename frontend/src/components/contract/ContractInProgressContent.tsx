import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/contract/ContractInProgressContent.css';
const ContractInProgressContent = () => {
  return (
    <>
      <div className="signStatusContainer">
        <div className="signStatus">
          내 서명 여부
          <button className="statusBtn">미완</button>
        </div>
        <div className="signStatus">
          집주인 서명 여부
          <button className="statusBtn">완료</button>
        </div>
      </div>
      <Link to="/contract-form">
        <div className="contractDiv">계약서 서명하기</div>
      </Link>
      <div className="contractDiv background">계약 취소</div>
    </>
  );
};
export default ContractInProgressContent;
