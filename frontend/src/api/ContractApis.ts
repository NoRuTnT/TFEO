import axios from 'axios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';
import { customAxios } from './customAxios';

// pdf 생성
export const createForm = async (homeNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/contracts/creation-form/${homeNo}`);
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
    const response = await customAxios.put<ISuccessResponse>(`/home/apply-approval`, request);
    console.log(response.data.result);
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
