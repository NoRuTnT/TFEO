import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@mui/material';
import { useMemberStore } from '../store/MemberStore';
import Footer from '../components/footer/Footer';
import { getMember, modifyMember } from '../api/MemberApis';
import SearchAddress from '../components/mypage/SearchAddress';
import { IMember } from '../interfaces/MemberInterface';
import { getFileFromS3, uploadFileToS3 } from '../api/S3Apis';
import { getDetail, getRoadAddress, getRoadNameAddress } from '../utils/addressUtils';
import { convertFileToBlob } from '../utils/fileUtils';
import '../styles/MyInfo.css';

const MyInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [newMemberInfo, setNewMemberInfo] = useState<IMember>({} as IMember);
  const { setMemberState, setAddressState, MemberInfo, AddressInfo } = useMemberStore();

  // 프로필 업로드
  const [profileImage, setProfileImage] = useState('');
  const [profileImageBlob, setProfileImageBlob] = useState<Blob>();
  //재학증명서 업로드
  const [certificate, setCertificate] = useState('');
  const [certificateBlob, setCertificateBlob] = useState<Blob>();
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
      const profileImageBlob = await convertFileToBlob(event.target.files[0]);
      if (profileImageBlob) setProfileImageBlob(profileImageBlob);
    }
  };
  const uploadCertificate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCertificate(URL.createObjectURL(event.target.files[0]));
      const certificateBlob = await convertFileToBlob(event.target.files[0]);
      if (certificateBlob) setCertificateBlob(certificateBlob);
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
      if (MemberInfo.profileUrl && MemberInfo.profileUrl !== '') {
        try {
          const response = await getFileFromS3(MemberInfo.profileUrl);
          if (response) {
            setProfileImage(URL.createObjectURL(response));
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
    if (!newMemberInfo.name || !newMemberInfo.phone || !newMemberInfo.registerNo || !newMemberInfo.address) {
      alert('정보를 모두 기입해주세요');
      return;
    }
    try {
      const response = await modifyMember(
        newMemberInfo.name,
        newMemberInfo.phone,
        newMemberInfo.email,
        newMemberInfo.registerNo,
        newMemberInfo.address,
        profileImage !== '',
        certificate !== '',
      );

      if (response && response.certificatePreSignedUrlToUpload !== '' && certificateBlob) {
        const res = await uploadFileToS3({
          preSignedUrlToUpload: response.certificatePreSignedUrlToUpload,
          uploadFile: certificateBlob,
        });
      }
      if (response && response.profilePreSignedUrlToUpload !== '' && profileImageBlob) {
        const res = await uploadFileToS3({
          preSignedUrlToUpload: response.profilePreSignedUrlToUpload,
          uploadFile: profileImageBlob,
        });
      }
    } catch (e) {
      console.log(e);
    }
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
            className={isEditing ? 'textarea-editing' : ''}
            style={{ width: '100%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={newMemberInfo.name}
            onChange={handleMemberChange}
            readOnly={!isEditing}
          />
          <br />
          <span>대학교</span>
          <br />
          <textarea
            id="college"
            style={{
              width: '100%',
              height: '2em',
              border: 'none',
              resize: 'none',
              whiteSpace: 'pre-line',
              cursor: 'default',
            }}
            value={newMemberInfo.college}
            readOnly
          />
          <br />
          <span>이메일</span>
          <br />
          <textarea
            id="email"
            style={{
              width: '100%',
              height: '2em',
              border: 'none',
              resize: 'none',
              whiteSpace: 'pre-line',
              cursor: 'default',
            }}
            value={MemberInfo.email}
            readOnly
          />
          <br />
          <span>전화번호</span>
          <br />
          <textarea
            className={isEditing ? 'textarea-editing' : ''}
            id="phone"
            style={{ width: '100%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={newMemberInfo.phone}
            readOnly={!isEditing}
            onChange={handleMemberChange}
          />
          <br />
          <span>주민등록번호</span>
          <br />
          <textarea
            className={isEditing ? 'textarea-editing' : ''}
            id="registerNo"
            style={{ width: '100%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={newMemberInfo.registerNo}
            onChange={handleMemberChange}
            readOnly={!isEditing}
          />
          <br />
          <div style={{ display: 'flex', justifyContent: isEditing ? 'space-between' : '' }}>
            <span>주소</span>
            <button onClick={handleModal} style={{ display: isEditing ? '' : 'none', fontSize: '12px' }}>
              주소 찾기
            </button>
          </div>
          <SearchAddress
            open={open}
            handleModal={handleModal}
            newMemberInfo={newMemberInfo}
            handleAddressChange={handleAddressChange}
            isEditing={isEditing}
          />
          <textarea
            id="address"
            style={{
              width: '100%',
              height: '2em',
              border: 'none',
              resize: 'none',
              whiteSpace: 'pre-line',
              cursor: 'default',
            }}
            value={getRoadAddress(newMemberInfo.address)}
            readOnly
            className={isEditing ? 'textarea-editing' : ''}
          />
          <br />
          <span>상세 주소</span>
          <textarea
            style={{ width: '100%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            value={getDetail(newMemberInfo.address)}
            onChange={handleAddressDetailChange}
            readOnly={!isEditing}
            className={isEditing ? 'textarea-editing' : ''}
          />
        </div>
        {/*<span>재학증명서</span>{' '}*/}
        {/*{MemberInfo.certificate !== 'CERTIFICATED' && MemberInfo.certificate !== 'CERTIFICATE_REQUIRED' && (*/}
        {/*  <div>*/}
        {/*    <input type="file" onChange={uploadCertificate} style={{ display: isEditing ? '' : 'none' }} />*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*{MemberInfo.certificate === 'CERTIFICATE_REQUIRED' && (*/}
        {/*  <p>관리자가 재학증명서를 확인 중입니다. 승인을 기다려주세요</p>*/}
        {/*)}*/}
        {/*{MemberInfo.certificate === 'CERTIFICATED' && (*/}
        {/*  <>*/}
        {/*    <button style={{ border: '1px solid black ', borderRadius: '5px' }} onClick={() => null}>*/}
        {/*      다운로드*/}
        {/*    </button>{' '}*/}
        {/*    <span>{MemberInfo.certificateExpirationDate} 만료</span>*/}
        {/*  </>*/}
        {/*)}*/}
        <div style={{ textAlign: 'center', padding: '2em' }}>
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
      </div>
      <Footer />
    </div>
  );
};

export default MyInfo;
