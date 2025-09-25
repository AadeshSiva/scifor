import VideoPopup from "@/components/video/VideoPopup";
import { useAuth } from "@/utils/AuthContext";
import React, { useState} from "react";
const HeroSection: React.FC = () => {
    const {user} = useAuth()
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
      <h1 className="text-[#818181] font-walbaum text-7xl font-light text-center mt-12 mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
        Welcome {user?.full_name} !
      </h1>  
      <h1 className="text-[#818181] font-walbaum text-7xl font-normal text-center mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
      Jeff’s dream came true-
      </h1>
      <h1 className="text-[#818181] font-walbaum text-7xl font-normal text-center mb-8 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
      with the help of his UPh<span className="font-normal">™</span>:
      </h1>
      <h1 className="text-black font-walbaum text-7xl font-normal text-center mb-28 max-md:text-5xl max-md:mb-5 max-sm:text-4xl max-sm:mb-4">
      Prosperity for all.<span className="font-normal">™</span>
      </h1>
      <p className="text-black text-center text-[28px]  font-normal leading-9 max-w-[800px] mb-3 mx-auto max-md:text-2xl max-md:mb-5 max-sm:text-xl max-sm:mb-4">
      Rhenus acquires ‘Best Managed’ Rodair International
       </p>
      <p className="text-[#818181] text-center text-[28px] font-medium leading-9 max-w-[1200px] mb-3 mx-auto max-md:text-2xl max-md:mb-8 max-sm:text-xl max-sm:mb-6 flex-col">
        <p className="text-lg">TORONTO: March 18, 2019. The Rhenus Group has acquired Canadian logistics company Rodair International subject to</p>
        <p className="mb-3 text-lg">regulatory approval. Terms of the sale were not disclosed.</p>
      </p>
      <div className="flex justify-center py-10 mb-8">
          <button className="bg-black text-white text-lg font-medium py-3 px-14 rounded max-w-2xl w-full text-center hover:bg-gray-800 transition-colors">
          Read Full Article
          </button>
        </div>
    </section>
    );
  };
const StepsSection: React.FC<{ videos?: any[] }> = ({ videos = [] }) => {
    const steps = [
        { id: 1, name: "1. Endgame" },
        { id: 2, name: "2. Valfucturing" },
        { id: 3, name: "3. Scaling" },
        { id: 4, name: "4. Staging" },
        { id: 5, name: "5. Moment(s) of Truth" },
        { id: 6, name: "6. Pride" }
      ];
  return (
    <section className="w-full flex flex-col items-center">
      <div className="bg-white w-screen py-12 ">
        <div className="max-w-4xl mx-auto text-center">
          
          <p className="text-2xl font-light mb-6">
            Jeff didn't just build a profitable company.​
          </p>
          
          <div className="text-teal-600 text-2xl mb-6 ">
            <span className="font-semibold">He built a valuable company.</span> ​<br />
            He made it valuable for the buyer - from day one.​<br />
            That resulted in an astounding <br/>
            <span className="font-semibold">Double-digit multiple exit.</span>
          </div>
          <p className="text-2xl mb-4 font-semibold">
            He maximized value where value matters: ​
            <span className="underline">intangibles</span>.
          </p>
          <p className="text-teal-600 mb-4 text-2xl">
            He made sure that this value was bankable: 
            <span className="underline">monetizing the intangibles.</span>
          </p>
          <p className="text-2xl mb-6 font-semibold">
            He had it all set up for:{" "}
            <span className="underline">maximum after tax value</span>.
          </p>
          <div className="text-2xl leading-8 mb-8">
            <p className="text-teal-600 mb-2">
              Jeff made his dream come true... ​
            </p>
            <p className="mb-2">
              <span className="font-bold">With one asset,</span>
              <span className="font-bold underline"> the UPh</span>
              <span className="font-normal underline">™</span>
              <span className="font-bold">,  the DNA of his business (in 6 words or less)​​</span>
            </p>
            <p className="text-teal-600 mb-2">
            implemented across the business​
            </p>
            <p className="font-bold mb-2">
              tying all intangible assets together​
            </p>
            <p className="text-teal-600">
            And that UPhTM asset being structured tax effectively.
            </p>
          </div>
          <p className="text-black text-3xl font-semibold">
          That’s how we help you win too.        </p>
        </div>
      </div>
      {/* Steps display */}
      <div className="w-full max-w-6xl mx-auto py-10 pt-20">
        <div className="grid grid-cols-3 gap-5 mb-6">
          {steps.slice(0, 3).map((step, index) => (
            <div key={step.id} className="flex flex-col gap-4">
              <div className="bg-[#EDEAEA] py-4 px-6 text-[#555555] text-2xl font-medium text-center">
                {step.name}
              </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe className="w-full h-full" src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-MVK80k4KdY-240p.mp4/ik-video.mp4?updatedAt=1748406580407&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-MVK80k4KdY-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406580407&updatedAt=1748406580407" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
                </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 mb-16">
          {steps.slice(3, 6).map((step, index) => (
            <div key={step.id} className="flex flex-col gap-4">
              <div className="bg-[#EDEAEA] py-4 px-6 text-[#555555] text-2xl font-medium text-center">
                {step.name}
              </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe className="w-full h-full" src="https://imagekit.io/player/embed/je0rl3nnt/63Qa3wVBkJ-MVK80k4KdY-240p.mp4/ik-video.mp4?updatedAt=1748406580407&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fje0rl3nnt%2F63Qa3wVBkJ-MVK80k4KdY-240p.mp4%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1748406580407&updatedAt=1748406580407" title="ImageKit video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"> </iframe>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const CtaSection: React.FC = () => {
  return (
          <section className="bg-white w-full overflow-hidden">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-[#818181] text-center mb-4 font-walbaum">
                <div className="text-6xl">Save your dream now...</div>
              </h2>
              <h3 className="text-[#A71F23] text-6xl mb-12 font-walbaum">
                Or lose it.....forever.
              </h3>
              <p className="text-gray-700 mb-8 text-2xl font-light">
                Congratulations, you have a profitable company. <br />
                Sadly, that's not enough.
              </p>
              <p className="text-[#A71F23] mb-4 text-2xl font-light">
                Is your company valuable – to you or your buyer?
              </p>
              <p className="text-[#A71F23] mb-6 text-2xl font-light">
              How much will you want to exit for ?​
              </p>
              <p className="text-[#A71F23] font-semibold mb-8 text-2xl">
              Will the wealth you keep upon your exit ​<br />
              equal or exceed everything you sacrificed for ​<br/> all those years building your
                business?​
              </p>
              <p className="text-gray-700 mb-12 text-2xl font-light">
              If you are NOT growing to Exit Richer... ​<br />
              what are growing your business for?​
              </p>
            </div>
            <div className="flex justify-center mb-20">
          <button className="bg-black text-white text-lg font-medium py-4 px-16 rounded max-w-2xl w-full text-center hover:bg-gray-800 transition-colors">
          I am ready to JOIN NOW <br />
          <span className="text-lg">(because I refuse to risk everything, I have worked all these years for)</span>
          </button>
        </div>
          </section>
  );
};
const ArticlePage: React.FC = () => {
    const [videos, setVideos] = useState<unknown[]>([]);
    return (
      <div className="">
         <HeroSection />
        <div className=" w-full mx-auto">
          <div className="relative">
            <StepsSection videos={videos} />
            <CtaSection />
          </div>
        </div>
        <VideoPopup videos={videos} />
      </div>
    );
  };
export default ArticlePage;