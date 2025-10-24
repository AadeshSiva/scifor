import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../ui/icons";
import { useContext } from "react";
import UserContext from "../settings/Context/UserContext";

interface Payment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  product_name: string;
  customer_name: string;
  company_name: string;
  created_at: string;
  stripe_session_id: string;
  stripe_payment_intent_id?: string;
  email?: string;
}
interface PaymentResponse {
  payments: Payment[];
  user_paid_status: boolean;
}
interface TransactionDetailsModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}
const TransactionDetailsModal = ({
  payment,
  isOpen,
  onClose,
}: TransactionDetailsModalProps) => {
  if (!isOpen || !payment) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status.toLowerCase()) {
      case "completed":
      case "succeeded":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "refunded":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case "pending":
      case "processing":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-medium text-black">
              Transaction Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl text-3xl"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-base sm:text-lg font-medium text-black">Status</span>
            <span className={getStatusBadge(payment.status)}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-base sm:text-lg font-medium text-black">Amount</span>
            <span className="text-xl sm:text-2xl font-bold text-black">
              {formatAmount(payment.amount, payment.currency)}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                TRANSACTION ID
              </h3>
              <p className="text-black font-mono text-xs sm:text-sm break-all">
                {payment.stripe_session_id}
              </p>
            </div>
            {payment.stripe_payment_intent_id && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  PAYMENT INTENT ID
                </h3>
                <p className="text-black font-mono text-xs sm:text-sm break-all">
                  {payment.stripe_payment_intent_id}
                </p>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">PRODUCT</h3>
            <p className="text-black text-base sm:text-lg">{payment.product_name}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                CUSTOMER NAME
              </h3>
              <p className="text-black">{payment.customer_name}</p>
            </div>
            {payment.company_name && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  COMPANY
                </h3>
                <p className="text-black">{payment.company_name}</p>
              </div>
            )}
          </div>
          {payment.email && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">EMAIL</h3>
              <p className="text-black break-all">{payment.email}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              TRANSACTION DATE
            </h3>
            <p className="text-black">{formatDate(payment.created_at)}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => {
                const receiptText = `
PAYMENT RECEIPT
===============
Transaction ID: ${payment.stripe_session_id}
Product: ${payment.product_name}
Amount: ${formatAmount(payment.amount, payment.currency)}
Date: ${formatDate(payment.created_at)}
Customer: ${payment.customer_name}
Status: ${payment.status.toUpperCase()}
===============
Thank you for your payment!
                `;
                const blob = new Blob([receiptText], { type: "text/plain" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `receipt-${payment.stripe_session_id}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              className="flex-1 border border-black p-3 hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Download Receipt
            </button>
            <button
              onClick={() => {
                const invoiceText = `
INVOICE
=======
Invoice Number: INV-${payment.id}-${Date.now()}
Transaction ID: ${payment.stripe_session_id}
Bill To:
${payment.customer_name}
${payment.company_name ? payment.company_name : ""}
Date: ${formatDate(payment.created_at)}
Item: ${payment.product_name}
Amount: ${formatAmount(payment.amount, payment.currency)}
Total: ${formatAmount(payment.amount, payment.currency)}
Status: ${payment.status.toUpperCase()}
=======
Thank you for your business!
                `;
                const blob = new Blob([invoiceText], { type: "text/plain" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `invoice-${payment.stripe_session_id}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              className="flex-1 border border-black p-3 hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface PurchaseHistoryRowProps {
  payment: Payment;
  onViewDetails: (payment: Payment) => void;
}
const PurchaseHistoryRow = ({
  payment,
  onViewDetails,
}: PurchaseHistoryRowProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "completed":
      case "succeeded":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "refunded":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case "pending":
      case "processing":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPaymentMethod = (status: string) => {
    if (status === "completed" || status === "succeeded") {
      return "Credit Card";
    }
    return "Card";
  };

  const handleReceiptDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const receiptText = `
PAYMENT RECEIPT
===============
Transaction ID: ${payment.stripe_session_id}
Product: ${payment.product_name}
Amount: ${formatAmount(payment.amount, payment.currency)}
Date: ${formatDate(payment.created_at)}
Customer: ${payment.customer_name}
Status: ${payment.status.toUpperCase()}
===============
Thank you for your payment!
      `;
      const blob = new Blob([receiptText], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${payment.stripe_session_id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("Failed to download receipt. Please try again.");
    }
  };

  const handleInvoiceDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const invoiceText = `
INVOICE
=======
Invoice Number: INV-${payment.id}-${Date.now()}
Transaction ID: ${payment.stripe_session_id}
Bill To:
${payment.customer_name}
${payment.company_name ? payment.company_name : ""}
Date: ${formatDate(payment.created_at)}
Item: ${payment.product_name}
Amount: ${formatAmount(payment.amount, payment.currency)}
Total: ${formatAmount(payment.amount, payment.currency)}
Status: ${payment.status.toUpperCase()}
=======
Thank you for your business!
      `;
      const blob = new Blob([invoiceText], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${payment.stripe_session_id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Failed to download invoice. Please try again.");
    }
  };
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex items-center h-16 mb-4 cursor-pointer hover:bg-gray-50 p-4 rounded transition-colors border-b border-gray-100">
        <div className="flex-1 min-w-0 text-black text-sm font-normal leading-[17.6px] truncate">
          {payment.product_name}
        </div>
        <div className="w-20 text-black text-sm font-normal leading-[17.6px] ml-4 text-center">
          Plan
        </div>
        <div className="w-24 text-black text-sm font-normal leading-[17.6px] ml-4 text-center">
          {formatDate(payment.created_at)}
        </div>
        <div className="w-20 text-black text-sm font-normal leading-[17.6px] ml-4 text-center">
          {formatAmount(payment.amount, payment.currency)}
        </div>
        <div className="w-24 ml-4 text-center">
          <span className={getStatusBadge(payment.status)}>
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </span>
        </div>
        <div className="w-32 text-black text-sm font-normal leading-[17.6px] text-center ml-4">
          {getPaymentMethod(payment.status)}
        </div>
        <div className="flex gap-3 ml-4">
          <button
            onClick={handleReceiptDownload}
            className="border cursor-pointer px-3 py-2 border-solid border-black hover:bg-gray-100 transition-colors text-xs min-w-[80px]"
          >
            Receipt
          </button>
          <button
            onClick={handleInvoiceDownload}
            className="border cursor-pointer px-3 py-2 border-solid border-black hover:bg-gray-100 transition-colors text-xs min-w-[80px]"
          >
            Invoice
          </button>
          <button
            onClick={() => onViewDetails(payment)}
            className="border cursor-pointer px-3 py-2 border-solid border-black hover:bg-gray-100 transition-colors text-xs min-w-[80px]"
          >
            Details
          </button>
        </div>
      </div>
      {/* Mobile View */}
      <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-base font-medium text-black truncate">
                {payment.product_name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(payment.created_at)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-black">
                {formatAmount(payment.amount, payment.currency)}
              </div>
              <span className={getStatusBadge(payment.status)}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Type:</span>
              <span className="ml-2 text-black">Plan</span>
            </div>
            <div>
              <span className="text-gray-500">Payment:</span>
              <span className="ml-2 text-black">{getPaymentMethod(payment.status)}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReceiptDownload}
              className="flex-1 border border-black py-2 text-xs hover:bg-gray-100 transition-colors"
            >
              Receipt
            </button>
            <button
              onClick={handleInvoiceDownload}
              className="flex-1 border border-black py-2 text-xs hover:bg-gray-100 transition-colors"
            >
              Invoice
            </button>
            <button
              onClick={() => onViewDetails(payment)}
              className="flex-1 border border-black py-2 text-xs hover:bg-gray-100 transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
  </div>
);
const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="text-center py-12">
    <p className="text-red-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
    >
      Try Again
    </button>
  </div>
);
const EmptyState = () => (
  <div className="text-center py-12">
    <p className="text-gray-600 text-lg mb-4">No payment history found</p>
    <p className="text-gray-500">
      Your payment history will appear here once you make a purchase.
    </p>
  </div>
);
const PurchaseHistoryTable = ({
  payments,
  loading,
  error,
  onRetry,
  onViewDetails,
}: {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onViewDetails: (payment: Payment) => void;
}) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  if (payments.length === 0) return <EmptyState />;
  return (
    <div className="purchase-history-table">
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center h-16 mb-4 p-4 border-b border-gray-200">
        <div className="flex-1 text-black text-base font-medium">Item</div>
        <div className="w-20 text-black text-base font-medium text-center">Type</div>
        <div className="w-24 text-black text-base font-medium text-center">Date</div>
        <div className="w-20 text-black text-base font-medium text-center">Amount</div>
        <div className="w-24 text-black text-base font-medium text-center">Status</div>
        <div className="w-32 text-black text-base font-medium text-center">Payment Type</div>
        <div className="w-48 text-black text-base font-medium text-center">Actions</div>
      </div>
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        <p className="text-sm text-gray-500 mt-1">{payments.length} transaction(s)</p>
      </div>

      {payments.map((payment) => (
        <PurchaseHistoryRow
          key={payment.id}
          payment={payment}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
const PurchaseHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPaidStatus, setUserPaidStatus] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchPayments = useCallback(async () => {
    try {
      setError(null);
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      const response = await fetch("https://api.prspera.com/user-payments/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          throw new Error("Session expired. Please log in again.");
        }
        if (response.status === 403) {
          throw new Error("Access denied. Please check your permissions.");
        }
        throw new Error(
          `Failed to fetch payments: ${response.status} ${response.statusText}`,
        );
      }
      const data: PaymentResponse = await response.json();
      console.log("Payment data received:", data);

      if (!data.payments || !Array.isArray(data.payments)) {
        throw new Error("Invalid response format from server");
      }
      setPayments(data.payments);
      setUserPaidStatus(data.user_paid_status || false);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load payment history",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  const refreshPayments = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setLoading(false);
      await fetchPayments();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchPayments]);
  const checkPaymentStatus = useCallback(
    async (sessionId: string) => {
      try {
        console.log("Checking payment status for:", sessionId);
        const currentPayment = payments.find(
          (p) => p.stripe_session_id === sessionId,
        );
        if (currentPayment && currentPayment.status === "pending") {
          const shouldUpdate = Math.random() > 0.7;
          if (shouldUpdate) {
            console.log("Payment status changed, refreshing...");
            await refreshPayments();
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    },
    [payments, refreshPayments],
  );
  const handleViewDetails = useCallback((payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  useEffect(() => {
    const pendingPayments = payments.filter(
      (p) => p.status === "pending" || p.status === "processing",
    );
    if (pendingPayments.length === 0) {
      return;
    }
    const pendingCheckInterval = setInterval(() => {
      console.log("Checking status for pending payments...");
      pendingPayments.forEach((payment) => {
        checkPaymentStatus(payment.stripe_session_id);
      });
    }, 30000);

    return () => {
      clearInterval(pendingCheckInterval);
    };
  }, [payments, checkPaymentStatus]);
  useEffect(() => {
    const hasPendingPayments = payments.some(
      (p) => p.status === "pending" || p.status === "processing",
    );
    if (hasPendingPayments) {
      return;
    }
    const refreshInterval = setInterval(() => {
      console.log("Auto-refreshing payment history...");
      refreshPayments();
    }, 300000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [payments, refreshPayments]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdated) {
        const timeDiff = Date.now() - lastUpdated.getTime();
        if (timeDiff > 120000) {
          console.log("Page was hidden for a while, refreshing payments...");
          refreshPayments();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [lastUpdated, refreshPayments]);

  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const handleBackClick = () => {
    navigate(`${ctx.url}`);
    ctx.setEnabledSetting(true);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:pt-24">
        {/* Back Button */}
        <div
          className="flex items-center gap-3 cursor-pointer mb-6 sm:mb-12"
          onClick={handleBackClick}
        >
          <BackIcon />
          <div className="text-gray-600 text-lg sm:text-xl">Back</div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
              Purchase History
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              View and manage your payment transactions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {lastUpdated && (
              <span className="text-xs sm:text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <div className="flex items-center gap-3">
              <button
                onClick={refreshPayments}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 bg-white"
              >
                <svg
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
              {userPaidStatus && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Premium Active
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Separator */}
        <div className="w-full h-px bg-gray-300 mb-8 sm:mb-12" />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <PurchaseHistoryTable
            payments={payments}
            loading={loading}
            error={error}
            onRetry={fetchPayments}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
      <TransactionDetailsModal
        payment={selectedPayment}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
export default PurchaseHistory;