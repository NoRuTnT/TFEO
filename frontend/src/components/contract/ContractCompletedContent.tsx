import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/contract/ContractCompletedContent.css';

const ContractCompletedContent = () => {
  const seeContract = () => {
    console.log('계약서 보기 api 요청');
  };
  const writeReview = () => {
    console.log('리뷰 쓰기로 라우터 걸기');
  };
  return (
    <div className="contractContent">
      <button className="selectBtn" onClick={seeContract}>
        계약서 보기
      </button>
      <button className="selectBtn">
        <Link to="/activity-certification">활동 내역</Link>
      </button>
      <button className="selectBtn" onClick={writeReview}>
        <Link to="/activity-review">리뷰 쓰기</Link>
      </button>
    </div>
  );
};
export default ContractCompletedContent;
