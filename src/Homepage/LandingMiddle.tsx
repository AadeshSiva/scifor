import PyramidDiagram from "../../public/assets/pyramid-diagram.png";
import { Check, X } from "lucide-react";
import React from "react";

type DropdownProps = {
  id: number;
};
const Dropdown: React.FC<DropdownProps> = ({ id }) => {
  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const content = document.getElementById(`content-${e.currentTarget.id}`);
    content?.classList.toggle("hidden");
  };
  return (
    <div
      id={`${id}`}
      onClick={(e) => handleExpand(e)}
      style={{ borderRadius: "100px" }}
      className="mt-8 relative w-full max-w-3xl mx-auto border-[3px] border-[#DBA958] cursor-pointer"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 my-4 sm:my-6">
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#FDFAF5]" />
        <div className="text-center px-2 sm:px-4 flex-1">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-[#595959] tracking-wide font-linear">
            <span className="font-normal mr-1">{id}.</span> CONFIDANTE
          </h2>
          <p className="text-[#404040] text-xs sm:text-sm md:text-base mt-1 font-linear font-thin">
            Your FREE, Private and Personal GPT
            <br />
            for Closing the Exit Gap
          </p>
          <span className="text-[#DBA958] text-xs sm:text-sm mt-2 inline-block hover:underline font-linear">
            Click to learn more
          </span>
        </div>
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-sm sm:text-base md:text-lg font-light relative overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <span>68%</span>
          </div>
          <div className="w-full h-[6px] sm:h-[8px] bg-white" />
          <div className="flex-1 flex items-center justify-center">
            <span className="text-xs sm:text-sm md:text-base">25-40%</span>
          </div>
        </div>
        <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] sm:border-l-[12px] border-r-[10px] sm:border-r-[12px] border-t-[14px] sm:border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
      </div>
      <div
        id={`content-${id}`}
        className="bg-gradient-to-b from-gray-200 to-transparent w-full mt-8 sm:mt-10 px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 hidden flex flex-col"
      >
        <img
          src={PyramidDiagram}
          alt="Pyramid Diagram"
          className="w-full max-w-md mx-auto"
        />

        <p className="font-thin text-lg sm:text-xl mt-6 sm:mt-8">
          This is your personal AI advisory layer — designed to learn your
          business, your tone, and your needs over time - and no one else will
          ever know.
        </p>
        <p className="font-thin text-lg sm:text-xl mt-6 sm:mt-8">
          It answers hard questions. It escalates when needed. It thinks with
          you. And unlike ChatGPT… it's yours. No one else can ever see your
          thoughts.
        </p>
        <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 text-base sm:text-lg gap-4 sm:gap-0">
          <div className="w-full sm:w-1/2 bg-white p-4 sm:p-6 text-gray-600 font-thin">
            <h1 className="text-black font-semibold">DO THIS</h1>

            <div className="flex gap-2 mt-4">
              <Check className="flex-shrink-0 mt-1" />
              <span>It gets smarter the more you see it.</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Check className="flex-shrink-0 mt-1" />
              <span>You stop wasting time looking for insight</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Check className="flex-shrink-0 mt-1" />
              <span>It connects dots across your tools, data, and docs</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Check className="flex-shrink-0 mt-1" />
              <span>If it can't help, we send a human who can</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Check className="flex-shrink-0 mt-1" />
              <span>It's not a chatbot. It's a thought partner</span>
            </div>
          </div>
          <div className="w-full sm:w-1/2 bg-pink-100 p-4 sm:p-6 text-pink-600 font-thin">
            <h1 className="text-pink-950 font-semibold">DON'T DO THIS</h1>
            <div className="flex gap-2 mt-4">
              <X className="flex-shrink-0 mt-1" />
              <span>You'll keep bottlenecking decisions.</span>
            </div>
            <div className="flex gap-2 mt-4">
              <X className="flex-shrink-0 mt-1" />
              <span>You'll overpay for slow advice</span>
            </div>
            <div className="flex gap-2 mt-4">
              <X className="flex-shrink-0 mt-1" />
              <span>You'll miss chances to act quickly and win</span>
            </div>
            <div className="flex gap-2 mt-4">
              <X className="flex-shrink-0 mt-1" />
              <span>You'll treat strategy like a task — not a muscle</span>
            </div>
            <div className="flex gap-2 mt-4">
              <X className="flex-shrink-0 mt-1" />
              <span>
                You'll stay reactive when you could be radically proactive​
              </span>
            </div>
          </div>
        </div>
        <p className="font-thin text-lg sm:text-xl mt-6 sm:mt-8">
          Log into <span className="font-semibold">mivalua</span>™ - your
          personal AI strategy GPT now. No consultants. No sales pitch. Just you
          and clarity — 24/7. Close your Exit Gap, privately, personally for
          FREE.
        </p>
        <button className="mx-auto text-lg sm:text-xl bg-black text-[#DBA958] px-6 sm:px-8 py-3 sm:py-4 mt-10 sm:mt-14 font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300">
          Register For The Webinar
        </button>
      </div>
    </div>
  );
};
const Index: React.FC = () => {
  return (
    <div className="relative">
      <Dropdown id={0} />
    </div>
  );
};
export default Dropdown;
