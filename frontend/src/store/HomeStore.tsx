import create from 'zustand';

// 집 검색 필터
interface HomeFilter {
  marks: { value: number; label: string }[];
  filters: { option: string; value: string; choice: boolean }[];
  options: { option: string; value: string; choice: boolean }[];
  types: { type: string; value: string; choice: boolean }[];
  setMarks: (newMarks: any) => void;
  toggleRentRange: (newRange: number[]) => void;
  toggleFilter: (value: string) => void;
  toggleOption: (value: string) => void;
  toggleType: (value: string) => void;
}

interface HomeRequestData {
  filter_condition: FilterCondition;
  search_condition: SearchCondition;
  member_personality: MemberPersonality;
  setFilterCondition: (value: FilterCondition) => void;
  setSearchCondition: (value: SearchCondition) => void;
  setMemberPersonality: (value: MemberPersonality) => void;
}

interface FilterCondition {
  school: boolean;
  subway: boolean;
  apartment: boolean;
  pets: boolean;
}

// 집 검색 조건
interface SearchCondition {
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
  lat: number;
  lng: number;
}

// 학생 성향
interface MemberPersonality {
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
  quiet: boolean;
  live_long: boolean;
  live_short: boolean;
  pet: boolean;
  cold: boolean;
  hot: boolean;
  host_house_prefer: number;
}

// 집 이미지 단일 객체 타입
interface HomeImage {
  home_no: number;
  home_image_no: number;
  home_image_url: string;
}

// 호스트 성향
interface HostVector {
  day_element: number;
  night_element: number;
  smoke_element: number;
  extro_element: number;
  intro_element: number;
  mannered_element: number;
  pet_lover_element: number;
  cold_element: number;
  hot_element: number;
}

// 집 상세 정보 (리스트 조회 시 단일 집 객체 타입)
interface Home {
  _id: any;
  home_no: string;
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
  host_name: string;
  host_gender: string;
  address: string;
  rent: number;
  lat: number;
  lng: number;
  home_no: number;
  home_image: HomeImage[];
  host_image_no: number;
  host_image_url: string;
  distance: number;
}

// 집 리스트 상태 타입 정의
interface HomeListState {
  homes: Home[];
  isMapLoaded: boolean; // 지도 로드 상태 추가
  headerFilterChanged: boolean; // 헤더 필터 상태 추가
  searchFilterChanged: boolean; // 모달 필터 상태 추가 (확인 눌렀을 때 바뀜)
  setHomes: (newHomes: Home[]) => void;
  setIsMapLoaded: (isLoaded: boolean) => void;
  setHeaderFilterChanged: (isChanged: boolean) => void;
  setSearchFilterChanged: (isChanged: boolean) => void;
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
const initialFilter: HomeFilter = {
  marks: [
    { value: 0, label: '0만원' },
    { value: 100, label: '100만원' },
  ],
  filters: [
    { option: '학교 근처', value: 'school', choice: false },
    { option: '역세권', value: 'subway', choice: false },
    { option: '아파트', value: 'apartment', choice: false },
    { option: '반려동물', value: 'pets', choice: false },
  ],
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
    { type: '아파트', value: 'APT', choice: false },
    { type: '빌라', value: 'VL', choice: false },
    { type: '오피스텔', value: 'OPST', choice: false },
    { type: '원룸', value: 'OR', choice: false },
    { type: '단독/다가구', value: 'DDDGG', choice: false },
  ],
  setMarks: (newMarks: any) => {},
  toggleRentRange: (newRange: number[]) => {},
  toggleFilter: (value: string) => {},
  toggleOption: (value: string) => {},
  toggleType: (value: string) => {},
};

const initialList: HomeListState = {
  homes: [],
  isMapLoaded: false, // 지도 로드 상태 추가
  headerFilterChanged: false, // 헤더 필터 상태 추가
  searchFilterChanged: false, // 모달 필터 상태 추가 (확인 누를 때 변하게 할거임)
  setIsMapLoaded: (isLoaded: boolean) => {},
  setHeaderFilterChanged: (isChanged: boolean) => {},
  setHomes: (newHomes: Home[]) => {},
  setSearchFilterChanged: (isChanged: boolean) => {},
};

