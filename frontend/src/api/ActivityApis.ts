import { customAxios } from './customAxios';
import { ISuccessResponse } from '../interfaces/SuccessResponseInterface';

// 활동글 작성
export const writeActivity = async (activityNo: number, activityImageUrl: string, activityText: string) => {
  const request = { activityNo: activityNo, activityImageUrl: activityImageUrl, activityText: activityText };
  console.log('#######요청######');
  console.log(request);
  try {
    const response = await customAxios.put<ISuccessResponse>(`api/activity/${activityNo}`, request);
    console.log(response.data.message);
    return response.data.result;
  } catch (e) {
    console.log('비상비상비상!!');
    console.log(e);
  }
};

//로드맵 조회
export const getRoadmap = async (studentNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/activity/${studentNo}`);
    console.log(response.data.result);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};

//활동글 상세 조회
export const getActivityDetail = async (activityNo: number) => {
  try {
    const response = await customAxios.get<ISuccessResponse>(`/api/activity/${activityNo}/detail`);
    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};
