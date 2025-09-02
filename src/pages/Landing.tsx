import { useState } from "react";
import DropdownSection from "./LandingMiddle";
import StorySection from "./LandingTop";
import HomePage from "./HomePage";
import Carousel from "./Carousel";
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
      heading: "Practice the exit – before it's real",
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
       <div className="mx-auto max-w-[72rem] text-center">
    {/* Title */}
    <h1 className="font-walbaum font-normal text-white leading-[1.05] tracking-[-0.01em] [text-wrap:balance]">
      <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-light">
        6 Steps to
      </span>
      <span className="block mt-1 text-5xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.015em] font-walbaum">
        Grow Smarter + Exit Richer
      </span>
    </h1>

    {/* Small subhead */}
    <p className="mx-auto mt-6 max-w-[46ch] text-white/90 text-sm md:text-base leading-relaxed font-extralight " style={{ fontSize: "1.2rem" , fontWeight: 300 }}>
      Since 2003, Jeff successfully <br /> operationalized the Unifying Philosophy (UPh
      <span style={{ fontSize: "1.8rem" }}>™</span> ) Strategy System TWICE.
    </p>

    {/* Lead paragraphs */}
    <p className="mx-auto mt-10 max-w-[62ch] text-white/90 text-lg sm:text-xl md:text-2xl leading-snug [text-wrap:balance]" style={{ fontSize: "1.2rem" , fontWeight: 300 }}>
      His 20+ year journey inspired our 6 Step Course for entrepreneurs to Grow
      Smarter to Exit Richer.
    </p>

    <p className="mx-auto mt-5 max-w-[62ch] text-white/90 text-lg sm:text-xl md:text-2xl leading-snug [text-wrap:balance]" style={{ fontSize: "1.2rem" , fontWeight: 300 }}>
      My interview with him captures his story <br /> in the context of these 6 Steps.
    </p>
  </div>
  <br />

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
                  allowFullScreen
                  allow="fullscreen"
                ></iframe>
              </div>
            </div>

            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              onClick={() => setCircleinfo(0)}
            >
              <Circle text="1. Endgame" active={circleinfo === 0} />
            </div>
            <div className="absolute top-[15%] -right-8" onClick={() => setCircleinfo(1)}>
              <Circle text="2. Valufacturing" active={circleinfo === 1} />
            </div>
            <div className="absolute bottom-[15%] -right-8" onClick={() => setCircleinfo(2)}>
              <Circle text="3. Scaling" active={circleinfo === 2} />
            </div>
            <div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              onClick={() => setCircleinfo(3)}
            >
              <Circle text="4. Staging" active={circleinfo === 3} />
            </div>
            <div className="absolute bottom-[15%] -left-8" onClick={() => setCircleinfo(4)}>
              <Circle text="5. Moment(s) of Truth" active={circleinfo === 4} />
            </div>
            <div className="absolute top-[15%] -left-8" onClick={() => setCircleinfo(5)}>
              <Circle text="6. Pride" active={circleinfo === 5} />
            </div>
          </div>
        </div>
      </section>
      <Carousel />
      <DropdownSection />
      <HomePage />
    </>
  );
}

