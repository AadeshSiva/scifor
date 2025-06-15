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
import PurchaseHistory from '@/components/settings/PaymentHistory';
import { useLocation } from 'react-router-dom';

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

interface PremiumMembershipPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumMembershipPopup: React.FC<PremiumMembershipPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleGetPremium = () => {
    // Replace with your actual premium upgrade logic
    window.location.href = '/join';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl border-4 border-gray-300 shadow-lg p-8 w-full max-w-md mx-4 relative">
        {/* Close button matching COI style */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-900 hover:text-gray-700 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Header matching COI typography */}
        <div className="text-center mb-6">
          <h2 className="text-[#2B2B2B] text-2xl font-walbaum mb-2">
            Upgrade to Premium
          </h2>
          <p className="text-[#6f6f6f] text-sm font-linear leading-relaxed">
            You need a premium membership to send messages in the chat. Unlock unlimited messaging and exclusive features!
          </p>
        </div>

        {/* Features list matching COI checkmark style */}
        <div className="space-y-4 mb-8">
          {[
            'Unlimited messaging',
            'AI Chat Bot access', 
            'Create polls and pin messages',
            'Exclusive premium content'
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-[#2B2B2B]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                <path d="M4.07573 11.8036L0.175729 7.44535C-0.0585762 7.18351 -0.0585762 6.75898 0.175729 6.49711L1.02424 5.54888C1.25854 5.28702 1.63846 5.28702 1.87277 5.54888L4.5 8.48478L10.1272 2.19638C10.3615 1.93454 10.7415 1.93454 10.9758 2.19638L11.8243 3.14461C12.0586 3.40645 12.0586 3.83098 11.8243 4.09285L4.92426 11.8036C4.68994 12.0655 4.31004 12.0655 4.07573 11.8036Z" fill="black"/>
              </svg>
              <span className="font-linear text-sm text-[#2B2B2B]">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action buttons matching COI button styles */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-linear text-sm font-medium"
          >
            Maybe Later
          </button>
          <button
            onClick={handleGetPremium}
            className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-linear text-sm font-semibold"
          >
            Get Premium
          </button>
        </div>

        {/* Optional branding element matching COI style */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-[#6f6f6f] font-linear">
            Grow Smarter. <span className="font-bold">Exit Richer™</span>
          </p>
        </div>
      </div>
    </div>
  );
};


const Chat = () => {
  const [message, setMessage] = useState('');
  const [display,setDisplay] = useState('chat')
  const { isAuthenticated, isLoading, user } = useAuth();
  const [userName,setUsername] = useState('')
  const isAdmin = user?.is_staff === true; 
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pinnedMessages, setpinnedMessages] = useState([]);
  const [currentPinnedMessage, setCurrentPinnedMessage] = useState(0);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [inappropriateMessageAlert, setInappropriateMessageAlert] = useState(null);
  const [showSearch,setShowSearch] = useState(false)
  const [showPin,setShowPin] = useState(false)
  const location = useLocation();
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollFormData, setPollFormData] = useState({
    question: '',
    options: [
      { id: '1', text: '', votes: 0, voters: [] },
      { id: '2', text: '', votes: 0, voters: [] }
    ],
    allowMultipleAnswers: false,
  });
  const [showPinnedMessagesPage, setShowPinnedMessagesPage] = useState(false);
  const [isAiChatMode, setIsAiChatMode] = useState(false);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [maxReconnectAttempts] = useState(5);
  const reconnectTimeoutRef = useRef(null);

  const refreshTokenAndReconnect = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.log('No refresh token available');
        return false;
      }
  
      const response = await fetch('https://intern-project-final-1.onrender.com/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        console.log('Token refreshed successfully');
        return true;
      } else {
        console.log('Token refresh failed');
        return false;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };

  useEffect(() => {
    let ws = null;
    
    const connectWebSocket = () => {
      if (!isAuthenticated || !user || isLoading) {
        console.log('User not authenticated or still loading, skipping WebSocket connection');
        return;
      }
    
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log('No access token found');
          return;
        }
        
        const wsUrl = `wss://intern-project-final-1.onrender.com/ws/chat/general/?token=${token}`;
        console.log('Attempting to connect to:', wsUrl);
        
        ws = new WebSocket(wsUrl);
        setConnectionStatus('connecting');
        
        ws.onopen = () => {
          console.log('WebSocket connected successfully');
          setConnectionStatus('connected');
          setSocket(ws);
          setReconnectAttempts(0);
          
          // Send a ping to keep connection alive
          const keepAlive = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 30000); // Send ping every 30 seconds
          
          ws.keepAliveInterval = keepAlive;
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type !== 'pong') { // Ignore pong responses
              handleWebSocketMessage(data);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        ws.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason);
          setConnectionStatus('disconnected');
          setSocket(null);
          
          // Clear keep alive interval
          if (ws.keepAliveInterval) {
            clearInterval(ws.keepAliveInterval);
          }
          
          // Don't auto-reconnect for authentication errors
          if (event.code === 4001 || event.code === 4003 || event.code === 4004) {
            console.log('Authentication failed, not attempting to reconnect');
            return;
          }
          
          // Auto-reconnect for other errors
          if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
            const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
            console.log(`Attempting to reconnect in ${timeout}ms (attempt ${reconnectAttempts + 1})`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              setReconnectAttempts(prev => prev + 1);
              connectWebSocket();
            }, timeout);
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('error');
        };
        
      } catch (error) {
        console.error('Error creating WebSocket:', error);
        setConnectionStatus('error');
      }
    };
  
    // Only connect when authentication is complete and user is authenticated
    if (!isLoading && isAuthenticated && user) {
      connectWebSocket();
    }
    
    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close(1000, 'Component unmounting');
      }
    };
  }, [isAuthenticated, isLoading, user, reconnectAttempts]);

  const reconnectWebSocket = async () => {
    if (socket) {
      socket.close();
    }
    
    // Try to refresh token before reconnecting
    const tokenRefreshed = await refreshTokenAndReconnect();
    if (!tokenRefreshed && !localStorage.getItem('access_token')) {
      console.log('No valid token available for reconnection');
      return;
    }
    
    setReconnectAttempts(0);
    setConnectionStatus('connecting');
  };
  

  const handleWebSocketMessage = (data) => {
    console.log('Received WebSocket message:', data);
    
    switch (data.type) {
      case 'chat_message':
        if (data.is_history) {
          // Handle historical messages on connect - check if already exists
          setMessages(prev => {
            const exists = prev.some(msg => msg.id === data.message.id);
            if (!exists) {
              return [formatBackendMessage(data.message), ...prev];
            }
            return prev;
          });
        } else {
          // Handle new messages - check if already exists
          setMessages(prev => {
            const exists = prev.some(msg => msg.id === data.message.id);
            if (!exists) {
              return [...prev, formatBackendMessage(data.message)];
            }
            return prev;
          });
        }
        break;
        
      case 'poll_message':
        setMessages(prev => {
          const exists = prev.some(msg => msg.id === data.poll.message_id);
          if (!exists) {
            return [...prev, formatBackendPoll(data.poll)];
          }
          return prev;
        });
        break;
        
      case 'poll_update':
        setMessages(prev => prev.map(msg => 
          msg.isPoll && msg.pollData.id === data.poll.id 
            ? { ...msg, pollData: formatPollData(data.poll) }
            : msg
        ));
        break;
        
      case 'message_pinned':
        // Update the message in the current messages array
        setMessages(prev => prev.map(msg => 
          msg.id === data.message.id 
            ? { ...msg, isPinned: true }
            : msg
        ));
        
        // Add to pinned messages if not already there
        const pinnedMsg = formatBackendMessage(data.message);
        setpinnedMessages(prev => {
          const exists = prev.some(p => p.messageId === pinnedMsg.id);
          if (!exists) {
            return [...prev, {
              id: prev.length + 1,
              messageId: pinnedMsg.id,
              text: pinnedMsg.text,
              date: "Today",
              isPinned: true
            }];
          }
          return prev;
        });
        break;
      
      case 'search_results':
        console.log('Search results:', data.messages);
        break;
        
      case 'error':
        console.error('Server error:', data.message);
        if (data.message.includes('Premium membership')) {
          setShowPremiumPopup(true);
        }
        break;
        
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  // Replace your formatBackendMessage function:
  const formatBackendMessage = (backendMsg) => {
    console.log('Formatting message:', {
      sender: backendMsg.sender,
      userFullName: user?.full_name,
      userName: userName,
      isUser: backendMsg.sender === user?.full_name
    });
    
    return {
      id: backendMsg.id,
      sender: backendMsg.sender,
      text: backendMsg.content,
      time: new Date(backendMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: backendMsg.sender === user?.full_name,
      isPinned: backendMsg.is_pinned || false,
      replyTo: backendMsg.reply_to ? {
        id: backendMsg.reply_to.id,
        sender: backendMsg.reply_to.sender,
        text: backendMsg.reply_to.content
      } : null
    };
  };

  const formatBackendPoll = (backendPoll) => ({
    id: backendPoll.message_id,
    sender: backendPoll.created_by,
    text: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isUser: backendPoll.created_by === user?.full_name, // Use user.full_name instead of userName
    isPoll: true,
    pollData: formatPollData(backendPoll)
  });

  const formatPollData = (backendPoll) => ({
    id: backendPoll.id,
    question: backendPoll.question,
    options: backendPoll.options.map(opt => ({
      id: opt.id,
      text: opt.text,
      votes: opt.votes,
      voters: opt.voters
    })),
    allowMultipleAnswers: backendPoll.allow_multiple_answers,
    createdBy: backendPoll.created_by,
    totalVotes: backendPoll.total_votes
  });

  useEffect(() => {
  if (user && user.full_name) {
    setUsername(user.full_name);
  }
}, [user]);

useEffect(() => {
  if (location.state?.display) {
    setDisplay(location.state.display);
  }
}, [location.state]);

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
    // Hide hero when any menu item is clicked
    setShowHero(false);
    
    // Always switch to chat display first
    setDisplay('chat');
    
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
      setMessages([]);
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

  const handlePollSubmit = (e) => {
    e.preventDefault();
    if (!socket) return;
    
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
  
    const pollData = {
      type: 'poll_create',
      question: pollFormData.question,
      options: pollFormData.options.map(opt => ({ text: opt.text })),
      allow_multiple_answers: pollFormData.allowMultipleAnswers
    };
  
    console.log('Sending poll data:', pollData); // Debug log
    socket.send(JSON.stringify(pollData));
    setShowPollCreator(false);
    setPollFormData({
      question: '',
      options: [
        { id: '1', text: '', votes: 0, voters: [] },
        { id: '2', text: '', votes: 0, voters: [] }
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
  
  const handlePollVote = (messageId, optionId) => {
    if (!socket) return;
    
    const message = messages.find(msg => msg.id === messageId);
    if (message && message.isPoll) {
      const voteData = {
        type: 'poll_vote',
        poll_id: message.pollData.id,
        option_id: optionId
      };
      
      socket.send(JSON.stringify(voteData));
    }
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
    // Check if message is empty
    if (!messageText.trim()) {
      console.log('Cannot send empty message');
      return;
    }
  
    // Check authentication status
    if (!isAuthenticated || !user || isLoading) {
      console.log('User not authenticated');
      alert('Please log in to send messages.');
      return;
    }
  
    // Check WebSocket connection
    if (!socket) {
      console.log('No WebSocket connection available');
      alert('Connection lost. Please refresh the page or try again.');
      return;
    }
  
    if (socket.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not ready. Current state:', socket.readyState);
      alert('Connection not ready. Please wait a moment and try again.');
      return;
    }
  
    console.log('Sending message:', messageText);
  
    const messageData = {
      type: 'chat_message',
      message: messageText,
      reply_to_id: replyingTo?.id || null
    };
    
    console.log('Sending message data:', messageData);
    
    try {
      socket.send(JSON.stringify(messageData));
      setReplyingTo(null); // Clear reply state
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
    
    // REMOVED THE DUPLICATE CODE BLOCK HERE
  };

  const ConnectionStatusIndicator = () => {
    const getStatusColor = () => {
      switch (connectionStatus) {
        case 'connected': return 'bg-green-500';
        case 'connecting': return 'bg-yellow-500';
        case 'disconnected': return 'bg-red-500';
        case 'error': return 'bg-red-600';
        default: return 'bg-gray-500';
      }
    };
  
    const getStatusText = () => {
      switch (connectionStatus) {
        case 'connected': return 'Connected';
        case 'connecting': return 'Connecting...';
        case 'disconnected': return 'Disconnected';
        case 'error': return 'Connection Error';
        default: return 'Unknown';
      }
    };
  
    return (
      <div className="flex items-center space-x-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        <span className="text-gray-600">{getStatusText()}</span>
        {(connectionStatus === 'disconnected' || connectionStatus === 'error') && (
          <button 
            onClick={reconnectWebSocket}
            className="text-blue-600 hover:text-blue-800 underline ml-2"
          >
            Reconnect
          </button>
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user has paid subscription before sending
    if (user && user.paid === false) {
      setShowPremiumPopup(true);
      return;
    }
    
    // Additional connection check
    if (connectionStatus !== 'connected') {
      alert('Please wait for connection to be established before sending messages.');
      return;
    }
    
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
    if (!socket || !isAdmin) return;
    
    const pinData = {
      type: 'pin_message',
      message_id: messageId
    };
    
    socket.send(JSON.stringify(pinData));
  };
  
  const getMenuItems = () => {
    return [
      { id: 1, title: 'Anonymous Group Chat', icon: 'message-square' },
      { id: 2, title: 'Ai Chat Bot (coming soon)', icon: 'menu-item-icon', isAiBot: true },
      ...Array(8).fill(null).map((_, index) => ({ 
        id: index + 3, 
        title: 'Item Title', 
        icon: 'menu-item-icon'
      }))
    ];
  };

  const handleSearch = (query) => {
    if (!socket || !query.trim()) return;
    
    const searchData = {
      type: 'search_messages',
      query: query
    };
    
    socket.send(JSON.stringify(searchData));
  };

  const handleHomeClick =()=>{
    setShowHero(true)
    setDisplay('chat')
  }

  // Add this function to render poll messages
const renderPollMessage = (message) => {
  if (!message.isPoll || !message.pollData) return null;
  
  return (
    <div className="bg-blue-50 p-4 rounded-lg border">
      <div className="mb-3">
        <h4 className="font-semibold text-gray-800">{message.pollData.question}</h4>
        <p className="text-sm text-gray-600">by {message.pollData.createdBy}</p>
      </div>
      
      <div className="space-y-2">
        {message.pollData.options.map((option) => (
          <div key={option.id} className="flex items-center justify-between p-2 bg-white rounded border">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePollVote(message.id, option.id)}
                className={`px-3 py-1 rounded text-sm ${
                  option.user_voted 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {option.text}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {option.votes} votes
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        Total votes: {message.pollData.totalVotes}
        {message.pollData.allowMultipleAnswers && " • Multiple answers allowed"}
      </div>
    </div>
  );
};

  return (
    <div className="bg-white min-h-[calc(100vh-86px)] flex overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
  <nav className={`${
    showSidebar 
      ? 'w-[400px] translate-x-0' 
      : 'w-[300px] -translate-x-full lg:translate-x-0'
  } lg:w-[300px] lg:relative fixed lg:static top-0 left-0 h-full lg:h-auto z-45 flex-shrink-0 flex flex-col overflow-hidden bg-neutral-100 border-r transition-transform duration-300 ease-in-out sidebar-mobile lg:sidebar-desktop`}>
          <div className="flex items-center gap-2.5 px-6 py-4">
            <div className="w-8 h-8 bg-[#555] rounded-full flex items-center justify-center text-white text-xs">
              {userName.charAt(0)}
            </div>
            <div className=" text-black font-normal font-linear py-5">
              Welcome {userName} 👋
            </div>
          </div>

          <div className=" flex items-center gap-2 px-6">
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
    {item.icon==="message-square"?<MessageSquare/>:<NotepadText/>}
    <div className="font-linear">
      {item.title}
    </div>
  </div>
))}
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-3 px-6 py-3 hover:bg-white cursor-pointer transition-colors" onClick={()=>handleHomeClick()}>
              <House/>
              <div className=" font-linear">Home</div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3.5 pb-8 hover:bg-white cursor-pointer transition-colors" onClick={()=>{setDisplay('setting')}}>
              <Settings/>
              <div className="font-linear">Settings</div>
            </div>
          </div>
        </nav>
      )}
      <VideoPopup videos={[]} />
      
      {display==='chat'?
  <main className="flex-1 flex flex-col h-screen max-h-[calc(100vh-86px)]">
    {/* Show hero section when showHero is true, regardless of authentication */}
    {showHero ? (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-86px)]">
        <HeroSection setDisplay={setDisplay} showHero={setShowHero}/>
      </div>
    ) : (
      <>
        {/* Chat Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[rgba(158,158,158,0.3)] bg-white pb-6">
        <div className="flex items-center gap-2 sm:gap-4">
  <button 
    onClick={() => setShowSidebar(!showSidebar)}
    className="lg:hidden p-1 hover:bg-neutral-100 rounded-full z-50 relative"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </button>
  {!showSidebar && (
    <button 
      onClick={() => setShowSidebar(true)}
      className="hidden lg:block p-1 hover:bg-neutral-100 rounded-full"
    >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            <div className="w-12 h-12 bg-[#555] rounded-full flex items-center justify-center text-white">
            </div>
            <div className="text-sm sm:text-lg text-black font-linear truncate">
              {isAiChatMode ? 'AI Chat Bot' : 'Anonymous Group Chat'}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <button aria-label="Notifications" className="p-2 hover:bg-neutral-100 rounded-full" onClick={()=>setShowSearch((value)=>!value)}>
              <Search stroke='#555' size={22}/>
            </button>
            <button aria-label="Settings" className="p-2 hover:bg-neutral-100 rounded-full" onClick={()=>setShowPin((value)=>!value)}>
              <AlertCircle stroke='#555' size={22}/>
            </button>
          </div>
        </header>

        {/* Search bar */}
        {showSearch&&(<div className="w-full flex items-center justify-center bg-neutral-100 px-2 sm:px-5 py-3 border-b border-[rgba(158,158,158,0.3)]">
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
          
          <div className="mx-2 sm:mx-4 flex-1 max-w-5xl">
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
            {showSidebar && (
  <button 
    onClick={() => setShowSidebar(false)}
    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    aria-label="Close sidebar"
  />
)}
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
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 min-h-0" style={{ scrollBehavior: 'smooth' }}>
          <div className="text-[#555] self-center border border-[#9E9E9E] min-h-8 w-auto gap-2.5 text-sm font-normal mt-4 mx-auto px-3 py-1 rounded-[40px] border-solid flex justify-center items-center max-w-24">
            Today
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-6 mt-4 sm:mt-6 px-1 sm:px-4">
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
        <div className="bg-neutral-100 ml-auto border w-auto max-w-[90%] sm:max-w-[70%] text-sm font-normal p-3 sm:p-4 rounded-[20px] border-[rgba(158,158,158,0.5)] border-solid">
          <div className="flex items-center gap-2 mb-3">
            <ChartNoAxesColumn className='rotate-90' size={16} stroke="#555"/>
            <span className="text-[#555] font-medium">Poll</span>
          </div>
          <h3 className="text-black font-medium mb-3">{msg.pollData.question}</h3>
          <div className="space-y-2">
            {msg.pollData.options.map((option) => {
              const totalVotes = msg.pollData.options.reduce((sum, opt) => sum + opt.votes, 0);
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              const isVoted = option.voters.includes(user?.full_name);
              
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
        {isAdmin && (
  <button 
    onClick={() => handlePinMessage(msg.id)}
    className="hover:bg-neutral-100 rounded-full p-1"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8V4h1.5c.8 0 1.5-.7 1.5-1.5S19.3 1 18.5 1h-13C4.7 1 4 1.7 4 2.5S4.7 4 5.5 4H7v4c0 3-2.2 5-5 5v2h8v7l1 1 1-1v-7h8v-2c-2.8 0-5-2-5-5z" fill="#9E9E9E"/>
    </svg>
  </button>
)}
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
        <div className="bg-[#9E9E9E80] ml-auto text-[#555555] border w-auto max-w-[85%] sm:max-w-[70%] overflow-hidden text-sm font-normal px-3 sm:px-4 py-3.5 rounded-[15px]">
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
          <div className="bg-white ml-8 sm:ml-12 text-[#555] border w-auto max-w-[85%] sm:max-w-[70%] overflow-hidden text-sm font-normal px-3 sm:px-4 py-3.5 rounded-[20px] border-[rgba(158,158,158,0.5)] border-solid">
            {msg.text}
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#9E9E9E] mt-2 ml-12">
            <div>{msg.time}</div>
            {isAdmin?<button 
              onClick={() => handlePinMessage(msg.id)}
              className="hover:bg-neutral-100 rounded-full p-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8V4h1.5c.8 0 1.5-.7 1.5-1.5S19.3 1 18.5 1h-13C4.7 1 4 1.7 4 2.5S4.7 4 5.5 4H7v4c0 3-2.2 5-5 5v2h8v7l1 1 1-1v-7h8v-2c-2.8 0-5-2-5-5z" fill="#9E9E9E"/>
              </svg>
            </button>:null}
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
        <form onSubmit={handleSubmit} className="bg-neutral-100 flex items-center gap-2 sm:gap-4 p-3 sm:p-4 px-4 sm:px-6 border-t border-[rgba(158,158,158,0.5)] flex-shrink-0">
        <button
  type="button"
  onClick={() => {
    if (user && user.paid === false) {
      setShowPremiumPopup(true);
      return;
    }
    setShowPollCreator(true);
  }}
  className="flex items-center justify-center w-16 sm:w-20 h-10 rounded-full gap-1 sm:gap-2 text-[#555] flex-shrink-0"
  aria-label="Create poll"
>
          <ChartNoAxesColumn className='rotate-90' size={18} strokeWidth={3}/>
          <p className='text-xs sm:text-sm hidden sm:block'>Poll</p>
        </button>

        <div className="bg-white border flex items-center gap-2 sm:gap-3 flex-1 px-3 sm:px-5 mx-2 sm:mx-8 py-3 rounded-full border-[rgba(158,158,158,0.4)]">
            <Sticker stroke='#555' size={22} className="flex-shrink-0"/>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="text-[#555] text-sm w-full bg-transparent outline-none flex-1"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${!message.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Send message"
          >
            <SendHorizonal/>
          </button>
        </form>
        {showPollCreator && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="relative w-full max-w-sm mx-auto">
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
      {display==="password"?<PasswordChangeForm setDisplay={setDisplay}/>:null}
      {display==="email"?<EmailSettings setDisplay={setDisplay}/>:null}
      {display==="username"?<ChangeUsernameForm setDisplay={setDisplay}/>:null}
      {display==="history"?<PurchaseHistory/>:null}
      <PremiumMembershipPopup 
        isOpen={showPremiumPopup} 
        onClose={() => setShowPremiumPopup(false)} 
      />
    </div>
  );
};

export default Chat;