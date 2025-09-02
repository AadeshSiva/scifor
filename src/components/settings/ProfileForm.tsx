import React, { useState, useEffect } from "react";

interface ProfileFormProps {
  onSubmit?: (data: ProfileFormData) => void;
  onCancel?: () => void;
  setDisplay?: (display: string) => void; // Add this line
}

interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
  companyName: string;
  companyWebsite: string;
  country: string;
}

interface PasswordConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const PasswordConfirmationModal: React.FC<PasswordConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  error,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onConfirm(password);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold mb-4">Confirm Password</h2>
        <p className="text-gray-600 mb-6">
          Please enter your current password to save changes to your profile.
        </p>

        <div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Current Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 border rounded-lg px-4 border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your current password"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !password.trim()}
              className="flex-1 h-12 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Confirming..." : "Confirm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 h-12 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  onCancel,
  setDisplay, // Add this parameter
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    phoneNumber: "",
    companyName: "",
    companyWebsite: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<ProfileFormData | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const getAuthToken = () => {
    // Get token from localStorage (adjust based on your token storage method)
    const token = localStorage.getItem("access_token");
    if (token) {
      return token;
    }
    return null;
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://31.97.117.28:8001/extract-user-data/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (data.status === "success" && data.user_data) {
        setFormData({
          fullName: data.user_data.full_name || "",
          phoneNumber: data.user_data.phone_number || "",
          companyName: data.user_data.website_name || "", // Assuming website_name is company name
          companyWebsite: data.user_data.website_name || "",
          country: data.user_data.country || "", // Add country field to your backend if not present
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setNotification({
        type: "error",
        message: "Failed to load profile data. Please refresh the page.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the form data and open password confirmation modal
    setPendingFormData(formData);
    setIsPasswordModalOpen(true);
    setPasswordError(null);
  };

  const handlePasswordConfirm = async (password: string) => {
    if (!pendingFormData) return;

    setIsPasswordLoading(true);
    setPasswordError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Prepare data for backend
      const updateData = {
        full_name: pendingFormData.fullName,
        phone_number: pendingFormData.phoneNumber,
        website_name: pendingFormData.companyName,
        // Add other fields as needed based on your backend model
        password: password, // Include password for verification
      };

      const response = await fetch("http://31.97.117.28:8001/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid password. Please try again.");
        }
        throw new Error(data.message || "Failed to update profile");
      }

      // Success
      setNotification({
        type: "success",
        message: "Profile updated successfully!",
      });

      setIsPasswordModalOpen(false);
      setPendingFormData(null);

      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(pendingFormData);
      }

      // Auto-hide success notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setPasswordError(
        error instanceof Error ? error.message : "Failed to update profile. Please try again."
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setPendingFormData(null);
    setPasswordError(null);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setDisplay("setting");
  };

  const handleConnectLinkedIn = () => {
    // LinkedIn connection logic would go here
    console.log("Connecting to LinkedIn...");
  };

  const handleBackClick = () => {
    setDisplay("setting"); // Go back to settings
  };

  if (isLoading) {
    return (
      <div className="flex-1 pt-10 px-10 max-md:p-5 max-sm:order-1 overflow-auto w-full pb-32">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading profile data...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 pt-10 px-10 max-md:p-5 max-sm:order-1 overflow-auto w-full pb-32">
        <div
          className="flex items-center gap-4 text-gray-600 text-2xl cursor-pointer mb-12"
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
              <path
                d="M10.3636 12.4999L18 20.4999L15.8182 22.7856L6 12.4999L15.8182 2.21421L18 4.49991L10.3636 12.4999Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span>Back</span>
        </div>

        <h1 className="text-3xl mb-10">Profile Information</h1>

        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-red-100 border border-red-300 text-red-700"
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="max-w-4xl">
          <div className="mb-10">
            <label htmlFor="fullName" className="text-base font-semibold mb-3 block">
              Full Name*
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Example User"
              className="w-full h-16 border text-base px-4 py-0 rounded-xl border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </div>

          <div className="mb-10">
            <label htmlFor="phoneNumber" className="text-base font-semibold mb-3 block">
              Phone No*
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full h-16 border text-base px-4 py-0 rounded-xl border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              required
            />
          </div>

          <div className="mb-10">
            <label htmlFor="companyName" className="text-base font-semibold mb-3 block">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="Enter Company name"
              className="w-full h-16 border text-base px-4 py-0 rounded-xl border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </div>

          <div className="mb-10">
            <label htmlFor="companyWebsite" className="text-base font-semibold mb-3 block">
              Company Website
            </label>
            <input
              id="companyWebsite"
              type="url"
              placeholder="https://example.com"
              className="w-full h-16 border text-base px-4 py-0 rounded-xl border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.companyWebsite}
              onChange={(e) => handleChange("companyWebsite", e.target.value)}
            />
          </div>

          <div className="mb-10">
            <label htmlFor="country" className="text-base font-semibold mb-3 block">
              Country*
            </label>
            <select
              id="country"
              className="w-full h-16 border text-base px-4 py-0 rounded-xl border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IN">India</option>
              <option value="CN">China</option>
              <option value="JP">Japan</option>
              <option value="BR">Brazil</option>
            </select>
          </div>

          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <div className="text-base font-semibold mb-3">LinkedIn Profile</div>
              <div className="text-base text-gray-700 leading-normal">
                Connect your LinkedIn profile to verify your professional identity and enhance your
                credibility.
              </div>
            </div>
            <button
              type="button"
              className="text-white text-sm cursor-pointer bg-black px-5 py-3 rounded border-2 border-blue-600 hover:bg-gray-800"
              onClick={handleConnectLinkedIn}
            >
              Connect LinkedIn
            </button>
          </div>

          <div className="flex gap-12 max-sm:flex-col max-sm:gap-5">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-48 h-16 text-base cursor-pointer text-white bg-black rounded-xl border-none hover:bg-gray-800 max-sm:w-full"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="w-48 h-16 text-base cursor-pointer text-black border bg-white rounded-xl border-black hover:bg-gray-50 max-sm:w-full"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <PasswordConfirmationModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        onConfirm={handlePasswordConfirm}
        isLoading={isPasswordLoading}
        error={passwordError}
      />
    </>
  );
};

export default ProfileForm;
