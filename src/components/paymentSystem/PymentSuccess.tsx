import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

type UserType = "guest" | "member";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [isUpdating, setIsUpdating] = useState(true);
  const [userType, setUserType] = useState<UserType>("member"); 
  const confirmPayment = useCallback(async () => {
    try {
      const accessToken =
        sessionStorage.getItem("access_token") || localStorage.getItem("access_token");
      const session = new URLSearchParams(window.location.search).get("session_id");
      setSessionId(session);
      if (accessToken && session) {
        const response = await fetch(
          `https://api.prspera.com/confirm-payment/?session_id=${session}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.ok) {
          const data = await response.json();
          const amount = Number(data?.amount ?? 0);
          const paid = data?.user_paid || data?.status === "paid" || amount > 0;
          setUserType(paid && amount >= 797 ? "member" : "guest");
        } else {
          setUserType("guest");
        }
      } else {
        setUserType("guest");
      }
    } catch (e) {
      console.error("Error confirming payment:", e);
      setUserType("guest");
    } finally {
      setIsUpdating(false);
    }
  }, []);
  useEffect(() => {
    confirmPayment();
  }, [confirmPayment]);
  useEffect(() => {
    if (isUpdating) return;
    const t = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          window.location.href =
            userType === "member" ? "/confirmation-member" : "/confirmation-guest";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isUpdating, userType]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center px-6 py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful</h1>
            <p className="text-gray-600">Your payment has been processed successfully</p>
          </div>
          <div className="px-6 pb-8">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              {isUpdating ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-3" />
                  <span className="text-gray-600 font-medium">Finalizing your account...</span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Confirmed
                  </div>
                  <p className="text-gray-700 font-medium mb-1">
                    Redirecting to your {userType === "member" ? "Member" : "Guest"} Confirmation
                  </p>
                  <p className="text-gray-500 text-sm mb-4">in {countdown} seconds</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
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
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">Need help? Contact support</p>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
