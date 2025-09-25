import { CSSProperties, useEffect, useState } from "react";

interface OpenItemsState {
  [key: number]: boolean;
}
const PlusIcon: React.FC = () => (
  <img
    src="/assets/Plus.svg"
    alt="Plus"
    style={
      {
        display: "block",
        width: "24px",
        height: "24px",
        flexShrink: 0,
        WebkitFlexShrink: 0,
      } as CSSProperties
    }
  />
);
// Close icon component
const CloseIcon: React.FC = () => (
  <img
    src="/assets/Plus.svg"
    alt="Close"
    style={
      {
        display: "block",
        width: "24px",
        height: "24px",
        flexShrink: 0,
        WebkitFlexShrink: 0,
        transform: "rotate(45deg)",
        WebkitTransform: "rotate(45deg)",
        MozTransform: "rotate(45deg)",
        msTransform: "rotate(45deg)",
      } as CSSProperties
    }
  />
);
// FAQ Section
const faqs = [
  {
    question:
      "I already have a profitable business. Why should I care about PRSPERA?",
    answer:
      "Because profit ≠ value. And value ≠ exit. 80% of businesses never sell. Not because they weren't profitable — but because they weren't transferable, defensible, or structured to be bought. You may be generating income. But if 84% of your value is intangible and unmanaged, the market won't pay for it when it counts. PRSPERA makes sure they do.",
  },
  {
    question:
      "Why do I need a platform to tell me what my team should already be doing?",
    answer:
      "Because your team wasn't hired, trained, or incentivized to build enterprise value. They're executing — not capitalizing. And statistically? 77% of them are disengaged. So yes — they're doing work, but they're not building value. PRSPERA gives you the structure, the tools, and the visibility to turn daily work into equity growth.",
  },
  {
    question: "I already have advisors — accountants, lawyers, even a coach.",
    answer:
      "Great. But PRSPERA doesn't replace your advisors. It activates your internal value engine so your advisors can actually protect and scale something worth defending. Most advisors come in after the value's been eroded. PRSPERA starts before — where value is built (or lost): inside your team, systems, and strategy.",
  },
  {
    question: "This sounds like theory. How do I know this stuff works?",
    answer:
      "It's not theory, it's facts: 84% of your enterprise value is inside your intangible assets – if you have not maximized that value (across at least 11 value drivers), made that value monetizable, and tax effective then you risk everything you have built so far. Jeff Cullen proved that these intangible assets' value can be maximized, monetized tax effectively by all management and staff – if done early enough and operationalized on a daily basis via the Unifying Philosophy – a proprietary PRSPERA Strategy System. This isn't a \"nice-to-have\". PRSPERA is the difference between a life-changing exit… and a massive regret that will last generations.",
  },
  {
    question: "Can't I just wait until I'm ready to sell?",
    answer:
      "Sure. If you're okay with watching your value silently rot while you wait. Every day without action = compounding decay of your intangibles. By the time you're \"ready,\" it's often too late to recover what you've lost. PRSPERA is for founders who want control over when, how, and how much they exit for.",
  },
  {
    question: "What exactly do I get with PRSPERA? Break it down.",
    answer:
      "Here's what you unlock: A real-world M&A opinion of your street valuation. A quantified Exit Richer Gap Report. A mapped de-risking action plan (top 10 plays, customized). Access to our vetted advisory network. Templates, scorecards, and team-driven value acceleration tools. A system to activate your people to build transferable value daily. Tax-efficient exit design strategy (yes, the real stuff). And if you're one of the first 111: You get lifetime access, a private session with Jeff, and the complete exit stack for $1797. One-time.",
  },
  {
    question: "What happens if I do nothing?",
    answer:
      "Simple: You'll keep thinking you're worth more than the market will pay. Your team will stay disengaged, and their work will keep leaking value. You'll exit with less. Maybe nothing. And you'll never know what you could have had — until it's too late.",
  },
  {
    question: "Why is it so cheap? $1797 isn't for all that?",
    answer:
      "Because this is the founding member round. You're betting on the only platform designed to protect your exit before it's at risk. Later, this goes full enterprise. Full price. Full-stack. For now? We want the bold, the committed, the no-BS founders who get it — and want in. \"What if my business is 'too small' or 'not ready yet' for this?\" If you're profitable, if you've got people, and if you've built anything worth protecting — you're ready. This isn't just for $50M enterprises. This is for the $2M–$30M founder who wants to get smart before it's too late. PRSPERA is how you scale with intelligence, not ignorance. \"Can't I just get a valuation from a broker or banker instead?\" Sure — if you want a number based on theory that no real buyer will ever pay. Most valuations are inflated. Most founders never hit them. PRSPERA gives you the street value — what the market would offer you today, based on how transferable, defensible, and scalable your business really is. You want a vanity metric, go to a broker. You want reality and a plan to raise it? You're in the right place.",
  },
  {
    question: "How long does it take to get results?",
    answer:
      "The platform is built for fast clarity and immediate action: Your Exit Richer Gap Report lands in <14 days. Your street value opinion comes within 30–90 days (M&A partner dependent). Top 10 actions to recover value → same week. Some members see valuation boosts in 60–90 days. Others spend the year playing chess while everyone else plays checkers.",
  },
  {
    question: "Will this work in my industry?",
    answer:
      "If your business has people, processes, customers, and profit — yes. We're industry-agnostic, because the fundamentals are the same: Value is built on systems, teams, defensibility, and structure. Whether you're SaaS, services, manufacturing, or tech-enabled — PRSPERA gives you the levers.",
  },
  {
    question: "How do I know who's advising me? Who built this?",
    answer:
      "You'll be backed by a vetted network of Ex-operators who exited 8- and 9-figure companies. M&A pros with $1B+ in closed deals. Tax and structuring experts who've saved founders millions. And the creators of PRSPERA — a platform built on real-world exit wins, not ivory tower theory. This isn't some guru course. This is execution infrastructure.",
  },
  {
    question: "Can I cancel or get a refund?",
    answer:
      "We don't offer refunds — we offer results. But if you show up, use the system, and don't get a clear valuation, de-risking strategy, and exit playbook within 90 days — we'll fix it or make it right. Simple as that.",
  },
];
export const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<OpenItemsState>({});
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = (): void => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleItem = (index: number): void => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const questionTextStyle: CSSProperties = {
    fontSize: windowWidth < 640 ? "16px" : windowWidth < 768 ? "18px" : "20px",
    lineHeight:
      windowWidth < 640 ? "24px" : windowWidth < 768 ? "28px" : "32px",
    fontWeight: "600",
  };
  const answerTextStyle: CSSProperties = {
    fontSize: windowWidth < 640 ? "14px" : windowWidth < 768 ? "16px" : "18px",
    lineHeight:
      windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
  };
  return (
    <section className="w-full py-6 sm:py-8 md:py-16 px-2 sm:px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-12" />
        <h2
          className="text-center mb-4 sm:mb-6 md:mb-12"
          style={
            {
              fontFamily: "walbaum",
              color: "#9ca3af",
              fontSize:
                windowWidth < 480
                  ? "24px"
                  : windowWidth < 640
                    ? "28px"
                    : windowWidth < 768
                      ? "32px"
                      : windowWidth < 1024
                        ? "38px"
                        : windowWidth < 1280
                          ? "44px"
                          : "52px",
              lineHeight:
                windowWidth < 480
                  ? "28px"
                  : windowWidth < 640
                    ? "32px"
                    : windowWidth < 768
                      ? "36px"
                      : windowWidth < 1024
                        ? "42px"
                        : windowWidth < 1280
                          ? "48px"
                          : "56px",
              fontWeight: 300,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            } as CSSProperties
          }
        >
          Frequently Asked Questions
        </h2>
        <div className="py-4 sm:py-12 md:py-16">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-2 sm:p-3 md:p-4 cursor-pointer transition-all duration-300 border-b border-black"
                onClick={() => toggleItem(idx)}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                      {openItems[idx] ? <CloseIcon /> : <PlusIcon />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-gray-900 leading-relaxed break-words"
                      style={questionTextStyle}
                    >
                      {faq.question}
                    </p>
                    {openItems[idx] && (
                      <div className="mt-2 sm:mt-3 overflow-hidden transition-all duration-300">
                        <p
                          className="text-gray-600 leading-relaxed break-words"
                          style={answerTextStyle}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
