import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/ManagerFooter';
import '../../styles/ManageStudent.css';
import HomeIcon from '@mui/icons-material/Home';

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
    isNew: true,
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
    isNew: false,
  },
  {
    id: 7,
    name: '김사람',
    gender: '남성',
    college: '서울대학교',
    isNew: false,
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
    isNew: false,
  },
];
const ManageStudent: React.FC = () => {
  return (
    <div>
      <header className="student-header">
        <Link to="/manager-home" className="home-button">
          <HomeIcon style={{ color: 'white', fontSize: '30px' }} />
        </Link>
        <h1 style={{ margin: 'auto', color: 'white', fontSize: '22px' }}>학생 관리</h1>
      </header>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-item">
            <div className="date">2024-04-01 22:17:34</div>
            <div className="info">
              {student.name}
              <div className="info-detail">({student.gender} / 나이)</div>
              <div className="isNew">{student.isNew && <span>new!</span>}</div>
            </div>
            <div style={{ color: 'gray' }}> {student.college} 재학생</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ManageStudent;
