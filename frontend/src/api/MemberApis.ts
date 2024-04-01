import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';
import { customAxios } from './customAxios';
import { IMember, IMemberPersonality } from '../interfaces/MemberInterface';
import { IAddress } from '../interfaces/AddressInterface';
import { ISurvey } from '../interfaces/SuerveyInterface';
import { IMemberUrl } from '../interfaces/MemberUrlInterface';

// 회원 상세정보 조회
export const getMember = async () => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/members`);
    return response.data.result as IMember;
  } catch (e) {
    console.log(e);
  }
};

// 회원 상세정보 수정
export const modifyMember = async (
  name: string,
  phone: string,
  email: string,
  registerNo: string,
  address: IAddress,
  isProfileChanged: boolean,
  isCertificateChanged: boolean,
) => {
  const request = {
    name: name,
    phone: phone,
    email: email,
    registerNo: registerNo,
    address: address,
    isProfileChanged: isProfileChanged,
    isCertificateChanged: isCertificateChanged,
  };
  try {
    const response = await customAxios.put<ISuccessResponse>(`/api/members`, request);
    return response.data.result as IMemberUrl;
  } catch (e) {
    console.log(e);
  }
};

// 회원 설문조사 제출
export const surveyMember = async (surveyData: ISurvey) => {
  const request = { surveyData: surveyData };
  try {
    const response = await customAxios.post<ISuccessResponse>(`/api/members/survey`, request);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};
