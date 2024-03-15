import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ActivityCertification.css'; // CSS 파일

const ActivityCertification: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 동그라미 클릭 이벤트 핸들러
  const handleCircleClick = (flag: number) => {
    if (flag === 0) {
      navigate('/make-activity'); // flag가 1이면 활동내역 만들기 페이지로 이동
    } else {
      navigate('/activity-content'); // 그렇지 않으면 활동내역보기 페이지로 이동
    }
  };

  // 동그라미를 그룹화하여 줄 바꿈을 처리
  const renderCircles = () => {
    const totalCircles = 26; // 총 동그라미 수
    const circlesPerRow = 3; // 줄 당 동그라미 수
    const flags = new Array(totalCircles).fill(0); // 모든 flag를 0으로 초기화
    flags[0] = 1; // 첫 번째 동그라미의 flag를 1로 설정
    flags[1] = 1; // 두 번째 동그라미의 flag를 1로 설정

    const circles = [];

    for (let i = 0; i < totalCircles; i += circlesPerRow) {
      const row = [];
      for (let j = i; j < i + circlesPerRow && j < totalCircles; j++) {
        row.push(
          <div
            key={j}
            className={`circle ${flags[j] === 1 ? 'filled' : ''}`}
            onClick={() => handleCircleClick(flags[j])} // onClick 이벤트 핸들러 연결
          ></div>,
        );
      }
      circles.push(
        <div key={`row-${i}`} className="circle-row">
          {row}
        </div>,
      );
    }

    return circles;
  };

  return (
    <div className="main-page">
      <div className="circles-container">{renderCircles()}</div>
      <Footer />
    </div>
  );
};

export default ActivityCertification;
