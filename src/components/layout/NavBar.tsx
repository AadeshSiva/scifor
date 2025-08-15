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

  // New state for scroll-to-hide
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Create a spacer div to push content down
  useEffect(() => {
    const navbar = document.querySelector("[data-navbar]") as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, [isLoading]);

  // Scroll-to-hide logic
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

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

  // if (isLoading) {
  //   return (
  //     <>
  //       <div
  //         className="fixed top-0 left-0 right-0 z-10 w-full bg-white"
  //         data-navbar
  //         style={{ display: isVisible ? "block" : "none" }}
  //       >
  //         <header className="flex justify-between items-center shadow-[0_7px_5.4px_0_rgba(0,0,0,0.25)] bg-white px-[49px] py-6 max-sm:p-5">
  //           <div
  //             className="flex items-center gap-4 cursor-pointer"
  //             onClick={() => {
  //               navigate("/");
  //             }}
  //           >
  //             <img
  //               src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
  //               alt="Prospera Logo"
  //               className="w-[195px] h-[34px]"
  //             />
  //             <span className="text-black text-lg font-medium whitespace-nowrap max-sm:hidden">
  //               Grow Smarter. Exit Richer™️
  //             </span>
  //           </div>

  //           <div className="relative">
  //             <button
  //               className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 setShowDropdown(!showDropdown);
  //               }}
  //             >
  //               <span className="block w-6 h-0.5 bg-black mb-1 transition-all duration-300"></span>
  //               <span className="block w-6 h-0.5 bg-black mb-1 transition-all duration-300"></span>
  //               <span className="block w-6 h-0.5 bg-black transition-all duration-300"></span>
  //             </button>
  //             {showDropdown && (
  //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border">
  //                 <button
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     navigate("/coi");
  //                     setShowDropdown(false);
  //                   }}
  //                   className="flex items-center w-full text-left px-4 py-3 text-lg text-black hover:bg-gray-100 transition-colors font-light"
  //                 >
  //                   COI
  //                 </button>
  //                 <button
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     navigate("/pricing-plan");
  //                     setShowDropdown(false);
  //                   }}
  //                   className="flex items-center w-full text-left px-4 py-3 text-lg text-black hover:bg-gray-100 transition-colors font-light"
  //                 >
  //                   Pricing
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //         </header>
  //       </div>
  //       <div style={{ height: navbarHeight || "86px" }}></div>
  //     </>
  //   );
  // }

  return (
    <>
      <div
        className="top-0 left-0 right-0 z-50 w-full bg-white"
        data-navbar
        style={{ display: isVisible ? "block" : "none", position: "relative" }}
      >
        <header className="flex justify-between items-center shadow-[0_7px_5.4px_0_rgba(0,0,0,0.25)] bg-white px-[49px] py-5 max-sm:p-5">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
              alt="Prospera Logo"
              className="w-[195px] h-[34px]"
            />
            <span className="text-black text-lg font-medium whitespace-nowrap max-sm:hidden">
              Grow Smarter. Exit Richer™️
            </span>
          </div>

          {/* Hide existing nav links and user menu, replace with hamburger dropdown */}
          {/* <div className="relative">
            <button
              className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/coi");
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-3 text-lg text-black hover:bg-gray-100 transition-colors font-light"
                >
                  COI
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/pricing-plan");
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-3 text-lg text-black hover:bg-gray-100 transition-colors font-light"
                >
                  Pricing
                </button>
              </div>
            )}
          </div> */}
        </header>

        {/* Overlay to close dropdown when clicking outside */}
        {showDropdown && (
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
        )}
      </div>

      {/* Spacer div to prevent content from going under navbar */}
      <div style={{ height: navbarHeight || "86px" }}></div>
    </>
  );
};

export default NavBar;
