import { useState } from "react";
import Landingpart from "./LandingMiddle.jsx";
import StorySection from "./LandingTop.tsx";
import Carousel from "./Carousel.tsx";
interface CircleProps {
  text: string;
  active: boolean;
}

export default function Landing() {
  const [circleinfo, setCircleinfo] = useState<number>(0);

  const circleinfodata = [
    {
      heading: "Win before you begin",
      text: "Design Your Exit Like a Visionary, Not a Victim",
      Url: "https://drive.google.com/file/d/1EKMfWT_eiiMl4xLFqQrmEkqa6clGmcug/preview",
    },
    {
      heading: "Monetize the invisible",
      text: "Turn Your Hidden Assets into Transferable Wealth",
      Url: "https://drive.google.com/file/d/11btStJ5NAHsFzZUEhUtoEkQpe5rRTSc_/preview",
    },
    {
      heading: "Scale without sacrifice",
      text: "Build a Business That Runs and Grows Without You",
      Url: "https://drive.google.com/file/d/14wTGE-ONeOVmRftVSr-dO8aJoiBZTR--/preview",
    },
    {
      heading: "Perform under due diligence",
      text: "Stage Your Business Like a Premium Asset, Not a Project",
      Url: "https://drive.google.com/file/d/1Dz1mnzqrDgsrL5He7whpIziGYmc6CnvA/preview",
    },
    {
      heading: "Practice the exit – before it’s real",
      text: "Rehearse the Deal So You Win Under Pressure",
      Url: "https://drive.google.com/file/d/1d7ew7mXs3c19i4E3J3BndrzMHvfN_i1u/preview",
    },
    {
      heading: "Live a life of Pride not regret",
      text: "Leave a legacy ​of reverence,​not shame​",
      Url: "https://drive.google.com/file/d/1x9lQkXldCgzqfWMc91BLVgX0ZFkx4cIq/preview",
    },
  ];

  return (
    <>
      <StorySection />
      <section className="w-full p-4 py-8 bg-black flex flex-col items-center gap-5">
        <p className="text-center text-white text-2xl md:text-3xl font-walbaum leading-snug">
          6 Steps to <br />
          Grow Smarter + Exit Richer
        </p>

        <p className="text-center text-white text-sm md:text-base max-w-[90%] md:max-w-[40%] font-light leading-relaxed">
          Since 2003, Jeff successfully operationalized the Unifying Philosophy
          (UPhTM) <br />
          Strategy System TWICE.
          <br />
          His 20+ year journey inspired our 6 Step Course for entrepreneurs to
          Grow Smarter to Exit Richer. My interview with him captures his story
          in the context of these 6 Steps.
        </p>

        <div className="flex justify-center items-center text-white p-8">
          <div className="relative w-[80vw] max-w-[400px] aspect-square bg-white rounded-full flex justify-center items-center">
            <div className="absolute flex flex-col items-center text-center px-4">
              <p className="text-black font-semibold text-sm mb-2">
                {circleinfodata[circleinfo].heading}
              </p>
              <p className="text-black text-xs sm:text-xs mb-4">
                {circleinfodata[circleinfo].text}
              </p>
              <div className="w-40 h-24 sm:w-56 sm:h-32 mt-2">
                <iframe
                  src={circleinfodata[circleinfo].Url}
                  className="w-full h-full rounded-lg border border-gray-300"
                  title={circleinfodata[circleinfo].heading}
                ></iframe>
              </div>
            </div>

            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              onClick={() => setCircleinfo(0)}
            >
              <Circle text="1. Endgame" active={circleinfo === 0} />
            </div>
            <div
              className="absolute top-[15%] -right-8"
              onClick={() => setCircleinfo(1)}
            >
              <Circle text="2. Valufacturing" active={circleinfo === 1} />
            </div>
            <div
              className="absolute bottom-[15%] -right-8"
              onClick={() => setCircleinfo(2)}
            >
              <Circle text="3. Scaling" active={circleinfo === 2} />
            </div>
            <div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              onClick={() => setCircleinfo(3)}
            >
              <Circle text="4. Staging" active={circleinfo === 3} />
            </div>
            <div
              className="absolute bottom-[15%] -left-8"
              onClick={() => setCircleinfo(4)}
            >
              <Circle text="5. Moment(s) of Truth" active={circleinfo === 4} />
            </div>
            <div
              className="absolute top-[15%] -left-8"
              onClick={() => setCircleinfo(5)}
            >
              <Circle text="6. Pride" active={circleinfo === 5} />
            </div>
          </div>
        </div>
      </section>
      <Carousel />
      <Landingpart />
    </>
  );
}

function Circle({ text, active }: CircleProps) {
  return (
    <div
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex justify-center items-center text-center text-white text-xs sm:text-sm p-2 cursor-pointer transition-colors duration-200
      ${
        active
          ? "bg-yellow-500 text-black shadow-lg scale-110"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
    >
      {text}
    </div>
  );
}
