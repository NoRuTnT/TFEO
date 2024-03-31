import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
interface Props {
  open: boolean;
  handleModal: () => void;
}
const SearchAddress = ({ open, handleModal }: Props) => {
  const [modalState, setModalState] = useState<boolean>();
  const [inputAddressValue, setInputAddressValue] = useState<string>();
  const [inputZipCodeValue, setInputZipCodeValue] = useState<string>();
  const postCodeStyle = {
    width: '400px',
    height: '400px',
    display: modalState ? 'block' : 'none',
  }; // 스타일 정의 code

  const onCompletePost = (data: any) => {
    setModalState(false);
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
    handleModal();
  };
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      margin: 'auto 0',
      width: '300px',
      height: '400px',
      padding: '0',
      overflow: 'hidden',
    },
  };
  return (
    <>
      <button onClick={handleModal}>주소 찾기</button>
      <Modal isOpen={open} ariaHideApp={true} style={customStyles}>
        <DaumPostcode onComplete={onCompletePost} />
      </Modal>
    </>
  );
};
export default SearchAddress;
