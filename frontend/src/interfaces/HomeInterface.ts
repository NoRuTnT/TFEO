import { IAddress } from './AddressInterface';

export interface IHome {
  homeNo: number;
  hostName: string;
  hostAge: number;
  hostGender: string;
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
  noneRegisterMember: boolean;
  introduce: string;
  maintenanceFee: number;
  hostImageList: string[];
  homeImageList: string[];
}

export interface IHostPersonality {
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

export interface IHomeContractCard {
  homeNo: number;
  address: IAddress;
  hostName: string;
  rent: number;
  startAt: string;
  expiredAt: string;
  progress: string;
  hostPersonality: IHostPersonality;
  hostBank: string;
  hostAccountNo: string;
  hostImageList: string[];
  homeImageList: string[];
}
