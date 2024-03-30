import create from 'zustand';
import { IMember } from '../interfaces/MemberInterface';
import { IAddress } from '../interfaces/AddressInterface';

interface MemberState {
  MemberInfo: IMember;
  setMemberState: (newMemberInfo: IMember) => void;
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
    lat: 0,
    lng: 0,
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
      electronics: 0,
      strong: 0,
      housework: 0,
      errand: 0,
      liveLong: 0,
      liveShort: 0,
      pet: 0,
      cold: 0,
      hot: 0,
    },
  },
  setMemberState: (newMember: IMember) => {},
};

// Zustand 생성
export const useMemberStore = create<MemberState & AddressState>((set) => ({
  ...initialMemberState,
  ...initialAddressState,
  setMemberState: (newMemberInfo: IMember) => set((state) => ({ ...state, MemberInfo: newMemberInfo })),
  setAddressState: (newAddress: IAddress) => set((state) => ({ ...state, ...newAddress })),
}));

// MemberComponent
