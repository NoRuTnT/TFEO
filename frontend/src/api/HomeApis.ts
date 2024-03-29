import { customAxios } from './customAxios';
import { IHomeDetail } from '../interfaces/HomeInterface';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';
import { AxiosError } from 'axios';

export const getHomeDetail = async (homeNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/home/${homeNo}`);
    return response.data.result as IHomeDetail;
  } catch (e) {
    console.log(e);
  }
};

export const applyHomeApi = async (homeNo: number, startAt: string) => {
  const startDate = new Date(startAt);
  const expiredAt = new Date(startDate.getFullYear(), startDate.getMonth() + 6, startDate.getDate())
    .toISOString()
    .split('T')[0];
  const request = {
    startAt: startAt,
    expiredAt: expiredAt,
  };
  try {
    const response = await customAxios.post<ISuccessResponse>(`/api/members/home/${homeNo}`, request);
    return response.data.message;
  } catch (e) {
    const error = e as AxiosError;
    console.log(e); //Todo: error response마다 다른 alert하기. 우선은 무조건 로그인된 상태 가정하고 이미 신청한 집이라고 alert함
    if (error.response) {
      const errorResponse: any = error.response.data;
      alert('이미 집을 신청한 상태입니다');
    }
  }
};
