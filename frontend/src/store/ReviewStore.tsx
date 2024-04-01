import create from 'zustand';
import { IReview } from '../interfaces/ReviewInterface';

interface ReviewState {
  ReviewInfo: {
    reviewNo: number;
    homeNo: number;
    memberName: string;
    memberProfileUrl: string;
    createdAt: string;
    homeContent: string;
    keywordValues: { keyword: string; value: string; choice: boolean }[];
  };
  setReview: (updateFn: (currentReviewInfo: ReviewState['ReviewInfo']) => ReviewState['ReviewInfo']) => void;
}

const initialReviewState: ReviewState = {
  ReviewInfo: {
    reviewNo: 0,
    homeNo: 0,
    memberName: '',
    memberProfileUrl: '',
    createdAt: '',
    homeContent: '',
    keywordValues: [
      {
        keyword: '친절해요',
        value: 'kindElderly',
        choice: false,
      },
      {
        keyword: '주변에 편의시설이 많아요',
        value: 'manyNearbyAmenities',
        choice: false,
      },
      {
        keyword: '집이 깨끗해요',
        value: 'cleanHouse',
        choice: false,
      },
      {
        keyword: '옵션이 설명과 같아요',
        value: 'matchesStatedOptions',
        choice: false,
      },
      {
        keyword: '치안이 좋아요',
        value: 'goodSecurity',
        choice: false,
      },
      {
        keyword: '어르신이 저를 존중해요',
        value: 'respectfulElderly',
        choice: false,
      },
      {
        keyword: '학교와 가까워요',
        value: 'nearSchool',
        choice: false,
      },
      {
        keyword: '월세가 저렴해요',
        value: 'affordableRent',
        choice: false,
      },
      {
        keyword: '방이 넓어요',
        value: 'spaciousRoom',
        choice: false,
      },
      {
        keyword: '집까지 가는 길이 편해요',
        value: 'easyAccessToHome',
        choice: false,
      },
      {
        keyword: '교통이 편해요',
        value: 'convenientTransportation',
        choice: false,
      },
    ],
  },
  setReview: () => {},
};

// Zustand 생성
export const useReviewStore = create<ReviewState>((set) => ({
  ...initialReviewState,
  setReview: (updateFn) =>
    set((state) => ({
      ...state,
      ReviewInfo: updateFn(state.ReviewInfo),
    })),
}));
