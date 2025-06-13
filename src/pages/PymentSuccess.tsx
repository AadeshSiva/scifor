
import { CheckCircle, ArrowRight, Loader2, Shield, Zap, Crown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isReloading, setIsReloading] = useState(true);
  const [user, setUser] = useState({ paid: false });

  // Function to reload user token and data
  const reloadUserToken = useCallback(async () => {
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
      console.error('Error reloading user token:', error);
      // Fallback for demo
      setTimeout(() => {
        setUser({ paid: true });
      }, 1500);
    } finally {
      setTimeout(() => {
        setIsReloading(false);
      }, 2000);
    }
  }, [sessionId]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-3">
              Payment Successful
            </h1>
            
            <p className="text-emerald-100 text-lg">
              Welcome to Premium Access
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            
            {/* Premium Features Preview */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">Unlimited Access</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-lg mb-3">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">Premium Features</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">Priority Support</p>
              </div>
            </div>

            {/* Status Section */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              {isReloading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-6 h-6 text-slate-400 animate-spin mr-3" />
                  <span className="text-slate-600 font-medium">Processing your subscription...</span>
                </div>
              ) : (
                <div className="text-center">
                  {user?.paid && (
                    <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-6">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Premium Activated
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <p className="text-slate-700 font-medium text-lg mb-2">
                      Redirecting in {countdown} seconds
                    </p>
                    <p className="text-slate-500 text-sm">
                      You'll be automatically taken to your dashboard
                    </p>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="relative w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleManualNavigation}
                    className="group w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span>Continue to Dashboard</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Transaction Details */}
            {sessionId && (
              <div className="border-t border-slate-200 pt-6">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <p className="text-slate-500 font-medium mb-1">Transaction ID</p>
                    <p className="font-mono text-slate-700 text-xs bg-slate-100 px-3 py-2 rounded-lg break-all max-w-[280px]">
                      {sessionId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 font-medium mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Questions? Contact our support team anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;