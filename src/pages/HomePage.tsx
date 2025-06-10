import FloatingButton from "@/components/extras/FloatingButton";
import { FormSection } from "@/components/home/FormSection";
import VideoPopup from "@/components/video/VideoPopup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const HeroSection: React.FC = () => {
    return (
      <section className="flex flex-col items-center text-center py-12 pb-0 relative">
      <aside className="absolute right-4 top-4 z-10">
        <div className="flex flex-col items-end">
          <img
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc'
            alt="Side Logo"
            className="w-[140px] h-[35px]"
          />
          <div className="-rotate-90 text-black text-[18px] mt-5 origin-center whitespace-nowrap pt-40 font-linear">
            <span>Grow Smarter. <span className="font-bold">Exit Richer™</span></span>
          </div>
        </div>
      </aside>
      
      <h1 className="text-[#818181] font-walbaum text-7xl font-normal text-center mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
        The world's first and only place
      </h1>
      
      <div className="text-[#818181] text-center text-7xl font-normal max-w-[1200px] mb-16 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 font-walbaum">
        <p>that helps you <span className="text-[#007C7A]">WIN</span> in business.</p>
      </div>
      
      <p className="text-[#555555] text-center text-[28px] max-w-[1500px] mb-2 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 flex-col">
        <p className="font-thin pb-10">Business winning is NOT just about profits, sales, growth or scaling.</p>
        <p className="font-thin">WINNING is:</p>
      </p>
      
      <p className="text-black text-center text-[28px]  font-normal leading-9 max-w-[800px] mb-8 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4">
      Maximizing, monetizable value, tax effectively - for all invested.
      </p>
      
      <p className="text-black text-center text-[28px] font-medium leading-9 max-w-[1200px] mb-3 mx-auto max-md:text-2xl max-md:mb-8 max-sm:text-xl max-sm:mb-6 flex-col">
        <p className="mb-3">That's exactly what our client Jeff did –  he WON - and now he shares how he did it.</p>
        <p className="text-[#555555] font-light">(Jeff grew and exited his freight services company</p>
        <p className="text-[#555555] font-light mb-10">with double digit multiples, all tax effectively)</p>
        <p>And with our help , you can WIN too.</p>
      </p>
    </section>
    );
  };

  const StorySection = () => {
    const circles = [
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="100">Canadian entrepreneur,</tspan>
          <tspan x="120" y="120">founder and former</tspan>
          <tspan x="120" y="140">CEO of Rodair</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="90">He and his team</tspan>
          <tspan x="120" y="110">operationalized the DNA</tspan>
          <tspan x="120" y="130">of their business a</tspan>
          <tspan x="120" y="150">Unifying Philosophy:</tspan>
          <tspan x="120" y="170">Prosperity For All</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="90">Prosperity For All</tspan>
          <tspan x="120" y="110">helped him build a</tspan>
          <tspan x="120" y="130">valuable, and Best</tspan>
          <tspan x="120" y="150">Managed award-</tspan>
          <tspan x="120" y="170">winning company.</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="80">Prosperity For All</tspan>
          <tspan x="120" y="100">results: 25% high</tspan>
          <tspan x="120" y="120">profit margins superb</tspan>
          <tspan x="120" y="140">company culture</tspan>
          <tspan x="120" y="160">double-digit</tspan>
          <tspan x="120" y="180">multiple exit.</tspan>
        </text>
      </svg>`,
      `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#7F7F7F" fill-opacity="0.5"/>
        <text x="120" y="120" text-anchor="middle" font-size="16" fill="black" font-family="Linear">
          <tspan x="120" y="80">Prosperity For All A</tspan>
          <tspan x="120" y="100">world's first:</tspan>
          <tspan x="120" y="120">maximized vale</tspan>
          <tspan x="120" y="140">across intangible</tspan>
          <tspan x="120" y="160">assets, monetizing</tspan>
          <tspan x="120" y="180">them, tax effectively.</tspan>
        </text>
      </svg>`
    ];
    
    return (
      <section className="flex flex-col items-center pt-36 pb-10 -mt-32">
        <div className="w-screen relative py-20">
  
          {/* Content starts */}
          <div className="text-center mb-12">
            <h1 className="text-[#818181] font-walbaum text-7xl text-center mb-16 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
                Many grow and <span className="text-[#D22F27]">LOSE.</span> 
            </h1>
      
      <p className="text-[#D02C31] text-center text-[28px] max-w-[1500px] mb-14 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 flex-col font-light">
        <p >When <span className="font-semibold">80%</span> businesses don't sell and</p>
        <p>only <span className="font-semibold">6%</span> only got fair market value when sold,</p>
        <p>most entrepreneurs and business families,</p>
        <p>no matter how successful,</p>
        <p>LOSE on exit/succession.</p>
      </p>
      
      <p className="text-black text-center text-[28px] font-normal leading-9 max-w-[1250px] mb-3 mx-auto max-md:text-2xl max-md:mb-8 max-sm:text-xl max-sm:mb-6 flex-col gap-3">
        <p className="mb-2">No one starts and grows a business to LOSE,</p>
        <p className="mb-2">ButLOSE they do because:</p>
        <p className="">They didn't grow value companies where 84%+ of their business value matters most – intangible assets.</p>
      </p>
            <h2 className="text-[#777] text-7xl font-extralight font-walbaum mb-6 mt-32 max-md:text-5xl max-sm:text-[32px]">
                We rule all intangible assets with
            </h2>
            <h3 className="text-[#818181] text-7xl font-normal font-walbaum mb-16 max-md:text-5xl max-sm:text-[32px]">
                ONE asset that's 6 words or less. ​
            </h3>
          </div>
  
          {/* Fixed image container */}
          <div className="w-[689px] h-[690px] bg-white mt-0 mb-12 mx-auto rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)] max-w-full overflow-hidden flex items-center justify-center">
            <img 
              src="https://ik.imagekit.io/je0rl3nnt/IMG-20250516-WA0027.jpg?updatedAt=1748409736037" 
              alt="Jeff Cullen - Entrepreneur and CEO" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center">
          <button className="bg-black text-white text-xl font-medium py-6 px-24 rounded max-w-3xl w-full text-center hover:bg-gray-800 transition-colors">
            Start WINNING (Free Webinars + Trail Offers)
          </button>
        </div>
  
          <div className="text-center mb-20 mt-20">
            <h2 className="text-[#777] text-7xl mb-6 max-md:text-5xl max-sm:text-[32px] font-walbaum font-extralight">
                From dream to done
            </h2>
            <h3 className="text-[#818181] text-7xl font-normal mb-20 max-md:text-5xl max-sm:text-[32px] font-walbaum">
                with 6 words or less
            </h3>

            <div className="w-[689px] h-[690px] bg-white mt-0 mb-20 mx-auto rounded-3xl border-[3px] border-solid border-[rgba(158,158,158,0.50)] max-w-full overflow-hidden flex items-center justify-center">
            <img 
              src="https://ik.imagekit.io/je0rl3nnt/IMG-20250516-WA0027.jpg?updatedAt=1748409736037" 
              alt="Jeff Cullen - Entrepreneur and CEO" 
              className="w-full h-full object-cover"
            />
          </div>
  
            <div className="max-w-[570px] mt-0 mb-20 mx-auto max-md:max-w-full max-md:px-4">
              <p className="text-black text-justify text-[28px] font-semibold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                Jeff Cullen built a valuable, marketable company
              </p>
              <div className="text-black text-center text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                <p>By creating and operationalizing</p>
                <p>"Prosperity For All" -</p>
                <p>his (Unifying Philosophy) UPh™</p>
              </div>
              <p className="text-black text-justify text-[28px] font-bold leading-8 mb-6 max-md:text-2xl max-sm:text-xl">
                A UPh is your business DNA in 6 words or less.
              </p>
              <p className="text-black text-justify text-[28px] font-bold leading-8 max-md:text-2xl max-sm:text-xl">
                It's the one asset that rules all intangible assets.
              </p>
            </div>
  
            <div className="flex w-full h-60 justify-center items-start mt-0 mb-20 max-md:w-full max-md:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:items-center overflow-x-auto">
              {circles.map((circle, index) => (
                <div
                  key={index}
                  className="w-30 h-30 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 mx-1"
                >
                  <div dangerouslySetInnerHTML={{ __html: circle }} />
                </div>
              ))}
            </div>
  
            <div className="max-w-[870px] flex flex-col gap-10 mx-auto my-0 max-md:px-4 max-sm:px-2 font-thin">
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

            <div>
                <h1 className="text-[#818181] font-walbaum text-7xl font-thin mt-24 text-center mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
                    You had a dream.
                </h1>
                
                <div className="text-[#818181] text-center text-7xl font-normal max-w-[1200px] mb-16 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4 font-walbaum">
                    <p>His came true. What about yours?</p>
                </div>
                <div className="flex justify-center">
                    <button className="bg-black text-white text-xl font-medium py-6 px-24 rounded max-w-3xl w-full text-center hover:bg-gray-800 transition-colors">
                        Start WINNING (Free Webinars + Trail Offers)
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

const Index: React.FC = () => {
    const [videos, setVideos] = useState<unknown[]>([]);

    return (
      <div className="relative">
        <FloatingButton />

         <HeroSection />
        <div className=" w-full mx-auto">
          <div className="relative">
            <FormSection onVideosLoaded={setVideos} />
            <StorySection />
          </div>
          
        </div>
        <VideoPopup videos={videos} />
      </div>
    );
  };

export default Index;