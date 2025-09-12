import React, { useState } from "react";
import PhoneInput  from "@/components/authok/PhoneInput";
import { CloseButton } from "@/components/ui/CloseButton";

const Index: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-['Poppins']">
        <h1 className="text-3xl font-bold mb-8 text-center">Community Registration</h1>
        
        <div className="w-[613px] h-[544px] relative bg-white p-6 rounded-3xl max-md:w-[90%] max-md:max-w-[613px] max-md:h-auto max-md:mx-auto max-md:my-5 max-sm:p-4 max-sm:rounded-2xl">
          <CloseButton 
            onClick={() => console.log("Close button clicked")} 
            className="absolute right-6 top-6"
          />
          
          <h2 className="text-black text-2xl font-semibold max-w-[466px] mt-4 max-sm:text-xl">
            Enter your info below and we'll together make an successful community
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <label className="text-black text-base font-medium mb-3 block">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                placeholder="Enter your full name"
                className="text-[#9E9E9E] text-sm font-normal h-12 border w-full px-4 py-3.5 rounded-lg border-solid border-[#555] focus:outline-none focus:border-black"
              />
            </div>
            
            <div className="w-full mt-4">
              <label className="text-black text-base font-medium mb-3 block">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="Enter your email address"
                className="text-[#9E9E9E] text-sm font-normal h-12 border w-full px-4 py-3.5 rounded-lg border-solid border-[#555] focus:outline-none focus:border-black"
              />
            </div>
            
            <PhoneInput
                          value={formData.phone}
                          onChange={handleChange("phone")} error={undefined}            />
            
            <button 
              type="submit"
              className="text-white text-base font-medium w-full cursor-pointer bg-black mt-8 px-0 py-[17px] rounded-lg hover:bg-gray-800 transition-colors"
            >
              Join Our Community !!!!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;