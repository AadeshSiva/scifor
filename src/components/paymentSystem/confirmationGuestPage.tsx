import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import confirmationBg from "/assets/Bg-confirmationPage.png";
interface User {
  name: string;
  email: string;
}
const ConfirmationGuest: React.FC = () => {
  const { user } = useAuth();
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${confirmationBg})`,
      }}
    >
      <div className="w-full max-w-2xl relative overflow-hidden rounded-lg px-4">
        <div className="text-center mx-auto pt-6">
          <h1 className="font-walbaum tracking-wide text-4xl sm:text-5xl md:text-7xl font-thin">
            Congratulations!
          </h1>
          <p className="mt-8 text-[#FFFFFF] text-xl md:text-3xl font-linear font-thin">
            You are now registered as a guest of Prospera.
          </p>

          <div className="mt-6">
            <>
              <h2 className="font-walbaum font-light text-[#007C7A] text-4xl sm:text-5xl md:text-7xl">
                {user.full_name || "No User found"}
              </h2>
              <p className="mt-10 text-white/200 font-linear text-lg md:text-2xl font-thin">
                <p>
                  You have registered with Prospera using the email:
                  <br />
                  <span className="font-semibold"> {user.email || "No email found"}</span>
                </p>
                <br />
                <p>
                  The alias assigned to you by Prospera is:
                  <br />
                  <span className="font-semibold">{user.username || "No Alias found"}</span>
                </p>
                <br />
                <p className="text-base md:text-lg">
                  Thank you for registering with Prspera. We will contact you shortly with further
                  instructions on how to best use our platform for maximum efficiency, along with a
                  link to the webinar.
                </p>
              </p>
            </>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute w-full h-full z-0">
              <defs>
                <radialGradient id="g1" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#072222" stopOpacity="1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="34" fill="url(#g1)" />
            </svg>
            <svg className="absolute w-full h-full z-10" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="36" stroke="#071111" strokeWidth="2" />
              <circle cx="60" cy="60" r="48" stroke="#071111" strokeWidth="1" />
            </svg>
            <svg
              className="absolute w-full h-full z-20"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden
            >
              <path
                d="M 60 18 A 42 42 0 0 1 102 60"
                stroke="#08a397"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.98"
                strokeDasharray="66"
                strokeDashoffset="66"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="66"
                  to="0"
                  dur="0.9s"
                  begin="0.2s"
                  fill="freeze"
                />
              </path>
            </svg>
            <div className="relative z-30">
              <svg viewBox="0 0 64 64" className="w-36 h-36" aria-hidden>
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="32" cy="32" r="28" fill="#071010" opacity="0.6" />
                <path
                  d="M18 34 L28 42 L46 22"
                  stroke="#f6fbfb"
                  strokeWidth="5.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#glow)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationGuest;
