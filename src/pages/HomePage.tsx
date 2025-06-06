import VideoPopup from "@/components/video/VideoPopup";
import { useAuth } from "@/utils/AuthContext";
import { Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const countries = [
    { code: "+1", flag: "🇺🇸", name: "United States", phoneLength: 10 },
    { code: "+1", flag: "🇨🇦", name: "Canada", phoneLength: 10 },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom", phoneLength: 10 },
    { code: "+33", flag: "🇫🇷", name: "France", phoneLength: 10 },
    { code: "+49", flag: "🇩🇪", name: "Germany", phoneLength: 11 },
    { code: "+39", flag: "🇮🇹", name: "Italy", phoneLength: 10 },
    { code: "+34", flag: "🇪🇸", name: "Spain", phoneLength: 9 },
    { code: "+31", flag: "🇳🇱", name: "Netherlands", phoneLength: 9 },
    { code: "+46", flag: "🇸🇪", name: "Sweden", phoneLength: 9 },
    { code: "+47", flag: "🇳🇴", name: "Norway", phoneLength: 8 },
    { code: "+45", flag: "🇩🇰", name: "Denmark", phoneLength: 8 },
    { code: "+41", flag: "🇨🇭", name: "Switzerland", phoneLength: 9 },
    { code: "+43", flag: "🇦🇹", name: "Austria", phoneLength: 10 },
    { code: "+32", flag: "🇧🇪", name: "Belgium", phoneLength: 9 },
    { code: "+351", flag: "🇵🇹", name: "Portugal", phoneLength: 9 },
    { code: "+91", flag: "🇮🇳", name: "India", phoneLength: 10 },
    { code: "+86", flag: "🇨🇳", name: "China", phoneLength: 11 },
    { code: "+81", flag: "🇯🇵", name: "Japan", phoneLength: 10 },
    { code: "+82", flag: "🇰🇷", name: "South Korea", phoneLength: 10 },
    { code: "+61", flag: "🇦🇺", name: "Australia", phoneLength: 9 },
    { code: "+64", flag: "🇳🇿", name: "New Zealand", phoneLength: 9 },
    { code: "+55", flag: "🇧🇷", name: "Brazil", phoneLength: 11 },
    { code: "+52", flag: "🇲🇽", name: "Mexico", phoneLength: 10 },
    { code: "+54", flag: "🇦🇷", name: "Argentina", phoneLength: 10 },
    { code: "+56", flag: "🇨🇱", name: "Chile", phoneLength: 9 },
    { code: "+57", flag: "🇨🇴", name: "Colombia", phoneLength: 10 },
    { code: "+51", flag: "🇵🇪", name: "Peru", phoneLength: 9 },
    { code: "+27", flag: "🇿🇦", name: "South Africa", phoneLength: 9 },
    { code: "+234", flag: "🇳🇬", name: "Nigeria", phoneLength: 10 },
    { code: "+20", flag: "🇪🇬", name: "Egypt", phoneLength: 10 },
    // Additional countries
    { code: "+7", flag: "🇷🇺", name: "Russia", phoneLength: 10 },
    { code: "+90", flag: "🇹🇷", name: "Turkey", phoneLength: 10 },
    { code: "+966", flag: "🇸🇦", name: "Saudi Arabia", phoneLength: 9 },
    { code: "+971", flag: "🇦🇪", name: "UAE", phoneLength: 9 },
    { code: "+65", flag: "🇸🇬", name: "Singapore", phoneLength: 8 },
    { code: "+60", flag: "🇲🇾", name: "Malaysia", phoneLength: 10 },
    { code: "+66", flag: "🇹🇭", name: "Thailand", phoneLength: 9 },
    { code: "+84", flag: "🇻🇳", name: "Vietnam", phoneLength: 9 },
    { code: "+63", flag: "🇵🇭", name: "Philippines", phoneLength: 10 },
    { code: "+62", flag: "🇮🇩", name: "Indonesia", phoneLength: 10 },
    { code: "+880", flag: "🇧🇩", name: "Bangladesh", phoneLength: 10 },
    { code: "+92", flag: "🇵🇰", name: "Pakistan", phoneLength: 10 },
    { code: "+94", flag: "🇱🇰", name: "Sri Lanka", phoneLength: 9 },
    { code: "+977", flag: "🇳🇵", name: "Nepal", phoneLength: 10 },
    { code: "+98", flag: "🇮🇷", name: "Iran", phoneLength: 10 },
    { code: "+972", flag: "🇮🇱", name: "Israel", phoneLength: 9 },
    { code: "+354", flag: "🇮🇸", name: "Iceland", phoneLength: 7 },
    { code: "+358", flag: "🇫🇮", name: "Finland", phoneLength: 9 },
    { code: "+372", flag: "🇪🇪", name: "Estonia", phoneLength: 8 },
    { code: "+371", flag: "🇱🇻", name: "Latvia", phoneLength: 8 },
    { code: "+370", flag: "🇱🇹", name: "Lithuania", phoneLength: 8 },
    { code: "+48", flag: "🇵🇱", name: "Poland", phoneLength: 9 },
    { code: "+420", flag: "🇨🇿", name: "Czech Republic", phoneLength: 9 },
    { code: "+421", flag: "🇸🇰", name: "Slovakia", phoneLength: 9 },
    { code: "+36", flag: "🇭🇺", name: "Hungary", phoneLength: 9 },
    { code: "+40", flag: "🇷🇴", name: "Romania", phoneLength: 10 },
    { code: "+359", flag: "🇧🇬", name: "Bulgaria", phoneLength: 9 },
    { code: "+385", flag: "🇭🇷", name: "Croatia", phoneLength: 8 },
    { code: "+381", flag: "🇷🇸", name: "Serbia", phoneLength: 8 },
    { code: "+387", flag: "🇧🇦", name: "Bosnia and Herzegovina", phoneLength: 8 },
    { code: "+386", flag: "🇸🇮", name: "Slovenia", phoneLength: 8 },
    { code: "+30", flag: "🇬🇷", name: "Greece", phoneLength: 10 },
    { code: "+90", flag: "🇨🇾", name: "Cyprus", phoneLength: 8 },
    { code: "+356", flag: "🇲🇹", name: "Malta", phoneLength: 8 },
    { code: "+353", flag: "🇮🇪", name: "Ireland", phoneLength: 9 },
    { code: "+250", flag: "🇷🇼", name: "Rwanda", phoneLength: 9 },
    { code: "+254", flag: "🇰🇪", name: "Kenya", phoneLength: 10 },
    { code: "+256", flag: "🇺🇬", name: "Uganda", phoneLength: 9 },
    { code: "+255", flag: "🇹🇿", name: "Tanzania", phoneLength: 9 },
    { code: "+233", flag: "🇬🇭", name: "Ghana", phoneLength: 9 },
    { code: "+225", flag: "🇨🇮", name: "Ivory Coast", phoneLength: 8 },
    { code: "+221", flag: "🇸🇳", name: "Senegal", phoneLength: 9 },
    { code: "+212", flag: "🇲🇦", name: "Morocco", phoneLength: 9 },
    { code: "+216", flag: "🇹🇳", name: "Tunisia", phoneLength: 8 },
    { code: "+213", flag: "🇩🇿", name: "Algeria", phoneLength: 9 },
  ];

  const PhoneInputDropdown = ({ onPhoneChange, error }) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [phoneError, setPhoneError] = useState("");
  
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.includes(searchTerm)
    );
  
    const validatePhoneNumber = (number, country) => {
      if (!number) {
        setPhoneError("Phone number is required");
        return false;
      }
      
      const expectedLength = country.phoneLength;
      if (number.length !== expectedLength) {
        setPhoneError(`Phone number should be ${expectedLength} digits for ${country.name}`);
        return false;
      }
      
      setPhoneError("");
      return true;
    };
  
    const handleCountrySelect = (country) => {
      setSelectedCountry(country);
      setIsDropdownOpen(false);
      setSearchTerm("");
      
      // Revalidate current phone number with new country
      if (phoneNumber) {
        validatePhoneNumber(phoneNumber, country);
      }
      
      onPhoneChange(country.code + phoneNumber);
    };
  
    const handlePhoneNumberChange = (e) => {
      const value = e.target.value.replace(/\D/g, '');
      setPhoneNumber(value);
      
      // Validate phone number length
      validatePhoneNumber(value, selectedCountry);
      
      onPhoneChange(selectedCountry.code + value);
    };
  
    return (
      <div className="mb-3">
        <label className="text-black text-xs font-medium block mb-1">
          Phone Number
        </label>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-20 h-9 border border-gray-400 rounded-lg flex items-center justify-center bg-white text-xs hover:bg-gray-50 transition-colors"
            >
              <span className="mr-1">{selectedCountry.flag}</span>
              <span className="text-xs">{selectedCountry.code}</span>
              <svg
                className="w-3 h-3 ml-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
  
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-hidden">
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredCountries.map((country, index) => (
                    <button
                      key={`${country.code}-${country.name}-${index}`}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium">{country.code}</span>
                      <span className="text-gray-600">{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <input
            type="tel"
            placeholder={`Enter ${selectedCountry.phoneLength}-digit phone number`}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={`text-gray-600 border text-xs flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              phoneError ? 'border-red-500' : 'border-gray-400'
            }`}
          />
        </div>
        {(phoneError || error) && (
          <p className="text-red-500 text-xs mt-1">{phoneError || "Phone number is required"}</p>
        )}
      </div>
    );
  };

// Form Data Type
type FormData = {
  fullName: string;
  businessEmail: string;
  businessWebsite: string;
  phoneNumber: string;
  agreeToTerms: boolean;
};

type PasswordData = {
  password: string;
  confirmPassword: string;
};

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md w-full flex items-center justify-between px-12 py-6 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src="/api/placeholder/120/40"
          alt="PRSPERA"
          className="h-10 object-contain"
        />
      </div>
      
      <nav className="flex items-center space-x-10">
        <a href="#coi" className="text-lg text-black hover:text-gray-600 transition-colors">COI</a>
        <a href="#winning" className="text-lg text-black hover:text-gray-600 transition-colors">WINNING</a>
        <a href="#free" className="text-lg text-black hover:text-gray-600 transition-colors">FREE</a>
        <a href="#join" className="text-lg text-black hover:text-gray-600 transition-colors">JOIN</a>
        <a href="#live" className="text-lg text-black hover:text-gray-600 transition-colors">LIVE</a>
      </nav>
      
      <button
        className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition-colors"
        aria-label="Login"
      >
        Login
      </button>
    </header>
  );
};

