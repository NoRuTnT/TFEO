import create from 'zustand';

// 집 검색 필터
interface HomeFilterState {
  school: boolean;
  subway: boolean;
  apartment: boolean;
  pets: boolean;
  // 상태를 업데이트하는 함수
  selectFilter: (newState: Partial<HomeFilterState>) => void;
}

// 초기 상태
const initialFilterState: HomeFilterState = {
  school: false,
  subway: false,
  apartment: false,
  pets: false,
  selectFilter: (newState: Partial<HomeFilterState>) => {},
};

// zustand 스토어 생성
export const useHomeStore = create<HomeFilterState>((set) => ({
  ...initialState,
  // 상태 변경 함수 정의
  selectFilter: (newState) => set((state) => ({ ...state, ...newState })),
}));
