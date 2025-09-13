import React, { useState } from "react";
import  PhoneInput  from "@/components/authok/PhoneInput";
interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function PauseModal({ isOpen, onClose }: PauseModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent, action: "reachOut" | "joinCommunity") => {
    e.preventDefault();
    console.log(`Form submitted with action: ${action}`, formData);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed w-screen h-screen flex items-center justify-center z-[1000] bg-[rgba(0,0,0,0.5)] left-0 top-0">
      <div className="w-[613px] h-[669px] relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] bg-white p-0 rounded-3xl max-md:w-[90vw] max-md:max-w-[565px] max-md:h-auto max-md:p-6 max-sm:w-[95vw] max-sm:p-5">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 cursor-pointer"
          aria-label="Close modal"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1142 15.9998L3.72363 5.60925L5.60925 3.72363L15.9998 14.1141L26.3903 3.72363L28.2759 5.60925L17.8854 15.9998L28.2759 26.3902L26.3903 28.276L15.9998 17.8854L5.60925 28.276L3.72363 26.3902L14.1142 15.9998Z" fill="black" />
          </svg>
        </button>
        <h2 className="text-black text-2xl font-bold absolute w-[381px] h-[34px] left-6 top-10 max-md:static max-md:w-full max-md:text-[22px] max-md:mb-4 max-sm:text-xl">
          Pause for Now !! Reach Out in 60 Days
        </h2>
        <p className="w-[561px] text-[#555] text-lg font-normal absolute h-[52px] left-6 top-[90px] max-md:static max-md:w-full max-md:text-base max-md:mb-6 max-sm:text-sm">
          We get it, now might not be the right time. We'll check back in 60
          days with a quick update, no pressure.
        </p>
        <form className="absolute left-6 top-[160px] w-[565px] max-md:static max-md:w-full">
          <div className="flex flex-col justify-center items-start gap-3 mb-5">
            <label htmlFor="fullName" className="text-black text-base font-normal">Full Name</label>
            <div className="flex h-12 w-full items-center border relative rounded-lg border-solid border-[#555]">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full h-full text-black text-sm font-normal px-4 py-3.5 rounded-lg border-[none]"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-3 mb-5">
            <label htmlFor="email" className="text-black text-base font-normal">Email address</label>
            <div className="flex h-12 w-full items-center border relative rounded-lg border-solid border-[#555]">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full h-full text-black text-sm font-normal px-4 py-3.5 rounded-lg border-[none]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-3 mb-5">
            <label htmlFor="phoneNumber" className="text-black text-base font-normal">Phone Number</label>
            <PhoneInput 
                          value={formData.phoneNumber}
                          onChange={handlePhoneChange} error={undefined}            />
          </div>
          <div className="flex flex-col gap-5 mt-10 max-md:mt-5">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "reachOut")}
              className="w-full h-[55px] text-black text-base font-normal cursor-pointer px-4 py-4 rounded-lg border-2 border-solid border-black max-md:mb-4"
            >
              Yes, I'm sure dont contact me again
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "joinCommunity")}
              className="w-full h-14 text-white text-base font-normal cursor-pointer bg-black px-4 py-4 rounded-lg border-[none] max-md:mb-4"
            >
              I'm Not Joining Now, Need Free Consultant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
