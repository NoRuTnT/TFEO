import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/contract/ContractInProgressContent.css';
import { IHome, IHomeDetail } from '../../interfaces/HomeInterface';
import { IContract } from '../../interfaces/ContractInterface';
import { IMember } from '../../interfaces/MemberInterface';
import { customAxios } from '../../api/customAxios';
import { ISuccessResponse } from '../../interfaces/SuccessResponseInterface';
interface Props {
  homeDetail: IHomeDetail;
  contract: IContract;
  member: IMember;
  role: string;
}

const ContractInProgressContent = ({ homeDetail, contract, member, role }: Props) => {
  const contractCompletion = async () => {
    try {
      const response = await customAxios.put<ISuccessResponse>(`/api/contracts/completion/${contract.contractNo}`);
      alert('계약이 완료되었습니다');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const contractCancel = async () => {
    try {
      const response = await customAxios.delete<ISuccessResponse>(`/api/contracts/delete/${contract.contractNo}`);
      alert('계약이 취소되었습니다.');
      if (role === 'USER') window.location.href = '/home';
      else window.location.href = '/manage-list';
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="signStatusContainer">
        <div className="signStatus">
          {role === 'USER' ? '내 서명 여부' : '학생 서명 여부'}
          <button className="statusBtn">{contract.studentSign ? '완료' : '미완'}</button>
        </div>
        <div className="signStatus">
          집주인 서명 여부
          <button className="statusBtn">{contract.hostSign ? '완료' : '미완'}</button>
        </div>
      </div>
      {((role === 'USER' && !contract.studentSign) || (role === 'MANAGER' && !contract.hostSign)) && (
        <Link to={'/contract-form'} state={{ home: homeDetail.home, contract: contract, member: member, role: role }}>
          <div className="contractDiv">계약서 서명하기</div>
        </Link>
      )}
      {role === 'USER' && contract.studentSign && <div className="contractDiv">계약 완료 대기중</div>}
      {role === 'MANAGER' && contract.studentSign && contract.hostSign && (
        <div className="contractDiv" onClick={contractCompletion}>
          계약 완료
        </div>
      )}
      {((role === 'USER' && !contract.studentSign) || (role === 'MANAGER' && !contract.hostSign)) && (
        <div className="contractDiv background" onClick={contractCancel}>
          계약 취소
        </div>
      )}
      <br />
      <br />
    </>
  );
};
export default ContractInProgressContent;
