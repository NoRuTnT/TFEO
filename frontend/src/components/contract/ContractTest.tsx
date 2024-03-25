import React, { useEffect, useState } from 'react';
import { applyApproval, createForm } from '../../api/ContractApis';
import { IContractForm } from '../../interfaces/ContractFormInterface';
import { pdf } from '@react-pdf/renderer';
import { createContractPdf } from '../../utils/createContractPdfUtils';
import { S3UploadProps } from '../../interfaces/S3Interface';
import { uploadPdfToS3 } from '../../api/S3Apis';
const ContractTest = () => {
  const [contractFormData, setContractFormData] = useState<IContractForm>();
  const approveApiTest = async () => {
    setContractFormData(await applyApproval(1, 1));
  };
  const generateBlobFromPdf = async () => {
    if (!contractFormData) return;
    const blobPdf = await pdf(createContractPdf(contractFormData)).toBlob();
    const preSignedUrlToUpload = await createForm(1);
    if (typeof preSignedUrlToUpload !== 'string') return;
    const S3UploadProps: S3UploadProps = {
      uploadFile: blobPdf,
      preSignedUrlToUpload: preSignedUrlToUpload,
    };
    const response = await uploadPdfToS3(S3UploadProps);
  };
  useEffect(() => {
    const blobPdf = generateBlobFromPdf();
    if (!(blobPdf instanceof Blob)) return;
  }, [contractFormData]);
  return (
    <>
      <button onClick={approveApiTest}>승인 요청하기</button>
    </>
  );
};
export default ContractTest;
