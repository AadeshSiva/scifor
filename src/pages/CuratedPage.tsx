import React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const CuratedPage: React.FC = () => {

    const [selectedExpert, setSelectedExpert] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [selectedIssue, setSelectedIssue] = useState("");
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false); // default: not logged in

    // It will check user login or not
    // const token = localStorage.getItem("token"); 
    // const isLoggedIn = Boolean(token);

    const handleConfirm = async () => {

        // if (!isLoggedIn) {
        //     navigate("/auth?plan=guest");
        //     return;
        // }

        if (selectedExpert && selectedTopic && selectedIssue) {
            if (cards.length >= 15) {
                alert("You can only add up to 15 questions.");
                return;
            }

            // new card object
            const newCard = {
                expert: selectedExpert,
                topic: selectedTopic,
                issue: selectedIssue,
            };

            try {
                // 🚀 future API call
                // const response = await fetch("/api/cards", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(newCard),
                // });
                // const result = await response.json();

                // ✅ local update for now
                setCards((prev) => [...prev, newCard]);

                // reset fields
                setSelectedExpert("");
                setSelectedTopic("");
                setSelectedIssue("");

            } catch (error) {
                console.error("Error saving card:", error);
                alert("Something went wrong while saving. Please try again.");
            }
        }
    };




    const expertData = {

        // 1
        "Investment Bankers & M&A Transaction Advisors": {

            topics: {

                "Corporate Strategy": [
                    "What are the top criteria strategic buyers prioritize in my industry?",
                    "How do I position for a premium multiple through differentiation?",
                    "What market timing considerations should I be aware of when preparing for exit?",
                    "How can I prepare multiple exit options (IPO, PE sale, strategic buyer, ESOP)?",
                    "What’s the best way to create competitive tension among bidders?",
                    ""
                ],

                "Corporate Culture": [
                    "How does leadership continuity and depth impact transaction attractiveness?",
                    "Do buyers discount valuations if culture is not aligned with performance?",
                    "How do retention programs (equity, bonuses, phantom stock) affect perceived risk?",
                    "What cultural red flags cause buyers to walk away?",
                    ""
                ],

                "Operations": [
                    "Which operational benchmarks are considered best-in-class in my industry?",
                    "How do operational inefficiencies affect deal valuation?",
                    "What documentation is required for a “clean” due diligence process?",
                    "How much should I invest in ERP, CRM, or automation before exit?",
                    ""
                ],

                "Revenue Model": [
                    "How do recurring revenues change valuation multiples?",
                    "What risks do buyers see in customer concentration?",
                    "How should I structure long-term contracts to increase enterprise value?",
                    "What impact does geographic diversification of revenue have on valuation? ",
                    ""
                ],

                "Shareholder Value & Wealth": [
                    "How can deal structure (cash, earn-outs, stock) optimize after-tax proceeds?",
                    "What’s the tradeoff between maximum valuation vs maximum certainty of closing?",
                    "How should minority shareholders or family members be treated in a sale?",
                    "How do drag-along/tag-along rights influence deal certainty?",
                    ""
                ],

                "Marketing & Sales": [
                    "Do acquirers value sales pipeline management? ",
                    "How important is pricing power and margin defensibility?",
                    "How do branding and sales conversion metrics impact exit valuation?",
                    "Should I invest in channel expansion pre-sale?",
                    ""
                ],

                "Branding": [
                    "To what degree do brand reputation and customer loyalty matter to valuation?",
                    "How should I position brand equity as a financial asset in a sale?",
                    "What brand risks (negative reviews, legacy perception) reduce multiples?",
                    "How do buyers value trademarks, patents, or brand licensing revenues?",
                    ""
                ],
            },
        },

        // 2
        "Private Equity Firms": {

            topics: {

                "Corporate Strategy": [
                    "What investment thesis would PE firms apply to my business?",
                    "How do PE buyers evaluate scalability vs stability?",
                    "What levers do PE firms typically pull to double EBITDA within 5 years?",
                    "How does industry consolidation impact deal strategy?",
                    "",
                ],

                "Corporate Culture": [
                    "How does management team “bench strength” affect investment decisions?",
                    "What leadership gaps do PE firms most often seek to fill?",
                    "What incentives ensure alignment post-investment?",
                    "How do PE firms evaluate succession risk?",
                    ""
                ],

                "Operations": [
                    "What operational KPIs do PE firms monitor most closely?",
                    "How do they assess efficiency in supply chains, logistics, or processes?",
                    "How do they measure readiness for bolt-on acquisitions?",
                    "What systems (ERP, financial reporting, HR) are minimum requirements?",
                    ""
                ],

                "Revenue Model": [
                    "What level of recurring revenue is a threshold for PE interest?",
                    "How do PE firms assess risk-adjusted growth rates?",
                    "What’s the ideal CAC-to-LTV ratio?",
                    "Do they value subscription vs usage-based vs transactional revenues differently?",
                    ""
                ],
                "Shareholder Value & Wealth": [
                    "What equity rollover percentage is typical?",
                    "How should founders think about second bite at the apple (future liquidity)?",
                    "How do PE firms handle dividend recapitalizations?",
                    "How can I negotiate liquidation preferences?",
                    ""
                ],
                "Marketing & Sales": [
                    "How do PE investors evaluate the sophistication of go-to-market strategies? ",
                    "What metrics (churn, pipeline velocity, win/loss ratios) matter most?",
                    "How important is digital marketing ROI tracking? ",
                    "Do they invest in professionalizing sales teams immediately?",
                    ""
                ],
                "Branding": [
                    "Do PE firms view brand as an asset or a cost center?",
                    "How do they assess brand strength vs category positioning?",
                    "What role does brand equity play in roll-up or consolidation plays?",
                    "Do they support rebranding post-acquisition?",
                    ""
                ],
            },
        },

        // 3
        "Commercial Bankers": {

            topics: {

                "Corporate Strategy": [
                    "What capital structures support growth without weakening covenants?",
                    "How do lenders assess business model resilience?",
                    "What early warning signals do banks look for in strategic planning?",
                    "How do they value growth vs stability in risk modeling?",
                    "",
                ],
                "Corporate Culture": [
                    "How does governance affect lending risk?",
                    "Do lenders consider ethics and ESG culture in credit decisions?",
                    "How important is financial discipline and reporting culture?",
                    "",
                ],
                "Operations": [
                    "What debt coverage ratios must operations sustain?",
                    "How do banks evaluate working capital cycles?",
                    "Do banks expect audited financials annually?",
                    "",
                ],
                "Revenue Model": [
                    "How does recurring revenue influence borrowing capacity?",
                    "How do bankers evaluate revenue seasonality?",
                    "What level of customer concentration is acceptable?",
                    "Do banks require hedging strategies for foreign revenue?",
                ],
                "Shareholder Value & Wealth": [
                    "What financing options protect founder equity while raising capital?",
                    "How can debt be structured to maximize tax deductibility? ",
                    "When is mezzanine financing preferable?",
                    "",
                ],
                "Marketing & Sales": [
                    "How does revenue diversification affect lending risk?",
                    "Do banks weigh branding and sales strategy in risk profiles? ",
                    "How does customer churn affect credit availability?",
                    "",
                ],
                "Branding": [
                    "Do strong brands reduce cost of capital?",
                    "How can reputation mitigate lending risk?",
                    "Do banks consider brand value in collateral assessment?",
                    "",
                ],

            },

        },

        // 4
        "Wealth Advisors & Asset Managers": {

            topics: {
                "Corporate Strategy": [
                    "How does my business strategy align with long-term personal wealth goals?",
                    "Should I diversify liquidity events across jurisdictions?",
                    "How should I balance reinvestment in the business vs personal portfolio growth?",
                    "",
                ],
                "Corporate Culture": [
                    "How do employee incentive programs affect my wealth planning?",
                    "Should I set aside liquidity to fund long-term incentive plans?",
                    "",
                ],
                "Operations": [
                    "How do operations affect cash flow available for personal wealth extraction?",
                    "What safeguards should I put in place to reduce personal financial exposure?",
                    "",
                ],
                "Revenue Model": [
                    "How does stability of business revenue inform asset allocation?",
                    "Should I diversify away from industry exposure in my personal investments?",
                    "",
                ],
                "Shareholder Value & Wealth": [
                    "How should I structure liquidity events to minimize taxation? ",
                    "What’s the role of trusts, holding companies, and family offices?",
                    "How do I structure wealth for intergenerational transfer?",
                    "How can I optimize philanthropy and legacy planning?",
                ],
                "Marketing & Sales": [
                    "Does brand-building affect enterprise value extraction timing?",
                    "Should wealth planning accelerate once marketing drives brand growth?",
                ],
                "Branding": [
                    "How do personal brand and business brand intersect in wealth preservation?",
                    "Should I protect personal reputation as an asset class?",
                ],


            }

        },

        // 5
        "Estate Planners": {

            topics: {
                "Corporate Strategy": [
                    "How do estate strategies align with exit timing? ",
                    "Should succession be built into corporate structure early?",
                    "How can estate planning ensure business continuity?",
                ],
                "Corporate Culture": [
                    "How do family values transfer into governance structures? ",
                    "How do estate plans manage family vs non-family leadership transitions?",
                    "",
                ],
                "Operations": [
                    "What legal vehicles protect operations from estate disruption? ",
                    "How do buy-sell agreements safeguard against shareholder disputes?",
                    "",
                ],
                "Revenue Model": [
                    "How can estate planning protect recurring revenues?",
                    "Should insurance be used to replace lost revenue in succession events?",
                    "",
                ],
                "Shareholder Value & Wealth": [
                    "What role do trusts and holding companies play in wealth transfer?",
                    "How should ownership be distributed across heirs?",
                    "How do estate freezes minimize tax exposure?",
                    "How should philanthropic goals be integrated?"
                ],
                "Marketing & Sales": [
                    "Does brand reputation continuity matter in estate planning?",
                    "How should marketing IP be preserved for heirs?",
                ],
                "Branding": [
                    "How do I protect brand legacy after ownership transition?",
                    "Should trademarks and IP be separated from operating companies?",
                ],

            }
        },

        // 6
        "Lawyers (by Specialty)": {

            topics: {
                "Tax Lawyers": [
                    "How should corporate structures (HoldCo, OpCo, Trusts) be designed for tax efficiency?",
                    "What strategies minimize double taxation on dividends, capital gains, or repatriation?",
                    "How do international tax treaties impact cross-border expansion or sale?",
                    "What advance rulings or safe harbors should be secured before exit?",
                ],
                "Intellectual Property (IP) Lawyers": [
                    "What IP protections (trademarks, copyrights, patents) should be registered?",
                    "How do I structure IP ownership (OpCo vs HoldCo) for value protection?",
                    "How do I monetize IP (licensing, royalties, franchising)?",
                    "How do I protect trade secrets during M&A due diligence?",
                ],
                "Contract Lawyers": [
                    "Are supplier and customer contracts transferable in a sale?",
                    "What clauses strengthen recurring revenue (e.g., assignment clauses, renewal terms)?",
                    "What risks exist in current contracts that could kill a deal?",
                    "How should non-compete and non-solicit agreements be structured?",
                ],
                "Employment & Labor Lawyers": [
                    "What employment agreements are standard for executives and staff?",
                    "How do stock option plans comply with labor law?",
                    "What liabilities exist around misclassification of contractors vs employees?",
                    "How do unions or labor disputes affect M&A?",
                ],
                "Corporate / M&A Lawyers": [
                    "How should shareholder agreements be structured (tag-along, drag-along, ROFR)?",
                    "What representations and warranties are typical in purchase agreements?",
                    "How do indemnities and escrows protect against post-sale claims?",
                    "How should due diligence data rooms be prepared legally?",
                ],
                "Regulatory & Compliance Lawyers": [
                    "What licenses or permits must be transferred in a sale?",
                    "How do ESG, data privacy (GDPR, CCPA), and industry regulations affect value?",
                    "What risks exist around anti-corruption, AML, or sanctions compliance?",
                ],
                "Litigation Lawyers": [
                    "How do past or ongoing lawsuits affect valuation?",
                    "What dispute resolution mechanisms protect the company in contracts?",
                    "Should arbitration or mediation clauses be standard?",
                ],
            }
        },

        // 7
        "Business Valuators": {

            topics: {
                "Corporate Strategy": [
                    "Which valuation methodologies (DCF, comps, precedent transactions) apply best?",
                    "How do strategic vs financial buyers differ in valuation approach?",
                    "How does timing (economic cycles, industry trends) impact multiples?",
                ],
                "Corporate Culture": [
                    "Does valuator consider leadership quality, culture, and turnover risk?",
                    "How are employee engagement and retention factored into goodwill?",
                ],
                "Operations": [
                    "How do operational efficiencies (inventory turns, margin stability) affect multiples?",
                    "How is working capital normalized in valuations?",
                ],
                "Revenue Model": [
                    "How do recurring revenues and long-term contracts increase valuation?",
                    "How is customer concentration discounted?",
                    "How is ARR/MRR growth valued in SaaS or subscription models?"
                ],
                "Shareholder Value & Wealth": [
                    "How do minority discounts or control premiums affect shareholder equity?",
                    "What’s the impact of preferred shares or debt covenants on equity value?",

                ],
                "Marketing & Sales": [
                    "Does brand strength or market share affect valuation inputs?",
                    "How are customer lifetime value (CLV) and churn incorporated?",
                ],
                "Branding": [
                    "How do valuators assign value to IP, brand goodwill, and reputation?",
                    "Are brand surveys, NPS, or recognition used in valuation reports?",
                ],

            }
        },

        // 8
        "Insurance Advisors": {

            topics: {
                "Corporate Strategy": [
                    "What key-person insurance protects enterprise value?",
                    "What role does M&A reps & warranties insurance play in transactions?",
                    "How should insurance mitigate succession risks?"
                ],
                "Corporate Culture": [
                    "Do benefits packages support retention and reduce risk?",
                    "How does D&O insurance protect executives and board members?",
                    ""
                ],
                "Operations": [
                    "Are operational risks (supply chain, cyber, property) properly insured?",
                    "Do insurance gaps exist that would alarm buyers?",
                    ""
                ],
                "Revenue Model": [
                    "Can insurance stabilize cash flows (e.g., trade credit insurance)?",
                    "How does insurance support expansion into new markets?",
                    ""
                ],
                "Shareholder Value & Wealth": [
                    "How does life insurance support estate equalization or buy-sell funding?",
                    "What insurance structures protect family wealth in a liquidity event?",
                    ""
                ],

            }
        },

        // 9
        "Accountants": {

            topics: {
                "Corporate Strategy": [
                    "How should tax planning align with business growth and exit strategy?",
                    "What accounting standards (IFRS, GAAP) position the company best for buyers?",
                    "How can accountants model scenarios for exit timing?",
                    ""
                ],
                "Corporate Culture": [
                    "How does financial transparency affect investor trust?",
                    "What internal controls demonstrate financial discipline?",
                    ""
                ],
                "Operations": [
                    "Are monthly/quarterly closes timely and accurate?",
                    "How do auditors view operational risks through financial statements?",
                    ""
                ],
                "Revenue Model": [
                    "How should revenue recognition policies be documented?",
                    "Are deferred revenues and accruals handled correctly for valuation?",
                    ""
                ],
                "Shareholder Value & Wealth": [
                    "How do dividend policies affect retained earnings and equity value?",
                    "How can accountants structure intercompany transfers tax effectively?",
                    ""
                ],
                "Marketing & Sales": [
                    "Are marketing expenses capitalized or expensed appropriately?",
                    "How is ROI on marketing tracked in financial terms?",
                    ""
                ],
                "Branding": [
                    "Can brand-related expenditures be capitalized as intangible assets?",
                    "How should accountants measure goodwill impairment?",
                    ""
                ],

            }
        },

        // 10
        "Business Strategists": {

            topics: {
                "Corporate Strategy": [
                    "What are the 3–5 strategic levers to drive valuation?",
                    "How can the company create defensible competitive advantage?",
                    "What’s the roadmap to premium exit?"
                ],
                "Corporate Culture": [
                    "How do you build value literacy across the team?",
                    "How can performance-based meritocracy be embedded?",
                ],
                "Operations": [
                    "What operational model scales profitably?",
                    "Which KPIs track value creation most effectively?",
                    ""
                ],
                "Revenue Model": [
                    "How can revenue streams be diversified or productized?",
                    "How should recurring revenues be built strategically?",
                    ""
                ],
                "Shareholder Value & Wealth": [
                    "What incentive programs align all stakeholders to value creation?",
                    "How should ownership be structured for fairness and motivation?",
                    ""
                ],
                "Marketing & Sales": [
                    "What positioning strategy maximizes enterprise value?",
                    "How can go-to-market accelerate exit multiples?",
                    ""
                ],
                "Branding": [
                    "How should brand strategy be aligned with corporate strategy?",
                    "What brand story drives premium valuation?",
                    ""
                ],


            }
        },

        // 11
        "Brand Advisors": {

            topics: {
                "Brand Advisors": [
                    "How is brand equity measured financially and strategically?",
                    "How can visual identity, messaging, and positioning be made acquisition-ready?",
                    "What reputational risks must be mitigated before exit?",
                    "How should founder brand vs company brand be balanced?",
                    "What role does customer loyalty play in perceived brand value?"
                ],


            }
        },

        // 12
        "Marketing Specialists": {

            topics: {
                "Marketing Specialists": [
                    "What channels generate the highest value customers?",
                    "How should marketing attribution be measured to show ROI to buyers?",
                    "What demand generation strategies create defensible market share?",
                    "How should marketing data be structured for due diligence?",
                    "What customer analytics strengthen valuation narrative?"
                ],

            }
        },

        // 13
        "Advertising Agencies": {

            topics: {
                "Advertising Agencies": [
                    "How does brand awareness translate into financial value?",
                    "What creative assets are proprietary and transferrable in a sale?",
                    "How should campaigns be structured to show measurable ROI?",
                    "How do ad spend efficiencies compare to industry benchmarks?",
                    "What reputational risks (controversial ads, poor messaging) must be avoided pre-exit?"
                ],

            }
        },

        // 14
        "HR/People & Culture Experts": {

            topics: {
                "HR/People & Culture Experts": [
                    "How should leadership succession pipelines be designed?",
                    "What incentive programs align all levels of staff to value creation?",
                    "How do you measure and improve employee engagement?",
                    "How can HR data (turnover, tenure, retention costs) be positioned as a value driver?",
                    "What risks (toxic culture, lawsuits, disengagement) reduce enterprise value?",
                    "How do equity, ESOPs, and performance bonuses align staff with exit goals?"
                ],

            }
        },

        // 15
        " Other Experts to Include": {

            topics: {
                "Cybersecurity Advisors": [
                    "How do cybersecurity practices affect M&A valuation?",
                    "What compliance certifications (ISO, SOC 2) increase buyer confidence?",
                ],
                "IT & Digital Transformation Advisors": [
                    "How does digital maturity increase scalability and valuation?",
                    "What tech debt must be resolved before exit?",
                ],
                "ESG & Sustainability Advisors": [
                    "How do ESG ratings impact access to capital and buyer interest?",
                    "How do sustainability initiatives reduce risk and increase brand value?",
                ],
                "Organizational Psychologists": [
                    "How does leadership psychology impact succession risk?",
                    "How can founder dependence be reduced?",
                ],

            }
        }

    };


    return (
        <>


            {/* Curated Section  */}
            <section className="bg-gray-400 pb-20">

                <h1 className="text-5xl text-center font-thin tracking-widest pt-20">CURATED</h1>
                <h2 className="text-4xl text-center font-light pt-4">Learn Exactly What You Need.</h2>
                <h2 className="text-4xl text-center font-medium pt-2">From Exactly Who You Need. <br />
                    Just Ask – It’s FREE.
                </h2>

                {/* Video & Content Section */}
                <div className="md:flex lg:flex mt-20 mx-2 md:mx-6 mb-10 ">

                    {/* Video */}
                    <div className="w-full max-w-xl ">
                        <video
                            src="/assets/HeroVideo.mp4"
                            controls
                            autoPlay
                            loop
                            muted
                            className="w-full h-auto rounded-lg shadow-2xl"
                        />
                    </div>


                    {/* Content */}
                    <div className="text-black md:px-4 lg:px-4 pt-4 md:pt-0 ">

                        <p className="text-lg">
                            <span className="font-semibold">CURATED </span>  is not a webinar.
                            It’s a precision–built insight session — built by founders, for founders.
                        </p>

                        <p className="pt-2">At the end each quarter, we:</p>

                        <ul className="list-disc list-inside font-medium">
                            <li>
                                <span className="font-bold">GET</span> all your requests
                            </li>
                            <li>
                                <span className="font-bold">FIND</span> the best, goal congruent experts
                            </li>
                            <li>
                                <span className="font-bold">GET</span> answers to your most burning issues
                            </li>
                        </ul>

                        <p className="pt-2">
                            As soon as we have someone vetted – they will be hosted on PRSPERA – and you
                            can get all your questions answered – even after the event.
                        </p>

                        <p className="pt-2">
                            Tell us your blockers. We build the session. You get only what matters, and nothing else.
                        </p>
                    </div>


                </div>

            </section>


            {/* ASK Jeff */}
            <section className="h-auto bg-slate-600 pb-20">

                {/* Heading */}
                <div className="text-center text-white pt-20">
                    <h1 className="text-4xl font-extralight ">ASK Jeff</h1>
                    <h1 className="text-4xl font-bold pt-4">Our Global UPh Ambassador <br /> He founded, grew and exited with a <br /> double-digit multiple valuation – <br /> <span className="text-black"> using his UPh: Prosperity For All. </span></h1>
                </div>

                {/* Video & Content Section */}
                <div className="md:flex lg:flex mt-20 mx-2 md:mx-6  ">

                    {/* Video */}
                    <div className="w-full max-w-5xl mx-auto">
                        <video
                            src="/assets/HeroVideo.mp4"
                            controls
                            autoPlay
                            loop
                            muted
                            className="w-full h-auto rounded-lg shadow-2xl"
                        />
                    </div>


                    {/* Content */}
                    <div className="text-white md:px-4 lg:px-4 pt-4 md:pt-0 space-y-4">

                        <p className="">Every quarter, at Jeff’s availability – we will ask him for his insights on your biggest, baddest, burning blockers. ​</p>
                        <p> As a courtesy to Jeff who is celebrating entrepreneurial freedom. We require you to confirm you have reviewed all the content already presented by Jeff and PRSPERA Founder, Harish Chauhan – on our PROOF page here.</p>

                        <Link to="/Proof">
                            <button className="bg-black text-xl text-yellow-600 border-2 border-yellow-600 hover:text-yellow-800 rounded-xl font-semibold p-3 mt-4">
                                Jeff’s FULLStory On How He WON
                            </button>
                        </Link>

                    </div>


                </div>

                <p className="text-white text-3xl mt-20 mx-2 md:mx-8 lg:mx-10">
                    Following your confirmation, your answers will be provided by Jeff only upon availability.
                    Harish Chauhan, PRSPERA Founder and his immediate UPhTM Executive Catalysts will directly
                    address each question and request, nonetheless.
                </p>


                {/* Cards List */}
                {cards.length > 0 && (
                    <div className="mt-20 space-y-8 max-w-3xl mx-2 md:mx-auto">

                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 bg-gray-300 p-5 rounded-xl shadow-xl border border-gray-400"
                            >
                                <span className="text-xl font-bold">{index + 1}.</span>
                                <div className="flex-1">
                                    <p><span className="font-semibold">Expert:</span> {card.expert}</p>
                                    <p><span className="font-semibold">Topic:</span> {card.topic}</p>
                                    <p><span className="font-semibold">Issue:</span> {card.issue}</p>
                                </div>

                                {/* delete button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this question?")) {
                                            setCards(cards.filter((_, i) => i !== index));
                                        }
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
                                >
                                    ✕
                                </button>


                            </div>
                        ))}
                    </div>
                )}


                {/* Question  */}
                <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-2 md:mx-auto mt-20">

                    <form className="space-y-10 pt-8">

                        {/* Expert */}
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">

                            <label className="w-40 font-semibold text-gray-700">Ask the Expert</label>

                            <select
                                value={selectedExpert}
                                onChange={(e) => {
                                    setSelectedExpert(e.target.value);
                                    setSelectedTopic("");
                                    setSelectedIssue("");
                                }}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                            >
                                <option value="">Choose Sector</option>
                                {Object.keys(expertData).map((expert) => (
                                    <option key={expert} value={expert}>
                                        {expert}
                                    </option>
                                ))}
                            </select>

                        </div>


                        {/* Topic */}
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full mb-4">

                            <label className="md:w-40 mb-2 md:mb-0 font-semibold text-gray-700">
                                Topic
                            </label>

                            <select
                                value={selectedTopic}
                                onChange={(e) => {
                                    setSelectedTopic(e.target.value);
                                    setSelectedIssue(""); // reset issue
                                }}
                                disabled={!selectedExpert} // disable until expert is chosen
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                            >
                                <option value="">Choose a topic</option>
                                {selectedExpert &&
                                    Object.keys(expertData[selectedExpert].topics).map((topic) => (
                                        <option key={topic} value={topic}>
                                            {topic}
                                        </option>
                                    ))}
                            </select>

                        </div>

                        {/* Issue */}
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full mb-4">

                            <label className="md:w-40 mb-2 md:mb-0 font-semibold text-gray-700">
                                Issue
                            </label>

                            <select
                                value={selectedIssue}
                                onChange={(e) => setSelectedIssue(e.target.value)}
                                disabled={!selectedTopic} // disable until topic is chosen
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none disabled:opacity-50"
                            >
                                <option value="">Choose an issue</option>
                                {selectedExpert &&
                                    selectedTopic &&
                                    expertData[selectedExpert].topics[selectedTopic].map((issue, i) => (
                                        <option key={i} value={issue}>
                                            {issue}
                                        </option>
                                    ))}
                            </select>

                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end space-x-3 pt-6 pb-10">

                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="px-6 py-2 rounded-full bg-black text-white hover:bg-yellow-500 transition"
                            >
                                Confirm
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedExpert("");
                                    setSelectedTopic("");
                                    setSelectedIssue("");
                                }}
                                className="px-6 py-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>

                </div>


                {/*Ask Jeff  Button */}
                <div className="flex justify-center mt-20 mb-20">

                    <Link to="/pricing-plan">
                        <button
                            type="button"
                            className="px-14 md:px-28 lg:px-28 py-6 rounded-xl bg-black text-yellow-500 text-2xl font-bold shadow-2xl border-2 border-yellow-500 hover:text-yellow-300 hover:border-yellow-300"
                        >
                            Ask Jeff and Take Action
                        </button>
                    </Link>

                </div>



            </section>

            {/* Footer at the bottom */}
            <Footer />
        </>
    );
};

export default CuratedPage;
