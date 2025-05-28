import { useAuth } from "@/utils/AuthContext";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create a new component: PaymentSuccess.jsx
const PaymentSuccess = () => {
    const [sessionId, setSessionId] = useState(null);
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate()
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const session = urlParams.get('session_id');
      setSessionId(session);
    }, []);

    useEffect(() => {
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Redirect to home page
            navigate("/")
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(countdownInterval);
    }, []);
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your subscription has been activated.</p>
          {sessionId && (
            <p className="text-sm text-gray-500 mb-4">Session ID: {sessionId}</p>
          )}
          <p className="text-sm text-gray-500">
            Redirecting to homepage in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
      </div>
    );
  };

export default PaymentSuccess;