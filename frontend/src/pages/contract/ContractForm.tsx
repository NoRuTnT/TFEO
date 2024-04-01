import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
// import ContractPDFCreate from '../components/contract/ContractPDFCreate';
import { IAddress } from '../../interfaces/AddressInterface';
import styled from 'styled-components';
import { getRoadNameAddress } from '../../utils/addressUtils';
import { getRent } from '../../utils/moneyUtils';
import { getDay, getMonth, getYear } from '../../utils/timeUtils';
import Footer from '../../components/footer/Footer';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { Box, Button } from '@mui/material';
import ContractSignatureModal from '../../components/contract/ContractSignatureModal';
import { IContractForm } from '../../interfaces/ContractFormInterface';
import { IHome } from '../../interfaces/HomeInterface';
import { IMember } from '../../interfaces/MemberInterface';
import { IContract, IContractInfo } from '../../interfaces/ContractInterface';
import { useLocation } from 'react-router-dom';
import { getMemberContract } from '../../api/ContractApis';

interface ContractFormProps {
  home: IHome;
  member: IMember;
  contract: IContract;
}
const ContractForm = () => {
  const location = useLocation();
  const { home, member, contract } = location.state as { home: IHome; member: IMember; contract: IContract };
  const [open, setOpen] = React.useState(false);
  const [contractInfo, setContractInfo] = useState<IContractInfo>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMemberContract();
      if (!result) return;
      setContractInfo(result);
    };
    fetchData();
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
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
      <View>
        <Text>{person} 정보</Text>
        <View>
          <View>
            <View>
              <Text>성명</Text>
            </View>
            <View>
              <Text>{name}</Text>
            </View>
            <View>
              <Text>전화번호</Text>
            </View>
            <View>
              <Text>{addPhoneDash(phone)}</Text>
            </View>
            <View>
              <Text>주민번호</Text>
            </View>
            <View>
              <Text>{registerNo}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>주소</Text>
            </View>
            <View>
              <Text>{getRoadNameAddress(address)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const signModal = () => {
    if (!contractInfo) return <></>;
    return (
      <>
        <Button onClick={handleOpen}>서명하기</Button>
        <ContractSignatureModal
          open={open}
          handleClose={handleClose}
          contract={contractInfo.contract}
          role={contractInfo.member.role}
        />
      </>
    );
  };
  if (!contractInfo)
    return (
      <>
        <div>조회된 계약이 없습니다.</div>
      </>
    );
  return (
    <>
      <Page>
        <StyledEngineProvider injectFirst>
          <Title>스물다섯 여든하나 룸쉐어링 계약서</Title>
          <Introduce>
            임대인 ( {contractInfo.home.home.hostName} )과 임차인 ( {contractInfo.member.name} )은 아래와 같이 임대차
            계약을 체결한다.
          </Introduce>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>1. 임대주택의 표시</AccordionSummary>
            <AccordionDetails>
              <HomeInfoFirstCell>
                <Cell>주소</Cell>
              </HomeInfoFirstCell>
              <HomeInfoSecondCell>
                <Cell>{getRoadNameAddress(contractInfo.home.home.address)}</Cell>
              </HomeInfoSecondCell>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>2. 계약 내용</AccordionSummary>
            <AccordionDetails>
              <View>
                <Text>제 1 조 (목적)</Text>
                <Text>
                  위 임대주택의 임대차에 한하여 임대인과 임차인은 합의에 의하여 월세 금 {home.rent}
                  만원정을 선불로 매월 1일에 지불한다.
                </Text>
              </View>
              <View>
                <Text>제 2 조 (존속 기간)</Text>
                <Text>
                  임대인은 위 임대주택을 임대차 목적으로 사용, 수익할 수 있는 상태로 {getYear(contract.startAt)}년{' '}
                  {getMonth(contract.startAt)}월 {getDay(contract.startAt)}일 까지 임차인에게 인도하며, 임대차 기간은
                  인도일로부터 {getYear(contract.expiredAt)}년 {getMonth(contract.expiredAt)}월{' '}
                  {getDay(contract.expiredAt)}일 까지로 한다.
                </Text>
              </View>
              <View>
                <Text>제 3 조 (용도변경 및 전대 등)</Text>
                <Text>
                  임차인은 임대인의 동의없이 위 부동산의 용도나 구조를 변경하거나 전대임차권 양도 또는 담보제공을 하지
                  못하며 임대차 목적 이외의 용도로 사용할 수 없다.
                </Text>
              </View>
              <View>
                <Text>제 4 조 (계약의 해지)</Text>
                <Text>
                  임차인의 월세연체액이 2회 분의 월세액에 달하거나 제3조를 위반하였을 때 임대인은 즉시 본 계약을 해지 할
                  수 있다.
                </Text>
              </View>
              <View>
                <Text>제 5 조 (계약의 종료)</Text>
                <Text>
                  임대차계약이 종료된 경우에 임차인은 위 부동산을 원상으로 회복하여 임대인에게 반환한다. 이러한 경우
                  임대인은 보증금을 임차인에게 반환하고, 연체 임대료 또는 손해배상금이 있을 때는 이들을 제하고 그 잔액을
                  반환한다.
                </Text>
              </View>
              <View>
                <Text>제 6 조 (계약의 해제)</Text>
                <Text>
                  임차인이 임대인에게 중도금(중도금이 없을 때는 잔금)을 지불하기 전까지, 임대인은 계약금의 배액을
                  상환하고, 임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.
                </Text>
              </View>
              <View>
                <Text>제 7 조 (채무 불이행과 손해배상)</Text>
                <Text>
                  임대인 또는 임차인이 본 계약상의 내용에 대하여 불이행이 있을 경우 그 상대방은 불이행한 자에 대하여
                  서면으로 최고하고 계약을 해제 할 수 있다. 그리고 계약 당사자는 계약해제에 따른 손해배상을 각각
                  상대방에 대하여 청구할 수 있다.
                </Text>
              </View>
            </AccordionDetails>
          </Accordion>
          <View />
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>3. 계약 당사자 정보</AccordionSummary>
            <AccordionDetails>
              {getContractJSX({
                person: '임대인',
                name: contractInfo.home.home.hostName,
                registerNo: contractInfo.home.home.hostRegisterNo,
                phone: contractInfo.home.home.hostPhone,
                address: contractInfo.home.home.address,
              })}
              {getContractJSX({
                person: '임차인',
                name: contractInfo.member.name,
                registerNo: contractInfo.member.registerNo,
                phone: contractInfo.member.phone,
                address: contractInfo.member.address,
              })}
            </AccordionDetails>
          </Accordion>
          <ContractSignWrapper>
            <ContractSignTitle>서명 진행 사항</ContractSignTitle>
            <ContractSignBody>
              <ContractSignStatus>
                <ContractSignPerson>학생</ContractSignPerson>
                <Button>{contractInfo.contract.studentSign ? '서명 완료' : '서명 미완'}</Button>
              </ContractSignStatus>
              <ContractSignStatus>
                <ContractSignPerson>노인</ContractSignPerson>
                <Button>{contractInfo.contract.hostSign ? '서명 완료' : '서명 미완'}</Button>
              </ContractSignStatus>
            </ContractSignBody>
            <IsContractSigned>
              {!contractInfo.contract.studentSign && signModal()}
              {contractInfo.contract.studentSign && <Box>서명이 완료되었습니다.</Box>}
            </IsContractSigned>
          </ContractSignWrapper>
        </StyledEngineProvider>
      </Page>
      <Footer />
    </>
  );
};
const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
`;
const Document = styled.div``;
const Page = styled.div`
  margin: 2em;
`;
const View = styled.div``;
const Text = styled.div``;
const Introduce = styled.div``;
const Section = styled.div``;
const SectionTitle = styled.div``;
const HomeInfoWrapper = styled.div``;
const HomeInfoFirstCell = styled.div``;
const HomeInfoSecondCell = styled.div``;
const Cell = styled.div``;
const ContractSignWrapper = styled.div`
  text-align: center;
`;
const ContractSignBody = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ContractSignTitle = styled.div`
  padding: 1em 0 0;
`;
const ContractSignStatus = styled.div`
  padding: 0.5em;
`;
const ContractSignPerson = styled.div`
  padding: 0.5em 0;
`;
const IsContractSigned = styled.div``;
const SignModal = styled.div``;

export default ContractForm;
