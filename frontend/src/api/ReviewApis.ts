import { customAxios } from './customAxios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';
import { IReview } from '../interfaces/ReviewInterface';
import { IReviewKeyword } from '../interfaces/ReviewKeywordInterface';

//리뷰 작성
export const writeReview = async (homeNo: number, homeContent: string, keywordValues: IReviewKeyword) => {
  const request = { homeNo: homeNo, homeContent: homeContent, keywordValues: keywordValues };
  console.log('#######요청######');
  console.log(request);
  try {
    const response = await customAxios.post<ISuccessResponse>(`api/review`, request);
    console.log(response.data.message);
    return response.data.result;
  } catch (e) {
    console.log('비상비상비상!!');
    console.log(e);
  }
};

//리뷰 수정
export const modifyReview = async (
  reviewNo: number,
  homeContent: string,
  keywordValues: { [keyword: string]: boolean },
) => {
  const request = { reviewNo: reviewNo, homeContent: homeContent, keywordValues: keywordValues };
  try {
    const response = await customAxios.put<ISuccessResponse>(`api/review/${reviewNo}`, request);
    console.log(response.data.message);
    return response.data.result; //리뷰 식별키 반환
  } catch (e) {
    console.log(e);
  }
};

//리뷰 삭제
export const removeReview = async (reviewNo: number) => {
  try {
    const response = await customAxios.delete<ISuccessResponse>(`/api/review/${reviewNo}`);
    alert(response.data.message);
    return response.data.message;
  } catch (e) {
    console.log(e);
  }
};

//리뷰 목록 조회
export const getReviewList = async (homeNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/review/${homeNo}`);
    console.log('리뷰조회성공');
    console.log(response.data.result);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};

//리뷰 상세 조회
export const getReviewDetail = async (reviewNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/review/detail/${reviewNo}`);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};
