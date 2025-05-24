import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext"; // Adjust path as needed

interface LoginFormProps {
    onSwitchToRegister: () => void;
  }

  export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.identifier || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://intern-project-final-1.onrender.com/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Use the auth context login function
        await login(data.tokens);
        
        // Redirect to dashboard or desired page
        console.log('Login successful:', data.message);
        navigate('/'); // or wherever you want to redirect
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCsrfToken = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') {
        return value;
      }
    }
    return '';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    onSwitchToRegister();
  };

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="flex flex-col gap-3">
        <div className="text-base text-black flex items-center gap-1">
          <span>Email or Username</span>
          <span className="text-black ml-1">*</span>
        </div>
        <input
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleInputChange}
          placeholder="Enter your email or username"
          className="border text-sm w-full px-4 py-2.5 rounded-lg border-solid border-gray-400 focus:border-black focus:outline-none transition-colors"
          disabled={loading}
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="text-base text-black flex items-center gap-1">
          <span>Password</span>
          <span className="text-black ml-1">*</span>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            className="border text-sm w-full px-4 py-2.5 rounded-lg border-solid border-gray-400 focus:border-black focus:outline-none transition-colors pr-12"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            disabled={loading}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <button 
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full text-white text-base cursor-pointer bg-black mt-4 p-4 rounded-lg border-none hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
      
      <div className="text-center text-lg italic text-gray-500 mt-6">
        <span>Don't have an account? </span>
        <span 
          className="text-black cursor-pointer hover:underline"
          onClick={handleRegisterClick}
        >
          Register
        </span>
      </div>
    </div>
  );
}