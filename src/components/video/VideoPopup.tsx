import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoPopup = ({ videos = [] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = position / (documentHeight - windowHeight);
      
      setScrollPosition(scrollPercentage);
      
      // Removed auto-expand behavior - only expand on click now
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setShowOverlay(false);
    }
  };

  const handleClose = () => {
    if (isExpanded) {
      // Minimize back to default when expanded
      setIsExpanded(false);
      setShowOverlay(true);
    } else {
      // Hide completely when minimized
      setIsVisible(false);
    }
  };

  const handleUnmute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNavigation = (page) => {
    navigate("/" + `${page}`)
  };

  if (!isVisible) return null;

  const currentVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ease-in-out ${
        isExpanded
          ? 'bottom-4 left-4 w-[800px] h-[500px]'
          : 'bottom-4 left-4 w-80 h-48'
      }`}
    >
      <div className="relative w-full h-full">
        {/* Close/Minimize button */}
        <button
          onClick={handleClose}
          className={`absolute z-20 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 transition-colors ${
            isExpanded ? 'top-4 right-4' : 'top-2 right-2'
          }`}
        >
          {isExpanded ? (
            // Minimize icon
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          ) : (
            // Close icon
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Unmute button */}
        <button
          onClick={handleUnmute}
          className={`absolute z-20 bg-black bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 transition-colors ${
            isExpanded ? 'bottom-6 right-6' : 'bottom-3 left-3'
          }`}
        >
          {isMuted ? (
            // Muted icon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            // Unmuted icon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Video container */}
        <div 
          className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl cursor-pointer"
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            className="w-full h-full"
            src="https://ik.imagekit.io/je0rl3nnt/63Qa3wVBkJ-r5QoRy7KVM-240p.mp4/ik-video.mp4?updatedAt=1748406554368"
            autoPlay
            muted
            loop
            playsInline
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Navigation buttons for expanded state */}
        {isExpanded && (
          <>
            {/* Professional Navigation Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-5 ">
              <button
                onClick={(e) => { e.stopPropagation(); handleNavigation('coi'); }}
                className="bg-black bg-opacity-80 hover:bg-opacity-90 text-white px-4 py-2 text-sm font-light tracking-wide transition-all duration-200 rounded-md backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-30"
              >
                COI
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNavigation(''); }}
                className="bg-black bg-opacity-80 hover:bg-opacity-90 text-white px-4 py-2 text-sm font-light tracking-wide transition-all duration-200 rounded-md backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-30"
              >
                WINNING
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNavigation(''); }}
                className="bg-black bg-opacity-80 hover:bg-opacity-90 text-white px-4 py-2 text-sm font-light tracking-wide transition-all duration-200 rounded-md backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-30"
              >
                FREE
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNavigation('join'); }}
                className="bg-black bg-opacity-80 hover:bg-opacity-90 text-white px-4 py-2 text-sm font-light tracking-wide transition-all duration-200 rounded-md backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-30"
              >
                JOIN
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNavigation('chat'); }}
                className="bg-black bg-opacity-80 hover:bg-opacity-90 text-white px-4 py-2 text-sm font-light tracking-wide transition-all duration-200 rounded-md backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-30"
              >
                LIVE
              </button>
            </div>

            {/* Video details overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6 pointer-events-none">
              <h3 className="text-white text-2xl font-bold mb-2">
                Jeff Cullen's Double-Digit Multiple Exit Story
              </h3>
              <p className="text-gray-300 text-lg">
                Learn how Jeff built and sold his company using the Unifying Philosophy: Prosperity For All
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPopup;