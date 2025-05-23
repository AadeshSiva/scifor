import React from 'react';

interface ChatMessageProps {
  message: string;
  sender: string;
  time: string;
  isSent?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, time, isSent = false }) => {
  return (
    <div className="flex flex-col">
      {!isSent && (
        <div className="flex items-stretch gap-4 text-base text-black">
          <div className="aspect-[1/1] bg-[#555] flex w-8 shrink-0 h-8 fill-[#555] rounded-[50%]" />
          <div className="my-auto">{sender}</div>
        </div>
      )}
      <div className={`
        ${isSent ? 'bg-neutral-100 ml-auto text-right' : 'bg-white ml-12 max-md:ml-2.5'}
        text-[#555] border w-[305px] max-w-full overflow-hidden text-sm font-normal mt-2 px-4 py-3.5 rounded-[50px] border-[rgba(158,158,158,0.5)] border-solid
      `}>
        {message}
      </div>
      <div className={`
        flex items-stretch gap-4 text-[10px] text-[#9E9E9E] mt-2
        ${isSent ? 'justify-end' : 'ml-[65px] max-md:ml-2.5'}
      `}>
        {isSent ? (
          <>
            <img src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/8c5d06c70f257b35a06b5224c23f25d502067866?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 shrink-0" alt="Status" />
            <img src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/92ffac224e75912ae901dbf26c74cd54bcaa21ce?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 shrink-0" alt="Status" />
            <img src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/1c06eb7f7e9ccafc99b46042050de7691a21af18?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 shrink-0" alt="Status" />
          </>
        ) : (
          <>
            <div>{time}</div>
            <img src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/7d8fb3654431f8720b1daa1554617a154182757a?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 shrink-0" alt="Status" />
            <img src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/690ecad474efa0bc35f5f88d586aa2ae146b1b0f?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 shrink-0" alt="Status" />
          </>
        )}
        {isSent && <div>{time}</div>}
      </div>
    </div>
  );
};