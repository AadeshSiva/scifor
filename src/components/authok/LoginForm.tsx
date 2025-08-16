import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
  X,
  Mail,
  Lock,
} from "lucide-react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

// Forgot Password Modal Component - Updated to match change username flow
const ForgotPasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = "https://intern-project-final-1.onrender.com";

  const resetForm = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const sendOTP = async () => {
    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password-send-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP sent to your email");
        setTimeout(() => {
          setStep(2);
          setSuccessMessage("");
        }, 1500);
      } else {
        setErrorMessage(data.error || "Failed to send OTP");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp.trim()) {
      setErrorMessage("OTP is required");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP verified successfully");
        setTimeout(() => {
          setStep(3);
          setSuccessMessage("");
        }, 1500);
      } else {
        setErrorMessage(data.error || "Invalid OTP");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
          handleClose();
          onSuccess();
        }, 2000);
      } else {
        setErrorMessage(data.error || "Failed to reset password");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isLoading}
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Messages */}
          {successMessage && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
              <CheckCircle size={20} />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
              <div>
                <label htmlFor="forgotEmail" className="block text-gray-800 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    id="forgotEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">
                We've sent a 6-digit code to <strong>{email}</strong>. Enter it below.
              </p>
              <div>
                <label htmlFor="otp" className="block text-gray-800 font-medium mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <button
                onClick={sendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">Create a new password for your account.</p>

              <div>
                <label htmlFor="newPassword" className="block text-gray-800 font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-800 font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (step === 1) sendOTP();
              else if (step === 2) verifyOTP();
              else if (step === 3) resetPassword();
            }}
            disabled={isLoading}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 min-w-24 justify-center"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                {step === 1 && "Send OTP"}
                {step === 2 && "Verify"}
                {step === 3 && "Reset Password"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const getAccessToken = () =>
  sessionStorage.getItem("access_token") || localStorage.getItem("access_token");

const authHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function getUserStatus() {
  const token = getAccessToken();
  if (!token) return { authenticated: false, isMember: false };

  try {
    const res = await fetch("https://intern-project-final-1.onrender.com/extract-user-data/", {
      headers: { ...authHeaders() },
    });

    if (!res.ok) {
      return { authenticated: false, isMember: false };
    }

    const data = await res.json();
    console.log(data);

    return {
      authenticated: true,
      isMember: data?.user_data.paid === true,
    };
  } catch (error) {
    console.error("Error fetching user status:", error);
    return { authenticated: false, isMember: false };
  }
}

// Main Login Form Component
export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLoginRedirect = async () => {
    const plan = location.pathname.includes("member") ? "member" : "guest";

    const status = await getUserStatus();
    if (status.authenticated) {
      if (status.isMember) {
        alert("You are already registered as a member.");
        navigate("/");
      } else {
        if (plan === "guest") {
          alert("You are already registered as a guest.");
          navigate("/");
        } else if (plan === "member") {
          navigate("/payment");
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://intern-project-final-1.onrender.com/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
          remember_me: rememberMe,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Use the auth context login function
        await login(data.tokens, rememberMe);

        // Store remember me preference if needed
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userIdentifier", formData.identifier);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("userIdentifier");
        }

        console.log("Login successful:", data.message);

        await handleLoginRedirect();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCsrfToken = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return value;
      }
    }
    return "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    onSwitchToRegister();
  };

  const handleForgotPasswordSuccess = () => {
    setError("");
    // Optionally show a success message
    console.log("Password reset completed successfully!");
  };

  // Load remember me preference on component mount
  React.useEffect(() => {
    const rememberedUser = localStorage.getItem("userIdentifier");
    const shouldRemember = localStorage.getItem("rememberMe") === "true";

    if (shouldRemember && rememberedUser) {
      setFormData((prev) => ({
        ...prev,
        identifier: rememberedUser,
      }));
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="text-base text-black flex items-center gap-1">
            <span>Email or Username</span>
          </div>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            placeholder="Enter your email or username"
            className="border text-sm w-full px-4 py-2.5 rounded-lg border-solid border-gray-400 focus:border-black focus:outline-none transition-colors"
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-base text-black flex items-center gap-1">
            <span>Password</span>
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
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              disabled={loading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
              disabled={loading}
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-black hover:text-gray-700 hover:underline transition-colors"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full text-white text-base cursor-pointer bg-black mt-4 p-4 rounded-lg border-none hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-3" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-center text-lg italic text-gray-500 mt-6">
          <span>Don't have an account? </span>
          <span
            className="text-black cursor-pointer hover:underline transition-colors"
            onClick={handleRegisterClick}
          >
            Register
          </span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSuccess={handleForgotPasswordSuccess}
      />
    </>
  );
}
