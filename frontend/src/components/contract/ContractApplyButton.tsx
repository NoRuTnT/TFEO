import React, { useEffect, useState } from 'react';
import { applyApproval, createForm, getMemberContract } from '../../api/ContractApis';
import { IContractForm } from '../../interfaces/ContractFormInterface';
import { pdf } from '@react-pdf/renderer';
import { createContractPdf } from '../../utils/createContractPdfUtils';
import { S3UploadProps } from '../../interfaces/S3Interface';
import { uploadFileToS3 } from '../../api/S3Apis';
import { useMemberStore } from '../../store/MemberStore';
import { IContractInfo } from '../../interfaces/ContractInterface';
const ContractApplyButton = () => {
  const [contractInfo, setContractInfo] = useState<IContractInfo>();
  const memberStore = useMemberStore();
  const [contractFormData, setContractFormData] = useState<IContractForm>();
  const applyApprove = async () => {
    if (!contractInfo) return;
    const fetchData = await applyApproval(contractInfo.home.home.homeNo, memberStore.member_no);
    setContractFormData(fetchData);
  };
  const generateBlobFromPdf = async () => {
    if (!contractFormData) return;
    console.log(contractFormData);
    const blobPdf = await pdf(createContractPdf(contractFormData)).toBlob();
    const preSignedUrlToUpload = await createForm(contractFormData.home.homeNo);
    console.log(preSignedUrlToUpload);
    if (typeof preSignedUrlToUpload !== 'string') return;
    const S3UploadProps: S3UploadProps = {
      uploadFile: blobPdf,
      preSignedUrlToUpload: preSignedUrlToUpload,
    };
    const response = await uploadFileToS3(S3UploadProps);
  };
  useEffect(() => {
    generateBlobFromPdf();
  }, [contractFormData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMemberContract();
        if (response) setContractInfo(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <button onClick={applyApprove}>승인하기</button>
    </>
  );
};
export default ContractApplyButton;
