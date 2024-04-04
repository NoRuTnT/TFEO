import { IAddress } from '../interfaces/AddressInterface';

// export function getEMDNameAddress(address: IAddress) {
//   if (!address) return '';
//   return address.si + ' ' + address.sgg + ' ' + address.emd;
// }
// export function getRoadNameAddress(address: IAddress) {
//   if (!address) return '';
//   return address.si + ' ' + address.sgg + ' ' + address.ro + ' ' + address.detail;
// }

export function getRoadAddress(address: IAddress) {
  if (!address) return '';
  return address.si + ' ' + address.sgg + ' ' + address.ro;
}

export function getDetail(address: IAddress) {
  if (!address) return '';
  return address.detail;
}
