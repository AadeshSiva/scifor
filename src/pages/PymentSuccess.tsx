
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isReloading, setIsReloading] = useState(true);
  const [user, setUser] = useState({ paid: false }); // Mock user for demo

  // Function to reload user token and data
  const reloadUserToken = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (accessToken && refreshToken) {
        // Simulate API call to refresh user data
        setTimeout(() => {
          setUser({ paid: true });
        }, 1500);
      }
    } catch (error) {
      console.error('Error reloading user token:', error);
    } finally {
      setTimeout(() => {
        setIsReloading(false);
      }, 2000);
    }
  }, []);

  // Handle navigation to chat
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
    
    reloadUserToken();
  }, [reloadUserToken]);

  useEffect(() => {
    let countdownInterval;
    
    if (!isReloading) {
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
  }, [isReloading, handleNavigation]);

  const handleManualNavigation = () => {
    handleNavigation();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Payment successful
          </h1>
          
          <p className="text-gray-600">
            Your subscription is now active
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          {isReloading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-3" />
              <span className="text-gray-600">Updating account...</span>
            </div>
          ) : (
            <div className="text-center">
              {user?.paid && (
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  ✓ Premium activated
                </div>
              )}
              
              <p className="text-gray-700 mb-4">
                Redirecting to LIVE in <span className="font-semibold">{countdown}</span> seconds
              </p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
                <div 
                  className="bg-gray-800 h-1 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
              
              <button 
                onClick={handleManualNavigation}
                className="group w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <span>Continue to LIVE</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Session ID */}
        {sessionId && (
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
            <p className="text-xs font-mono text-gray-600 bg-gray-50 px-3 py-2 rounded border break-all">
              {sessionId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;