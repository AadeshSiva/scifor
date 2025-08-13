import React, { useEffect, useState } from "react";
import { AuthForm } from "@/components/authok/AuthForm";

const PAYMENT_PAGE = "/payment";

const getAccessToken = () =>
  sessionStorage.getItem("access_token") ||
  localStorage.getItem("access_token");

const authHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Infer current user status from backend (reuses your confirm-payment endpoint without session_id)
async function getUserStatus() {
  const token = getAccessToken();
  if (!token)
    return { authenticated: false, isMember: false, name: "", email: "" };

  try {
    const res = await fetch(
      "https://intern-project-final-1.onrender.com/confirm-payment",
      {
        headers: { ...authHeaders() },
        credentials: "include",
      }
    );
    if (!res.ok)
      return { authenticated: true, isMember: false, name: "", email: "" };
    const data = await res.json();
    const isMember = !!data?.user_paid || data?.status === "paid";
    return {
      authenticated: true,
      isMember,
      name: data?.name || "",
      email: data?.email || "",
    };
  } catch {
    return { authenticated: true, isMember: false, name: "", email: "" };
  }
}

const Pricing_Plan: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("CROSSCHECK");

  // Auth modal + flow state
  const [authOpen, setAuthOpen] = useState(false);
  const [initialTab] = useState<"login" | "register">("register");
  const [selectedPlan, setSelectedPlan] = useState<"guest" | "member" | null>(
    null
  );
  const [busy, setBusy] = useState(false);

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

  const handleFreeClick = async () => {
    setBusy(true);
    const status = await getUserStatus();
    setBusy(false);

    if (status.authenticated && status.isMember) {
      window.location.href = "/confirmation-member";
      return;
    }
    if (status.authenticated && !status.isMember) {
      window.location.href = "/confirmation-guest";
      return;
    }
    openAuth("guest");
  };

  const handlePaidClick = async () => {
    setBusy(true);
    const status = await getUserStatus();
    setBusy(false);

    if (!status.authenticated) {
      openAuth("member");
      return;
    }
    if (status.isMember) {
      window.location.href = "/confirmation-member";
      return;
    }

    // For authenticated non-members, redirect directly to payment page
    window.location.href = PAYMENT_PAGE;
  };

  const menuItems: string[] = [
    "CROSSCHECK",
    "CONFIDANTE",
    "CONCIERGE (for members only)",
    "COURSE",
    "COMMUNITY",
    "CRITIQUE",
    "CRITICAL TOOLS",
    "CURATED",
    "CURES (Done–for–You Tools)",
    "COACHING (Winning skills – course relevant)",
    "CLOUT",
    "CONSULTING",
  ];

  const messages1: { [key: string]: string | string[] } = {
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

    CONFIDANTE: ["", ""],

    "CONCIERGE (for members only)": [
      " Yes, please include me in the monthly CONCIERGE lottery.",
      "FREE members will enjoy a concierge service after our PRSPERA membership exceeds 1111 members. Here’s how:  ",
      "Each month the most frequently ranked topic will be chosen and presented by the Concierge – giving FREE members a sample of our Concierge service.  ",
      "FREE members who have configured their concierge will be If you could have a concierge what would you need one for? The following is a list of the most critical topics related to building a valuable company so that the owners can exit richer and create generational wealth. What topics would you want to learn more about with the help of a concierge?  ",
      "Configure your concierge here: Your custom concierge configuration will be save in your profile and can be updated at anytime by you – and this will help us serve you if and when you decide to become a PRSPERA member.  ",
      "(backend calclulates the configurations of all FREE members and picks the highest ranking topic – the Concierge service is then described as here is how we help: The advisors who can help who have been PRSPERA authorized – this can be a list and it also can be a webinar presented by the concierge – it can also include a process map as to how we resolve this issue – and any other related solutions that address this problem including a testimonial from other PRSPERA members who have solved this problem already – with or without the concierge service) – this will be a recorded presentation and archived for all FREE members to view on demand so that they can see how our concierge service reduces their time to resolve a critical element in their business.  ",
      "<<< Check box list + 5 text fields>>>",
      "1. 73% of privately held companies in the U.S. plan to transition within the next 10 years, representing a $14 trillion opportunity. ",
      "2. Only 17% of business owners actually have a formal exit plan, and over half have never had their business appraised, which leaves many unaware of all of their exit options. ",
      "3. 60% of first-generation business owners favor an internal exit, while 82% of second-generation business owners favor an internal exit. ",
      "4. 85% of owners who believed themselves to be best-in-class or better in exit planning had sought education, and 84% received outside advice. ",
      "5. 16% of business owners plan to exit their businesses in fewer than five years, 37% plan to exit within 5–10 years, and 47% plan to exit in more than ten years. ",
      "6. 56% of Millennial owners have written personal plans, 55% have written company plans, and 68% have written personal financial plans. ",
      "7. 52% of business owners include written detailed personal planning in their exit strategy, compared to only 9% in previous surveys. ",
      "8. 51% of privately held U.S. businesses are owned by baby boomers, leading to a significant wealth transfer as they sell to millennials. ",
      "9. Up to 80% of businesses that go to market do not sell, leaving owners without solid options to harvest their wealth and ensure economic continuity into the next generation. ",
      "10. In recent surveys, 3 out of 4 business owners (75%)profoundly regretted their decision to sell within one year of exiting due to lack of readiness.",
      "11. 52% of business owners have not considered how they would exit their business in the event of a dispute with a business partner. ",
      "12. Younger owners—Millennials and those in Generation X—view exit strategy as a priority, with 56% of Millennial owners having written personal plans, 55% written company plans, and 68% written personal financial plans. ",
      "13. An estimated 73% of privately held companies in the U.S. plan to transition ownership within the next decade, representing a $14 trillion opportunity. ",
      "14. After exiting, 42% of owners plan to retire, 39% intend to invest in another business, and 31% want to pursue philanthropy or civic engagement. ",
      "15. The most common succession plan is to pass the business to a family member (41%), followed by selling the business to a third party (31%). ",
      "16. Only 12% of businesses that sell to a third party sell to private equity firms, with the majority selling to individual buyers. ",
      "17. Business owners who actively plan for a transition are more likely to achieve their goals, including maximizing the value of the business and preserving its legacy.",
      "18. Only 2% of businesses that sell to a third party use an auction process, but those that do achieve significantly higher sale prices. ",
      "19. The number of businesses transitioning ownership is expected to double in the next 10-15 years, creating a significant demand for transition planning services. ",
      "",
    ],

    COURSE: [
      "Audit and submit questions and thoughts about the curriculum -  ",
      "Configure the course to what you need – in the future you will get free video overviews of each module – pick the order in which you would be interested in learning about  ",
      "",
    ],

    COMMUNITY: [
      "View only – topics you would be interested  ",
      "Configure your community channels – select check boxes – we will then show you updates from these channels ",
      "",
    ],

    CRITIQUE: [
      "View only – topics you would be interested ",
      "Configure your community channels – select check boxes – we will then show you updates from these channels ",
    ],
    "CRITICAL TOOLS":
      "List all the tools to be made available – in Oct/Nov - for now here is a list of key problems by dept or function check all the areas in which you have struggles in",
    CURATED: "",
    "CURES (Done–for–You Tools)": "",
    "COACHING (Winning skills – course relevant)":
      "Tell us what area of coaching you need – replays only  ",
    CLOUT: [
      "Welcome to the World’s First and Only Proprietary GPT on Maximizing Monetizable Value, Tax Effectively – For All Invested.  ",
      "Use this GPT to help you 24/7 to learn, direct and strategize how to Grow Smarter by maximizing value correctly so that you protect and capitalize on the years of value you built to exit richer ",
    ],
    CONSULTING:
      "Free get 1 lottery winner each month to have their strategy fixed begins October with rirst draw y sept 30 – shared on live webinar with anonympups attendees only – must be registered with login alias ",
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
      "Prepare onboarding schedule – Vinod to prepare draft – welcome call with vinod and I – if a few then 1:1 if many then anonymous webinar weekly – depending on inflow; ROI interview within first 72 hours of sign up – INTAKE SESSION or SESSIONS – 1 hr/ea; VALIDATION SESSIONS -  ",
      "",
    ],

    COURSE:
      "Paid members will get added into the first cohort of 33 people – module every other week – 33 steps – first class is October launch ",
    COMMUNITY: [
      "We will hold off on launching the community until we have our first 111 members  ",
      "Configure which channels you would want to participate in – upon launch  ",
      "(vinod to identify the channels – AI will sort the channels from open conversations first) ",
    ],

    CRITIQUE:
      "They would request the experts they want to replace or interview to be PRSPERA Authorized and we will get back to them when we have secured them – we would need a minimum of 100 per legal jurisdiction - city as requested – e.g. 100 people in new york city want a tax lawyer PRSPERA Authorized  ",
    "CRITICAL TOOLS":
      "List all the tools to be made available – in Oct/Nov - for now here is a list of key problems by dept or function check all the areas in which you have struggles in – PAID _ this could come out of the ROI interview with the concierge  PRSPERA Advisor  ",
    CURATED: "",
    "CURES (Done–for–You Tools)": "UPh SS, MS, OS",
    "COACHING (Winning skills – course relevant)":
      "ilve sessions monthly with topics selected month prior – may include featured guest speakers where relevant and available ",
    CLOUT: [
      "Welcome to the World’s First and Only Proprietary GPT on Maximizing Monetizable Value, Tax Effectively – For All Invested.   ",
      "Use this GPT to help you 24/7 to learn, direct and strategize how to Grow Smarter by maximizing value correctly so that you protect and capitalize on the years of value you built to exit richer  ",
    ],
    CONSULTING: [
      "Welcome to the World’s First and Only Proprietary GPT on Maximizing Monetizable Value, Tax Effectively – For All Invested.   ",
      "Use this GPT to help you 24/7 to learn, direct and strategize how to Grow Smarter by maximizing value correctly so that you protect and capitalize on the years of value you built to exit richer  ",
    ],
  };

  return (
    <section className="bg-white h-auto ">
      <h1 className=" text-center lg:text-6xl md:text-5xl text-3xl font-normal text-gray-500 font-walbaum mt-12  ">
        The World’s One and Only <br />
        Fact-Based Platform to <br />
        Maximize and Monetize <br />
        Your Business Value –<br />
        Tax Effectively – for All Invested.
      </h1>

      <h1 className="text-center lg:text-6xl md:text5xl text-3xl font-normal text-black font-walbaum mt-8">
        When 84%+ of your business value <br />
        is more than the cost of membership, <br />
        then your decision is clear.
      </h1>

      {/* Video and Message */}
      <div className="lg:flex md:flex mt-14 lg:mx-32 md:mx-40 mx-4">
        <video
          className="md:h-[300px] h-[250px] w-[500px] rounded-lg shadow-2xl"
          src="/assets/HeroVideo.mp4"
          autoPlay
          loop
          playsInline
          controls
        ></video>

        <div className="pl-7 pt-4 lg:pt-0 md:pt-0 space-y-4 text-gray-700 text-lg leading-relaxed font-walbaum">
          <p>
            “Most entrepreneurs fail not because their business wasn’t
            profitable enough.{" "}
          </p>
          <p>
            They fail (on exit) because they didn’t create a business with
            marketable value that creates the generational wealth they and their
            family dynasty deserves for the years they sacrificed and invested
            in building that business.”{" "}
          </p>
          <p>-Harish Chauhan</p>
        </div>
      </div>

      {/* Guest & Member Section */}
      <div className="h-auto mt-14 lg:mx-32 md:mx-40 mx-4 lg:border-2 md:border-2 border-black lg:flex md:flex ">
        {/* Left */}
        <div className="h-auto lg:w-[280px] mb:w-[280px] bg-gray-200 lg:mx-0 md:mx-0">
          <h1 className="text-center text-4xl font-extralight pt-8">
            Jeff Cullen
          </h1>
          <h1 className="text-center text-3xl font-light pt-4">LIVE</h1>

          <div className="h-[400px] lg:w-[240px] md:w-[240px] border-2 border-black mx-5 mt-4">
            <img
              className="h-[396px] w-[320px]"
              src="/assets/jeff-webinar.jpg"
              alt="Jeff Webinar"
            />
          </div>

          <p className="px-4 font-sans pt-4">
            Wednesday, August 20, 2025 <br />
            10am est –11am est Success Story​ 11:15am est-12:15pm est Q&amp;A{" "}
          </p>
          <p className="px-4  pt-4 font-sans font-semibold text-lg pb-2">
            Only 33 Seats
          </p>
        </div>

        {/* Middle */}
        <div className="h-[736px] w-[362px] bg-black">
          <h1 className="text-center text-2xl pt-4 text-white font-sans">
            Guest Registration
          </h1>
          <p className="text-center text-yellow-500 text-xl pt-8">Free</p>

          <hr className="border-t-2 border-gray-400 mt-20" />

          <h1 className="text-base font-sans text-white px-2 pt-3">
            You’ll be entered into a lottery for any remaining 33 live seats. No
            cost to enter. Attendance is not guaranteed
          </h1>
          <h1 className="text-base font-sans text-white px-2 pt-4">
            If NOT selected in the lottery, you’ll still receive:
          </h1>

          <div className="space-y-4 text-white text-base font-sans pt-4 px-2">
            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>Ability to ask Jeff your own business questions</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>Full replay of the webinar</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>
                Complete Q&amp;A report, including concepts, questions, and
                Jeff’s expert answers
              </p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>
                Ongoing Guest benefits that extend far beyond this event –{" "}
                <span className="text-yellow-500 font-medium">See Below</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="h-[736px] w-[362px] bg-slate-100">
          <h1 className="text-center text-2xl pt-4 text-black font-sans">
            Member
          </h1>
          <p className="text-center text-yellow-500 text-xl pt-8">$1797 USD</p>
          <p className="text-center font-sans font-light pt-2 px-2">
            One time purchase. Lifetime Value. ​Discounted 94%+. Limited Time
            Offer.
          </p>

          <hr className="border-t-2 border-black mt-6" />

          <h1 className="text-base font-sans text-black px-2 pt-3">
            Be one of the first 33 paid PRSPERA Lifetime members, and you are
            automatically guaranteed a seat.
          </h1>

          <div className="space-y-4 text-black text-base font-sans pt-4 px-2">
            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>As a member, you receive:</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>Guaranted live access to jeff&apos;s webinar - no lottery</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>Ability to ask jeff your own business question</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>Full replay of the webinar</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>
                Complete Q&amp;A report, including concepts, questions, and
                Jeff’s expert answers
              </p>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>
              <p>
                Ongoing Member benefits that extend far beyond this event –{" "}
                <span className="text-yellow-500 font-medium">See Below</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="h-auto mt-14 lg:mx-32 md:mx-40 mx-4 lg:border-2 md:border-2 border-black lg:flex md:flex ">
        {/* Left */}
        <div className="lg:h-[796px] md:h-[796] h-[200px] lg:w-[280px] md:[280px] w-[364px] bg-gray-200 lg:mx-0 md:mx-0">
          <h1 className="text-center text-4xl font-normal pt-8">PRSPERA</h1>
          <h1 className="text-center text-3xl font-normal pt-4">Service</h1>
        </div>

        {/* Middle */}
        <div className="lg:h-[796px] md:h-[796px] h-[300px] w-[362px] bg-black">
          <h1 className="text-center text-2xl pt-4 text-white font-sans">
            Become our <br /> Guest
          </h1>

          <hr className="border-t-2 border-gray-400 mt-8" />

          <h1 className="text-base font-sans text-yellow-600 px-2 pt-3">
            TL;DR <br /> Sample each of the 12 PRSPERA Services with a monthly
            lottery so all our guests can benefit through participation while
            also experiencing the benefits of membership.
          </h1>
        </div>

        {/* Right */}
        <div className="h-[796px] w-[362px] bg-slate-100">
          <h1 className="text-center text-2xl pt-4 text-black font-sans">
            Become a PRSPERA <br />
            Founding Lifetime Member
          </h1>

          <hr className="border-t-2 border-black mt-8" />

          <h1 className="text-base font-sans text-yellow-600 px-2 pt-3">
            TL;DR <br /> Stop losing enterprise value in the chaos. Lock in
            PRSPERA once. Make it part of your valuation narrative. Create
            alignment and accountability across the business. Learn more
          </h1>

          <div className="space-y-3 text-black text-base font-sans pt-4 px-2">
            <div className="flex gap-2">
              <span className="text-xl">✔</span>

              <div className="space-y-2">
                <p>One Time buy – value for life</p>

                <p className="text-sm ">
                  ▪ 10 years of platform access, renewable and transferrable —
                  boost your exit valuation by passing it to an acquirer
                </p>

                <p className="text-sm ">
                  ▪ Permanent advantage for your entire org—execs, managers,
                  staff, and advisors collaborate daily on your smarter growth
                  and richer exit
                </p>

                <p className="text-sm ">
                  Grandfathered pricing—lock in access to all future platform
                  features under Lifetime or Subscription plans (excludes DFY
                  &amp; some DWY services)
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="text-xl">✔</span>

              <div className="space-y-2">
                <p>Why membership matters: ​</p>

                <p className="text-sm">
                  1.Disengaged teams destroy value. PRSPERA flips that. Every
                  person in your company stays: <br />
                  <span className="font-medium">
                    ▪ Informed (real-time visibility)​{" "}
                  </span>{" "}
                  <br />{" "}
                  <span className="font-medium">
                    ▪ Invested (strategic clarity)​
                  </span>{" "}
                  <br />
                  <span className="font-medium">
                    ▪ Incentivized (value-creation metrics)​
                  </span>
                </p>

                <p className="text-sm">
                  2.Every day becomes an opportunity to: ​ <br />
                  <span className="font-medium">
                    ▪ Resude Risk​{" "}
                  </span> <br />{" "}
                  <span className="font-medium">▪ Increase EBITDA​​</span>{" "}
                  <br />
                  <span className="font-medium">▪ Monetize intangibles​​</span>
                </p>

                <p className="text-sm">
                  Not someday Now Everyone becomes accountable and incentivized
                  to build value smarter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className=" font-sans lg:border-2 md:border-2 border-black mt-2 lg:flex md:flex lg:mx-32 md:mx-32 mx-4 mb-20">
        {/* Left */}
        <div className="w-[280px] bg-white  lg:mx-0 md:mx-0 mx-8">
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
        <div className="w-[362px] h-[600px] flex flex-col bg-black text-white lg:p-2 md:p-2 p-4">
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
            className="h-[50px] w-[340px] border-2 border-yellow-600 bg-black text-lg font-medium text-yellow-600 mt-4 self-center disabled:opacity-60"
          >
            {busy ? "Please wait..." : "Register for Free"}
          </button>
        </div>

        {/* Right */}
        <div className="w-[362px] h-[600px] flex flex-col bg-white text-black lg:p-2 md:p-2 p-4">
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
            className="h-[50px] w-[340px] border-2 border-yellow-600 bg-black text-lg font-medium text-yellow-600 mt-4 self-center disabled:opacity-60"
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
    </section>
  );
};

export default Pricing_Plan;
