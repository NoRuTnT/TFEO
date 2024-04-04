import React from 'react';
import ReactPDF, { Document, Page, Text, View, StyleSheet, Font, BlobProvider, pdf } from '@react-pdf/renderer';
import NotoSansKRRegular from '../assets/fonts/NotoSansKR-Regular.ttf';
import NotoSansKRBold from '../assets/fonts/NotoSansKR-Bold.ttf';
import { IAddress } from '../interfaces/AddressInterface';
import { IContractForm } from '../interfaces/ContractFormInterface';
import { getYear, getMonth, getDay } from './timeUtils';
import { getRoadAddress } from './addressUtils';
import { getRent } from './moneyUtils';
import { IContractInfo } from '../interfaces/ContractInterface';

Font.register({
  family: 'NotoSansKRRegular',
  src: NotoSansKRRegular,
});
Font.register({
  family: 'NotoSansKRBold',
  src: NotoSansKRBold,
});

// 스타일 정의
const styles = StyleSheet.create({
  page: {
    paddingTop: 90,
    paddingHorizontal: 76.2,
    paddingBottom: 76.2,
    fontSize: 10,
    fontFamily: 'NotoSansKRRegular',
  },
  title: { textAlign: 'center', fontSize: 24, fontFamily: 'NotoSansKRBold', paddingBottom: 20 },
  introduce: { textAlign: 'center', paddingVertical: 5, borderStyle: 'solid', borderWidth: 0.5 },
  section: { marginTop: 20 },
  sectionTitle: { fontFamily: 'NotoSansKRBold', fontSize: 11 },
  homeInfoWrapper: { flexDirection: 'row', textAlign: 'center', paddingTop: 20 },
  homeInfoFirstCell: { flexBasis: '10%', borderStyle: 'solid', borderWidth: 0.5 },
  homeInfoSecondCell: { flexBasis: '90%', borderStyle: 'solid', borderWidth: 0.5 },
  cell: { margin: 5 },
  contractContentWrapper: { paddingTop: 20 },
  contractContentTitle: { fontSize: 11, paddingBottom: 10 },
  tableTitle: { fontFamily: 'NotoSansKRBold', fontSize: 11, textAlign: 'center', paddingBottom: 40 },
  tableWrapper: { paddingVertical: 20 },
  horizontalLine: { borderBottomStyle: 'solid', borderBottomWidth: 0.5, paddingTop: 20 },
  tableMemberInfo: { fontSize: 11, paddingBottom: 5 },
  table: { display: 'flex', textAlign: 'center' },
  firstRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  TitleCol: { flexBasis: '12%', borderStyle: 'solid', borderWidth: 0.5 },
  firstRowInfoCol: { flexBasis: '26%', borderStyle: 'solid', borderWidth: 0.5 },
  secondRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  secondRowInfoCol: { flexBasis: '88%', borderStyle: 'solid', borderWidth: 0.5 },
  underTableWrapper: { display: 'flex', textAlign: 'right', flexDirection: 'row' },
  underTableFirst: { textAlign: 'center' },
  underTableSecond: { textAlign: 'right' },
  underTableInfo: { flexBasis: '90%' },
  underTableSign: { flexBasis: '10%' },
});

