import axios, { AxiosInstance } from 'axios';

export const RecommendAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_MONGO_API_URL, // 추천 서버 주소 입력
  headers: {
    // withCredentials: true,
  },
});
