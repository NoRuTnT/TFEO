import React, { useState, useEffect } from 'react';
import '../styles/ImageSlider.css';

type ImageSliderProps = {
  images: string[];
};
const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden whitespace-nowrap">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`inline-block w-full transition-transform duration-300 ease-in-out transform ${
              index === currentIndex
                ? 'translate-x-0'
                : index === currentIndex - 1
                  ? '-translate-x-full'
                  : 'translate-x-full'
            }`}
          />
        ))}
      </div>
      <button className="absolute top-1/2 left-0 z-10" onClick={goToPrevious}>
        Prev
      </button>
      <button className="absolute top-1/2 right-0 z-10" onClick={goToNext}>
        Next
      </button>
    </div>
  );
};

export default ImageSlider;
