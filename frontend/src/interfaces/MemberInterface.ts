import { IAddress } from './AddressInterface';

export interface IMember {
  memberNo: number;
  socialId: string;
  socialType: string;
  name: string;
  phone: string;
  email: string;
  registerNo: string;
  college: string;
  address: IAddress;
  profileUrl: string;
  gender: string;
  role: string;
  lat: number;
  lng: number;
  memberPersonalityNo: number;
  certificate: string;
  certificateStatus: string;
  certificateRegisterDate: string;
  sleepAt: string;
  wakeAt: string;
  returnAt: string;
  certificateExpirationDate: string;
  memberPersonality: IMemberPersonality;
}

export interface IMemberPersonality {
  memberPersonalityNo: number;
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
  electronics: boolean;
  strong: boolean;
  housework: boolean;
  errand: boolean;
  liveLong: boolean;
  liveShort: boolean;
  pet: boolean;
  cold: boolean;
  hot: boolean;
}
