'use client';
import React, { useState, useRef, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const carouselRef = useRef(null);

  // Sample images - replace with your actual images
  const images = [
    { src: '/images/image1.jpg', alt: 'Image 1' },
    { src: '/images/image2.jpg', alt: 'Image 2' },
    { src: '/images/image3.jpg', alt: 'Image 3' },
    { src: '/images/image4.jpg', alt: 'Image 4' },
    { src: '/images/image5.jpg', alt: 'Image 5' },
        { src: '/images/image6.jpg', alt: 'Image 6' },
            { src: '/images/image7.jpg', alt: 'Image 7' },
                { src: '/images/image8.jpg', alt: 'Image 8' },
  ];

  const imageWidth = 210; // Image width + margin
  const visibleImages = 4;
  const maxPosition = -(images.length - visibleImages) * imageWidth;

  const handleNext = () => {
    setCurrentPosition(prev => {
      const newPosition = prev - imageWidth;
      return newPosition < maxPosition ? maxPosition : newPosition;
    });
  };

  const handlePrev = () => {
    setCurrentPosition(prev => {
      const newPosition = prev + imageWidth;
      return newPosition > 0 ? 0 : newPosition;
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-blue-600 text-2xl font-bold mb-5">CarouSlide</h1>
      
      <div className="flex items-center justify-between w-full max-w-4xl">
        <button
          onClick={handlePrev}
          disabled={currentPosition === 0}
          className="px-4 py-2 bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Previous
        </button>

        <div className="w-[840px] overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${currentPosition}px)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => openModal(image)}
                className="w-[200px] h-[200px] flex-shrink-0 mr-[10px] object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPosition <= maxPosition}
          className="px-4 py-2 bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
          onClick={closeModal}
        >
          <span
            className="absolute right-8 top-4 text-white text-3xl font-bold cursor-pointer hover:opacity-80"
            onClick={closeModal}
          >
            &times;
          </span>
          <img
            src={selectedImage.src.replace('200/200', '400/400')}
            alt={selectedImage.alt}
            className="max-w-[90%] max-h-[90%] transform scale-100 opacity-100 transition-all duration-300"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
