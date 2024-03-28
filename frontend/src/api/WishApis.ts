import axios from 'axios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';

//위시리스트 조회
export const getWishList = async () => {
  try {
    const response = await axios.get<ISuccessResponse>(`http://localhost:8081/api/members/wish`);
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//찜하기
export const addWish = async (homeNo: number) => {
  try {
    const response = await axios.post<ISuccessResponse>(`http://localhost:8081/api/members/wish/${homeNo}`);
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//찜하기 취소
export const removeWish = async (homeNo: number) => {
  try {
    const response = await axios.delete<ISuccessResponse>(`http://localhost:8081/api/members/wish/${homeNo}`);
    return response.data.result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
