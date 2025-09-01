import React, { ReactNode, useState, useEffect, CSSProperties, useLayoutEffect } from "react";
import { Footer } from "@/components/Footer";
import JoinBtn from "@/components/JoinBtn";

interface TooltipItemProps {
  children: ReactNode;
}

interface TooltipItemProps {
  children: ReactNode;
}

const TooltipItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start relative">
      <div className="group relative w-5 h-5 bg-[#A4A4A4] rounded-full mt-1 mr-4 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold cursor-pointer font-linear">
        i{/* Tooltip */}
        <div className="absolute top-full left-0 mt-2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div className="relative drop-shadow-lg">
            <div className="bg-[#595959] text-white px-5 py-3 rounded-sm whitespace-nowrap font-thin">
              This synchronizes the business system – people, process, tech.
            </div>

            {/* Triangle*/}
            <div
              className="absolute left-4 -top-[19px] w-5 h-5 bg-[#595959]"
              style={{
                clipPath: "polygon(0% 100%, 100% 100%, 0% 0%)",
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-xl font-light font-linear leading-relaxed">{children}</p>
    </div>
  );
};
const ProofPage: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  // useLayoutEffect to prevent scroll animation
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);


  const jeffSectionStyle: CSSProperties = {
    width: "961px",
    height: "283px",
    maxWidth: "100%",
    textAlign: "center",
  };

  // return (
  //   <>
  //     {/* First Section - Undeniable Proof of Success */}
  //     <div className="bg-gray-100 w-full">
  //       <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24">
  //         <div className="max-w-7xl mx-auto text-center">
  //           <h1 className="text-3xl md:text-4xl lg:text-5xl font-walbaum font-light text-gray-800 mb-3">
  //             Undeniable Proof
  //           </h1>
  //           <h2 className="text-3xl md:text-4xl lg:text-5xl font-Bold font-walbaum text-gray-800 mb-6">
  //             of Success.
  //           </h2>
  //           <p className=" text-gray-600 text-xl md:text-xl font-walbaum mb-12">
  //             Jeff's success is a template for your success.
  //           </p>
  //           <div className="flex items-center justify-center bg-gray-100">
  //             <div className="w-full lg:w-1/2 flex justify-center">
  //               <div className="relative w-full max-w-lg">
  //                 <div className="relative w-full max-w-lg pb-[100%] rounded-xl overflow-hidden">
  {/* Thumbnail image that fills the square container */ }
  {/* <img
                      src="https://i.imgur.com/kmZyPld.png"
                      alt="Webinar Video Thumbnail"
                      className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
                    />

                  
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
                  </div> */}


  {/* 
                  <JoinBtn page="/pricing-plan">JOIN PRSPERA</JoinBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
              <div className="w-full lg:w-3/4 flex justify-center">
                <div className="relative w-full max-w-3xl">
                  <div className="relative w-full max-w-3xl pb-[56.25%] rounded-xl overflow-hidden">
                    {!showVideo ? (
                      // Thumbnail with play button
                      <>
                        <img
                          src="/assets/ProofThumbnail.png" 
                          alt="Video Thumbnail"
                          className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
                        />
                        {/* Play Button Overlay */}
                        <button
                          //     onClick={() => setShowVideo(true)}
                          //     className="absolute inset-0 flex items-center justify-center"
                          //   >
                          //     <div className="w-14 h-14 bg-black bg-opacity-60 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all">
                          //       <svg
                          //         xmlns="http://www.w3.org/2000/svg"
                          //         className="h-12 w-12 text-white"
                          //         fill="currentColor"
                          //         viewBox="0 0 24 24"
                          //       >
                          //         <path d="M8 5v14l11-7z" />
                          //       </svg>
                          //     </div>
                          //   </button>
                          // </>
                          onClick={() => {
                            // Open OneDrive video in new tab instead of embedding, Remove the below code and uncomment the above code  when embedding video.
                            window.open("https://1drv.ms/v/c/b10a5de209baeefa/EYkSisNJTclIqUvXmKdyq9kBAZEgeLGNUxfJzeWbQ_PfIQ", "_blank");
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-14 h-14 bg-black bg-opacity-60 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all">
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
                      </>
                    ) : (
                      // Video iframe
                      <iframe
                        src="https://onedrive.live.com/embed?cid=b10a5de209baeefa&resid=b10a5de209baeefa%21108&authkey=AKlL1xilSU2pS9c&em=2&wdAr=1.7777777777777777" //since the one drive link is not working we need to replace it with Gdrive link.
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        allow="autoplay"
                        title="Jeff's Success Story Video"
                      ></iframe>
                    )}
                  </div>

                  <JoinBtn page="/pricing-plan">JOIN PRSPERA</JoinBtn>
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
                <h3 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-thin">
                  Jeff built and sold
                </h3>
                <h3 className="text-xl md:text-3xl lg:text-4xl font-light mb-3">
                  <span className="text-xl md:text-3xl lg:text-4xl font-walbaum font-normal ">
                    2 valuable companies
                  </span>
                </h3>
                <h3 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-extralight">
                  using a Unifying Philosophy (UPh™)
                </h3>
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
              <TooltipItem>the DNA of a business in 6 words or less</TooltipItem>

              <TooltipItem>built with your people and our UPh Team</TooltipItem>

              <TooltipItem>created in 5 stages over 3-9 months</TooltipItem>

              <TooltipItem>Trademarked</TooltipItem>

              <TooltipItem>Placed in a tax effective structure</TooltipItem>

              <TooltipItem>The foundation for a performance based culture</TooltipItem>

              <TooltipItem>
                Made operational on a daily basis by all vendors, all people, customers (connects
                all value drivers and maximizes their value)
              </TooltipItem>

              <TooltipItem>
                Maximizes, measurable value = enhancing valuation multiplier (as it streamlines
                efficiencies and enhances profitability)
              </TooltipItem>

              <TooltipItem>
                Sold at a premium as an operational asset (rather than staffing an exit thereby
                monetizing the intangible assets)
              </TooltipItem>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProofPage;
