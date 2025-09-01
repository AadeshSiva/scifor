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

      {/* Third section-The Unifying Philosophy Works */}

      <div className="mx-auto text-center text-white bg-[#474646] py-12 px-6">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-thin mb-2">
          The Unifying Philosophy Works
        </h2>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-walbaum font-thin mb-4">
          Unlike Anything Else In The World
        </h2>
        <h3 className="text-xl md:text-3xl lg:text-3xl font-walbaum font-semibold mb-2 mt-6">
          Here’s more proof.
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl font-linear font-light mb-8">
          Financial. Academic. Scientific.
        </p>

        {/* Content */}
        <div className="text-left max-w-4xl mx-auto space-y-6 mt-20">
          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            1. In 1996, the Unifying Philosophy ( UPh<sup>TM</sup> ) is
            Founded by Harish Chauhan – engineered from basic principles and systems theory.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            a) The first UPh, Quality to Life your Profits, helped the largest, privately owned,
            family business compete against Toyota. Even though Toyota is world class in Quality – they
            could not claim – creating profits for its customers like this company could. It’s now <b>2025</b>,
            that family business has now survived its first succession and is still in business.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            b) The genesis of the UPh was that Mission, Vision and Values as a standard for is flawed –
            because its not what employees live and apply every day in the business. Neither does it
            explicitly make money. They are not business assets.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            c) Business are systems. This was first introduced by Ludwig von Bertalanffy (1940s–1950s) in
            his General System Theory (GST). Now, as an engineer, founder Harish Chauhan states – every
            system has one thing that synchronizes each part of that system to work together – without the
            synchronizer the systems is dysfunctional:
          </p>

          {/* First Table */}
          <div className="overflow-x-auto">
            <table className="w-[700px] mx-auto border-[2px] border-[#FFFFFF] text-center text-md md:text-lg lg:text-xl">
              <thead>
                <tr className="bg-[#868686] text-white">
                  <th className="border-[2px] border-[#FFFFFF] px-4 py-3">System</th>
                  <th className="border-[2px] border-[#FFFFFF] px-4 py-3">Synchronizer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">Human Body</td>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">DNA</td>
                </tr>
                <tr>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">
                    Computer – Motherboard / each Integrated Circuit
                  </td>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">Crystal</td>
                </tr>
                <tr>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">Car Motor</td>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">Timing Belt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-md md:text-lg lg:text-xl font-linear font-light mt-8 leading-relaxed">
            i. What synchronizes the business system? The CEO, the balance sheet, profits,
            cashflow, the mission, vision and values? Have any of these made companies perform
            given these 6 facts. There’s no proof any of these work to synchronize the entire
            business system.
          </p>

          {/* Second Table */}
          <div className="overflow-x-auto">
            <table className="w-[700px] mx-auto border-[2px] border-[#FFFFFF] text-center text-md md:text-lg lg:text-xl">
              <thead>
                <tr className="bg-[#868686] text-white">
                  <th className="border-[2px] border-[#FFFFFF] px-4 py-3">System</th>
                  <th className="border-[2px] border-[#FFFFFF] px-4 py-3">Synchronizer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">Business</td>
                  <td className="border-[2px] border-[#FFFFFF] px-4 py-3">Unifying Philosophy (UPh)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-md md:text-lg lg:text-xl mt-8 font-linear font-light leading-relaxed">
            2. In 2006, Dr. Michael Meeks, Professor of Entrepreneurship and Strategic
            Management interviewed several UPh Clients, physically and virtually, using a Grounded
            Theory Approach. He, spontaneously, asked to interrupt Harish’s presentation at the
            Family Firm Institute (ffi.org) global conference to talk about his two research findings
            about the UPh: (video)
          </p>

          <ol className="list-[lower-roman] ml-16 space-y-5 text-md md:text-lg lg:text-xl font-linear font-light">
            <li>Everyone is on the same page</li>
            <li>Everyone is going in the same direction</li>
          </ol>

          <p className="space-y-5 text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed ml-14 mt-4">
            This proves the UPh synchronizes the business system.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            3. In 2001, Jim Collins publishes “Good to Great”. With 10,000+ hours of PhD
            research, he declares that his Unifying Principle (Hedgehog Concept – Chapter 5) helps build
            Great Companies. The Unifying Philosophy is both an internal transformation process
            (proprietary Change Management System), as well as a product – a trademarked asset of 6
            words or less, structured tax effectively.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            4. In 2005, Harish Chauhan published Unconventional Business – challenging the status quo:
          </p>

          <ol className="list-none ml-16 space-y-2 text-md md:text-lg lg:text-xl font-linear font-light">
            <li>a) Business NOT JUST about Profits.</li>
            <li>b) The Customer is NOT #1.</li>
            <li>c) Taglines DON’T work.</li>
          </ol>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed ml-16 mt-4">
            For the answers, click here and download the book. It’s our gift to you.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            5. In 2009, Simon Sinek publishes “Start With Why”. While he discusses one (1 why)
            the UPh involves “3 Why’s” and classifies and organizes them into your UPh to build a lasting
            DNA that aligns everyone stakeholder – in and outside the business. The “3 Why’s” are in
            business:
          </p>

          <ol className="list-none ml-16 space-y-2 text-md md:text-lg lg:text-xl font-linear font-light">
            <li>a)  To make a ton of money</li>
            <li>b)  make a difference in the industry</li>
            <li>c)  make a difference in the world</li>
          </ol>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            6. From 1996 – 2012, dozens of entrepreneurs who have had varying degrees of measurable success based on how well they operationalized this DNA in their business. One landmark UPh client, a Foodservice Bakery, was reported to have 250% EBITDA growth as a result of their UPh, “Freshness On Time”. This case study was authored by Sean Cavanagh, CPA, CA, CF, CBV in Peter Merrick’s Book T.A.S.K. and A.S.K. – download the pdf chapter here; case study here.
          </p>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            7. In 2019, Jeff Cullen successfully exited his 300+ person 3PL
            company with double–digit multiple valuation. In a world where 80% of businesses don’t sell,
            and only 6% get fair market value – his exit was nothing short of remarkable – it’s rare.
            Let’s rewind and review his timeline:
          </p>

          <div className="ml-6 space-y-6">
            <div>
              <p className="text-md md:text-lg lg:text-xl font-linear font-light">1996: Jeff founded RODAIR</p>
              <ul className="list-none ml-8 mt-2 space-y-2 text-md md:text-lg lg:text-xl font-linear font-light">
                <li>§ His business plan and exit strategy was clear as day – build to $100Million and sell</li>
                <li>§ He implemented profit sharing from day one</li>
              </ul>
            </div>

            <div>
              <p className="text-md md:text-lg lg:text-xl font-linear font-light">2002: RODAIR grows to $80M in annual revenues</p>
              <ul className="list-none ml-8 mt-2 space-y-2 text-md md:text-lg lg:text-xl font-linear font-light">
                <li>§ Prior to a merger with Bellville, another collaborative 3PL company</li>
                <li>§ At an Innovators Alliance workshop, Jeff sits in the front row of the presentation
                  on the UPh by Harish and asks him: “Does the UPh operationalize the Brand?”</li>
                <li>§ He implemented profit sharing from day one</li>
              </ul>
            </div>
          </div>

          <p className="text-md md:text-lg lg:text-xl font-linear font-light leading-relaxed">
            8. How we define WINNING in Business: maximizing, monetizable value – tax
            effectively for all invested – by creating a Unifying Philosophy (UPh<sup>TM</sup>): Prosperity
            For All. The financial proof of success is: an exit with double–digit multiple valuation. And
            the best part for his people was that he invested 18+ months ensuring that the strategic buyer
            will look after his people post acquisition. Jeff now is able to live with pride and integrity
            knowing that his people have even more Prosperity For All working within a global conglomerate
            with expansive growth potential.
          </p>

          {/* Button */}
          <JoinBtn page="/pricing-plan">JOIN PRSPERA</JoinBtn>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProofPage;
