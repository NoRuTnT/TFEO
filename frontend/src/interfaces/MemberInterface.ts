import { IAddress } from './AddressInterface';

export interface IMember {
  memberNo: number;
  name: string;
  phone: string;
  email: string;
  registerNo: string;
  college: string;
  address: IAddress;
  profileUrl: string;
  gender: string;
  role: string;
  certificate: string;
  certificateStatus: string;
  certificateRegisterDate: string;
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
