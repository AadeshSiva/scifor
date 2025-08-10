
import React from "react";

export default function LandingConfident() {
    return (
        <div>
            <div className="min-h-[70] flex flex-col items-center justify-center bg-white text-center px-4">
                {/* Logo */}
                <img
                    src='../public/assets/logo.jpg'
                    alt="PRSPERA Logo"
                    className="w-40 mb-5"
                />

                {/* Heading */}
                <h1 className="font-walbaum text-[66px] md:text-5xl text-[#0B0B0B] leading-tight max-w-4xl font-light">
                    The One and Only System
                    <br />
                    <span className="font-walbaum text-[60px] text-[#000000] font-[400]">you need for building a business</span>
                    <br />
                    <span className="font-400 font-walbaum text-[60px] text-[#000000] font-[400]">  with MARKETABLE VALUE.</span>
                </h1>

                {/* Subtext */}
                <p className="mt-6 text-extralight-200 text-base md:text-lg font-linear text-[32px] font-[100]">
                    Your Exit Isn’t a Moment. It’s a Strategy.
                    <br />
                    And PRSPERA is Your System.
                </p>

                {/* Learn more link */}
                <a
                    href="#offerings"
                    className="mt-4 text-[#DBA958] font-semibold hover:underline font-linear text-[30px]"
                    onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('offerings');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Click offerings to learn more
                </a>
            </div>

            <div className="mt-20">

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

                <a
                    href="#learn-more"
                    className="mt-8 relative flex items-center justify-between w-full max-w-5xl mx-auto px-8 py-6 border-[3px] border-[#DBA958] rounded-full cursor-pointer"
                >
                    {/* Left circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#FDFAF5]" />

                    {/* Center content */}
                    <div className="text-center px-4">
                        <h2 className="text-lg md:text-xl font-light text-[#595959] tracking-wide font-linear text-[40px]">
                            <span className="font-normal mr-1">1.</span> CONFIDANTE
                        </h2>
                        <p className="text-[#404040] text-sm md:text-base mt-1 font-linear text-[20px] font-[100]">
                            Your FREE, Private and Personal GPT
                            <br />
                            for Closing the Exit Gap
                        </p>
                        <span className="text-[#DBA958] text-sm mt-2 inline-block hover:underline font-linear text-[18px]">
                            Click to learn more
                        </span>
                    </div>

                    {/* Right circle */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#F9F9F9] flex flex-col items-center justify-center text-gray-400 text-lg font-light relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center">
                            <span>68%</span>
                        </div>
                        <div className="w-full h-[8px] bg-white" />
                        <div className="flex-1 flex items-center justify-center">
                            <span>25–40%</span>
                        </div>
                    </div>

                    {/* Bottom arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#DBA958]" />
                </a>

            </div>
        </div>

    );
}


