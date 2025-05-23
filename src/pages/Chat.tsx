import React, { useState, useRef, useEffect } from 'react';
import Setting from '@/components/settings/Settings';
import ProfileForm from '@/components/settings/ProfileForm';
import { PasswordChangeForm } from '@/components/settings/PasswordChangeForm';
import EmailSettings from '@/components/settings/EmailSettings';
import ChangeUsernameForm from '@/components/settings/ChangeUsernameForm';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isUser: boolean;
  replyTo?: Message | null;
}

const Chat = () => {
  const userName = "John";
  const [message, setMessage] = useState('');
  const [display,setDisplay] = useState('chat')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Alen McCraw",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      time: "10:30 AM",
      isUser: false
    },
    {
      id: 2,
      sender: userName,
      text: "Making good progress! I'll share with you",
      time: "10:32 AM",
      isUser: true
    },
    {
      id: 3,
      sender: "Alen McCraw",
      text: "Sure! Let me share the details now",
      time: "10:33 AM",
      isUser: false
    },
    {
      id: 4,
      sender: userName,
      text: "I've been working on the project all day. What do you think about adding more features to the dashboard?",
      time: "10:35 AM",
      isUser: true
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      text: "That sounds like a great idea! We could include analytics and reporting features.",
      time: "10:36 AM",
      isUser: false
    },
    {
      id: 6,
      sender: "Michael Chen",
      text: "I agree with Sarah. Let's discuss this in our next meeting.",
      time: "10:37 AM",
      isUser: false
    }
  ]);
  const [pinnedMessages, setpinnedMessages] = useState([
    {
      id: 1,
      text: "Friendly reminder: Keep it respectful and on-topic. Everyone's voice matters here — even behind a mask.",
      isPinned: true
    },
    {
      id: 2,
      text: "Team meeting scheduled for Friday at 2 PM EST.",
      isPinned: true
    }
  ]);
  const [currentPinnedMessage, setCurrentPinnedMessage] = useState(0);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef(null);
  
  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Function to cycle through pinned messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPinnedMessage((prev) => 
        (prev + 1) % pinnedMessages.length
      );
    }, 10000); // Change pinned message every 10 seconds
    
    return () => clearInterval(interval);
  }, [pinnedMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: userName,
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
      replyTo: replyingTo
    };
    
    setMessages([...messages, newMessage]);
    setReplyingTo(null);
    
    // Simulate received message
    if (messages.length % 2 === 0) {
      setTimeout(() => {
        const botNames = ["Alen McCraw", "Sarah Johnson", "Michael Chen"];
        const randomResponses = [
          "Thanks for the update!",
          "That's fantastic progress.",
          "Let's discuss this further in our next meeting.",
          "I appreciate your input on this matter.",
          "Could you provide more details?",
          "I'll look into that and get back to you soon."
        ];
        
        const botResponse = {
          id: messages.length + 2,
          sender: botNames[Math.floor(Math.random() * botNames.length)],
          text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(message);
    setMessage('');
  };
  
  const handleReply = (message) => {
    setReplyingTo(message);
  };
  
  const handleCancelReply = () => {
    setReplyingTo(null);
  };
  
  const handlePinMessage = (messageId) => {
    const messageToPin = messages.find(msg => msg.id === messageId);
    if (messageToPin) {
      setpinnedMessages([...pinnedMessages, {
        id: pinnedMessages.length + 1,
        text: messageToPin.text,
        isPinned: true
      }]);
    }
  };
  
  const getMenuItems = () => {
    return [
      { id: 1, title: 'Group Chat', icon: 'menu-item-icon' },
      { id: 2, title: 'Ai Chat Bot (coming soon)', icon: 'menu-item-icon' },
      ...Array(8).fill(null).map((_, index) => ({ 
        id: index + 3, 
        title: 'Item Title', 
        icon: 'menu-item-icon'
      }))
    ];
  };

  return (
    <div className="bg-white h-screen flex overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <nav className="w-[300px] flex-shrink-0 flex flex-col overflow-hidden bg-neutral-100 h-full border-r border-[rgba(158,158,158,0.3)]">
          <div className="flex items-center gap-2.5 pl-6 pr-2.5 py-4 border-b border-[rgba(158,158,158,0.3)]">
            <div className="w-8 h-8 bg-[#555] rounded-full flex items-center justify-center text-white text-xs">
              {userName.charAt(0)}
            </div>
            <div className="text-xl text-black font-semibold">
              Welcome {userName} 👋
            </div>
          </div>
          
          <div className="bg-white flex items-center gap-2 px-6 py-3.5 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z" fill="#555"/>
            </svg>
            <div className="text-xl font-semibold">
              Anonymous Group Chat
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {getMenuItems().map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center gap-2.5 pl-6 pr-2.5 py-3.5 hover:bg-white cursor-pointer transition-colors ${item.id === 1 ? 'bg-neutral-200' : 'bg-neutral-100'}`}
              >
                <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 2c-4.07 0-7.36 2.13-7.36 4.76V22h14.72v-2.74c0-2.63-3.3-4.76-7.36-4.76z" fill="#555"/>
                </svg>
                <div className=" font-semibold">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto border-t border-[rgba(158,158,158,0.3)]">
            <div className="flex items-center gap-3 pl-6 py-3 hover:bg-white cursor-pointer transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20z" fill="#555"/>
              </svg>
              <div className="text-xl font-semibold">Home</div>
            </div>
            
            <div className="flex items-center gap-3 pl-6 py-3.5 hover:bg-white cursor-pointer transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#555"/>
              </svg>
              <div className="text-xl font-semibold" onClick={()=>{setDisplay('setting')}}>Settings</div>
            </div>
          </div>
        </nav>
      )}

      {display==='chat'?
      <main className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[rgba(158,158,158,0.3)] bg-white">
          <div className="flex items-center gap-4">
            {!showSidebar && (
              <button 
                onClick={() => setShowSidebar(true)}
                className="p-1 hover:bg-neutral-100 rounded-full"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            <div className="w-12 h-12 bg-[#555] rounded-full flex items-center justify-center text-white">
              AG
            </div>
            <div className="text-lg text-black font-medium">
              Anonymous Group Chat
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowSidebar(!showSidebar)} 
              className="p-2 hover:bg-neutral-100 rounded-full"
              aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={showSidebar 
                  ? "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
                  : "M4 6h16M4 12h16M4 18h16"} 
                  fill="#555"/>
              </svg>
            </button>
            <button aria-label="Notifications" className="p-2 hover:bg-neutral-100 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="#555"/>
              </svg>
            </button>
            <button aria-label="Settings" className="p-2 hover:bg-neutral-100 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="#555"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Search bar */}
        <div className="w-full flex items-center justify-center bg-neutral-100 px-5 py-3 border-b border-[rgba(158,158,158,0.3)]">
          <div className="flex items-center gap-4">
            <button aria-label="Toggle down" className="p-1 hover:bg-white rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="#555555"/>
              </svg>
            </button>
            <button aria-label="Toggle up" className="p-1 hover:bg-white rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9999 10.8286L16.9497 15.7783L18.3639 14.3641L11.9999 8.0001L5.63599 14.3641L7.0502 15.7783L11.9999 10.8286Z" fill="#555555"/>
              </svg>
            </button>
          </div>
          
          <div className="mx-4 flex-1 max-w-3xl">
            <div className="w-full h-10 border flex items-center px-4 bg-white rounded-xl border-[rgba(158,158,158,0.4)]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0259 13.8473L18.5948 17.4162L17.4163 18.5947L13.8474 15.0258C12.5641 16.0525 10.9367 16.6666 9.16669 16.6666C5.02669 16.6666 1.66669 13.3066 1.66669 9.16663C1.66669 5.02663 5.02669 1.66663 9.16669 1.66663C13.3067 1.66663 16.6667 5.02663 16.6667 9.16663C16.6667 10.9366 16.0525 12.564 15.0259 13.8473Z" fill="#555555"/>
              </svg>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search" 
                className="ml-4 flex-1 outline-none text-sm text-[#555]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button aria-label="Calendar" className="p-1 hover:bg-white rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9Z" fill="#555555"/>
              </svg>
            </button>
            <button aria-label="Close" className="w-6 h-6 flex justify-center items-center bg-white rounded-full border border-[rgba(158,158,158,0.4)] hover:bg-neutral-100">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0101 9.00037L15.5765 14.5668L14.5663 15.5769L8.99996 10.0106L3.4336 15.5769L2.42346 14.5668L7.98981 9.00037L2.42346 3.43408L3.4336 2.42387L8.99996 7.99023L14.5663 2.42387L15.5765 3.43408L10.0101 9.00037Z" fill="#555555"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Pinned Messages */}
        <div className="bg-neutral-100 shadow-[0px_2px_6px_rgba(0,0,0,0.1)] flex items-center px-5 py-3 border-b border-[rgba(158,158,158,0.3)]">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-[10px] font-medium">
              <div className="bg-black w-1 h-5 rounded-full" />
              <div className="text-black">
                Pinned Messages ({pinnedMessages.length})
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-[#555]">
              <div className="bg-[rgba(217,217,217,1)] w-1 h-5 rounded-full" />
              <div className="truncate pr-4">
                {pinnedMessages[currentPinnedMessage]?.text}
              </div>
            </div>
          </div>
          <button 
            aria-label="Pin Message" 
            className="p-2 hover:bg-white rounded-full flex-shrink-0"
            onClick={() => setCurrentPinnedMessage((currentPinnedMessage + 1) % pinnedMessages.length)}
          >
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 11V3h.5C15.33 3 16 2.33 16 1.5S15.33 0 14.5 0h-9C4.67 0 4 .67 4 1.5S4.67 3 5.5 3H6v8c0 2.97-2.16 5-5 5v2h7v7l1 1 1-1v-7h7v-2c-2.84 0-5-2.03-5-5z" fill="#555"/>
            </svg>
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollBehavior: 'smooth' }}>
          <div className="text-[#555] self-center border border-[#9E9E9E] min-h-8 w-auto gap-2.5 text-sm font-normal whitespace-nowrap mt-4 mx-auto px-4 py-1.5 rounded-[40px] border-solid">
            Today
          </div>

          <div className="flex flex-col space-y-6 mt-6 px-4">
            {messages.filter(msg => 
              searchQuery ? msg.text.toLowerCase().includes(searchQuery.toLowerCase()) : true
            ).map((msg) => (
              <div key={msg.id} className="flex flex-col">
                {msg.isUser ? (
                  <>
                    {/* User message */}
                    <div className={`flex flex-col ${msg.replyTo ? 'mt-2' : 'mt-0'}`}>
                      {msg.replyTo && (
                        <div className="flex items-center gap-2 ml-auto mb-1 text-xs text-[#9E9E9E]">
                          <span>Replying to {msg.replyTo.sender}</span>
                          <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            "{msg.replyTo.text}"
                          </div>
                        </div>
                      )}
                      <div className="bg-neutral-100 ml-auto text-[#555] border w-auto max-w-[70%] overflow-hidden text-sm font-normal px-4 py-3.5 rounded-[20px] border-[rgba(158,158,158,0.5)] border-solid">
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-[#9E9E9E] mt-2 justify-end">
                        <button 
                          onClick={() => handlePinMessage(msg.id)}
                          className="hover:bg-neutral-100 rounded-full p-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 8V4h1.5c.8 0 1.5-.7 1.5-1.5S19.3 1 18.5 1h-13C4.7 1 4 1.7 4 2.5S4.7 4 5.5 4H7v4c0 3-2.2 5-5 5v2h8v7l1 1 1-1v-7h8v-2c-2.8 0-5-2-5-5z" fill="#9E9E9E"/>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleReply(msg)}
                          className="hover:bg-neutral-100 rounded-full p-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="#9E9E9E"/>
                          </svg>
                        </button>
                        <div>{msg.time}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Received Message */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#555] rounded-full flex items-center justify-center text-white text-xs">
                        {msg.sender.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div className="font-medium text-black">{msg.sender}</div>
                    </div>
                    <div className={`flex flex-col ${msg.replyTo ? 'mt-2' : 'mt-0'}`}>
                      {msg.replyTo && (
                        <div className="flex items-center gap-2 ml-12 mb-1 text-xs text-[#9E9E9E]">
                          <span>Replying to {msg.replyTo.sender}</span>
                          <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            "{msg.replyTo.text}"
                          </div>
                        </div>
                      )}
                      <div className="bg-white ml-12 text-[#555] border w-auto max-w-[70%] overflow-hidden text-sm font-normal px-4 py-3.5 rounded-[20px] border-[rgba(158,158,158,0.5)] border-solid">
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-[#9E9E9E] mt-2 ml-12">
                        <div>{msg.time}</div>
                        <button 
                          onClick={() => handlePinMessage(msg.id)}
                          className="hover:bg-neutral-100 rounded-full p-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 8V4h1.5c.8 0 1.5-.7 1.5-1.5S19.3 1 18.5 1h-13C4.7 1 4 1.7 4 2.5S4.7 4 5.5 4H7v4c0 3-2.2 5-5 5v2h8v7l1 1 1-1v-7h8v-2c-2.8 0-5-2-5-5z" fill="#9E9E9E"/>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleReply(msg)}
                          className="hover:bg-neutral-100 rounded-full p-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="#9E9E9E"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Reply to message bar */}
        {replyingTo && (
          <div className="bg-white shadow-[0px_-2px_6px_rgba(0,0,0,0.1)] flex w-full items-center justify-between px-6 py-3 border-t border-[rgba(158,158,158,0.3)]">
            <div className="flex items-center gap-4">
                <button>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9V5l-7 7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="#9E9E9E"/>
              </svg>
            </button>
            </div>
            <div className="flex-1">
              <div className="text-black font-medium">Replying to {replyingTo.sender}</div>
              <div className="text-[#555] mt-1 text-xs truncate max-w-md">{replyingTo.text}</div>
            </div>
            <button 
              onClick={handleCancelReply}
              className="p-1 hover:bg-neutral-100 rounded-full"
              aria-label="Cancel reply"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.586l4.95-4.95 1.415 1.415-4.95 4.95 4.95 4.95-1.415 1.415-4.95-4.95-4.95 4.95-1.415-1.415 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z" fill="#555"/>
              </svg>
            </button>
          </div>
        )}

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="bg-neutral-100 flex items-center gap-4 p-4 border-t border-[rgba(158,158,158,0.5)]">
          <button
            type="button"
            className="bg-white border flex items-center justify-center w-10 h-10 rounded-full border-[rgba(158,158,158,0.4)]"
            aria-label="Add attachment"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" fill="#555"/>
            </svg>
          </button>

          <div className="bg-white border flex items-center gap-3 flex-1 px-5 py-3 rounded-full border-[rgba(158,158,158,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm5 0c.83 0 1.5-.67 1.5-1.5S12.83 8 12 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm5 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" fill="#555"/>
            </svg>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="text-[#555] text-sm w-full bg-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className={`bg-blue-500 flex items-center justify-center w-10 h-10 rounded-full ${!message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            aria-label="Send message"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white"/>
            </svg>
          </button>
        </form>
      </main>:null}
      {display==="setting"?<Setting setDisplay={setDisplay}/>:null}
      {display==="profile"?<ProfileForm/>:null}
      {display==="password"?<PasswordChangeForm/>:null}
      {display==="email"?<EmailSettings/>:null}
      {display==="username"?<ChangeUsernameForm/>:null}
    </div>
  );
};

export default Chat;