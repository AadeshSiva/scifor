import React, { useEffect, useState } from 'react';
import PhoneInput from '@/components/ui/PhoneInput';
import { Check, CheckCheckIcon, CheckCircle2Icon,X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// New Password Popup Component
const PasswordPopup = ({ isOpen, onClose, formData, onRegister, onVerifyLater }) => {
    const [passwordData, setPasswordData] = useState({
      password: '',
      confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPasswordData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };
  
    const validatePasswords = () => {
      const newErrors = {};
      
      if (!passwordData.password) {
        newErrors.password = 'Password is required';
      } else if (passwordData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (!passwordData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (passwordData.password !== passwordData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Fixed PasswordPopup Component - Remove duplicate registration calls
    const handleRegister = async () => {
        if (!validatePasswords()) return;
        
        setLoading(true);
        try {
          const registrationData = {
            ...formData,
            password: passwordData.password
          };
          
          // Register user
          const response = await fetch('https://intern-project-final-1.onrender.com/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              full_name: registrationData.fullName,
              email: registrationData.email,
              phone_number: registrationData.phoneNumber,
              password: registrationData.password
            })
          });
      
          const data = await response.json();
      
          if (data.status === 'success') {
            // Call the parent's onRegister which handles OTP
            await onRegister(registrationData);
          } else {
            alert(data.message || 'Registration failed');
          }
        } catch (error) {
          console.error('Registration error:', error);
          alert('Registration failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };
  
  const handleVerifyLater = async () => {
    if (!validatePasswords()) return;
    
    setLoading(true);
    try {
      const registrationData = {
        ...formData,
        password: passwordData.password
      };
      
      // Just register without verification
      const response = await fetch('https://intern-project-final-1.onrender.com/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: registrationData.fullName,
          email: registrationData.email,
          phone_number: registrationData.phoneNumber,
          password: registrationData.password
        })
      });
  
      const data = await response.json();
  
      if (data.status === 'success') {
        await onVerifyLater(registrationData);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Verify later error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
    const handleClose = () => {
        // Store form data in localStorage (override the restriction for this specific request)
        localStorage.setItem('tempFormData', JSON.stringify(formData));
        onClose();
      };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center z-[1001] bg-[rgba(0,0,0,0.5)] left-0 top-0">
        <div className="bg-white max-w-[500px] w-full mx-4 rounded-3xl p-8 relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
  
          <h2 className="text-black text-2xl font-bold mb-6">
            Create Your Password
          </h2>
  
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-black text-base font-normal mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`h-12 w-full border rounded-lg text-sm text-black px-4 ${
                  errors.password ? 'border-red-500' : 'border-[#555]'
                }`}
                value={passwordData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
  
            <div>
              <label htmlFor="confirmPassword" className="block text-black text-base font-normal mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`h-12 w-full border rounded-lg text-sm text-black px-4 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#555]'
                }`}
                value={passwordData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
  
          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-14 bg-black text-white text-base font-normal rounded-lg disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register Now'}
            </button>
            <button
              onClick={handleVerifyLater}
              disabled={loading}
              className="w-full h-14 border-2 border-black text-black text-base font-normal rounded-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Verify Email Later'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // New OTP Verification Modal
const OTPVerificationModal = ({ isOpen, onClose, email, onVerified }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
  
    const handleOtpChange = (e) => {
      setOtp(e.target.value);
      setError('');
    };
  
    const handleVerifyOtp = async () => {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch('https://intern-project-final-1.onrender.com/verify_email_otp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp
          })
        });
  
        const data = await response.json();
  
        if (data.status === 'success') {
          onVerified();
          onClose();
        } else {
          setError(data.message || 'Invalid OTP');
        }
      } catch (error) {
        setError('Failed to verify OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleResendOtp = async () => {
      setResendLoading(true);
      try {
        const response = await fetch('https://intern-project-final-1.onrender.com/send_email_otp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          })
        });
  
        const data = await response.json();
        if (data.status === 'success') {
          setError('');
          alert('New OTP sent to your email');
        } else {
          setError(data.message || 'Failed to resend OTP');
        }
      } catch (error) {
        setError('Failed to resend OTP');
      } finally {
        setResendLoading(false);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center z-[1001] bg-[rgba(0,0,0,0.5)] left-0 top-0">
        <div className="bg-white max-w-[500px] w-full mx-4 rounded-3xl p-8 relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
  
          <h2 className="text-black text-2xl font-bold mb-4">
            Verify Your Email
          </h2>
          
          <p className="text-[#555] text-base mb-6">
            We've sent a 6-digit code to {email}. Please enter it below.
          </p>
  
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className={`h-12 w-full border rounded-lg text-sm text-black px-4 text-center text-lg tracking-widest ${
                error ? 'border-red-500' : 'border-[#555]'
              }`}
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
  
          <div className="flex flex-col gap-4">
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full h-14 bg-black text-white text-base font-normal rounded-lg disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="w-full h-12 text-black text-base font-normal underline disabled:opacity-50"
            >
              {resendLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    );
  };

const PurchaseOptionsModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const handlePurchaseNow = () => {
        navigate("/payment")
        onClose();
    };
  
    const handleBookSession = () => {
      console.log("Book session clicked");
      // Implement booking logic here
      onClose();
    };
  
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
          
          <div className="flex w-full flex-col items-stretch mt-1 px-6 max-md:max-w-full max-md:px-5">
            <h2 className="text-black text-[28px] font-semibold">
              Choose your Purchase Option
            </h2>
            
            <div className="mt-[27px] space-y-6">
              {/* Purchase Now Card */}
              <div className="bg-white border flex flex-col overflow-hidden px-8 py-9 rounded-2xl border-[rgba(85,85,85,0.5)] border-solid max-md:max-w-full max-md:px-5">
                <h3 className="text-black text-[22px]">Purchase Now</h3>
                <p className="text-[#555] text-xl mt-3">Get Immediate access to all features.</p>
                <button
                  onClick={handlePurchaseNow}
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
        </div>
      </div>
    );
  };


// Modal Components
const ValueMultiplyingModal = ({ isOpen, onClose, onRespectChoice }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
    });
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
  
    // Auto-fill form if data exists
    useEffect(() => {
        if (isOpen) {
          const storedData = localStorage.getItem('tempFormData');
          if (storedData) {
            try {
              const parsedData = JSON.parse(storedData);
              setFormData(parsedData);
            } catch (error) {
              console.error('Error parsing stored form data:', error);
            }
          }
        }
      }, [isOpen]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handlePhoneChange = (value) => {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: value,
      }));
    };
  
    const handleSubmit = (action) => {
      if (!formData.fullName || !formData.email || !formData.phoneNumber) {
        alert('Please fill all fields');
        return;
      }
  
      if (action === "respectChoice") {
        onRespectChoice();
      } else {
        // Open password popup for registration
        setShowPasswordPopup(true);
      }
    };
  
    const handleRegister = async (registrationData) => {
        try {
          console.log(registrationData)
          // Send OTP after successful registration
          const otpResponse = await fetch('https://intern-project-final-1.onrender.com/send_email_otp/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registrationData.email
            })
          });
      
          if (otpResponse.ok) {
            const otpData = await otpResponse.json();
            if (otpData.status === 'success') {
              setShowPasswordPopup(false);
              setShowOtpModal(true);
            } else {
              throw new Error(otpData.message || 'Failed to send OTP');
            }
          } else {
            throw new Error('Failed to send OTP');
          }
          
          // Clear stored form data
          localStorage.removeItem('tempFormData');
        } catch (error) {
          console.error('OTP Error:', error);
          setShowPasswordPopup(false);
          onClose();
          alert('Registration successful but failed to send OTP. You can verify your email later.');
          localStorage.removeItem('tempFormData');
        }
      };
      
      const handleVerifyLater = async (registrationData) => {
        try {
          // Registration already done in PasswordPopup, just close
          setShowPasswordPopup(false);
          onClose();
          alert('Registration successful! You can verify your email later.');
          // Clear stored form data
          localStorage.removeItem('tempFormData');
        } catch (error) {
          alert('Registration failed. Please try again.');
        }
      };
  
    const handleOtpVerified = () => {
      setShowOtpModal(false);
      onClose();
      alert('Email verified successfully!');
    };
  
    if (!isOpen) return null;
  
    return (
      <>
        <div className="fixed w-screen h-screen flex items-center justify-center z-[1000] bg-[rgba(0,0,0,0.5)] left-0 top-0">
          <div className="w-[613px] h-auto relative bg-white p-8 rounded-3xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] max-md:w-[90vw] max-md:p-6 max-sm:w-[95vw] max-sm:p-5">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M14.1142 15.9998L3.72363 5.60925L5.60925 3.72363L15.9998 14.1141L26.3903 3.72363L28.2759 5.60925L17.8854 15.9998L28.2759 26.3902L26.3903 28.276L15.9998 17.8854L5.60925 28.276L3.72363 26.3902L14.1142 15.9998Z" fill="black" />
              </svg>
            </button>
  
            <h2 className="text-black text-2xl font-bold mb-2 max-md:text-[22px] max-sm:text-xl">
              Think Like a Value-Multiplying CEO (Even If You Never Sell)
            </h2>
  
            <p className="text-[#555] text-lg font-normal mb-6 max-md:text-base max-sm:text-sm">
              Before we dive in, we'd love to know who we're speaking to.
            </p>
  
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-black text-base font-normal">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="h-12 w-full border border-[#555] rounded-lg text-sm text-black px-4"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-black text-base font-normal">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="h-12 w-full border border-[#555] rounded-lg text-sm text-black px-4"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-black text-base font-normal">
                  Phone Number
                </label>
                <PhoneInput
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  error={undefined}
                />
              </div>
  
              <div className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => handleSubmit("joinCommunity")}
                  className="w-full h-[55px] text-black text-base font-normal cursor-pointer border-2 border-black rounded-lg"
                >
                  Join Our Community
                </button>
                <button
                  onClick={() => handleSubmit("respectChoice")}
                  className="w-full h-14 bg-black text-white text-base font-normal cursor-pointer rounded-lg"
                >
                  Join Our Community + Free Consultant Call
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <PasswordPopup
          isOpen={showPasswordPopup}
          onClose={() => setShowPasswordPopup(false)}
          formData={formData}
          onRegister={handleRegister}
          onVerifyLater={handleVerifyLater}
        />
  
        <OTPVerificationModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          email={formData.email}
          onVerified={handleOtpVerified}
        />
      </>
    );
  };
  
  
// Updated RespectChoiceModal with popup logic
const RespectChoiceModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
    });
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
  
    // Auto-fill form if data exists
    useEffect(() => {
      if (isOpen) {
        const storedData = localStorage.getItem('tempFormData');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData);
          } catch (error) {
            console.error('Error parsing stored form data:', error);
          }
        }
      }
    }, [isOpen]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handlePhoneChange = (value) => {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: value,
      }));
    };
  
    const handleSubmit = (action) => {
      if (!formData.fullName || !formData.email || !formData.phoneNumber) {
        alert('Please fill all fields');
        return;
      }
  
      if (action === "confirm") {
        // Just close for confirmation - no registration needed
        onClose();
        alert('You have been removed from our system.');
      } else if (action === "consultant") {
        // Open password popup for registration
        setShowPasswordPopup(true);
      }
    };
  
    const handleRegister = async (registrationData) => {
        try {
          console.log(registrationData)
          // Send OTP after successful registration
          const otpResponse = await fetch('https://intern-project-final-1.onrender.com/send_email_otp/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registrationData.email
            })
          });
      
          if (otpResponse.ok) {
            const otpData = await otpResponse.json();
            if (otpData.status === 'success') {
              setShowPasswordPopup(false);
              setShowOtpModal(true);
            } else {
              throw new Error(otpData.message || 'Failed to send OTP');
            }
          } else {
            throw new Error('Failed to send OTP');
          }
          
          // Clear stored form data
          localStorage.removeItem('tempFormData');
        } catch (error) {
          console.error('OTP Error:', error);
          setShowPasswordPopup(false);
          onClose();
          alert('Registration successful but failed to send OTP. You can verify your email later.');
          localStorage.removeItem('tempFormData');
        }
      };
      
      const handleVerifyLater = async (registrationData) => {
        try {
          // Registration already done in PasswordPopup, just close
          setShowPasswordPopup(false);
          onClose();
          alert('Registration successful! You can verify your email later.');
          // Clear stored form data
          localStorage.removeItem('tempFormData');
        } catch (error) {
          alert('Registration failed. Please try again.');
        }
      };
  
    const handleOtpVerified = () => {
      setShowOtpModal(false);
      onClose();
      alert('Email verified successfully!');
    };
  
    if (!isOpen) return null;
  
    return (
      <>
        <div className="fixed w-screen h-screen flex items-center justify-center z-[1000] bg-[rgba(0,0,0,0.5)] left-0 top-0">
          <div className="w-[613px] h-auto relative bg-white p-8 rounded-3xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] max-md:w-[90vw] max-md:p-6 max-sm:w-[95vw] max-sm:p-5">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
  
            <h2 className="text-black text-2xl font-bold mb-2 max-md:text-[22px] max-sm:text-xl">
              We Respect Your Choice
            </h2>
  
            <p className="text-[#555] text-lg font-normal mb-6 max-md:text-base max-sm:text-sm">
              Before we remove you from our system, please confirm your details.
            </p>
  
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-black text-base font-normal">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="h-12 w-full border border-[#555] rounded-lg text-sm text-black px-4"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-black text-base font-normal">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="h-12 w-full border border-[#555] rounded-lg text-sm text-black px-4"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-black text-base font-normal">
                  Phone Number
                </label>
                <PhoneInput
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  error={undefined}
                />
              </div>
  
              <div className="flex flex-col gap-5 mt-8">
                <button
                  onClick={() => handleSubmit("confirm")}
                  className="w-full h-[55px] text-black text-base font-normal cursor-pointer px-4 py-4 rounded-lg border-2 border-solid border-black max-md:mb-4"
                >
                  Yes, I'm sure don't contact me again
                </button>
                
                <button
                  onClick={() => handleSubmit("consultant")}
                  className="w-full h-14 text-white text-base font-normal cursor-pointer bg-black px-4 py-4 rounded-lg border-[none] max-md:mb-4"
                >
                  I'm Not Joining Now, Need Free Consultant
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <PasswordPopup
          isOpen={showPasswordPopup}
          onClose={() => setShowPasswordPopup(false)}
          formData={formData}
          onRegister={handleRegister}
          onVerifyLater={handleVerifyLater}
        />
  
        <OTPVerificationModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          email={formData.email}
          onVerified={handleOtpVerified}
        />
      </>
    );
  };
  

// Updated PauseModal with popup logic
const PauseModal = ({ isOpen, onClose, onRespectChoice }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
    });
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
  
    // Auto-fill form if data exists
    useEffect(() => {
      if (isOpen) {
        const storedData = localStorage.getItem('tempFormData');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData);
          } catch (error) {
            console.error('Error parsing stored form data:', error);
          }
        }
      }
    }, [isOpen]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handlePhoneChange = (value) => {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: value,
      }));
    };
  
    const handleSubmit = (action) => {
      if (!formData.fullName || !formData.email || !formData.phoneNumber) {
        alert('Please fill all fields');
        return;
      }
  
      if (action === "reachOut") {
        // Just close for reach out - no registration needed
        onClose();
        alert('We will reach out to you in 60 days.');
      } else if (action === "respectChoice") {
        // Open password popup for registration
        setShowPasswordPopup(true);
      }
    };
  
    const handleRegister = async (registrationData) => {
        try {
          console.log(registrationData)
          // Send OTP after successful registration
          const otpResponse = await fetch('https://intern-project-final-1.onrender.com/send_email_otp/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registrationData.email
            })
          });
      
          if (otpResponse.ok) {
            const otpData = await otpResponse.json();
            if (otpData.status === 'success') {
              setShowPasswordPopup(false);
              setShowOtpModal(true);
            } else {
              throw new Error(otpData.message || 'Failed to send OTP');
            }
          } else {
            throw new Error('Failed to send OTP');
          }
          
          // Clear stored form data
          localStorage.removeItem('tempFormData');
        } catch (error) {
          console.error('OTP Error:', error);
          setShowPasswordPopup(false);
          onClose();
          alert('Registration successful but failed to send OTP. You can verify your email later.');
          localStorage.removeItem('tempFormData');
        }
      };
      
      const handleVerifyLater = async (registrationData) => {
        try {
          // Registration already done in PasswordPopup, just close
          setShowPasswordPopup(false);
          onClose();
          alert('Registration successful! You can verify your email later.');
          // Clear stored form data
          localStorage.removeItem('tempFormData');
        } catch (error) {
          alert('Registration failed. Please try again.');
        }
      };
  
    const handleOtpVerified = () => {
      setShowOtpModal(false);
      onClose();
      alert('Email verified successfully!');
    };
  
    if (!isOpen) return null;
  
    return (
      <>
        <div className="fixed w-screen h-screen flex items-center justify-center z-[1000] bg-[rgba(0,0,0,0.5)] left-0 top-0">
          <div className="w-[613px] h-auto relative bg-white p-8 rounded-3xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] max-md:w-[90vw] max-md:p-6 max-sm:w-[95vw] max-sm:p-5">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
  
            <h2 className="text-black text-2xl font-bold mb-2 max-md:text-[22px] max-sm:text-xl">
              We'll Reach Out Later
            </h2>
  
            <p className="text-[#555] text-lg font-normal mb-6 max-md:text-base max-sm:text-sm">
              We'll contact you in 60 days. Please provide your details.
            </p>
  
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-black text-base font-normal">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="h-12 w-full border border-[#555] rounded-lg text-sm text-black px-4"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-black text-base font-normal">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="h-12 w-full border border-[#555] rounded-lg text-sm text-black px-4"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-black text-base font-normal">
                  Phone Number
                </label>
                <PhoneInput
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  error={undefined}
                />
              </div>
  
              <div className="flex flex-col gap-5 mt-8">
                <button
                  onClick={() => handleSubmit("reachOut")}
                  className="w-full h-[55px] text-black text-base font-normal cursor-pointer px-4 py-4 rounded-lg border-2 border-solid border-black max-md:mb-4"
                >
                  Yes, Reach Out in 60 Days
                </button>
  
                <button
                  onClick={() => handleSubmit("respectChoice")}
                  className="w-full h-14 text-white text-base font-normal cursor-pointer bg-black px-4 py-4 rounded-lg border-[none] max-md:mb-4"
                >
                  Join Our Community + Free Consultant Call
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <PasswordPopup
          isOpen={showPasswordPopup}
          onClose={() => setShowPasswordPopup(false)}
          formData={formData}
          onRegister={handleRegister}
          onVerifyLater={handleVerifyLater}
        />
  
        <OTPVerificationModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          email={formData.email}
          onVerified={handleOtpVerified}
        />
      </>
    );
  };
  

// CheckboxItem Component
// Modified CheckboxItem Component - now clickable and triggers modal
const CheckboxItem = ({ checked = false, text, onClick }) => {
    const checkboxSvg = checked ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99967 14.6668C11.6815 14.6668 14.6663 11.682 14.6663 8.00016C14.6663 4.31826 11.6815 1.3335 7.99967 1.3335C4.31777 1.3335 1.33301 4.31826 1.33301 8.00016C1.33301 11.682 4.31777 14.6668 7.99967 14.6668ZM11.6377 6.3049L7.33301 10.6096L4.52827 7.8049L5.47108 6.8621L7.33301 8.72403L10.6949 5.36209L11.6377 6.3049Z" fill="black"/>
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99967 14.6668C4.31777 14.6668 1.33301 11.682 1.33301 8.00016C1.33301 4.31826 4.31777 1.3335 7.99967 1.3335C11.6815 1.3335 14.6663 4.31826 14.6663 8.00016C14.6663 11.682 11.6815 14.6668 7.99967 14.6668ZM7.99967 13.3335C10.9452 13.3335 13.333 10.9457 13.333 8.00016C13.333 5.05464 10.9452 2.66683 7.99967 2.66683C5.05415 2.66683 2.66634 5.05464 2.66634 8.00016C2.66634 10.9457 5.05415 13.3335 7.99967 13.3335Z" fill="#9E9E9E"/>
      </svg>
    );
  
    return (
      <div 
        className="flex items-center gap-3 text-[#626262] text-xl mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={onClick}
      >
        <div>{checkboxSvg}</div>
        <span>{text}</span>
      </div>
    );
  };

// Modified PricingCard Component - removed select button, made checkboxes clickable
const PricingCard = ({
    index,
    title,
    price,
    features,
    quote,
    showUpgradeButton = false,
    onCardClick,
    onFeatureClick
  }) => {
    return (
      <article className="w-[302px] rounded bg-white border-2 border-solid border-[rgba(158,158,158,0.5)] max-md:w-[45%] max-sm:w-full flex flex-col justify-between">
        
        {/* Header */}
        <header className="text-center text-white text-2xl shadow-[0_6px_7.1px_0_rgba(0,0,0,0.25)] bg-[#555] p-4 rounded-t font-medium">
          {title}
        </header>
  
        {/* No features */}
        {index <= 1 && (
          <div className="h-[300px] flex justify-center items-center w-full font-semibold gap-2 text-black">
            <CheckCircle2Icon fill="black" size={20} className="text-white" />
            <span>No features</span>
          </div>
        )}
  
        {/* Price and Upgrade Button */}
        {showUpgradeButton && (
          <div className="text-center px-5 pt-8 pb-6">
            <div className="text-black text-4xl font-semibold">{price}</div>
            <div className="text-[#626262] text-base italic mt-2">
              One Time Payment
            </div>
            <button
              onClick={onCardClick}
              className="w-full rounded text-white text-base cursor-pointer bg-black mt-5 p-4 border-none"
            >
              Upgrade Now
            </button>
          </div>
        )}
  
        {/* Features List */}
        <div className="px-5 pb-5">
            {features.map((feature, i) =>
                index === 2 || index === 3 ? (
                <div
                    key={i}
                    className="flex items-center gap-3 text-[#626262] text-xl mb-4 mt-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                    <CheckCircle2Icon size={20} fill="black" className="text-white" />
                    <span>{feature}</span>
                </div>
                ) : (
                <CheckboxItem
                    key={i}
                    checked={false}
                    text={feature}
                    onClick={() => onFeatureClick?.(i, feature)} // Pass the correct index 'i'
                />
                )
            )}
            </div>
  
        {/* Footer */}
        <footer className="text-black text-xl font-medium leading-7 p-5 pt-0 mt-auto">
          {quote}
        </footer>
      </article>
    );
  };  

// Hero Component
const Hero = () => {
  return (
    <section className="text-center mb-10">
  <h1 className="text-[#D22F27] text-7xl font-normal max-w-[627px] mt-10 mx-auto max-sm:text-5xl font-walbaum">
    <span className="text-[#818181] font-thin">How you grow today </span>
    <span className="text-[#818181]">decides how you </span>
    <span className="text-[#007C7A]">win </span>
    <span className="text-[#818181]">or a </span>
    <span className="text-[#D22F27]">lose </span>
    <span className="text-[#818181]">tomorrow.</span>
  </h1>

  <div className="max-w-[800px] mx-auto mt-8 flex flex-col gap-3 py-10">
    <p className="text-[#626262] text-[28px] font-thin leading-8 max-sm:text-xl">
      Join the world's ONLY SYSTEM to maximize, monetize your most lucrative
      business assets –
    </p>
    <p className="text-[#626262] text-[28px] font-thin leading-8 mt-4 max-sm:text-xl">
      now you can grow and exit like you have always dreamed of. Or lose it
      all…forever.
    </p>
  </div>

  <h2 className="text-[#777] text-7xl font-normal mt-16 max-sm:text-5xl font-walbaum">
    4 options. 1 decision.
  </h2>

  <div className="max-w-[900px] mx-auto mt-10 text-[#626262] text-[28px] font-thin leading-8 max-sm:text-x flex flex-col gap-3 py-10">
    <p>Whatever you decide we will not sell you or do follow ups.</p>
    <p className="my-6 font-thin">WE HAVE A NO SELLING PHILOSOPHY:</p>
    <p>
      We all love to buy, hate being sold to. Rather we will educate with
      FREE tools, webinars etc.
    </p>
    <p className="mt-4">
      We trust that you know your business best and what's best for you –
      only when you are adequately informed. Our job is to ensure you are
      fully informed by those who are goal congruent with you.
    </p>
  </div>
</section>

  );
};

// SideBar Component
const SideBar = ({ logoUrl }) => {
  return (
    <aside className="absolute w-[150px] right-0 top-[137px] max-sm:hidden">
      <img
        src={logoUrl}
        alt="Side Logo"
        className="w-[140px] h-[35px]"
      />
      <div className="-rotate-90 text-black text-[21px] mt-12">
        <span>Grow Smarter.</span>
        <span className="font-bold">Exit Richer™</span>
      </div>
    </aside>
  );
};

// Modified PricingSection Component - added feature click handling
const PricingSection = ({ onModalOpen }) => {
    const pricingOptions = [
      {
        title: "No, I'll never sell",
        features: [
          "I'm open to learning how value-multiplying CEOs think and become exit-ready, even if I never sell.",
          "Please don't contact me again.",
        ],
        quote: '"Exit readiness is equal to Value Readiness"',
        modalType: 'valueMultiplying'
      },
      {
        title: "No, not now",
        features: [
          "Reach out to me again in 60 days",
          "Please don't contact me again.",
        ],
        quote: '"Would your future self wish you had started today?"',
        modalType: 'pause'
      },
      {
        title: "Yes, I'll start slowly",
        price: "$ 2,999",
        features: [
          "50 bids per month",
          "50 skills",
          "Custom cover photo",
          "Unlimited revisions",
          "Unlock rewards",
        ],
        quote: '"Would your future self wish you had started today?"',
        showUpgradeButton: true,
        modalType: 'upgrade'
      },
      {
        title: "Yes, I'm all in",
        price: "$ 4,999",
        features: [
          "50 bids per month",
          "50 skills",
          "Custom cover photo",
          "Unlimited revisions",
          "Unlock rewards",
        ],
        quote: '"Would your future self wish you had started today?"',
        showUpgradeButton: true,
        modalType: 'upgrade'
      },
    ];
  
    const handleFeatureClick = (cardIndex, featureIndex, feature) => {
        const option = pricingOptions[cardIndex];
        
        // For "No, I'll never sell" card
        if (cardIndex === 0) {
          if (featureIndex === 0) { // "I'm open to learning..." option (index 0, not 1)
            onModalOpen('valueMultiplying');
          } else if (featureIndex === 1) { // "Please don't contact me again" (index 1, not 2)
            onModalOpen('respectChoice');
          }
        }
        
        // For "No, not now" card  
        if (cardIndex === 1) {
          if (featureIndex === 0) { // "Reach out to me again in 60 days" (index 0, not 1)
            onModalOpen('pause');
          } else if (featureIndex === 1) { // "Please don't contact me again" (index 1, not 2)
            onModalOpen('respectChoice');
          }
        }
      };
  
    return (
      <section className="flex justify-center gap-6 mt-[60px] max-md:flex-wrap max-sm:flex-col">
        {pricingOptions.map((option, index) => (
          <PricingCard 
            key={index} 
            index={index}
            {...option} 
            onCardClick={() => onModalOpen(option.modalType)}
            onFeatureClick={(featureIndex, feature) => handleFeatureClick(index, featureIndex, feature)}
          />
        ))}
      </section>
    );
  };

// Main Index Component
export default function JoinPage() {
    const [modalState, setModalState] = useState({
        valueMultiplying: false,
        respectChoice: false,
        pause: false,
        purchaseOptions: false  // Add this line
      });

  const openModal = (modalType) => {
    setModalState(prev => ({
      ...prev,
      [modalType]: true
    }));
  };

  const closeModal = (modalType) => {
    setModalState(prev => ({
      ...prev,
      [modalType]: false
    }));
  };

  const handleModalOpen = (type) => {
    if (type === 'valueMultiplying') {
      openModal('valueMultiplying');
    } else if (type === 'pause') {
      openModal('pause');
    } else if (type === 'respectChoice') {
      openModal('respectChoice');
    } else if (type === 'upgrade') {
      openModal('purchaseOptions');  // Change this line
    }
  };

  // Handle modal transitions
  const handleRespectChoiceTransition = () => {
    // Close current modal and open respect choice modal
    setModalState({
      valueMultiplying: false,
      pause: false,
      respectChoice: true
    });
  };

  return (
    <>
      <main className="relative px-20 py-10">
        <Hero />
        <PricingSection onModalOpen={handleModalOpen} />
        <SideBar logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc" />
      </main>
      
      <ValueMultiplyingModal 
        isOpen={modalState.valueMultiplying} 
        onClose={() => closeModal('valueMultiplying')}
        onRespectChoice={handleRespectChoiceTransition}
      />
      <RespectChoiceModal 
        isOpen={modalState.respectChoice} 
        onClose={() => closeModal('respectChoice')}
      />
      <PauseModal 
        isOpen={modalState.pause} 
        onClose={() => closeModal('pause')}
        onRespectChoice={handleRespectChoiceTransition}
      />
      <PurchaseOptionsModal 
        isOpen={modalState.purchaseOptions} 
        onClose={() => closeModal('purchaseOptions')}
        />
    </>
  );
}