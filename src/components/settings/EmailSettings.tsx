import React, { useState, useEffect } from "react";
import { BackIcon } from "../ui/icons";

interface EmailSettingsProps {
  setDisplay?: (display: string) => void;
}

interface EmailData {
  email: string;
  verified: boolean;
}

interface UserData {
  user_data: {
    email: string;
  };
}

interface PasswordAction {
  type: "remove" | "makePrimary";
  email: string;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ setDisplay }) => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [primaryEmail, setPrimaryEmail] = useState<string>("");
  const [showAddEmailModal, setShowAddEmailModal] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [passwordAction, setPasswordAction] = useState<PasswordAction | null>(null);

  // Get auth token from localStorage or wherever you store it
  const getAuthToken = (): string => {
    return localStorage.getItem("access_token") || "";
  };

  const onBack = () => {
    setDisplay("setting");
  };

  // API call helper
  const apiCall = async (url: string, method: string = "GET", data?: any): Promise<any> => {
    const token = getAuthToken();
    const response = await fetch("https://internship-pro.onrender.com" + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || "API call failed");
    }

    return response.json();
  };

  // Load emails on component mount
  useEffect(() => {
    loadEmails();
    loadUserProfile();
  }, []);

  const loadEmails = async (): Promise<void> => {
    try {
      const data: EmailData[] = await apiCall("/list-company-emails/");
      setEmails(data);
    } catch (err) {
      console.error("Failed to load emails:", err);
    }
  };

  const loadUserProfile = async (): Promise<void> => {
    try {
      const data: UserData = await apiCall("/extract-user-data/");
      setPrimaryEmail(data.user_data.email);
    } catch (err) {
      console.error("Failed to load user profile:", err);
    }
  };

  const handleAddEmail = async (): Promise<void> => {
    if (!newEmail) {
      setError("Please enter an email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiCall("/send-email-otp/", "POST", { email: newEmail });
      setSuccess("OTP sent to your email");
      setShowAddEmailModal(false);
      setShowOtpModal(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (): Promise<void> => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiCall("/verify-email-otp/", "POST", {
        email: newEmail,
        otp: otp,
      });
      setSuccess("Email added successfully!");
      setShowOtpModal(false);
      setNewEmail("");
      setOtp("");
      loadEmails(); // Refresh the email list
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordAction = async (): Promise<void> => {
    if (!password || !passwordAction) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (passwordAction.type === "remove") {
        await apiCall("/remove-email/", "POST", {
          email: passwordAction.email,
          password: password,
        });
        setSuccess("Email removed successfully!");
      } else if (passwordAction.type === "makePrimary") {
        await apiCall("/set-primary-email/", "POST", {
          email: passwordAction.email,
          password: password,
        });
        setSuccess("Primary email updated successfully!");
        setPrimaryEmail(passwordAction.email);
      }

      setShowPasswordModal(false);
      setPassword("");
      setPasswordAction(null);
      loadEmails(); // Refresh the email list
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openPasswordModal = (type: "remove" | "makePrimary", email: string): void => {
    setPasswordAction({ type, email });
    setShowPasswordModal(true);
    setError("");
  };

  const closeAllModals = (): void => {
    setShowAddEmailModal(false);
    setShowOtpModal(false);
    setShowPasswordModal(false);
    setNewEmail("");
    setOtp("");
    setPassword("");
    setError("");
    setSuccess("");
    setPasswordAction(null);
  };

  const handleResendCode = async (): Promise<void> => {
    if (!newEmail) return;

    setLoading(true);
    setError("");

    try {
      await apiCall("/send-email-otp/", "POST", { email: newEmail });
      setSuccess("OTP resent to your email");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = (): void => {
    setShowOtpModal(false);
    setShowAddEmailModal(true);
    setOtp("");
    setError("");
  };

  return (
    <section className="p-10 px-16">
      <div className="flex items-center gap-4 cursor-pointer mb-12" onClick={onBack}>
        <BackIcon />
        <div className="text-gray-600 text-2xl">Back</div>
      </div>

      <div>
        <h1 className="text-4xl text-gray-800 mb-10">Company Email ID</h1>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Primary Email */}
        <div className="mb-10">
          <h2 className="text-xl text-gray-800 mb-2">Primary Email</h2>
          <p className="text-base text-black">{primaryEmail}</p>
        </div>

        {/* Secondary Emails */}
        {emails.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl text-gray-800 mb-4">Secondary Email</h2>
            {emails.map(
              (emailData, index) =>
                emailData.email !== primaryEmail && (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{emailData.email}</span>
                    </div>
                    <div className="flex gap-8">
                      <button
                        onClick={() => openPasswordModal("makePrimary", emailData.email)}
                        className="text-black text-base underline hover:no-underline cursor-pointer"
                      >
                        Make Primary
                      </button>
                      <button
                        onClick={() => openPasswordModal("remove", emailData.email)}
                        className="text-black text-base underline hover:no-underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        <div className="flex gap-12 max-sm:flex-col max-sm:gap-4">
          <button
            className="text-white text-base cursor-pointer bg-black px-16 py-5 rounded-xl border-none max-sm:w-full hover:bg-gray-800"
            onClick={() => setShowAddEmailModal(true)}
          >
            Add Email
          </button>
          <button
            className="text-black border text-base cursor-pointer px-16 py-5 rounded-xl border-solid border-black max-sm:w-full hover:bg-gray-50"
            onClick={onBack}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Add Email Modal */}
      {showAddEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-96 mx-4">
            <h3 className="text-xl font-medium mb-6 text-center">Enter New Email ID</h3>

            <input
              type="email"
              placeholder="Enter your new email id"
              value={newEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />

            <p className="text-sm text-gray-600 mb-6 text-center">
              We'll send a verification code to this email id
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAddEmail}
                disabled={loading}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Next"}
              </button>
              <button
                onClick={closeAllModals}
                disabled={loading}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-96 mx-4">
            <h3 className="text-xl font-medium mb-2 text-center">Enter the 6-digit code</h3>
            <p className="text-sm text-gray-600 mb-1 text-center">
              We've sent a verification code to {newEmail.replace(/(.{3}).*(@.*)/, "$1*****$2")}
            </p>
            <button
              onClick={handleChangeEmail}
              className="text-blue-500 text-sm mb-6 block mx-auto hover:underline"
            >
              Change Email
            </button>

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-center text-2xl tracking-widest"
              maxLength={6}
              disabled={loading}
            />

            <div className="text-center mb-6">
              <button
                onClick={handleResendCode}
                disabled={loading}
                className="text-blue-500 text-sm hover:underline disabled:opacity-50"
              >
                {loading ? "Resending..." : "Resend Code"}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-4 mb-4">
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                onClick={closeAllModals}
                disabled={loading}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Didn't receive the code? Check your spam folder or try resending.
            </p>
          </div>
        </div>
      )}

      {/* Password Confirmation Modal */}
      {showPasswordModal && passwordAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">
              {passwordAction.type === "remove" ? "Remove Email" : "Make Primary Email"}
            </h3>
            <p className="text-gray-600 mb-4">
              {passwordAction.type === "remove"
                ? `Are you sure you want to remove ${passwordAction.email}?`
                : `Make ${passwordAction.email} your primary email?`}
            </p>
            <p className="text-gray-600 mb-4">Enter your password to confirm:</p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />

            <div className="flex gap-4">
              <button
                onClick={handlePasswordAction}
                disabled={loading}
                className={`flex-1 text-white py-3 rounded disabled:opacity-50 ${
                  passwordAction.type === "remove"
                    ? "bg-black hover:bg-black"
                    : "bg-black hover:bg-black"
                }`}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
              <button
                onClick={closeAllModals}
                disabled={loading}
                className="flex-1 border border-gray-300 py-3 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmailSettings;
