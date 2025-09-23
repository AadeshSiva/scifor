import React, { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";
import ForgotPasswordPopups from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../settings/Context/UserContext";
interface ValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  form?: string;
}
interface ApiResponse {
  message?: string;
  error?: string;
}
interface PasswordProps {
  setDisplay?: (display: string) => void;
}
export const PasswordChangeForm: React.FC<PasswordProps> = ({ setDisplay }) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState<boolean>(false);
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters long";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setErrors({});
    setSuccessMessage("");
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setErrors({ form: "Authentication required. Please login again." });
        setLoading(false);
        return;
      }
      const response = await fetch("https://api.prspera.com/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          if (data.error && data.error.includes("Current password")) {
            setErrors({ currentPassword: data.error });
          } else {
            setErrors({ form: "Session expired. Please login again." });
          }
        } else if (response.status === 400) {
          setErrors({ form: data.error || "Invalid request" });
        } else {
          setErrors({ form: data.error || "Failed to change password" });
        }
        return;
      }
      setSuccessMessage(data.message || "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Password change error:", error);
      setErrors({ form: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = (): void => {
    setShowForgotPasswordPopup(true);
  };
  const handleForgotPasswordClose = (): void => {
    setShowForgotPasswordPopup(false);
  };
  const handleForgotPasswordSuccess = (): void => {
    setSuccessMessage("Password has been reset successfully! You can now use your new password.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };
  const navigate=useNavigate();
  const ctx=useContext(UserContext)
  const handleBack = (): void => {
    navigate(`${ctx.url}`)
    ctx.setEnabledSetting(true)
  };
  const EyeIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
  const EyeOffIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => (): void => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };
  const handleInputChange =
    (field: "current" | "new" | "confirm") =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      switch (field) {
        case "current":
          setCurrentPassword(value);
          break;
        case "new":
          setNewPassword(value);
          break;
        case "confirm":
          setConfirmPassword(value);
          break;
      }
    };
  return (
    <div className="flex w-full flex-col font-normal mt-24 max-md:max-w-full max-md:mt-10 px-16 align-items">
      <BackButton onClick={handleBack} />

      <h1 className="text-[#0A2533] text-3xl leading-tight mt-12">Change Password</h1>

      <p className="text-[#555555] text-lg leading-normal mt-3.5 max-md:max-w-full">
        Create a new password that is at least 6 characters long.
      </p>
      {successMessage && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mt-6">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </div>
        </div>
      )}
      {errors.form && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.form}
          </div>
        </div>
      )}
      <div className="mt-7">
        <label htmlFor="current-password" className="text-[#0A2533] text-lg leading-normal">
          Type your current password <span className="text-red-500">*</span>
        </label>

        <div
          className={`border flex items-center gap-5 mt-4 px-4 py-2.5 rounded-lg transition-colors ${
            errors.currentPassword
              ? "border-red-500"
              : "border-[rgba(0,0,0,0.3)] focus-within:border-[#0A2533]"
          }`}
        >
          <input
            id="current-password"
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={handleInputChange("current")}
            placeholder="Enter your current password"
            className="text-[#4A4A4A] bg-transparent border-none outline-none w-full"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility("current")}
            className="focus:outline-none text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            {showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
        )}
      </div>
      <div className="self-stretch flex gap-5 flex-wrap justify-between mt-6">
        <label htmlFor="new-password" className="text-[#0A2533] text-lg leading-normal">
          Type your new password <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-black text-sm hover:underline"
          disabled={loading}
        >
          Forgot Password
        </button>
      </div>
      <div
        className={`border flex items-center gap-5 mt-4 px-4 py-2.5 rounded-lg transition-colors ${
          errors.newPassword
            ? "border-red-500"
            : "border-[rgba(0,0,0,0.3)] focus-within:border-[#0A2533]"
        }`}
      >
        <input
          id="new-password"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={handleInputChange("new")}
          placeholder="New password"
          className="text-[#4A4A4A] bg-transparent border-none outline-none w-full"
          disabled={loading}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility("new")}
          className="focus:outline-none text-gray-500 hover:text-gray-700"
          disabled={loading}
        >
          {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
      <div className="mt-6">
        <label htmlFor="confirm-password" className="text-[#0A2533] text-lg leading-normal">
          Retype your new password <span className="text-red-500">*</span>
        </label>
        <div
          className={`border flex items-center gap-5 mt-4 px-4 py-2.5 rounded-lg transition-colors ${
            errors.confirmPassword
              ? "border-red-500"
              : "border-[rgba(0,0,0,0.3)] focus-within:border-[#0A2533]"
          }`}
        >
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleInputChange("confirm")}
            placeholder="Retype new password"
            className="text-[#4A4A4A] bg-transparent border-none outline-none w-full"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility("confirm")}
            className="focus:outline-none text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`text-base text-white font-medium bg-black mt-20 px-11 py-5 rounded-xl max-md:mt-10 max-md:px-5 cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-xs`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </div>
        ) : (
          "Save Password"
        )}
      </button>
      <ForgotPasswordPopups
        isOpen={showForgotPasswordPopup}
        onClose={handleForgotPasswordClose}
        onSuccess={handleForgotPasswordSuccess}
      />
    </div>
  );
};
