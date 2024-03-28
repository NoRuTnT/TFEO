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

interface HomeRequestDataState {
  search_condition: SearchCondition;
  member_personality: MemberPersonality;
  setSearchCondition: (value: SearchCondition) => void;
  setMemberPersonality: (value: MemberPersonality) => void;
}

type SearchCondition = {
  internet: boolean;
  gas: boolean;
  washing_machine: boolean;
  air_conditioner: boolean;
  refrigerator: boolean;
  elevator: boolean;
  microwave: boolean;
  toilet: boolean;
  breakfast: boolean;
  heating: boolean;
  parking: boolean;
  station: boolean;
  move_in_date: boolean;
  sink: boolean;
  APT: boolean;
  OPST: boolean;
  VL: boolean;
  JT: boolean;
  DDDGG: boolean;
  OR: boolean;
  rent_max: number;
  rent_min: number;
};

type MemberPersonality = {
  member_personality_no: number;
  daytime: boolean;
  nighttime: boolean;
  fast: boolean;
  late: boolean;
  dinner: boolean;
  smoke: boolean;
  drink: boolean;
  outside: boolean;
  inside: boolean;
  quite: boolean;
  live_long: boolean;
  live_short: boolean;
  pet: boolean;
  cold: boolean;
  hot: boolean;
  host_house_prefer: number;
};

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
  distance: number;
};

// 집 리스트 상태 타입 정의
interface HomeListState {
  homes: Home[];
  isMapLoaded: boolean; // 지도 로드 상태 추가
  headerFilterChanged: boolean; // 헤더 필터 상태 추가
  selectedHomeNo: number | null; // 선택된 집의 ID (선택되지 않았을 경우 null)
  selectHome: (homeNo: number) => void;
  setIsMapLoaded: (isLoaded: boolean) => void;
  setHeaderFilterChanged: (isChanged: boolean) => void;
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
  headerFilterChanged: false, // 헤더 필터 상태 추가
  selectHome: (homeNo: number) => {},
  setIsMapLoaded: (isLoaded: boolean) => {},
  setHeaderFilterChanged: (isChanged: boolean) => {},
  setHomes: (newHomes: any[]) => {},
};

const initialHomeRequestDataState: HomeRequestDataState = {
  search_condition: {
    internet: true,
    gas: true,
    washing_machine: true,
    air_conditioner: true,
    refrigerator: true,
    elevator: true,
    microwave: true,
    toilet: true,
    breakfast: false,
    heating: true,
    parking: false,
    station: false,
    move_in_date: false,
    sink: true,
    APT: true,
    OPST: true,
    VL: true,
    JT: true,
    DDDGG: true,
    OR: false,
    rent_max: 100,
    rent_min: 0,
  },
  member_personality: {
    member_personality_no: 1,
    daytime: true,
    nighttime: true,
    fast: true,
    late: true,
    dinner: true,
    smoke: true,
    drink: true,
    outside: true,
    inside: true,
    quite: true,
    live_long: true,
    live_short: true,
    pet: true,
    cold: true,
    hot: true,
    host_house_prefer: 0,
  },
  setSearchCondition: (value: SearchCondition) => {},
  setMemberPersonality: (value: MemberPersonality) => {},
};

export const useHomeStore = create<HomeFilterState & HomeRequestDataState & HomeListState & VisibleHomesState>(
  (set) => ({
    ...initialFilterState,
    ...initialHomeRequestDataState,
    ...initialListState,
    ...initialVisibleHomesState,
    selectFilter: (newState: Partial<HomeFilterState>) => set((state) => ({ ...state, ...newState })),
    selectHome: (homeNo: number) => set({ selectedHomeNo: homeNo }),
    setVisibleHomes: (homes: Home[]) => set({ visibleHomes: homes }), // 현재 보이는 집들을 설정하는 함수
    toggleOption: (value: string) =>
      set((state) => ({
        options: state.options.map((option) =>
          option.value === value ? { ...option, choice: !option.choice } : option,
        ),
      })),
    toggleType: (value: string) =>
      set((state) => ({
        types: state.types.map((type) => (type.value === value ? { ...type, choice: !type.choice } : type)),
      })),
    setIsMapLoaded: (isLoaded: boolean) => set({ isMapLoaded: isLoaded }), // 지도 로드 상태 업데이트 함수 추가
    setHeaderFilterChanged: (isChanged: boolean) => set({ headerFilterChanged: isChanged }),
    setHomes: (newHomes: any[]) => set((state) => ({ ...state, homes: newHomes })),
    setSearchCondition: (newData: SearchCondition) => set((state) => ({ ...state, search_condition: newData })),
    setMemberPersonality: (newData: MemberPersonality) => set((state) => ({ ...state, member_personality: newData })),
  }),
);
