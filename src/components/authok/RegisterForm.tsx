import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import { PasswordInput } from "@/components/authok/PasswordInput";
import PhoneInput from "@/components/authok/PhoneInput";

interface FormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
  website_name: string;
}
interface FormErrors {
  full_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone_number?: string;
  website_name?: string;
  general?: string;
  otp?: string;
}
interface FieldTouched {
  full_name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  phone_number: boolean;
  website_name: boolean;
}
interface CheckEmailResponse {
  user_exists: boolean;
  message: string;
  paid: boolean;
}
interface RegisterResponse {
  status: string;
  message: string;
  tokens?: {
    access: string;
    refresh: string;
  };
}
interface OtpResponse {
  status: string;
  message: string;
}
interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: (user?: any) => void;
  onClose?: () => void;
}
export function RegisterForm({
  onSwitchToLogin,
  onSuccess,
  onClose,
}: {
  onSwitchToLogin: () => void;
  onSuccess?: (user?: any) => void;
  onClose?: () => void;
}): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    website_name: "",
  });
  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({
    full_name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone_number: false,
    website_name: false,
  });
  const location = useLocation();
  const getPlan = () => {
    const params = new URLSearchParams(location.search);
    return params.get("plan") || "guest";
  };
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(300);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const API_BASE_URL = "https://api.prspera.com";
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (showOtpModal && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [showOtpModal, timer]);
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const isValidWebsiteUrl = (url: string): boolean => {
    try {
      const urlToTest =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      const urlObj = new URL(urlToTest);
      return !!urlObj.hostname && urlObj.hostname.includes(".");
    } catch {
      return false;
    }
  };
  const validateField = (
    name: keyof FormData,
    value: string,
  ): string | undefined => {
    switch (name) {
      case "full_name":
        return !value.trim() ? "Full name is required" : undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
          return "Password must contain at least 1 letter, 1 number, and 1 special character";
        }
        return undefined;
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (formData.password !== value) return "Passwords do not match";
        return undefined;
      case "phone_number":
        return !value ? "Phone number is required" : undefined;
      case "website_name":
        if (!value.trim()) return "Company website is required";
        if (!isValidWebsiteUrl(value.trim())) {
          return "Please enter a valid website URL (ending with .com, .org, .io, .co, etc.)";
        }
        return undefined;
      default:
        return undefined;
    }
  };
  const handleFieldBlur = (fieldName: keyof FormData): void => {
    setFieldTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
    const fieldValue = formData[fieldName];
    let error;
    if (fieldName === "confirmPassword") {
      if (!fieldValue) {
        error = "Please confirm your password";
      } else if (formData.password !== fieldValue) {
        error = "Passwords do not match";
      }
    } else {
      error = validateField(fieldName, fieldValue);
    }
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
    if (
      fieldName === "password" &&
      fieldTouched.confirmPassword &&
      formData.confirmPassword
    ) {
      const confirmPasswordError =
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : undefined;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (
      fieldName === "password" &&
      fieldTouched.confirmPassword &&
      formData.confirmPassword
    ) {
      const confirmPasswordError =
        value !== formData.confirmPassword
          ? "Passwords do not match"
          : undefined;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
    }
    if (fieldName === "confirmPassword" && fieldTouched.confirmPassword) {
      const confirmPasswordError =
        formData.password !== value ? "Passwords do not match" : undefined;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
    }
  };
  const handleOtpChange = (index: number, value: string): void => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      if (errors.otp) {
        setErrors((prev) => ({ ...prev, otp: undefined }));
      }
    }
  };
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    return newErrors;
  };
  const getCsrfToken = (): string => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return value;
      }
    }
    return "";
  };
  const makeApiCall = async (endpoint: string, payload: any): Promise<any> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
        );
      }
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "The request took too long. Our servers might be waking up — please try again.",
        );
      }
      throw error;
    }
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setFieldTouched({
      full_name: true,
      email: true,
      password: true,
      confirmPassword: true,
      phone_number: true,
      website_name: true,
    });
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const checkData: CheckEmailResponse = await makeApiCall(
        "/check_email_status/",
        {
          email: formData.email,
        },
      );
      if (checkData.user_exists) {
        setErrors({
          email: `${
            checkData.paid
              ? "Email already registered as a Member in Prspera. Please log in."
              : "Email already registered as a Guest in Prespera. Please log in."
          }`,
        });
        setLoading(false);
        return;
      }
      await sendOtp();
    } catch (error) {
      console.error("Pre-registration error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error. Please try again.";
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  const sendOtp = async (): Promise<void> => {
    try {
      const otpData: OtpResponse = await makeApiCall("/send_email_otp/", {
        email: formData.email,
      });
      if (otpData.status !== "success") {
        throw new Error(otpData.message || "Failed to send OTP");
      }
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(true);
      setShowOtpModal(true);
      setTimer(300);
      setOtp(["", "", "", "", "", ""]);
    }
  };
  const handleOtpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (!otpCode || otpCode.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit OTP" });
      return;
    }
    setOtpLoading(true);
    setErrors({});
    try {
      const verifyData: OtpResponse = await makeApiCall("/verify_email_otp/", {
        email: formData.email,
        otp: otpCode,
      });
      if (verifyData.status !== "success") {
        setErrors({ otp: verifyData.message });
        return;
      }
      const plan = getPlan();
      let came_plan = false;
      if (plan === "guest") {
        came_plan = false;
      } else if (plan === "paid" || plan === "member") {
        came_plan = true;
      }
      const registerPayload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        website_name: formData.website_name,
        no_linkedin: true,
        came_from_plan: came_plan,
      };
      const registerData: RegisterResponse = await makeApiCall(
        "/register/",
        registerPayload,
      );
      if (registerData.status === "success") {
        if (registerData.tokens) {
          await login(registerData.tokens);
        }
        const plan = getPlan();
        if (plan === "guest") {
          navigate("/confirmation-guest");
          setLoading(true);
        } else if (plan === "paid" || plan === "member") {
          navigate("/payment");
          setLoading(true);
        }
      } else {
        setErrors({ otp: registerData.message });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to complete registration. Please try again.";
      setErrors({ otp: errorMessage });
    } finally {
      setOtpLoading(false);
    }
  };
  const resendOtp = async (): Promise<void> => {
    setOtpLoading(true);
    try {
      await sendOtp();
      console.log("OTP resent successfully!");
    } catch (error) {
      setErrors({ otp: "Failed to resend OTP" });
    } finally {
      setOtpLoading(false);
    }
  };
  const handleCloseClick = (): void => {
    navigate(-1);
  };
  const handlePhoneChange = (value: string): void => {
    setFormData((prev) => ({ ...prev, phone_number: value }));
    if (errors.phone_number) {
      setErrors((prev) => ({ ...prev, phone_number: undefined }));
    }
  };
  const handlePhoneBlur = (): void => {
    setFieldTouched((prev) => ({ ...prev, phone_number: true }));
    const error = validateField("phone_number", formData.phone_number);
    setErrors((prev) => ({
      ...prev,
      phone_number: error,
    }));
  };
  const handleHiddenValue = () => {
    setShowOtpModal(false);
  };
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
    }).catch(() => {});
  }, []);
  return (
    <>
      {!showOtpModal ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseClick}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              disabled={loading}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="text-base text-black flex items-center gap-1">
              <span>Full Name</span>
              <span className="text-black ml-1">*</span>
            </div>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              className={`border text-sm w-full px-4 py-2.5 rounded-lg border-solid transition-colors focus:outline-none ${
                errors.full_name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-400 focus:border-black"
              }`}
              value={formData.full_name}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur("full_name")}
              disabled={loading}
              required
            />
            {errors.full_name && fieldTouched.full_name && (
              <span className="text-red-500 text-sm">{errors.full_name}</span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-base text-black flex items-center gap-1">
              <span>Company Email ID</span>
              <span className="text-black ml-1">*</span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your company email ID"
              className={`border text-sm w-full px-4 py-2.5 rounded-lg border-solid transition-colors focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-400 focus:border-black"
              }`}
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur("email")}
              disabled={loading}
              required
            />
            {errors.email && fieldTouched.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex gap-5 max-sm:flex-col max-sm:gap-4">
            <div className="flex-1">
              <PasswordInput
                label="Password"
                required
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur("password")}
                error={
                  fieldTouched.password && errors.password
                    ? errors.password
                    : undefined
                }
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <PasswordInput
                label="Confirm Password"
                required
                placeholder="Re - enter password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur("confirmPassword")}
                error={
                  fieldTouched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
                disabled={loading}
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic -mt-3">
            Minimum 6 characters | At least 1 special character | At least 1
            letter and 1 number
          </div>
          <div className="flex flex-col gap-3">
            <PhoneInput
              value={formData.phone_number}
              onChange={handlePhoneChange}
              error={
                fieldTouched.phone_number ? errors.phone_number : undefined
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-base text-black flex items-center gap-1">
              <span>Company Website</span>
              <span className="text-black ml-1">*</span>
            </div>
            <input
              type="text"
              name="website_name"
              placeholder="Enter your Company website URL (e.g., example.com)"
              className={`border text-sm w-full px-4 py-2.5 rounded-lg border-solid transition-colors focus:outline-none ${
                errors.website_name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-400 focus:border-black"
              }`}
              value={formData.website_name}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur("website_name")}
              disabled={loading}
              required
            />
            {errors.website_name && fieldTouched.website_name && (
              <span className="text-red-500 text-sm">
                {errors.website_name}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full text-white text-base cursor-pointer bg-black mt-4 p-4 rounded-lg border-none hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
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
                Sending OTP...
              </>
            ) : (
              "Register"
            )}
          </button>
          <div className="text-center text-lg italic text-gray-500 mt-6">
            <span>Already have an account? </span>
            <span
              className="text-black cursor-pointer hover:underline"
              onClick={onSwitchToLogin}
            >
              Login
            </span>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
            <button className="w-full text-right" onClick={handleHiddenValue}>
              X
            </button>
            <h2 className="text-center text-3xl font-bold mb-6">
              OTP Verification
            </h2>
            <p className="text-center mb-4 text-lg">
              An OTP has been sent to your provided email address.
            </p>
            <p className="text-center mb-8 text-gray-600">
              Please check your inbox (and spam/junk folder just in case)
              <br />
              and enter the code below to complete your registration.
            </p>
            {errors.otp && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                {errors.otp}
              </div>
            )}
            <form onSubmit={handleOtpSubmit}>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-xl font-semibold focus:border-black focus:outline-none"
                    disabled={otpLoading}
                  />
                ))}
              </div>
              <div className="text-center mb-6">
                <span className="text-gray-600">Time remaining: </span>
                <span
                  className={`font-semibold ${timer <= 60 ? "text-red-500" : "text-black"}`}
                >
                  {formatTime(timer)}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={otpLoading || timer === 0}
              >
                {otpLoading ? (
                  <>
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
                    Completing Registration...
                  </>
                ) : (
                  "Verify OTP & Register"
                )}
              </button>
              <div className="text-center mt-4">
                {timer === 0 ? (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-black hover:underline font-semibold disabled:opacity-50"
                    disabled={otpLoading}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-500">
                    Didn't receive the code? Wait {formatTime(timer)} to resend
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
