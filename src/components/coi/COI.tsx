import Accordion from "@/components/coi/Accordion";
import { Footer } from "@/components/Footer";

const COI: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <section className="w-full flex justify-center items-center px-0 py-8">
          <div className="w-full max-w-[1000px] px-5 text-center">
            <h1 className="text-[#D02C31] text-7xl max-md:text-5xl max-sm:text-[32px] font-walbaum font-light mb-2">
              Your COI – Cost of Inaction:
            </h1>
            <h2 className="text-[#D02C31] text-7xl max-md:text-5xl max-sm:text-[32px] font-walbaum mb-5">
              your business value and
            </h2>
            <h2 className="text-[#D02C31] text-7xl max-md:text-5xl max-sm:text-[32px]">
              generational wealth.
            </h2>
          </div>
        </section>
        <section className="flex flex-col justify-center items-center gap-4 max-w-[1036px] w-full mx-auto px-0 py-10 max-sm:p-5 font-linear">
          <h3 className="text-black text-2xl text-center max-w-[800px] w-full max-sm:text-lg">
            When 84% of your business value is locked inside your intangible assets
          </h3>
          <p className="text-[#6f6f6f] text-center text-2xl font-normal max-w-[1036px] w-full max-sm:text-lg">
            (your brand, goodwill, strategic advantage, growth potential, intellectual property,
            human capital etc)​{" "}
          </p>
          <div className="text-black text-center text-2xl max-w-[900px] w-full max-sm:text-lg">
            <p>
              your business value and generational wealth is at risk – unless you unlock that
              value...​
            </p>
          </div>
        </section>
        <section className="w-full flex flex-col justify-center items-center px-0 py-8">
          <div className="w-full max-w-[900px] text-center">
            <h2 className="text-[#777] text-7xl font-normal max-md:text-5xl max-sm:text-[32px] font-walbaum">
              You didn't get into business
            </h2>
            <h2 className="text-[#777] text-7xl font-normal mt-5 max-w-[492px] mx-auto max-md:text-5xl max-sm:text-[32px] font-walbaum">
              to LOSE...right?
            </h2>
          </div>
        </section>
        <section className="w-full flex flex-col justify-center items-center px-0 py-0">
          <div className="w-full max-w-[900px] text-center">
            <h2 className="text-[#777] text-7xl font-normal max-md:text-5xl max-sm:text-[32px] font-walbaum">
              The numbers prove​ <br />
              why its easier to​
            </h2>
            <h2 className="text-[#777] text-7xl font-normal  max-w-[736px] mx-auto max-md:text-5xl max-sm:text-[32px] font-walbaum">
              <span className="text-[#D02C31]">LOSE</span> than it is to{" "}
              <span className="text-[#007C7A]">WIN.</span>
            </h2>
          </div>
        </section>
        <h2 className="text-[#777] text-4xl font-normal text-center pt-10 max-md:text-5xl max-sm:text-[32px] font-walbaum">
          (See for yourself) ​
        </h2>
        <div className="flex gap-8 justify-center items-start max-lg:flex-col max-lg:items-center py-8">
          <div>
            <Accordion />
          </div>
        </div>
      </main>
      <aside className="absolute right-4 top-4 z-10">
        <div className="flex flex-col items-end">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc"
            alt="Side Logo"
            className="w-[140px] h-[35px]"
          />
          <div className="-rotate-90 text-black text-[18px] mt-5 origin-center whitespace-nowrap pt-8 font-linear md:block hidden">
            <span>
              Grow Smarter. <span className="font-bold">Exit Richer™</span>
            </span>
          </div>
        </div>
      </aside>
      <Footer />
    </div>
  );
};

export default COI;
