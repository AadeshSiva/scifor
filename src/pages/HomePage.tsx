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

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center py-12 relative">
      <aside className="absolute right-0 top-0 max-sm:hidden z-10 transform translate-x-0">
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
      
      <h1 className="text-gray-500 text-6xl font-thin mb-1 w-full max-w-4xl mx-auto font-walbaum ">
        You had a dream.
      </h1>
      
      <h2 className="text-gray-600 text-6xl font-normal mb-10 w-full max-w-4xl mx-auto font-walbaum font-thin">
        His came true. What about yours?
      </h2>
      
      <div className="mb-3 text-xl">
        <span className="font-semibold text-red-600">80%</span>{" "}
        <span className="font-normal">businesses don't sell</span>
      </div>
      
      <div className="mb-3 text-xl">
        <span className="font-semibold text-red-600">6%</span>{" "}
        <span className="font-normal">only got fair market value</span>
      </div>
      
      <div className="mb-6 text-xl">
        <span className="font-semibold text-red-600">78%</span>{" "}
        <span className="font-normal">don't have the right advisors</span>
      </div>
      
      <p className="text-black font-bold text-xl max-w-2xl mx-auto">
        Our Solution helped him defy these odds. You can too - for FREE !
      </p>
    </section>
  );
};

const VideoPopup: React.FC<{ videos?: any[] }> = ({ videos = [] }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const position = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = position / (documentHeight - windowHeight);
        
        setScrollPosition(scrollPercentage);
        
        // Expand when user scrolls halfway
        if (scrollPercentage >= 0.5 && !isExpanded) {
          setIsExpanded(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [isExpanded]);
  
    const handleClose = () => {
      setIsVisible(false);
    };
  
    if (!isVisible) return null;

  const currentVideo = videos.length > 0 ? videos[0] : null;

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ease-in-out ${
        isExpanded
          ? 'inset-0 bg-black bg-opacity-75 flex items-center justify-center'
          : 'bottom-4 right-4'
      }`}
    >
      <div
        className={`relative transition-all duration-700 ease-in-out ${
          isExpanded
            ? 'w-full max-w-4xl h-full max-h-[80vh] mx-4'
            : 'w-80 h-48'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute z-10 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 transition-colors ${
            isExpanded ? 'top-4 right-4' : 'top-2 right-2'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video container */}
        <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl">
          {currentVideo ? (
            <iframe
              src={currentVideo.video_url}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={currentVideo.title || "Jeff Cullen Success Story Video"}
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src="/api/placeholder/800/450"
                alt="Jeff Cullen Success Story Video"
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button
                  aria-label="Play video"
                  className={`bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white transition-colors ${
                    isExpanded ? 'w-20 h-20' : 'w-12 h-12'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`text-black ml-1 ${
                      isExpanded ? 'w-10 h-10' : 'w-6 h-6'
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Video title overlay */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <p className="text-white text-sm font-medium">
                    Watch Jeff's Success Story
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Expanded video details */}
        {isExpanded && !currentVideo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6">
            <h3 className="text-white text-2xl font-bold mb-2">
              Jeff Cullen's Double-Digit Multiple Exit Story
            </h3>
            <p className="text-gray-300 text-lg">
              Learn how Jeff built and sold his company using the Unifying Philosophy: Prosperity For All
            </p>
          </div>
        )}
      </div>
    </div>
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

  const validateWebsiteUrl = (url) => {
    if (!url) return true; // Optional field
    
    // Check if URL has a proper domain extension
    const domainRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const hasExtension = /\.[a-z]{2,}$/i.test(url.replace(/^https?:\/\//, ''));
    
    if (!hasExtension) {
      return "Please enter a valid website URL with domain extension (e.g., .com, .org)";
    }
    
    return true;
  };

  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setValue('businessWebsite', value);
    
    const validation = validateWebsiteUrl(value);
    if (validation !== true) {
      setWebsiteError(validation);
    } else {
      setWebsiteError("");
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
    {isLoadingVideos ? (
      <div className="aspect-video relative w-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading video...</div>
      </div>
    ) : videos.length > 0 ? (
      <div className="aspect-video relative w-full">
        <iframe
          src={videos[0].video_url}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={videos[0].title || "Jeff Cullen Business Success Story"}
        />
      </div>
    ) : (
      <div className="aspect-video relative w-full">
        <div className="absolute inset-0 bg-black bg-opacity-10">
          <img
            src="/api/placeholder/600/400"
            alt="Jeff Cullen Business Success Story"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <button
            aria-label="Play video"
            className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-black ml-1"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    )}
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

const StorySection: React.FC = () => {
  return (
    <section className="flex flex-col items-center pt-36 pb-10">
      <div className="bg-gray-100 w-full py-12 px-4 text-center mb-12">
        <h2 className="text-gray-500 text-6xl font-light mb-1 font-walbaum">
          From Dreams to Done
        </h2>
        <h3 className="text-gray-600 text-6xl font-normal mb-8 font-walbaum ">
          in 6 Steps.
        </h3>
        
        <p className="text-2xl font-bold mb-3">
          Jeff Cullen achieved a double-digit multiple exit
        </p>
        
        <p className="text-xl mb-6">
          He built a valuable company<br />
          with his business DNA:
        </p>
        
        <p className="text-3xl font-semibold mb-8">
          Unifying Philosophy (UP™): Prosperity For All.
        </p>
      </div>
      
      <h2 className="text-gray-700 text-center mb-10">
        <div className="text-6xl font-light">The story that</div>
        <div className="text-6xl font-normal">made it come true.</div>
      </h2>
      
      <div className="flex justify-center gap-5 flex-wrap mb-16">
        {[
          "Canadian entrepreneur, founder and former CEO of Rodair DreamBig, Do Good (Foundation)",
          "He and his team operationalized the DNA of their business a Unifying Philosophy: Prosperity For All",
          "Prosperity For All helped him build a valuable, and Best Managed award-winning company.",
          "Prosperity For All results: 25% high profit margins superb company culture double-digit multiple exit.",
          "Prosperity For All A world's first: maximized vale across intangible assets, monetizing them, tax effectively."
        ].map((text, index) => (
          <div key={index} className="bg-gray-400 bg-opacity-50 rounded-full border-2 border-gray-500 border-opacity-40 p-6 w-48 h-48 flex items-center justify-center text-center text-sm">
            {text}
          </div>
        ))}
      </div>

      <article className="max-w-3xl text-left px-4">
        <p className="text-xl mb-6 leading-7">
          Jeff Cullen, a Canadian entrepreneur and logistics executive is best
          known as the founder and former CEO of Rodair, a Toronto-based
          third-party logistics provider.
        </p>
        
        <p className="text-xl mb-6 leading-7">
          He launched Rodair in 1996 with just three employees, and by 2012, the
          company had expanded to 27 offices across 17 countries, generating CAD
          170 million in sales.
        </p>
        
        <p className="text-xl mb-6 leading-7">
          Under his leadership, Rodair became a full-service supply chain provider
          with 155 employees across Canada, serving industries such as fashion,
          retail, automotive, and mining.
        </p>
        
        <p className="text-xl mb-6 leading-7">
          In 2019, Rodair was acquired by Rhenus Logistics, a German global
          logistics firm. Cullen continued to lead the Canadian operations under
          the new name, Rhenus Canada. He emphasized a unifying business
          philosophy centered on shared prosperity, transparency, and long-term
          sustainability. His leadership style focused on creating value for all
          stakeholders—clients, employees, vendors, and shareholders alike.
        </p>
      </article>
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
      <div className="bg-gray-100 w-full py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-gray-600 text-center mb-16">
            <div className="text-6xl font-light">How his dream came true</div>
            <div className="text-6xl font-normal">a UPh™ + 6 steps.</div>
          </h2>
          
          <p className="text-xl font-light mb-6">
            Jeff didn't just build a profitable company.​
          </p>
          
          <div className="text-teal-600 text-2xl mb-6">
            He built a valuable company. ​<br />
            He made it valuable for the buyer - from day one.​<br />
            He was growing it for the richer exit.
          </div>
          
          <p className="text-xl mb-4">
            He maximized value where value matters: ​
            <span className="underline">intangibles</span>.
          </p>
          
          <p className="text-teal-600 mb-4">
            ​He made sure that this value was bankable: ​
            <span className="underline">monetizing the intangibles.</span>
          </p>
          
          <p className="text-xl mb-6">
            He had it all set up for:{" "}
            <span className="underline">​maximum after tax value</span>.
          </p>
          
          <div className="text-xl leading-8 mb-10">
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
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="grid grid-cols-3 gap-5 mb-6">
          {steps.slice(0, 3).map((step, index) => (
            <div key={step.id} className="flex flex-col gap-4">
              <div className="bg-gray-200 py-4 px-6 text-gray-700 text-2xl font-medium text-center">
                {step.name}
              </div>
              {videos[index] ? (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={videos[index].video_url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={videos[index].title || step.name}
                  />
                </div>
              ) : (
                <div className="bg-gray-700 aspect-video rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Video Loading...</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-5 mb-16">
          {steps.slice(3, 6).map((step, index) => (
            <div key={step.id} className="flex flex-col gap-4">
              <div className="bg-gray-200 py-4 px-6 text-gray-700 text-2xl font-medium text-center">
                {step.name}
              </div>
              {videos[index + 3] ? (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={videos[index + 3].video_url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={videos[index + 3].title || step.name}
                  />
                </div>
              ) : (
                <div className="bg-gray-700 aspect-video rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Video Loading...</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button className="bg-black text-white text-xl font-medium py-6 px-12 rounded max-w-xl w-full text-center hover:bg-gray-800 transition-colors">
            It's now or never.​ I refuse to risk anything more​
          </button>
        </div>
      </div>
    </section>
  );
};

const CtaSection: React.FC = () => {
  return (
    <section className="bg-gray-100 w-full py-12 px-4 mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-gray-600 text-center mb-4">
          <div className="text-6xl font-light">Save your dream now...</div>
        </h2>
        <h3 className="text-red-600 text-6xl mb-12">
          Or lose it.....forever.
        </h3>
        
        <p className="text-gray-700 text-xl mb-8">
          Congratulations, you have a profitable company. ​<br />
          Sadly, that's not enough.
        </p>
        
        <p className="text-red-600 text-xl mb-4">
          Is your company valuable – to you or your buyer?​
        </p>
        
        <p className="text-red-600 text-xl mb-6">
          You will exit for how much?​
        </p>
        
        <p className="text-red-600 text-xl font-semibold mb-8">
          Will the wealth you keep on exit equal ​<br />
          everything you sacrificed for all those years building your
          business?​
        </p>
        
        <p className="text-gray-700 text-xl mb-12">
          NOT growing to exit richer? ​<br />
          Why else are you growing your business ?​
        </p>
        
        <p className="text-black text-3xl font-semibold mb-10">
          Cullen achieved a double-digit multiple exit, monetizing intangible
          assets, tax effectively via their <br />
          Unifying Philosophy (UP™): Prosperity For All.
        </p>
        
        <p className="text-black text-xl mb-6">
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
        <div className="max-w-7xl w-full px-4 mx-auto">
          <HeroSection />
          <div className="relative">
            <FormSection onVideosLoaded={setVideos} />
            <StorySection />
          </div>
          <StepsSection videos={videos} />
          <CtaSection />
        </div>
        <VideoPopup videos={videos} />
      </div>
    );
  };

export default Index;