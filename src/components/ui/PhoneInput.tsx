import React, { useState, useEffect, useRef } from 'react';

// Comprehensive country data with flags, codes, dial codes, and expected phone lengths
const countries = [
  { code: 'us', name: 'United States', dial_code: '+1', flag: '🇺🇸', phone_length: 10 },
  { code: 'gb', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧', phone_length: 10 },
  { code: 'in', name: 'India', dial_code: '+91', flag: '🇮🇳', phone_length: 10 },
  { code: 'ca', name: 'Canada', dial_code: '+1', flag: '🇨🇦', phone_length: 10 },
  { code: 'au', name: 'Australia', dial_code: '+61', flag: '🇦🇺', phone_length: 9 },
  { code: 'de', name: 'Germany', dial_code: '+49', flag: '🇩🇪', phone_length: 11 },
  { code: 'fr', name: 'France', dial_code: '+33', flag: '🇫🇷', phone_length: 10 },
  { code: 'jp', name: 'Japan', dial_code: '+81', flag: '🇯🇵', phone_length: 10 },
  { code: 'cn', name: 'China', dial_code: '+86', flag: '🇨🇳', phone_length: 11 },
  { code: 'br', name: 'Brazil', dial_code: '+55', flag: '🇧🇷', phone_length: 11 },
  { code: 'ru', name: 'Russia', dial_code: '+7', flag: '🇷🇺', phone_length: 10 },
  { code: 'ae', name: 'United Arab Emirates', dial_code: '+971', flag: '🇦🇪', phone_length: 9 },
  { code: 'sa', name: 'Saudi Arabia', dial_code: '+966', flag: '🇸🇦', phone_length: 9 },
  { code: 'sg', name: 'Singapore', dial_code: '+65', flag: '🇸🇬', phone_length: 8 },
  { code: 'za', name: 'South Africa', dial_code: '+27', flag: '🇿🇦', phone_length: 9 },
  { code: 'mx', name: 'Mexico', dial_code: '+52', flag: '🇲🇽', phone_length: 10 },
  { code: 'ar', name: 'Argentina', dial_code: '+54', flag: '🇦🇷', phone_length: 10 },
  { code: 'cl', name: 'Chile', dial_code: '+56', flag: '🇨🇱', phone_length: 9 },
  { code: 'co', name: 'Colombia', dial_code: '+57', flag: '🇨🇴', phone_length: 10 },
  { code: 'pe', name: 'Peru', dial_code: '+51', flag: '🇵🇪', phone_length: 9 },
  { code: 'eg', name: 'Egypt', dial_code: '+20', flag: '🇪🇬', phone_length: 10 },
  { code: 'ng', name: 'Nigeria', dial_code: '+234', flag: '🇳🇬', phone_length: 10 },
  { code: 'ke', name: 'Kenya', dial_code: '+254', flag: '🇰🇪', phone_length: 9 },
  { code: 'ma', name: 'Morocco', dial_code: '+212', flag: '🇲🇦', phone_length: 9 },
  { code: 'kr', name: 'South Korea', dial_code: '+82', flag: '🇰🇷', phone_length: 10 },
  { code: 'th', name: 'Thailand', dial_code: '+66', flag: '🇹🇭', phone_length: 9 },
  { code: 'vn', name: 'Vietnam', dial_code: '+84', flag: '🇻🇳', phone_length: 9 },
  { code: 'my', name: 'Malaysia', dial_code: '+60', flag: '🇲🇾', phone_length: 9 },
  { code: 'id', name: 'Indonesia', dial_code: '+62', flag: '🇮🇩', phone_length: 10 },
  { code: 'ph', name: 'Philippines', dial_code: '+63', flag: '🇵🇭', phone_length: 10 },
  { code: 'pk', name: 'Pakistan', dial_code: '+92', flag: '🇵🇰', phone_length: 10 },
  { code: 'bd', name: 'Bangladesh', dial_code: '+880', flag: '🇧🇩', phone_length: 10 },
  { code: 'lk', name: 'Sri Lanka', dial_code: '+94', flag: '🇱🇰', phone_length: 9 },
  { code: 'np', name: 'Nepal', dial_code: '+977', flag: '🇳🇵', phone_length: 10 },
  { code: 'it', name: 'Italy', dial_code: '+39', flag: '🇮🇹', phone_length: 10 },
  { code: 'es', name: 'Spain', dial_code: '+34', flag: '🇪🇸', phone_length: 9 },
  { code: 'pt', name: 'Portugal', dial_code: '+351', flag: '🇵🇹', phone_length: 9 },
  { code: 'nl', name: 'Netherlands', dial_code: '+31', flag: '🇳🇱', phone_length: 9 },
  { code: 'be', name: 'Belgium', dial_code: '+32', flag: '🇧🇪', phone_length: 9 },
  { code: 'ch', name: 'Switzerland', dial_code: '+41', flag: '🇨🇭', phone_length: 9 },
  { code: 'at', name: 'Austria', dial_code: '+43', flag: '🇦🇹', phone_length: 10 },
  { code: 'se', name: 'Sweden', dial_code: '+46', flag: '🇸🇪', phone_length: 9 },
  { code: 'no', name: 'Norway', dial_code: '+47', flag: '🇳🇴', phone_length: 8 },
  { code: 'dk', name: 'Denmark', dial_code: '+45', flag: '🇩🇰', phone_length: 8 },
  { code: 'fi', name: 'Finland', dial_code: '+358', flag: '🇫🇮', phone_length: 9 },
  { code: 'pl', name: 'Poland', dial_code: '+48', flag: '🇵🇱', phone_length: 9 },
  { code: 'cz', name: 'Czech Republic', dial_code: '+420', flag: '🇨🇿', phone_length: 9 },
  { code: 'hu', name: 'Hungary', dial_code: '+36', flag: '🇭🇺', phone_length: 9 },
  { code: 'ro', name: 'Romania', dial_code: '+40', flag: '🇷🇴', phone_length: 9 },
  { code: 'bg', name: 'Bulgaria', dial_code: '+359', flag: '🇧🇬', phone_length: 9 },
  { code: 'hr', name: 'Croatia', dial_code: '+385', flag: '🇭🇷', phone_length: 8 },
  { code: 'rs', name: 'Serbia', dial_code: '+381', flag: '🇷🇸', phone_length: 8 },
  { code: 'si', name: 'Slovenia', dial_code: '+386', flag: '🇸🇮', phone_length: 8 },
  { code: 'sk', name: 'Slovakia', dial_code: '+421', flag: '🇸🇰', phone_length: 9 },
  { code: 'lt', name: 'Lithuania', dial_code: '+370', flag: '🇱🇹', phone_length: 8 },
  { code: 'lv', name: 'Latvia', dial_code: '+371', flag: '🇱🇻', phone_length: 8 },
  { code: 'ee', name: 'Estonia', dial_code: '+372', flag: '🇪🇪', phone_length: 8 },
  { code: 'ua', name: 'Ukraine', dial_code: '+380', flag: '🇺🇦', phone_length: 9 },
  { code: 'by', name: 'Belarus', dial_code: '+375', flag: '🇧🇾', phone_length: 9 },
  { code: 'md', name: 'Moldova', dial_code: '+373', flag: '🇲🇩', phone_length: 8 },
  { code: 'tr', name: 'Turkey', dial_code: '+90', flag: '🇹🇷', phone_length: 10 },
  { code: 'il', name: 'Israel', dial_code: '+972', flag: '🇮🇱', phone_length: 9 },
  { code: 'jo', name: 'Jordan', dial_code: '+962', flag: '🇯🇴', phone_length: 9 },
  { code: 'lb', name: 'Lebanon', dial_code: '+961', flag: '🇱🇧', phone_length: 8 },
  { code: 'sy', name: 'Syria', dial_code: '+963', flag: '🇸🇾', phone_length: 9 },
  { code: 'iq', name: 'Iraq', dial_code: '+964', flag: '🇮🇶', phone_length: 10 },
  { code: 'ir', name: 'Iran', dial_code: '+98', flag: '🇮🇷', phone_length: 10 },
  { code: 'af', name: 'Afghanistan', dial_code: '+93', flag: '🇦🇫', phone_length: 9 },
  { code: 'kw', name: 'Kuwait', dial_code: '+965', flag: '🇰🇼', phone_length: 8 },
  { code: 'qa', name: 'Qatar', dial_code: '+974', flag: '🇶🇦', phone_length: 8 },
  { code: 'bh', name: 'Bahrain', dial_code: '+973', flag: '🇧🇭', phone_length: 8 },
  { code: 'om', name: 'Oman', dial_code: '+968', flag: '🇴🇲', phone_length: 8 },
  { code: 'ye', name: 'Yemen', dial_code: '+967', flag: '🇾🇪', phone_length: 9 },
  { code: 'kz', name: 'Kazakhstan', dial_code: '+7', flag: '🇰🇿', phone_length: 10 },
  { code: 'uz', name: 'Uzbekistan', dial_code: '+998', flag: '🇺🇿', phone_length: 9 },
  { code: 'tm', name: 'Turkmenistan', dial_code: '+993', flag: '🇹🇲', phone_length: 8 },
  { code: 'kg', name: 'Kyrgyzstan', dial_code: '+996', flag: '🇰🇬', phone_length: 9 },
  { code: 'tj', name: 'Tajikistan', dial_code: '+992', flag: '🇹🇯', phone_length: 9 },
  { code: 'nz', name: 'New Zealand', dial_code: '+64', flag: '🇳🇿', phone_length: 9 },
  { code: 'fj', name: 'Fiji', dial_code: '+679', flag: '🇫🇯', phone_length: 7 },
];

const detectCountryByLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code?.toLowerCase() || 'us';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'us'; // fallback to US
  }
};


 const PhoneInput = ({ value, onChange, error }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [phoneError, setPhoneError] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const autoDetectCountry = async () => {
      const detectedCountryCode = await detectCountryByLocation();
      const detectedCountry = countries.find(country => country.code === detectedCountryCode);
      
      if (detectedCountry && !value) { // Only set if no initial value is provided
        setSelectedCountry(detectedCountry);
        const fullNumber = `${detectedCountry.dial_code}${phoneNumber}`;
        onChange(fullNumber);
      }
    };
  
    autoDetectCountry();
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [dropdownOpen]);

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(
        country => 
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          country.dial_code.includes(searchTerm)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm]);

  // Handle initial phone number format if it already has a country code
  useEffect(() => {
    if (value) {
      const matchingCountry = countries.find(country => value.startsWith(country.dial_code));
      
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        setPhoneNumber(value.substring(matchingCountry.dial_code.length).trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  // Validate phone number length based on selected country
  const validatePhoneNumber = (number, country) => {
    const expectedLength = country.phone_length;
    const actualLength = number.length;
    
    if (actualLength === 0) {
      return '';
    }
    
    if (actualLength < expectedLength) {
      return `Phone number should be ${expectedLength} digits for ${country.name}. Currently ${actualLength} digits.`;
    } else if (actualLength > expectedLength) {
      return `Phone number should be ${expectedLength} digits for ${country.name}. Currently ${actualLength} digits.`;
    }
    
    return '';
  };

  // Format phone number to remove special characters except for the plus sign
  const formatPhoneNumber = (input) => {
    return input.replace(/[^\d]/g, '');
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
    
    // Validate phone number length
    const validationError = validatePhoneNumber(formattedNumber, selectedCountry);
    setPhoneError(validationError);
    
    // Combine country code with phone number for the parent component
    const fullNumber = `${selectedCountry.dial_code}${formattedNumber}`;
    onChange(fullNumber);
  };

  // Handle country selection
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    
    // Validate phone number with new country
    const validationError = validatePhoneNumber(phoneNumber, country);
    setPhoneError(validationError);
    
    // Update the full phone number with the new country code
    const fullNumber = `${country.dial_code}${phoneNumber}`;
    onChange(fullNumber);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setSearchTerm('');
    setFilteredCountries(countries);
  };

  const hasError = error || phoneError;

  return (
    <div className="relative">
      <div className="flex items-center gap-8">
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex items-center justify-between w-24 h-10 px-2 border border-solid ${hasError ? 'border-red-500' : 'border-black'} rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black`}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">{selectedCountry.flag}</span>
              <span className="text-sm font-medium text-gray-700">{selectedCountry.dial_code}</span>
            </div>
            <svg 
              className={`w-4 h-4 transition-transform text-gray-400 ${dropdownOpen ? 'transform rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute mt-1 w-80 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-20">
              {/* Search Box */}
              <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Country List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => selectCountry(country)}
                      className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                        selectedCountry.code === country.code ? 'bg-blue-100' : ''
                      }`}
                    >
                      <span className="text-xl mr-3">{country.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">{country.name}</div>
                        <div className="text-gray-500 text-xs">{country.dial_code}</div>
                      </div>
                      {selectedCountry.code === country.code && (
                        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">No countries found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={`Phone number (${selectedCountry.phone_length} digits)`}
          className={`flex-1 border border-solid ${hasError ? 'border-red-500' : 'border-black'} text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
        />
      </div>
      
      {/* Phone Error Message */}
      {phoneError && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {phoneError}
        </p>
      )}
    </div>
  );
};

const WebsiteInput = ({ value, onChange, error }) => {
  const [websiteError, setWebsiteError] = useState('');

  const validateWebsite = (url) => {
    if (!url) return '';
    
    // Check if the URL contains .com
    if (!url.includes('.com')) {
      return 'Website URL should contain ".com"';
    }
    
    return '';
  };

  const handleWebsiteChange = (e) => {
    const website = e.target.value;
    onChange(website);
    
    const validationError = validateWebsite(website);
    setWebsiteError(validationError);
  };

  const hasError = error || websiteError;

  return (
    <div className="relative">
      <input
        type="url"
        value={value}
        onChange={handleWebsiteChange}
        placeholder="Enter website URL (must contain .com)"
        className={`w-full border border-solid ${hasError ? 'border-red-500' : 'border-gray-300'} text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
      />
      
      {/* Website Error Message */}
      {websiteError && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {websiteError}
        </p>
      )}
    </div>
  );
};

export default PhoneInput