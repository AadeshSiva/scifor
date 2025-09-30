import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faRegistered,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBackPopup } from "@/hooks/useBackPopup";
import BackPopup from "../extras/BackPopup";
import React from "react";

interface Task {
  id: number;
  title: string;
  issues: string;
  description: string[];
  subtotal: string;
}

interface Currency {
  code: string;
  name: string;
  countrylogo: string;
  symbol: string;
  format: (amount: number) => string;
}

const ROIassignment: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [date, setDate] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [sectionTotal, setSectionTotal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const back = useBackPopup();

  const currencies: Currency[] = [
    {
      code: "USD",
      name: "United States Dollar",
      countrylogo: "/assets/Image/countrylogo/United-States.jpg",
      symbol: "$",
      format: (amount: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "EUR",
      name: "Euro (European Union)",
      countrylogo: "/assets/Image/countrylogo/European-Union.jpg",
      symbol: "€",
      format: (amount: number) =>
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "GBP",
      name: "British Pound Sterling",
      countrylogo: "/assets/Image/countrylogo/United-Kindom.jpg",
      symbol: "£",
      format: (amount: number) =>
        new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "JPY",
      name: "Japanese Yen",
      countrylogo: "/assets/Image/countrylogo/Japan.jpg",
      symbol: "¥",
      format: (amount: number) =>
        new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "CNY",
      name: "Chinese Yuan (Renminbi)",
      countrylogo: "/assets/Image/countrylogo/China.jpg",
      symbol: "¥",
      format: (amount: number) =>
        new Intl.NumberFormat("zh-CN", {
          style: "currency",
          currency: "CNY",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "INR",
      name: "Indian Rupee",
      countrylogo: "/assets/Image/countrylogo/India.jpg",
      symbol: "₹",
      format: (amount: number) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "AUD",
      name: "Australian Dollar",
      countrylogo: "/assets/Image/countrylogo/Australia.jpg",
      symbol: "$",
      format: (amount: number) =>
        new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "CAD",
      name: "Canadian Dollar",
      countrylogo: "/assets/Image/countrylogo/Canada.jpg",
      symbol: "$",
      format: (amount: number) =>
        new Intl.NumberFormat("en-CA", {
          style: "currency",
          currency: "CAD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "CHF",
      name: "Swiss Franc",
      countrylogo: "/assets/Image/countrylogo/Switzerland.jpg",
      symbol: "CHF",
      format: (amount: number) =>
        new Intl.NumberFormat("de-CH", {
          style: "currency",
          currency: "CHF",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "AED",
      name: "United Arab Emirates Dirham",
      countrylogo: "/assets/Image/countrylogo/UAE.jpg",
      symbol: "AED",
      format: (amount: number) =>
        new Intl.NumberFormat("ar-AE", {
          style: "currency",
          currency: "AED",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "SAR",
      name: "Saudi Riyal",
      countrylogo: "/assets/Image/countrylogo/Saudi.jpg",
      symbol: "SAR",
      format: (amount: number) =>
        new Intl.NumberFormat("ar-SA", {
          style: "currency",
          currency: "SAR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "SGD",
      name: "Singapore Dollar",
      countrylogo: "/assets/Image/countrylogo/Singapur.jpg",
      symbol: "S$",
      format: (amount: number) =>
        new Intl.NumberFormat("en-SG", {
          style: "currency",
          currency: "SGD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "HKD",
      name: "Hong Kong Dollar",
      countrylogo: "/assets/Image/countrylogo/Hongkong.jpg",
      symbol: "HK$",
      format: (amount: number) =>
        new Intl.NumberFormat("zh-HK", {
          style: "currency",
          currency: "HKD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "ZAR",
      name: "South African Rand",
      countrylogo: "/assets/Image/countrylogo/South-Africa.jpg",
      symbol: "R",
      format: (amount: number) =>
        new Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
    {
      code: "NZD",
      name: "New Zealand Dollar",
      countrylogo: "/assets/Image/countrylogo/New-Zealand.jpg",
      symbol: "NZ$",
      format: (amount: number) =>
        new Intl.NumberFormat("en-NZ", {
          style: "currency",
          currency: "NZD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount),
    },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
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

  const currentTasks = tasks.filter((task) => task.id === currentSection);
  const sectionTitles = [...new Set(tasks.map((task) => task.title))];
  const currentTitle = sectionTitles[currentSection - 1] || "";
  const sectionIssue = [...new Set(tasks.map((task) => task.issues))];
  const currentIssue = sectionIssue[currentSection - 1] || "";

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const newSubtotals: Record<string, number> = {};
    tasks.forEach((task, taskIndex) => {
      let subtotal = 0;
      task.description.forEach((_, qIndex) => {
        const key = `task-${taskIndex}-q-${qIndex}`;
        subtotal += ratings[key] || 0;
      });
      newSubtotals[`task-${taskIndex}`] = subtotal;
    });
    const sectionTasks = tasks.filter((task) => task.id === currentSection);
    let total = 0;
    sectionTasks.forEach((task) => {
      total += newSubtotals[`task-${tasks.indexOf(task)}`] || 0;
    });
    setSectionTotal(total);
  }, [ratings, tasks, currentSection]);

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  });

  const handleNextSection = () => {
    if (currentSection < 7) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("assign-2", "true");
    navigate("/dashboard");
  };

  const handleRatingChange = (taskIndex: number, questionIndex: number, value: number) => {
    const key = `task-${taskIndex}-q-${questionIndex}`;
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const formatCurrency = (amount: number) => {
    return selectedCurrency.format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-3 px-4 md:px-8 fixed w-full z-50">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              className="text-blue-600 flex items-center text-sm md:text-base"
              onClick={back.handleBackButton}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-1 md:mr-2" />
              <span>Back</span>
            </button>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-semibold">
                BRAND DIAGNOSTIC ASSESSMENT
              </span>
              <span className="text-xs text-gray-500 hidden md:block">
                Evaluate your brand's health and growth potential.
              </span>
            </div>
          </div>
          <span className="text-sm text-gray-600">{date}</span>
        </div>
      </header>

      {/* Main Content */}

      {!back.popup ? (
        <main className="flex-1 pt-16 pb-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Currency Selector */}
            <div className="relative mb-4 md:absolute md:top-20 md:right-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-2 bg-gray-200 rounded-lg shadow flex items-center justify-between w-full md:w-40"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={selectedCurrency.countrylogo}
                    alt={selectedCurrency.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-800 font-medium">{selectedCurrency.code}</span>
                </div>
                <span>{selectedCurrency.symbol}</span>
              </button>

              {isOpen && (
                <div className="absolute mt-1 w-full md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {currencies.map((currency) => (
                    <div
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer flex items-center space-x-3 ${
                        selectedCurrency.code === currency.code
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <img
                        src={currency.countrylogo}
                        alt={currency.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="flex-1">{currency.code}</span>
                      <span>{currency.symbol}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section Header */}
            <div className="bg-gray-200 rounded-lg p-4 mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-lg font-bold text-gray-800 mb-2 md:mb-0">{currentTitle}</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Progress: {currentSection}/7</span>
                  <div className="w-24 h-2 bg-gray-300 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${(currentSection / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">ISSUE</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">
                        {currentTitle}
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">
                        <div className="flex flex-col">
                          <span className="flex items-center">
                            <span className="mr-2">{selectedCurrency.symbol}</span>
                            VALUE
                          </span>
                          <span className="text-xs font-normal">
                            Pre-UPh <FontAwesomeIcon icon={faRegistered} className="text-xs" />
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks.map((task, taskIndex) => (
                      <React.Fragment key={taskIndex}>
                        {task.description.map((question, qIndex) => (
                          <tr
                            key={`${taskIndex}-${qIndex}`}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            {qIndex === 0 && (
                              <td
                                className="py-3 px-4 align-top text-gray-700 font-medium"
                                rowSpan={task.description.length}
                              >
                                {task.issues}
                              </td>
                            )}
                            <td className="py-3 px-4 text-gray-600">{question}</td>
                            <td className="py-3 px-4">
                              <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={ratings[`task-${tasks.indexOf(task)}-q-${qIndex}`] || ""}
                                onChange={(e) =>
                                  handleRatingChange(
                                    tasks.indexOf(task),
                                    qIndex,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="Enter amount"
                                required
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                    <tr className="bg-blue-50 font-semibold">
                      <td colSpan={2} className="py-3 px-4 text-right text-gray-800">
                        {currentIssue}
                      </td>
                      <td className="py-3 px-4 text-blue-700">{formatCurrency(sectionTotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse md:flex-row justify-between space-y-4 space-y-reverse md:space-y-0">
              <button
                onClick={handlePrevSection}
                disabled={currentSection === 1}
                className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                  currentSection === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Previous
              </button>

              {currentSection === 7 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                  <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleNextSection}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </main>
      ) : (
        <BackPopup
          onSave={back.handleSave}
          onDontSave={back.handleDontSave}
          onCancel={back.handleCancel}
        />
      )}
    </div>
  );
};

export default ROIassignment;
