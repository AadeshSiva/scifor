import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const FloatingButton = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  const navigate = useNavigate()
  const handleFloatingClick = () => {
    navigate("/article")
  }
  return (
    <div>
      {showFloatingButton && (
        <div className="fixed left-4 top-20 z-50 max-sm:left-2 max-sm:top-16 p-5 px-0 flex">
          <div className="bg-[#0000001f] text-black rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center group">
            <button className="bg-[#00000005] text-black text-lg font-medium py-4 px-6 rounded-l-lg  transition-colors duration-300 whitespace-nowrap max-sm:px-4 max-sm:py-3 max-sm:text-sm" onClick={() => handleFloatingClick()}>
              6 Proven Steps - Watch Now
            </button>
            <div className="h-full w-px bg-transparent"></div>
          </div>
          <button
            onClick={() => setShowFloatingButton(false)}
            className="px-3 py-4 bg-none rounded-r-lg transition-colors duration-300 flex items-center justify-center max-sm:px-2 max-sm:py-3"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-sm:w-4 max-sm:h-4">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
export default FloatingButton
