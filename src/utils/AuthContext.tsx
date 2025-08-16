import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone_number?: string;
  website_name?: string;
  linkedin_url?: string;
  email_verified: boolean;
  paid: boolean;
  iswebinarformfilled: boolean;
  is_staff: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokens: { access: string; refresh: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Get user details from backend
  const fetchUserDetails = async (accessToken: string): Promise<User | null> => {
    try {
      const response = await fetch(
        "https://intern-project-final-1.onrender.com/extract-user-data/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        return userData.user_data;
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  // Login function
  const login = async (tokens: { access: string; refresh: string }) => {
    try {
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      const userData = await fetchUserDetails(tokens.access);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error during login:", error);
      logout();
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const userData = await fetchUserDetails(accessToken);
        if (userData) {
          setUser(userData);
        } else {
          // Token might be expired, try refresh
          await tryRefreshToken();
        }
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Try to refresh token
  const tryRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await fetch("/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);

        const userData = await fetchUserDetails(data.access);
        if (userData) {
          setUser(userData);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
