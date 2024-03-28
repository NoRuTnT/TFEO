import React, { useState } from 'react';
import Footer from '../components/footer/Footer';
import '../styles/MyInfo.css';
import { Button, Box, Avatar } from '@mui/material';
import { useMemberStore } from '../store/MemberStore';
import axios from 'axios';

const MyInfo: React.FC = () => {
  const [profileImage, setProfileImage] = useState('/test/profile.png');

  const { setAddressState, setMemberState } = useMemberStore();
  const { name, gender, college, phone, email, register_no, certificate, certificate_expiration_date, address } =
    useMemberStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const data = [
    { type: '이름', value: name },
    { type: '성별', value: gender },
    { type: '대학교', value: college },
    { type: '전화번호', value: phone },
    { type: '이메일', value: email },
    { type: '주민등록번호', value: register_no },
    { type: '주소', value: address.si + ' ' + address.sgg + ' ' + address.ro + ' ' + address.detail },
  ];

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
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item.type}</span>
            <Box
              height={20}
              width={300}
              my={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={4}
              p={2}
              sx={{ border: '1px solid #79747E', borderRadius: '5px' }}
            >
              {item.value}
            </Box>
          </React.Fragment>
        ))}
        <br />
        <span>재학증명서</span>{' '}
        {certificate === 'CERTIFICATED' && (
          <>
            <span>재학증명서</span>{' '}
            <Button variant="outlined" onClick={() => null}>
              다운로드
            </Button>{' '}
            <span>{certificate_expiration_date} 만료</span>
          </>
        )}
      </div>
      <br />
      <Button variant="outlined">수정하기</Button>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default MyInfo;
