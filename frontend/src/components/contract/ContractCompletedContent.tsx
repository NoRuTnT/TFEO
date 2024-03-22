import React from 'react';
import { Link } from 'react-router-dom';

const ContractCompletedContent = () => {
  const seeContract = () => {
    console.log('계약서 보기 api 요청');
  };
  const writeReview = () => {
    console.log('리뷰 쓰기로 라우터 걸기');
  };
  return (
    <div className="contractContent">
      <button onClick={seeContract}>계약서 보기</button>
      <button>
        <Link to="/activity-certification">활동 내역</Link>
      </button>
      <button onClick={writeReview}>리뷰 쓰기</button>
    </div>
  );
};
export default ContractCompletedContent;
