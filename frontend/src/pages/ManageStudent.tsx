import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/ManagerFooter';
import '../styles/ManageStudent.css';
import HomeIcon from '@mui/icons-material/Home';

// 학생 타입을 정의합니다.
interface Student {
  id: number;
  name: string;
  gender: string;
  college: string;
  isNew: boolean;
}

const students: Student[] = [
  {
    id: 1,
    name: '김사람',
    gender: '남성',
    college: '서울대학교',
    isNew: true,
  },
  {
    id: 2,
    name: '이사람',
    gender: '여성',
    college: '연세대학교',
    isNew: false,
  },
  {
    id: 3,
    name: '박사람',
    gender: '남성',
    college: '고려대학교',
    isNew: true,
  },
  {
    id: 4,
    name: '김사람',
    gender: '남성',
    college: '서울대학교',
    isNew: true,
  },
  {
    id: 5,
    name: '이사람',
    gender: '여성',
    college: '연세대학교',
    isNew: false,
  },
  {
    id: 6,
    name: '박사람',
    gender: '남성',
    college: '고려대학교',
    isNew: true,
  },
  {
    id: 7,
    name: '김사람',
    gender: '남성',
    college: '서울대학교',
    isNew: true,
  },
  {
    id: 8,
    name: '이사람',
    gender: '여성',
    college: '연세대학교',
    isNew: false,
  },
  {
    id: 9,
    name: '박사람',
    gender: '남성',
    college: '고려대학교',
    isNew: true,
  },
];
const ManageStudent: React.FC = () => {
  return (
    <div className="main-page">
      <header className="student-header">
        <Link to="/home" className="home-button">
          <HomeIcon />
        </Link>
        <h1 style={{ margin: 'auto' }}>학생 관리</h1>
      </header>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-item">
            {student.name}
            {student.gender}
            {student.isNew && <span className="new-badge">new!</span>}
          </div>
        ))}
      </div>
      <div style={{ height: '700px' }}>sadasd</div>
      <Footer />
    </div>
  );
};

export default ManageStudent;
