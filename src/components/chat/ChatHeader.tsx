import React from "react";
export const ChatHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[rgba(158,158,158,0.3)]">
      <div className="flex items-center gap-4">
        <div className="bg-[#555] w-12 h-12 rounded-full flex-shrink-0" />
        <div className="text-lg text-black font-medium">
          Anonymous Group Chat
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button aria-label="Notifications" className="p-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/5654b83e9135bc4b8f23f87b527c763b7577882e?placeholderIfAbsent=true"
            alt="Notifications"
            className="w-6 h-6"
          />
        </button>
        <button aria-label="Settings" className="p-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/2afd196470d8cd2b8e530a6a827dd51f86323b0a?placeholderIfAbsent=true"
            alt="Settings"
            className="w-6 h-6"
          />
        </button>
      </div>
    </header>
  );
};
