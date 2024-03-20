import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import ImageSlider from '../components/ImageSlider';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import Button from '@mui/material/Button';

const Home: React.FC = () => {
  const images = ['/test/home1.png', '/test/home2.png', '/test/home3.png'];

  return (
    <div className="main-page">
      <Footer />
    </div>
  );
};

export default Home;
