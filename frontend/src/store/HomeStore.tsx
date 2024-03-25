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

// 집 상세 정보
type Home = {
  // homeNo: number;
  // hostName: string;
  // hostAge: number;
  // hostGender: string;
  // address: string;
  lat: number;
  lng: number;
  // rent: number;
  // -- host 성향 태그
  // smoke: boolean;
  // pet: boolean;
  // clean: boolean;
  // daytime: boolean;
  // nighttime: boolean;
  // extrovert: boolean;
  // introvert: boolean;
  // cold: boolean;
  // hot: boolean;
  // noTouch: boolean;
  // -- home 옵션 태그
  // internet: boolean;
  // gas: boolean;
  // washingMachine: boolean;
  // airConditioner: boolean;
  // refrigerator: boolean;
  // elevator: boolean;
  // microwave: boolean;
  // breakfast: boolean;
  // toilet: boolean;
  // heating: boolean;
  // parking: boolean;
  // station: boolean;
  // moveInDate: boolean;
  // sink: boolean;
  // type: string;
  // -- home imageUrl
  homeImg: string[];
  // -- host imageUrl
  hostImg: string[];
};

// 집 리스트 상태 타입 정의
interface HomeListState {
  homes: Home[];
  selectedHomeNo: number | null; // 선택된 집의 ID (선택되지 않았을 경우 null)
  selectHome: (homeNo: number) => void;
}

const dummyHomes: Home[] = [
  {
    lat: 37.566022,
    lng: 126.977969,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.568122,
    lng: 126.971969,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.563222,
    lng: 126.980969,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.560322,
    lng: 126.974469,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.570422,
    lng: 126.978369,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.566522,
    lng: 126.980269,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.559622,
    lng: 126.979169,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
  {
    lat: 37.563722,
    lng: 126.972069,
    homeImg: ['/test/home1.png', '/test/home2.png', '/test/home3.png'],
    hostImg: ['/test/owner1.png', '/test/owner2.png', '/test/owner3.png'],
  },
];

// 초기 상태
const initialFilterState: HomeFilterState = {
  school: false,
  subway: false,
  apartment: false,
  pets: false,
  selectFilter: (newState: Partial<HomeFilterState>) => {},
};

const initialListState: HomeListState = {
  homes: dummyHomes, // 초기 상태에 더미 데이터 적용
  selectedHomeNo: null,
  selectHome: (homeNo: number) => {},
};

export const useHomeStore = create<HomeFilterState & HomeListState>((set) => ({
  ...initialFilterState,
  ...initialListState,
  selectFilter: (newState) => set((state) => ({ ...state, ...newState })),
  selectHome: (homeNo: number) => set(() => ({ selectedHomeNo: homeNo })),
}));
