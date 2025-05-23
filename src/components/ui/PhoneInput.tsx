import React, { useState, useEffect, useRef } from 'react';

// Country data with flags, codes, and dial codes
const countries = [
  { code: 'us', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
  { code: 'in', name: 'India', dial_code: '+91', flag: '🇮🇳' },
  { code: 'ca', name: 'Canada', dial_code: '+1', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', dial_code: '+61', flag: '🇦🇺' },
  { code: 'de', name: 'Germany', dial_code: '+49', flag: '🇩🇪' },
  { code: 'fr', name: 'France', dial_code: '+33', flag: '🇫🇷' },
  { code: 'jp', name: 'Japan', dial_code: '+81', flag: '🇯🇵' },
  { code: 'cn', name: 'China', dial_code: '+86', flag: '🇨🇳' },
  { code: 'br', name: 'Brazil', dial_code: '+55', flag: '🇧🇷' },
  { code: 'ru', name: 'Russia', dial_code: '+7', flag: '🇷🇺' },
  { code: 'ae', name: 'United Arab Emirates', dial_code: '+971', flag: '🇦🇪' },
  { code: 'sa', name: 'Saudi Arabia', dial_code: '+966', flag: '🇸🇦' },
  { code: 'sg', name: 'Singapore', dial_code: '+65', flag: '🇸🇬' },
  { code: 'za', name: 'South Africa', dial_code: '+27', flag: '🇿🇦' },
  // Add more countries as needed
];

const PhoneInput = ({ value, onChange, error }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

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
      // If the value already contains a dial code
      const matchingCountry = countries.find(country => value.startsWith(country.dial_code));
      
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        setPhoneNumber(value.substring(matchingCountry.dial_code.length).trim());
      } else {
        // If no dial code is detected, use the raw value as the phone number
        setPhoneNumber(value);
      }
    }
  }, []);

  // Format phone number to remove special characters except for the plus sign
  const formatPhoneNumber = (input) => {
    // Keep only digits
    return input.replace(/[^\d]/g, '');
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
    
    // Combine country code with phone number for the parent component
    const fullNumber = `${selectedCountry.dial_code}${formattedNumber}`;
    onChange(fullNumber);
  };

  // Handle country selection
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    
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

  return (
    <div className="relative">
      <div className="flex items-center border-[#555] gap-5">
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex items-center justify-between w-24 h-10 px-3 border border-solid ${error ? 'border-red-500' : 'border-[#555]'} rounded-lg rounded-r-none`}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">{selectedCountry.flag}</span>
              <span className="text-sm font-medium">{selectedCountry.dial_code}</span>
            </div>
            <svg 
              className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute mt-1 w-72 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {/* Search Box */}
              <div className="sticky top-0 bg-white p-2 border-b">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              {/* Country List */}
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => selectCountry(country)}
                    className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 ${
                      selectedCountry.code === country.code ? 'bg-gray-50' : ''
                    }`}
                  >
                    <span className="text-xl mr-3">{country.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-gray-500 text-xs">{country.dial_code}</div>
                    </div>
                    {selectedCountry.code === country.code && (
                      <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">No countries found</div>
              )}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Phone number"
          className={`flex-1 border border-solid ${error ? 'border-red-500' : 'border-[#555]'} text-sm px-4 py-2.5 rounded-lg rounded-l-none`}
        />
      </div>
    </div>
  );
};

export default PhoneInput;