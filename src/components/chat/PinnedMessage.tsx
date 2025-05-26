import React, { useState } from "react";

// Icons as inline SVG components
const BackArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.13301 12.8332H23.3332V15.1665H9.13301L15.391 21.4244L13.7411 23.0743L4.6665 13.9999L13.7411 4.92529L15.391 6.5752L9.13301 12.8332Z"
      fill="black"
    />
  </svg>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
      fill="#555555"
    />
  </svg>
);

const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 21.5C6.47715 21.5 2 17.0228 2 11.5C2 5.97715 6.47715 1.5 12 1.5C17.5228 1.5 22 5.97715 22 11.5C22 17.0228 17.5228 21.5 12 21.5ZM12 19.5C16.4183 19.5 20 15.9183 20 11.5C20 7.08172 16.4183 3.5 12 3.5C7.58172 3.5 4 7.08172 4 11.5C4 15.9183 7.58172 19.5 12 19.5ZM11 6.5H13V8.5H11V6.5ZM11 10.5H13V16.5H11V10.5Z"
      fill="#555555"
    />
  </svg>
);

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.9998 14.6667V10.6667L21.3332 16.0001L15.9998 21.3334V17.3334H10.6665V14.6667H15.9998ZM15.9998 2.66675C23.3598 2.66675 29.3332 8.64008 29.3332 16.0001C29.3332 23.3601 23.3598 29.3334 15.9998 29.3334C8.63984 29.3334 2.6665 23.3601 2.6665 16.0001C2.6665 8.64008 8.63984 2.66675 15.9998 2.66675ZM15.9998 26.6667C21.8932 26.6667 26.6665 21.8934 26.6665 16.0001C26.6665 10.1067 21.8932 5.33341 15.9998 5.33341C10.1065 5.33341 5.33317 10.1067 5.33317 16.0001C5.33317 21.8934 10.1065 26.6667 15.9998 26.6667Z"
      fill="#555555"
    />
  </svg>
);

const CollapseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="22"
    height="18"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="16" fill="#F5F5F5" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#9E9E9E" strokeOpacity="0.3" />
    <path
      d="M16 16.884L20.1249 12.7593L21.3034 13.9378L16 19.2411L10.6968 13.9378L11.8753 12.7593L16 16.884Z"
      fill="black"
    />
  </svg>
);

// Message Item Component
interface MessageItemProps {
  date?: string;
  content: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ date, content }) => {
  return (
    <>
      {date && (
        <div className="border text-[#555] text-sm font-normal bg-white p-2.5 rounded-[40px] border-solid border-[#9e9e9e]">
          {date}
        </div>
      )}
      <div className="w-[416px] text-[#555] text-sm font-normal leading-7 border bg-neutral-100 pt-7 pb-[27px] px-2 rounded-3xl border-solid border-[rgba(158,158,158,0.4)] max-md:w-full max-md:max-w-[416px] max-sm:w-full max-sm:p-5">
        {content}
      </div>
      <div className="my-4 cursor-pointer">
        <ShareIcon />
      </div>
    </>
  );
};

// Main Pinned Messages Component
interface PinnedMessagesProps {
  messages: {
    date: string;
    content: string;
  }[];
  totalMessages: number;
}

const PinnedMessages: React.FC<PinnedMessagesProps> = ({ messages, totalMessages }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery("");
    }
  };

  return (
    <div className="flex-1 flex flex-col relative max-sm:pb-20">
      {/* Header */}
      <header className="w-full shadow-[0_5px_6.7px_0_rgba(0,0,0,0.15)] relative bg-white border-b-[#9e9e9e] border-b border-solid max-sm:px-4 max-sm:py-0">
        {searchVisible ? (
          <form className="flex items-center h-20 px-8 py-0" onSubmit={(e) => e.preventDefault()}>
            <button
              type="button"
              className="mr-4 cursor-pointer"
              onClick={toggleSearch}
              aria-label="Back to messages"
            >
              <BackArrowIcon />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pinned messages..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              aria-label="Search messages"
            />
          </form>
        ) : (
          <div className="flex items-center h-20 px-8 py-0">
            <button
              className="mr-6 cursor-pointer"
              aria-label="Go back"
            >
              <BackArrowIcon />
            </button>
            <div className="text-black text-lg font-normal flex-1">
              {totalMessages} pinned messages
            </div>
            <div className="flex gap-7">
              <button
                className="cursor-pointer"
                onClick={toggleSearch}
                aria-label="Search messages"
              >
                <SearchIcon />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => setShowInfo(!showInfo)}
                aria-label="Show information"
              >
                <InfoIcon />
              </button>
            </div>
          </div>
        )}

        {showInfo && (
          <div className="absolute top-20 right-0 w-64 p-4 bg-white shadow-lg rounded-lg z-10 border border-gray-200">
            <h3 className="font-medium mb-2">About Pinned Messages</h3>
            <p className="text-sm text-gray-600">
              Pinned messages are important messages that have been marked for easy reference.
              You can unpin messages individually or all at once.
            </p>
          </div>
        )}
      </header>

      {/* Message List */}
      <div className="flex-1 flex flex-col items-center gap-4 overflow-y-auto pt-14 pb-0 px-[370px] max-md:pt-14 max-md:pb-0 max-md:px-10 max-sm:p-5">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
            <MessageItem
              key={index}
              date={index === 0 || filteredMessages[index-1].date !== message.date ? message.date : undefined}
              content={message.content}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-xl mb-2">No messages found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button className="fixed w-8 h-8 flex justify-center items-center border cursor-pointer bg-neutral-100 rounded-[50px] border-solid border-[rgba(158,158,158,0.3)] right-[52px] bottom-[153px]">
        <CollapseIcon />
      </button>

      {/* Footer */}
      <div className="text-black text-lg font-medium fixed h-[72px] shadow-[0_-5px_6.7px_0_rgba(0,0,0,0.2)] bg-neutral-100 border-t-[#9e9e9e] border-t border-solid left-[328px] right-0 bottom-0 max-md:left-[280px] max-sm:left-0 max-sm:bottom-20 flex items-center justify-center cursor-pointer">
        Unpin all the {totalMessages} messages
      </div>
    </div>
  );
};

export default PinnedMessages;
