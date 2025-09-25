import React, { useState } from "react";
interface ChatInputProps {
  onSendMessage: (message: string) => void;
}
export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-100 flex items-center gap-5 p-4 border-t border-[rgba(158,158,158,0.5)]"
    >
      <button
        type="button"
        className="bg-white border flex items-center justify-center w-10 h-10 rounded-full border-[rgba(158,158,158,0.4)]"
        aria-label="Add attachment"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/7c47b14f4c91951ba468d12d0bb3fc531dc69cf6?placeholderIfAbsent=true"
          alt="Attachment"
          className="w-6 h-6"
        />
      </button>
      <div className="bg-white border flex items-center gap-4 flex-1 px-6 py-3 rounded-full border-[rgba(158,158,158,0.4)]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/e4cae3bf31c9e7be9eedcf6724f1aa2ea68c799e?placeholderIfAbsent=true"
          alt="Message"
          className="w-6 h-6 flex-shrink-0"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tap to send message.."
          className="text-[#555] text-sm w-full bg-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-7 h-7 flex-shrink-0"
        aria-label="Send message"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/cafe91e8951d070236a4b79e0e29afca7846e137?placeholderIfAbsent=true"
          alt="Send"
          className="w-full h-full"
        />
      </button>
    </form>
  );
};
