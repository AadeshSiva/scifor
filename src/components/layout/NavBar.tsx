import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";

// Header Component
const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    const activeClasses = isActivePage(path) ? "underline decoration-2 underline-offset-4" : "";
    return `${baseClasses} ${activeClasses}`;
  };
  // Helper function to truncate email if too long
  const truncateEmail = (email: string, maxLength: number = 25) => {
    if (email.length <= maxLength) return email;
    return email.substring(0, maxLength) + "...";
  };
  return (
    <>
      <div className="z-50 w-full bg-white" data-navbar>
        <header className="flex justify-between items-center shadow-xl bg-white px-[49px] py-4 max-sm:p-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
              alt="Prospera Logo"
              className="w-[190px] h-[30px]"
            />
            <span className="text-black text-lg font-medium whitespace-nowrap max-sm:hidden">
              Grow Smarter<span className="font-bold">.Exit Richer™️</span>
            </span>
          </div>
          <div className="gap-4 relative">
            {isAuthenticated ? (
              <div className="flex flex-row items-center justify-center relative gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center justify-center px-4 h-8 text-md  
             text-white bg-gray-800 transition-colors rounded-md"
                >
                  Dashboard
                </button>
                <button
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold hover:bg-gray-800 transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user?.full_name ? getInitials(user.full_name) : "U"}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-[425px] w-64 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium truncate">{user?.full_name}</div>
                      <div className="text-gray-500 truncate" title={user?.email}>
                        {user?.email ? truncateEmail(user.email) : ""}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/coi")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      COI
                    </button>

                    <button
                      onClick={() => navigate("/pricing-plan")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Pricing Plan
                    </button>

                    <button
                      onClick={() => navigate("/proof")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Proof
                    </button>

                    <button
                      onClick={() => navigate("/about-us")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </button>
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
              <>
                {isMobile ? (
                  <>
                    <div className="relative">
                      <button
                        className="flex flex-col justify-center items-center  w-10 h-10 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        <span className="block w-6 h-0.5 bg-black mb-1 transition-all duration-300"></span>
                        <span className="block w-6 h-0.5 bg-black mb-1 transition-all duration-300"></span>
                        <span className="block w-6 h-0.5 bg-black transition-all duration-300"></span>
                      </button>
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50">
                          <button
                            onClick={() => {
                              navigate("/proof");
                              setShowDropdown(false);
                            }}
                            className="flex items-center w-full text-left mb-1 px-4 py-1 text-md text-black hover:bg-gray-400 bg-gray-100 transition-colors font-light"
                          >
                            Proof
                          </button>
                          <button
                            onClick={() => {
                              navigate("/coi");
                              setShowDropdown(false);
                            }}
                            className="flex items-center w-full text-left mb-1 px-4 py-1 text-md text-black hover:bg-gray-200 bg-gray-100 transition-colors font-light"
                          >
                            COI
                          </button>
                          <button
                            onClick={() => {
                              navigate("/pricing-plan");
                              setShowDropdown(false);
                            }}
                            className="flex items-center w-full text-left mb-1 px-4 py-1 text-mdg text-black hover:bg-gray-200 bg-gray-100 transition-colors font-light"
                          >
                            Pricing
                          </button>
                          <button
                            onClick={() => {
                              navigate("/about-us");
                              setShowDropdown(false);
                            }}
                            className="flex items-center w-full text-left mb-1 px-4 py-1 text-md text-black hover:bg-gray-200 bg-gray-100 transition-colors font-light"
                          >
                            About Us
                          </button>
                          {location.pathname !== "/auth" &&
                            <button
                              className="flex items-center justify-center w-full py-1 text-md hover:text-black hover:bg-gray-200 transition-colors font-light border text-white bg-black"
                              onClick={() => navigate("/auth?view=login")}
                            >
                              <span className="text-md">Login</span>
                            </button>
                          }
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row gap-4">
                    <button
                      onClick={() => {
                        navigate("/proof");
                        setShowDropdown(false);
                      }}
                      className="flex items-center justify-center w-24 h-8 text-lg text-black hover:bg-gray-300 transition-colors font-light border bg-gray-100"
                    >
                      <span className="text-md">Proof</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/coi");
                        setShowDropdown(false);
                      }}
                      className="flex items-center justify-center w-24 h-8 text-lg text-black hover:bg-gray-300 transition-colors font-light border bg-gray-100"
                    >
                      <span className="text-md">COI</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/pricing-plan");
                        setShowDropdown(false);
                      }}
                      className="flex items-center justify-center w-24 h-8 text-lg text-black hover:bg-gray-300 transition-colors font-light border bg-gray-100"
                    >
                      <span className="text-md">Pricing</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/about-us");
                        setShowDropdown(false);
                      }}
                      className="flex items-center justify-center w-24 h-8 text-lg text-black hover:bg-gray-300 transition-colors font-light border bg-gray-100"
                    >
                      <span className="text-md">About Us</span>
                    </button>
                    {location.pathname !== "/auth" &&
                      <button
                        className="flex items-center justify-center w-24 h-8 text-lg hover:text-black hover:bg-gray-300 transition-colors font-light border text-white bg-black"
                        onClick={() => navigate("/auth?view=login")}
                      >
                        <span className="text-md">Login</span>
                      </button>
                    }
                  </div>
                )}
              </>
            )}
          </div>
        </header>
        {showDropdown && (
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
        )}
      </div>
    </>
  );
};
export default NavBar;