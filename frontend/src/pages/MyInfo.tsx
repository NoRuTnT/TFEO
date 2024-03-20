import React, { useState } from 'react';
import Footer from '../components/footer/Footer';
import '../styles/MyInfo.css';
import { Button, Box, Avatar } from '@mui/material';

const MyInfo: React.FC = () => {
  const [profileImage, setProfileImage] = useState('/test/profile.png');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const data = [
    { label: '김싸피', description: '이름' },
    { label: '여자', description: '성별' },
    { label: '25세', description: '나이' },
    { label: '싸피대학교', description: '대학교' },
    { label: '01012345678', description: '전화번호' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div className="profile-image-container">
        <label htmlFor="image-upload">
          <Avatar alt="Remy Sharp" src={profileImage} sx={{ width: 150, height: 150, marginTop: 5 }} />
        </label>
        <input type="file" id="image-upload" style={{ display: 'none' }} onChange={handleImageUpload} />
      </div>
      <div>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item.description}</span>
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
              {item.label}
            </Box>
          </React.Fragment>
        ))}
        <br />
        <span>재학증명서</span>{' '}
        <Button variant="outlined" onClick={() => null}>
          다운로드
        </Button>{' '}
        <span>2024.09.20 만료</span>
      </div>
      <br />
      <Button variant="outlined">수정하기</Button>
      <Footer />
    </div>
  );
};

export default MyInfo;
