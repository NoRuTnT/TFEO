import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.API_URL}`, // 기본 서버 주소 입력
  headers: {
    // withCredentials: true,
  },
});
