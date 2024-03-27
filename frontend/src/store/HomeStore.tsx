import create from 'zustand';

// 집 검색 필터
interface HomeFilterState {
  school: boolean;
  subway: boolean;
  apartment: boolean;
  pets: boolean;
  options: { option: string; value: string; choice: boolean }[];
  types: { type: string; value: string; choice: boolean }[];
  // 상태를 업데이트하는 함수
  selectFilter: (newState: Partial<HomeFilterState>) => void;
  toggleOption: (value: string) => void;
  toggleType: (value: string) => void;
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

interface VisibleHomesState {
  visibleHomes: Home[];
  setVisibleHomes: (homes: Home[]) => void;
}

const initialVisibleHomesState: VisibleHomesState = {
  visibleHomes: [], // 초기 상태는 빈 배열
  setVisibleHomes: (homes: Home[]) => {},
};

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
  options: [
    { option: '인터넷', value: 'internet', choice: false },
    { option: '가스레인지', value: 'gas', choice: false },
    { option: '세탁기', value: 'washing_machine', choice: false },
    { option: '냉장고', value: 'refrigerator', choice: false },
    { option: '에어컨', value: 'air_conditioner', choice: false },
    { option: '엘리베이터', value: 'elevator', choice: false },
    { option: '전자레인지', value: 'microwave', choice: false },
    { option: '개인화장실', value: 'toilet', choice: false },
    { option: '조식', value: 'breakfast', choice: false },
    { option: '난방', value: 'heating', choice: false },
    { option: '주차', value: 'parking', choice: false },
    { option: '싱크대', value: 'sink', choice: false },
  ],
  types: [
    { type: '아파트', value: 'apt', choice: false },
    { type: '빌라', value: 'vl', choice: false },
    { type: '오피스텔', value: 'opst', choice: false },
    { type: '원룸', value: 'oneroom', choice: false },
  ],
  selectFilter: (newState: Partial<HomeFilterState>) => {},
  toggleOption: (value: string) => {},
  toggleType: (value: string) => {},
};

const initialListState: HomeListState = {
  homes: dummyHomes, // 초기 상태에 더미 데이터 적용
  selectedHomeNo: null,
  selectHome: (homeNo: number) => {},
};

export const useHomeStore = create<HomeFilterState & HomeListState & VisibleHomesState>((set) => ({
  ...initialFilterState,
  ...initialListState,
  ...initialVisibleHomesState,
  selectFilter: (newState: Partial<HomeFilterState>) => set((state) => ({ ...state, ...newState })),
  selectHome: (homeNo: number) => set({ selectedHomeNo: homeNo }),
  setVisibleHomes: (homes: Home[]) => set({ visibleHomes: homes }), // 현재 보이는 집들을 설정하는 함수
  toggleOption: (value: string) =>
    set((state) => ({
      options: state.options.map((option) => (option.value === value ? { ...option, choice: !option.choice } : option)),
    })),
  toggleType: (value: string) =>
    set((state) => ({
      types: state.types.map((type) => (type.value === value ? { ...type, choice: !type.choice } : type)),
    })),
}));
