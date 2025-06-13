import { useAuth } from "@/utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PurchaseOptionsModal = ({ isOpen, onClose, price }) => {
    const navigate = useNavigate()
    const [showBillingForm, setShowBillingForm] = useState(false);
    const {user} = useAuth()

    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        email: '',
        companyName: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handlePurchaseNowClick = () => {
        if(!user)
            navigate("/auth")
        setShowBillingForm(true);
    };

    const handleBackToOptions = () => {
        setShowBillingForm(false);
    };

    const handleProceedToCheckout = async () => {
        // Validate required fields
        if (!billingInfo.fullName || !billingInfo.email) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Convert price string to cents (remove $ and convert to number)
            const priceInCents = parseInt(price.replace('$', '').replace(',', '')) * 100;

            // Make API call to create Stripe checkout session
            const response = await fetch('https://intern-project-final-1.onrender.com/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({
                    amount: priceInCents, // Use dynamic price
                    product_name: 'Premium Plan',
                    billing_info: billingInfo // Use form data
                })
            });

            const data = await response.json();

            if (response.ok && data.url) {
                window.location.href = data.url;
            } else {
                console.error('Error creating checkout session:', data.error);
                alert('Error creating checkout session. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
        
        onClose();
    };
  
    const handleBookSession = () => {
        console.log("Book session clicked");
        // Implement booking logic here
        onClose();
    };

    const billingForm = (
        <div className="mt-4 space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={billingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                />
            </div>
            
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                />
            </div>
            
            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name (Optional)
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={billingInfo.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
            </div>
        </div>
    );

    // Billing Form Modal Content
    const renderBillingFormModal = () => (
        <div className="flex w-full flex-col items-stretch mt-1 px-6 max-md:max-w-full max-md:px-5">
            {/* Back Button */}
            <button 
                onClick={handleBackToOptions}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Options
            </button>

            <h2 className="text-black text-[28px] font-semibold">
                Billing Information
            </h2>
            
            <div className="mt-[27px]">
                <div className="bg-white border flex flex-col overflow-hidden px-8 py-9 rounded-2xl border-[rgba(85,85,85,0.5)] border-solid max-md:max-w-full max-md:px-5">
                    <h3 className="text-black text-[22px]">Complete Your Purchase - {price}</h3>
                    <p className="text-[#555] text-xl mt-3">Please fill in your billing information to proceed to checkout.</p>
                    
                    {billingForm}
                    
                    <button
                        onClick={handleProceedToCheckout}
                        className="self-stretch overflow-hidden text-base font-normal mt-[26px] px-[70px] py-[17px] rounded-lg bg-black text-white max-md:max-w-full max-md:px-5"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );

    // Purchase Options Modal Content
    const renderPurchaseOptionsModal = () => (
        <div className="flex w-full flex-col items-stretch mt-1 px-6 max-md:max-w-full max-md:px-5">
            <h2 className="text-black text-[28px] font-semibold">
                Choose your Purchase Option
            </h2>
            
            <div className="mt-[27px] space-y-6">
                {/* Purchase Now Card */}
                <div className="bg-white border flex flex-col overflow-hidden px-8 py-9 rounded-2xl border-[rgba(85,85,85,0.5)] border-solid max-md:max-w-full max-md:px-5">
                    <h3 className="text-black text-[22px]">Purchase Now - {price}</h3>
                    <p className="text-[#555] text-xl mt-3">Get Immediate access to all features.</p>
                    
                    <button
                        onClick={handlePurchaseNowClick}
                        className="self-stretch overflow-hidden text-base font-normal mt-[26px] px-[70px] py-[17px] rounded-lg bg-black text-white max-md:max-w-full max-md:px-5"
                    >
                        Purchase Now
                    </button>
                </div>
                
                {/* Book Session Card */}
                <div className="bg-white border flex flex-col overflow-hidden px-8 py-9 rounded-2xl border-[rgba(85,85,85,0.5)] border-solid max-md:max-w-full max-md:px-5">
                    <h3 className="text-black text-[22px]">Book 30 - Minute Session</h3>
                    <p className="text-[#555] text-xl mt-3">Schedule a consultation and purchase later</p>
                    <button
                        onClick={handleBookSession}
                        className="self-stretch overflow-hidden text-base font-normal mt-[26px] px-[70px] py-[17px] rounded-lg border border-black border-solid text-black max-md:max-w-full max-md:px-5"
                    >
                        Book Session
                    </button>
                </div>
            </div>
        </div>
    );
  
    if (!isOpen) return null;
  
    return (
        <div className="fixed w-screen h-screen flex items-center justify-center z-[1000] bg-[rgba(0,0,0,0.5)] left-0 top-0">
            <div className="bg-white flex max-w-[613px] flex-col overflow-hidden items-stretch font-medium pt-6 pb-[30px] rounded-3xl mx-auto relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
                {/* Close icon in top right */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
                    aria-label="Close modal"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                {/* Conditional rendering based on current step */}
                {showBillingForm ? renderBillingFormModal() : renderPurchaseOptionsModal()}
            </div>
        </div>
    );
};