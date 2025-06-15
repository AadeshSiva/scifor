
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isUpdating, setIsUpdating] = useState(true);
  const [user, setUser] = useState({ paid: false });

  // Function to update user status
  const updateUserStatus = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token') || localStorage.getItem('refresh_token');
      
      if (accessToken && refreshToken && sessionId) {
        // Check payment status via API
        const response = await fetch(`https://intern-project-final-1.onrender.com/payment-status/?session_id=${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser({ paid: data.user_paid || data.status === 'paid' });
        }
      } else {
        // Fallback simulation for demo
        setTimeout(() => {
          setUser({ paid: true });
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      // Fallback for demo
      setTimeout(() => {
        setUser({ paid: true });
      }, 1500);
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      }, 2000);
    }
  }, [sessionId]);

  // Handle navigation to live/chat
  const handleNavigation = useCallback(() => {
    try {
      window.location.href = "/chat";
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = "/chat";
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get('session_id');
    setSessionId(session);
    
    updateUserStatus();
  }, [updateUserStatus]);

  useEffect(() => {
    let countdownInterval;
    
    if (!isUpdating) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            handleNavigation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [isUpdating, handleNavigation]);

  const handleManualNavigation = () => {
    handleNavigation();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          
          {/* Header Section */}
          <div className="text-center px-6 py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Payment Successful
            </h1>
            
            <p className="text-gray-600">
              Your payment has been processed successfully
            </p>
          </div>

          {/* Content Section */}
          <div className="px-6 pb-8">
            
            {/* Status Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              {isUpdating ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-3" />
                  <span className="text-gray-600 font-medium">Updating your account...</span>
                </div>
              ) : (
                <div className="text-center">
                  {user?.paid && (
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Account Updated
                    </div>
                  )}
                  
                  <p className="text-gray-700 font-medium mb-1">
                    Redirecting in {countdown} seconds
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Taking you to the platform
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  <button 
                    onClick={handleManualNavigation}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Transaction ID */}
            {sessionId && (
              <div className="border-t border-gray-200 pt-4">
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Transaction ID</p>
                  <p className="font-mono text-gray-700 text-xs bg-gray-100 px-3 py-2 rounded inline-block">
                    {sessionId.length > 20 ? `${sessionId.substring(0, 20)}...` : sessionId}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">
            Need help? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;