// Password Popup Component
const PasswordPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PasswordData) => void;
  isSubmitting: boolean;
}> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PasswordData>();
  const password = watch("password");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Complete Registration</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-500"
            >
              {isSubmitting ? "Verifying..." : "Verify Now"}
            </button>
            <button
              type="button"
              onClick={() => {
                const formData = JSON.parse(localStorage.getItem('webinarFormData') || '{}');
                onSubmit({ password: '', confirmPassword: '' });
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Verify Later
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// OTP Verification Popup
const OTPPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  email: string;
  isSubmitting: boolean;
}> = ({ isOpen, onClose, onVerify, onResend, email, isSubmitting }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setError('');
    onVerify(otp);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Verify Email</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">
          We've sent a 6-digit verification code to <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-500"
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={onResend}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormSection: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const {login} = useAuth()
  const [websiteError, setWebsiteError] = useState("");

  const validateWebsiteUrl = async (url) => {
    if (!url) return true; // Optional field
    
    // Clean and format URL
    let cleanUrl = url.trim().toLowerCase();
    
    // Add protocol if missing
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    // Basic URL format validation
    const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    
    if (!urlPattern.test(cleanUrl)) {
      return "Please enter a valid website URL (e.g., example.com)";
    }
    
    try {
      // Extract domain from URL
      const urlObj = new URL(cleanUrl);
      const domain = urlObj.hostname.replace(/^www\./, '');
      
      // Check if domain exists by making a DNS lookup simulation
      // Using a public DNS API to check domain existence
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        return "Unable to verify domain. Please check the URL.";
      }
      
      const dnsData = await response.json();
      
      // Check if DNS resolution was successful
      if (dnsData.Status !== 0 || !dnsData.Answer || dnsData.Answer.length === 0) {
        return "This domain does not exist. Please enter a valid website URL.";
      }
      
      return true;
    } catch (error) {
      return "Please enter a valid website URL format.";
    }
  };
  
  const handleWebsiteChange = async (e) => {
    const value = e.target.value;
    setValue('businessWebsite', value);
    
    // Clear previous error
    setWebsiteError("");
    
    // Only validate if there's a value and it looks like a complete domain
    if (value && value.includes('.')) {
      // Debounce validation to avoid too many API calls
      clearTimeout(window.websiteValidationTimeout);
      window.websiteValidationTimeout = setTimeout(async () => {
        const validation = await validateWebsiteUrl(value);
        if (validation !== true) {
          setWebsiteError(validation);
        } else {
          setWebsiteError("");
        }
      }, 1000); // Wait 1 second after user stops typing
    }
  };

  const fetchVideos = async () => {
    try {
      setIsLoadingVideos(true);
      // Replace with your actual video IDs
      const videoIds = ['123456789', '987654321']; // Add your Vimeo video IDs here
      
      const videoPromises = videoIds.map(async (videoId) => {
        try {
          // Try public video first
          const publicResponse = await fetch(`${API_BASE_URL}/fetch_public_video/${videoId}/`);
          if (publicResponse.ok) {
            return await publicResponse.json();
          }
          
          // If public fails, try unlisted
          const unlistedResponse = await fetch(`${API_BASE_URL}/fetch_unlisted_video/${videoId}/`);
          if (unlistedResponse.ok) {
            return await unlistedResponse.json();
          }
          
          return null;
        } catch (error) {
          console.error(`Error fetching video ${videoId}:`, error);
          return null;
        }
      });

      const videoResults = await Promise.all(videoPromises);
      const validVideos = videoResults.filter(video => video !== null);
      setVideos(validVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // API Base URL - adjust this to your backend URL
  const API_BASE_URL = 'https://intern-project-final-1.onrender.com';

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('webinarFormData');
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);
        setValue('fullName', formData.fullName || '');
        setValue('businessEmail', formData.businessEmail || '');
        setValue('businessWebsite', formData.businessWebsite || '');
        setValue('phoneNumber', formData.phoneNumber || '');
        setValue('agreeToTerms', formData.agreeToTerms || false);
        setUserEmail(formData.businessEmail || '');
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [setValue]);

  // Popup reminder interval
  useEffect(() => {
    const savedData = localStorage.getItem('webinarFormData');
    if (savedData && !isRegistered && !popupDismissed) {
      const interval = setInterval(() => {
        setShowPasswordPopup(true);
      }, 30000); // Show popup every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isRegistered, popupDismissed]);

  const onFormSubmit = async (data: FormData) => {
    // Save form data to localStorage
    localStorage.setItem('webinarFormData', JSON.stringify(data));
    setUserEmail(data.businessEmail);
    
    // Show password popup
    setShowPasswordPopup(true);
    setPopupDismissed(false);
  };

  const handlePasswordSubmit = async (passwordData: PasswordData) => {
    if (passwordData.password === '' && passwordData.confirmPassword === '') {
      // User clicked "Verify Later"
      const formData = JSON.parse(localStorage.getItem('webinarFormData') || '{}');
      await registerUser(formData, '');
      return;
    }

    const formData = JSON.parse(localStorage.getItem('webinarFormData') || '{}');
    await registerUser(formData, passwordData.password);
  };

  const registerUser = async (formData: FormData, password: string) => {
    setIsSubmitting(true);
    
    try {
      const registerData = {
        email: formData.businessEmail,
        password: password || 'temp_password_123', // Use temporary password if none provided
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        website_name: formData.businessWebsite,
        no_linkedin: true
      };

      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (result.tokens) {
        await login(result.tokens);
        console.log('Registration successful with tokens:', result.message);
      } else {
        // Fallback to localStorage if auth context is not available
        if (result.tokens) {
          localStorage.setItem('access_token', result.tokens.access);
          localStorage.setItem('refresh_token', result.tokens.refresh);
        }
      }

      if (response.ok) {
        setIsRegistered(true);
        setShowPasswordPopup(false);
        
        if (password) {
          // If user provided password, send OTP
          await sendEmailOTP(formData.businessEmail);
        } else {
          // If no password, just show success message
          alert('Registration successful! You can verify your email later.');
          localStorage.removeItem('webinarFormData');
        }
      } else {
        if (result.user_exists) {
          // User already exists, try to send OTP
          await sendEmailOTP(formData.businessEmail);
        } else {
          alert(result.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailOTP = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/send_email_otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowOTPPopup(true);
      } else {
        if (result.is_verified) {
          alert('Email already verified! You can now login.');
          localStorage.removeItem('webinarFormData');
        } else {
          alert(result.message || 'Failed to send OTP');
        }
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const verifyOTP = async (otp: string) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/verify_email_otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          otp: otp,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Email verified successfully! Registration complete.');
        setShowOTPPopup(false);
        localStorage.removeItem('webinarFormData');
        setIsRegistered(true);
      } else {
        alert(result.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('OTP verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordPopupClose = () => {
    setShowPasswordPopup(false);
    setPopupDismissed(true);
    
    // Reset dismissal after 5 minutes
    setTimeout(() => {
      setPopupDismissed(false);
    }, 300000);
  };

  return (
    <>
      <div className="flex justify-center items-start gap-8 -mb-20 mt-10">
  <div className="bg-white rounded-xl border-2 border-gray-300 overflow-hidden w-full max-w-xl shadow-sm">
      <div className="aspect-video relative w-full">
      <iframe className="w-full h-full" src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-r5QoRy7KVM-240p.mp4/ik-video.mp4?updatedAt=1748406554368&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-r5QoRy7KVM-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406554368&updatedAt=1748406554368" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
      </div>
  </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-300 p-6 w-full max-w-md shadow-sm">
        <h3 className="text-gray-800 text-[17px] font-semibold text-center mb-4 font-walbaum"> WIN a Private Webinar and Q&A with Jeff </h3> <div className="flex w-full justify-center"><div className="flex flex-col items-start space-y-2 mb-4 text-left font-linear "> <div className="text-gray-800 text-xs font-medium flex items-start gap-2"> <Check size={16} strokeWidth={4} /> <span className="font-light">Exited with Double-Digit Multiples</span> </div> <div className="text-gray-800 text-xs font-medium flex items-start gap-2"> <Check size={16} strokeWidth={4} /> <span className="font-light">Achieved 25%+ Profit Margins</span> </div> <div className="text-gray-800 text-xs font-medium flex items-start gap-2"> <Check size={16} strokeWidth={4} /> <span className="font-light">Tax Smart Generational Wealth</span> </div> <div className="text-gray-800 text-xs font-medium flex items-start gap-2"> <Check size={16} strokeWidth={4} /> <span className="font-light">And more...</span> </div> </div></div>
          
          <div className="text-gray-800 text-xs font-semibold text-center mb-6 font-walbaum">
            *11am EST, May 22/25 - Only 33 Spots Available
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="font-linear">
            <div className="mb-3">
              <label className="text-black text-xs font-medium block mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="text-gray-600 border text-xs w-full p-2 rounded-lg border-gray-400"
                {...register("fullName", { required: true })}
                aria-invalid={errors.fullName ? "true" : "false"}
              />
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex flex-col w-1/2">
                <label className="text-black text-xs font-medium mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  placeholder="Enter business email"
                  className="text-gray-600 border text-xs w-full p-2 rounded-lg border-gray-400"
                  {...register("businessEmail", { required: true, pattern: /^\S+@\S+$/i })}
                  aria-invalid={errors.businessEmail ? "true" : "false"}
                />
              </div>
              
                    <div className="flex flex-col w-1/2">
            <label className="text-black text-xs font-medium mb-1">
                Business Website
            </label>
            <input
                type="text"
                placeholder="Enter business website URL"
                className={`text-gray-600 border text-xs w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                websiteError ? 'border-red-500' : 'border-gray-400'
                }`}
                {...register("businessWebsite", { 
                validate: validateWebsiteUrl 
                })}
                onChange={handleWebsiteChange}
            />
            {websiteError && (
                <p className="text-red-500 text-xs mt-1">{websiteError}</p>
            )}
            </div>
            </div>

            <PhoneInputDropdown 
                onPhoneChange={(fullNumber) => setValue('phoneNumber', fullNumber)}
                error={errors.phoneNumber}
                register={register}
                />

            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="agreeToTerms"
                className="w-4 h-4 border border-black"
                {...register("agreeToTerms", { required: true })}
                aria-invalid={errors.agreeToTerms ? "true" : "false"}
              />
              <label htmlFor="agreeToTerms" className="text-gray-500 text-xs">
                I agree to opt-in and accept the privacy policy.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-black w-full py-3 rounded-lg font-semibold text-base hover:bg-gray-800 transition-colors disabled:bg-gray-500"
            >
              {isSubmitting ? "Submitting..." : "I want a chance to WIN !!"}
            </button>
          </form>
        </div>
      </div>

      {/* Password Popup */}
      <PasswordPopup
        isOpen={showPasswordPopup}
        onClose={handlePasswordPopupClose}
        onSubmit={handlePasswordSubmit}
        isSubmitting={isSubmitting}
      />

      {/* OTP Popup */}
      <OTPPopup
        isOpen={showOTPPopup}
        onClose={() => setShowOTPPopup(false)}
        onVerify={verifyOTP}
        onResend={() => sendEmailOTP(userEmail)}
        email={userEmail}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

const HeroSection: React.FC = () => {
    return (
      <section className="flex flex-col items-center text-center py-12 pb-0 relative">
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
      
      <h1 className="text-[#818181] font-walbaum text-7xl font-normal text-center mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
        The world's first and only place
      </h1>
      
      <div className="text-[#818181] text-center text-7xl font-normal max-w-[1200px] mb-16 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 font-walbaum">
        <p>that helps you <span className="text-[#007C7A]">WIN</span> in business.</p>
      </div>
      
      <p className="text-[#555555] text-center text-[28px] max-w-[1500px] mb-2 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 flex-col">
        <p className="font-thin pb-10">Business winning is NOT just about profits, sales, growth or scaling.</p>
        <p className="font-thin">WINNING is:</p>
      </p>
      
      <p className="text-black text-center text-[28px]  font-normal leading-9 max-w-[800px] mb-8 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4">
      Maximizing, monetizable value, tax effectively - for all invested.
      </p>
      
      <p className="text-black text-center text-[28px] font-medium leading-9 max-w-[1200px] mb-3 mx-auto max-md:text-2xl max-md:mb-8 max-sm:text-xl max-sm:mb-6 flex-col">
        <p className="mb-3">That's exactly what our client Jeff did –  he WON - and now he shares how he did it.</p>
        <p className="text-[#555555] font-light">(Jeff grew and exited his freight services company</p>
        <p className="text-[#555555] font-light mb-10">with double digit multiples, all tax effectively)</p>
        <p>And with our help , you can WIN too.</p>
      </p>
    </section>
    );
  };

  const StorySection = () => {
    const circles = [
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="100">Canadian entrepreneur,</tspan>
          <tspan x="120" y="120">founder and former</tspan>
          <tspan x="120" y="140">CEO of Rodair</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="90">He and his team</tspan>
          <tspan x="120" y="110">operationalized the DNA</tspan>
          <tspan x="120" y="130">of their business a</tspan>
          <tspan x="120" y="150">Unifying Philosophy:</tspan>
          <tspan x="120" y="170">Prosperity For All</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="90">Prosperity For All</tspan>
          <tspan x="120" y="110">helped him build a</tspan>
          <tspan x="120" y="130">valuable, and Best</tspan>
          <tspan x="120" y="150">Managed award-</tspan>
          <tspan x="120" y="170">winning company.</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="80">Prosperity For All</tspan>
          <tspan x="120" y="100">results: 25% high</tspan>
          <tspan x="120" y="120">profit margins superb</tspan>
          <tspan x="120" y="140">company culture</tspan>
          <tspan x="120" y="160">double-digit</tspan>
          <tspan x="120" y="180">multiple exit.</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="80">Prosperity For All A</tspan>
          <tspan x="120" y="100">world's first:</tspan>
          <tspan x="120" y="120">maximized vale</tspan>
          <tspan x="120" y="140">across intangible</tspan>
          <tspan x="120" y="160">assets, monetizing</tspan>
          <tspan x="120" y="180">them, tax effectively.</tspan>
        </text>
      </svg>`
    ];
    
    return (
      <section className="flex flex-col items-center pt-36 pb-10 -mt-32">
        <div className="w-screen relative py-20">
  
          {/* Content starts */}
          <div className="text-center mb-12">
            <h1 className="text-[#818181] font-walbaum text-7xl text-center mb-16 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
                Many grow and <span className="text-[#D22F27]">LOSE.</span> 
            </h1>
      
      <p className="text-[#D02C31] text-center text-[28px] max-w-[1500px] mb-14 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 flex-col font-light">
        <p >When <span className="font-semibold">80%</span> businesses don't sell and</p>
        <p>only <span className="font-semibold">6%</span> only got fair market value when sold,</p>
        <p>most entrepreneurs and business families,</p>
        <p>no matter how successful,</p>
        <p>LOSE on exit/succession.</p>
      </p>
      
      <p className="text-black text-center text-[28px] font-normal leading-9 max-w-[1250px] mb-3 mx-auto max-md:text-2xl max-md:mb-8 max-sm:text-xl max-sm:mb-6 flex-col gap-3">
        <p className="mb-2">No one starts and grows a business to LOSE,</p>
        <p className="mb-2">ButLOSE they do because:</p>
        <p className="">They didn’t grow value companies where 84%+ of their business value matters most – intangible assets.</p>
      </p>
            <h2 className="text-[#777] text-7xl font-extralight font-walbaum mb-6 mt-32 max-md:text-5xl max-sm:text-[32px]">
                We rule all intangible assets with
            </h2>
            <h3 className="text-[#818181] text-7xl font-normal font-walbaum mb-16 max-md:text-5xl max-sm:text-[32px]">
                ONE asset that's 6 words or less. ​
            </h3>
          </div>
  
          {/* Fixed image container */}
          <div className="w-[689px] h-[690px] bg-white mt-0 mb-12 mx-auto rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)] max-w-full overflow-hidden flex items-center justify-center">
            <img 
              src="https://ik.imagekit.io/je0rl3nnt/IMG-20250516-WA0027.jpg?updatedAt=1748409736037" 
              alt="Jeff Cullen - Entrepreneur and CEO" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center">
          <button className="bg-black text-white text-xl font-medium py-6 px-24 rounded max-w-3xl w-full text-center hover:bg-gray-800 transition-colors">
            Start WINNING (Free Webinars + Trail Offers)
          </button>
        </div>
  
          <div className="text-center mb-20 mt-20">
            <h2 className="text-[#777] text-7xl mb-6 max-md:text-5xl max-sm:text-[32px] font-walbaum font-extralight">
                From dream to done
            </h2>
            <h3 className="text-[#818181] text-7xl font-normal mb-20 max-md:text-5xl max-sm:text-[32px] font-walbaum">
                with 6 words or less
            </h3>

            <div className="w-[689px] h-[690px] bg-white mt-0 mb-20 mx-auto rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)] max-w-full overflow-hidden flex items-center justify-center">
            <img 
              src="https://ik.imagekit.io/je0rl3nnt/IMG-20250516-WA0027.jpg?updatedAt=1748409736037" 
              alt="Jeff Cullen - Entrepreneur and CEO" 
              className="w-full h-full object-cover"
            />
          </div>
  
            <div className="max-w-[570px] mt-0 mb-20 mx-auto max-md:max-w-full max-md:px-4">
              <p className="text-black text-justify text-[28px] font-semibold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                Jeff Cullen built a valuable, marketable company
              </p>
              <div className="text-black text-center text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                <p>By creating and operationalizing</p>
                <p>"Prosperity For All" -</p>
                <p>his (Unifying Philosophy) UPh™</p>
              </div>
              <p className="text-black text-justify text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                A UPh is your business DNA in 6 words or less.
              </p>
              <p className="text-black text-justify text-[28px] font-bold leading-8 max-md:text-2xl max-sm:text-xl">
                It's the one asset that rules all intangible assets.
              </p>
            </div>
  
            <div className="flex w-full h-60 justify-center items-start mt-0 mb-20 max-md:w-full max-md:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:items-center overflow-x-auto">
              {circles.map((circle, index) => (
                <div
                  key={index}
                  className="w-30 h-30 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 mx-1"
                >
                  <div dangerouslySetInnerHTML={{ __html: circle }} />
                </div>
              ))}
            </div>
  
            <div className="max-w-[870px] flex flex-col gap-10 mx-auto my-0 max-md:px-4 max-sm:px-2 font-thin">
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                Jeff Cullen, a Canadian entrepreneur and logistics executive is best known as the founder and former CEO of Rodair, a Toronto-based third-party logistics provider.
              </p>
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                He launched Rodair in 1996 with just three employees, and by 2012, the company had expanded to 27 offices across 17 countries, generating CAD 170 million in sales.
              </p>
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                Under his leadership, Rodair became a full-service supply chain provider with 155 employees across Canada, serving industries such as fashion, retail, automotive, and mining.
              </p>
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                In 2019, Rodair was acquired by Rhenus Logistics, a German global logistics firm. Cullen continued to lead the Canadian operations under the new name, Rhenus Canada. He emphasized a unifying business philosophy centered on shared prosperity, transparency, and long-term sustainability. His leadership style focused on creating value for all stakeholders—clients, employees, vendors, and shareholders alike.
              </p>
            </div>

            <div>
                <h1 className="text-[#818181] font-walbaum text-7xl font-thin mt-24 text-center mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
                    You had a dream.
                </h1>
                
                <div className="text-[#818181] text-center text-7xl font-normal max-w-[1200px] mb-16 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 font-walbaum">
                    <p>His came true. What about yours?</p>
                </div>
                <div className="flex justify-center">
                    <button className="bg-black text-white text-xl font-medium py-6 px-24 rounded max-w-3xl w-full text-center hover:bg-gray-800 transition-colors">
                        Start WINNING (Free Webinars + Trail Offers)
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  

const StepsSection: React.FC<{ videos?: any[] }> = ({ videos = [] }) => {
    const steps = [
        { id: 1, name: "1. Endgame" },
        { id: 2, name: "2. Valfucturing" },
        { id: 3, name: "3. Scaling" },
        { id: 4, name: "4. Staging" },
        { id: 5, name: "5. Moment(s) of Truth" },
        { id: 6, name: "6. Pride" }
      ];

  return (
    <section className="w-full flex flex-col items-center">
      <div className="bg-[#F4F4F4] w-screen py-12 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#818181] text-center mb-16 font-walbaum">
            <div className="text-7xl font-light">How his dream came true</div>
            <div className="text-7xl font-normal">a UPh™ + 6 steps.</div>
          </h2>
          
          <p className="text-2xl font-light mb-6">
            Jeff didn't just build a profitable company.​
          </p>
          
          <div className="text-teal-600 text-2xl mb-6 ">
            He built a valuable company. ​<br />
            He made it valuable for the buyer - from day one.​<br />
            He was growing it for the richer exit.
          </div>
          
          <p className="text-2xl mb-4">
            He maximized value where value matters: ​
            <span className="underline">intangibles</span>.
          </p>
          
          <p className="text-teal-600 mb-4 text-2xl">
            He made sure that this value was bankable: 
            <span className="underline">monetizing the intangibles.</span>
          </p>
          
          <p className="text-2xl mb-6">
            He had it all set up for:{" "}
            <span className="underline">maximum after tax value</span>.
          </p>
          
          <div className="text-2xl leading-8 mb-10">
            <p className="text-teal-600 mb-2">
              Jeff made his dream come true... ​
            </p>
            <p className="mb-2">
              <span className="font-bold">With one asset,</span>
              <span className="font-bold underline"> the UPh</span>
              <span className="font-normal underline">™</span>
              <span className="font-bold">, the DNA of his business​</span>
            </p>
            <p className="text-teal-600 mb-2">
              implemented everywhere​
            </p>
            <p className="font-bold mb-2">
              tying all intangible assets together​
            </p>
            <p className="text-teal-600">
              then structuring it all tax effectively.​
            </p>
          </div>
        </div>
      </div>

      {/* Steps display */}
      <div className="w-full max-w-6xl mx-auto py-10 pt-20">
        <div className="grid grid-cols-3 gap-5 mb-6">
          {steps.slice(0, 3).map((step, index) => (
            <div key={step.id} className="flex flex-col gap-4">
              <div className="bg-[#EDEAEA] py-4 px-6 text-[#555555] text-2xl font-medium text-center">
                {step.name}
              </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe className="w-full h-full" src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-MVK80k4KdY-240p.mp4/ik-video.mp4?updatedAt=1748406580407&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-MVK80k4KdY-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406580407&updatedAt=1748406580407" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
                </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-5 mb-16">
          {steps.slice(3, 6).map((step, index) => (
            <div key={step.id} className="flex flex-col gap-4">
              <div className="bg-[#EDEAEA] py-4 px-6 text-[#555555] text-2xl font-medium text-center">
                {step.name}
              </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe className="w-full h-full" src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-MVK80k4KdY-240p.mp4/ik-video.mp4?updatedAt=1748406580407&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-MVK80k4KdY-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406580407&updatedAt=1748406580407" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
                </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center py-10">
          <button className="bg-black text-white text-xl font-medium py-6 px-20 rounded max-w-2xl w-full text-center hover:bg-gray-800 transition-colors">
            It's now or never. I refuse to risk anything more
          </button>
        </div>
      </div>
    </section>
  );
};

const CtaSection: React.FC = () => {
  return (
          <section className="bg-[#F4F4F4] w-full mt-16 overflow-hidden">
            <div className="max-w-3xl mx-auto text-center px-4 py-12">
              <h2 className="text-[#818181] text-center mb-4 font-serif">
                <div className="text-6xl">Save your dream now...</div>
              </h2>
              <h3 className="text-[#A71F23] text-6xl mb-12 font-serif">
                Or lose it.....forever.
              </h3>
              
              <p className="text-gray-700 mb-8 text-2xl font-light">
                Congratulations, you have a profitable company. <br />
                Sadly, that's not enough.
              </p>
              
              <p className="text-[#A71F23] mb-4 text-2xl font-light">
                Is your company valuable – to you or your buyer?
              </p>
              
              <p className="text-[#A71F23] mb-6 text-2xl font-light">
                You will exit for how much?​
              </p>
              
              <p className="text-[#A71F23] font-semibold mb-8 text-2xl">
                Will the wealth you keep on exit equal ​<br />
                everything you sacrificed for all those years building your
                business?​
              </p>
              
              <p className="text-gray-700 mb-12 text-2xl font-light">
                NOT growing to exit richer? ​<br />
                Why else are you growing your business ?​
              </p>
              
              <p className="text-black text-3xl font-semibold mb-10">
                Cullen achieved a double-digit multiple exit, monetizing intangible
                assets, tax effectively via their <br />
                Unifying Philosophy (UP™): Prosperity For All.
              </p>
              
              <p className="text-black mb-6 text-xl font-light">
                His Rodair exit to Rhenus has now set forth his next mission: a foundation
              </p>
              
              <p className="text-black text-3xl font-semibold">
                Dream Big Do Good
              </p>
            </div>
          </section>
  );
};

const Index: React.FC = () => {
    const [videos, setVideos] = useState<unknown[]>([]);
  
    return (
      <div className="">
         <HeroSection />
        <div className=" w-full mx-auto">
          <div className="relative">
            <FormSection onVideosLoaded={setVideos} />
            <StorySection />
            {/* <StepsSection videos={videos} /> */}
            {/* <CtaSection /> */}
          </div>
          
        </div>
        <VideoPopup videos={videos} />
      </div>
    );
  };

export default Index;