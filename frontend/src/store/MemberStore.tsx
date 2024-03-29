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
      daytime: false,
      nighttime: false,
      fast: false,
      late: false,
      dinner: false,
      smoke: false,
      drink: false,
      outside: false,
      inside: false,
      quiet: false,
      electronics: false,
      strong: false,
      housework: false,
      errand: false,
      liveLong: false,
      liveShort: false,
      pet: false,
      cold: false,
      hot: false,
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
