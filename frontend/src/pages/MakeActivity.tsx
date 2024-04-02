import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import '../styles/ActivityCertification.css'; // CSS 파일을 적절히 수정해야 할 수도 있습니다.
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IActivity } from '../interfaces/ActivityInterface';
import { getActivityDetail } from '../api/ActivityApis';
import { writeActivity } from '../api/ActivityApis';

const MakeActivity: React.FC = () => {
  const [activityNo, setActivityNo] = useState<number>(0);
  const [activity, setActivity] = useState<IActivity>();
  const [image, setImage] = useState<string>(''); // 이미지를 저장할 상태 추가

  useEffect(() => {
    const activityNofromUrl = new URLSearchParams(location.search).get('activityNo');
    const activityNo = activityNofromUrl ? parseInt(activityNofromUrl, 10) : 0;
    setActivityNo(activityNo);
    const fetchData = async () => {
      if (!activityNo) return;
      const response = await getActivityDetail(activityNo);
      if (response) setActivity(response);
      console.log(response);
    };
    if (activityNo) fetchData();
  }, []);

  // 이미지 업로드 핸들러 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // 이미지를 상태에 저장합니다 (예: URL.createObjectURL을 사용)
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 텍스트 상태와 버튼 텍스트 상태를 관리합니다.
  const [content, setContent] = useState('');

  // 내용 등록 혹은 수정 핸들러
  const handleContentSubmit = async () => {
    if (!activityNo) {
      console.error('Activity number is not available.');
      return;
    }

    await writeActivity(activityNo, image, content);
    alert('글이 등록되었습니다');
  };

  return (
    <div className="main-page">
      <div style={{ position: 'fixed', top: '10px', left: '10px' }}>
        <Link to="/activity-certification">
          <ArrowBackIosNewIcon />
        </Link>
      </div>
      {/* <h2>텍스트 제목</h2> */}
      <div style={{ margin: '10px', fontWeight: 'bold', fontSize: '20px' }}>{activity?.week}</div>
      <label style={{ position: 'absolute', color: 'gray', fontSize: '20px', top: '20px' }} htmlFor="image-upload">
        <div
          style={{
            position: 'relative',
            marginTop: '120px',
            width: '220px',
            height: '270px',
            border: '1px solid black',
            borderRadius: '20px',
          }}
        >
          {/* 이미지 표시 */}
          {image && <img src={image} alt="uploaded" style={{ width: '100%', height: '100%', borderRadius: '20px' }} />}

          {/* 파일 업로드 */}
          <input
            type="file"
            id="image-upload"
            style={{ display: 'none' }} // 파일 입력 숨기기
            onChange={handleImageUpload}
          />

          {/* 이미지 업로드 안내 문구는 이미지가 업로드되면 보이지 않도록 설정 */}
          {!image && (
            <>
              <div style={{ marginTop: '60px', fontSize: '15px' }}>이미지 업로드</div>
              <div style={{ marginTop: '20px', fontSize: '50px' }}> + </div>
            </>
          )}
        </div>
      </label>

      <textarea
        style={{ marginTop: '400px', border: '1px solid black', width: '270px', height: '120px' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용 입력하기"
      ></textarea>
      <div style={{ position: 'absolute', bottom: '120px' }}>
        <Link to="/activity-certification">
          <button
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              width: '70px',
              height: '40px',
              marginRight: '15px',
            }}
            onClick={handleContentSubmit}
          >
            등록
          </button>
        </Link>
        <Link to="/activity-certification">
          <button
            style={{
              border: '1px solid #e07068',
              borderRadius: '5px',
              width: '70px',
              height: '40px',
              marginRight: '15px',
              backgroundColor: '#E07068',
              color: 'white',
            }}
          >
            취소
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default MakeActivity;
