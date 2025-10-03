import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBackPopup } from "@/hooks/useBackPopup";
import BackPopup from "../extras/BackPopup";

interface Task {
  id: number;
  title: string;
  description: string;
}

const BrandAssignment: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const back = useBackPopup();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  });

  const handleRatingChange = (questionId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  };

  console.log(ratings);
  const handleNextSection = () => {
    if (currentSection < 4) {
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
    sessionStorage.setItem("assign-1", "true");
    navigate("/dashboard");
  };

  const tasks: Task[] = [
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description: "1. Our company values are well demonstrated by leaders and staff.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description: "2. Our company is clear on how we are different than our competitors.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "3. Our company has assigned experienced individuals and sufficient resources to responsibly develop the company Brand.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "4. Our leadership understands how the company Brand and the Branding process can grow and enrich the business.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "5. Our leadership has trademarked the company name, logo, special statements and related Brand assets and protects them.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "6. Our leaders and stakeholders actively participate in the growth of the Brand and its equity/goodwill within their respective positions.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "7. Our leadership knows how the Brand will make them money during their personal or company Exit / Succession.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "8. Our company philosophy is well demonstrated by leaders, staff, partners and associates.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "9. Our company philosophy strengthens our Brand, client base and attracts prospects.",
    },
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description:
        "10. Leadership and staff are proud of the company Brand and champion it sincerely.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description: "1. Our Brand message is clear and concise",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "2. Our Brand message is consistent throughout internal and external communications and initiatives",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "3. Our Brand message is remembered and mentioned, in a positive fashion and on a regular basis, by our leaders, staff, customers, prospects and even our competitors.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description: "4. Our Brand message genuinely represents our business philosophy.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "5. Our message is well managed by our publicity, marketing, communications, advertising and/or graphic design suppliers.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "6. Our Brand message is unique to that of our competitors or anyone else in the industry.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "7. Our Brand Message is quickly repaired or corrected in the event that it has been damaged or misunderstood in the marketplace.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "8. Our staff positively reinforces our Brand message in day to day conversations among themselves, with suppliers and customers.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description:
        "9. Our Brand message is unchanging from campaign to campaign, year after year so that its value and goodwill are compounded.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description: "10. The industry, our customers and prospects revere our Brand.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description: "1. Our Branding initiatives are smart and measured for performance.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description:
        "2. During staff performance reviews, our company assesses how each leader and staff member increases the value of our Brand.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description: "3. Each product and service offering expresses our Brand philosophy.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description:
        "4. Our staff and company members know how their work realises the company philosophy and delivers on our Brand promise.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description:
        "5. Our business philosophy helps company management prioritize issues and overcome difficult situations.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description:
        "6. Our business philosophy and Brand promise is well documented and available for all who need and want it.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description:
        "7. Our company implements our Brand promise in new product / service development, employee learning programs, compensation and market strategy.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description: "8. We have financial systems to quantify the value of our Brand.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description: "9. Our customers and staff consistently experience our Brand promise.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description:
        "10. The Brand and business philosophy are consistent inside and outside our business.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "1. Our company has the necessary Branding artifacts to promote our company and its philosophy.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description: "2. Our philosophy is consistently expressed in our Branding artifacts.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "3. I am happy about our company name, logo, corporate identity (Business Cards, Letterhead, Website, Signs etc) and campaigns.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description: "4. I am happy with our company's reputation.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "5. We carefully monitor the consistency, timeliness and effectiveness of our communications and marketing material.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "6. We understand what management, staff, customers and partners feel about our company, our offerings and the way we do business.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "7. We are careful to address only those requests and concerns that can be fulfilled with our company philosophy and Brand promise.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "8. Our Branding efforts attract the customers, employees and partners that we need, want and like to have.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "9. Our Branding artifacts are well distributed to the appropriate target audiences.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description:
        "10. Our company's internal and external Branding artifacts unify how employees and customers experience our company.",
    },
  ];
  const currentTasks = tasks.filter((task) => task.id === currentSection);
  const sectionTitles = [...new Set(tasks.map((task) => task.title))];
  const currentTitle = sectionTitles[currentSection - 1] || "";
  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="flex justify-between items-center px-16 py-3 bg-gray-100 w-full fixed z-50 top-0 shadow-md">
        <div className="flex items-center mb-2 md:mb-0">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800 mr-8"
            onClick={back.handleBackButton}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Back
          </button>
          <div>
            <h1 className="font-bold text-md">BRAND DIAGNOSTIC ASSESSMENT</h1>
            <p className="text-xs text-gray-600">
              Evaluate your brand's health and growth potential.
            </p>
          </div>
        </div>
        <span>
          <p className="text-md">{date}</p>
        </span>
      </header>

      {!back.popup ? (
        <div className="pt-16 w-[100vw]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-400 text-black p-4">
            <h2 className="font-bold text-lg">{currentTitle}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-md">Progress: {currentSection}/4</span>
              <div className="w-24 h-3 bg-blue-600 rounded-full">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${(currentSection / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 border border-gray-300 shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full h-[80vh] border border-gray-400">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 border border-gray-300 shadow-md">
                    <th className="w-2/3 p-4 text-left text-md"></th>
                    {["Strongly Disagree", "Disagree", "Don't Know", "Agree", "Strongly Agree"].map(
                      (header, index) => (
                        <th key={index} className="p-2 text-center border border-gray-300 w-8">
                          <div className="flex items-center justify-center h-10 border-b">
                            <span className="flex text-center font-semibold text-md">{header}</span>
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task, index) => (
                    <tr key={index} className="border-b border-gray-500 h-4 bg-gray-400">
                      <td className="px-6 text-md border border-gray-500 h-4">
                        {task.description}
                      </td>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <td
                          key={value}
                          className="p-1 text-center border border-gray-300 w-6 bg-gray-100 shadow-md h-4"
                        >
                          <input
                            type="radio"
                            name={`s${currentSection}-q${index}`}
                            checked={ratings[`s${currentSection}-q${index}`] === value}
                            onChange={() =>
                              handleRatingChange(`s${currentSection}-q${index}`, value)
                            }
                            className="h-6 w-6 text-blue-600 focus:ring-blue-500"
                            required
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between p-2 bg-gray-100">
              <button
                onClick={handlePrevSection}
                disabled={currentSection === 1}
                className={`flex items-center px-4 py-2 rounded text-md ${
                  currentSection === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Previous
              </button>
              {currentSection === 4 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-md"
                >
                  Submit
                  <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleNextSection}
                  className="flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-md"
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
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
export default BrandAssignment;
