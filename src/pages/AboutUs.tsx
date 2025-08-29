import NavBar from "@/components/layout/NavBar";
import About from "../../public/assets/AboutUs.png";
import { Footer } from "@/components/Footer";

// Using hosted placeholder images
const imgPrsperaLogoTransparent = "https://via.placeholder.com/296x47/FFFFFF/000000?text=PRSPERA";
const imgPrsperaLogoForFinalApproval =
  "https://via.placeholder.com/205x46/000000/FFFFFF?text=PRSPERA";

function SocialIcons() {
  return (
    <div className="flex gap-4">
      {/* LinkedIn Icon */}
      <svg className="w-[30px] h-[23px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          fill="black"
        />
      </svg>

      {/* Twitter/X Icon */}
      <svg className="w-[30px] h-[23px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path
          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
          fill="black"
        />
      </svg>
    </div>
  );
}

function MainContent() {
  return (
    <main className="bg-[#c9c9c9] px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
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
              <SocialIcons />
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
  );
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#c9c9c9]">
      {/* <NavBar /> */}
      <MainContent />
      <Footer />
    </div>
  );
}
