import React, { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  email: string;
  website: string;
  phone: string;
  privacy: boolean;
}

interface CountryCode {
  code: string;
  country: string;
  flag: string;
  digits: number;
  format?: string;
}

interface RegistrationFormProps {
  onSubmit: (formData: FormData) => void;
  loading: boolean;
  error: string;
  initialData?: FormData;
}

const countryCodes: CountryCode[] = [
  { code: '+1', country: 'United States', flag: '🇺🇸', digits: 10 },
  { code: '+1', country: 'Canada', flag: '🇨🇦', digits: 10 },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', digits: 10 },
  { code: '+33', country: 'France', flag: '🇫🇷', digits: 10 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', digits: 11 },
  { code: '+39', country: 'Italy', flag: '🇮🇹', digits: 10 },
  { code: '+34', country: 'Spain', flag: '🇪🇸', digits: 9 },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱', digits: 9 },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', digits: 9 },
  { code: '+47', country: 'Norway', flag: '🇳🇴', digits: 8 },
  { code: '+45', country: 'Denmark', flag: '🇩🇰', digits: 8 },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭', digits: 9 },
  { code: '+43', country: 'Austria', flag: '🇦🇹', digits: 10 },
  { code: '+32', country: 'Belgium', flag: '🇧🇪', digits: 9 },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', digits: 9 },
  { code: '+353', country: 'Ireland', flag: '🇮🇪', digits: 9 },
  { code: '+358', country: 'Finland', flag: '🇫🇮', digits: 9 },
  { code: '+91', country: 'India', flag: '🇮🇳', digits: 10 },
  { code: '+86', country: 'China', flag: '🇨🇳', digits: 11 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', digits: 10 },
  { code: '+82', country: 'South Korea', flag: '🇰🇷', digits: 10 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', digits: 8 },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', digits: 10 },
  { code: '+66', country: 'Thailand', flag: '🇹🇭', digits: 9 },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳', digits: 9 },
  { code: '+63', country: 'Philippines', flag: '🇵🇭', digits: 10 },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩', digits: 11 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', digits: 9 },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿', digits: 9 },
  { code: '+7', country: 'Russia', flag: '🇷🇺', digits: 10 },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦', digits: 9 },
  { code: '+48', country: 'Poland', flag: '🇵🇱', digits: 9 },
  { code: '+420', country: 'Czech Republic', flag: '🇨🇿', digits: 9 },
  { code: '+36', country: 'Hungary', flag: '🇭🇺', digits: 9 },
  { code: '+40', country: 'Romania', flag: '🇷🇴', digits: 10 },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬', digits: 9 },
  { code: '+385', country: 'Croatia', flag: '🇭🇷', digits: 9 },
  { code: '+381', country: 'Serbia', flag: '🇷🇸', digits: 9 },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', digits: 11 },
  { code: '+52', country: 'Mexico', flag: '🇲🇽', digits: 10 },
  { code: '+54', country: 'Argentina', flag: '🇦🇷', digits: 10 },
  { code: '+56', country: 'Chile', flag: '🇨🇱', digits: 9 },
  { code: '+57', country: 'Colombia', flag: '🇨🇴', digits: 10 },
  { code: '+51', country: 'Peru', flag: '🇵🇪', digits: 9 },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪', digits: 10 },
  { code: '+27', country: 'South Africa', flag: '🇿🇦', digits: 9 },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬', digits: 10 },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', digits: 9 },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', digits: 10 },
  { code: '+212', country: 'Morocco', flag: '🇲🇦', digits: 9 },
  { code: '+213', country: 'Algeria', flag: '🇩🇿', digits: 9 },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳', digits: 8 },
  { code: '+218', country: 'Libya', flag: '🇱🇾', digits: 9 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', digits: 9 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', digits: 9 },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', digits: 8 },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭', digits: 8 },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', digits: 8 },
  { code: '+968', country: 'Oman', flag: '🇴🇲', digits: 8 },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧', digits: 8 },
  { code: '+962', country: 'Jordan', flag: '🇯🇴', digits: 9 },
  { code: '+98', country: 'Iran', flag: '🇮🇷', digits: 10 },
  { code: '+90', country: 'Turkey', flag: '🇹🇷', digits: 10 },
  { code: '+972', country: 'Israel', flag: '🇮🇱', digits: 9 }
];

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  loading,
  error,
  initialData
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    website: '',
    phone: '',
    privacy: false
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [websiteError, setWebsiteError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');

  const filteredCountries = countryCodes.filter(country => 
    country.country.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
    country.code.includes(countrySearchTerm)
  );

  // Initialize form data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCountryDropdownOpen && !(event.target as Element).closest('.relative')) {
        setIsCountryDropdownOpen(false);
        setCountrySearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name === 'website') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (websiteError) {
        setWebsiteError('');
      }
  
    } else if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      const selectedCountry = countryCodes.find(country => country.code === selectedCountryCode);
      const maxDigits = selectedCountry?.digits || 10;
      
      const limitedValue = digitsOnly.slice(0, maxDigits);
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedValue
      }));
      
      if (phoneError) {
        setPhoneError('');
      }
    } else if (name === 'countryCode') {
      setSelectedCountryCode(value);
      setPhoneError('');
      setFormData(prev => ({
        ...prev,
        phone: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleWebsiteBlur = () => {
    if (formData.website) {
      const domainPattern = /\.[a-zA-Z]{2,}$/;
      const hasValidDomain = domainPattern.test(formData.website);
      
      if (!hasValidDomain) {
        setWebsiteError('Website should include a valid domain extension (e.g., .com, .org, .net, etc.)');
      } else {
        setWebsiteError('');
      }
    } else {
      setWebsiteError('');
    }
  };

  const handlePhoneBlur = () => {
    const selectedCountry = countryCodes.find(country => country.code === selectedCountryCode);
    const maxDigits = selectedCountry?.digits || 10;
    
    if (formData.phone && formData.phone.length !== maxDigits) {
      setPhoneError(`Phone number should be exactly ${maxDigits} digits for ${selectedCountry?.country || 'selected country'}`);
    } else {
      setPhoneError('');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      return;
    }
    
    if (!formData.privacy) {
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return;
    }
    
    // Website validation
    if (formData.website && websiteError) {
      return;
    }
    
    // Phone validation
    if (phoneError) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="sticky top-[86px] w-full max-w-sm bg-white p-8 px-3 rounded-3xl border-4 border-gray-300 shadow-lg flex-shrink-0 self-start">
      <h2 className="text-[#2B2B2B] text-center tracking-wide mb-6 font-walbaum fill-white">
        WIN a Private Webinar and Q&A with Jeff
      </h2>
      
      {/* Features List */}
      <div className="space-y-3 mb-6 pl-2">
        {[
          'Exited with Double-Digit Multiples',
          'Achieved 25%+ Profit Margins',
          'Tax Smart Generational Wealth',
          'And more...'
        ].map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-800 text-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
              <path d="M4.07573 11.8036L0.175729 7.44535C-0.0585762 7.18351 -0.0585762 6.75898 0.175729 6.49711L1.02424 5.54888C1.25854 5.28702 1.63846 5.28702 1.87277 5.54888L4.5 8.48478L10.1272 2.19638C10.3615 1.93454 10.7415 1.93454 10.9758 2.19638L11.8243 3.14461C12.0586 3.40645 12.0586 3.83098 11.8243 4.09285L4.92426 11.8036C4.68994 12.0655 4.31004 12.0655 4.07573 11.8036Z" fill="black"/>
            </svg>
            <span className='font-linear text-xs text-[#2B2B2B]'>{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="text-gray-800 text-center text-sm font-semibold mb-6 rounded-lg font-walbaum">
        *11am EST, May 22/25 - Only 33 Spots Available
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleFormSubmit} className="space-y-1 font-linear">
        <div>
          <label className="block text-black text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full h-10 border border-gray-400 text-sm px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-black text-sm font-medium mb-2">Business Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your business email"
            className="w-full h-10 border border-gray-400 text-sm px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-black text-sm font-medium mb-2">Business Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            onBlur={handleWebsiteBlur}
            placeholder="Enter your website URL (e.g., example.com)"
            className={`w-full h-10 border text-sm px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              websiteError ? 'border-red-400' : 'border-gray-400'
            }`}
          />
          {websiteError && (
            <p className="text-red-500 text-xs mt-1">{websiteError}</p>
          )}
        </div>
        
        <div>
          <label className="block text-black text-sm font-medium mb-2">Phone Number</label>
          <div className="flex gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="w-24 h-10 border border-gray-400 rounded-lg text-xs px-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white flex items-center justify-between"
              >
                <span>
                  {countryCodes.find(c => c.code === selectedCountryCode)?.flag} {selectedCountryCode}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden w-52">
                  <div className="p-2 border-b">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={countrySearchTerm}
                      onChange={(e) => setCountrySearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country, index) => (
                        <button
                          key={`${country.code}-${index}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(country.code);
                            setIsCountryDropdownOpen(false);
                            setCountrySearchTerm('');
                            setPhoneError('');
                            setFormData(prev => ({
                              ...prev,
                              phone: ''
                            }));
                          }}
                          className="w-full px-3 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                        >
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-gray-600">{country.country}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-gray-500">No countries found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handlePhoneBlur}
                placeholder={`Enter ${countryCodes.find(c => c.code === selectedCountryCode)?.digits || 10} digit number`}
                className={`w-full h-10 border text-sm px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  phoneError ? 'border-red-400' : 'border-gray-400'
                }`}
                required
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 py-4 items-center">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            checked={formData.privacy}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-black border"
            required
          />
          <label htmlFor="privacy" className="text-xs text-gray-500 leading-relaxed">
            I agree to opt-in and accept the privacy policy.
          </label>
        </div>
        
        <button
          type="submit"
          disabled={websiteError !== '' || phoneError !== '' || loading}
          className="w-full text-white text-base font-semibold bg-black py-4 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none font-linear disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'I want a chance to WIN !!'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;