import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityContent.css'; // 이 페이지 전용 스타일을 위한 새 CSS 파일 경로
import { getActivityDetail } from '../api/ActivityApis';
import { useActivityStore } from '../store/ActivityStore';
import { IActivity } from '../interfaces/ActivityInterface';
import { format } from 'date-fns';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getFileFromS3 } from '../api/S3Apis';
import { file } from '@babel/types';

const ActivityContent: React.FC = () => {
  const [activity, setActivity] = useState<IActivity>();
  const [image, setImage] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const activityNofromUrl = new URLSearchParams(location.search).get('activityNo');
    const activityNo = activityNofromUrl ? parseInt(activityNofromUrl, 10) : null;
    const fetchData = async () => {
      if (!activityNo) return;
      const response = await getActivityDetail(activityNo);
      console.log(response);
      if (response) {
        setActivity(response);
        if (response.activityImageUrl) {
          const fileResponse = await getFileFromS3(response.activityImageUrl);
          if (fileResponse) {
            setImage(URL.createObjectURL(fileResponse));
            console.log(image);
          }
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="main-page">
      <div style={{ position: 'fixed', top: '10px', left: '10px' }}>
        <ArrowBackIosNewIcon
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      <div style={{ margin: '10px', fontWeight: 'bold', fontSize: '20px' }}>{activity?.week}</div>

      {/* 페이지 제목 */}
      <div className="page-title">
        <h1>
          {activity?.memberName} | {activity?.createdAt && format(new Date(activity.createdAt), 'yyyy-MM-dd HH:mm:ss')}
        </h1>
      </div>

      {/* 사진 컨테이너 */}
      <div style={{ display: 'flex', justifyContent: 'center' }} className="photo-container">
        <img src={image} />
      </div>

      {/* 사진 설명 */}
      <div
        style={{
          width: '250px',
          height: '150px',
          border: '1px solid gray',
          borderRadius: '10px',
          display: 'flex',
          padding: '10px',
        }}
      >
        <p>{activity?.activityText}</p>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default ActivityContent;
