import { IHome, IHomeDetail } from './HomeInterface';
import { IMember } from './MemberInterface';

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
