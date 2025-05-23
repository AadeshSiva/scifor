
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { BackIcon } from "../ui/icons";

interface ProfileInfo {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface UserData {
  id: number;
  email: string;
  full_name: string;
  phone_number: string;
  website_name: string;
  linkedin_url: string;
  no_linkedin: boolean;
  email_verified: boolean;
  username: string;
  is_active: boolean;
  date_joined: string;
  last_login: string;
}

interface SettingProps {
  setDisplay: (view: string) => void;
}

// InfoRow Component
const InfoRow = ({ 
  title, 
  value, 
  onClick,
  isLoading = false
}: { 
  title: string; 
  value: string; 
  onClick: () => void;
  isLoading?: boolean;
}) => {
  return (
    <div 
      className="flex items-center relative p-[30px] border-b-[rgba(158,158,158,0.5)] border-b border-solid max-md:p-[25px] max-sm:flex-col max-sm:items-start max-sm:p-5 cursor-pointer hover:bg-neutral-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="text-lg text-black flex-1 max-md:text-base max-sm:mb-2">
        {title}
      </div>
      <div className="text-sm text-[#555] font-medium mr-10 max-md:text-[13px] max-md:mr-[30px] max-sm:mb-2">
        {isLoading ? (
          <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
        ) : (
          value
        )}
      </div>
      <div className="absolute text-black right-[30px] max-sm:-translate-y-2/4 max-sm:top-2/4">
        <ChevronRight size={24} />
      </div>
    </div>
  );
};

// BasicInfoCard Component
const BasicInfoCard = ({ 
  profileInfo,
  setDisplay,
  isLoading,
  error
}: {
  profileInfo: ProfileInfo;
  setDisplay: (view: string) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  const { name, username, email, password } = profileInfo;

  return (
    <section className="max-w-[1200px] mx-auto my-0 p-10 max-md:max-w-[991px] max-md:p-5 max-sm:max-w-screen-sm max-sm:p-[15px]">
      <div className="flex items-center gap-[18px] cursor-pointer mb-[50px]" onClick={()=>setDisplay('chat')}>
        <BackIcon />
        <div className="text-[#555] text-2xl">Back</div>
      </div>
      
      <h1 className="text-[32px] text-black mb-10 max-md:text-[28px] max-md:mb-[30px] max-sm:text-2xl max-sm:mb-5">
        Basic Information
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="overflow-hidden bg-neutral-100 rounded-2xl border-2 border-solid border-[rgba(158,158,158,0.5)]">
        <InfoRow 
          title="Profile Information" 
          value={name} 
          onClick={() => setDisplay("profile")} 
          isLoading={isLoading}
        />
        <InfoRow 
          title="Change Username" 
          value={username} 
          onClick={() => setDisplay("username")} 
          isLoading={isLoading}
        />
        <InfoRow 
          title="Change Email ID" 
          value={email} 
          onClick={() => setDisplay("email")} 
          isLoading={isLoading}
        />
        <InfoRow 
          title="Change Password" 
          value={password} 
          onClick={() => setDisplay("password")} 
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

// Main Setting Component
const Setting: React.FC<SettingProps> = ({ setDisplay }) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: "Loading...",
    username: "Loading...",
    email: "Loading...",
    password: "••••••••", // Masked password for security
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get JWT token from localStorage
  const getAuthToken = (): string | null => {
    try {
      // Try to get token from localStorage
      const token = localStorage.getItem('access_token') || localStorage.getItem('accessToken');
      if (token) return token;
      
      // Try to get from sessionStorage as fallback
      return sessionStorage.getItem('access_token') || sessionStorage.getItem('accessToken');
    } catch (error) {
      console.error('Error accessing token from storage:', error);
      return null;
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch('https://intern-project-final.onrender.com/extract-user-data/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.user_data) {
        const userData: UserData = data.user_data;
        
        setProfileInfo({
          name: userData.full_name || 'Not provided',
          username: userData.username || 'Not set',
          email: userData.email || 'Not provided',
          password: "••••••••", // Always masked for security
        });
      } else {
        throw new Error(data.message || 'Failed to load user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load user data');
      
      // Set fallback values on error
      setProfileInfo({
        name: "Unable to load",
        username: "Unable to load",
        email: "Unable to load",
        password: "••••••••",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Retry function for manual refresh
  const handleRetry = () => {
    fetchUserData();
  };

  return (
    <main className="flex-1 bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <BasicInfoCard
        profileInfo={profileInfo}
        setDisplay={setDisplay}
        isLoading={isLoading}
        error={error}
      />
      
      {error && (
        <div className="max-w-[1200px] mx-auto px-10 max-md:px-5 max-sm:px-[15px]">
          <button
            onClick={handleRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Retry Loading Data
          </button>
        </div>
      )}
    </main>
  );
};

export default Setting;