
import React, { useState } from 'react';

interface BillingFormData {
  fullName: string;
  email: string;
  companyName?: string;
}

interface PaymentResponse {
  sessionId?: string;
  error?: string;
}

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [billingData, setBillingData] = useState<BillingFormData>({
    fullName: '',
    email: '',
    companyName: ''
  });

  const features = [
    "50 bids per month",
    "50 skills learning",
    "Custom cover photo",
    "Unlimited revisions",
    "Unlock rewards"
  ];

  // Get authentication token from localStorage or wherever you store it
  const getAuthToken = () => {
    return localStorage.getItem('access_token') || '';
  };

  // Handle form input changes
  const handleInputChange = (field: keyof BillingFormData, value: string) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Create Stripe checkout session
  const createCheckoutSession = async (): Promise<PaymentResponse> => {
    try {
      const response = await fetch('/api/create-checkout-session/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          amount: 2999, // $29.99
          product_name: 'Yes, I\'ll start slowly - Premium Plan',
          billing_info: billingData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  };

  // Handle payment confirmation
  const handlePaymentConfirmation = async () => {
    // Validate required fields
    if (!billingData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    if (!billingData.email.trim()) {
      alert('Please enter your billing email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Create checkout session
      const result = await createCheckoutSession();
      
      if (result.error) {
        alert(`Payment Error: ${result.error}`);
        return;
      }

      if (result.sessionId) {
        // Redirect to Stripe Checkout
        const stripe = (window as any).Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'your_stripe_publishable_key');
        
        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });

        if (error) {
          console.error('Stripe redirect error:', error);
          alert(`Payment redirect failed: ${error.message}`);
        }
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      alert('An unexpected error occurred. Please try again.');
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
      className={`flex items-center justify-center gap-2 border text-lg text-gray-600 cursor-pointer px-6 py-3 rounded-xl border-solid transition-colors ${
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

  return (
    <div className="min-h-screen">
      {/* Stripe.js Script */}
      <script src="https://js.stripe.com/v3/"></script>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 text-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="space-y-12">
            {/* Billing Form */}
            <section>
              <h2 className="text-3xl font-bold text-black mb-2">
                Billing Information
              </h2>
              <p className="text-base font-bold text-gray-600 mb-8">
                Used for invoices and billing communication
              </p>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={billingData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter billing email"
                    value={billingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter company name (optional)"
                    value={billingData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full h-16 px-6 text-lg text-gray-600 border border-gray-400 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                </div>
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
              
              {selectedMethod === 'bank' && (
                <>
                  <div className="relative mb-6">
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
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="aspect-video border border-gray-400 rounded-xl flex items-center justify-center bg-gray-50 hover:border-gray-600 transition-colors cursor-pointer"
                      >
                        <div className="w-16 h-8 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                          BANK {index}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
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
                    Yes, I'll start slowly
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    seats available for 50 members
                  </p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-black">$2,999</span>
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
                  <span className="text-xl font-bold text-black">$2,999.00</span>
                </div>
              </div>
              
              <button 
                className={`w-full h-16 text-white text-base font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                }`}
                onClick={handlePaymentConfirmation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Confirm and Subscribe'
                )}
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;