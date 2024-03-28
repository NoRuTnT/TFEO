import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/contract/ContractInProgressContent.css';
import { IHome, IHomeDetail } from '../../interfaces/HomeInterface';
import { IContract } from '../../interfaces/ContractInterface';
import { IMember } from '../../interfaces/MemberInterface';
interface Props {
  homeDetail: IHomeDetail;
  contract: IContract;
  member: IMember;
}
interface fromProps {
  home: IHome;
  contract: IContract;
  member: IMember;
}

const ContractInProgressContent = ({ homeDetail, contract, member }: Props) => {
  return (
    <>
      <div className="signStatusContainer">
        <div className="signStatus">
          내 서명 여부
          <button className="statusBtn">{contract.studentSign ? '완료' : '미완'}</button>
        </div>
        <div className="signStatus">
          집주인 서명 여부
          <button className="statusBtn">{contract.hostSign ? '완료' : '미완'}</button>
        </div>
      </div>
      <Link to={'/contract-form'} state={{ home: homeDetail.home, contract: contract, member: member }}>
        <div className="contractDiv">계약서 서명하기</div>
      </Link>
      <div className="contractDiv background">계약 취소</div>
    </>
  );
};
export default ContractInProgressContent;
