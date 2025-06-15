import Accordion from '@/components/coi/Accordion';
import { PremiumPopup } from '@/components/coi/premiumPopup';
import RegistrationForm from '@/components/coi/webinarForm';
import FloatingButton from '@/components/extras/FloatingButton';
import VideoPopup from '@/components/video/VideoPopup';
import { useAuth } from '@/utils/AuthContext';
import { log } from 'console';
import { Dot } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface PasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyNow: (password: string, confirmPassword: string) => void;
  onVerifyLater: () => void;
  loading: boolean;
  error: string;
}
  

// Updated PasswordPopup component with cross icon and validation
const PasswordPopup: React.FC<PasswordPopupProps> = ({
    isOpen,
    onClose,
    onVerifyNow,
    onVerifyLater,
    loading,
    error
  }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
  
    const handleVerifyNow = () => {
      setValidationError('');
      
      if (!password || !confirmPassword) {
        setValidationError('Both password fields are required');
        return;
      }
      
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters');
        return;
      }
      
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match');
        return;
      }
      
      onVerifyNow(password, confirmPassword);
    };
  
    const handleVerifyLater = () => {
      setValidationError('');
      
      if (!password || !confirmPassword) {
        setValidationError('Both password fields are required');
        return;
      }
      
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters');
        return;
      }
      
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match');
        return;
      }
      
      onVerifyLater();
    };
  
    const resetForm = () => {
      setPassword('');
      setConfirmPassword('');
      setValidationError('');
    };
  
    useEffect(() => {
      if (!isOpen) {
        resetForm();
      }
    }, [isOpen]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
          {/* Cross icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-900 hover:text-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Set Your Password</h2>
          
          {(error || validationError) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error || validationError}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Enter password (min 6 characters)"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleVerifyNow}
              disabled={loading}
              className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Verify Now'}
            </button>
            <button
              onClick={handleVerifyLater}
              disabled={loading}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify Later
            </button>
          </div>
        </div>
      </div>
    );
  };

interface OTPPopupProps {
  isOpen: boolean;
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onClose: () => void;
  loading: boolean;
  error: string;
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  isOpen,
  email,
  onVerify,
  onResend,
  onClose,
  loading,
  error
}) => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (!otp || otp.length !== 6) {
      return;
    }
    onVerify(otp);
  };

  useEffect(() => {
    if (!isOpen) {
      setOtp('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-center text-lg tracking-widest"
              placeholder="000000"
              maxLength={6}
              disabled={loading}
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          <button
            onClick={onResend}
            disabled={loading}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-600 hover:text-gray-800"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

const COI: React.FC = () => {
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [popupInterval, setPopupInterval] = useState<NodeJS.Timeout | null>(null);
  const {login, user: authUser, updateUser} = useAuth() // Added updateUser from useAuth
  const [webinarFormStatus,setWebinarFormStatus] = useState(false)
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
const [showWebinarForm, setShowWebinarForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    website: '',
    phone: '',
    privacy: false
  })
const ok = async ()=>{
    const response = await fetch('https://intern-project-final-1.onrender.com' + '/category-statistics/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const response2 = await fetch('https://intern-project-final-1.onrender.com' + '/category-list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    const data = await response.json()
    const data2 = await response2.json()
    console.log(data)
    console.log(data2)
}

  // Check for stored form data on component mount
  useEffect(() => {
    ok()
    const storedFormData = localStorage.getItem('coiFormData');
    if (storedFormData) {
      try {
        const parsedData = JSON.parse(storedFormData);
        setFormData(parsedData);
        setShowPasswordPopup(true);
        
        // Start interval to show popup every 30 seconds if closed
        const interval = setInterval(() => {
          setShowPasswordPopup(true);
        }, 30000); // 30 seconds
        
        setPopupInterval(interval);
      } catch (err) {
        console.error('Error parsing stored form data:', err);
        localStorage.removeItem('coiFormData');
      }
    }

    // Cleanup interval on component unmount
    return () => {
      if (popupInterval) {
        clearInterval(popupInterval);
      }
    };
  }, []);

  const handleUpdateWebinarStatus = async (email: string) => {
    try {
      const response = await fetch('https://intern-project-final-1.onrender.com/set-webinar-form-filled-by-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
      console.log('Webinar status update:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update webinar status');
      }
  
      return data;
    } catch (err) {
      console.error('Error updating webinar status:', err);
      throw err;
    }
  };

  // Function to refresh user data from server
  const refreshUserData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return null;

      const response = await fetch('https://intern-project-final-1.onrender.com/extract-user-data/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        // Update the user in auth context
        if (updateUser && userData.user_data) {
          updateUser(userData.user_data);
        }
        return userData.user_data;
      }
      return null;
    } catch (err) {
      console.error('Error refreshing user data:', err);
      return null;
    }
  };

  const determineFormToShow = () => {
    if (isLoading) return 'loading';
    
    if (isAuthenticated && user) {
      if (user.iswebinarformfilled) {
        return 'premium-popup'; // Show premium popup if webinar form is already filled
      } else {
        return 'webinar-form'; // Show webinar form if user exists but hasn't filled it
      }
    }
    
    // For non-authenticated users, always show webinar form
    return 'webinar-form';
  };

  useEffect(() => {
    const formToShow = determineFormToShow();
    
    if (formToShow === 'premium-popup') {
      setShowPremiumPopup(true);
    } else {
      setShowPremiumPopup(false);
    }
  }, [isAuthenticated, user, isLoading]);
  

  

  const handleFormSubmit = async (submittedFormData: FormData) => {
    setError('');
    console.log(submittedFormData)
    setFormData(submittedFormData);
    
    // Validate required fields
    if (!submittedFormData.fullName || !submittedFormData.email || !submittedFormData.phone) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!submittedFormData.privacy) {
      setError('Please accept the privacy policy');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submittedFormData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setLoading(true);
      
      // If user is authenticated and webinar form is not filled
      if (isAuthenticated && user && !user.iswebinarformfilled) {
        await handleUpdateWebinarStatus(submittedFormData.email);
        
        // **FIXED: Refresh user data and wait for it to complete**
        const updatedUserData = await refreshUserData();
        
        if (updatedUserData && updatedUserData.iswebinarformfilled) {
          // Only show premium popup if the update was successful
          setShowPremiumPopup(true);
        } else {
          // Fallback: Force a re-render by updating local state
          setWebinarFormStatus(true);
          setShowPremiumPopup(true);
        }
        return;
      }
      
      // If user is not authenticated, proceed with registration flow
      if (!isAuthenticated) {
        // Save form data to database first
        const saveResponse = await fetch('https://intern-project-final-1.onrender.com/save-coi-form/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: submittedFormData.email,
            full_name: submittedFormData.fullName,
            phone_number: submittedFormData.phone,
            website_name: submittedFormData.website
          })
        });
  
        const saveResult = await saveResponse.json();
        
        if (!saveResponse.ok) {
          throw new Error(saveResult.message || 'Failed to save form data');
        }
        
        // **FIXED: Pass submittedFormData to registerUser instead of relying on state**
        const registrationResult = await registerUser('temp_password_' + Date.now(), submittedFormData);
        
        // After successful registration, update webinar form status
        await handleUpdateWebinarStatus(submittedFormData.email);
        
        // Refresh user data after registration and webinar status update
        await refreshUserData();
        
        // Store form data in localStorage for popup flow
        localStorage.setItem('coiFormData', JSON.stringify(submittedFormData));
        
        // Show password popup after successful login
        setShowPasswordPopup(true);
        
        // Start interval to show popup every 30 seconds if closed
        const interval = setInterval(() => {
          setShowPasswordPopup(true);
        }, 30000);
        
        setPopupInterval(interval);
      }
      
    } catch (err) {
      console.error('Error during form submission:', err);
      setError(err.message || 'Failed to process form submission');
    } finally {
      setLoading(false);
    }
  };
  
  // **FIXED: Accept formData as parameter instead of relying on state**
  const registerUser = async (password?: string, currentFormData?: FormData) => {
    setLoading(true);
    setError('');
    
    // Use passed formData or fall back to state (for backwards compatibility)
    const dataToUse = currentFormData || formData;
    
    try {
      const registrationData = {
        email: dataToUse.email,
        password: password || 'temp_password', // Temporary password for "verify later"
        full_name: dataToUse.fullName,
        phone_number: dataToUse.phone,
        website_name: dataToUse.website,
        no_linkedin: true
      };
  
      console.log(registrationData)
  
      const response = await fetch('https://intern-project-final-1.onrender.com/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });
  
      const data = await response.json();
  
      if (data.tokens) {
        await login(data.tokens);
        console.log('Registration successful with tokens:', data.message);
      } else {
        // Fallback to localStorage if auth context is not available
        if (data.tokens) {
          localStorage.setItem('access_token', data.tokens.access);
          localStorage.setItem('refresh_token', data.tokens.refresh);
        }
      }
  
      if (!response.ok) {
        if (data.user_exists) {
          throw new Error('User with this email already exists. Please try logging in.');
        }
        throw new Error(data.message || 'Registration failed');
      }
  
      return data;
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendEmailOTP = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://intern-project-final-1.onrender.com/send_email_otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.is_verified) {
          throw new Error('Email already verified. Please login.');
        }
        if (!data.user_exists) {
          throw new Error('Please register first.');
        }
        throw new Error(data.message || 'Failed to send OTP');
      }

      return data;
    } catch (err) {
      console.error('Send OTP error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailOTP = async (otp: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://intern-project-final-1.onrender.com/verify_email_otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          otp: otp 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      return data;
    } catch (err) {
      console.error('OTP verification error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Updated handleVerifyNow to clear interval
  const handleVerifyNow = async (password: string, confirmPassword: string) => {
    try {
      // Update user password (you'll need to create this endpoint)
      const response = await fetch('https://intern-project-final-1.onrender.com/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Use stored token
        },
        body: JSON.stringify({
          email: formData.email,
          new_password: password
        })
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update password');
      }
      
      // Send OTP for email verification
      await sendEmailOTP();
      
      // Clear interval
      if (popupInterval) {
        clearInterval(popupInterval);
        setPopupInterval(null);
      }
      
      setShowPasswordPopup(false);
      setShowOTPPopup(true);
    } catch (err) {
      setError(err.message || 'An error occurred during password update');
    }
  };

  // Updated handleVerifyLater to use actual password
  const handleVerifyLater = async (password: string) => {
    try {
      await registerUser(password); // Use the actual password instead of temp_password
      
      // Clear interval and localStorage
      if (popupInterval) {
        clearInterval(popupInterval);
        setPopupInterval(null);
      }
      localStorage.removeItem('coiFormData');
      setShowPasswordPopup(false);
      setSuccessMessage('Registration successful! You can verify your email later.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        website: '',
        phone: '',
        privacy: false
      });
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleOTPVerify = async (otp: string) => {
    try {
      await verifyEmailOTP(otp);
      
      // Clear localStorage and close popup
      localStorage.removeItem('coiFormData');
      setShowOTPPopup(false);
      setSuccessMessage('Email verified successfully! Welcome aboard!');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        website: '',
        phone: '',
        privacy: false
      });
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    }
  };

  const handleOTPResend = async () => {
    try {
      await sendEmailOTP();
      setSuccessMessage('OTP resent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  const handleOTPClose = () => {
    localStorage.removeItem('coiFormData');
    setShowOTPPopup(false);
    setFormData({
      fullName: '',
      email: '',
      website: '',
      phone: '',
      privacy: false
    });
  };

  const handlePasswordPopupClose = () => {
    setShowPasswordPopup(false);
    setError(''); // Clear any errors when closing
  };

  useEffect(() => {
    if (user && user.iswebinarformfilled) {
      setWebinarFormStatus(user.iswebinarformfilled);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <FloatingButton />
      <main className="container mx-auto px-6 py-8 max-w-7xl">
      <section className="w-full flex justify-center items-center px-0 py-20">
  <div className="w-full max-w-[1000px] px-5 text-center">
    <h1 className="text-[#D02C31] text-7xl max-md:text-5xl max-sm:text-[32px] font-walbaum font-light mb-5">
      Your value and wealth is at risk,
    </h1>
    <h2 className="text-[#D02C31] text-7xl max-md:text-5xl max-sm:text-[32px] font-walbaum mb-5">
      more and more each day
    </h2>
    <h2 className="text-[#D02C31] text-7xl max-md:text-5xl max-sm:text-[32px]">
      as your exit nears.
    </h2>
  </div>
</section>

        
       {/* Value Proposition */}
<section className="flex flex-col justify-center items-center gap-6 max-w-[1036px] w-full mx-auto px-0 py-10 max-sm:p-5 font-linear">
  <h3 className="text-black text-2xl text-center max-w-[800px] w-full max-sm:text-lg">
    When 84% of your business value is locked inside your intangible assets
  </h3>
  <p className="text-[#6f6f6f] text-center text-2xl font-normal max-w-[1036px] w-full max-sm:text-lg">
    (your brand, goodwill, strategic advantage, growth potential, intellectual property, human capital etc)
  </p>
  <div className="text-black text-center text-2xl max-w-[900px] w-full max-sm:text-lg">
    <p>your business value and generational wealth is at risk – unless you unlock that value. ..</p>
    <p>maximize it, and monetize it tax effectively, and</p>
    <p>have ALL YOUR PEOPLE help you do that</p>
  </div>
  <p className="text-black text-2xl text-center max-w-[300px] w-full max-sm:text-lg">
    (you will see why here)
  </p>
</section>

<section className="w-full flex flex-col justify-center items-center px-0 py-20">
  <div className="w-full max-w-[900px] text-center">
    <h2 className="text-[#777] text-7xl font-normal max-md:text-5xl max-sm:text-[32px] font-walbaum">
      You didn't get into business
    </h2>
    <h2 className="text-[#777] text-7xl font-normal mt-5 max-w-[492px] mx-auto max-md:text-5xl max-sm:text-[32px] font-walbaum">
      to LOSE...right?
    </h2>
  </div>
</section>

<section className="w-full flex flex-col justify-center items-center px-0 py-20">
  <div className="w-full max-w-[900px] text-center">
    <h2 className="text-[#777] text-7xl font-normal max-md:text-5xl max-sm:text-[32px] font-walbaum">
      But here's why it's easier to
    </h2>
    <h2 className="text-[#777] text-7xl font-normal mt-5 max-w-[736px] mx-auto max-md:text-5xl max-sm:text-[32px] font-walbaum">
      <span className='text-[#D02C31]'>LOSE</span> than it is to <span className='text-[#007C7A]'>WIN.</span>
    </h2>
  </div>
</section>

{/* Video Player */}
<div className="w-full flex justify-center items-center px-0 py-10">
      <iframe 
        width="1078" 
        height="513" 
        src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-qVzDq5dBmY-360p.mp4/ik-video.mp4?updatedAt=1748407955162&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-qVzDq5dBmY-360p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748407955162&updatedAt=1748407955162" 
        title="ImageKit video player" 
        style={{
          width: '100%', 
          maxWidth: '1078px', 
          height: 'auto',
          aspectRatio: '1078/513'
        }}
      />
    </div>

<h2 className="text-[#777] text-7xl font-normal text-center px-0 py-20 max-md:text-5xl max-sm:text-[32px] font-walbaum">
  The truth is in the data.
</h2>


        {/* Main Content Layout */}
        <div className="flex gap-8 justify-center items-start max-lg:flex-col max-lg:items-center py-20">
  {/* Registration Form - Now Sticky */}
  {determineFormToShow() === 'webinar-form' && (
    <RegistrationForm
      onSubmit={handleFormSubmit}
      loading={loading}
      error={error}
      initialData={formData}
    />
  )}
  
  {/* Premium Popup */}
  {showPremiumPopup && (
      <PremiumPopup 
        onUnlockAccess={() => {
          setShowPremiumPopup(false);
          // Add any additional logic for unlock access
        }}
      />
  )}
  
  {/* Accordion Sections */}
  <div>
    <Accordion/>  
  </div>
  
</div>
      </main>
      <VideoPopup />
      <aside className="absolute right-4 top-4 z-10">
      <div className="flex flex-col items-end">
        <img
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc'
          alt="Side Logo"
          className="w-[140px] h-[35px]"
        />
        <div className="-rotate-90 text-black text-[18px] mt-5 origin-center whitespace-nowrap pt-40 font-linear">
          <span>Grow Smarter. <span className="font-bold">Exit Richer™</span></span>
        </div>
      </div>
    </aside>

      {/* Password Popup */}
      <PasswordPopup
        isOpen={showPasswordPopup}
        onClose={handlePasswordPopupClose}
        onVerifyNow={handleVerifyNow}
        onVerifyLater={handleVerifyLater}
        loading={loading}
        error={error}
      />

      {/* OTP Popup */}
      <OTPPopup
        isOpen={showOTPPopup}
        email={formData.email}
        onVerify={handleOTPVerify}
        onResend={handleOTPResend}
        onClose={handleOTPClose}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default COI;