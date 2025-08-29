import React, { useState, useEffect, CSSProperties, MouseEvent } from "react";
import { HiOutlineMail } from "react-icons/hi";

// Footer Section
export const Footer: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = (): void => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const taglineStyle: CSSProperties = {
    marginTop: "25px",
    fontSize: windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
    fontWeight: "300",
    lineHeight: windowWidth < 640 ? "28px" : windowWidth < 768 ? "32px" : "36px",
  };

  const linkStyle: CSSProperties = {
    fontSize: windowWidth < 640 ? "14px" : "16px",
  };

  return (
    <footer className="bg-black text-white w-full">
      <div className="w-full h-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 h-full">
            {/* First Column - Logo and Tagline */}
            <div className="flex flex-col justify-start items-start">
              {/* Logo */}
              <div className="mb-6 sm:mb-8 md:mb-12">
                <img
                  src="assets/Logo.svg"
                  alt="PRSPERA Logo"
                  className="h-6 sm:h-7 md:h-8 w-auto"
                />
              </div>

              {/* Tagline */}
              <h2 className="leading-tight text-left mb-6" style={taglineStyle}>
                Grow Smarter. <span className="font-bold">Exit Richer</span>
                <sup className="text-xs sm:text-lg md:text-xl">™</sup>
              </h2>

              {/* Address */}
              <div className="text-gray-400 text-sm mb-4 leading-relaxed">
                <p>99 Lamp Crescent</p>
                <p>Vaughan Ontario</p>
                <p>Canada</p>
                <p>L4L 6J6</p>
              </div>

              {/* Phone and Email */}
              <div className="flex flex-col items-start">
                <p className="text-gray-400 hover:text-white transition-colors duration-200 text-sm mb-2">
                  +1-416-919-1830
                </p>
                <div className="flex items-center">
                  <HiOutlineMail className="w-4 h-4 mr-2 text-gray-400" />
                  <a
                    href="mailto:Prosper@prspera.com"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Prosper@prspera.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;