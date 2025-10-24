import { useAuth } from "@/utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting: React.FC = () => {
  const [mobileView] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleProfileView = () => {
    navigate("/profileView");
  };
  const handleUsernameView = () => {
    navigate("/usernameView");
  };
  const handleEmailIdView = () => {
    navigate("/emailView");
  };
  const handlePasswordView = () => {
    navigate("/passwordView");
  };
  const handleHistoryView = () => {
    navigate("/historyView");
  };
  // Settings menu items
  const menuItems = [
    {
      label: "Profile Information",
      value: user?.full_name || "Not set",
      onClick: handleProfileView,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: "Change Username",
      value: user?.username || "Not set",
      onClick: handleUsernameView,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: "Change Email ID",
      value: user?.email || "Not set",
      onClick: handleEmailIdView,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Change Password",
      value: "••••••",
      onClick: handlePasswordView,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      label: "Purchase History",
      value: "",
      onClick: handleHistoryView,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {!mobileView && (
        <div className="flex flex-col pt-16 w-full min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Basic Information Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Section Header */}
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Update your personal information and account settings
                  </p>
                </div>
                {/* Settings Menu */}
                <div className="divide-y divide-gray-200">
                  {menuItems.map((item, index) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200 group
                        ${index === 0 ? 'rounded-t-lg' : ''} 
                        ${index === menuItems.length - 1 ? 'rounded-b-lg' : ''}`}
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {item.label}
                          </h3>
                          {item.value && (
                            <p className="text-gray-600 text-sm truncate mt-1">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>              
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                        {item.value && item.label !== "Purchase History" && (
                          <span className="text-gray-500 text-sm hidden sm:block">
                            {item.value}
                          </span>
                        )}
                        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Additional Info */}
              <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-blue-800 font-medium">Need help?</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      If you need assistance with your account settings, please contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;