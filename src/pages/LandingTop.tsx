import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrowDown } from "lucide-react";
import HeroVideo from "/assets/HeroVideo.mp4";
// import StoryVideo from "../../public/assets/Copy of Stage 1 ENDGAME 16_9.mp4";
import JetImg from "../../public/assets/jeff-img.jpg";
import WebinarImg from "../../public/assets/jeff-webinar.jpg";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin text-gray-700 mb-10">
          <div>Your Business Is Profitable -</div>
          <div className="font-normal mt-5">But Is It Truly Valuable?</div>
          <div className=" font-walbaum font-normal text-black mt-5">
            We Can Help You.
          </div>
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* <img
                src="https://placehold.co/600x400"
                alt="A couple"
                className="w-full rounded-lg"
              /> */}
              <video className="rounded-xl" src={HeroVideo} controls></video>
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-left space-y-6 text-xl font-linear font-light text-black">
            <p>
              Welcome to the World's One and Only,
              <br />
              <strong className="font-semibold">Fact-Based Platform</strong> to
              help you build a valuable business - via your most lucrative
              assets, tax effectively.
            </p>
            <p>
              You're winning being profitable - but 84%+ of your business value
              is intangible and is overlooked - every day (by your own people).
            </p>
            <p>
              Start recovering and building that value daily - so that you can
              exit richer at the right time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StorySection: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/pricing-plan");
  };

  return (
    <div className="bg-[#757575] text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin mb-16">
          <h1 className="font-thin">Jeff exited with a</h1>
          <h1 className="font-normal mt-5">double-digit multiple valuation.</h1>
          <p className="font-linear font-thin text-3xl mt-10">
            Find out how he and his team did it.
          </p>
        </div>
<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
  <div className="w-full lg:w-1/2 flex justify-center">
    <div className="relative w-full max-w-lg">
      <div className="relative w-full max-w-lg pb-[100%] rounded-xl overflow-hidden">
        {/* Thumbnail image that fills the square container */}
        <img
          src="https://i.imgur.com/kmZyPld.png"
          alt="Webinar Video Thumbnail"
          className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
        />
        {/* Play button overlay */}
        <button
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1YLoXKNla2Yqr79ZqaHQakk6KDi8aGrYo/view",
              "_blank"
            )
          }
          className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-4xl rounded-xl hover:bg-black/50 transition-colors"
        >
          ▶
        </button>
      </div>
    </div>
  </div>
          <div className="w-full lg:w-1/2 text-left mt-6 lg:mt-0">
            <p className="text-3xl mb-4">
              Your invited to win a chance to meet Jeff Cullen
            </p>
            <p className="text-xl font-light">Wednesday, August 20, 2025</p>
            <p className="text-xl font-light mb-4">
              10am est – 11am est{" "}
              <strong className="font-normal">Success Story</strong>
              <br />
              11:15am est – 12:15pm est{" "}
              <strong className="font-normal">Q&A</strong>
            </p>
            <p className="text-2xl font-semibold text-black mb-4">
              Only 33 seats
            </p>
            <p className="text-2xl font-semibold text-black mb-2">
              Get Actionable Insights
            </p>
            <p className="text-xl font-light mb-8">
              Register to Ask Jeff what you want to know, get the replay and
              report – so you don’t miss out.
            </p>
          </div>
        </div>

        <button
          onClick={handleRegisterClick}
          className="text-xl bg-foreground text-[#DBA958] px-8 py-4 mt-14 font-semibold rounded-lg hover:bg-primary transition-colors duration-300"
        >
          Register For The Webinar
        </button>
      </div>

        {/* Webinar Agenda */}
            {/* <div className="max-w-6xl mx-auto text-center mt-20">
                <div className="text-4xl md:text-5xl lg:text-6xl font-walbaum font-thin mb-16">
                    <h1 className="font-thin">From dream to done</h1>
                    <h1 className="font-normal mt-5">with six words or less.</h1>
                    <p className="font-linear font-thin text-3xl mt-10">
                        Find out how he and his team did it.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
                    <div className="w-full lg:w-1/2">
                        <img src={WebinarImg} alt="Jeff Cullen" className="w-full rounded-lg" />
                    </div>

                    <div className="w-full lg:w-1/2 space-y-4 text-sm font-light">
                        <h1 className="text-6xl font-thin">Webinar Agenda</h1>

                        <div className="text-black text-xl font-semibold">
                            <ol style={{ listStyleType: "decimal" }} className="ml-6">
                                <li className="mb-4">
                                    The Prosperity Playbook{" "}
                                    <button className="flex gap-2 text-white font-medium">
                                        <CircleArrowDown />
                                        Click to reveal
                                    </button>
                                </li>
                                <li className="mb-4">
                                    The UPh Story: Prosperity for all
                                    <button className="flex gap-2 text-white font-medium">
                                        <CircleArrowDown />
                                        Click to reveal
                                    </button>
                                </li>
                                <li className="mb-4">
                                    RODAIR: Before vs. After UPh™
                                    <button className="flex gap-2 text-white font-medium">
                                        <CircleArrowDown />
                                        Click to reveal
                                    </button>
                                </li>
                                <li className="mb-4">
                                    Always Buyer Ready
                                    <button className="flex gap-2 text-white font-medium">
                                        <CircleArrowDown />
                                        Click to reveal
                                    </button>
                                </li>
                                <li className="mb-4">
                                    Always Exit Ready
                                    <button className="flex gap-2 text-white font-medium">
                                        <CircleArrowDown />
                                        Click to reveal
                                    </button>
                                </li>
                                <li className="mb-4">
                                    Prosperity Post Exit
                                    <button className="flex gap-2 text-white font-medium">
                                        <CircleArrowDown />
                                        Click to reveal
                                    </button>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleRegisterClick}
                    className="text-xl bg-foreground text-[#DBA958] px-8 py-4 mt-14 font-semibold rounded-lg hover:bg-primary transition-colors duration-300"
                >
                    Register For The Webinar
                </button>
            </div> */}
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
