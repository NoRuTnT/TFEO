import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ContractPDFCreate from '../components/contract/ContractPDFCreate';
import { IAddress } from '../interfaces/AddressInterface';

const ContractForm = () => {
  interface IContractForm {
    host: IHostContractForm;
    member: IMemberContractForm;
    contract: IContractContractForm;
  }

  interface IHostContractForm {
    hostName: string;
    address: IAddress;
    rent: number;
    hostAccountNo: string;
    hostBank: string;
    registerNo: string;
    phone: string;
  }

  interface IMemberContractForm {
    name: string;
    address: IAddress;
    registerNo: string;
    phone: string;
  }

  interface IContractContractForm {
    startAt: string;
    expiredAt: string;
  }

  const [contractForm, setContractForm] = useState<IContractForm>({
    host: {
      hostName: '',
      address: {
        si: '',
        sgg: '',
        emd: '',
        ro: '',
        detail: '',
      },
      rent: 0,
      hostAccountNo: '',
      hostBank: '',
      registerNo: '',
      phone: '',
    },
    member: {
      name: '',
      address: {
        si: '',
        sgg: '',
        emd: '',
        ro: '',
        detail: '',
      },
      registerNo: '',
      phone: '',
    },
    contract: {
      startAt: '',
      expiredAt: '',
    },
  });

  useEffect(() => {
    console.log('contract Form 초기화');
    //아래 내용은 api 연결 이후 삭제
    setContractForm({
      host: {
        hostName: '김할배',
        address: {
          si: '서울특별시',
          sgg: '강남구',
          emd: '역삼동',
          ro: '테헤란로 212',
          detail: '멀티캠퍼스 1501호',
        },
        rent: 200000,
        hostAccountNo: '114324-10403214',
        hostBank: '우리은행',
        registerNo: '550404-1234567',
        phone: '01012345678',
      },
      member: {
        name: '김학생',
        address: {
          si: '서울특별시',
          sgg: '강남구',
          emd: '역삼동',
          ro: '테헤란로 212',
          detail: '멀티캠퍼스 1501호',
        },
        registerNo: '970426-1234567',
        phone: '01055341234',
      },
      contract: {
        startAt: '2024-03-20T12:30:45',
        expiredAt: '2024-09-20T12:30:45',
      },
    });
  }, []);
  return (
    <>
      <h2>Pdf 테스트</h2>
      <PDFDownloadLink document={<ContractPDFCreate contractForm={contractForm} />}>
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </>
  );
};
export default ContractForm;
