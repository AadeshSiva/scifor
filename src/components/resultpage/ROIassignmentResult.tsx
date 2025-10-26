import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  issues: string;
  description: string[];
  subtotal: string;
}
interface User {
  country: string;
  role: string;
  price?: string;
  id: string;
  email: string;
  full_name: string;
  username: string;
  email_verified: boolean;
  paid: boolean;
  iswebinarformfilled: boolean;
  is_staff: boolean;
}
const tasks: Task[] = [
  {
    id: 1,
    title: "1. CORPORATE STRATEGY",
    issues: "CHANGING STRATEGY OR NON–EXISTENT STRATEGY",
    description: [
      "How much does/would it cost you to CHANGE YOUR STRATEGY every time the leadership of your company changes?",
      "How much would it be worth to get one clear, overall strategy that can be used for the LIFETIME of your company?",
      "What value do you place on having a CLEAR GROWTH STRATEGY that grows your business efficiently by identifying your KEY customers & employees?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 1,
    title: "1. CORPORATE STRATEGY",
    issues: "INADEQUATE EXIT STRATEGY OR SUCCESSION PLAN",
    description: [
      "How much do you think your well-being and finances are ENDANGERED by not planning your business succession effectively in advance?",
      "How much would a strategy that alleviates some SUCCESSION RISKS be worth to you?",
      "How much can you potentially lose at the exit point (retirement) if your company value is not FULLY VALUED because it is dependent on the owner?",
      "How much would it be worth to have a tangible way of building DIRECT FINANCIAL VALUE in your company’s goodwill?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 1,
    title: "1. CORPORATE STRATEGY",
    issues: "FACULTY/INOPERATIONAL MISSION & VISION STATEMENTS",
    description: [
      "How much have you invested in developing your mission/vision statement, which happens to be INEFFECTIVE for managing your company?",
      "How much would it be worth to ensure a BUY-IN of your company philosophy ACROSS ALL LEVELS of your company?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 1,
    title: "1. CORPORATE STRATEGY",
    issues: "MISALIGNED SHAREHOLDER",
    description: [
      "How much of your bottom line is affected by not having company shareholders, stakeholders, and management ON THE SAME PAGE for key decision-making?",
      "Is the value of shareholders, management and staff not seeing eye-to-eye or working towards the SAME GOALS both time-wise and monetarily?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 2,
    title: "2. CORPORATE CULTURE",
    issues: "INEFFECTIVE MANAGEMENT & OPERATION",
    description: [
      "How much does it hurt the organization to have INEFFECTIVE MANAGEMENT?",
      "How much is it worth to have your company managed more EFFECTIVELY AND EFFICIENTLY?",
      "How much does it cost the company when all staff members are NOT working together and fulfilling the CORPORATE AGENDA AND COMPANY PROMISE?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 2,
    title: "2. CORPORATE CULTURE",
    issues: "HIGH EMPLOYEE TURNOVER & UNMOTIVATED STAFF",
    description: [
      "How much do you think your well-being and finances are ENDANGERED by not planning your business succession effectively in advance?",
      "How much would a strategy that alleviates some SUCCESSION RISKS be worth to you?",
      "How much can you potentially lose at the exit point (retirement) if your company value is not FULLY VALUED because it is dependent on the owner?",
      "How much would it be worth to have a tangible way of building DIRECT FINANCIAL VALUE in your company's goodwill?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 2,
    title: "2. CORPORATE CULTURE",
    issues: "FINDING & KEEPING THE BEST PEOPLE",
    description: [
      "How much have you invested in developing your mission/vision statement, which happens to be INEFFECTIVE for managing your company?",
      "How much would it be worth to ensure a BUY–IN of your company philosophy ACROSS ALL LEVELS of your company?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 2,
    title: "2. CORPORATE CULTURE",
    issues: "MISALIGNED COMMUNICATION PROBLEMS IN THE COMPANY",
    description: [
      "How much of your bottom line is affected by not having company shareholders, stakeholders and management ON THE SAME PAGE for key decision-making?",
      "Is the value of shareholders, management and staff not seeing eye-to-eye or working towards the SAME GOALS both time-wise and monetarily?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 3,
    title: "3. OPERATIONS",
    issues: "MISSING OR INEFFECTIVE BUSINESS PROCESS",
    description: [
      "How much does your company lose by not having an EFFECTIVE BUSINESS PROCESS?",
      "How much would it be worth to you to establish an effective business process WITH BENCHMARKS that accomplish ONE ULTIMATE GOAL?",
      "What value do you place on having all your DEPARTMENTS WORKING TOGETHER SYSTEMATICALLY and delivering one customer promise CONSISTENTLY?",
    ],
    subtotal: "OPERATIONS",
  },
  {
    id: 3,
    title: "3. OPERATIONS",
    issues: "FAILING TO FOLLOW THE BUSINESS PROCESS",
    description: [
      "How much is it costing annually when products and services are POORLY DELIVERED?",
      "What value do you place on customers being dissatisfied due to POOR OPERATIONAL ACCOUNTABILITY?",
      "How much does it cost your company when things do not get done CORRECTLY?",
      "How much does FAILURE TO FOLLOW THE BUSINESS PROCESS cost your company?",
      "How much is it worth to MINIMIZE such failures?",
      "hat value do you place on having a STREAMLINED BUSINESS PROCESS?",
    ],
    subtotal: "OPERATIONS",
  },
  {
    id: 3,
    title: "3. OPERATIONS",
    issues: "MISALIGNED COMMUNICATION PROBLEMS IN THE COMPANY",
    description: [
      "How much have you been losing to your competition because your products and services are OUTDATED?",
      "How much does it cost to DETERMINE THE RIGHT CHANGES to make for new products and services?",
      "How much would it be worth to acquire a strategy that will focus the company on delivering and developing KEY PRODUCTS AND SERVICES ONLY?",
      "What value do you place on your company’s ABILITY TO INNOVATE?",
      "What will it cost you if you CANNOT INNOVATE EFFECTIVELY?",
    ],
    subtotal: "OPERATIONS",
  },

  {
    id: 4,
    title: "4. REVENUE MODEL",
    issues: "THE COMPANY SUFFERS FROM COSTLY CUSTOMERS",
    description: [
      "How much do you lose annually serving UNPROFITABLE or BAD customers?",
      "How much would it be worth to serve MORE PROFITABLE?",
      "What is it worth to the company to precisely identify its IDEAL CUSTOMER AND MARKETS?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 4,
    title: "4. REVENUE MODEL",
    issues:
      "THE COMPANY LACKS REVENUE & DISTRIBUTION OPPORTUNITIES + PRICE NICHE OF THE COMPANY IS UNCLEAR",
    description: [
      "How much do you think your company loses in revenues due to its LIMITED EXPOSURE in the marketplace?",
      "How much is it worth to ACCURATELY EXTEND your distribution and products/services?",
      "What value would you place on having the ability to CORRECTLY identify NEW REVENUE AND MARKET OPPORTUNITIES?",
      "How much of your market share do you lose to your competition because your MARKET NICHE is UNCLEAR?",
      "How much would it be worth to determine your PRICE NICHE, MARKET SEGMENT and APPROPRIATE revenue model?",
      "How much would it be worth to JUSTIFIABLY INCREASE YOUR PRICE MARGINS, even in a price-sensitive industry?",
    ],
    subtotal: "CORPORATE STRATEGY SUBTOTAL",
  },
  {
    id: 5,
    title: "5. SHAREHOLDER VALUE & WEALTH",
    issues: "MISSING OR INEFFECTIVE INTANGIBLE ASSETS",
    description: [
      "How much do you “suspect” you may be losing because your INTANGIBLE ASSETS (intellectual property, goodwill, BRAND etc.) are NOT WELL ACCOUNTED FOR?",
      "What value would you place on ineffective use of your current INTANGIBLE ASSETS?",
      "What is it worth if you could NOT RECEIVE what your company is TRULY WORTH?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },

  {
    id: 5,
    title: "5. SHAREHOLDER VALUE & WEALTH",
    issues: "WEALTH OPTIMIZATION",
    description: [
      "How much of your COMPANY GOODWILL are you maximizing annually? If you do not know, HOW MUCH would you like it to GROW ANNUALLY?",
      "What is it worth to have a better way to protect your financial interests until retirement and be compensated?",
      "What would it be worth to have a better way to cash out of the company?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 5,
    title: "5. SHAREHOLDER VALUE & WEALTH",
    issues: "BUSINESS VALUATION AT RISK",
    description: [
      "What would it be worth to detach the owner's equity and reconnect it to the business for a successful exit?",
      "What is the current value of your company goodwill that may be poorly valued or compensated?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 6,
    title: "6. MARKETING & SALES",
    issues: "THE COMPANY SUFFERS FROM COSTLY CUSTOMERS",
    description: [
      "How much is it costing you in sales by not having a SINGLE CLEAR CUSTOMER PROMISE that the entire company can deliver on?",
      "How much do you lose annually serving UNPROFITABLE or BAD CUSTOMERS?",
      "How much would it be worth to serve MORE PROFITABLE and IDEAL customers?",
      "How much does it cost you not to have an EFFECTIVE AND EXPLICIT MARKETING AND SALES FOCUS, which your sales force utilize effectively?",
    ],
    subtotal: "MARKETING & SALES SUBTOTAL",
  },
  {
    id: 6,
    title: "6. MARKETING & SALES",
    issues: "LEAD GENERATION, CONVERSION & FULFILLMENT",
    description: [
      "What value do you place on having a SYSTEMATIC AND SIMPLIFIED way to promote to new prospects?",
      "How much is it worth to you to have your company’s value proposition clearly defined to new and prospective customers?",
    ],
    subtotal: "MARKETING & SALES SUBTOTAL",
  },

  {
    id: 7,
    title: "7. BRANDING",
    issues: "CUTTHROAT COMPETITION AND FORCED TO COMPETE ON PRICE",
    description: [
      "How much do you lose annually in HARD COSTS, COMPANY WELL–BEING OR MARKET SHARE because of cutthroat competition?",
      "How much is it worth to get a strategy that puts you AHEAD OF YOUR COMPETITION?",
      "What value do you place on having BETTER JUSTIFIED PRICES in a highly competitive environment?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 7,
    title: "7. BRANDING",
    issues: "POOR CUSTOMER LOYALTY",
    description: [
      "How much do you think you or your company spends on marketing and loses in revenue due to HIGH CUSTOMER TURNOVER?",
      "How much would it be worth to get a strategy that IMPROVES CUSTOMER LOYALTY over time?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },

  {
    id: 7,
    title: "7. BRANDING",
    issues: "BRAND MESSAGE IS UNCLEAR + BRAND IDENTITY IS WEAK",
    description: [
      "How much do you think your company loses in POTENTIAL MARKET SHARE due to an UNCLEAR BRAND MESSAGE?",
      "How much is it worth to you to have a CLEAR BRAND MESSAGE that streamlines your staff and helps customers buy?",
      "What value do you place on having a STRONG BRAND IDENTITY that truly makes your company distinct and unique in the marketplace and to customers?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 7,
    title: "7. BRANDING",
    issues: "UNCLEAR ON WHAT THE COMPANY IS ABOUT",
    description: [
      "How much does this issue DAMAGE YOUR REPUTATION, inside or outside the company?",
      "How much is it worth to you to ensure a BUY–IN for YOUR BRAND among your present and potential future employees?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 7,
    title: "7. BRANDING",
    issues: "CHANGING BRAND MESSAGES",
    description: [
      "How much does it cost you to CHANGE YOUR BRAND MESSAGE?",
      "How much is it worth to get ONE BRAND message for the LIFETIME of your company?",
      "How much does this problem DAMAGE YOUR REPUTATION?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },

  {
    id: 7,
    title: "7. BRANDING",
    issues: "BRAND MESSAGE OVER–PROMISE",
    description: [
      "How much of your COMPANY GOODWILL are you maximizing annually? If you do not know, HOW MUCH would you like it to GROW ANNUALLY?",
      "What is it worth to have a better way to protect your financial interests until retirement and be compensated?",
      "What would it be worth to have a better way to cash out of the company?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 7,
    title: "7. BRANDINGH",
    issues: "NOT ENOUGH ATTENTION TO THE COMPANY",
    description: [
      "How much is it worth to you to get rid of or reduce this OVER–PROMISING?",
      "How much would it be worth to you to build a strong BRAND IDENTITY for your company that your people are proud of and that inspires action?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 7,
    title: "7. BRANDING",
    issues: "OPERATIONAL BRAND PROMISE",
    description: [
      "How much value would you receive if you were to realign your company with a BRAND PROMISE that you can promise operationally throughout every department and with all staff?",
      "What is your brand’s worth if a company were to buy it TODAY?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
  {
    id: 7,
    title: "7. BRANDING",
    issues: "POOR BRAND EQUITY OR NONEXISTENT",
    description: [
      "How much would it be worth to you to have MORE EQUITY OR VALUE in your brand?",
      "What value would you place on having a DIRECT WAY to financially value your company brand?",
    ],
    subtotal: "SHAREHOLDER VALUE & WEALTH SUBTOTAL",
  },
];

const ROIassignmentResult: React.FC = () => {
  // Group tasks by their title (category)
  const [userData, setUserData] = useState<User | null>(null);
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.title]) {
      acc[task.title] = [];
    }
    acc[task.title].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchData = async () => {
      if (!token) {
        console.warn("No access token found in localStorage");
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch("https://api.prspera.com/extract-user-data/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }
        const userDataResponse = await userResponse.json();
        setUserData(userDataResponse.user_data || userDataResponse);
        console.log(userDataResponse)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  },[]); 

  return (
    <div className="roi-result-container p-6 bg-white mt-16">
      {/* Header Section */}
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Name</span>
              <span className="text-gray-900 font-semibold">
                {userData?.full_name || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Alias</span>
              <span className="text-gray-900 font-semibold">
                {userData?.username || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Email ID</span>
              <span className="text-gray-900 font-semibold">
                {userData?.email || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Submitted Date</span>
              <span className="text-gray-900 font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Issues Table */}
      <div className="issues-table">
        <div className="table-header grid grid-cols-3 bg-gray-100 p-3 font-bold border">
          <div>ISSUES</div>
          <div>Topic</div>
          <div className="text-right">$ VALUE</div>
        </div>
        {/* Pre-UP Section */}
        <div className="pre-up-section bg-yellow-50 p-3 border border-yellow-200">
          <div className="font-bold text-lg mb-2">Pre–UP™</div>
        </div>
        {/* Tasks by Category */}
        {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
          <div key={category} className="category-section">
            <div className="category-header bg-blue-50 p-3 font-bold border">
              {category}
            </div>
            {categoryTasks.map((task, index) => (
              <div key={`${task.id}-${index}`} className="task-item border-b">
                <div className="task-header grid grid-cols-3 p-3 bg-gray-50">
                  <div className="issues-column">
                    <div className="font-semibold">{task.issues}</div>
                  </div>
                  <div className="topic-column">
                    {task.description.map((desc, descIndex) => (
                      <div key={descIndex} className="text-sm mb-2">
                        {desc}
                      </div>
                    ))}
                  </div>
                  <div className="value-column text-right">
                    <div className="value-placeholder h-8 border-b border-gray-300 mb-2"></div>
                  </div>
                </div>
              </div>
            ))}
            {/* Subtotal for each category */}
            <div className="subtotal-row grid grid-cols-3 p-3 bg-gray-100 font-bold border">
              <div>{categoryTasks[0]?.subtotal || 'SUBTOTAL'}</div>
              <div></div>
              <div className="text-right">
                <div className="subtotal-placeholder h-6 border-b border-gray-400"></div>
              </div>
            </div>
          </div>
        ))}
        {/* Grand Total Section */}
        <div className="grand-total-section grid grid-cols-3 p-4 bg-blue-100 font-bold text-lg border">
          <div>GRAND TOTAL</div>
          <div></div>
          <div className="text-right">
            <div className="grand-total-placeholder h-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ROIassignmentResult;