const initialHomeRequestData: HomeRequestData = {
  filter_condition: {
    school: false,
    subway: false,
    apartment: false,
    pets: false,
  },
  search_condition: {
    internet: true,
    gas: false,
    washing_machine: false,
    air_conditioner: false,
    refrigerator: false,
    elevator: false,
    microwave: false,
    toilet: false,
    breakfast: false,
    heating: false,
    parking: false,
    station: false,
    move_in_date: false,
    sink: false,
    APT: false,
    OPST: false,
    VL: false,
    JT: false,
    DDDGG: false,
    OR: false,
    rent_max: 100,
    rent_min: 0,
    lat: 37.609641,
    lng: 126.997697,
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
    quiet: true,
    live_long: true,
    live_short: true,
    pet: true,
    cold: true,
    hot: true,
    host_house_prefer: 0,
  },
  setFilterCondition: (value: FilterCondition) => {},
  setSearchCondition: (value: SearchCondition) => {},
  setMemberPersonality: (value: MemberPersonality) => {},
};

export const useHomeStore = create<HomeFilter & HomeRequestData & HomeListState & VisibleHomesState>((set) => ({
  ...initialFilter,
  ...initialHomeRequestData,
  ...initialList,
  ...initialVisibleHomesState,
  setVisibleHomes: (homes: Home[]) => set({ visibleHomes: homes }), // 현재 보이는 집들을 설정하는 함수
  toggleFilter: (value: string) =>
    set((state) => {
      const newFilters = state.filters.map((filter) =>
        filter.value === value ? { ...filter, choice: !filter.choice } : filter,
      );
      const newFilterCondition = {
        ...state.filter_condition,
        [value]: !state.filter_condition[value as keyof FilterCondition],
      };
      return { ...state, filters: newFilters, filter_condition: newFilterCondition };
    }),
  toggleOption: (value: string) =>
    set((state) => {
      const newOptions = state.options.map((option) =>
        option.value === value ? { ...option, choice: !option.choice } : option,
      );
      const newSearchCondition = {
        ...state.search_condition,
        [value]: !state.search_condition[value as keyof SearchCondition],
      };
      return { ...state, options: newOptions, search_condition: newSearchCondition };
    }),
  toggleRentRange: (newRange: number[]) =>
    set((state) => {
      const newSearchCondition = {
        ...state.search_condition,
        rent_min: newRange[0],
        rent_max: newRange[1],
      };
      console.log(newSearchCondition);
      return { ...state, search_condition: newSearchCondition };
    }),
  toggleType: (value: string) =>
    set((state) => {
      const newTypes = state.types.map((type) => (type.value === value ? { ...type, choice: !type.choice } : type));
      const newSearchCondition = {
        ...state.search_condition,
        [value]: !state.search_condition[value as keyof SearchCondition],
      };
      return { ...state, types: newTypes, search_condition: newSearchCondition };
    }),
  setMarks: (newMarks: any) => set((state) => ({ ...state, marks: newMarks })),
  setIsMapLoaded: (isLoaded: boolean) => set({ isMapLoaded: isLoaded }), // 지도 로드 상태 업데이트 함수 추가
  setHeaderFilterChanged: (isChanged: boolean) => set({ headerFilterChanged: isChanged }),
  setHomes: (newHomes: Home[]) => set((state) => ({ ...state, homes: newHomes })),
  setFilterCondition: (newData: FilterCondition) => set((state) => ({ ...state, filter_condition: newData })),
  setSearchCondition: (newData: SearchCondition) => set((state) => ({ ...state, search_condition: newData })),
  setMemberPersonality: (newData: MemberPersonality) => set((state) => ({ ...state, member_personality: newData })),
}));
