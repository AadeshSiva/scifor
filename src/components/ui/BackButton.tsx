import React from "react";

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-stretch gap-[18px] text-2xl text-[#555] font-medium whitespace-nowrap"
      onClick={onClick}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/651bc07c350e428f8b2623e57cac49d1/a11c7472bfe42251d9b4ff6afa27adc98ff2fb8c?placeholderIfAbsent=true"
        className="aspect-[1] object-contain w-6 shrink-0 my-auto"
        alt="Back arrow"
      />
      <span className="text-[#555]">Back</span>
    </button>
  );
};
