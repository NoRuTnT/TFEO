import axios from 'axios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';

// pdf 생성
export const createForm = async (homeNo: number) => {
  try {
    const response = await axios.get<ISuccessResponse>(`http://localhost:8081/api/contracts/creation-form/${homeNo}`);
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 집 신청 승인
export const applyApproval = async (homeNo: number, memberNo: number) => {
  const request = {
    homeNo: homeNo,
    memberNo: memberNo,
  };
  try {
    const response = await axios.put<ISuccessResponse>(`http://localhost:8081/api/home/apply-approval`, request);
    console.log(response.data.result);
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
