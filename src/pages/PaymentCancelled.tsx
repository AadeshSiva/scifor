import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const PaymentCancelled = () => {
  const [countdown, setCountdown] = useState(10);

  // Handle navigation to join page
  const handleNavigation = useCallback(() => {
    try {
      window.location.href = "/join";
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = "/join";
    }
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          handleNavigation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [handleNavigation]);

  const handleManualNavigation = () => {
    handleNavigation();
  };

  const handleRetry = () => {
    // You can modify this to redirect to a specific payment page
    window.location.href = "/join";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        
        {/* Main Cancelled Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          
          {/* Header Section */}
          <div className="text-center px-6 py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Payment Cancelled
            </h1>
            
            <p className="text-gray-600">
              Your payment was cancelled and no charges were made
            </p>
          </div>

          {/* Content Section */}
          <div className="px-6 pb-8">
            
            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button 
                onClick={handleRetry}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>Try Again</span>
              </button>
              
              <button 
                onClick={handleManualNavigation}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Plans</span>
              </button>
            </div>

            {/* Auto Redirect Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-gray-700 text-sm mb-1">
                  Redirecting to plans in {countdown} seconds
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
                  <div 
                    className="bg-gray-600 h-1 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
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

export default PaymentCancelled;