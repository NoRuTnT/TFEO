import axios from 'axios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';

//위시리스트 조회
export const getWishList = async () => {
  try {
    const response = await axios.get<ISuccessResponse>(`${process.env.REACT_APP_API_URL}/api/members/wish`);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};

//찜하기
export const addWish = async (homeNo: number) => {
  try {
    const response = await axios.post<ISuccessResponse>(`${process.env.REACT_APP_API_URL}/api/members/wish/${homeNo}`);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};

//찜하기 취소
export const removeWish = async (homeNo: number) => {
  try {
    const response = await axios.delete<ISuccessResponse>(
      `${process.env.REACT_APP_API_URL}/api/members/wish/${homeNo}`,
    );
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};
