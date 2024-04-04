export interface IAddressSearchResponse {
  errorCode: string;
  errorMessage: string;
  juso: IAddressItem[];
}

export interface IAddressItem {
  roadAddr: string;
  roadAddrPart1: string;
  roadAddrPart2: string;
  jibunAddr: string;
  engAddr: string;
  zipNo: string;
  admCd: string;
  rnMgtSn: string;
  bdMgtSn: string;
  detBdNmList: string;
  bdNm: string;
  bdKdcd: string;
  siNm: string;
  sggNm: string;
  emdNm: string;
  liNm: string;
  rn: string;
  udrtYn: string;
  buldMnnm: string;
  buldSlno: string;
  mtYn: string;
  lnbrMnnm: string;
  lnbrSlno: string;
  emdNo: string;
}

export interface IAddress {
  si: string; // 시도 (ex. 서울특별시)
  sgg: string; // 시군구 (ex. 강남구)
  emd: string; // 읍면동 (ex. 역삼동)
  ro: string; // 도로명 (ex. 테헤란로 212)
  detail: string; // 상세주소 (ex. 멀티캠퍼스 1501호)
}
