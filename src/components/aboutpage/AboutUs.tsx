import About from "/assets/AboutUs.png";
import { AiFillLinkedin } from "react-icons/ai";
import { Footer } from "@/components/footer/Footer";

export const AboutUs=()=> {
  return (
    <>
      <main className="bg-[#c9c9c9] px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-[55px] font-walbaum font-normal text-black leading-tight">
              About Our Founder
            </h1>
            <div className="space-y-4 text-black font-linear-grotesk font-normal text-base md:text-lg leading-relaxed">
              <p>
                <span>Harish Chauhan is the Founder & CEO of </span>
                <span className="font-medium">PRSPERA</span>
                <span>
                  {" "}
                  and inventor of the UPh™️ (Unifying Philosophy), a proven system for converting
                  hidden intangible assets into measurable enterprise value. Harish is the author of
                  Unconventional Business - 3 Startling Truths for Corporate Prosperity.
                </span>
              </p>
              <p>
                With over three decades of experience advising 200+ CEOs, building 150+ brands, and
                leading growth consultancies, he has helped businesses achieve premium exits and
                sustainable wealth. After a health emergency in 2012 forced him to rebuild from
                scratch, Harish returned with a renewed mission: to ensure leaders scale smarter,
                preserve their legacy, and exit richer.
              </p>
            </div>
            <div className="pt-8 space-y-4">
              <h3 className="text-2xl font-walbaum font-normal text-black">PRSPERA</h3>
              <div className="text-black font-linear-grotesk font-normal text-base md:text-lg leading-relaxed">
                <p>99 Lamp Crescent</p>
                <p>Vaughan Ontario</p>
                <p>Canada</p>
                <p>L4L 6J6</p>
              </div>
              <div className="pt-4">
                <p className="text-2xl font-linear-grotesk font-black text-black">
                  Harish@prspera.com
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="https://www.linkedin.com/in/harishkchauhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn Profile"
                  className="inline-block text-black hover:text-gray-700 transition-colors duration-200 text-4xl"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={About}
              alt="Jeff Cullen"
              className="w-full h-[550px] rounded-lg object-cover max-w-[450px]"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


