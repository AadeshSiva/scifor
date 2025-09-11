import React, { useEffect, useState } from "react";
import { AuthForm } from "@/components/authok/AuthForm";
import { useAuth } from "@/utils/AuthContext";
import { Footer } from "@/components/Footer";
import { FAQSection } from "./HomePage";

const getAccessToken = () =>
  sessionStorage.getItem("access_token") || localStorage.getItem("access_token");

const Pricing_Plan: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("CROSSCHECK");

  // Auth modal + flow state
  const [authOpen, setAuthOpen] = useState(false);
  const [initialTab] = useState<"login" | "register">("register");
  const [selectedPlan, setSelectedPlan] = useState<"guest" | "member" | null>(null);
  const [busy, setBusy] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!authOpen) return;
    let stopped = false;

    const check = async () => {
      if (stopped) return;
      const token = getAccessToken();
      if (token) {
        setAuthOpen(false);
        if (selectedPlan === "guest") {
          window.location.href = "/confirmation-guest";
        } else if (selectedPlan === "member") {
          window.location.href = "/payment";
        }
        return;
      }
      setTimeout(check, 500);
    };

    check();
    return () => {
      stopped = true;
    };
  }, [authOpen, selectedPlan]);

  const openAuth = (plan: "guest" | "member") => {
    setSelectedPlan(plan);
    setAuthOpen(true);
  };

  const handleFreeClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/auth?plan=guest&view=register";
    } else if (user?.paid) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handlePaidClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/auth?plan=member&view=register";
    } else if (user?.paid) {
      window.location.href = "/dashboard";
    } else {
      alert("You are already registered as a Guest, proceeding to upgarde your plan.");
      window.location.href = "/payment";
    }
  };

  const menuItems: string[] = [
    "CROSSCHECK",
    "CONFIDANTE",
    "CONSULTING",
    "CONCIERGE (for members only)",
    "COURSE",
    "COMMUNITY",
    "CRITIQUE",
    "CRITICAL TOOLS",
    "CURATED",
    "CURES (Done–for–You Tools)",
    "COACHING (Winning skills – course relevant)",
    "CLOUT",
    "PRSPERA COMPLETE​",
  ];

  const messages1: { [key: string]: string | string[] } = {
    CROSSCHECK: [
      "Each month, one Guest member will be selected by lottery to enjoy the benefits of Crosscheck feature for a month.  Use this opportunity to find the street value of your business and getting access to multiple M&A firms vying for your attention, in the process.",
      "",
    ],

    CONFIDANTE: [
      "Welcome to the World’s First and Only Proprietary GPT on Maximizing Monetizable Value, Tax Effectively – For All Invested. ",
      "Use this GPT to help you 24/7 to learn, direct and strategize how to Grow Smarter by maximizing value correctly so that you protect and capitalize on the years of value you built to exit richer.​",
      "You get the exact same features as paid members.",
    ],

    "CONCIERGE (for members only)": [
      " You get to choose what you'd like to have in your concierge service should you decide to upgrade your PRSPERA account to be a Member.  Each month, the most frequently ranked topic will be chosen and presented by the Concierge – giving free members a sample of our Concierge service.",
    ],

    COURSE: [
      "Audit and submit questions and thoughts about the curriculum -  ",
      "Configure the course to what you need – in the future you will get free video overviews of each module – pick the order in which you would be interested in learning about  ",
      "",
    ],

    COMMUNITY: [
      "You get access to our chat engine as a listener.  Watch what our community members are discussing in various channels.  Upgrade your membership to participate in these discussions.",
      "",
    ],

    CRITIQUE: [
      "Download PDF guides containing key questions and the expected responses—right or wrong—to use when interviewing your advisors (accountants, legal professionals, etc.). These documents are designed to help you assess their competence and make informed decisions.  Tap into the PRSPERA certified vendors / service providers through our CLOUT program.",
    ],
    "CRITICAL TOOLS":
      "You will gain access to a suite of tools designed to help diagnose challenges within your business. A custom GPT assistant will be available to discuss your current issues and recommend the most relevant tools for deeper analysis.",
    CURATED:
      "You may pick the topics and/or the questions you may have for experts in various fields.  We'll invite you to participate in webinars with experts responding to these questions and more.​",
    "CURES (Done–for–You Tools)": [
      "Each month, one Guest member will be selected by lottery to enjoy the benefits of our CURES feature for a month. Sign up for a chance to win and enjoy all the benefits of Membership.",
      "Guests can download all our Done-for-You-Tools and use them in a self-guided manner. For additional support and hand-holding, you may upgrade your membership.",
    ],
    "COACHING (Winning skills – course relevant)":
      "Tell us what do you need coaching for (example – mental health, HR practices).  We'll arrange coaching sessions with experts based on priority and Guest members will have access to recorded sessions.  ",
    CLOUT: [
      "Request a PRSPERA certified vendor or a service provider.  Once we identify one or more based on your criteria, switch to become a paid member to get access.",
    ],
    CONSULTING:
      "Guests do not have access to Consulting – unless they win the monthly lottery to try out PRSPERA member services for a month.  In which case, you are eligible to receive consulting on 1 core issue that month.  Upgrade membership to enjoy the full benefits of up to 3 core issue consulting every month. ",

    "PRSPERA COMPLETE​":
      "All the offerings of PRSPERA, bundled in an app complete with a dashboard that guides your daily actions towards building value.  The app gives you access to all PRSPERA products based on your permissions as our Guest User.",
  };

  const messages2: { [key: string]: string | string[] } = {
    CROSSCHECK: [
      "Each member starting in November 2025 will complete a comprehensive submission, all anonymous, to present their business profile, financials and target exit richer valuation and more.",
      "A minimum of 3 opinions will be provided by M&A firms and business brokers across our network of over 250+ firms. These firms will do their best to ‘sell’ you on why they are the firm of choice to represent selling your business or helping you with any of their services based on your exit preferences – roll up, sell, merger etc.",
      "1) STREET VALUE: Responding firms will deliver their assessment of the ‘Street Value’ of the business based on financials and profile provided ",
      "2)  KEY RISKS OF EXIT VALUE: Responding firms will provide their idea of the top risk factors that are hurting your exit value. ",
      "3) ACCESS TO BUYERS: Responding firms will confirm they have: ",
      "a) existing access to strategic buyers ",
      "b) can have access to strategic buyers",
      "c) know of and can provide insights on what those buyers would pay premiums for  ",
      "4) ART OF WAR STRATEGIES: Based on your ‘desired exit richer number’ which, at your option, you may share with them in advance, responding firms can help articulate the ‘ART OF WAR’ strategy could you help us execute should you be retained to achieve 100% of the target exit richer number – or what % could you assure securing if not 100% of the target. ",
      "ART OF WAR STRATEGY recommended ",
      "Target % of Exit Richer Number ",
      "Any other recommendations ",
      "A minimum of 3 detailed reports from a network of 250+ M&A Firms or Business Brokers will deliver exceptional and crucial strategic insights on how best to Grow Smarter now, pivot the business, and structure its value correctly.  ",
      "These reports will be delivered in your membership profile INBOX and will NOT BE SHARED with OTHER MEMBERS.  ",
      "Any ART OF WAR STRATEGY received from responding firms that are deemed unique, valuable or extraordinary to all paid members, including yourself,  will be compiled into a library and shared.  ",
      "This further enhances the Grow Smarter and Exit Richer success of all PRSPERA Members.  ",
      "",
    ],

    CONFIDANTE: [
      "Welcome to the World’s First and Only Proprietary GPT on Maximizing Monetizable Value, Tax Effectively – For All Invested.",
      "Use this GPT to help you 24/7 to learn, direct and strategize how to Grow Smarter by maximizing value correctly so that you protect and capitalize on the years of value you built to exit richer ",
    ],

    "CONCIERGE (for members only)": [
      "Choose what would you like to have in your Concierge service.  You'll have an intake session with PRSPERA where we'll capture your needs and aspirations that will guide us setting up your Concierge services.  Once set up, you'll have access to your Concierge services on-demand.",
    ],

    COURSE: [
      "Members get access to the entire self-paced and instructor-led tutorial.  The 33 people first cohort will start in October 2025.​",
      "They will also have a say in the configuration and auditing of the course. ",
    ],
    COMMUNITY: [
      "Chat with other members anonymously.  You get access to a chat engine developed specifically for our members to chat with other members anonymously.  Discuss anything related to the business without worrying about revealing your identity.  Configure which channels you want to participate in. ",
    ],

    CRITIQUE:
      "Download PDF guides containing key questions and the expected responses—right or wrong—to use when interviewing your advisors (accountants, legal professionals, etc.). These documents are designed to help you assess their competence and make informed decisions.  Tap into the PRSPERA certified vendors / service providers through our CLOUT program.  ",
    "CRITICAL TOOLS":
      "You will gain access to a suite of tools designed to help diagnose challenges within your business. A custom GPT assistant will be available to discuss your current issues and recommend the most relevant tools for deeper analysis.  We will handhold you on using these tools.​ ",
    CURATED:
      "You'll be invited to attend webinars with experts on various topics as requested by various members.  You may also pick the topics and/or the questions you may have for experts in various fields.  We'll invite you to participate in webinars with experts responding to these questions and more.",
    "CURES (Done–for–You Tools)":
      "We will guide you with the Done-for-You-Tools. We will do the ROI calculator with you. We will walk you through the UPh process and that how it could solve a few challenges with the business. You'll have access to our ROI Calculator, Brand Diagnostics and Brand Assets Checklist.",
    "COACHING (Winning skills – course relevant)":
      "Live sessions monthly with topics selected based on your requests.  The session may include featured guest speakers where relevant and available.",
    CLOUT: [
      "Request a PRSPERA certified vendor or a service provider. Once we identify one or more based on your criteria, we'll make the introduction and you enjoy the negotiated pricing should you decide to go with that vendor or service provider.  No additional fee or markup for this service.",
    ],
    CONSULTING: [
      "Members receive Consulting on Demand –every quarter or every month – they can request this via their Concierge – up to three core issues each month – In the event it’s a recurring theme not addressed by a PRSPERA platform solution set then this may require an external expert at an additional cost – if it is within our set of offerings inclusive or a la carte then no extra fee will be charged – unless in order to solve it requires the that service to solve it (e.g. UPh ",
    ],
    "PRSPERA COMPLETE​":
      "All the offerings of PRSPERA, bundled in an app complete with a dashboard that guides your daily actions towards building value. The app gives you access to all PRSPERA products based on your permissions as our valuable Member.",
  };

  return (
    <section className="bg-white h-auto mt-8">
      <h1 className="text-center lg:text-6xl md:text-5xl text-3xl font-normal text-gray-500 font-walbaum mt-16">
        The World’s One and Only Fact-Based Platform to Maximize and Monetize Your Business Value –
        Tax Effectively – for All Invested.
      </h1>
      <h1 className="text-center text-4xl font-normal text-black font-walbaum mt-8">
        When 84%+ of your business value is more than the cost of membership, then your decision is
        clear.
      </h1>
      {/* Video and Message */}
      <div className="w-full flex flex-col md:flex-row lg:flex-row mt-14 px-4 gap-3">
        {/* Video Container */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <video
              className="w-full rounded-xl shadow-2xl"
              src="/assets/HeroVideo.mp4"
              loop
              playsInline
              controls
            ></video>
          </div>
        </div>

        {/* Text Container */}
        <div className="w-full h-auto md:space-y-3 lg:space-y-4 text-left text-lg lg:text-xl font-walbaum text-gray-700 leading-relaxed">
          <p>“Most entrepreneurs fail not because their business wasn’t profitable enough.</p>
          <p>
            They fail (on exit) because they didn’t create a business with marketable value that
            creates the generational wealth they and their family dynasty deserves for the years
            they sacrificed and invested in building that business.”
          </p>
          <p>-Harish Chauhan</p>
        </div>
      </div>
      {/* Guest & Member Section */}
      <div className="w-auto mx-2 h-auto mt-14 border-black border-2 flex flex-col md:flex-row lg:flex-row">
        {/* Left */}
        <div className="bg-gray-400 lg:w-[280px] md:w-[280px] ">
          <h1 className="text-center text-3xl lg:text-4xl font-extralight pt-4">Jeff Cullen</h1>
          <h1 className="text-center text-2xl lg:text-3xl font-light pt-2">LIVE</h1>

          <div className="mt-4 border-2 border-black flex justify-center mx-auto w-fit">
            <img
              className=" max-w-[240px] h-auto"
              src="/assets/jeff-webinar.jpg"
              alt="Jeff Webinar"
            />
          </div>
          <p className="pt-2 font-sans px-3 font-semibold text-lg text-center md:text-left lg:text-left pb-10  ">
            Only 33 Seats
          </p>
        </div>

        {/* Middle */}
        <div className="bg-black flex-1 min-w-[300px]">
          <h1 className="text-center text-xl lg:text-2xl text-white font-sans">
            Guest Registration
          </h1>
          <p className="text-center text-yellow-500 text-lg lg:text-xl pt-2">Free</p>

          <hr className="border-t-2 border-gray-400 mt-16" />

          <h1 className="text-sm lg:text-base text-white px-2 pt-4">
            You’ll be entered into a lottery for any remaining 33 live seats. No cost to enter.
            Attendance is not guaranteed.
          </h1>
          <h1 className="text-sm lg:text-base text-white px-2 pt-4">
            If NOT selected in the lottery, you’ll still receive:
          </h1>

          <div className="space-y-3 text-white text-sm lg:text-base font-sans pt-4 px-2 pb-10">
            <div className="flex gap-2 items-center">
              <span className="text-lg text-white lg:text-2xl">&#10003;</span>
              <p>Ability to ask Jeff your own business questions</p>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-lg lg:text-2xl text-white">&#10003;</span>
              <p>Full replay of the webinar</p>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-lg lg:text-2xl text-white">&#10003;</span>
              <p>
                Complete Q&amp;A report, including concepts, questions, and Jeff’s expert answers
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-lg lg:text-2xl text-white">&#10003;</span>
              <p>
                Ongoing Guest benefits that extend far beyond this event –
                <span className="text-yellow-500 font-medium"> See Below</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white flex-1 min-w-[300px]">
          <h1 className="text-center text-xl lg:text-2xl font-sans pt-4">Member</h1>
          <p className="text-center text-yellow-500 text-lg lg:text-xl pt-2">$1797 USD</p>
          <p className="text-center font-sans font-light px-2">
            One time purchase. Lifetime Value. ​Discounted 94%+. Limited Time Offer.
          </p>

          <hr className="border-t-2 border-black mt-6" />

          <h1 className="text-sm lg:text-base font-sans px-2 pt-3">
            Be one of the first 33 paid PRSPERA Lifetime members, and you are automatically
            guaranteed a seat.
          </h1>

          <div className="space-y-3 text-sm lg:text-base font-sans pt-4 px-2 pb-10">
            <div className="flex gap-2">
              <span className="text-lg lg:text-2xl">&#10003;</span>
              <p>As a member, you receive:</p>
            </div>

            <div className="flex gap-2">
              <span className="text-lg lg:text-2xl">&#10003;</span>
              <p>Guaranteed live access to Jeff's webinar - no lottery</p>
            </div>

            <div className="flex gap-2">
              <span className="text-lg lg:text-2xl">&#10003;</span>
              <p>Ability to ask Jeff your own business question</p>
            </div>

            <div className="flex gap-2">
              <span className="text-lg lg:text-2xl">&#10003;</span>
              <p>Full replay of the webinar</p>
            </div>

            <div className="flex gap-2">
              <span className="text-lg lg:text-2xl">&#10003;</span>
              <p>Complete Q&A report, including concepts, questions, and Jeff’s expert answers</p>
            </div>

            <div className="flex gap-2">
              <span className="text-lg lg:text-2xl">&#10003;</span>
              <p>
                Ongoing Member benefits that extend far beyond this event –{" "}
                <span className="text-yellow-500 font-medium">See Below</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Service */}
      <div className="w-auto mx-2 h-auto mt-14 border-black border-2 flex flex-col md:flex-row lg:flex-row ">
        {/* Left */}
        <div className="bg-white lg:w-[280px] md:w-[280px] pb-20">
          <h1 className="text-center text-4xl font-normal pt-4">PRSPERA</h1>
          <h1 className="text-center text-3xl font-normal pt-3">Service</h1>
        </div>

        {/* Middle */}
        <div className="bg-black flex-1 min-w-[300px] pb-20">
          <h1 className="text-center text-2xl pt-4 text-white font-sans">
            Become our <br /> Guest
          </h1>

          <hr className="border-t-2 border-gray-400 mt-8" />

          <h1 className="text-base font-sans text-yellow-600 px-2 pt-3">
            <br /> Sample each of the 12 PRSPERA Services with a monthly lottery so all our guests
            can benefit through participation while also experiencing the benefits of membership.
          </h1>
        </div>

        {/* Right */}
        <div className="bg-white flex-1 min-w-[300px]">
          <h1 className="text-center text-2xl pt-4 text-black font-sans">
            Become a PRSPERA <br />
            Founding Lifetime Member
          </h1>

          <hr className="border-t-2 border-black mt-8" />

          <h1 className="text-base font-sans text-yellow-600 px-2 pt-3">
            <br /> Stop losing enterprise value in the chaos. Lock in PRSPERA once. Make it part of
            your valuation narrative. Create alignment and accountability across the business. Learn
            more
          </h1>

          <div className="space-y-3 text-black text-base font-sans pt-4 px-2">
            <div className="flex gap-2">
              <span className="text-2xl">&#10003;</span>

              <div className="space-y-2">
                <p>One Time buy – value for life</p>

                <p className="text-sm ">
                  ▪ 10 years of platform access, renewable and transferrable — boost your exit
                  valuation by passing it to an acquirer
                </p>

                <p className="text-sm ">
                  ▪ Permanent advantage for your entire org—execs, managers, staff, and advisors
                  collaborate daily on your smarter growth and richer exit
                </p>

                <p className="text-sm ">
                  Grandfathered pricing—lock in access to all future platform features under
                  Lifetime or Subscription plans (excludes DFY &amp; some DWY services)
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="text-2xl">&#10003;</span>

              <div className="space-y-2">
                <p>Why membership matters: ​</p>

                <p className="text-sm">
                  1.Disengaged teams destroy value. PRSPERA flips that. Every person in your company
                  stays: <br />
                  <span className="font-medium">
                    ▪ Informed (real-time visibility)​{" "}
                  </span> <br />{" "}
                  <span className="font-medium">▪ Invested (strategic clarity)​</span> <br />
                  <span className="font-medium">▪ Incentivized (value-creation metrics)​</span>
                </p>

                <p className="text-sm">
                  2.Every day becomes an opportunity to: ​ <br />
                  <span className="font-medium">▪ Resude Risk​ </span> <br />{" "}
                  <span className="font-medium">▪ Increase EBITDA​​</span> <br />
                  <span className="font-medium">▪ Monetize intangibles​​</span>
                </p>

                <p className="text-sm pb-10">
                  Not someday Now Everyone becomes accountable and incentivized to build value
                  smarter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="w-auto mx-2 h-auto mt-14 border-black border-2 flex flex-col md:flex-row lg:flex-row mb-20 ">
        {/* Left */}
        <div className="bg-white lg:w-[280px] md:w-[280px]">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`py-3 px-2 text-sm cursor-pointer border-b hover:bg-gray-200 ${
                activeItem === item ? "bg-yellow-300 font-semibold" : ""
              }`}
              onClick={() => setActiveItem(item)}
            >
              {index + 1}. {item}
            </div>
          ))}
        </div>

        {/* Middle */}
        <div className="min-w-[300px] h-[600px] flex flex-col bg-black text-white lg:p-2 md:p-2 p-4 flex-1 pb-10">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 ">
            {Array.isArray(messages1[activeItem]) ? (
              (messages1[activeItem] as string[]).map((msg, index) => (
                <p key={index} className="text-base">
                  {msg}
                </p>
              ))
            ) : (
              <p className="text-base">{messages1[activeItem]}</p>
            )}
          </div>

          <button
            onClick={handleFreeClick}
            disabled={busy}
            className="h-[50px] w-full border-2 border-yellow-600 bg-black text-lg font-medium text-yellow-600 mt-4 self-center disabled:opacity-60"
          >
            {busy ? "Please wait..." : "Register for Free"}
          </button>
        </div>

        {/* Right */}
        <div className="min-w-[300px] h-[600px] flex flex-col bg-white text-black lg:p-2 md:p-2 p-4 flex-1 pb-10">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
            {Array.isArray(messages2[activeItem]) ? (
              (messages2[activeItem] as string[]).map((msg, index) => (
                <p key={index} className="text-base">
                  {msg}
                </p>
              ))
            ) : (
              <p className="text-base">{messages2[activeItem]}</p>
            )}
          </div>
          <button
            onClick={handlePaidClick}
            disabled={busy}
            className="h-[50px] w-full border-2 border-yellow-600 bg-black text-lg font-medium text-yellow-600 mt-4 self-center disabled:opacity-60"
          >
            {busy ? "Please wait..." : "$1797 USD"}
          </button>
        </div>
      </div>
      {authOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[760px]">
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-200"
              aria-label="Close"
            >
              ✕
            </button>
            <AuthForm />
          </div>
        </div>
      )}
      <FAQSection />;
      <Footer />
    </section>
  );
};

export default Pricing_Plan;
