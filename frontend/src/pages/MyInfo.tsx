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

  //화면에 출력되는 파일
  const [selectedImages, setSelectedImages] = useState([]);
  //서버에 보내지는 파일
  const [selectedFiles, setSelectedFiles] = useState(null as any);

  const onSelectFile = (e: any) => {
    e.preventDefault();
    e.persist();
    //선택한 파일
    const selectedFiles = e.target.files;
    //선택한 파일들을 fileUrlList에 넣어준다.
    const fileUrlList = [...selectedFiles];

    // 업로드되는 파일에는 url이 있어야 한다. filePath로 보내줄 url이다.
    //획득한 Blob URL Address를 브라우져에서 그대로 호출 시에 이미지는 표시가 되고 ,
    //일반 파일의 경우 다운로드를 할 수 있다.
    for (let i = 0; i < selectedFiles.length; i++) {
      const nowUrl = URL.createObjectURL(selectedFiles[i]);
      fileUrlList.push(nowUrl[i]);
    }

    setSelectedFiles(fileUrlList);

    //Array.from() 은 문자열 등 유사 배열(Array-like) 객체나 이터러블한 객체를 배열로 만들어주는 메서드이다.
    const selectedFileArray: any = Array.from(selectedFiles);

    //브라우저 상에 보여질 파일 이름
    const imageArray = selectedFileArray.map((file: any) => {
      return file.name;
    });

    // 첨부파일 삭제시
    setSelectedImages((previousImages: any) => previousImages.concat(imageArray));
    e.target.value = '';
  };

  //브라우저상에 보여질 첨부파일
  const attachFile =
    selectedImages &&
    selectedImages.map((image: any) => {
      return (
        <div key={image}>
          <div>{image}</div>
          <button onClick={() => setSelectedImages(selectedImages.filter((e) => e !== image))}></button>
        </div>
      );
    });

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
        <Button variant="outlined" onClick={() => setSelectedImages(selectedImages.filter((e) => e !== null))}>
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
