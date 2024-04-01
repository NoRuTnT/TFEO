import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@mui/material';
import { useMemberStore } from '../store/MemberStore';
import Footer from '../components/footer/Footer';
import { getMember, modifyMember } from '../api/MemberApis';
import axios from 'axios';
import SearchAddress from '../components/mypage/SearchAddress';
import { IMember } from '../interfaces/MemberInterface';
import { getFileFromS3 } from '../api/S3Apis';
import { getDetail, getRoadAddress, getRoadNameAddress } from '../utils/addressUtils';
import { IAddress } from '../interfaces/AddressInterface';

const MyInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [newMemberInfo, setNewMemberInfo] = useState<IMember>({} as IMember);
  const { setMemberState, setAddressState, MemberInfo, AddressInfo } = useMemberStore();

  // 프로필 업로드
  const [profileImage, setProfileImage] = useState('');
  const [isProfileImageUploaded, setIsProfileImageUploaded] = useState<boolean>(false);
  //재학증명서 업로드
  const [ceritifcate, setCertificate] = useState('');
  const [isCertificateUploaded, setIsCertificateUploaded] = useState<boolean>(false);
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
      setIsProfileImageUploaded(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMember();
      if (response != undefined) {
        setMemberState(response);
        setNewMemberInfo(response);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (MemberInfo.certificate && MemberInfo.certificate !== '') {
        try {
          const response = await getFileFromS3(MemberInfo.certificate);
          if (response) {
            setCertificate(URL.createObjectURL(response));
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [MemberInfo]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleModal = () => {
    setOpen(!open);
  };

  const handleMemberChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    if (!newMemberInfo) return;
    setNewMemberInfo({
      ...newMemberInfo,
      [id]: value,
    });
  };

  const saveChanges = async () => {
    setIsEditing(false);
    if (!newMemberInfo) return;
    await modifyMember(
      newMemberInfo.name,
      newMemberInfo.phone,
      newMemberInfo.email,
      newMemberInfo.registerNo,
      newMemberInfo.address,
      isProfileImageUploaded,
      isCertificateUploaded,
    );
  };

  const handleAddressChange = (data: any) => {
    setNewMemberInfo((prev) => ({
      ...prev,
      address: {
        si: data.sido,
        sgg: data.sigungu,
        ro: data.roadname + ' ' + data.addressEnglish.split(',')[0],
        emd: data.bname + ' ' + data.autoJibunAddressEnglish.split(',')[0],
        detail: '',
      },
    }));
  };
  const handleAddressDetailChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    if (!newMemberInfo) return;
    setNewMemberInfo({
      ...newMemberInfo,
      address: {
        ...newMemberInfo.address,
        detail: value,
      },
    });
  };
  const uploadCertificate = () => {
    setIsCertificateUploaded(true);
  };
  if (!newMemberInfo) {
    return (
      <>
        <div>로그인이 필요합니다.</div>
      </>
    );
  }
  return (
    <div
      className="wrap-container"
      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
      onClick={() => {
        if (open) setOpen(false);
      }}
    >
      <div className="profile-image-container">
        <label htmlFor="image-upload">
          <Avatar alt="Remy Sharp" src={profileImage} sx={{ width: 100, height: 100, marginTop: 5 }} />
        </label>
        <input type="file" id="image-upload" style={{ display: 'none' }} onChange={handleImageUpload} />
      </div>

      <div>
        <div>
          <span>이름</span>
          <br />
          <textarea
            id="name"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={newMemberInfo.name}
            onChange={handleMemberChange}
          />
          <br />
          <span>대학교</span>
          <br />
          <textarea
            id="college"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={newMemberInfo.college}
            readOnly
          />
          <br />
          <span>이메일</span>
          <br />
          <textarea
            id="email"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={MemberInfo.email}
            readOnly
          />
          <br />
          <span>전화번호</span>
          <br />
          <textarea
            className={isEditing ? 'textarea-editing' : ''}
            id="phone"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            defaultValue={MemberInfo.phone}
            onChange={handleMemberChange}
          />
          <br />
          <span>주민등록번호</span>
          <br />
          <textarea
            className={isEditing ? 'textarea-editing' : ''}
            id="registerNo"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            defaultValue={MemberInfo.registerNo}
            onChange={handleMemberChange}
          />
          <br />
          <span>주소</span>
          <br />
          <SearchAddress
            open={open}
            handleModal={handleModal}
            newMemberInfo={newMemberInfo}
            handleAddressChange={handleAddressChange}
          />
          <textarea
            className={isEditing ? 'textarea-editing' : ''}
            id="address"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={getRoadAddress(newMemberInfo.address)}
          />
          <br />
          <span>상세 주소</span>
          <textarea
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={getDetail(newMemberInfo.address)}
            onChange={handleAddressDetailChange}
          />
        </div>
        <span>재학증명서</span>{' '}
        {MemberInfo.certificate !== 'CERTIFICATED' && <input type="file" onChange={uploadCertificate} />}
        {MemberInfo.certificate === 'CERTIFICATED' && (
          <>
            <button style={{ border: '1px solid black ', borderRadius: '5px' }} onClick={() => null}>
              다운로드
            </button>{' '}
            <span>{MemberInfo.certificateExpirationDate} 만료</span>
          </>
        )}
        <br />
        {isEditing ? (
          <Button variant="outlined" onClick={saveChanges}>
            저장하기
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleEdit}>
            수정하기
          </Button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyInfo;
