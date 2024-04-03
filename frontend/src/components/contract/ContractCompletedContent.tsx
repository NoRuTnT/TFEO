import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/contract/ContractCompletedContent.css';
import { getContractFormPreSignedUrl } from '../../api/ContractApis';
import { getFileFromS3 } from '../../api/S3Apis';
import { showFile } from '../../utils/showPdfUtils';
interface Props {
  contractNo: number;
  homeNo: number;
  memberNo: number;
  role: string;
}
const ContractCompletedContent = ({ contractNo, homeNo, memberNo, role }: Props) => {
  const seeContract = async () => {
    const url = await getContractFormPreSignedUrl(contractNo);
    if (!url) {
      alert('확인할 수 있는 계약서가 없습니다.');
      return;
    }
    const response = await getFileFromS3(url);
    if (!response) {
      alert('파일 다운로드 에러: 다시 한번 요청해주세요');
      return;
    }
    showFile(response);
  };
  return (
    <div className="contractContent">
      <button className="selectBtn" onClick={seeContract}>
        계약서 다운로드
      </button>
      {role === 'USER' && (
        <>
          <button className="selectBtn">
            <Link to={{ pathname: '/activity-certification', search: `?memberNo=${memberNo}` }}>활동 내역</Link>
          </button>
          <button className="selectBtn">
            <Link to={{ pathname: '/activity-review', search: `?homeNo=${homeNo}` }}>리뷰 쓰기</Link>
          </button>
        </>
      )}
    </div>
  );
};
export default ContractCompletedContent;
