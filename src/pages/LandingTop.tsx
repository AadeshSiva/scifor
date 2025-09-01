import React, { useState } from "react";
import { CircleArrowDown } from "lucide-react";
import HeroVideo from "/assets/HeroVideo.mp4";
// import StoryVideo from "../../public/assets/Copy of Stage 1 ENDGAME 16_9.mp4";
import JetImg from "../../public/assets/jeff-img.jpg";
import WebinarImg from "../../public/assets/jeff-webinar.jpg";
import JoinBtn from "@/components/JoinBtn";

// const HeroSection: React.FC = () => {
//   return (
//     <div className="bg-[#f5f5f5] py-16 px-4 md:px-8 lg:px-16">
//       <div className="max-w-6xl mx-auto text-center">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin text-gray-700 mb-10">
//           <div>Your Business Is Profitable -</div>
//           <div className="font-normal mt-5">But Is It Truly Valuable?</div>
//           <div className=" font-walbaum font-normal text-black mt-5">We Can Help You.</div>
//         </h1>

//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//           <div className="w-full xl:w-1/2 flex justify-center">
//             <div className="relative w-full max-w-lg">
//               <div className="relative w-full max-w-lg">
//                 <div className="relative w-full max-w-lg pb-[100%] rounded-xl overflow-hidden">
//                   <iframe
//                     src={`https://drive.google.com/file/d/1YLoXKNla2Yqr79ZqaHQakk6KDi8aGrYo/preview`}
//                     className="absolute top-[100px] left-0 w-full h-[300px] rounded-xl"
//                     allow="autoplay"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 text-left space-y-6 text-xl font-linear font-light text-black">
//             <p>
//               Welcome to the World’s One and Only, Fact-Based Platform to help you build a valuable business – ​via your most lucrative assets, tax effectively. ​
//               <br />
//               <br />
//               <strong className="font-semibold">Fact-Based Platform</strong> to help you build a
//               valuable business - via your most lucrative assets, tax effectively.
//             </p>
//             <p>
//               You're winning being profitable - but 84%+ of your business value is intangible and is
//               overlooked - every day (by your own people).
//             </p>
//             <p>
//               Start recovering and building that value daily - so that you can exit richer at the
//               right time.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const HeroSection: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Headings */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin text-gray-700 mb-3">
          Your Business Is Profitable -
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin text-gray-700">
          But Is It Truly Valuable?
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-normal text-black mt-6 mb-10">
          We Can Help You.
        </h3>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
          {/* Left: Inline video (no thumbnail) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow">
                <iframe
                  src="https://drive.google.com/file/d/1YLoXKNla2Yqr79ZqaHQakk6KDi8aGrYo/preview"
                  className="absolute inset-0 w-full h-full rounded-xl"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Intro Video"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="w-full lg:w-1/2 text-left space-y-6 text-[1.05rem] md:text-lg lg:text-xl font-linear font-light text-black">
            <p>
              Welcome to the World’s One and Only, Fact–Based Platform to help you build a valuable
              business — via your most lucrative assets, tax effectively.
            </p>

            <div>
              <p className="mb-2">Did you know:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  84% of your business value is intangible <span className="text-gray-700">[PWC]</span>
                  <span className="block text-gray-700"> (how will you monetize it)</span>
                </li>
                <li>
                  77% of staff are disengaged globally <span className="text-gray-700">[Gallup]</span>
                  <span className="block text-gray-700"> (that hurts your business value, every day)</span>
                </li>
              </ul>
            </div>

            <p>
              Our proven solution is the one and only way to maximize, monetizable value of your
              business — tax smart.
            </p>

            <p>See for yourself.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const StorySection: React.FC = () => {
//   const handleReveal = () => {
//     const paragraphs = document.getElementsByClassName("reveal-para");
//     const btns = document.getElementsByClassName("reveal-btn");

//     for (let i = 0; i < paragraphs.length; i++) {
//       const para = paragraphs[i];
//       const btn = btns[i];
//       btn.classList.toggle("hidden");
//       para.classList.toggle("hidden");
//     }
//   };

//   return (
//     <div className="bg-[#757575] text-white py-16 px-4 md:px-8 lg:px-16">
//       <div className="max-w-6xl mx-auto text-center">
//         <div className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin mb-16">
//           <h1 className="font-thin">Jeff exited with a</h1>
//           <h1 className="font-normal mt-5">double-digit multiple valuation.</h1>
//           <p className="font-linear font-thin text-3xl mt-10">
//             Find out how he and his team did it - so you can copy what works.
//           </p>
//         </div>

//         <div className="flex justify-center">
//           <video className="rounded-xl" src={HeroVideo} controls></video>
//         </div>

//         {/* <div className="w-full lg:w-1/2 text-left mt-6 lg:mt-0">
//           <p className="text-3xl mb-4">Your invited to win a chance to meet Jeff Cullen</p>
//           <p className="text-xl font-light">Wednesday, August 20, 2025</p>
//           <p className="text-xl font-light mb-4">
//             10am est – 11am est <strong className="font-normal">Success Story</strong>
//             <br />
//             11:15am est – 12:15pm est <strong className="font-normal">Q&A</strong>
//           </p>
//           <p className="text-2xl font-semibold text-black mb-4">Only 33 seats</p>
//           <p className="text-2xl font-semibold text-black mb-2">Get Actionable Insights</p>
//           <p className="text-xl font-light mb-8">
//             Register to Ask Jeff what you want to know, get the replay and report – so you don’t
//             miss out.
//           </p>
//         </div> */}

