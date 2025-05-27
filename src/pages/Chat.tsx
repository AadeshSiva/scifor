import React, { useState, useRef, useEffect } from 'react';
import Setting from '@/components/settings/Settings';
import ProfileForm from '@/components/settings/ProfileForm';
import { PasswordChangeForm } from '@/components/settings/PasswordChangeForm';
import EmailSettings from '@/components/settings/EmailSettings';
import ChangeUsernameForm from '@/components/settings/ChangeUsernameForm';
import { AlertCircle, Calendar, CalendarHeart, ChartNoAxesColumn, House, MessageSquare, NotepadText, Search, SendHorizonal, Settings, Sticker } from 'lucide-react';
import { useAuth } from '@/utils/AuthContext';
import { HeroSection } from '@/components/chat/LivePage';
import PinnedMessages from '@/components/chat/PinnedMessage';
import VideoPopup from '@/components/video/VideoPopup';

const filterAbusiveContent = async (text) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAsZ7bQiqUZdrAn9FVW1zUUjx6h1JsPZzg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Please analyze this text for abusive, offensive, or inappropriate content. If the text contains abusive words, profanity, hate speech, or inappropriate content, respond with "BLOCKED". If the text is clean and appropriate, respond with "CLEAN". Text to analyze: "${text}"`
          }]
        }]
      })
    });

    const data = await response.json();
    const result = data.candidates[0]?.content?.parts[0]?.text?.trim();
    
    return result === "BLOCKED";
  } catch (error) {
    console.error('Error filtering content:', error);
    // If API fails, allow the message (fail-safe approach)
    return false;
  }
};

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isUser: boolean;
  replyTo?: Message | null;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

interface PollData {
  id: string;
  question: string;
  options: PollOption[];
  allowMultipleAnswers: boolean;
  deadline?: Date;
  createdBy: string;
  createdAt: string;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [display,setDisplay] = useState('chat')
  const { isAuthenticated, isLoading, user } = useAuth();
  const [userName,setUsername] = useState('')
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
      messageId: 1, // Add this field to link to original message
      text: "Friendly reminder: Keep it respectful and on-topic. Everyone's voice matters here — even behind a mask.",
      date: "Today",
      isPinned: true
    },
    {
      id: 2,
      messageId: 2, // Add this field to link to original message
      text: "Team meeting scheduled for Friday at 2 PM EST.",
      date: "Today",
      isPinned: true
    }
  ]);
  const [currentPinnedMessage, setCurrentPinnedMessage] = useState(0);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [inappropriateMessageAlert, setInappropriateMessageAlert] = useState(null);
  const [showSearch,setShowSearch] = useState(false)
  const [showPin,setShowPin] = useState(false)
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollFormData, setPollFormData] = useState({
    question: '',
    options: [
      { id: '1', text: 'Yes ! it will increase', votes: 0, voters: [] },
      { id: '2', text: 'No ! There wont be no rise', votes: 0, voters: [] }
    ],
    allowMultipleAnswers: false,
  });
  const [showPinnedMessagesPage, setShowPinnedMessagesPage] = useState(false);
  const [isAiChatMode, setIsAiChatMode] = useState(false);

  useEffect(() => {
  if (user && user.full_name) {
    setUsername(user.full_name);
  }
}, [user]);

  const jumpToMessage = (messageId) => {
    setDisplay('chat'); // Switch back to chat first
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${messageId}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageElement.classList.add('highlight-message');
        setTimeout(() => {
          messageElement.classList.remove('highlight-message');
        }, 2000);
      }
    }, 100); // Small delay to ensure chat is rendered
  };

  const handleMenuItemClick = (item) => {
    if (item.isAiBot) {
      setIsAiChatMode(true);
      // Reset messages for AI chat
      setMessages([
        {
          id: 1,
          sender: "AI Assistant",
          text: "Hello! I'm your AI assistant. I'm currently in development and will be live in 45 days. How can I help you today?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false,
          isAi: true
        }
      ]);
    } else {
      setIsAiChatMode(false);
      // Reset to group chat messages
      setMessages([
        {
          id: 1,
          sender: "Alen McCraw",
          text: "Hello! I'm your AI assistant. How can I help you today?",
          time: "10:30 AM",
          isUser: false
        },
        // ... rest of original messages
      ]);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  const messagesEndRef = useRef(null);

  const handleAddPollOption = () => {
    setPollFormData(prev => ({
      ...prev,
      options: [...prev.options, { id: String(Date.now()), text: '', votes: 0, voters: [] }]
    }));
  };

  const handleRemovePollOption = (id: string) => {
    setPollFormData(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== id)
    }));
  };
  
  const handleUpdatePollOption = (id: string, text: string) => {
    setPollFormData(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === id ? { ...opt, text } : opt
      )
    }));
  };

  const handlePollSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pollFormData.question.trim() === '') {
      alert('Please enter a question');
      return;
    }
    if (pollFormData.options.length < 2) {
      alert('Please add at least two options');
      return;
    }
    if (pollFormData.options.some(opt => opt.text.trim() === '')) {
      alert('Please fill in all options');
      return;
    }
  
    // Create poll message
    const pollMessage = {
      id: messages.length + 1,
      sender: userName,
      text: '', // Will be handled differently for polls
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
      isPoll: true,
      pollData: {
        id: String(Date.now()),
        question: pollFormData.question,
        options: pollFormData.options,
        allowMultipleAnswers: pollFormData.allowMultipleAnswers,
        createdBy: userName,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };
  
    setMessages([...messages, pollMessage]);
    setShowPollCreator(false);
    setPollFormData({
      question: '',
      options: [
        { id: '1', text: 'Yes ! it will increase', votes: 0, voters: [] },
        { id: '2', text: 'No ! There wont be no rise', votes: 0, voters: [] }
      ],
      allowMultipleAnswers: false,
    });
  };
  
  const handlePollCancel = () => {
    setShowPollCreator(false);
    setPollFormData({
      question: '',
      options: [
        { id: '1', text: 'Yes ! it will increase', votes: 0, voters: [] },
        { id: '2', text: 'No ! There wont be no rise', votes: 0, voters: [] }
      ],
      allowMultipleAnswers: false,
    });
  };
  
  const handlePollVote = (messageId: number, optionId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId && msg.isPoll) {
          const updatedOptions = msg.pollData.options.map(option => {
            if (option.id === optionId) {
              // Check if user already voted
              if (option.voters.includes(userName)) {
                return {
                  ...option,
                  votes: option.votes - 1,
                  voters: option.voters.filter(voter => voter !== userName)
                };
              } else {
                // If not multiple answers allowed, remove vote from other options
                if (!msg.pollData.allowMultipleAnswers) {
                  msg.pollData.options.forEach(opt => {
                    if (opt.id !== optionId && opt.voters.includes(userName)) {
                      opt.votes = opt.votes - 1;
                      opt.voters = opt.voters.filter(voter => voter !== userName);
                    }
                  });
                }
                return {
                  ...option,
                  votes: option.votes + 1,
                  voters: [...option.voters, userName]
                };
              }
            }
            return option;
          });
          
          return {
            ...msg,
            pollData: {
              ...msg.pollData,
              options: updatedOptions
            }
          };
        }
        return msg;
      })
    );
  };
  
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
  
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    
    // Check for abusive content
    const isAbusive = await filterAbusiveContent(messageText);
    
    if (isAbusive) {
      // Show inappropriate message alert in chat
      const alertMessage = {
        id: Date.now(), // Use timestamp as unique ID
        type: 'inappropriate',
        text: 'Your message contains inappropriate content and cannot be sent.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setInappropriateMessageAlert(alertMessage);
      
      // Clear the alert after 5 seconds
      setTimeout(() => {
        setInappropriateMessageAlert(null);
      }, 5000);
      
      return;
    }
    
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

    if (isAiChatMode) {
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: "AI Assistant",
          text: "Thank you for your message! I'm currently in development and will be fully operational in 45 days. Once live, I'll be able to provide comprehensive assistance with your queries.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false,
          isAi: true
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1500);
    } else {
    
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
  };}

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSendMessage(message);
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
    if (messageToPin && !pinnedMessages.some(pm => pm.messageId === messageId)) {
      setpinnedMessages([...pinnedMessages, {
        id: pinnedMessages.length + 1,
        messageId: messageId, // Link to original message
        text: messageToPin.text,
        date: "Today", // You can make this dynamic based on message date
        isPinned: true
      }]);
    }
  };
  
  const getMenuItems = () => {
    return [
      { id: 1, title: 'Group Chat', icon: 'menu-item-icon' },
      { id: 2, title: 'Ai Chat Bot (coming soon)', icon: 'menu-item-icon', isAiBot: true },
      ...Array(8).fill(null).map((_, index) => ({ 
        id: index + 3, 
        title: 'Item Title', 
        icon: 'menu-item-icon'
      }))
    ];
  };

  return (
    <div className="bg-white h-[calc(100vh-86px)] flex overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
  <nav className="w-[300px] flex-shrink-0 flex flex-col overflow-hidden bg-neutral-100 h-full border-r">
          <div className="flex items-center gap-2.5 px-6 py-4">
            <div className="w-8 h-8 bg-[#555] rounded-full flex items-center justify-center text-white text-xs">
              {userName.charAt(0)}
            </div>
            <div className=" text-black font-normal font-linear">
              Welcome {userName} 👋
            </div>
          </div>

          <div className=" flex items-center gap-2 px-6 py-3.5">
            <MessageSquare />
            <div className=" font-normal font-linear">
              Anonymous Group Chat
            </div>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col">
          {getMenuItems().map((item) => (
  <div 
    key={item.id} 
    className={`flex items-center gap-2.5 px-6 py-2.5 hover:bg-white cursor-pointer transition-colors ${
      (item.id === 1 && !isAiChatMode) || (item.id === 2 && isAiChatMode) ? 'bg-neutral-200' : 'bg-neutral-100'
    }`}
    onClick={() => handleMenuItemClick(item)}
  >
    <NotepadText />
    <div className="font-linear">
      {item.title}
    </div>
  </div>
))}
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-3 px-6 py-3 hover:bg-white cursor-pointer transition-colors">
              <House/>
              <div className=" font-linear">Home</div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3.5 pb-8 hover:bg-white cursor-pointer transition-colors">
              <Settings/>
              <div className="font-linear" onClick={()=>{setDisplay('setting')}}>Settings</div>
            </div>
          </div>
        </nav>
      )}
      <VideoPopup videos={[]} />
      
      {display==='chat'?
      <main className="flex-1 flex flex-col h-full max-h-[calc(100vh-86px)]">
        {/* Chat Header */}
        {!isAuthenticated ? (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-86px)]">
      <HeroSection />
    </div>
    ) :(<>
        <header className="flex items-center justify-between px-6 py-4 border-b border-[rgba(158,158,158,0.3)] bg-white pb-6">
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
            </div>
            <div className="text-lg text-black font-linear">
              {isAiChatMode ? 'AI Chat Bot' : 'Anonymous Group Chat'}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button aria-label="Notifications" className="p-2 hover:bg-neutral-100 rounded-full" onClick={()=>setShowSearch((value)=>!value)}>
              <Search stroke='#555' size={22}/>
            </button>
            <button aria-label="Settings" className="p-2 hover:bg-neutral-100 rounded-full" onClick={()=>setShowPin((value)=>!value)}>
              <AlertCircle stroke='#555' size={22}/>
            </button>
          </div>
        </header>

        {/* Search bar */}
        {showSearch&&(<div className="w-full flex items-center justify-center bg-neutral-100 px-5 py-3 border-b border-[rgba(158,158,158,0.3)]">
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
          
          <div className="mx-4 flex-1 max-w-5xl">
          <div className="w-full h-10 border flex items-center justify-center px-4 bg-white rounded-xl border-[rgba(158,158,158,0.4)]">
            <Search stroke='#555555' size={22}/>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search" 
              className="ml-2 flex-1 outline-none text-sm text-[#555] text-center font-linear"
            />
          </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button aria-label="Calendar" className="p-1 hover:bg-white rounded-full">
              <Calendar stroke='#555555' size={22}/>
            </button>
            <button aria-label="Close" className="w-6 h-6 flex justify-center items-center bg-white rounded-full border border-[rgba(158,158,158,0.4)] hover:bg-neutral-100" onClick={()=>setShowSearch(false)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0101 9.00037L15.5765 14.5668L14.5663 15.5769L8.99996 10.0106L3.4336 15.5769L2.42346 14.5668L7.98981 9.00037L2.42346 3.43408L3.4336 2.42387L8.99996 7.99023L14.5663 2.42387L15.5765 3.43408L10.0101 9.00037Z" fill="#555555"/>
              </svg>
            </button>
          </div>
        </div>)}
        
        {/* Pinned Messages */}
        {showPin && (
  <div className="bg-neutral-100 shadow-[0px_2px_6px_rgba(0,0,0,0.1)] flex items-center px-5 py-3 border-b border-[rgba(158,158,158,0.3)]">
    <div className="flex-1">
      <div className="flex items-center gap-3 text-[10px] font-medium">
        <div className="bg-black w-1 h-5 rounded-full" />
        <div className="text-black">Pinned Messages ({pinnedMessages.length})</div>
      </div>
      <div className="flex items-center gap-3 mt-1 text-xs text-[#555]">
        <div className="bg-[rgba(217,217,217,1)] w-1 h-5 rounded-full" />
        <button 
          className="truncate pr-4 max-w-full hover:underline cursor-pointer text-left"
          onClick={() => jumpToMessage(pinnedMessages[currentPinnedMessage]?.messageId)}
        >
          {pinnedMessages[currentPinnedMessage]?.text}
        </button>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* View All Pinned Messages Button */}
      <button 
        aria-label="View All Pinned Messages" 
        className="p-2 hover:bg-white rounded-full flex-shrink-0"
        onClick={() => setDisplay('pinnedMessages')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="#555"/>
        </svg>
      </button>
      
      {/* Next Pinned Message Button */}
      <button 
        aria-label="Next Pinned Message" 
        className="p-2 hover:bg-white rounded-full flex-shrink-0"
        onClick={() => setCurrentPinnedMessage((currentPinnedMessage + 1) % pinnedMessages.length)}
      >
        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 11V3h.5C15.33 3 16 2.33 16 1.5S15.33 0 14.5 0h-9C4.67 0 4 .67 4 1.5S4.67 3 5.5 3H6v8c0 2.97-2.16 5-5 5v2h7v7l1 1 1-1v-7h7v-2c-2.84 0-5-2.03-5-5z" fill="#555"/>
        </svg>
      </button>
    </div>
  </div>
)}
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0" style={{ scrollBehavior: 'smooth' }}>
          <div className="text-[#555] self-center border border-[#9E9E9E] min-h-8 w-auto gap-2.5 text-sm font-normal mt-4 mx-auto px-3 py-1 rounded-[40px] border-solid flex justify-center items-center max-w-24">
            Today
          </div>

          <div className="flex flex-col space-y-6 mt-6 px-4">
          {messages.filter(msg => 
  searchQuery ? msg.text.toLowerCase().includes(searchQuery.toLowerCase()) : true
).map((msg) => (
  <div key={msg.id} id={`message-${msg.id}`} className="flex flex-col message-item">
    {msg.isPoll ? (
      // Poll Message
      <div className={`flex flex-col ${msg.replyTo ? 'mt-2' : 'mt-0'}`}>
        {msg.replyTo && (
          <div className="flex items-center gap-2 ml-auto mb-1 text-xs text-[#9E9E9E]">
            <span>Replying to {msg.replyTo.sender}</span>
            <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              "{msg.replyTo.text}"
            </div>
          </div>
        )}
        <div className="bg-neutral-100 ml-auto border w-auto max-w-[70%] text-sm font-normal p-4 rounded-[20px] border-[rgba(158,158,158,0.5)] border-solid">
          <div className="flex items-center gap-2 mb-3">
            <ChartNoAxesColumn className='rotate-90' size={16} stroke="#555"/>
            <span className="text-[#555] font-medium">Poll</span>
          </div>
          <h3 className="text-black font-medium mb-3">{msg.pollData.question}</h3>
          <div className="space-y-2">
            {msg.pollData.options.map((option) => {
              const totalVotes = msg.pollData.options.reduce((sum, opt) => sum + opt.votes, 0);
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              const isVoted = option.voters.includes(userName);
              
              return (
                <button
                  key={option.id}
                  onClick={() => handlePollVote(msg.id, option.id)}
                  className={`w-full text-left p-2 rounded border transition-colors ${
                    isVoted ? 'bg-black text-white border-black' : 'bg-white text-[#555] border-[rgba(158,158,158,0.5)] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{option.text}</span>
                    <span className="text-xs font-medium">{option.votes} ({percentage.toFixed(0)}%)</span>
                  </div>
                  {totalVotes > 0 && (
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all ${isVoted ? 'bg-white' : 'bg-black'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 text-xs text-[#9E9E9E]">
            {msg.pollData.allowMultipleAnswers ? 'Multiple answers allowed' : 'Single answer only'} • 
            Total votes: {msg.pollData.options.reduce((sum, opt) => sum + opt.votes, 0)}
          </div>
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
    ) : msg.isUser ? (
      // User's own message (right side)
      <div className={`flex flex-col ${msg.replyTo ? 'mt-2' : 'mt-0'}`}>
        {msg.replyTo && (
          <div className="flex items-center gap-2 ml-auto mb-1 text-xs text-[#9E9E9E]">
            <span>Replying to {msg.replyTo.sender}</span>
            <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              "{msg.replyTo.text}"
            </div>
          </div>
        )}
        <div className="bg-[#9E9E9E80] ml-auto text-[#555555] border w-auto max-w-[70%] overflow-hidden text-sm font-normal px-4 py-3.5 rounded-[15px]">
          {msg.text}
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#9E9E9E] mt-2 justify-end">
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
    ) : (
      // Other users' messages (left side)
      <>
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
        <form onSubmit={handleSubmit} className="bg-neutral-100 flex items-center gap-4 p-4 px-6 border-t border-[rgba(158,158,158,0.5)]">
        <button
          type="button"
          onClick={() => setShowPollCreator(true)}
          className="flex items-center justify-center w-20 h-10 rounded-full gap-2 text-[#555]"
          aria-label="Create poll"
        >
          <ChartNoAxesColumn className='rotate-90' size={22} strokeWidth={3}/>
          <p className='text-sm'>Poll</p>
        </button>

          <div className="bg-white border flex items-center gap-3 flex-1 px-5 mx-8 py-3 rounded-full border-[rgba(158,158,158,0.4)]">
            <Sticker stroke='#555' size={22}/>
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
            className={`flex items-center justify-center w-10 h-10 rounded-full ${!message.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Send message"
          >
            <SendHorizonal/>
          </button>
        </form>
        {showPollCreator && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="relative w-full max-w-sm">
      <div
        onSubmit={handlePollSubmit}
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-labelledby="poll-creator-title"
      >
        {/* Header */}
        <header className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 id="poll-creator-title" className="text-sm font-semibold text-gray-900">
              Create poll
            </h2>
            <button 
              onClick={handlePollCancel}
              type="button"
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close poll creator"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.85062 10.3274L15.3447 16.8215L14.1662 18L7.67212 11.506L1.17804 18L-0.000463486 16.8215L6.49362 10.3274L-0.000463486 3.33337L1.17804 2.65479L7.67212 9.14888L14.1662 2.65479L15.3447 3.83337L8.85062 10.3274Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Question
            </label>
            <div className="relative">
              <textarea
                value={pollFormData.question}
                onChange={(e) => setPollFormData(prev => ({ ...prev, question: e.target.value }))}
                className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                placeholder="What would you like to ask?"
                maxLength={500}
              />
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {pollFormData.question.length}/500
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-900">Options</label>
              <button
                onClick={handleAddPollOption}
                type="button"
                className="text-sm text-black hover:text-gray-700 font-medium transition-colors"
              >
                + Add option
              </button>
            </div>
            
            <div className="space-y-3">
              {pollFormData.options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleUpdatePollOption(option.id, e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                    placeholder={`Option ${index + 1}`}
                  />
                  {pollFormData.options.length > 2 && (
                    <button
                      onClick={() => handleRemovePollOption(option.id)}
                      type="button"
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Delete option"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66634 2.66634C4.66634 2.31272 4.80682 1.97358 5.05687 1.72353C5.30691 1.47348 5.64605 1.33301 5.99967 1.33301H9.99967C10.3533 1.33301 10.6924 1.47348 10.9425 1.72353C11.1925 1.97358 11.333 2.31272 11.333 2.66634V3.99967H13.9997C14.1765 3.99967 14.3461 4.06991 14.4711 4.19494C14.5961 4.31996 14.6663 4.48953 14.6663 4.66634C14.6663 4.84315 14.5961 5.01272 14.4711 5.13775C14.3461 5.26277 14.1765 5.33301 13.9997 5.33301H13.287L12.709 13.4277C12.6851 13.7641 12.5345 14.0789 12.2878 14.3087C12.041 14.5386 11.7162 14.6663 11.379 14.6663H4.61967C4.28243 14.6663 3.95772 14.5386 3.71093 14.3087C3.46414 14.0789 3.31362 13.7641 3.28967 13.4277L2.71301 5.33301H1.99967C1.82286 5.33301 1.65329 5.26277 1.52827 5.13775C1.40325 5.01272 1.33301 4.84315 1.33301 4.66634C1.33301 4.48953 1.40325 4.31996 1.52827 4.19494C1.65329 4.06991 1.82286 3.99967 1.99967 3.99967H4.66634V2.66634Z" fill="currentColor"/>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900 mb-1">
                  Allow multiple answers
                </div>
                <div className="text-sm text-gray-500">
                  Let people choose more than one option
                </div>
              </div>
              <button
                onClick={() => setPollFormData(prev => ({ ...prev, allowMultipleAnswers: !prev.allowMultipleAnswers }))}
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  pollFormData.allowMultipleAnswers ? 'bg-black' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={pollFormData.allowMultipleAnswers}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    pollFormData.allowMultipleAnswers ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between gap-3">
            <button
              onClick={handlePollCancel}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePollSubmit}
              type="button"
              className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
            >
              Create Poll
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
        )}
  </>
)}
      </main>:null}
      {display === "pinnedMessages" ? (
  <main className="flex-1 flex flex-col h-full max-h-[calc(100vh-86px)]">
    <PinnedMessages 
      messages={pinnedMessages.map(pm => ({
        date: pm.date,
        content: pm.text,
        messageId: pm.messageId
      }))}
      totalMessages={pinnedMessages.length}
      onClose={() => setDisplay('chat')}
      onJumpToMessage={jumpToMessage}
    />
  </main>
) : null}
      {display==="setting"?<Setting setDisplay={setDisplay}/>:null}
      {display==="profile"?<ProfileForm setDisplay={setDisplay}/>:null}
      {display==="password"?<PasswordChangeForm/>:null}
      {display==="email"?<EmailSettings/>:null}
      {display==="username"?<ChangeUsernameForm/>:null}
    </div>
  );
};

export default Chat;