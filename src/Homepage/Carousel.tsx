import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JoinBtn from "@/components/extras/JoinBtn";
interface SlideData {
  percent: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;
}
const slides: SlideData[] = [
  {
    percent: "95%",
    title: "1. Winning Undefined",
    shortDescription: "of employees don’t understand their company’s strategy.",
    longDescription:
      "Most companies have no single, clear definition of “winning” that everyone agrees on. Without it, teams drift. Strategies splinter. People do their best but often not the same best. It’s the opposite of how elite sports teams operate. When no one knows the score, effort doesn’t translate to value.",
    image: "/assets/iceberg.png",
  },
  {
    percent: "95%",
    title: "1. Winning Undefined",
    shortDescription: "of employees don’t understand their company’s strategy.",
    longDescription:
      "Most companies have no single, clear definition of “winning” that everyone agrees on. Without it, teams drift. Strategies splinter. People do their best but often not the same best. It’s the opposite of how elite sports teams operate. When no one knows the score, effort doesn’t translate to value.",
    image: "/assets/iceberg.png",
  },
  {
    percent: "80%",
    title: "2. Value Destroyed Daily",
    shortDescription:
      "of businesses never sell. Of those that do, only 6% get fair market value.​",
    longDescription:
      "Most owners assume value accumulates ‘automatically’ over time — but without the right systems in place, it quietly erodes. Every misaligned decision, manual process, disengaged team member, and reactive strategy threatens what your business is worth. Value isn’t just built — it’s protected, grown, and proven daily. If you don’t manage it intentionally, the market will discount it brutally.",
    image: "/assets/iceberg.png",
  },
  {
    percent: "84%",
    title: "3. Marketable Value Unseen",
    shortDescription:
      "of enterprise value today is intangible — yet most founders can’t define it, track it, or grow it.",
    longDescription:
      "Most owners chase revenue and profit, but the real driver of marketable value is hidden. Intangible assets like brand, systems, customer loyalty, culture, IP are the most valuable. Without a system that connects all the intangible assets and value drivers, marketable value stays invisible, exposed, and deeply undervalued. If buyers cant see it, they wont pay for it. What isnt built to show cant be sold for what its worth.",
    image: "/assets/iceberg.png",
  },
  {
    percent: "77%",
    title: "4. No One On The Same Page​",
    shortDescription:
      "of the global workforce is disengaged - destroying value daily.",
    longDescription:
      'Ask everyone "Why do our Customers buy from us" and everyone will have a different answer. No one is on the same page. When everyone is going in their own direction there is little, if any, momentum, unity, or reason to ‘row the boat’ together. With no common goal that rewards everyone, there’s only disengagement and value destruction versus execution and value maximization. Run your business as a sports team and only then YOU ALL WIN TOGETHER.',
    image: "/assets/iceberg.png",
  },
  {
    percent: "61%",
    title: "5.  Strategy Inactionable",
    shortDescription:
      "of executives admit their company struggles to implement its strategy.",
    longDescription:
      "Strategy isn’t the problem — execution is. Great ideas stay in pitch decks because teams can’t translate strategy into daily actions. The gap between intention and action kills momentum. If strategy doesn’t shape operations, culture, and incentives — it’s not strategy. It’s storytelling.",
    image: "/assets/iceberg.png",
  },
  {
    percent: "78%",
    title: "6.  No Good Help​",
    shortDescription:
      "of executives admit their company struggles to implement its strategy.",
    longDescription:
      "Advisors are everywhere — but the right ones are rare. Those that understand Intangible assets are the rarest. Most founders lack access to M&A-savvy operators who understand how to shape and signal marketable value early. M&A bankers aren’t in the business of long-term guidance. By the time they step in, it’s too late maximize, monetizable value to Exit Richer.",
    image: "/assets/iceberg.png",
  },
];
export default function IcebergCarousel() {
  const [current, setCurrent] = useState(0);
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  return (
    <section className="w-full bg-black text-white py-12 md:py-16 flex flex-col items-center">
      {/* Title */}
      <div className="text-center max-w-4xl mb-10 md:mb-12 px-4">
        <h2 className="text-2xl md:text-4xl font-walbaum leading-snug">
          Six Icebergs Sink <br /> the EntrepreneurSHIP Every Day
        </h2>
        <p className="mt-6 text-center text-white text-base md:text-lg font-light leading-relaxed">
          Even profitable businesses are silently sinking. <br />
          These are the hidden forces dragging them under — long before they
          exit.
        </p>
      </div>
      {/* Custom nav images */}
      <div className="flex gap-3 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="relative w-4 h-4 md:w-5 md:h-5 rounded-full overflow-hidden"
          >
            {index === current ? (
              <img
                src="/assets/dot.png"
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain transition-transform hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-500 rounded-full transition-transform hover:scale-110"></div>
            )}
          </button>
        ))}
      </div>
      {/* Slide container */}
      <div className="relative w-full max-w-8xl overflow-hidden px-6 md:px-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center p-4 md:p-8"
            >
              {index === 0 ? (
                <div className="relative flex flex-col items-center">
                  {/* Outer circle */}
                  <img
                    src="/assets/cir1.png"
                    alt="Iceberg Circle"
                    className="w-64 h-64 sm:w-60 sm:h-60 md:w-[24rem] md:h-[24rem] object-contain mt-28 sm:mt-6"
                  />
                  {/* Inner circle in the middle */}
                  <img
                    src="/assets/inner-circle.png"
                    alt="Inner Circle"
                    className="absolute mt-14 md:mt-2 top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl md:text-3xl mb-6 text-center md:text-left max-w-4xl w-full px-4">
                    {slide.title}
                  </h2>
                  {/* Iceberg + Short Description */}
                  <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-12 w-full px-4">
                    {/* Iceberg */}
                    <div className="relative flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56">
                      <img
                        src="/assets/iceberg.png"
                        alt="Iceberg"
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
                        {slide.percent}
                      </span>
                    </div>
                    {/* Short description */}
                    <p className="flex-1 text-center md:text-left text-lg sm:text-base md:text-xl font-light leading-relaxed">
                      {slide.shortDescription}
                    </p>
                  </div>
                  {/* Long Description */}
                  <p
                    dangerouslySetInnerHTML={{ __html: slide.longDescription }}
                    className="mt-8 text-xs sm:text-sm md:text-base max-w-4xl leading-relaxed font-light text-justify px-4"
                  ></p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 md:left-10 lg:left-[15%] top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/60 transition "
        >
          <ChevronLeft
            size={28} // mobile
            className="sm:hidden"
            color="#FFBB1BBF"
          />
          <ChevronLeft
            size={36} // tablet
            className="hidden sm:block md:hidden"
            color="#FFBB1BBF"
          />
          <ChevronLeft
            size={48} // desktop
            className="hidden md:block"
            color="#FFBB1BBF"
          />
        </button>
        <button
          onClick={nextSlide}
          className=" absolute right-2 sm:right-6 md:right-10 lg:right-[15%] top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/60 transition"
        >
          <ChevronRight size={28} className="sm:hidden" color="#FFBB1BBF" />
          <ChevronRight
            size={36}
            className="hidden sm:block md:hidden"
            color="#FFBB1BBF"
          />
          <ChevronRight
            size={48}
            className="hidden md:block"
            color="#FFBB1BBF"
          />
        </button>
      </div>
      <JoinBtn page="/proof">See Jeff's 10X+ Multiple Exit Story</JoinBtn>
    </section>
  );
}