//         <JoinBtn page="/proof">See Jeff's 10X+ Multiple Exit Story</JoinBtn>
//       </div>

//       <div className="max-w-6xl mx-auto text-center mt-20 mb-40">
//         <div className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin mb-16">
//           <h1 className="font-thin">Jeff's dream came true.</h1>
//           <h1 className="font-normal mt-5">How about yours?</h1>
//           <p className="font-linear font-thin text-3xl mt-10">
//             Find out how he and his team did it.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
//           <div className="w-full lg:w-1/2">
//             <img src={WebinarImg} alt="Jeff Cullen and his wife" className="w-full rounded-lg" />
//           </div>

//           <div className="w-full lg:w-1/2 space-y-4 text-sm font-light">
//             <h1 className="text-6xl font-thin">Jeff Cullen</h1>

//             <div className="font-medium text-xl">
//               <p>Canadian Entrepreneur</p>
//               <p>Founder, Former CEO of Rodair</p>
//               <p className="mt-6">
//                 Jeff and his team didn’t just build a company called Rodair —​ they created a
//                 buisness with marketable value —​ driven by
//                 <span className="text-black font-semibold">
//                   {" "}
//                   Prosperity For All <span style={{ fontSize: "1.8rem" }}>™</span>.
//                 </span>
//               </p>
//               <div className="font-semibold text-black">
//                 <p className="mt-6">
//                   Prosperity For All <span style={{ fontSize: "1.8rem" }}>™</span>.
//                 </p>
//                 <p>
//                   This was not a slogan or mission statement. This was the DNA of their business in
//                   6 words or less - also known as their
//                   <span className="text-white"> Unifying Philosophy (UPh ™).</span>
//                 </p>
//               </div>

//               <p className="mt-6">Their UPh powered business was an:</p>
//               <ul style={{ listStyleType: "disc" }} className="ml-6">
//                 <li>Award-winning (multiple business awards)</li>
//                 <li>High-margin (25% higher than industry) </li>
//                 <li>culture-led business (near perfect engagement)</li>
//               </ul>
//               <p>
//                 resulting in a double-digit Multiplier exit that monetized, intangible assets—tax
//                 efficiently.
//               </p>

//               <p className="text-black font-semibold mt-6">
//                 Rodair's Prosperity For All became a world-first: the first UPh operationalized
//                 business that maximized enterprise value via their intangible assets, was remarkably
//                 monetized all tax effectively - creating generational wealth.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Webinar Agenda */}
//       <div className="max-w-6xl mx-auto mt-20 text-center">
//         <div className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin mb-16">
//           <h1 className="font-thin">From dream to done</h1>
//           <h1 className="font-normal mt-5">with 6 words or less.</h1>
//           <p className="font-linear font-thin text-3xl mt-10">Here's What Jeff Did</p>
//         </div>