function Circle({ text, active }: CircleProps) {
  return (
    <div
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex justify-center items-center text-center text-[#FFBB1BBF] text-xs sm:text-sm p-2 cursor-pointer transition-colors duration-200
      ${active ? "bg-white  text-[#000000c5] shadow-lg scale-110" : "bg-[#2b2f33] hover:bg-gray-700"}`}
    >
      {text}
    </div>
  );
}

//Below code have Bigger Flower But its not responsive

// import { useState } from "react";
// import DropdownSection from "./LandingMiddle";
// import StorySection from "./LandingTop";
// import HomePage from "./HomePage";
// import Carousel from "./Carousel";
// interface CircleProps {
//   text: string;
//   active: boolean;
// }

// export default function Landing() {
//   const [circleinfo, setCircleinfo] = useState<number>(0);

//   const circleinfodata = [
//     {
//       heading: "Win before you begin",
//       text: "Design Your Exit Like a Visionary, Not a Victim",
//       Url: "https://drive.google.com/file/d/1EKMfWT_eiiMl4xLFqQrmEkqa6clGmcug/preview",
//     },
//     {
//       heading: "Monetize the invisible",
//       text: "Turn Your Hidden Assets into Transferable Wealth",
//       Url: "https://drive.google.com/file/d/11btStJ5NAHsFzZUEhUtoEkQpe5rRTSc_/preview",
//     },
//     {
//       heading: "Scale without sacrifice",
//       text: "Build a Business That Runs and Grows Without You",
//       Url: "https://drive.google.com/file/d/14wTGE-ONeOVmRftVSr-dO8aJoiBZTR--/preview",
//     },
//     {
//       heading: "Perform under due diligence",
//       text: "Stage Your Business Like a Premium Asset, Not a Project",
//       Url: "https://drive.google.com/file/d/1Dz1mnzqrDgsrL5He7whpIziGYmc6CnvA/preview",
//     },
//     {
//       heading: "Practice the exit – before it's real",
//       text: "Rehearse the Deal So You Win Under Pressure",
//       Url: "https://drive.google.com/file/d/1d7ew7mXs3c19i4E3J3BndrzMHvfN_i1u/preview",
//     },
//     {
//       heading: "Live a life of Pride not regret",
//       text: "Leave a legacy ​of reverence,​not shame​",
//       Url: "https://drive.google.com/file/d/1x9lQkXldCgzqfWMc91BLVgX0ZFkx4cIq/preview",
//     },
//   ];

//   return (
//     <>
//       <StorySection />
//       <section className="w-full p-4 py-8 bg-black flex flex-col items-center gap-5">
//        <div className="mx-auto max-w-[72rem] text-center">
//     {/* Title */}
//     <h1 className="font-walbaum font-normal text-white leading-[1.05] tracking-[-0.01em] [text-wrap:balance]">
//       <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-light">
//         6 Steps to
//       </span>
//       <span className="block mt-1 text-5xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.015em] font-walbaum">
//         Grow Smarter + Exit Richer
//       </span>
//     </h1>

//     {/* Small subhead */}
//     <p className="mx-auto mt-6 max-w-[46ch] text-white/90 text-sm md:text-base leading-relaxed font-extralight " style={{ fontSize: "1.2rem" }}>
//       Since 2003, Jeff successfully <br /> operationalized the Unifying Philosophy (UPh
//       <span style={{ fontSize: "1.8rem" }}>™</span> ) Strategy System TWICE.
//     </p>

//     {/* Lead paragraphs */}
//     <p className="mx-auto mt-10 max-w-[62ch] text-white/90 text-lg sm:text-xl md:text-2xl leading-snug [text-wrap:balance]">
//       His 20+ year journey inspired our 6 Step Course for entrepreneurs to Grow
//       Smarter to Exit Richer.
//     </p>

//     <p className="mx-auto mt-5 max-w-[62ch] text-white/90 text-lg sm:text-xl md:text-2xl leading-snug [text-wrap:balance]">
//       My interview with him captures his story <br />in the context of these 6 Steps.
//     </p>
//   </div>
//   <br />

//         <div className="flex justify-center items-center text-white p-8">
//           <div className="relative w-[90vw] max-w-[600px] aspect-square bg-white rounded-full flex justify-center items-center">
//             <div className="absolute flex flex-col items-center text-center px-6">
//               <p className="text-black font-semibold text-lg mb-3">
//                 {circleinfodata[circleinfo].heading}
//               </p>
//               <p className="text-black text-sm mb-6">
//                 {circleinfodata[circleinfo].text}
//               </p>
//               <div className="w-60 h-36 sm:w-72 sm:h-40 mt-2">
//                 <iframe
//                   src={circleinfodata[circleinfo].Url}
//                   className="w-full h-full rounded-lg border border-gray-300"
//                   title={circleinfodata[circleinfo].heading}
//                   allowFullScreen
//                   allow="fullscreen"
//                 ></iframe>
//               </div>
//             </div>

//             <div
//               className="absolute -top-12 left-1/2 transform -translate-x-1/2 font-light"
//               onClick={() => setCircleinfo(0)}
//             >
//               <Circle text="1. Endgame" active={circleinfo === 0} />
//             </div>
//             <div className="absolute top-[15%] -right-12 font-light" onClick={() => setCircleinfo(1)}>
//               <Circle text="2. Valufacturing" active={circleinfo === 1} />
//             </div>
//             <div className="absolute bottom-[15%] -right-12 font-light" onClick={() => setCircleinfo(2)}>
//               <Circle text="3. Scaling" active={circleinfo === 2} />
//             </div>
//             <div
//               className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 font-light"
//               onClick={() => setCircleinfo(3)}
//             >
//               <Circle text="4. Staging" active={circleinfo === 3} />
//             </div>
//             <div className="absolute bottom-[15%] -left-12 font-light" onClick={() => setCircleinfo(4)}>
//               <Circle text="5. Moment(s) of Truth" active={circleinfo === 4} />
//             </div>
//             <div className="absolute top-[15%] -left-12 font-light" onClick={() => setCircleinfo(5)}>
//               <Circle text="6. Pride" active={circleinfo === 5} />
//             </div>
//           </div>
//         </div>
//       </section>
//       <Carousel />
//       <DropdownSection />
//       <HomePage />
//     </>
//   );
// }

// function Circle({ text, active }: CircleProps) {
//   return (
//     <div
//       className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex justify-center items-center text-center text-sm sm:text-base p-3 cursor-pointer transition-colors duration-200
//       ${active ? "bg-white text-black shadow-lg" : "bg-[#2b2f33] text-[#FFBB1BBF] hover:bg-[#343a40]"}`}
//     >
//       {text}
//     </div>
//   );
// }