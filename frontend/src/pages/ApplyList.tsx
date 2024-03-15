import React, { useState } from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/MainPage.css';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import '../styles/ApplyList.css';

// 모달의 스타일 정의
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'transparent', // 배경색을 투명하게 설정
  },
};

// 집 데이터에 대한 타입 정의
type Home = {
  id: number;
  image: string;
  name: string;
  info: string;
  owner: string;
  ownerImage: string;
};

const ApplyList: React.FC = () => {
  const [currentHome, setCurrentHome] = useState<Home | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  // 임의의 집 목록 데이터
  const homes: Home[] = [
    {
      id: 1,
      image: '/test/home1.png',
      name: '집 이름 1',
      info: '집 정보 1',
      owner: '집 주인 1',
      ownerImage: '/test/profile.png',
    },
    {
      id: 2,
      image: '/test/home2.png',
      name: '집 이름 2',
      info: '집 정보 2',
      owner: '집 주인 2',
      ownerImage: '/test/profile.png',
    },
  ];

  const SampleNextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
    <div className={className} style={{ ...style, display: 'block', background: 'grey' }} onClick={onClick} />
  );

  const SamplePrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
    <div className={className} style={{ ...style, display: 'block', background: 'grey' }} onClick={onClick} />
  );

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // 모달을 여는 함수
  const openModal = (text: string) => {
    setIsModalOpen(true);
    setModalContent(text);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-page">
      <div className="background-image-container">
        <img src="/assets/mainLogo.png" alt="로고 이미지" />
      </div>

      <div className="test">
        <Slider {...settings}>
          {homes.map((home) => (
            <div key={home.id}>
              <img src={home.image} alt={home.name} />
              <h2>{home.name}</h2>
              <p>{home.info}</p>
              <div className="owner-info">
                <p>{home.owner}</p>
                <img className="owner-img" src={home.ownerImage} alt={home.owner} />
              </div>
              <div>
                <button className="btn" onClick={() => openModal('1')}>
                  1
                </button>
                <button className="btn" onClick={() => openModal('2')}>
                  2
                </button>
                <button className="btn" onClick={() => openModal('3')}>
                  3
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Example Modal">
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>{modalContent}</div>
      </Modal>

      <Footer />
    </div>
  );
};

export default ApplyList;
