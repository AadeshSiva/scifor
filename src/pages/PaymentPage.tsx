import React, { useEffect, useState } from 'react';

interface BillingFormData {
  fullName: string;
  email: string;
  companyName: string;
}

interface BankAccountData {
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  accountHolderName: string;
}

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [searchQuery, setSearchQuery] = useState('');
  const [billingInfo, setBillingInfo] = useState<BillingFormData>({
    fullName: '',
    email: '',
    companyName: ''
  });
  const [bankInfo, setBankInfo] = useState<BankAccountData>({
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    accountHolderName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [cardElement, setCardElement] = useState<any>(null);

  const features = [
    "50 bids per month",
    "50 skills learning",
    "Custom cover photo",
    "Unlimited revisions",
    "Unlock rewards"
  ];

  const planDetails = {
    name: "Yes, I'll start slowly",
    price: 2999,
    description: "seats available for 50 members"
  };

  useEffect(() => {
    const initializeStripe = async () => {
      if (!window.Stripe) {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;
        script.onload = () => {
          const stripeInstance = window.Stripe('pk_test_51RPvxVGq7lR7zc6NwAd6VKBnrteOef9QOGEBwAdhmOYCdkB84JZ1C6X3MpddKym6jtVGGBvRlKS9dWV7tG2UtAYS00dZUM68Xv');
          setStripe(stripeInstance);
          
          const elementsInstance = stripeInstance.elements({
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#000000',
                colorBackground: '#ffffff',
                colorText: '#4b5563',
                colorDanger: '#ef4444',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                spacingUnit: '6px',
                borderRadius: '12px',
              }
            }
          });
          setElements(elementsInstance);
          
          const cardElementInstance = elementsInstance.create('card', {
            style: {
              base: {
                fontSize: '18px',
                color: '#4b5563',
                '::placeholder': {
                  color: '#9ca3af',
                },
                padding: '24px',
              },
              invalid: {
                color: '#ef4444',
                iconColor: '#ef4444'
              }
            },
            hidePostalCode: true
          });
          
          cardElementInstance.mount('#card-element');
          setCardElement(cardElementInstance);
          
          cardElementInstance.on('change', (event: any) => {
            if (event.error) {
              setError(event.error.message);
            } else {
              setError(null);
            }
          });
        };
        document.head.appendChild(script);
      }
    };

    initializeStripe();
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBankInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateBillingInfo = (): boolean => {
    if (!billingInfo.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!billingInfo.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(billingInfo.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateBankAccount = (): boolean => {
    if (!bankInfo.accountNumber.trim()) {
      setError('Account number is required');
      return false;
    }
    if (!bankInfo.routingNumber.trim() || bankInfo.routingNumber.length !== 9) {
      setError('Please enter a valid 9-digit routing number');
      return false;
    }
    if (!bankInfo.accountHolderName.trim()) {
      setError('Account holder name is required');
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    if (!validateBillingInfo()) return;
    
    if (selectedMethod === 'bank' && !validateBankAccount()) return;
    
    if (selectedMethod === 'credit' && (!stripe || !cardElement)) {
      setError('Payment system is still loading. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token"); // Replace with actual token logic
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      let paymentMethodData = {};

      if (selectedMethod === 'credit') {
        // Create payment method using Stripe Elements
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: billingInfo.fullName,
            email: billingInfo.email,
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        paymentMethodData = {
          payment_method_id: paymentMethod.id,
          type: 'card'
        };

      } else if (selectedMethod === 'bank') {
        paymentMethodData = {
          type: 'us_bank_account',
          us_bank_account: {
            account_number: bankInfo.accountNumber,
            routing_number: bankInfo.routingNumber,
            account_type: bankInfo.accountType,
            account_holder_type: 'individual'
          },
          billing_details: {
            name: bankInfo.accountHolderName,
            email: billingInfo.email
          }
        };
      }

      // Send payment data to your backend
      const response = await fetch('https://intern-project-final-1.onrender.com/process-tokenized-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: planDetails.price,
          product_name: planDetails.name,
          billing_info: billingInfo,
          payment_method_data: paymentMethodData,
          currency: 'usd'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      // Handle 3D Secure authentication if required
      if (data.requires_action && data.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
        
        if (confirmError) {
          throw new Error(confirmError.message);
        }
        
        setSuccess(true);
        
      } else if (data.status === 'succeeded') {
        setSuccess(true);
      } else {
        throw new Error(data.error || 'Payment failed');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const PaymentMethodButton: React.FC<{
    icon?: string;
    label: string;
    selected?: boolean;
    onClick: () => void;
  }> = ({ icon, label, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 border text-gray-600 cursor-pointer px-8 py-3 rounded-xl border-solid transition-colors ${
        selected ? 'border-black bg-gray-50' : 'border-gray-400 hover:border-gray-600'
      } flex-1 min-w-0`}
    >
      {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z" fill="black"/>
    </svg>
  );

  const PlanFeature: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-3 text-base text-gray-600">
      <CheckIcon />
      <span>{text}</span>
    </div>
  );

  const creditCardIcon = `<svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.00423 2.5H18.0042C18.4645 2.5 18.8376 2.87309 18.8376 3.33333V16.6667C18.8376 17.1269 18.4645 17.5 18.0042 17.5H3.00423C2.544 17.5 2.1709 17.1269 2.1709 16.6667V3.33333C2.1709 2.87309 2.544 2.5 3.00423 2.5ZM17.1709 9.16667H3.83757V15.8333H17.1709V9.16667ZM17.1709 7.5V4.16667H3.83757V7.5H17.1709ZM12.1709 12.5H15.5042V14.1667H12.1709V12.5Z" fill="currentColor"></path></svg>`;
  
  const bankIcon = `<svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.16699 16.6665H18.8337V18.3332H2.16699V16.6665ZM3.83366 9.99984H5.50033V15.8332H3.83366V9.99984ZM8.00033 9.99984H9.66699V15.8332H8.00033V9.99984ZM11.3337 9.99984H13.0003V15.8332H11.3337V9.99984ZM15.5003 9.99984H17.167V15.8332H15.5003V9.99984ZM2.16699 5.83317L10.5003 1.6665L18.8337 5.83317V9.1665H2.16699V5.83317ZM3.83366 6.86323V7.49984H17.167V6.86323L10.5003 3.5299L3.83366 6.86323ZM10.5003 6.6665C10.0401 6.6665 9.66699 6.2934 9.66699 5.83317C9.66699 5.37294 10.0401 4.99984 10.5003 4.99984C10.9606 4.99984 11.3337 5.37294 11.3337 5.83317C11.3337 6.2934 10.9606 6.6665 10.5003 6.6665Z" fill="currentColor"></path></svg>`;

  const dropdownIcon = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.3335L5 8.3335H15L10 13.3335Z" fill="currentColor"></path></svg>`;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your subscription has been activated.</p>
          <p className="text-sm text-gray-500">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 text-[16px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="space-y-12">
            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}

            {/* Billing Form */}
            <section>
              <h2 className="text-3xl font-semibold text-black mb-2">
                Billing Information
              </h2>
              <p className="text-base font-light text-gray-600 mb-8 mt-6">
                Used for invoices and billing communication
              </p>
              <div className="space-y-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={billingInfo.fullName}
                  onChange={handleBillingChange}
                  className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter billing email"
                  value={billingInfo.email}
                  onChange={handleBillingChange}
                  className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name (optional)"
                  value={billingInfo.companyName}
                  onChange={handleBillingChange}
                  className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                />
              </div>
            </section>
            
            {/* Payment Methods */}
            <section>
              <h2 className="text-3xl font-bold text-black mb-6">
                Pay with
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <PaymentMethodButton
                  icon={creditCardIcon}
                  label="Credit Card"
                  selected={selectedMethod === 'credit'}
                  onClick={() => setSelectedMethod('credit')}
                />
                <PaymentMethodButton
                  icon={bankIcon}
                  label="Bank Account"
                  selected={selectedMethod === 'bank'}
                  onClick={() => setSelectedMethod('bank')}
                />
                <PaymentMethodButton
                  label="Others"
                  icon={dropdownIcon}
                  selected={selectedMethod === 'others'}
                  onClick={() => setSelectedMethod('others')}
                />
              </div>

              {/* Stripe Elements Card Form */}
              {selectedMethod === 'credit' && (
                <div className="space-y-6">
                  <div className="border border-gray-400 rounded-xl p-6 focus-within:border-black transition-colors">
                    <div id="card-element" className="min-h-[60px]">
                      {/* Stripe Elements will mount here */}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                    </svg>
                    Your card details are secure and encrypted by Stripe
                  </p>
                </div>
              )}

              {/* Bank Account Form */}
              {selectedMethod === 'bank' && (
                <div className="space-y-6">
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="Account holder name"
                    value={bankInfo.accountHolderName}
                    onChange={handleBankChange}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                  
                  <input
                    type="text"
                    name="routingNumber"
                    placeholder="Routing number (9 digits)"
                    value={bankInfo.routingNumber}
                    onChange={handleBankChange}
                    maxLength={9}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                  
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account number"
                    value={bankInfo.accountNumber}
                    onChange={handleBankChange}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                  
                  <select
                    name="accountType"
                    value={bankInfo.accountType}
                    onChange={handleBankChange}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors bg-white"
                  >
                    <option value="checking">Checking Account</option>
                    <option value="savings">Savings Account</option>
                  </select>
                </div>
              )}

              {/* Other Payment Methods */}
              {selectedMethod === 'others' && (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for your bank"
                      className="w-full h-16 pl-14 pr-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['PayPal', 'Apple Pay', 'Google Pay'].map((method, index) => (
                      <div
                        key={index}
                        className="aspect-video border border-gray-400 rounded-xl flex items-center justify-center bg-gray-50 hover:border-gray-600 transition-colors cursor-pointer"
                      >
                        <div className="text-sm font-medium text-gray-700">
                          {method}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Section - Plan Details */}
          <div className="lg:pl-8">
            <section className="sticky top-8">
              <h2 className="text-3xl font-bold text-black mb-6">
                Plan Details
              </h2>
              <div className="border border-gray-400 rounded-2xl p-8 mb-6">
                <div className="mb-8">
                  <h3 className="text-2xl text-black mb-2">
                    {planDetails.name}
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    {planDetails.description}
                  </p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-black">${planDetails.price}</span>
                    <span className="text-sm text-gray-500 ml-2">/ one time payment</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-base font-bold text-black mb-4">
                    This includes:
                  </h4>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <PlanFeature key={index} text={feature} />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-300">
                  <span className="text-lg text-gray-600">Total Price (USD)</span>
                  <span className="text-xl font-bold text-black">${planDetails.price}.00</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  className={`w-full h-16 text-white text-base font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-black hover:bg-gray-800'
                  }`}
                  onClick={processPayment}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing Payment...' : 'Complete Payment'}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                  </svg>
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;