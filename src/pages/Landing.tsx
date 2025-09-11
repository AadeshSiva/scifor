import { useState } from "react";
import DropdownSection from "./LandingMiddle";
import StorySection from "./LandingTop";
import HomePage from "./HomePage";
import Carousel from "./Carousel";

interface CircleProps {
  number: number;
  title: string;
  active: boolean;
  onClick: () => void;
}

export default function Landing() {
  const [activeCircle, setActiveCircle] = useState<number>(0);

  const circleData = [
    {
      heading: "Win before you begin",
      text: "Design Your Exit Like a Visionary, Not a Victim",
      url: "https://drive.google.com/file/d/1EKMfWT_eiiMl4xLFqQrmEkqa6clGmcug/preview",
    },
    {
      heading: "Monetize the invisible",
      text: "Turn Your Hidden Assets into Transferable Wealth",
      url: "https://drive.google.com/file/d/11btStJ5NAHsFzZUEhUtoEkQpe5rRTSc_/preview",
    },
    {
      heading: "Scale without sacrifice",
      text: "Build a Business That Runs and Grows Without You",
      url: "https://drive.google.com/file/d/14wTGE-ONeOVmRftVSr-dO8aJoiBZTR--/preview",
    },
    {
      heading: "Perform under due diligence",
      text: "Stage Your Business Like a Premium Asset, Not a Project",
      url: "https://drive.google.com/file/d/1Dz1mnzqrDgsrL5He7whpIziGYmc6CnvA/preview",
    },
    {
      heading: "Practice the exit – before it's real",
      text: "Rehearse the Deal So You Win Under Pressure",
      url: "https://drive.google.com/file/d/1d7ew7mXs3c19i4E3J3BndrzMHvfN_i1u/preview",
    },
    {
      heading: "Live a life of Pride not regret",
      text: "Leave a legacy ​of reverence,​not shame​",
      url: "https://drive.google.com/file/d/1x9lQkXldCgzqfWMc91BLVgX0ZFkx4cIq/preview",
    },
  ];

  const stepNames = ["Endgame", "Valufacturing", "Scaling", "Staging", "Moment(s) of Truth", "Pride"];

  return (
    <div className="min-h-screen bg-black">
      {/* Story Section */}
      <StorySection />
      
      {/* 6 Steps Section */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="font-walbaum text-white leading-tight mb-6">
            <span className="block text-4xl md:text-5xl font-light">
              6 Steps to
            </span>
            <span className="block mt-2 text-5xl md:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Grow Smarter + Exit Richer
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            Since 2003, Jeff successfully operationalized the Unifying Philosophy (UPh
            <sup className="text-sm align-super">™</sup>) Strategy System TWICE.
          </p>
        </div>

        {/* Enhanced Circular Layout */}
        <div className="relative flex justify-center items-center mt-8 mb-16">
          <div className="relative w-full max-w-5xl aspect-square">
            {/* Central Content - Larger and more prominent */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-xl text-center transform transition-all duration-500">
                <div className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    STEP {activeCircle + 1}
                  </span>
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">
                  {circleData[activeCircle].heading}
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-6">
                  {circleData[activeCircle].text}
                </p>
                <div className="w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-black">
                  <iframe
                    src={circleData[activeCircle].url}
                    className="w-full h-full"
                    title={circleData[activeCircle].heading}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Navigation Circles - Spread out with larger radius */}
            <div className="absolute inset-0">
              {circleData.map((_, index) => {
                const angle = (index * 60) % 360;
                const radius = 380; // Increased radius for better spacing
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Circle 
                      number={index + 1}
                      title={stepNames[index]}
                      active={activeCircle === index}
                      onClick={() => setActiveCircle(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {circleData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCircle(index)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCircle === index
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {index + 1}. {stepNames[index]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Components */}
      <Carousel />
      <DropdownSection />
      <HomePage />
    </div>
  );
}

function Circle({ number, title, active, onClick }: CircleProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-32 h-32 rounded-full flex flex-col items-center justify-center text-center 
        cursor-pointer transition-all duration-300 transform
        ${active 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-110 ring-4 ring-blue-400 ring-opacity-50" 
          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 border-2 border-gray-600"
        }
      `}
    >
      <span className="text-2xl font-bold mb-1">{number}.</span>
      <span className="text-xs font-medium leading-tight px-2">{title}</span>
    </button>
  );
}