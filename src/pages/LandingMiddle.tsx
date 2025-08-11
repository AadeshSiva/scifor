import React from "react";

interface OfferingItem {
  number: string;
  title: string;
  description: string;
  leftCircleColor: string;
  stats: {
    top: string;
    bottom: string;
  };
}

const LandingConfident: React.FC = () => {
  // Data for the offerings
  const offerings: OfferingItem[] = [
    {
      number: "1",
      title: "CONFIDANTE",
      description: "Your FREE, Private and Personal GPT\nfor Closing the Exit Gap",
      leftCircleColor: "#FDFAF5",
      stats: { top: "68%", bottom: "25–40%" }
    },
  ];

  // Fill array with 12 items
  const allOfferings = Array(12).fill(offerings[0]).map((item, index) => ({
    ...item,
    number: (index + 1).toString()
  }));

  const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('offerings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-4 py-8 sm:py-12 md:py-16">
        {/* Logo */}
        <img
          src="/assets/logo.jpg"
          alt="PRSPERA Logo"
          className="w-24 sm:w-32 md:w-40 mb-4 sm:mb-5 h-auto"
        />

        {/* Heading */}
        <h1 className="w-full max-w-4xl mx-auto">
          <span className="block font-walbaum text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[66px] text-[#0B0B0B] leading-tight font-light">
            The One and Only System
          </span>
          <span className="block font-walbaum text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[60px] text-[#000000] font-normal mt-2 sm:mt-3 md:mt-4">
            you need for building a business
          </span>
          <span className="block font-walbaum text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[60px] text-[#000000] font-normal mt-1 sm:mt-2">
            with MARKETABLE VALUE.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-[32px] font-linear font-thin max-w-2xl mx-auto px-4">
          Your Exit Isn't a Moment. It's a Strategy.
          <br />
          And PRSPERA is Your System.
        </p>

        {/* Learn more link */}
        <a
          href="#offerings"
          className="mt-4 sm:mt-6 text-[#DBA958] font-semibold hover:underline font-linear text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[30px] transition-all duration-300 hover:scale-105 inline-block"
          onClick={handleLearnMoreClick}
        >
          Click offerings to learn more
        </a>
      </div>

      {/* Offerings Section */}
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {allOfferings.map((offering, index) => (
            <OfferingCard key={index} offering={offering} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface OfferingCardProps {
  offering: OfferingItem;
}

const OfferingCard: React.FC<OfferingCardProps> = ({ offering }) => {
  return (
    <a
      href="#learn-more"
      className="mt-4 sm:mt-6 md:mt-8 relative flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mx-auto p-4 sm:p-5 md:p-6 lg:px-8 lg:py-6 border-2 sm:border-[3px] border-[#DBA958] rounded-2xl sm:rounded-3xl md:rounded-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {/* Left circle */}
      <div 
        className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mb-4 sm:mb-0"
        style={{ 
          backgroundColor: offering.leftCircleColor,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />

      {/* Center content */}
      <div className="text-center sm:text-left md:text-center px-2 sm:px-3 md:px-4 flex-1 max-w-full sm:max-w-[60%] md:max-w-none">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-light text-[#595959] tracking-wide font-linear break-words">
          <span className="font-normal mr-1">{offering.number}.</span> 
          <span className="inline-block">{offering.title}</span>
        </h2>
        <p className="text-[#404040] text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] mt-1 sm:mt-2 font-linear font-thin whitespace-pre-line leading-relaxed">
          {offering.description}
        </p>
        <span className="text-[#DBA958] text-xs sm:text-sm md:text-base lg:text-[18px] mt-2 inline-block hover:underline font-linear group-hover:scale-105 transition-transform duration-300">
          Click to learn more
        </span>
      </div>

      {/* Right circle with stats */}
      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light relative overflow-hidden mt-4 sm:mt-0"
        style={{
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
        }}
      >
        <div className="flex-1 flex items-center justify-center">
          <span>{offering.stats.top}</span>
        </div>
        <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white" />
        <div className="flex-1 flex items-center justify-center">
          <span>{offering.stats.bottom}</span>
        </div>
      </div>

      {/* Bottom arrow - hidden on mobile */}
      <div className="hidden sm:block absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] sm:border-l-[12px] border-r-[10px] sm:border-r-[12px] border-t-[14px] sm:border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
    </a>
  );
};

export default LandingConfident;