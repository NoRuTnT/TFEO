import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@mui/material';
import { useMemberStore } from '../store/MemberStore';
import Footer from '../components/footer/Footer';
import { getMember, modifyMember } from '../api/MemberApis';

const MyInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { setMemberState, setAddressState, MemberInfo, AddressInfo } = useMemberStore();
  const [newMemberInfo, setNewMemberInfo] = useState({
    memberNo: MemberInfo.memberNo,
    socialId: MemberInfo.socialId,
    socialType: MemberInfo.socialType,
    role: MemberInfo.role,
    name: MemberInfo.name,
    phone: MemberInfo.phone,
    email: MemberInfo.email,
    registerNo: MemberInfo.registerNo,
    college: MemberInfo.college,
    lat: MemberInfo.lat,
    lng: MemberInfo.lng,
    address: MemberInfo.address,
    profileUrl: MemberInfo.profileUrl,
    gender: MemberInfo.gender,
    certificate: MemberInfo.certificate,
    memberPersonalityNo: MemberInfo.memberPersonalityNo,
    certificateStatus: MemberInfo.certificateStatus,
    certificateRegisterDate: MemberInfo.certificateRegisterDate,
    certificateExpirationDate: MemberInfo.certificateExpirationDate,
    sleepAt: MemberInfo.sleepAt,
    wakeAt: MemberInfo.wakeAt,
    returnAt: MemberInfo.returnAt,
    memberPersonality: MemberInfo.memberPersonality,
  });

  // 프로필 업로드
  const [profileImage, setProfileImage] = useState(newMemberInfo.profileUrl);
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleMemberChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setNewMemberInfo({
      ...newMemberInfo,
      [id]: value,
    });
  };

  const saveChanges = async () => {
    setIsEditing(false);
    await modifyMember(
      newMemberInfo.name,
      newMemberInfo.phone,
      newMemberInfo.email,
      newMemberInfo.registerNo,
      newMemberInfo.address,
      false,
      false,
    );
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAddressState({
      ...AddressInfo,
      [name]: value,
    });
  };

  return (
    <div
      className="wrap-container"
      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
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
            defaultValue={MemberInfo.name}
            readOnly
          />
          <br />
          <span>대학교</span>
          <br />
          <textarea
            id="college"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            defaultValue={MemberInfo.college}
            readOnly
          />
          <br />
          <span>이메일</span>
          <br />
          <textarea
            id="email"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            defaultValue={MemberInfo.email}
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
            readOnly={!isEditing}
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
            readOnly={!isEditing}
          />
          <br />
          <span>주소</span>
          <br />
          <textarea
            className={isEditing ? 'textarea-editing' : ''}
            id="address"
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            defaultValue={`${MemberInfo.address.si} ${MemberInfo.address.sgg} ${MemberInfo.address.ro}`}
            onChange={handleAddressChange}
            readOnly={!isEditing}
          />
          <br />
          <span>상세 주소</span>
          <textarea
            style={{ width: '150%', height: '2em', border: 'none', resize: 'none', whiteSpace: 'pre-line' }}
            defaultValue={MemberInfo.address.detail}
            onChange={handleAddressChange}
            readOnly={!isEditing}
          />
        </div>
        <span>재학증명서</span>{' '}
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
