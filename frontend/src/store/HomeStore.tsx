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

type HomeImage = {
  home_no: number;
  home_image_no: number;
  home_image_url: string;
};

// 집 상세 정보
type Home = {
  _id: any;
  internet: number;
  gas: number;
  washing_machine: number;
  air_conditioner: number;
  refrigerator: number;
  elevator: number;
  microwave: number;
  breakfast: number;
  toilet: number;
  heating: number;
  parking: number;
  station: number;
  move_in_date: number;
  sink: number;
  type: string;
  smoke: number;
  pet: number;
  clean: number;
  daytime: number;
  nighttime: number;
  extrovert: number;
  introvert: number;
  cold: number;
  hot: number;
  no_touch: number;
  home_no: number;
  host_name: string;
  host_age: number;
  host_phone: string;
  host_gender: string;
  guardian_name: string;
  guardian_phone: string;
  relation: string;
  host_register_no: string;
  host_account_no: string;
  host_bank: string;
  address: string;
  rent: number;
  lat: number;
  lng: number;
  role: string;
  introduce: string;
  host_personality_no: number;
  home_option_no: number;
  si: string;
  sgg: string;
  emd: string;
  ro: string;
  home_image_no: number;
  home_image: HomeImage[];
  host_image_no: number;
  host_image: string;
};

// 집 리스트 상태 타입 정의
interface HomeListState {
  homes: Home[];
  isMapLoaded: boolean; // 지도 로드 상태 추가
  selectedHomeNo: number | null; // 선택된 집의 ID (선택되지 않았을 경우 null)
  selectHome: (homeNo: number) => void;
  setIsMapLoaded: (isLoaded: boolean) => void;
  setHomes: (newHomes: any[]) => void;
}

interface VisibleHomesState {
  visibleHomes: Home[];
  setVisibleHomes: (homes: Home[]) => void;
}

const initialVisibleHomesState: VisibleHomesState = {
  visibleHomes: [], // 초기 상태는 빈 배열
  setVisibleHomes: (homes: Home[]) => {},
};

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
  homes: [],
  isMapLoaded: false, // 지도 로드 상태 추가
  selectedHomeNo: null,
  selectHome: (homeNo: number) => {},
  setIsMapLoaded: (isLoaded: boolean) => {},
  setHomes: (newHomes: any[]) => {},
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
  setIsMapLoaded: (isLoaded: boolean) => set({ isMapLoaded: isLoaded }), // 지도 로드 상태 업데이트 함수 추가
  setHomes: (newHomes: any[]) => set((state) => ({ ...state, homes: newHomes })),
}));
