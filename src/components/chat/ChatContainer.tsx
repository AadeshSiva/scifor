
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';

export const ChatContainer: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  return (
    <main className="flex flex-col h-full">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="text-[#555] self-center border border-[color:var(--Ash,#9E9E9E)] min-h-8 w-[72px] gap-2.5 text-sm font-normal whitespace-nowrap mt-6 mx-auto px-2.5 py-1.5 rounded-[40px] border-solid">
          Today
        </div>

        <div className="flex w-full flex-col text-sm text-[#555] font-medium mt-6 px-8 space-y-6">
          <ChatMessage
            message="Hello! I'm your AI assistant. How can I help you today?"
            sender="Alen McCraw"
            time="10:30 AM"
          />
          
          <ChatMessage
            message="Making good progress ! I'll share to you"
            sender="You"
            time="10:32 AM"
            isSent={true}
          />
        </div>

        <div className="flex w-full flex-col mt-8 px-8 space-y-6">
          <ChatMessage
            message="Sure ! Let me share you the details now"
            sender="Alen McCraw"
            time="10:30 AM"
          />
          
          <ChatMessage
            message="Making good progress ! I'll share to you"
            sender="You"
            time="10:32 AM"
            isSent={true}
          />

          <div className="bg-neutral-100 border flex min-h-8 w-8 flex-col overflow-hidden items-center justify-center h-8 mt-4 ml-12 px-[5px] rounded-[50px] border-[rgba(158,158,158,0.3)] border-solid">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/51cdb0705006073f38cfde385eb4796c930c93f2?placeholderIfAbsent=true"
              alt="More"
              className="aspect-[1.67] object-contain w-full"
            />
          </div>
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  );
};
