import React, { useState, useEffect, useCallback } from 'react';

// Types
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

// Back Button Component
interface BackButtonProps {
  to: string;
}

const BackButton = ({ to }: BackButtonProps) => {
  return (
    <div 
      onClick={() => window.history.back()} 
      className="flex items-center gap-[18px] cursor-pointer mb-[53px]"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3636 12.4994L18 20.4994L15.8182 22.7852L6 12.4994L15.8182 2.21373L18 4.49943L10.3636 12.4994Z" fill="black"/>
      </svg>
      <span className="text-[#555] text-2xl font-medium max-sm:text-lg">
        Back
      </span>
    </div>
  );
};

// Transaction Details Modal Component
interface TransactionDetailsModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsModal = ({ payment, isOpen, onClose }: TransactionDetailsModalProps) => {
  if (!isOpen || !payment) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status.toLowerCase()) {
      case 'completed':
      case 'succeeded':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'refunded':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'pending':
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-black">Transaction Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Payment Status */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-black">Status</span>
            <span className={getStatusBadge(payment.status)}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-black">Amount</span>
            <span className="text-2xl font-bold text-black">
              {formatAmount(payment.amount, payment.currency)}
            </span>
          </div>

          {/* Transaction Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">TRANSACTION ID</h3>
              <p className="text-black font-mono text-sm break-all">{payment.stripe_session_id}</p>
            </div>
            {payment.stripe_payment_intent_id && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">PAYMENT INTENT ID</h3>
                <p className="text-black font-mono text-sm break-all">{payment.stripe_payment_intent_id}</p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">PRODUCT</h3>
            <p className="text-black text-lg">{payment.product_name}</p>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">CUSTOMER NAME</h3>
              <p className="text-black">{payment.customer_name}</p>
            </div>
            {payment.company_name && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">COMPANY</h3>
                <p className="text-black">{payment.company_name}</p>
              </div>
            )}
          </div>

          {/* Email */}
          {payment.email && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">EMAIL</h3>
              <p className="text-black">{payment.email}</p>
            </div>
          )}

          {/* Date */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">TRANSACTION DATE</h3>
            <p className="text-black">{formatDate(payment.created_at)}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
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
                const blob = new Blob([receiptText], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `receipt-${payment.stripe_session_id}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              className="flex-1 border border-black p-3 hover:bg-gray-100 transition-colors"
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
${payment.company_name ? payment.company_name : ''}

Date: ${formatDate(payment.created_at)}

Item: ${payment.product_name}
Amount: ${formatAmount(payment.amount, payment.currency)}

Total: ${formatAmount(payment.amount, payment.currency)}
Status: ${payment.status.toUpperCase()}

=======
Thank you for your business!
                `;
                const blob = new Blob([invoiceText], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice-${payment.stripe_session_id}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              className="flex-1 border border-black p-3 hover:bg-gray-100 transition-colors"
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Purchase History Row Component
interface PurchaseHistoryRowProps {
  payment: Payment;
  onViewDetails: (payment: Payment) => void;
}

const PurchaseHistoryRow = ({ payment, onViewDetails }: PurchaseHistoryRowProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'succeeded':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'refunded':
        return 'text-orange-600';
      case 'pending':
      case 'processing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPaymentMethod = (status: string) => {
    if (status === 'completed' || status === 'succeeded') {
      return 'Credit Card';
    }
    return 'Card';
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

      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${payment.stripe_session_id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Failed to download receipt. Please try again.');
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
${payment.company_name ? payment.company_name : ''}

Date: ${formatDate(payment.created_at)}

Item: ${payment.product_name}
Amount: ${formatAmount(payment.amount, payment.currency)}

Total: ${formatAmount(payment.amount, payment.currency)}
Status: ${payment.status.toUpperCase()}

=======
Thank you for your business!
      `;

      const blob = new Blob([invoiceText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${payment.stripe_session_id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  return (
    <div className="flex items-center h-10 mb-6 max-md:flex-col max-md:items-start max-md:gap-2.5 max-sm:text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
      <div className="w-[183px] text-black text-base font-normal leading-[17.6px] max-md:w-auto">
        {payment.product_name}
      </div>
      <div className="w-14 text-black text-base font-normal leading-[17.6px] ml-[37px] max-md:w-auto">
        Plan
      </div>
      <div className="w-20 text-black text-base font-normal leading-[17.6px] ml-[57px] max-md:w-auto">
        {formatDate(payment.created_at)}
      </div>
      <div className="w-[51px] text-black text-base font-normal leading-[17.6px] ml-[37px] max-md:w-auto">
        {formatAmount(payment.amount, payment.currency)}
      </div>
      <div className={`w-[67px] text-base font-normal leading-[17.6px] ml-[46px] max-md:w-auto capitalize ${getStatusColor(payment.status)}`}>
        {payment.status}
      </div>
      <div className="w-[110px] text-black text-base font-normal leading-[17.6px] text-center ml-[27px] max-md:w-auto">
        {getPaymentMethod(payment.status)}
      </div>
      <div className="flex gap-4 ml-[27px]">
        <button 
          onClick={handleReceiptDownload}
          className="border cursor-pointer w-[87px] p-2.5 border-solid border-black hover:bg-gray-100 transition-colors max-sm:text-sm max-sm:p-2"
        >
          Receipt
        </button>
        <button 
          onClick={handleInvoiceDownload}
          className="border cursor-pointer w-[83px] p-2.5 border-solid border-black hover:bg-gray-100 transition-colors max-sm:text-sm max-sm:p-2"
        >
          Invoice
        </button>
        <button 
          onClick={() => onViewDetails(payment)}
          className="border cursor-pointer w-[87px] p-2.5 border-solid border-black hover:bg-gray-100 transition-colors max-sm:text-sm max-sm:p-2"
        >
          Details
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
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

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <p className="text-gray-600 text-lg mb-4">No payment history found</p>
    <p className="text-gray-500">Your payment history will appear here once you make a purchase.</p>
  </div>
);

// Purchase History Table Component
const PurchaseHistoryTable = ({ payments, loading, error, onRetry, onViewDetails }: {
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
      <div className="flex items-center h-5 mb-6 max-md:flex-col max-md:items-start max-md:gap-2.5 max-sm:text-sm">
        <div className="w-[183px] text-black text-lg font-medium leading-[19.8px] max-md:w-auto">
          Item
        </div>
        <div className="w-14 text-black text-lg font-medium leading-[19.8px] ml-[37px] max-md:w-auto">
          Type
        </div>
        <div className="w-20 text-black text-lg font-medium leading-[19.8px] ml-[57px] max-md:w-auto">
          Date
        </div>
        <div className="w-[51px] text-black text-lg font-medium leading-[19.8px] ml-[37px] max-md:w-auto">
          Amount
        </div>
        <div className="w-[67px] text-black text-lg font-medium leading-[19.8px] ml-[46px] max-md:w-auto">
          Status
        </div>
        <div className="w-[110px] text-black text-lg font-medium leading-[19.8px] ml-[27px] max-md:w-auto">
          Payment Type
        </div>
        <div className="text-black text-lg font-medium leading-[19.8px] ml-[27px] max-md:w-auto">
          Actions
        </div>
      </div>
      <div className="w-[984px] h-px bg-[#555] mb-8" />
      
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

// Main Purchase History Component
const PurchaseHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPaidStatus, setUserPaidStatus] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchPayments = useCallback(async () => {
    try {
      setError(null);

      // Get auth token from localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await fetch('https://intern-project-final-1.onrender.com/user-payments/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Clear invalid token and redirect to login
          localStorage.removeItem('access_token');
          throw new Error('Session expired. Please log in again.');
        }
        if (response.status === 403) {
          throw new Error('Access denied. Please check your permissions.');
        }
        throw new Error(`Failed to fetch payments: ${response.status} ${response.statusText}`);
      }

      const data: PaymentResponse = await response.json();
      console.log('Payment data received:', data);
      
      // Ensure we have the expected data structure
      if (!data.payments || !Array.isArray(data.payments)) {
        throw new Error('Invalid response format from server');
      }

      setPayments(data.payments);
      setUserPaidStatus(data.user_paid_status || false);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load payment history');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since this function doesn't depend on any state

  // Real-time refresh function
  const refreshPayments = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setLoading(false); // Don't show main loading spinner for refresh
      await fetchPayments();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchPayments]);

  // Check for payment status updates - memoized to prevent infinite loops
  const checkPaymentStatus = useCallback(async (sessionId: string) => {
    try {
      console.log('Checking payment status for:', sessionId);
      
      // Simulate status check
      const currentPayment = payments.find(p => p.stripe_session_id === sessionId);
      if (currentPayment && currentPayment.status === 'pending') {
        // Simulate status change
        const shouldUpdate = Math.random() > 0.7; // 30% chance of status change
        if (shouldUpdate) {
          console.log('Payment status changed, refreshing...');
          await refreshPayments();
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }, [payments, refreshPayments]);

  const handleViewDetails = useCallback((payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  }, []);

  // Initial load - only runs once
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Set up intervals for pending payment checks - properly memoized
  useEffect(() => {
    const pendingPayments = payments.filter(p => 
      p.status === 'pending' || p.status === 'processing'
    );

    if (pendingPayments.length === 0) {
      return; // No pending payments, no need to set up intervals
    }

    // Check pending payments every 30 seconds
    const pendingCheckInterval = setInterval(() => {
      console.log('Checking status for pending payments...');
      pendingPayments.forEach(payment => {
        checkPaymentStatus(payment.stripe_session_id);
      });
    }, 30000);

    return () => {
      clearInterval(pendingCheckInterval);
    };
  }, [payments, checkPaymentStatus]); // Only re-run when payments array changes

  // General refresh interval - separate from pending checks
  useEffect(() => {
    // Only set up auto-refresh if there are no pending payments
    const hasPendingPayments = payments.some(p => 
      p.status === 'pending' || p.status === 'processing'
    );

    if (hasPendingPayments) {
      return; // Don't set up general refresh if we have pending payments
    }

    // Auto-refresh every 5 minutes for completed payments
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing payment history...');
      refreshPayments();
    }, 300000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [payments, refreshPayments]);

  // Handle page visibility change - refresh when user comes back to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdated) {
        const timeDiff = Date.now() - lastUpdated.getTime();
        // If page was hidden for more than 2 minutes, refresh
        if (timeDiff > 120000) {
          console.log('Page was hidden for a while, refreshing payments...');
          refreshPayments();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastUpdated, refreshPayments]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <BackButton to="/" />
      
      <div className="flex items-center justify-between mb-[50px]">
        <h1 className="text-black text-[32px] font-medium leading-[35.2px] max-sm:text-2xl">
          Purchase History
        </h1>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={refreshPayments}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg 
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          {userPaidStatus && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Premium Active
            </div>
          )}
        </div>
      </div>

      <div className="w-[948px] h-px bg-[#555] mb-[61px]" />
      
      <PurchaseHistoryTable 
        payments={payments}
        loading={loading}
        error={error}
        onRetry={fetchPayments}
        onViewDetails={handleViewDetails}
      />

      <TransactionDetailsModal
        payment={selectedPayment}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default PurchaseHistory;