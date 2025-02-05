'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

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
              <div
                key={index}
                className="relative w-[200px] h-[200px] flex-shrink-0 mr-[10px] cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => openModal(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
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
          <div className="relative w-[90%] h-[90%] max-w-[800px] max-h-[800px]" onClick={e => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="(max-width: 800px) 90vw, 800px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
