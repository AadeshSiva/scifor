import React, { useState, useEffect } from 'react';

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
            <iframe className='w-full h-full' src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-r5QoRy7KVM-240p.mp4/ik-video.mp4?updatedAt=1748406554368&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-r5QoRy7KVM-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406554368&updatedAt=1748406554368" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
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