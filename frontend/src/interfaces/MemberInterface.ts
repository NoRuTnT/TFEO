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
  daytime: number;
  nighttime: number;
  fast: number;
  late: number;
  dinner: number;
  smoke: number;
  drink: number;
  outside: number;
  inside: number;
  quiet: number;
  liveLong: number;
  liveShort: number;
  pet: number;
  cold: number;
  hot: number;
  hostHousePrefer: number;
}
