import create from 'zustand';

// interface MyInfoState {
//   이름: string;
//   성별: string;
//   대학교: string;
//   전화번호: string;
//   주민등록번호: string;
//   주소: string;
// }

// Member 타입 정의
interface MemberState {
  member_no: number;
  social_id: string;
  social_type: string;
  name: string;
  phone: string;
  email: string;
  register_no: string;
  college: string;
  lat: number;
  lng: number;
  address: AddressState;
  profile_url: string;
  gender: string;
  role: string;
  certificate: string;
  member_personality_no: number;
  certificate_status: string;
  certificate_register_date: string;
  certificate_expiration_date: string;
  sleep_at: string;
  wake_at: string;
  return_at: string;
  setMemberState: (newState: Partial<MemberState>) => void;
}

// Address 타입 정의
interface AddressState {
  si: string;
  sgg: string;
  emd: string;
  ro: string;
  detail: string;
  setAddressState: (newAddress: AddressState) => void;
}

const initialAddressState: AddressState = {
  si: '서울특별시',
  sgg: '강남구',
  emd: '역삼동',
  ro: '테헤란로',
  detail: '1501호',
  setAddressState: (newAddress: AddressState) => {},
};

const initialMemberState: MemberState = {
  member_no: 1,
  social_id: '',
  social_type: '',
  role: '',
  name: '김싸피',
  phone: '01012345678',
  email: 'ssafy@ssafy.com',
  register_no: '990329-*******',
  college: '싸피대학교',
  lat: 37.508,
  lng: 126.9616,
  address: initialAddressState,
  profile_url: '',
  gender: '남자',
  certificate: '',
  member_personality_no: 1,
  certificate_status: 'CERTIFICATED',
  certificate_register_date: '2024-03-28',
  certificate_expiration_date: '2024-09-27',
  sleep_at: '10:00:00',
  wake_at: '06:00:00',
  return_at: '09:00:00',
  setMemberState: (newState: Partial<MemberState>) => {},
};

// Zustand 생성
export const useMemberStore = create<MemberState & AddressState>((set) => ({
  ...initialMemberState,
  ...initialAddressState,
  setMemeberState: (newState: Partial<MemberState>) => set((state) => ({ ...state, ...newState })),
  setAddressState: (newAddress: AddressState) => set((state) => ({ ...state, ...newAddress })),
}));

// MemberComponent
