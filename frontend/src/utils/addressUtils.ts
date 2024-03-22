import { IAddress } from '../interfaces/AddressInterface';

export function getEMDNameAddress(address: IAddress) {
  return address.si + ' ' + address.sgg + ' ' + address.emd;
}
export function getRoadNameAddress(address: IAddress) {
  return address.si + ' ' + address.sgg + ' ' + address.ro + ' ' + address.detail;
}
