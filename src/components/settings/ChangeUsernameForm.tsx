import React, { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, Loader2, Check, X } from "lucide-react";
import ForgotPasswordPopups from "./ForgotPassword";

interface FormData {
  usernameColor: string;
  usernameObject: string;
  usernameNum: string;
  password: string;
}

interface ApiError {
  error?: string;
  message?: string;
  detail?: string;
}

interface UserProfile {
  user_data?: {
    username?: string;
  };
  username?: string;
  user?: {
    username: string;
  };
}

interface ChangeUsernameFormProps {
  onCancel?: () => void;
  setDisplay?: (display: string) => void;
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({ 
  onCancel,
  setDisplay 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [usernameAvailability, setUsernameAvailability] = useState<{
    isAvailable: boolean | null;
    message: string;
  }>({ isAvailable: null, message: "" });
  const [formData, setFormData] = useState<FormData>({
    usernameColor: "",
    usernameObject: "",
    usernameNum: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<{
    usernameColor?: string;
    usernameObject?: string;
    usernameNum?: string;
    password?: string;
  }>({});

  // API configuration
  const API_BASE_URL = 'https://intern-project-final-1.onrender.com';

  const COLOR_OPTIONS = [
    'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 
    'White', 'Gray', 'Brown', 'Cyan', 'Magenta', 'Lime', 'Indigo', 'Violet'
  ];
  
  const OBJECT_OPTIONS = [
    'Cat', 'Dog', 'Bird', 'Fish', 'Tree', 'Star', 'Moon', 'Sun', 'Car', 'Book',
    'Phone', 'House', 'Flower', 'Rock', 'Cloud', 'Fire', 'Water', 'Mountain',
    'Ocean', 'River', 'Forest', 'Garden', 'Bridge', 'Tower', 'Castle', 'Ship'
  ];
  
  const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token');
  };

  const createAuthHeaders = () => {
    const token = getAccessToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...createAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || errorData.detail || `HTTP ${response.status}`);
    }

    return response.json();
  };

  // Check username availability
  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (!username || username === currentUsername) {
      setUsernameAvailability({ isAvailable: null, message: "" });
      return;
    }

    setIsCheckingUsername(true);
    
    try {
      const response = await makeAuthenticatedRequest('/check-username/', {
        method: 'POST',
        body: JSON.stringify({ username })
      });

      setUsernameAvailability({
        isAvailable: !response.exists,
        message: response.message || (response.exists ? "Username already taken" : "Username is available")
      });
    } catch (error) {
      console.error('Error checking username availability:', error);
      setUsernameAvailability({
        isAvailable: null,
        message: "Unable to check username availability"
      });
    } finally {
      setIsCheckingUsername(false);
    }
  }, [currentUsername]);

  // Debounced username check
  useEffect(() => {
    const { usernameColor, usernameObject, usernameNum } = formData;
    
    if (usernameColor && usernameObject && usernameNum) {
      const formattedNum = usernameNum.padStart(3, '0');
      const newUsername = `${usernameColor}${usernameObject}${formattedNum}`;
      
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(newUsername);
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameAvailability({ isAvailable: null, message: "" });
    }
  }, [formData.usernameColor, formData.usernameObject, formData.usernameNum, checkUsernameAvailability]);

  // Fetch current username when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsProfileLoading(true);
      setErrorMessage(null);

      try {
        // Try multiple endpoints to get user data
        const endpoints = [
          '/extract-user-data/',
          '/user/current/',
          '/auth/me/',
          '/profile/'
        ];

        let userData: UserProfile | null = null;

        for (const endpoint of endpoints) {
          try {
            userData = await makeAuthenticatedRequest(endpoint);
            break;
          } catch (error) {
            // Continue to next endpoint if this one fails
            continue;
          }
        }

        if (!userData) {
          throw new Error('Unable to fetch user profile from any endpoint');
        }

        // Extract username from various possible response structures
        const username = userData.user?.username || userData.user_data?.username || userData.username;
        
        if (!username) {
          throw new Error('Username not found in profile data');
        }
        setCurrentUsername(username);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
        
        if (errorMsg.includes('401') || errorMsg.includes('403')) {
          setErrorMessage("Authentication error. Please log in again.");
        } else if (errorMsg.includes('Network')) {
          setErrorMessage("Network error. Please check your connection.");
        } else {
          setErrorMessage(`Failed to load profile: ${errorMsg}`);
        }
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const validateForm = (): boolean => {
    const errors: { 
      usernameColor?: string; 
      usernameObject?: string; 
      usernameNum?: string; 
      password?: string; 
    } = {};
    let isValid = true;
    
    // Color validation
    if (!formData.usernameColor) {
      errors.usernameColor = "Color is required";
      isValid = false;
    }
    
    // Object validation
    if (!formData.usernameObject) {
      errors.usernameObject = "Object is required";
      isValid = false;
    }
    
    // Number validation
    if (!formData.usernameNum) {
      errors.usernameNum = "Number is required";
      isValid = false;
    } else if (!/^\d{1,3}$/.test(formData.usernameNum)) {
      errors.usernameNum = "Must be a valid number (0-999)";
      isValid = false;
    } else if (parseInt(formData.usernameNum) < 0 || parseInt(formData.usernameNum) > 999) {
      errors.usernameNum = "Number must be between 000 and 999";
      isValid = false;
    }
    
    // Check if new username is different from current
    const formattedNum = formData.usernameNum.padStart(3, '0');
    const newUsername = `${formData.usernameColor}${formData.usernameObject}${formattedNum}`;
    if (newUsername === currentUsername) {
      errors.usernameColor = "New username must be different from current username";
      isValid = false;
    }
    
    // Check username availability
    if (usernameAvailability.isAvailable === false) {
      errors.usernameColor = "Username is already taken. Please choose a different combination.";
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = "Password is required for verification";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear general messages when user modifies form
    if (errorMessage) setErrorMessage(null);
    if (successMessage) setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Wait for username check to complete if it's in progress
    if (isCheckingUsername) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    const formattedNum = formData.usernameNum.padStart(3, '0');
    try {
      const response = await makeAuthenticatedRequest('/change-username/', {
        method: 'POST',
        body: JSON.stringify({
          username_color: formData.usernameColor,
          username_object: formData.usernameObject,
          username_num: formattedNum,  // Use formatted number
          password: formData.password
        })
      });
  
      setSuccessMessage(response.message || "Username updated successfully!");
      const newUsername = `${formData.usernameColor}${formData.usernameObject}${formattedNum}`;
      setCurrentUsername(newUsername);
      
      // Clear the form
      setFormData({
        usernameColor: "",
        usernameObject: "",
        usernameNum: "",
        password: ""
      });
      setFormErrors({});
      setUsernameAvailability({ isAvailable: null, message: "" });
      
      // Optionally update the token if a new one is provided
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
      }
  
    } catch (error) {
      console.error('Username change error:', error);
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      // Handle specific error cases
      if (errorMsg.includes('400')) {
        setErrorMessage("Invalid request. Please check your input and try again.");
      } else if (errorMsg.includes('401')) {
        setErrorMessage("Invalid password. Please try again.");
      } else if (errorMsg.includes('Username already taken')) {
        setErrorMessage("Username is already taken. Please choose a different combination.");
      } else if (errorMsg.includes('Network') || errorMsg.includes('fetch')) {
        setErrorMessage("Network error. Please check your connection and try again.");
      } else {
        setErrorMessage(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      usernameColor: "",
      usernameObject: "",
      usernameNum: "",
      password: ""
    });
    setFormErrors({});
    setErrorMessage(null);
    setSuccessMessage(null);
    setUsernameAvailability({ isAvailable: null, message: "" });
    
    // Call the onCancel prop if provided
    if (onCancel) {
      onCancel();
    }
    setDisplay('setting');
  };

  const handleBackClick = () => {
      setDisplay('setting'); // Go back to settings (same as ProfileForm)
  };

  const getPreviewUsername = () => {
    const { usernameColor, usernameObject, usernameNum } = formData;
    if (usernameColor && usernameObject && usernameNum) {
      const formattedNum = usernameNum.padStart(3, '0');
      return `${usernameColor}${usernameObject}${formattedNum}`;
    }
    return `${usernameColor || ""}${usernameObject || ""}${usernameNum || "___"}`;
  };

  const renderAvailabilityIndicator = () => {
    const { usernameColor, usernameObject, usernameNum } = formData;
    
    if (!usernameColor || !usernameObject || !usernameNum) {
      return null;
    }

    const formattedNum = usernameNum.padStart(3, '0');
    const newUsername = `${usernameColor}${usernameObject}${formattedNum}`;
    
    if (newUsername === currentUsername) {
      return (
        <div className="flex items-center gap-2 text-orange-600 text-sm mt-2">
          <AlertCircle size={16} />
          <span>This is your current username</span>
        </div>
      );
    }

    if (isCheckingUsername) {
      return (
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
          <Loader2 size={16} className="animate-spin" />
          <span>Checking availability...</span>
        </div>
      );
    }

    if (usernameAvailability.isAvailable === true) {
      return (
        <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
          <Check size={16} />
          <span>{usernameAvailability.message}</span>
        </div>
      );
    }

    if (usernameAvailability.isAvailable === false) {
      return (
        <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
          <X size={16} />
          <span>{usernameAvailability.message}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto p-6 md:p-10 md:px-16">
      {/* Header with Back Button */}
      <div 
        className="flex items-center gap-4 text-gray-600 text-2xl cursor-pointer mb-8"
        onClick={handleBackClick}
      >
        <div>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="back-icon"
          >
            <path d="M10.3636 12.4999L18 20.4999L15.8182 22.7856L6 12.4999L15.8182 2.21421L18 4.49991L10.3636 12.4999Z" fill="currentColor"></path>
          </svg>
        </div>
        <span>Back</span>
      </div>
      
      <div className="max-w-md">
        <h1 className="text-gray-800 text-3xl font-semibold mb-8">
          Change Username
        </h1>
        
        {/* Messages */}
        {successMessage && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}
        
        {errorMessage && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}
        
        {/* Current Username Display */}
        <div className="mb-8">
          <label className="block text-gray-800 font-medium mb-2">
            Current Username
          </label>
          <div className="text-gray-600 text-sm">
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              `@${currentUsername || "Unable to load"}`
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* New Username Input */}
          <div className="space-y-6">
            {/* Main Grid with 4 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              
              {/* Dropdowns Section (3 columns) */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                
                {/* Color Dropdown */}
                <div>
                  <label htmlFor="usernameColor" className="block text-gray-800 font-medium mb-2">
                    Color
                  </label>
                  <select
                    id="usernameColor"
                    name="usernameColor"
                    value={formData.usernameColor}
                    onChange={handleInputChange}
                    disabled={isLoading || isProfileLoading}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      formErrors.usernameColor 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select Color</option>
                    {COLOR_OPTIONS.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  {formErrors.usernameColor && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {formErrors.usernameColor}
                    </p>
                  )}
                </div>

                {/* Object Dropdown */}
                <div>
                  <label htmlFor="usernameObject" className="block text-gray-800 font-medium mb-2">
                    Object
                  </label>
                  <select
                    id="usernameObject"
                    name="usernameObject"
                    value={formData.usernameObject}
                    onChange={handleInputChange}
                    disabled={isLoading || isProfileLoading}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      formErrors.usernameObject 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select Object</option>
                    {OBJECT_OPTIONS.map((object) => (
                      <option key={object} value={object}>
                        {object}
                      </option>
                    ))}
                  </select>
                  {formErrors.usernameObject && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {formErrors.usernameObject}
                    </p>
                  )}
                </div>

                {/* Username Number Input */}
                <div>
                  <label htmlFor="usernameNum" className="block text-gray-800 font-medium mb-2">
                    Number
                  </label>
                  <input
                    type="text"  // Keep as text to allow leading zeros
                    id="usernameNum"
                    name="usernameNum"
                    value={formData.usernameNum}
                    onChange={handleInputChange}
                    disabled={isLoading || isProfileLoading}
                    maxLength={3}  // Add this to limit input to 3 characters
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      formErrors.usernameNum 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="000-999"  // Update placeholder
                  />
                  {formErrors.usernameNum && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {formErrors.usernameNum}
                    </p>
                  )}
                </div>
              </div>

              {/* Username Preview (placed to the side) */}
              <div className="bg-white rounded-lg px-4 py-4 text-black text-sm font-mono font-bold flex items-center pt-12 ">
                @{getPreviewUsername()}
              </div>
            </div>

            {/* Username Availability Indicator */}
            {renderAvailabilityIndicator()}
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password to confirm"
                disabled={isLoading || isProfileLoading}
                className={`w-full px-4 py-3 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  formErrors.password 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                disabled={isLoading || isProfileLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {formErrors.password}
              </p>
            )}
            
            <button 
              type="button" 
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 transition-colors duration-200"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isLoading || 
                isProfileLoading || 
                !currentUsername || 
                isCheckingUsername ||
                usernameAvailability.isAvailable === false
              }
              className="flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed min-w-28"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="border border-black text-black px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ForgotPasswordPopups
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSuccess={() => {
          // Optional: Show success message or redirect
          console.log("Password reset successful!");
        }}
      />
    </div>
  );
};

export default ChangeUsernameForm;