import React, { useEffect, useState } from 'react';
import { applyApproval, createForm } from '../../api/ContractApis';
import { IContractForm } from '../../interfaces/ContractFormInterface';
import { pdf } from '@react-pdf/renderer';
import { createContractPdf } from '../../utils/createContractPdfUtils';
import { S3UploadProps } from '../../interfaces/S3Interface';
import { uploadFileToS3 } from '../../api/S3Apis';
import { IContractInfo } from '../../interfaces/ContractInterface';
const ContractApplyButton = () => {
  const [contractFormData, setContractFormData] = useState<IContractForm>();
  const applyApprove = async () => {
    const fetchData = await applyApproval(1, 1);
    setContractFormData(fetchData);
  };
  const generateBlobFromPdf = async () => {
    if (!contractFormData) return;
    console.log(contractFormData);
    const blobPdf = await pdf(createContractPdf(contractFormData)).toBlob();
    const preSignedUrlToUpload = await createForm(1);
    console.log(preSignedUrlToUpload);
    if (typeof preSignedUrlToUpload !== 'string') return;
    const S3UploadProps: S3UploadProps = {
      uploadFile: blobPdf,
      preSignedUrlToUpload: preSignedUrlToUpload,
    };
    const response = await uploadFileToS3(S3UploadProps);
  };
  useEffect(() => {
    const blobPdf = generateBlobFromPdf();
    if (!(blobPdf instanceof Blob)) return;
  }, [contractFormData]);
  return (
    <>
      <div>학생 정보 대충 나열</div>
      <button onClick={applyApprove}>승인하기</button>
    </>
  );
};
export default ContractApplyButton;
