import { IAddress } from './AddressInterface';
import { IHome } from './HomeInterface';
import { IContract } from './ContractInterface';
import { IMember } from './MemberInterface';

export interface IContractForm {
  home: IHome;
  member: IMember;
  contract: IContract;
}
