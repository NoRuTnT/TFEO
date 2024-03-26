import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityCertification.css';
import CheckIcon from '@mui/icons-material/Check';

const ActivityCertification: React.FC = () => {
  const navigate = useNavigate();

  const handleCircleClick = (flag: number) => {
    if (flag === 0) {
      navigate('/make-activity');
    } else {
      navigate('/activity-content');
    }
  };

  const renderCirclesWithLabels = () => {
    const totalCircles = 24;
    const circlesPerRow = 4;
    const flags = new Array(totalCircles).fill(0);
    flags[0] = 1;
    flags[1] = 1;

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
            onClick={() => handleCircleClick(flags[j])}
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
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}> 도전 올리사랑</div>
      <div style={{ fontSize: '35px', fontWeight: 'bold', margin: '10px' }}> 도전 올리사랑</div>
      <div className="explaination">
        올리사랑이란 하숙하는 대학생이 어르신과 한 교감 활동을 인증하는 곳입니다. 여러분의 경험을 공유해주세요.
      </div>

      <div className="circle-container">{renderCirclesWithLabels()}</div>
    </div>
  );
};

export default ActivityCertification;
