
import React from 'react';
import { useForm } from 'react-hook-form';
interface FormData {
  fullName: string;
  businessEmail: string;
  businessWebsite: string;
  phoneNumber: string;
  agreeToTerms: boolean;
}
const Index: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };
  const circles = [
    // SVG content for each circle preserved as in the original design
  ];
  return (
    <div className="w-full relative overflow-x-hidden bg-white">
      <main>
        {/* Hero Section */}
        <section className="w-full relative bg-white pt-14 pb-0 px-20 max-md:pt-10 max-md:pb-0 max-md:px-8 max-sm:pt-8 max-sm:pb-0 max-sm:px-5">
          <h1 className="text-[#818181] text-7xl font-normal text-center mb-6 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
            Many grow, only a few WIN.
          </h1>
          <div className="text-[#D02C31] text-center text-[28px] font-bold max-w-[982px] mb-6 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4">
            <span>When </span>
            <span className="font-bold">80%</span>
            <span> businesses don't sell and only </span>
            <span className="font-bold">6%</span>
            <span> only got fair market value when sold, most entrepreneurs, no matter how successful, LOSE on exit.</span>
          </div>
          <p className="text-black text-center text-[28px] font-medium max-w-[1238px] mb-6 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4">
            Like you, they didn't start and grow a business to LOSE – but LOSE they did.​ What did they do wrong? They didn't grow value where 84% of their business value exists – intangibles.
          </p>
          <p className="text-[#555] text-center text-[28px] font-normal leading-9 max-w-[597px] mb-6 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4">
            If you want to WIN, Grow Smart so you Exit Richer.​
          </p>
          <p className="text-black text-center text-[28px] font-medium leading-9 max-w-[760px] mb-10 mx-auto max-md:text-2xl max-md:mb-8 max-sm:text-xl max-sm:mb-6">
            You Grow Smart by building a marketable company: maximizing, monetizable value (via intangibles), tax effectively, ​ using a UPhTM (Unifying Philosophy) asset.
          </p>
          <div className="absolute w-[150px] h-72 flex flex-col items-center right-0 top-[137px] max-md:static max-md:w-full max-md:h-auto max-md:mx-0 max-md:my-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc?placeholderIfAbsent=true"
              alt=""
              className="w-[140px] h-[35px] mb-[13px]"
            />
            <div className="-rotate-90 text-black text-[21px] font-bold whitespace-nowrap mt-12 max-md:text-center max-md:mt-4">
              <span>Grow Smarter.</span>
              <span className="font-bold">Exit Richer™</span>
            </div>
          </div>
        </section>
        {/* Signup Form and Empty Box Section */}
        <div className="flex gap-5 mt-10 mb-20 px-20 py-0 max-md:flex-col max-md:gap-8 max-md:px-8 max-md:py-0 max-sm:gap-6 max-sm:px-5 max-sm:py-0">
          {/* Signup Form */}
          <div className="w-[519px] h-[543px] shrink-0 box-border relative bg-white px-6 py-8 rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)] max-md:w-full max-md:h-auto max-sm:px-4 max-sm:py-6">
            <h2 className="text-[#2B2B2B] text-center text-xl font-semibold mb-6">
              WIN a Private Webinar and Q&A with Jeff
            </h2>
            <div className="flex flex-col gap-3 items-center mb-4">
              {[
                "Exited with Double-Digit Multiples",
                "Achieved 25%+ Profit Margins",
                "Tax Smart Generational Wealth",
                "And more..."
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="checkmark" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.07573 11.8036L0.175729 7.44535C-0.0585762 7.18351 -0.0585762 6.75898 0.175729 6.49711L1.02424 5.54888C1.25854 5.28702 1.63846 5.28702 1.87277 5.54888L4.5 8.48478L10.1272 2.19638C10.3615 1.93454 10.7415 1.93454 10.9758 2.19638L11.8243 3.14461C12.0586 3.40645 12.0586 3.83098 11.8243 4.09285L4.92426 11.8036C4.68994 12.0655 4.31004 12.0655 4.07573 11.8036Z" fill="black"/>
                  </svg>
                  <div className="text-[#2B2B2B] text-[10px] tracking-normal">{item}</div>
                </div>
              ))}
            </div>
            <div className="text-[#2B2B2B] text-center text-sm font-semibold mb-6">
              *11am EST, May 22/25 - Only 33 Spots Available
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-black text-xs font-medium">Full Name</label>
                <input
                  {...register('fullName', { required: true })}
                  className="text-[#9E9E9E] text-[10px] font-normal border h-8 box-border px-[17px] py-[9px] rounded-lg border-solid border-[rgba(85,85,85,0.60)]"
                  placeholder="Enter first name"
                />
              </div>
              <div className="flex gap-4 max-sm:flex-col max-sm:gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-black text-xs font-medium">Business Email</label>
                  <input
                    {...register('businessEmail', { required: true })}
                    className="text-[#9E9E9E] text-[10px] font-normal border h-8 box-border px-[17px] py-[9px] rounded-lg border-solid border-[rgba(85,85,85,0.60)]"
                    placeholder="Enter business email"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-black text-xs font-medium">Business Website</label>
                  <input
                    {...register('businessWebsite', { required: true })}
                    className="text-[#9E9E9E] text-[10px] font-normal border h-8 box-border px-[17px] py-[9px] rounded-lg border-solid border-[rgba(85,85,85,0.60)]"
                    placeholder="Enter business website URL"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-black text-xs font-medium">Phone Number</label>
                <div className="flex gap-2 max-sm:flex-col max-sm:gap-2">
                  <div className="flex w-[65px] h-8 justify-center items-center border rounded-lg border-solid border-[rgba(85,85,85,0.60)] max-sm:w-full">
                    <svg width="65" height="32" viewBox="0 0 65 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="64" height="31" rx="7.5" stroke="#555555" strokeOpacity="0.6"/>
                      <path d="M52 14L47 19L42 14" stroke="#555555" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.1113 11.7773H28.8891V20.2218H15.1113V11.7773Z" fill="white" stroke="black" strokeWidth="0.333333"/>
                      <path d="M28.8891 17.7769C28.4359 17.8848 27.9754 17.959 27.5113 17.9991C27.1624 17.988 26.4824 17.7658 26.1336 17.7769C25.7847 17.788 25.1047 18.0102 24.7558 17.9991C24.4069 17.988 23.7269 17.7658 23.378 17.7769C23.0291 17.788 22.3491 18.0102 22.0002 17.9991C21.6513 17.988 20.9713 17.7658 20.6224 17.7769C20.2736 17.788 19.5936 18.0098 19.2447 17.9991C18.8958 17.9884 18.2158 17.7678 17.8669 17.7769C17.518 17.786 16.838 17.9991 16.4891 17.9991C16.0257 17.9534 15.5656 17.8792 15.1113 17.7769V17.3324C15.5656 17.4347 16.0257 17.509 16.4891 17.5547C16.838 17.5547 17.518 17.3415 17.8669 17.3324C18.2158 17.3233 18.8958 17.544 19.2447 17.5547C19.5936 17.5653 20.2736 17.3435 20.6224 17.3324C20.9713 17.3213 21.6513 17.5435 22.0002 17.5547C22.3491 17.5658 23.0291 17.3435 23.378 17.3324C23.7269 17.3213 24.4069 17.5435 24.7558 17.5547C25.1047 17.5658 25.7847 17.3435 26.1336 17.3324C26.4824 17.3213 27.1624 17.5435 27.5113 17.5547C27.9754 17.5146 28.4359 17.4403 28.8891 17.3324V17.7769Z" fill="white" stroke="black" strokeWidth="0.333333"/>
                      <path d="M28.8891 18.2222C28.4359 18.3301 27.9754 18.4043 27.5113 18.4444C27.1624 18.4333 26.4824 18.2111 26.1336 18.2222C25.7847 18.2333 25.1047 18.4555 24.7558 18.4444C24.4069 18.4333 23.7269 18.2111 23.378 18.2222C23.0291 18.2333 22.3491 18.4555 22.0002 18.4444C21.6513 18.4333 20.9713 18.2111 20.6224 18.2222C20.2736 18.2333 19.5936 18.4551 19.2447 18.4444C18.8958 18.4337 18.2158 18.2131 17.8669 18.2222C17.518 18.2313 16.838 18.4444 16.4891 18.4444C16.0257 18.3987 15.5656 18.3245 15.1113 18.2222V17.7777C15.5656 17.8801 16.0257 17.9543 16.4891 18C16.838 18 17.518 17.7869 17.8669 17.7777C18.2158 17.7686 18.8958 17.9893 19.2447 18C19.5936 18.0106 20.2736 17.7889 20.6224 17.7777C20.9713 17.7666 21.6513 17.9889 22.0002 18C22.3491 18.0111 23.0291 17.7889 23.378 17.7777C23.7269 17.7666 24.4069 17.9889 24.7558 18C25.1047 18.0111 25.7847 17.7889 26.1336 17.7777C26.4824 17.7666 27.1624 17.9889 27.5113 18C27.9754 17.9599 28.4359 17.8856 28.8891 17.7777V18.2222Z" fill="#1E50A0" stroke="black" strokeWidth="0.333333"/>
                      <path d="M28.8891 18.6675C28.4359 18.7754 27.9754 18.8497 27.5113 18.8897C27.1624 18.8786 26.4824 18.6564 26.1336 18.6675C25.7847 18.6786 25.1047 18.9008 24.7558 18.8897C24.4069 18.8786 23.7269 18.6564 23.378 18.6675C23.0291 18.6786 22.3491 18.9008 22.0002 18.8897C21.6513 18.8786 20.9713 18.6564 20.6224 18.6675C20.2736 18.6786 19.5936 18.9004 19.2447 18.8897C18.8958 18.8791 18.2158 18.6584 17.8669 18.6675C17.518 18.6766 16.838 18.8897 16.4891 18.8897C16.0257 18.844 15.5656 18.7698 15.1113 18.6675V18.2231C15.5656 18.3254 16.0257 18.3996 16.4891 18.4453C16.838 18.4453 17.518 18.2322 17.8669 18.2231C18.2158 18.2139 18.8958 18.4346 19.2447 18.4453C19.5936 18.4559 20.2736 18.2342 20.6224 18.2231C20.9713 18.2119 21.6513 18.4342 22.0002 18.4453C22.3491 18.4564 23.0291 18.2342 23.378 18.2231C23.7269 18.2119 24.4069 18.4342 24.7558 18.4453C25.1047 18.4564 25.7847 18.2342 26.1336 18.2231C26.4824 18.2119 27.1624 18.4342 27.5113 18.4453C27.9754 18.4052 28.4359 18.3309 28.8891 18.2231V18.6675Z" fill="white" stroke="black" strokeWidth="0.333333"/>
                    </svg>
                  </div>
                  <input
                    {...register('phoneNumber', { required: true })}
                    className="text-[#9E9E9E] text-[10px] font-normal flex-1 border h-8 box-border px-[17px] py-[9px] rounded-lg border-solid border-[rgba(85,85,85,0.60)]"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4 mb-6">
                <input
                  type="checkbox"
                  {...register('agreeToTerms', { required: true })}
                  className="w-3.5 h-3.5 border shrink-0 border-solid border-black"
                />
                <label className="text-[#555] text-[10px] font-normal">
                  I agree to opt-in and accept the privacy policy.
                </label>
              </div>
              <button
                type="submit"
                className="text-white text-base font-semibold h-12 box-border bg-black pt-[13px] pb-3 px-[155px] rounded-lg max-sm:px-6 max-sm:py-3"
              >
                I want a chance to WIN !!
              </button>
            </form>
          </div>
          {/* Empty Box */}
          <div className="w-[689px] h-[543px] shrink-0 bg-white rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)] max-md:w-full max-md:h-[400px]" />
        </div>
        {/* Story Section */}
        <section className="w-full relative bg-[#F4F4F4] px-0 py-20">
          <div className="text-center mb-20">
            <h2 className="text-[#777] text-7xl font-light mb-6 max-md:text-5xl max-sm:text-[32px]">
              You had a dream.
            </h2>
            <h3 className="text-[#818181] text-7xl font-normal mb-10 max-md:text-5xl max-sm:text-[32px]">
              His came true. What about yours?
            </h3>
            <p className="text-[#555] text-center text-[28px] font-normal leading-8 max-w-[589px] mx-auto my-0 max-sm:text-xl">
              Jeff grew and exited his freight services company ​ with double digit multiples, all tax effectively
            </p>
          </div>
          <div className="w-[689px] h-[690px] bg-white mt-0 mb-20 mx-auto rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)]" />
          <div className="text-center mb-20">
            <h2 className="text-[#777] text-7xl font-light mb-6 max-md:text-5xl max-sm:text-[32px]">
              From Dreams to Done
            </h2>
            <h3 className="text-[#818181] text-7xl font-normal mb-10 max-md:text-5xl max-sm:text-[32px]">
              in 6 Steps.
            </h3>
            <div className="max-w-[570px] mt-0 mb-20 mx-auto max-md:max-w-full max-md:px-8 max-md:py-0">
              <p className="text-black text-justify text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                Jeff Cullen built a valuable, marketable company
              </p>
              <p className="text-black text-center text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                By creating and operationalizing ​ "Prosperity For All" - ​ his (Unifying Philosophy) UPhTM​
              </p>
              <p className="text-black text-justify text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                A UPh is your business DNA in 6 words or less. ​
              </p>
              <p className="text-black text-justify text-[28px] font-bold leading-8 max-md:text-2xl max-sm:text-xl">
                It's the one asset that rules all intangible assets. ​
              </p>
            </div>
            <div className="flex w-[1280px] h-60 justify-center items-start gap-5 mt-0 mb-20 mx-auto max-md:w-full max-md:flex-wrap max-md:gap-4 max-md:px-8 max-md:py-0 max-sm:flex-col max-sm:items-center">
              {circles.map((circle, index) => (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: circle }} />
                </div>
              ))}
            </div>
            <div className="max-w-[870px] flex flex-col gap-10 mx-auto my-0 max-md:px-8 max-md:py-0 max-sm:px-5 max-sm:py-0">
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                Jeff Cullen, a Canadian entrepreneur and logistics executive is best known as the founder and former CEO of Rodair, a Toronto-based third-party logistics provider.
              </p>
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                He launched Rodair in 1996 with just three employees, and by 2012, the company had expanded to 27 offices across 17 countries, generating CAD 170 million in sales.
              </p>
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                Under his leadership, Rodair became a full-service supply chain provider with 155 employees across Canada, serving industries such as fashion, retail, automotive, and mining.
              </p>
              <p className="text-black text-justify text-xl font-normal leading-8 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
                In 2019, Rodair was acquired by Rhenus Logistics, a German global logistics firm. Cullen continued to lead the Canadian operations under the new name, Rhenus Canada. He emphasized a unifying business philosophy centered on shared prosperity, transparency, and long-term sustainability. His leadership style focused on creating value for all stakeholders—clients, employees, vendors, and shareholders alike.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Index;