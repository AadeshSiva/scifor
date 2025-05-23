import React from "react";

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ 
  onClick, 
  className = "" 
}) => {
  return (
    <div 
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      aria-label="Close"
      tabIndex={0}
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M14.1142 15.9998L3.72363 5.60925L5.60925 3.72363L15.9998 14.1141L26.3903 3.72363L28.2759 5.60925L17.8854 15.9998L28.2759 26.3902L26.3903 28.276L15.9998 17.8854L5.60925 28.276L3.72363 26.3902L14.1142 15.9998Z" 
          fill="black"
        />
      </svg>
    </div>
  );
};