interface ContractPdfProps {
  person: string;
  name: string;
  registerNo: string;
  phone: string;
  address: IAddress;
}
const addPhoneDash = (phone: string) => {
  const first = phone.slice(0, 3);
  const second = phone.slice(3, 7);
  const end = phone.slice(7, 11);
  return first + '-' + second + '-' + end;
};
const getContractJSX = ({ person, name, registerNo, phone, address }: ContractPdfProps) => {
  return (
    <View style={styles.tableWrapper}>
      <Text style={styles.tableMemberInfo}>{person} 정보</Text>
      <View style={styles.table}>
        <View style={styles.firstRow}>
          <View style={styles.TitleCol}>
            <Text style={styles.cell}>성명</Text>
          </View>
          <View style={styles.TitleCol}>
            <Text style={styles.cell}>{name}</Text>
          </View>
          <View style={styles.TitleCol}>
            <Text style={styles.cell}>전화번호</Text>
          </View>
          <View style={styles.firstRowInfoCol}>
            <Text style={styles.cell}>{addPhoneDash(phone)}</Text>
          </View>
          <View style={styles.TitleCol}>
            <Text style={styles.cell}>주민번호</Text>
          </View>
          <View style={styles.firstRowInfoCol}>
            <Text style={styles.cell}>{registerNo}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.TitleCol}>
            <Text style={styles.cell}>주소</Text>
          </View>
          <View style={styles.secondRowInfoCol}>
            <Text style={styles.cell}>{getRoadAddress(address)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.underTableFirst}>
        <Text style={styles.cell}>위의 사항에 틀린 점이 없고 계약에 동의합니다.</Text>
      </View>
      <View style={styles.underTableSecond}>
        <View style={styles.underTableWrapper}>
          <View style={styles.underTableInfo}>
            <Text style={styles.cell}>
              {person} 성명 : {name}
            </Text>
          </View>
          <View style={styles.underTableSign}>
            <Text style={styles.cell}>(서명)</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export const createContractPdf = ({ home, contract, member }: IContractForm) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>스물다섯 여든하나 룸쉐어링 계약서</Text>
        <Text style={styles.introduce}>
          임대인 ( {home.hostName} )과 임차인 ( {member.name} )은 아래와 같이 임대차 계약을 체결한다.
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 임대주택의 표시</Text>
          <View style={styles.homeInfoWrapper}>
            <View style={styles.homeInfoFirstCell}>
              <Text style={styles.cell}>주소</Text>
            </View>
            <View style={styles.homeInfoSecondCell}>
              <Text style={styles.cell}>{getRoadAddress(home.address)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 계약 내용</Text>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 1 조 (목적)</Text>
            <Text>
              위 임대주택의 임대차에 한하여 임대인과 임차인은 합의에 의하여 월세 금 {home.rent}
              만원정을 선불로 매월 1일에 지불한다.
            </Text>
          </View>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 2 조 (존속 기간)</Text>
            <Text>
              임대인은 위 임대주택을 임대차 목적으로 사용, 수익할 수 있는 상태로 {getYear(contract.startAt)}년{' '}
              {getMonth(contract.startAt)}월 {getDay(contract.startAt)}일 까지 임차인에게 인도하며, 임대차 기간은
              인도일로부터 {getYear(contract.expiredAt)}년 {getMonth(contract.expiredAt)}월 {getDay(contract.expiredAt)}
              일 까지로 한다.
            </Text>
          </View>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 3 조 (용도변경 및 전대 등)</Text>
            <Text>
              임차인은 임대인의 동의없이 위 부동산의 용도나 구조를 변경하거나 전대임차권 양도 또는 담보제공을 하지
              못하며 임대차 목적 이외의 용도로 사용할 수 없다.
            </Text>
          </View>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 4 조 (계약의 해지)</Text>
            <Text>
              임차인의 월세연체액이 2회 분의 월세액에 달하거나 제3조를 위반하였을 때 임대인은 즉시 본 계약을 해지 할 수
              있다.
            </Text>
          </View>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 5 조 (계약의 종료)</Text>
            <Text>
              임대차계약이 종료된 경우에 임차인은 위 부동산을 원상으로 회복하여 임대인에게 반환한다. 이러한 경우
              임대인은 보증금을 임차인에게 반환하고, 연체 임대료 또는 손해배상금이 있을 때는 이들을 제하고 그 잔액을
              반환한다.
            </Text>
          </View>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 6 조 (계약의 해제)</Text>
            <Text>
              임차인이 임대인에게 중도금(중도금이 없을 때는 잔금)을 지불하기 전까지, 임대인은 계약금의 배액을 상환하고,
              임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.
            </Text>
          </View>
          <View style={styles.contractContentWrapper}>
            <Text style={styles.contractContentTitle}>제 7 조 (채무 불이행과 손해배상)</Text>
            <Text>
              임대인 또는 임차인이 본 계약상의 내용에 대하여 불이행이 있을 경우 그 상대방은 불이행한 자에 대하여
              서면으로 최고하고 계약을 해제 할 수 있다. 그리고 계약 당사자는 계약해제에 따른 손해배상을 각각 상대방에
              대하여 청구할 수 있다.
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.section}>
          <View style={styles.tableTitle}>
            <Text>본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명한다.</Text>
          </View>
          {getContractJSX({
            person: '임대인',
            name: home.hostName,
            registerNo: home.hostRegisterNo,
            phone: home.hostPhone,
            address: home.address,
          })}
          {getContractJSX({
            person: '임차인',
            name: member.name,
            registerNo: member.registerNo,
            phone: member.phone,
            address: member.address,
          })}
        </View>
      </Page>
    </Document>
  );
};
