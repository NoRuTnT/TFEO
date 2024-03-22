import { IAddress } from './AddressInterface';

export interface IContractForm {
  host: IHostContractForm;
  member: IMemberContractForm;
  contract: IContractContractForm;
}

export interface IHostContractForm {
  hostName: string;
  address: IAddress;
  rent: number;
  hostAccountNo: string;
  hostBank: string;
  registerNo: string;
  phone: string;
}

export interface IMemberContractForm {
  name: string;
  address: IAddress;
  registerNo: string;
  phone: string;
}

export interface IContractContractForm {
  startAt: string;
  expiredAt: string;
}
