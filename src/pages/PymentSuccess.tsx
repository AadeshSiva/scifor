import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

// Create a new component: PaymentSuccess.jsx
const PaymentSuccess = () => {
    const [sessionId, setSessionId] = useState(null);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const session = urlParams.get('session_id');
      setSessionId(session);
    }, []);
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your subscription has been activated.</p>
          {sessionId && (
            <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
          )}
        </div>
      </div>
    );
  };

  export default PaymentSuccess