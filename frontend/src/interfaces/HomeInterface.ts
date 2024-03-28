import { IAddress } from './AddressInterface';

export interface IHome {
  homeNo: number;
  hostName: string;
  hostAge: number;
  hostGender: string;
  hostPhone: string;
  guardianName: string;
  guardianPhone: string;
  relation: string;
  hostRegisterNo: string;
  hostAccountNo: string;
  hostBank: string;
  address: IAddress;
  rent: number;
  lat: number; // 위도
  lng: number; // 경도
  introduce: string;
}

export interface IHostPersonality {
  hostPersonalityNo: number;
  smoke: boolean;
  pet: boolean;
  clean: boolean;
  daytime: boolean;
  nighttime: boolean;
  extrovert: boolean;
  introvert: boolean;
  cold: boolean;
  hot: boolean;
  noTouch: boolean;
}

export interface IHomeOption {
  homeOptionNo: number;
  internet: boolean;
  gas: boolean;
  washingMachine: boolean;
  airConditioner: boolean;
  refrigerator: boolean;
  elevator: boolean;
  microwave: boolean;
  toilet: boolean;
  breakfast: boolean;
  heating: boolean;
  parking: boolean;
  station: boolean;
  moveInDate: boolean;
  sink: boolean;
  type: string; // 아파트 or 오피스텔 or 빌라 or 주택 or 단독/다가구
}

export interface IHomeDetail {
  home: IHome;
  homeOption: IHomeOption;
  hostPersonality: IHostPersonality;
  homeImageList: string[];
  hostImageList: string[];
}