//         <img src={JetImg} alt="Jeff Cullen" className="w-full h-[734px] rounded-lg object-cover " />

//         <JoinBtn page="/proof">See Jeff's 10X+ Multiple Exit Story</JoinBtn>

//         <div className="text-black text-xl font-semibold text-left">
//           <div className="grid grid-cols-[300px] sm:grid-cols-[300px_300px] place-content-around gap-y-8 mt-14">
//             <div className="w-[300px]">
//               1. The Prosperity Playbook
//               <button
//                 onClick={handleReveal}
//                 className="reveal-btn flex gap-2 text-white font-medium ms-4"
//               >
//                 <CircleArrowDown />
//                 Click to reveal
//               </button>
//               <p className="reveal-para text-white font-medium ms-4 hidden">
//                 The "Prosperity Wheel" aligned incentives, maximized enterprise value, and made
//                 every supplier, investor, staff, and customer a "value growth" engine.
//               </p>
//             </div>
//             <div className="w-[300px]">
//               2. The UPh Story: Prosperity for all
//               <button
//                 onClick={handleReveal}
//                 className="reveal-btn flex gap-2 text-white font-medium ms-4"
//               >
//                 <CircleArrowDown />
//                 Click to reveal
//               </button>
//               <p className="reveal-para text-white font-medium ms-4 hidden">
//                 A meeting in NYC with Fast Company magazine prompted to revisit our DNA and
//                 optimizing it. Why we built it, how we implemented it, and why it worked—financially
//                 and morally.
//               </p>
//             </div>
//             <div className="w-[300px]">
//               3. RODAIR: Before vs. After UPh™
//               <button
//                 onClick={handleReveal}
//                 className="reveal-btn flex gap-2 text-white font-medium ms-4"
//               >
//                 <CircleArrowDown />
//                 Click to reveal
//               </button>
//               <p className="reveal-para text-white font-medium ms-4 hidden">
//                 A founder’s tale of two journeys. I’ll show the 7 game-changing shifts that helped
//                 us grow smarter, exit richer, and live our DNA long after the deal.
//               </p>
//             </div>
//             <div className="w-[300px]">
//               4. Always Buyer Ready
//               <button
//                 onClick={handleReveal}
//                 className="reveal-btn flex gap-2 text-white font-medium ms-4"
//               >
//                 <CircleArrowDown />
//                 Click to reveal
//               </button>
//               <p className="reveal-para text-white font-medium ms-4 hidden">
//                 How we built a company that was buyer ready – making it valuable, higher performing
//                 while reducing buyer risk.
//               </p>
//             </div>
//             <div className="w-[300px]">
//               5. Always Exit Ready
//               <button
//                 onClick={handleReveal}
//                 className="reveal-btn flex gap-2 text-white font-medium ms-4"
//               >
//                 <CircleArrowDown />
//                 Click to reveal
//               </button>
//               <p className="reveal-para text-white font-medium ms-4 hidden">
//                 From day-one we worked hard to be investor-grade –a company that maximized,
//                 marketable, monetizable value. Everything we did financially was reported regularly
//                 and transparently to staff.
//               </p>
//             </div>
//             <div className="w-[300px]">
//               6. Prosperity Post Exit
//               <button
//                 onClick={handleReveal}
//                 className="reveal-btn flex gap-2 text-white font-medium ms-4"
//               >
//                 <CircleArrowDown />
//                 Click to reveal
//               </button>
//               <p className="reveal-para text-white font-medium ms-4 hidden">
//                 The 1.5 Year due diligence was not just about the numbers – we made sure that our
//                 people had a way to prosper post-sale and this helped all of us live with integrity
//                 and pride every day. ​
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const StorySection: React.FC = () => {
  const handleReveal = () => {
    const paragraphs = document.getElementsByClassName("reveal-para");
    const btns = document.getElementsByClassName("reveal-btn");

    for (let i = 0; i < paragraphs.length; i++) {
      const para = paragraphs[i] as HTMLElement;
      const btn = btns[i] as HTMLElement;
      btn.classList.toggle("hidden");
      para.classList.toggle("hidden");
    }
  };

  return (
    <div className="bg-[#757575] text-white py-16 px-4 md:px-8 lg:px-16">
      {/* Top block */}
      <div className="max-w-6xl mx-auto text-center">
        <div className="font-walbaum mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin leading-tight text-[#E4E4E4]">
            Jeff exited with a
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-[#EDEDED] mt-3">
            double-digit multiple valuation.
          </h1>
        </div>

        <p className="font-linear text-base md:text-lg lg:text-xl text-[#E6E6E6]/90 mb-10">
          Find out how he and his team did it — so you can copy what works.
        </p>

        {/* Video block */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={HeroVideo}
                controls
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <JoinBtn page="/proof">See Jeff’s 10X+ Multiple Exit Story</JoinBtn>
        </div>
      </div>

      {/* Jeff section */}
      <div className="max-w-6xl mx-auto mt-20 mb-40">
        <div className="text-center mb-10">
          <h2 className="font-walbaum font-thin leading-tight text-[#EAEAEA] text-4xl md:text-5xl lg:text-6xl">
            Jeff’s dream came true.
          </h2>
          <h3 className="font-walbaum font-normal leading-tight text-[#F0F0F0] text-4xl md:text-5xl lg:text-6xl mt-3">
            How about yours?
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left image */}
          <div className="w-full lg:w-1/2 mt-3 md:mt-4 lg:mt-6">
            <img
              src={WebinarImg}
              alt="Jeff Cullen"
              className="w-full rounded-xl object-cover ransform translate-y-1 md:translate-y-2 lg:translate-y-3"
            />
          </div>

          {/* Right copy */}
          <div className="w-full lg:w-1/2">
            {/* Title matches mock: large, thin serif */}
            <h3 className="font-linear font-thin text-[#E3E3E3] leading-[1.1] text-[44px] md:text-[56px] lg:text-[64px] tracking-[0.01em] mb-4">
  Jeff Cullen
</h3>

            {/* Body: clean sans, high contrast, comfy leading */}
            <div className="font-linear text-[#F2F2F2] text-[17px] md:text-[18px] lg:text-[19px] leading-[1.8] space-y-4">
              <p>Canadian Entrepreneur.</p>
              <p>Founder. Former CEO of Rodair.</p>
              <p>UPh<span style={{ fontSize: "1.8rem" }}>™</span> Global Ambassador</p>

              <p>
                Jeff and his team didn’t just build a company called Rodair — they created a business with marketable value —
                driven by <span className="font-semibold text-white">Prosperity For All<span style={{ fontSize: "1.8rem" }}>™</span> </span>.
              </p>

              <p className="font-semibold text-white">
                Prosperity For All<span style={{ fontSize: "1.8rem" }}>™</span> 
              </p>
              <p>
                This was not a slogan or mission statement. This was the DNA of their business in 6 words or less — also known as their Unifying Philosophy
                (UPh<span style={{ fontSize: "1.8rem" }}>™</span> ).
              </p>

              <p>Their UPh-powered business was an:</p>
              <ul className="list-none space-y-2 pl-0">
                <li>
                  <span className="mr-3 text-white">▪</span>
                  award–winning (multiple business awards)
                </li>
                <li>
                  <span className="mr-3 text-white">▪</span>
                  High–margin (25% higher than industry)
                </li>
                <li>
                  <span className="mr-3 text-white">▪</span>
                  culture–led business (near perfect engagement)
                </li>
              </ul>

              <p>
                resulting in a <span className="font-semibold text-white">double–digit multiplier exit</span> that
                monetized, <span className="font-semibold text-white">intangible assets — tax efficiently</span>.
              </p>

              <p>
                Rodair’s Prosperity For All became a world–first: the first UPh operationalized business that maximized
                enterprise value via their intangible assets.
              </p>

              <p>
                Their UPh<span style={{ fontSize: "1.8rem" }}>™</span>  remarkably monetized these intangible assets all tax effectively —
                creating generational wealth
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin mb-16">
          <h1 className="font-thin">From dream to done</h1>
          <h1 className="font-normal mt-5">with 6 words or less.</h1>
          <p className="font-linear font-thin text-3xl mt-10">Here's What Jeff Did</p>
        </div>

        <img
          src={JetImg}
          alt="Jeff Cullen"
          className="w-full h-[734px] rounded-lg object-cover"
        />

        <JoinBtn page="/proof">See Jeff's 10X+ Multiple Exit Story</JoinBtn>

        <div className="text-black text-xl font-semibold text-left">
          <div className="grid grid-cols-[300px] sm:grid-cols-[300px_300px] place-content-around gap-y-8 mt-14">
            <div className="w-[300px]">
              1. The Prosperity Playbook
              <button
                onClick={handleReveal}
                className="reveal-btn flex gap-2 text-white font-medium ms-4"
              >
                <CircleArrowDown />
                Click to reveal
              </button>
              <p className="reveal-para text-white font-medium ms-4 hidden">
                The "Prosperity Wheel" aligned incentives, maximized enterprise value, and made
                every supplier, investor, staff, and customer a "value growth" engine.
              </p>
            </div>
            <div className="w-[300px]">
              2. The UPh Story: Prosperity for all
              <button
                onClick={handleReveal}
                className="reveal-btn flex gap-2 text-white font-medium ms-4"
              >
                <CircleArrowDown />
                Click to reveal
              </button>
              <p className="reveal-para text-white font-medium ms-4 hidden">
                A meeting in NYC with Fast Company magazine prompted to revisit our DNA and
                optimizing it. Why we built it, how we implemented it, and why it worked—financially
                and morally.
              </p>
            </div>
            <div className="w-[300px]">
              3. RODAIR: Before vs. After UPh™
              <button
                onClick={handleReveal}
                className="reveal-btn flex gap-2 text-white font-medium ms-4"
              >
                <CircleArrowDown />
                Click to reveal
              </button>
              <p className="reveal-para text-white font-medium ms-4 hidden">
                A founder’s tale of two journeys. I’ll show the 7 game-changing shifts that helped
                us grow smarter, exit richer, and live our DNA long after the deal.
              </p>
            </div>
            <div className="w-[300px]">
              4. Always Buyer Ready
              <button
                onClick={handleReveal}
                className="reveal-btn flex gap-2 text-white font-medium ms-4"
              >
                <CircleArrowDown />
                Click to reveal
              </button>
              <p className="reveal-para text-white font-medium ms-4 hidden">
                How we built a company that was buyer ready – making it valuable, higher performing
                while reducing buyer risk.
              </p>
            </div>
            <div className="w-[300px]">
              5. Always Exit Ready
              <button
                onClick={handleReveal}
                className="reveal-btn flex gap-2 text-white font-medium ms-4"
              >
                <CircleArrowDown />
                Click to reveal
              </button>
              <p className="reveal-para text-white font-medium ms-4 hidden">
                From day-one we worked hard to be investor-grade – a company that maximized,
                marketable, monetizable value. Everything we did financially was reported regularly
                and transparently to staff.
              </p>
            </div>
            <div className="w-[300px]">
              6. Prosperity Post Exit
              <button
                onClick={handleReveal}
                className="reveal-btn flex gap-2 text-white font-medium ms-4"
              >
                <CircleArrowDown />
                Click to reveal
              </button>
              <p className="reveal-para text-white font-medium ms-4 hidden">
                The 1.5 year due diligence was not just about the numbers – we made sure that our
                people had a way to prosper post-sale and this helped all of us live with integrity
                and pride every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Index: React.FC = () => {
  const [videos, setVideos] = useState<unknown[]>([]);

  return (
    <div className="relative">
      <HeroSection />
      <StorySection />
    </div>
  );
};

export default Index;
