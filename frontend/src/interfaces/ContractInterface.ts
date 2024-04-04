import { IHome, IHomeDetail } from './HomeInterface';
import { IMember } from './MemberInterface';
import { IAddress } from './AddressInterface';

export interface IContract {
  contractNo: number;
  contractUrl: string;
  progress: string;
  studentSign: boolean;
  hostSign: boolean;
  startAt: string;
  expiredAt: string;
}
export interface IContractInfo {
  home: IHomeDetail;
  contract: IContract;
  member: IMember;
}

export interface IContractForm {
  home: IHome;
  contract: IContract;
  member: IMember;
}

export interface IContractManageList {
  contractNo: number;
  hostName: string;
  memberName: string;
  address: IAddress;
  startAt: string;
  expiredAt: string;
}
