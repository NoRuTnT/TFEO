import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useMemberStore } from '../../store/MemberStore';
import { IAddress } from '../../interfaces/AddressInterface';
import { IMember } from '../../interfaces/MemberInterface';
interface Props {
  open: boolean;
  handleModal: () => void;
  newMemberInfo: IMember;
  handleAddressChange: (data: any) => void;
  isEditing: boolean;
}
const SearchAddress = ({ open, handleModal, newMemberInfo, handleAddressChange, isEditing }: Props) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [inputAddressValue, setInputAddressValue] = useState<string>();
  const [inputZipCodeValue, setInputZipCodeValue] = useState<string>();

  const onCompletePost = (data: any) => {
    handleAddressChange(data);
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
      {/*<button onClick={handleModal} style={{ display: isEditing ? '' : 'none' }}>*/}
      {/*  주소 찾기*/}
      {/*</button>*/}
      <Modal isOpen={open} ariaHideApp={true} style={customStyles}>
        <DaumPostcode onComplete={onCompletePost} />
      </Modal>
    </>
  );
};
export default SearchAddress;
