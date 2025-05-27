import React, { useState, useEffect } from 'react';
import video from "../../../public/assets/vidoes/63Qa3wVBkJ-7WKbYn1BXV-240p.mp4"

const VideoPopup = ({ videos = [] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = position / (documentHeight - windowHeight);
      
      setScrollPosition(scrollPercentage);
      
      // Expand when user scrolls halfway
      if (scrollPercentage >= 0.5 && !isExpanded) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ease-in-out ${
        isExpanded
          ? 'inset-0 bg-black bg-opacity-75 flex items-center justify-center'
          : 'bottom-4 right-4'
      }`}
    >
      <div
        className={`relative transition-all duration-700 ease-in-out ${
          isExpanded
            ? 'w-full max-w-4xl h-full max-h-[80vh] mx-4'
            : 'w-80 h-48'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute z-10 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 transition-colors ${
            isExpanded ? 'top-4 right-4' : 'top-2 right-2'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video container */}
        <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl">
          {currentVideo ? (
            <iframe
              src={video}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={currentVideo.title || "Jeff Cullen Success Story Video"}
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src="/api/placeholder/800/450"
                alt="Jeff Cullen Success Story Video"
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button
                  aria-label="Play video"
                  className={`bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white transition-colors ${
                    isExpanded ? 'w-20 h-20' : 'w-12 h-12'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`text-black ml-1 ${
                      isExpanded ? 'w-10 h-10' : 'w-6 h-6'
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Video title overlay */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <p className="text-white text-sm font-medium">
                    Watch Jeff's Success Story
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Expanded video details */}
        {isExpanded && !currentVideo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6">
            <h3 className="text-white text-2xl font-bold mb-2">
              Jeff Cullen's Double-Digit Multiple Exit Story
            </h3>
            <p className="text-gray-300 text-lg">
              Learn how Jeff built and sold his company using the Unifying Philosophy: Prosperity For All
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPopup;