import {  ArrowRightCircle, MessageSquare } from 'lucide-react';

const PinnedMessages = ({ messages, totalMessages, onClose, onJumpToMessage }) => {
  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(message => {
      const date = message.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    return grouped;
  };
  const groupedMessages = groupMessagesByDate(messages);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const getDateDisplayText = (date) => {
    return date === today ? 'Today' : date;
  };
  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[rgba(158,158,158,0.3)] bg-white pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="text-lg text-black font-linear">
            {totalMessages} Pinned Messages
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={24} stroke="#9E9E9E" />
            </div>
            <h2 className="text-lg font-medium text-black mb-2">No pinned messages</h2>
            <p className="text-[#9E9E9E] text-sm">Pin important messages to keep them handy for everyone in the chat.</p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                <div className="flex justify-center items-center">
                  <div className="px-3 py-1 bg-white border border-black rounded-full">
                    <span className=" font-medium">
                      {getDateDisplayText(date)}
                    </span>
                  </div>
                </div>
                <div className="space-y-8">
                  {dateMessages.map((message) => (
                    <div key={message.messageId} className="flex items-end gap-3">
                      <div
                        onClick={() => onJumpToMessage(message.messageId)}
                        className="bg-[#cbcbcb66] border max-w-xl border-[rgba(158,158,158,0.3)] rounded-lg p-4 hover:bg-[#d2d2d266] cursor-pointer transition-colors flex-1"
                      >
                        <p className="text-[#555] text-sm leading-relaxed break-words">
                          {message.content || "No content"}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJumpToMessage(message.messageId);
                        }}
                        aria-label="Jump to message"
                        className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <ArrowRightCircle size={24} stroke="#555555" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default PinnedMessages;