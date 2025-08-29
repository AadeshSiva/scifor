import React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";



const CuratedPage: React.FC = () => {

    const [selectedExpert, setSelectedExpert] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [selectedIssue, setSelectedIssue] = useState("");


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
        " Commercial Bankers": {

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
                    "Do strong brands reduce cost of capital?",
                    "How can reputation mitigate lending risk?",
                    "Do banks consider brand value in collateral assessment?",
                    "",
                ],

            }
        }
    };


    return (
        <>
            <main className="h-auto">

                {/* Curated Section  */}
                <section className="bg-gray-400 pb-20 h-auto">

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
                                    type="submit"
                                    className="px-6 py-2 rounded-full bg-black text-white hover:bg-yellow-500 transition"
                                >
                                    Confirm
                                </button>

                                <button
                                    type="button"
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

            </main >

            {/* Footer at the bottom */}
            <Footer />
        </>
    );
};

export default CuratedPage;
