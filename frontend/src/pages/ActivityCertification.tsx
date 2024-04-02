import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityCertification.css';
import CheckIcon from '@mui/icons-material/Check';
import { getRoadmap } from '../api/ActivityApis';
import { useMemberStore } from '../store/MemberStore';
import { IActivity } from '../interfaces/ActivityInterface';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';

const ActivityCertification: React.FC = () => {
  const { MemberInfo } = useMemberStore();
  const [roadmap, setRoadmap] = useState<IActivity[]>();
  const navigate = useNavigate();
  const [flags, setFlags] = useState<number[]>([]);
  const [activityIndex, setActivityIndex] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // const roadmapResponse = await getRoadmap(MemberInfo.memberNo);
      const roadmapResponse = await getRoadmap(1);
      if (roadmapResponse) {
        setRoadmap(roadmapResponse);
        console.log('######로드맵 조회######');
        console.log(roadmap);
      }
    };
    // if (MemberInfo.memberNo) fetchData();
    // else console.log('없다');
    fetchData();
  }, []);

  useEffect(() => {
    if (!roadmap) return; // roadmap이 undefined일 경우 실행하지 않음

    const updatedFlags = new Array(roadmap.length).fill(0);
    const updatedIndexs = new Array(roadmap.length).fill(0);
    roadmap.forEach((activity, index) => {
      updatedIndexs[index] = activity.activityNo;
      if (activity.activityApproveType === 'APPROVE') {
        updatedFlags[index] = 1;
      }
    });
    setFlags(updatedFlags);
    setActivityIndex(updatedIndexs);
  }, [roadmap]);

  const handleCircleClick = (flag: number, activityNo: number) => {
    if (flag === 0) {
      navigate(`/make-activity?activityNo=${activityNo}`);
    } else {
      navigate(`/activity-content?activityNo=${activityNo}`);
    }
  };
  const renderCirclesWithLabels = () => {
    const totalCircles = 24;
    const circlesPerRow = 4;
    const rows = [];

    for (let i = 0; i < totalCircles; i += circlesPerRow) {
      const row = [];
      const labels = ['1개월', '2개월', '3개월', '4개월', '5개월', '6개월']; // 이 배열을 적절하게 조절하십시오.
      row.push(
        <div key={`label-${i}`} className="label">
          {labels[i / circlesPerRow]}
        </div>,
      );
      for (let j = i; j < i + circlesPerRow && j < totalCircles; j++) {
        row.push(
          <div
            key={j}
            className={`circle ${flags[j] === 1 ? 'filled' : ''}`}
            onClick={() => handleCircleClick(flags[j], activityIndex[j])}
          >
            {flags[j] === 1 && <CheckIcon style={{ fontSize: '33px', color: 'white' }} />}{' '}
          </div>,
        );
      }
      rows.push(
        <div key={`row-${i}`} className="circle-row">
          <div className="small-circle">
            <div className="line"></div>
            <button></button>
          </div>
          {row}
        </div>,
      );
    }

    return rows;
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Link style={{ fontSize: '20px', fontWeight: 'bold' }} to={{ pathname: '/contract' }}>
          <ArrowBackIosNewIcon />
        </Link>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>도전 올리사랑</div>
      </div>

      <div className="explaination">
        올리사랑이란 하숙하는 대학생이 어르신과 한 교감 활동을 인증하는 곳입니다. 여러분의 경험을 공유해주세요.
      </div>

      <div className="circle-container">{renderCirclesWithLabels()}</div>
    </div>
  );
};

export default ActivityCertification;
