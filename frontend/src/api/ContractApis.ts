import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';
import { customAxios } from './customAxios';
import { IContractForm, IContractInfo } from '../interfaces/ContractInterface';

// pdf 생성
export const createForm = async (homeNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/contracts/creation-form/${homeNo}`);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};

// 집 신청 승인
export const applyApproval = async (homeNo: number, memberNo: number) => {
  const request = {
    homeNo: homeNo,
    memberNo: memberNo,
  };
  try {
    const response = await customAxios.put<ISuccessResponse>(`/api/home/apply-approval`, request);
    console.log(response.data.message);
    return response.data.result as IContractForm;
  } catch (e) {
    console.log(e);
  }
};

export const signContract = async (contractNo: number) => {
  try {
    const response = await customAxios.put<ISuccessResponse>(`/api/contracts/sign/${contractNo}`);
    console.log(response.data.message);
    return response.data.result as string; // presigned url 반환
  } catch (e) {
    console.log(e);
  }
};

export const getContractFormPreSignedUrl = async (contractNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/contracts/contract-url/${contractNo}`);
    console.log(response.data.message);
    return response.data.result as string; //pdf 조회용 presigned url 반환
  } catch (e) {
    console.log(e);
  }
};

// 학생이 신청한 계약 조회 /members/home
export const getMemberContract = async () => {
  try {
    const response = await customAxios.get<ISuccessResponse>('/api/members/home');
    return response.data.result;
  } catch (e) {
    // 학생이 신청한 계약이 없는 경우가 고려되어야 한다. 신청한 계약 없을 경우 계약 없음 페이지 띄워야함
    console.log(e);
  }
};
