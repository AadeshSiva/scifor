import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import { PasswordInput } from "@/components/ui/PasswordInput";
import PhoneInput from "@/components/ui/PhoneInput";

// Define interfaces for type safety
interface FormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
  website_name: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone_number?: string;
  website_name?: string;
  linkedin?: string;
  general?: string;
  otp?: string;
}

interface CheckEmailResponse {
  user_exists: boolean;
  message: string;
}

interface RegisterResponse {
  status: string;
  message: string;
  tokens?: {
    access: string;
    refresh: string;
  };
}

interface OtpResponse {
  status: string;
  message: string;
}

export function RegisterForm(): JSX.Element {
  const [hasLinkedIn, setHasLinkedIn] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    website_name: ''
  });
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least 1 letter, 1 number, and 1 special character';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }
    
    if (!formData.website_name.trim()) {
      newErrors.website_name = 'Company website is required';
    }
    
    if (hasLinkedIn === null) {
      newErrors.linkedin = 'Please specify if you have a LinkedIn account';
    }
    
    return newErrors;
  };

  const getCsrfToken = (): string => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') {
        return value;
      }
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // First check if email already exists
      const checkResponse = await fetch('https://intern-project-final.onrender.com/check_email_status/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({ email: formData.email })
      });
      
      const checkData: CheckEmailResponse = await checkResponse.json();
      
      if (checkData.user_exists) {
        setErrors({ email: checkData.message });
        setLoading(false);
        return;
      }
      
      // Proceed with registration
      const registerPayload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        website_name: formData.website_name,
        no_linkedin: hasLinkedIn === false,
        linkedin_token: ''
      };
      
      const registerResponse = await fetch('https://intern-project-final.onrender.com/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify(registerPayload)
      });
      
      const registerData: RegisterResponse = await registerResponse.json();
      
      if (registerData.status === 'success') {
        // Store tokens using the auth context
        if (registerData.tokens) {
          await login(registerData.tokens);
          console.log('Registration successful with tokens:', registerData.message);
        } else {
          // Fallback to localStorage if auth context is not available
          if (registerData.tokens) {
            localStorage.setItem('access_token', registerData.tokens.access);
            localStorage.setItem('refresh_token', registerData.tokens.refresh);
          }
        }
        
        // Send OTP for email verification
        await sendOtp();
      } else {
        setErrors({ general: registerData.message });
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (): Promise<void> => {
    try {
      const otpResponse = await fetch('https://intern-project-final.onrender.com/send_email_otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({ email: formData.email })
      });
      
      const otpData: OtpResponse = await otpResponse.json();
      
      if (otpData.status === 'success') {
        setShowOtpModal(true);
      } else {
        setErrors({ general: otpData.message });
      }
    } catch (error) {
      console.error('OTP send error:', error);
      setErrors({ general: 'Failed to send OTP. Please try again.' });
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setErrors({ otp: 'Please enter the OTP' });
      return;
    }
    
    setOtpLoading(true);
    setErrors({});
    
    try {
      const verifyResponse = await fetch('https://intern-project-final.onrender.com/verify_email_otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({ 
          email: formData.email,
          otp: otp 
        })
      });
      
      const verifyData: OtpResponse = await verifyResponse.json();
      
      if (verifyData.status === 'success') {
        console.log('Registration and email verification successful!');
        navigate('/');
      } else {
        setErrors({ otp: verifyData.message });
      }
      
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrors({ otp: 'Failed to verify OTP. Please try again.' });
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOtp = async (): Promise<void> => {
    setOtpLoading(true);
    try {
      await sendOtp();
      console.log('OTP resent successfully!');
    } catch (error) {
      setErrors({ otp: 'Failed to resend OTP' });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handlePhoneChange = (value: string): void => {
    setFormData(prev => ({ ...prev, phone_number: value }));
    // Clear phone number error when user starts typing
    if (errors.phone_number) {
      setErrors(prev => ({ ...prev, phone_number: '' }));
    }
  };

  const handleLinkedInChoice = (choice: boolean): void => {
    setHasLinkedIn(choice);
    if (errors.linkedin) {
      setErrors(prev => ({ ...prev, linkedin: '' }));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}
      
      <div className="flex flex-col gap-3">
        <div className="text-base text-black flex items-center gap-1">
          <span>Full Name</span>
          <span className="text-black ml-1">*</span>
        </div>
        <input
          type="text"
          name="full_name"
          placeholder="Enter your full name"
          className={`border text-sm w-full px-4 py-2.5 rounded-lg border-solid transition-colors focus:outline-none ${errors.full_name ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-black'}`}
          value={formData.full_name}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        {errors.full_name && (
          <span className="text-red-500 text-sm">{errors.full_name}</span>
        )}
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="text-base text-black flex items-center gap-1">
          <span>Company Email ID</span>
          <span className="text-black ml-1">*</span>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter your company email ID"
          className={`border text-sm w-full px-4 py-2.5 rounded-lg border-solid transition-colors focus:outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-black'}`}
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      
      <div className="flex gap-5 max-sm:flex-col max-sm:gap-4">
        <div className="flex-1">
          <PasswordInput 
            label="Password" 
            required 
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <PasswordInput 
            label="Confirm Password" 
            required 
            placeholder="Re - enter password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            disabled={loading}
          />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 italic -mt-3">
        Minimum 6 characters | At least 1 special character | At least 1 letter and 1 number
      </div>
      
      <div className="flex flex-col gap-3">
        <PhoneInput 
          value={formData.phone_number} 
          onChange={handlePhoneChange}
          error={errors.phone_number}
          disabled={loading}
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="text-base text-black flex items-center gap-1">
          <span>Company Website</span>
          <span className="text-black ml-1">*</span>
        </div>
        <input
          type="text"
          name="website_name"
          placeholder="Enter your Company website URL"
          className={`border text-sm w-full px-4 py-2.5 rounded-lg border-solid transition-colors focus:outline-none ${errors.website_name ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-black'}`}
          value={formData.website_name}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        {errors.website_name && (
          <span className="text-red-500 text-sm">{errors.website_name}</span>
        )}
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="text-base text-black flex items-center gap-1">
          <span>Do you have a LinkedIn account</span>
          <span className="text-black ml-1">*</span>
        </div>
        <div className="flex gap-2.5">
          <button 
            type="button"
            className={`w-14 h-7 border text-xs cursor-pointer shadow-sm transition-colors ${hasLinkedIn === true ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'} rounded border-solid border-black disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => handleLinkedInChoice(true)}
            disabled={loading}
          >
            Yes
          </button>
          <button 
            type="button"
            className={`w-14 h-7 border text-xs cursor-pointer shadow-sm transition-colors ${hasLinkedIn === false ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'} rounded border-solid border-black disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => handleLinkedInChoice(false)}
            disabled={loading}
          >
            No
          </button>
        </div>
        {errors.linkedin && (
          <span className="text-red-500 text-sm">{errors.linkedin}</span>
        )}
      </div>
      
      <button 
        type="button"
        onClick={handleSubmit}
        className="w-full text-white text-base cursor-pointer bg-black mt-4 p-4 rounded-lg border-none hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registering...
          </>
        ) : (
          'Register'
        )}
      </button>
      
      <div className="text-center text-lg italic text-gray-500 mt-6">
        <span>Already have an account? </span>
        <span 
          className="text-black cursor-pointer hover:underline"
          onClick={handleLoginClick}
        >
          Login
        </span>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a 6-digit OTP to {formData.email}. Please enter it below to verify your email.
            </p>
            
            {errors.otp && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {errors.otp}
              </div>
            )}
            
            <form onSubmit={handleOtpSubmit}>
              <div className="flex flex-col gap-3 mb-6">
                <label className="text-base text-black">
                  Enter OTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="border text-sm w-full px-4 py-2.5 rounded-lg border-solid border-gray-300 focus:border-black focus:outline-none transition-colors"
                  maxLength={6}
                  disabled={otpLoading}
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={otpLoading}
                >
                  {otpLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={resendOtp}
                  className="flex-1 border border-black text-black py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={otpLoading}
                >
                  {otpLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </div>
            </form>
            
            <button 
              onClick={() => setShowOtpModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm transition-colors"
              disabled={otpLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}