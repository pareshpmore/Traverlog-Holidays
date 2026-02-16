import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const ImageCarousel = ({ images: propImages = [], className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Ensure we always have an array of images, using the first image if gallery is empty
  const images = propImages && propImages.length > 0 
    ? propImages 
    : propImages[0] 
      ? [propImages[0]] 
      : [];

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (images.length <= 1 || isPaused || isLightboxOpen) return;

    const timer = setTimeout(() => {
      goToNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, goToNext, images.length, isLightboxOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrev]);

  const openLightbox = () => {
    if (images.length === 0) return;
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-xl flex items-center justify-center aspect-video ${className}`}>
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const renderImage = (img, index, isLightbox = false) => (
    <div className={`relative ${isLightbox ? 'h-full w-full' : 'w-full aspect-video'} bg-gray-100 flex items-center justify-center`}>
      <img 
        src={img} 
        alt={`Slide ${index + 1}`} 
        className={`${isLightbox ? 'max-h-[90vh] max-w-[90vw] object-contain' : 'w-full h-full object-cover'}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Available';
        }}
      />
      
      {!isLightbox && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            openLightbox();
          }}
          className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="View fullscreen"
        >
          <Maximize2 size={20} />
        </button>
      )}
    </div>
  );

  const renderNavigation = (isLightbox = false) => (
    <>
      {/* Navigation Arrows */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        className={`absolute left-2 top-1/2 -translate-y-1/2 ${
          isLightbox 
            ? 'bg-white/90 text-black p-3 hover:bg-white' 
            : 'bg-black/50 text-white p-2 hover:bg-black/70'
        } rounded-full transition-colors z-10`}
        aria-label="Previous image"
      >
        <ChevronLeft size={isLightbox ? 32 : 24} />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className={`absolute right-2 top-1/2 -translate-y-1/2 ${
          isLightbox 
            ? 'bg-white/90 text-black p-3 hover:bg-white' 
            : 'bg-black/50 text-white p-2 hover:bg-black/70'
        } rounded-full transition-colors z-10`}
        aria-label="Next image"
      >
        <ChevronRight size={isLightbox ? 32 : 24} />
      </button>
      
      {/* Dots Indicator */}
      <div className={`absolute ${
        isLightbox ? 'bottom-8' : 'bottom-4'
      } left-1/2 -translate-x-1/2 flex space-x-2 z-10`}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex 
                ? isLightbox ? 'bg-white' : 'bg-white' 
                : isLightbox ? 'bg-white/50' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Main Carousel */}
      <div 
        className={`relative w-full overflow-hidden rounded-xl shadow-lg ${className} ${
          isLightboxOpen ? 'pointer-events-none' : ''
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="w-full cursor-zoom-in"
          onClick={openLightbox}
        >
          {renderImage(images[currentIndex], currentIndex)}
        </div>
        
        {images.length > 1 && renderNavigation()}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              {renderImage(images[currentIndex], currentIndex, true)}
              {images.length > 1 && renderNavigation(true)}
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
