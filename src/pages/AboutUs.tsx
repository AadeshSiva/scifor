import NavBar from "@/components/layout/NavBar";
import About from "../../public/assets/AboutUs.png";
import React, { useState, useEffect, CSSProperties, MouseEvent } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLinkedin } from "react-icons/ai";

// Using hosted placeholder images
const imgPrsperaLogoTransparent = "https://via.placeholder.com/296x47/FFFFFF/000000?text=PRSPERA";
const imgPrsperaLogoForFinalApproval =
  "https://via.placeholder.com/205x46/000000/FFFFFF?text=PRSPERA";

function MainContent() {
  return (
    <main className="bg-[#c9c9c9] px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-[55px] font-walbaum font-normal text-black leading-tight">
            About Our Founder
          </h1>

          <div className="space-y-4 text-black font-linear-grotesk font-normal text-base md:text-lg leading-relaxed">
            <p>
              <span>Harish Chauhan is the Founder & CEO of </span>
              <span className="font-medium">PRSPERA</span>
              <span>
                {" "}
                and inventor of the UPh™️ (Unifying Philosophy), a proven system for converting
                hidden intangible assets into measurable enterprise value. Harish is the author of
                Unconventional Business - 3 Startling Truths for Corporate Prosperity.
              </span>
            </p>
            <p>
              With over three decades of experience advising 200+ CEOs, building 150+ brands, and
              leading growth consultancies, he has helped businesses achieve premium exits and
              sustainable wealth. After a health emergency in 2012 forced him to rebuild from
              scratch, Harish returned with a renewed mission: to ensure leaders scale smarter,
              preserve their legacy, and exit richer.
            </p>
          </div>

          <div className="pt-8 space-y-4">
            <h3 className="text-2xl font-walbaum font-normal text-black">PRSPERA</h3>
            <div className="text-black font-linear-grotesk font-normal text-base md:text-lg leading-relaxed">
              <p>99 Lamp Crescent</p>
              <p>Vaughan Ontario</p>
              <p>Canada</p>
              <p>L4L 6J6</p>
            </div>
            <div className="pt-4">
              <p className="text-2xl font-linear-grotesk font-black text-black">
                Harish@prspera.com
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://www.linkedin.com/in/harishkchauhan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn Profile"
                className="inline-block text-black hover:text-gray-700 transition-colors duration-200 text-4xl"
              >
                <AiFillLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={About}
            alt="Jeff Cullen"
            loading="lazy"
            className="w-full h-[550px] rounded-lg object-cover max-w-[450px]"
          />
        </div>
      </div>
    </main>
  );
}

// Footer Section
const Footer: React.FC = () => {
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

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#c9c9c9]">
      {/* <NavBar /> */}
      <MainContent />
      <Footer />
    </div>
  );
}
