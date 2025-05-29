import React, { useState, useEffect } from 'react';

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

// Purchase History Row Component
interface PurchaseHistoryRowProps {
  payment: Payment;
}

const PurchaseHistoryRow = ({ payment }: PurchaseHistoryRowProps) => {
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

  const getPaymentType = (status: string) => {
    // This is a simplified version - you might want to store actual payment method info
    if (status === 'completed' || status === 'succeeded') {
      return 'Credit Card';
    }
    return 'Payment Method';
  };

  const handleReceiptDownload = async () => {
    try {
      // You can implement receipt download logic here
      // For now, we'll just show an alert
      alert('Receipt download functionality would be implemented here');
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  const handleInvoiceDownload = async () => {
    try {
      // You can implement invoice download logic here
      alert('Invoice download functionality would be implemented here');
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

  return (
    <div className="flex items-center h-10 mb-6 max-md:flex-col max-md:items-start max-md:gap-2.5 max-sm:text-sm">
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
        {getPaymentType(payment.status)}
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
const PurchaseHistoryTable = ({ payments, loading, error, onRetry }: {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
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
      </div>
      <div className="w-[984px] h-px bg-[#555] mb-8" />
      
      {payments.map((payment) => (
        <PurchaseHistoryRow
          key={payment.id}
          payment={payment}
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

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token from localStorage or wherever you store it
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await fetch('https://intern-project-final-1.onrender.com/payment-history/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(`Failed to fetch payments: ${response.status}`);
      }

      const data: PaymentResponse = await response.json();
      console.log(data)
      setPayments(data.payments);
      setUserPaidStatus(data.user_paid_status);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <BackButton to="/" />
      
      <div className="flex items-center justify-between mb-[50px]">
        <h1 className="text-black text-[32px] font-medium leading-[35.2px] max-sm:text-2xl">
          Purchase History
        </h1>
        {userPaidStatus && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Premium Active
          </div>
        )}
      </div>

      <div className="w-[948px] h-px bg-[#555] mb-[61px]" />
      
      <PurchaseHistoryTable 
        payments={payments}
        loading={loading}
        error={error}
        onRetry={fetchPayments}
      />
    </div>
  );
};

export default PurchaseHistory;