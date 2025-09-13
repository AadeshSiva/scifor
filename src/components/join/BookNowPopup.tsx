
import React from "react";
import { X } from "lucide-react";

const Index: React.FC = () => {
  const handlePurchaseNow = () => {
    console.log("Purchase now clicked");
  };

  const handleBookSession = () => {
    console.log("Book session clicked");
  };

  const handleClose = () => {
    console.log("Close button clicked");
  };
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center my-8">
          <section className="bg-white flex max-w-[613px] flex-col overflow-hidden items-stretch font-medium pt-6 pb-[62px] rounded-3xl mx-auto relative">
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <div className="flex items-start px-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/651bc07c350e428f8b2623e57cac49d1/2b59d6918f315071e57ad568aa904305930f5346?placeholderIfAbsent=true"
                alt="Purchase options icon"
                className="aspect-[1] object-contain w-8 mr-6 max-md:mr-2.5"
              />
            </div>
            <div className="flex w-full flex-col items-stretch mt-1 px-6 max-md:max-w-full max-md:px-5">
              <h2 className="text-black text-[28px] font-semibold">
                Choose your Purchase Option
              </h2>
              <div className="mt-[27px] space-y-6">
                <div className="bg-white border flex flex-col overflow-hidden px-8 py-9 rounded-2xl border-[rgba(85,85,85,0.5)] border-solid max-md:max-w-full max-md:px-5">
                  <h3 className="text-black text-[22px]">Purchase Now</h3>
                  <p className="text-[#555] text-xl mt-3">Get Immediate access to all features.</p>
                  <button
                    onClick={handlePurchaseNow}
                    className="self-stretch overflow-hidden text-base font-normal mt-[26px] px-[70px] py-[17px] rounded-lg bg-black text-white max-md:max-w-full max-md:px-5"
                  >
                    Purchase Now
                  </button>
                </div>
                <div className="bg-white border flex flex-col overflow-hidden px-8 py-9 rounded-2xl border-[rgba(85,85,85,0.5)] border-solid max-md:max-w-full max-md:px-5">
                  <h3 className="text-black text-[22px]">Book 30 - Minute Session</h3>
                  <p className="text-[#555] text-xl mt-3">Schedule a consultation and purchase later</p>
                  <button
                    onClick={handleBookSession}
                    className="self-stretch overflow-hidden text-base font-normal mt-[26px] px-[70px] py-[17px] rounded-lg border border-black border-solid text-black max-md:max-w-full max-md:px-5"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
export default Index;