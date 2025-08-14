import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext"; // Adjust path as needed

// Header Component
const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Create a spacer div to push content down
  useEffect(() => {
    const navbar = document.querySelector("[data-navbar]") as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, [isLoading]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const handleSettings = () => {
    setShowDropdown(false);
    navigate("/chat", { state: { display: "setting" } });
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("");
  };

  // Helper function to check if current path matches nav item
  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  // Helper function to get nav link classes
  const getNavLinkClasses = (path: string) => {
    const baseClasses =
      "text-black text-xl cursor-pointer hover:text-gray-600 transition-colors font-linear font-light";
    const activeClasses = isActivePage(path)
      ? "underline decoration-2 underline-offset-4"
      : "";
    return `${baseClasses} ${activeClasses}`;
  };

  // Helper function to truncate email if too long
  const truncateEmail = (email: string, maxLength: number = 25) => {
    if (email.length <= maxLength) return email;
    return email.substring(0, maxLength) + "...";
  };

  if (isLoading) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 z-10 w-full bg-white"
          data-navbar
        >
          <header className="flex justify-between items-center shadow-[0_7px_5.4px_0_rgba(0,0,0,0.25)] bg-white px-[49px] py-6 max-sm:p-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
              alt="Company Logo"
              className="w-[195px] h-[34px] cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <div className="w-[194px] h-12 bg-gray-200 animate-pulse rounded"></div>
          </header>
        </div>
        {/* Spacer div to prevent content from going under navbar */}
        <div style={{ height: "86px" }}></div>
      </>
    );
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white"
        data-navbar
      >
        <header className="flex justify-between items-center shadow-[0_7px_5.4px_0_rgba(0,0,0,0.25)] bg-white px-[49px] py-5 max-sm:p-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
            alt="Company Logo"
            className="w-[195px] h-[34px] cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <nav className="flex gap-20 max-md:gap-10 max-sm:hidden">
            <a
              onClick={() => {
                navigate("/coi");
              }}
              className={getNavLinkClasses("/coi")}
            >
              COI
            </a>
            {/* <a
              onClick={() => {
                navigate("/landing");
              }}
              className={getNavLinkClasses("/landing")}
            >
              WINNING
            </a> */}
            <a
              onClick={() => {
                navigate("/pricing-plan");
              }}
              className={getNavLinkClasses("/pricing-plan")}
            >
              PRICING
            </a>
            {/* <a className="text-black text-xl font-linear font-light cursor-pointer hover:text-gray-600 transition-colors">Free</a>
            <a
              onClick={() => {
                navigate("/join");
              }}
              className={getNavLinkClasses("/join")}
            >
              JOIN
            </a> */}
            <a
              onClick={() => {
                navigate("/chat");
              }}
              className={getNavLinkClasses("/chat")}
            >
              LIVE
            </a>
          </nav>

          {isAuthenticated ? (
            <div className="relative">
              <button
                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold hover:bg-gray-800 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.full_name ? getInitials(user.full_name) : "U"}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium truncate">
                      {user?.full_name}
                    </div>
                    <div className="text-gray-500 truncate" title={user?.email}>
                      {user?.email ? truncateEmail(user.email) : ""}
                    </div>
                  </div>
                  <button
                    onClick={handleSettings}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className={`rounded text-white text-base w-[194px] bg-black p-4 py-2 hover:bg-gray-800 transition-colors ${
                location.pathname === "/auth" ? "invisible" : "visible"
              }`}
              onClick={() => {
                navigate("/auth");
              }}
            >
              Register
            </button>
          )}
        </header>

        {/* Overlay to close dropdown when clicking outside */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>

      {/* Spacer div to prevent content from going under navbar */}
      <div style={{ height: navbarHeight || "86px" }}></div>
    </>
  );
};

export default NavBar;
