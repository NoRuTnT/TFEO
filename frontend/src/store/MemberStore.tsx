import create from 'zustand';
import { IMember, IMemberPersonality } from '../interfaces/MemberInterface';
import { IAddress } from '../interfaces/AddressInterface';

interface MemberState {
  MemberInfo: IMember;
  setCollege: (collegeName: string, newLat: number, newLng: number) => void;
  setMemberState: (newMemberInfo: IMember) => void;
  setMemberPersonality: (newMemberPersonality: IMemberPersonality) => void;
  updateMemberPersonality: (field: keyof IMemberPersonality, value: number) => void;
}

interface AddressState {
  AddressInfo: IAddress;
  setAddressState: (newAddressInfo: IAddress) => void;
}

const initialAddressState: AddressState = {
  AddressInfo: { si: '', sgg: '', emd: '', ro: '', detail: '' },
  setAddressState: (newAddress: IAddress) => {},
};

const initialMemberState: MemberState = {
  MemberInfo: {
    memberNo: 0,
    socialId: '',
    socialType: '',
    role: '',
    name: '',
    phone: '',
    email: '',
    registerNo: '',
    college: '',
    lat: 37.609641,
    lng: 126.997697,
    address: { si: '', sgg: '', emd: '', ro: '', detail: '' },
    profileUrl: '',
    gender: '',
    certificate: '',
    memberPersonalityNo: 1,
    certificateStatus: 'CERTIFICATED',
    certificateRegisterDate: '',
    certificateExpirationDate: '',
    sleepAt: '',
    wakeAt: '',
    returnAt: '',
    memberPersonality: {
      memberPersonalityNo: 1,
      daytime: 0,
      nighttime: 0,
      fast: 0,
      late: 0,
      dinner: 0,
      smoke: 0,
      drink: 0,
      outside: 0,
      inside: 0,
      quiet: 0,
      liveLong: 0,
      liveShort: 0,
      pet: 0,
      cold: 0,
      hot: 0,
      hostHousePrefer: 0,
    },
  },
  setCollege: (collegeName: string, newLat: number, newLng: number) => {},
  setMemberState: (newMember: IMember) => {},
  setMemberPersonality: (newMemberPersonality: IMemberPersonality) => {},
  updateMemberPersonality: (field: keyof IMemberPersonality, value: number) => {},
};

// Zustand 생성
export const useMemberStore = create<MemberState & AddressState>((set) => ({
  ...initialMemberState,
  ...initialAddressState,
  setCollege: (collegeName: string, newLat: number, newLng: number) =>
    set((state) => {
      const newMemberInfo = {
        ...state.MemberInfo,
        college: collegeName,
        lat: newLat,
        lng: newLng,
      };
      console.log(newMemberInfo);
      return { ...state, MemberInfo: newMemberInfo };
    }),
  setMemberState: (newMemberInfo: IMember) => set((state) => ({ ...state, MemberInfo: newMemberInfo })),
  setAddressState: (newAddress: IAddress) => set((state) => ({ ...state, ...newAddress })),
  setMemberPersonality: (newMemberPersonality: IMemberPersonality) =>
    set((state) => {
      const newMemberInfo = {
        ...state.MemberInfo,
        memberPersonality: newMemberPersonality,
      };
      return { ...state, MemberInfo: newMemberInfo };
    }),
  updateMemberPersonality: (field: keyof IMemberPersonality, value: number) =>
    set((state) => ({
      ...state,
      MemberInfo: {
        ...state.MemberInfo,
        memberPersonality: {
          ...state.MemberInfo.memberPersonality,
          [field]: value,
        },
      },
    })),
}));

// MemberComponent
