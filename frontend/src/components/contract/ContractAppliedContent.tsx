import React, { useEffect, useState } from 'react';
import '../../styles/contract/ContractAppliedContent.css';
import { applyApproval, cancelApply, createForm } from '../../api/ContractApis';
import { IContractForm } from '../../interfaces/ContractFormInterface';
import { pdf } from '@react-pdf/renderer';
import { createContractPdf } from '../../utils/createContractPdfUtils';
import { uploadFileToS3 } from '../../api/S3Apis';
interface Props {
  homeNo: number;
  memberNo: number;
  role: string;
}
const ContractAppliedContent = ({ homeNo, memberNo, role }: Props) => {
  const [contractFormData, setContractFormData] = useState<IContractForm>();
  const removeApplication = async () => {
    const response = await cancelApply(homeNo);
    if (response) window.location.reload();
  };
  const applyApprove = async () => {
    const fetchData = await applyApproval(homeNo, memberNo);
    setContractFormData(fetchData);
  };
  const generateBlobFromPdf = async () => {
    if (!contractFormData) return;
    console.log(contractFormData);
    const blobPdf = await pdf(createContractPdf(contractFormData)).toBlob();
    if (!blobPdf) {
      alert('계약서가 생성되지 않았습니다.');
      return;
    }
    const preSignedUrlToUpload = await createForm(contractFormData.contract.contractNo);
    console.log(preSignedUrlToUpload);
    if (typeof preSignedUrlToUpload !== 'string') return;
    const S3UploadProps = {
      uploadFile: blobPdf,
      preSignedUrlToUpload: preSignedUrlToUpload,
    };
    const response = await uploadFileToS3(S3UploadProps);
    alert('승인이 완료되었습니다.');
    window.location.reload();
  };
  useEffect(() => {
    generateBlobFromPdf();
  }, [contractFormData]);
  return (
    <>
      {role == 'USER' && (
        <div className="contractContent">
          <div className="authentication">담당자의 승인을 기다려주세요</div>
          <div className="contractBtn">
            <button onClick={removeApplication}>신청 취소</button>
          </div>
        </div>
      )}
      {role == 'MANAGER' && (
        <div className="contractContent">
          <div className="authentication">집 신청을 승인하시겠습니까?</div>
          <div className="contractBtn">
            <button onClick={applyApprove}>승인 완료</button>
          </div>
        </div>
      )}
    </>
  );
};
export default ContractAppliedContent;
