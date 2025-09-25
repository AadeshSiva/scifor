import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  section: string;
}
const BrandDiagnostic: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    setDate(formattedDate);
  }, []);
  const questions: Question[] = [
    {
      id: "logo_1",
      text: "Does your company have a logo?",
      section: "CORPORATE LOGO",
    },
    {
      id: "logo_2",
      text: "Is your logo consistently applied to all your corporate communications?",
      section: "CORPORATE LOGO",
    },
    {
      id: "logo_3",
      text: "Is your logo trademarked?",
      section: "CORPORATE LOGO",
    },
    {
      id: "logo_4",
      text: "Do you think you can sell your logo as a Brand?",
      section: "CORPORATE LOGO",
    },
    {
      id: "logo_5",
      text: "Do you think someone would be willing to buy your Brand?",
      section: "CORPORATE LOGO",
    },
    {
      id: "logo_6",
      text: "If you were to sell your logo as a Brand, do you think you",
      section: "CORPORATE LOGO",
    },
    {
      id: "identity_1",
      text: "Do you feel your company has a Corporate Identity?",
      section: "CORPORATE IDENTITY",
    },
    {
      id: "identity_2",
      text: "Do you think your corporate identity is CONSISTENTLY applied EVERYWHERE?",
      section: "CORPORATE IDENTITY",
    },
    {
      id: "identity_3",
      text: "Is your Corporate Identity consistent with the market niche of your company?",
      section: "CORPORATE IDENTITY",
    },
    {
      id: "brand_1",
      text: "Does your company have a Brand promise?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_2",
      text: "Does your company live up to its Brand promise?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_3",
      text: "Can you describe your Brand in one sentence?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_4",
      text: "Does your management understand the company Brand?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_5",
      text: "Do your employees understand the company Brand?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_6",
      text: "Do your suppliers and customers know your Brand?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_7",
      text: "Do you know why you are building your Brand?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_8",
      text: "Do you have a strategy for developing your Brand?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_9",
      text: "Do you know the dollar figure of your Brand asset (part of Goodwill) on your balance sheet?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_10",
      text: "Do you know how your Brand specifically increases your COMPANY GOODWILL?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_11",
      text: "Do you change your Brand strategy often?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_12",
      text: "Are all the stakeholders on the SAME PAGE regarding your company Brand?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_13",
      text: "Could your company prosper without the current owner or leader?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_14",
      text: "Have you trademarked all possible Intangible Assets to grow company value?",
      section: "COMPANY BRAND",
    },
    {
      id: "brand_15",
      text: "Do you think you will get 'top dollar' for your company Brand upon succession?",
      section: "COMPANY BRAND",
    },
    {
      id: "wealth_1",
      text: "Is your wealth management strategy updated to include the current and true value of your intangible and tangible assets?",
      section: "BRAND WEALTH MANAGEMENT",
    },
    {
      id: "wealth_2",
      text: "Does your shareholders agreement consider the impact of Brand, its valuation and other intangible assets?",
      section: "BRAND WEALTH MANAGEMENT",
    },
    {
      id: "wealth_3",
      text: "Does your wealth management strategy compensate for the Brand's full value at the time of eventual sale or succession of your business?",
      section: "BRAND WEALTH MANAGEMENT",
    },
    {
      id: "wealth_4",
      text: "Are your advisors aware of how the company Brand and related intangible assets are best managed throughout your wealth management strategy and succession plan?",
      section: "BRAND WEALTH MANAGEMENT",
    },
    {
      id: "customer_1",
      text: "Do you know who your #1 customers are?",
      section: "CUSTOMER",
    },
    {
      id: "customer_2",
      text: "Do you know if your Brand attracts your best or #1 customers?",
      section: "CUSTOMER",
    },
    {
      id: "customer_3",
      text: "Do you know if most of your customers are PROFITABLE?",
      section: "CUSTOMER",
    },
    {
      id: "customer_4",
      text: "Do you think your Brand wards off your less (or least) profitable customers?",
      section: "CUSTOMER",
    },
  ];
  const handleBackButton = () => {
    navigate("/dashboard");
  };
  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    const allAnswered = questions.every((question) => responses[question.id]);

    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    } else {
      e.preventDefault();
      sessionStorage.setItem("assign-3", "true");
      navigate("/dashboard");
    }
  };
  const groupedQuestions = questions.reduce(
    (acc, question) => {
      if (!acc[question.section]) {
        acc[question.section] = [];
      }
      acc[question.section].push(question);
      return acc;
    },
    {} as Record<string, Question[]>,
  );
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center px-16 py-3 bg-gray-100 w-full fixed z-50 top-0 shadow-md">
        <div className="flex flex-row gap-4 items-center">
          <button
            className="text-blue-500 flex items-center hover:text-blue-700"
            onClick={handleBackButton}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
          </button>
          <div className="flex flex-col">
            <span className="text-md font-semibold">
              BRAND DIAGNOSTIC ASSESSMENT
            </span>
            <span className="text-xs text-gray-500">
              Evaluate your brand's health and growth potential.
            </span>
          </div>
        </div>
        <span className="text-sm">{date}</span>
      </header>
      <div className="pt-20 px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          {Object.entries(groupedQuestions).map(
            ([sectionName, sectionQuestions]) => (
              <div key={sectionName} className="mb-8">
                <div className="bg-gray-400 text-white rounded-t-lg px-4 py-3">
                  <h2 className="font-bold text-lg">{sectionName}</h2>
                </div>
                <div className="bg-white shadow-md overflow-hidden mt-5">
                  <table className="w-full">
                    <tbody>
                      {sectionQuestions.map((question, index) => (
                        <tr
                          key={question.id}
                          className={`border-b border-gray-200 hover:bg-gray-50 ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="p-4 text-sm font-medium w-full">
                            {question.text}
                          </td>
                          <td className="text-center p-0">
                            <button
                              type="button"
                              onClick={() =>
                                handleResponseChange(question.id, "Y")
                              }
                              className={`w-16 h-16 border font-bold text-lg transition-colors duration-200 ${
                                responses[question.id] === "Y"
                                  ? "bg-green-400 text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              Y
                            </button>
                          </td>
                          <td className="text-center p-0">
                            <button
                              type="button"
                              onClick={() =>
                                handleResponseChange(question.id, "N")
                              }
                              className={`w-16 h-16 border font-bold text-lg transition-colors duration-200 ${
                                responses[question.id] === "N"
                                  ? "bg-red-400 text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              N
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          )}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600 font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrandDiagnostic;
