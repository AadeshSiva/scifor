import { useAuth } from "@/utils/AuthContext";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PremiumPopup } from "../coi/premiumPopup";

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

    useEffect(() => {
      const detectCountry = async () => {
        try {
          // Try multiple IP geolocation services as fallback
          const services = [
            'https://ipapi.co/country_code/',
            'https://api.ipify.org?format=json', // This will need additional processing
            'https://ipinfo.io/country'
          ];
    
          let countryCode = null;
    
          // Try the first service (ipapi.co)
          try {
            const response = await fetch(services[0]);
            if (response.ok) {
              countryCode = await response.text();
              countryCode = countryCode.trim().toUpperCase();
            }
          } catch (error) {
            console.log('Primary service failed, trying fallback...');
          }
    
          // If first service fails, try ipinfo.io
          if (!countryCode) {
            try {
              const response = await fetch(services[2]);
              if (response.ok) {
                countryCode = await response.text();
                countryCode = countryCode.trim().toUpperCase();
              }
            } catch (error) {
              console.log('Fallback service also failed');
            }
          }
    
          // Enhanced country matching logic
          if (countryCode) {
            const countryMap = {
              'US': { code: '+1', name: 'United States' },
              'CA': { code: '+1', name: 'Canada' },
              'GB': { code: '+44', name: 'United Kingdom' },
              'UK': { code: '+44', name: 'United Kingdom' },
              'IN': { code: '+91', name: 'India' },
              'DE': { code: '+49', name: 'Germany' },
              'FR': { code: '+33', name: 'France' },
              'AU': { code: '+61', name: 'Australia' },
              'JP': { code: '+81', name: 'Japan' },
              'BR': { code: '+55', name: 'Brazil' },
              'MX': { code: '+52', name: 'Mexico' },
              'IT': { code: '+39', name: 'Italy' },
              'ES': { code: '+34', name: 'Spain' },
              'NL': { code: '+31', name: 'Netherlands' },
              'SE': { code: '+46', name: 'Sweden' },
              'NO': { code: '+47', name: 'Norway' },
              'DK': { code: '+45', name: 'Denmark' },
              'CH': { code: '+41', name: 'Switzerland' },
              'AT': { code: '+43', name: 'Austria' },
              'BE': { code: '+32', name: 'Belgium' },
              'PT': { code: '+351', name: 'Portugal' },
              'CN': { code: '+86', name: 'China' },
              'KR': { code: '+82', name: 'South Korea' },
              'NZ': { code: '+64', name: 'New Zealand' },
              'AR': { code: '+54', name: 'Argentina' },
              'CL': { code: '+56', name: 'Chile' },
              'CO': { code: '+57', name: 'Colombia' },
              'PE': { code: '+51', name: 'Peru' },
              'ZA': { code: '+27', name: 'South Africa' },
              'NG': { code: '+234', name: 'Nigeria' },
              'EG': { code: '+20', name: 'Egypt' },
              'RU': { code: '+7', name: 'Russia' },
              'TR': { code: '+90', name: 'Turkey' },
              'SA': { code: '+966', name: 'Saudi Arabia' },
              'AE': { code: '+971', name: 'UAE' },
              'SG': { code: '+65', name: 'Singapore' },
              'MY': { code: '+60', name: 'Malaysia' },
              'TH': { code: '+66', name: 'Thailand' },
              'VN': { code: '+84', name: 'Vietnam' },
              'PH': { code: '+63', name: 'Philippines' },
              'ID': { code: '+62', name: 'Indonesia' },
              'BD': { code: '+880', name: 'Bangladesh' },
              'PK': { code: '+92', name: 'Pakistan' },
              'LK': { code: '+94', name: 'Sri Lanka' },
              'NP': { code: '+977', name: 'Nepal' },
              'IR': { code: '+98', name: 'Iran' },
              'IL': { code: '+972', name: 'Israel' },
            };
    
            const mappedCountry = countryMap[countryCode];
            if (mappedCountry) {
              // Find the exact country in the countries array
              const detectedCountry = countries.find(country => 
                country.code === mappedCountry.code && 
                country.name === mappedCountry.name
              );
              
              if (detectedCountry) {
                console.log('Detected country:', detectedCountry.name);
                setSelectedCountry(detectedCountry);
                onPhoneChange(detectedCountry.code);
              }
            }
          }
        } catch (error) {
          console.log('Country detection failed:', error);
          // Silently fail and keep default country (United States)
        }
      };
    
      detectCountry();
    }, [onPhoneChange]);
  
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
      
      // Clear any existing errors when country changes
      setPhoneError("");
      
      onPhoneChange(country.code + phoneNumber);
    };
  
    const handlePhoneNumberChange = (e) => {
      const value = e.target.value.replace(/\D/g, '');
      setPhoneNumber(value);
      
      // Clear error when user starts typing again
      if (phoneError) {
        setPhoneError("");
      }
      
      onPhoneChange(selectedCountry.code + value);
    };


    const handlePhoneNumberBlur = () => {
      // Only validate when user leaves the input field
      if (phoneNumber) {
        validatePhoneNumber(phoneNumber, selectedCountry);
      }
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
  onBlur={handlePhoneNumberBlur}  // Add this line
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

export const FormSection: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showOTPPopup, setShowOTPPopup] = useState(false);
    const [showPremiumPopup, setShowPremiumPopup] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [popupDismissed, setPopupDismissed] = useState(false);
    const [videos, setVideos] = useState<any[]>([]);
    const [isLoadingVideos, setIsLoadingVideos] = useState(true);
    const {login} = useAuth()
    const { isAuthenticated, isLoading, user, updateUser } = useAuth();
    const [websiteError, setWebsiteError] = useState("");

    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
          if (user.iswebinarformfilled) {
            setShowPremiumPopup(true);
          }
        }
      }, [isLoading, isAuthenticated, user, user?.iswebinarformfilled]);

      const setWebinarFormFilled = async (email: string) => {
        try {
          const response = await fetch(`${API_BASE_URL}/set-webinar-form-filled-by-email/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
      
          const result = await response.json();
          if (response.ok) {
            // Update user data immediately in auth context
            updateUser({ iswebinarformfilled: true });
          } else {
            console.error('Failed to set webinar form filled:', result.message);
          }
        } catch (error) {
          console.error('Error setting webinar form filled:', error);
        }
      };
  

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
    setIsSubmitting(true);
    
    try {
      if (isAuthenticated && user) {
        // User is authenticated, just set webinar form as filled
        await setWebinarFormFilled(user.email);
        setShowPasswordPopup(true);
        setUserEmail(user.email);
      } else {
        // User is not authenticated, register first
        const registerData = {
          email: data.businessEmail,
          password: 'temp_password_123456',
          full_name: data.fullName,
          phone_number: data.phoneNumber,
          website_name: data.businessWebsite,
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
        }

        if (response.ok || result.user_exists) {
          // Set webinar form as filled after registration
          await setWebinarFormFilled(data.businessEmail);
          setUserEmail(data.businessEmail);
          setShowPasswordPopup(true);
        } else {
          alert(result.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePremiumUnlock = () => {
    setShowPremiumPopup(false);
    // Show the regular form after premium popup
  };

const updateUserPassword = async (newPassword: string) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          new_password: newPassword,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setShowPasswordPopup(false);
        // Send OTP for email verification
        await sendEmailOTP(userEmail);
      } else {
        alert(result.error || 'Failed to set password');
      }
    } catch (error) {
      console.error('Password update error:', error);
      alert('Failed to set password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

const handlePasswordSubmit = async (passwordData: PasswordData) => {
    if (passwordData.password === '' && passwordData.confirmPassword === '') {
      // User clicked "Verify Later" - close popup and show success
      setShowPasswordPopup(false);
      alert('Registration successful! You can set your password later.');
      localStorage.removeItem('webinarFormData');
      return;
    }
  
    // User provided password - update it using reset password endpoint
    await updateUserPassword(passwordData.password);
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
          alert('Registration complete! Email already verified.');
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

  if (!isLoading && isAuthenticated && user && user.iswebinarformfilled && showPremiumPopup) {
    return (
      <div className="flex justify-center items-start gap-8 -mb-20 mt-10">
        <div className="bg-white rounded-xl border-2 border-gray-300 overflow-hidden w-full max-w-xl shadow-sm">
          <div className="aspect-video relative w-full">
            <iframe className="w-full h-full" src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-r5QoRy7KVM-240p.mp4/ik-video.mp4?updatedAt=1748406554368&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-r5QoRy7KVM-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406554368&updatedAt=1748406554368" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
          </div>
        </div>
        
        <PremiumPopup onUnlockAccess={handlePremiumUnlock} />
      </div>
    );
  }

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