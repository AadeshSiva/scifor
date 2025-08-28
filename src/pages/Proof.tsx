import React, { ReactNode, useState, useEffect, CSSProperties } from 'react';
import { HiOutlineMail } from 'react-icons/hi';

interface TooltipItemProps {
    children: ReactNode;
}

const TooltipItem = ({ children }: TooltipItemProps) => {

    return (
        <div className="flex items-start relative group">
            <div className="w-5 h-5 bg-[#A4A4A4] rounded-full mt-1 mr-4 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                i
            </div>
            <p className="text-xl font-light font-linear leading-relaxed" >
                {children}
            </p>
            <div className="absolute left-0 -top-20 bg-[#7E7E7E] text-white px-6 py-4 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 w-96 shadow-xl pointer-events-none">
                <div className="relative">
                    <p className="ext-xl font-semibold font-linear text-white leading-relaxed" >
                        This synchronizes the business system – people, process, tech.
                    </p>
                    <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-700"></div>
                </div>
            </div>
        </div>
    );
};

// Footer Section
const Footer: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = (): void => setWindowWidth(window.innerWidth);
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const footerContainerStyle: CSSProperties = {
        height: windowWidth < 768 ? "500px" : "420px",
    };

    const taglineStyle: CSSProperties = {
        marginTop: "25px",
        fontSize: windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
        fontWeight: "300",
        lineHeight: windowWidth < 640 ? "28px" : windowWidth < 768 ? "32px" : "36px",
    };

    const linkStyle: CSSProperties = {
        fontSize: windowWidth < 640 ? "14px" : "16px",
    };

    return (
        <footer className="bg-black text-white w-full" style={footerContainerStyle}>
            <div className="w-full h-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto h-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 h-full">
                        {/* First Column - Logo and Tagline */}
                        <div className="flex flex-col justify-start items-start">
                            {/* Logo */}
                            <div className="mb-6 sm:mb-8 md:mb-12">
                                <img
                                    src="assets/Logo.svg"
                                    alt="PRSPERA Logo"
                                    className="h-6 sm:h-7 md:h-8 w-auto"
                                />
                            </div>

                            {/* Tagline */}
                            <h2 className="leading-tight text-left mb-6" style={taglineStyle}>
                                Grow Smarter. <span className="font-bold">Exit Richer</span>
                                <sup className="text-xs sm:text-lg md:text-xl">™</sup>
                            </h2>

                            {/* Address */}
                            <div className="text-gray-400 text-sm mb-4 leading-relaxed">
                                <p>99 Lamp Crescent</p>
                                <p>Vaughan Ontario</p>
                                <p>Canada</p>
                                <p>L4L 6J6</p>
                            </div>

                            <div>
                                <p className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">+1-416-919-1830</p>
                            </div>

                            {/* Email with Icon */}
                            <div className="flex items-center">
                                <br /><br />
                                <HiOutlineMail className="w-4 h-4 mr-2 text-gray-400" />

                                <a
                                    href="mailto:Prosper@prspera.com"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Prosper@prspera.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const ProofSections: React.FC = () => {

    const jeffSectionStyle: CSSProperties = {
        width: '961px',
        height: '283px',
        maxWidth: '100%',
        textAlign: 'center'
    };

    return (
        <>
            {/* First Section - Undeniable Proof of Success */}
            <div className="bg-gray-100 w-full">
                <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-walbaum font-light text-gray-800 mb-3">
                            Undeniable Proof
                        </h1>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-Bold font-walbaum text-gray-800 mb-6">
                            of Success.
                        </h2>
                        <p className=" text-gray-600 text-xl md:text-xl font-walbaum mb-12">
                            Jeff's success is a template for your success.
                        </p>
                        <div className="flex items-center justify-center bg-gray-100">
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <div className="relative w-full max-w-lg">
                                    <div className="relative w-full max-w-lg">
                                        <div className="relative w-full max-w-lg pb-[100%] rounded-xl overflow-hidden">
                                            {/* Thumbnail image that fills the square container */}
                                            <img
                                                src="https://i.imgur.com/kmZyPld.png"
                                                alt="Webinar Video Thumbnail"
                                                className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
                                            />

                                            {/* Play Button Overlay */}
                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        "https://1drv.ms/v/c/b10a5de209baeefa/EYkSisNJTclIqUvXmKdyq9kBAZEgeLGNUxfJzeWbQ_PfIQ",
                                                        "_blank"
                                                    )
                                                }
                                                className="absolute inset-0 flex items-center justify-center"
                                            >
                                                <div className="w-14 h-14 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-12 w-12 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Second Section - U-Ph Philosophy */}
            <div className="bg-[#7E7E7E] w-full">
                <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            {/* Jeff built and sold section with specific dimensions */}
                            <div className="mx-auto" style={jeffSectionStyle}>
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-thin">Jeff built and sold</h3>
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-light mb-3">
                                    <span className="text-xl md:text-3xl lg:text-4xl font-walbaum font-normal ">2 valuable companies</span>
                                </h3>
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-extralight">using a Unifying Philosophy (UPh™)</h3>
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-normal">twice.</h3>
                            </div>

                            <h4 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-extralight mb-8">
                                What is a Unifying Philosophy (UPh)?
                            </h4>
                            <p className="text-lg  text-left md:text-xl lg:text-2xl font-linear font-thin leading-relaxed px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                                The UPh is:
                            </p>
                        </div>

                        {/* Philosophy Points */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            <TooltipItem>
                                the DNA of a business in 6 words or less
                            </TooltipItem>

                            <TooltipItem>
                                built with your people and our UPh Team
                            </TooltipItem>

                            <TooltipItem>
                                created in 5 stages over 3-9 months
                            </TooltipItem>

                            <TooltipItem>
                                Trademarked
                            </TooltipItem>

                            <TooltipItem>
                                Placed in a tax effective structure
                            </TooltipItem>

                            <TooltipItem>
                                The foundation for a performance based culture
                            </TooltipItem>

                            <TooltipItem>
                                Made operational on a daily basis by all vendors, all people, customers (connects all value drivers and maximizes their value)
                            </TooltipItem>

                            <TooltipItem>
                                Maximizes, measurable value = enhancing valuation multiplier (as it streamlines efficiencies and enhances profitability)
                            </TooltipItem>

                            <TooltipItem>
                                Sold at a premium as an operational asset (rather than staffing an exit thereby monetizing the intangible assets)
                            </TooltipItem>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProofSections;