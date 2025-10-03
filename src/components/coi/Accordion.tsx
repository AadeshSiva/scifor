import React, { useState, useEffect, useRef } from "react";
import { Dot, Download } from "lucide-react";
import { link } from "fs";

interface Statistic {
  context: string;
  url: string;
}
interface ResearchPoint {
  name: string;
  statistics: Statistic[];
}
interface Category {
  category: string;
  category_url?: string;
  research_points: ResearchPoint[];
}
interface LongAccordionProps {
  data?: Category[];
  className?: string;
}
const LongAccordion: React.FC<LongAccordionProps> = ({ data = [], className = "" }) => {
  const [openSection, setOpenSection] = useState<string>("0-0"); // Only one section open at a time
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navbarRef = useRef<HTMLDivElement>(null);
  const handleSectionToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? "" : sectionId);
  };
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setOpenSection("0-0");
  };
  const handleOpenPdf = (url: string) => {
    let viewUrl = url;
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (driveMatch && !url.includes("/view")) {
      const fileId = driveMatch[1];
      viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    }
    window.open(viewUrl, "_blank");
  };
  const handleDownloadPdf = (url: string) => {
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (driveMatch) {
      const fileId = driveMatch[1];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, "_blank");
    } else {
      window.open(url, "_blank");
    }
  };
  const getFirstUrl = (researchPoint: ResearchPoint): string => {
    for (const stat of researchPoint.statistics) {
      if (stat.url && stat.url.trim() !== "") {
        return stat.url;
      }
    }
    return "";
  };
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((category) => category.category === selectedCategory);
  const generateId = (filteredCategoryIndex: number, researchIndex: number) => {
    return `${filteredCategoryIndex}-${researchIndex}`;
  };
  const getSerialNumber = (categoryIndex: number, researchIndex: number) => {
    let serialNumber = 1;
    for (let i = 0; i < categoryIndex; i++) {
      serialNumber += filteredData[i].research_points.length;
    }
    serialNumber += researchIndex;
    return serialNumber;
  };
  useEffect(() => {
    if (filteredData.length > 0 && filteredData[0].research_points.length > 0) {
      setOpenSection("0-0");
    } else {
      setOpenSection("");
    }
  }, [selectedCategory]); 
  return (
    <div className={`w-full flex flex-col gap-7 ${className}`}>
      <div
        ref={navbarRef}
        className="top-[86px] z-10 bg-[#F5F5F5] px-4 sm:px-6 lg:px-8 py-4 border border-gray-500 shadow-lg rounded-lg"
      >
        <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:overflow-x-auto lg:overflow-y-visible min-w-0">
          {/* All button */}
          <button
            onClick={() => handleCategorySelect("All")}
            className={`px-3 py-2 rounded-[7px] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              selectedCategory === "All"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-50 border border-gray-500"
            }`}
          >
            All
          </button>
          {data.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category.category)}
              className={`px-3 py-2 rounded-[7px] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category.category
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-50 border border-gray-500"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto border border-gray-400 rounded-lg overflow-hidden min-w-[100%]">
        {filteredData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="overflow-hidden shadow-lg">
              {category.research_points.map((researchPoint, researchIndex) => {
                const sectionId = generateId(categoryIndex, researchIndex);
                const isOpen = openSection === sectionId;
                const serialNumber = getSerialNumber(categoryIndex, researchIndex);
                const firstUrl = getFirstUrl(researchPoint);
                return (
                  <div key={researchIndex} className="bg-white">
                    <button
                      className="flex items-center gap-2 w-full px-4 sm:px-6 lg:px-8 py-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 border-b-[.8px] border-gray-300"
                      onClick={() => handleSectionToggle(sectionId)}
                    >
                      <span className="text-black text-base sm:text-lg min-w-8">
                        {String(serialNumber).padStart(2, "0")}
                      </span>
                      <span className="text-black text-base sm:text-lg flex-1 font-medium">
                        {researchPoint.name}
                      </span>
                      <svg
                        className={`transform transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L12 12.5858L15.2929 9.29289C15.6834 8.90237 16.3166 8.90237 16.7071 9.29289C17.0976 9.68342 17.0976 10.3166 16.7071 10.7071L12.7071 14.7071C12.5196 14.8946 12.2652 15 12 15C11.7348 15 11.4804 14.8946 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-200">
                        <div className="flex gap-4 bg-neutral-100 px-4 sm:px-6 lg:px-8 py-6">
                          <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-2">
                            {researchPoint.statistics.map((stat, statIndex) => (
                              <div key={statIndex} className="flex items-start gap-2">
                                <div className="flex-shrink-0 mt-1">
                                  <Dot size={20} className="text-gray-600" />
                                </div>
                                <span className="flex-1 leading-relaxed">{stat.context}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end mb-4">
                            {firstUrl && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleOpenPdf(firstUrl)}
                                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1B7A9B] text-white text-sm font-medium rounded-md hover:bg-[#145F7A] transition-colors duration-200 whitespace-nowrap"
                                >
                                  <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                                      <path d="M2 2h8v8H2V2zm1 1v6h6V3H3zm2 2h2v1H5V5zm0 2h3v1H5V7z" />
                                    </svg>
                                  </div>
                                  <span>View PDF</span>
                                </button>
                                <button
                                  onClick={() => handleDownloadPdf(firstUrl)}
                                  className="flex items-center justify-center gap-2 mr-6 px-4 py-2 bg-gray-200 text-[#1B7A9B] text-sm font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
                                >
                                  <Download size={14} />
                                  <span>Download</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="max-w-6xl mx-auto p-8 text-center text-gray-500">
          <p className="text-lg mb-4">
            No data available. Connect to your backend API at{" "}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">/category-list</code>
          </p>
          <p className="text-sm mb-4">Expected data structure:</p>
        </div>
      )}
    </div>
  );
};

const AccordionWithApi: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.prspera.com/unique-statistics/");
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSampleData();
      } finally {
        setLoading(false);
      }
    };
    const setSampleData = () => {
      setData([
        {
          category: "Are You Ready to Exit?",
          research_points: [
            {
              name: "Exit Planning",
              statistics: [
                {
                  context:
                    "75% of business owners want to exit their businesses within the next ten years.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context:
                    "73% of privately held companies in the U.S. plan to transition within the next 10 years, representing a $14 trillion opportunity.",
                  url: "",
                },
                {
                  context:
                    "79% of business owners plan to exit their businesses in the next 10 years or less.",
                  url: "",
                },
                {
                  context: "48% of business owners who want to sell have no formal exit strategy.",
                  url: "",
                },
                {
                  context:
                    "74% to 57% of business owners, depending on the deal size, did no exit planning.",
                  url: "",
                },
              ],
            },
            {
              name: "Lack of Planning",
              statistics: [
                {
                  context:
                    "Only 17% of business owners actually have a formal exit plan, and over half have never had their business appraised, which leaves many unaware of all of their exit options.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context: "Only 17% of owners have created a written exit plan.",
                  url: "",
                },
                {
                  context: "58% of owners have never had their business formally appraised.",
                  url: "",
                },
                {
                  context:
                    "70% of business owners were unaware of all their exit options in 2013, but this has improved to 70% awareness in 2023.",
                  url: "",
                },
              ],
            },
            {
              name: "Owner Readiness",
              statistics: [
                {
                  context:
                    "69% of business owners identified exit strategy on their priority list, up from 6% in 2013.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context:
                    "68% of business owners have formal exit planning education, up from 35% in 2013.",
                  url: "",
                },
                {
                  context:
                    "56% of Millennial owners have written personal plans, 55% have written company plans, and 68% have written personal financial plans.",
                  url: "",
                },
              ],
            },
            {
              name: "Attitudes Toward Exit Strategies",
              statistics: [
                {
                  context: "14% of business owners think they don't need an exit strategy.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing",
                },
                {
                  context: "21% of business owners don't want to sell their business.",
                  url: "",
                },
                {
                  context:
                    "24% of business owners think it's too early to consider an exit strategy.",
                  url: "",
                },
              ],
            },
            {
              name: "General Statistics",
              statistics: [
                {
                  context:
                    "There are 2.9 million businesses in the U.S. owned by individuals aged 55 or older.",
                  url: "https://drive.google.com/file/d/1R9EGE5JZkdkNUpJcV7jjOoU4b3nCaZo0/view?usp=sharing",
                },
                {
                  context:
                    "These businesses support 32.1 million employees, with $1.3 trillion in payroll, and $6.5 trillion in revenue.",
                  url: "",
                },
              ],
            },
          ],
        },
        {
          category: "Planning & Strategy",
          research_points: [
            {
              name: "Exit Planning Awareness & Preparedness",
              statistics: [
                {
                  context:
                    "67% of business owners are unfamiliar with all of their exit planning options.",
                  url: "https://drive.google.com/file/d/1msYjAK0wBVpgFmydwkd-zJmyi2Wb7S7W/view?usp=sharing",
                },
                {
                  context:
                    "49% have done no planning at all.",
                  url: "",
                },
              ],
            },
            {
              name: "Succession Planning vs. Other Planning",
              statistics: [
               
                {
                  context:
                    "48% of business owners have a pension in place, but only 36% have considered how their pension fits into their succession plan.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing",

                },
               
              ],
            },
            {
              name: "Formal Transition Planning",
              statistics: [
                {
                  context:
                    "78% have no formal transition plan.",
                  url: "https://drive.google.com/file/d/1sB2Ma-FPou3pW4NSa5dOjREU7er43Yyj/view?usp=sharing",
                },
                {
                  context:
                    "83% have no written transition plan.",
                  url: "",
                }
              ],
            },
            {
              name: "Post-Transition Planning",
              statistics: [
                {
                  context:
                    'Less than 7% had a formal post-transition plan for what they were going to do "next."',
                  url: "https://drive.google.com/file/d/1sB2Ma-FPou3pW4NSa5dOjREU7er43Yyj/view?usp=sharing",
                },
              ],
            },
            {
              name: "Contingency Planning",
              statistics: [
                {
                  context: "40% have no contingency plans for illness, death, or forced exit.",
                  url: "https://drive.google.com/file/d/1sB2Ma-FPou3pW4NSa5dOjREU7er43Yyj/view?usp=sharing",
                },
              ],
            },
          ],
        },
        
        {
          category: "Choosing the Right Exit Path",
          research_points: [
            {
              name: "Exit Strategies Preferred",
              statistics: [
                {
                  context:
                    "52% of respondents prefer selling the business, with 41% planning to do so within five years.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context:
                    "20% plan to leave the business to family, but 89% won't pass their business on because family members are not interested.",
                  url: "",
                },
                {
                  context:
                    "60% of first-generation business owners favor an internal exit, while 82% of second-generation business owners favor an internal exit.",
                  url: "",
                },
                {
                  context:
                    "18% plan to close the business, and 10% don’t know.",
                  url: "",
                },
              ],
            },
            {
              name: "Reasons for exiting",
              statistics: [
                {
                  context:
                    "65% of business owners say it is a good time to sell and they are ready to retire.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context: "49% are looking to find a work-life balance.",
                  url: "",
                },
              ],
            },
            {
              name: "Selling Intentions by Gender & Experience",
              statistics: [
                {
                  context:
                    "Among women, 36% of first-time business owners plan to sell their business.",
                  url: "https://drive.google.com/file/d/17A1lQMd-I7eLGRGxhRDMEh8lMwCGdfYm/view?usp=sharing",
                },
                {
                  context:
                    "Among women, 47% of those who had owned a previous business plan to sell.",
                  url: "",
                },
                {
                  context:
                    "For men, there was no correlation between prior business ownership and intention to sell.",
                  url: "",
                },
              ],
            },
          ],
        },
        {
          category: "Market, Timing & Advisors",
          research_points: [
            {
              name: "Market and timing",
              statistics: [
                {
                  context:
                    "Timing is crucial; having an exit strategy allows you to capitalize on strong market conditions.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context:
                    "The pandemic and shifting age of owners have made exit planning more critical.",
                  url: "",
                },
              ],
            },
            {
              name: "Advisor Involvement",
              statistics: [
                {
                  context:
                    "85% of owners who believed themselves to be best-in-class or better in exit planning had sought education, and 84% received outside advice.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
              ],
            },
          ],
        },
        {
          category: "Family & Succession",
          research_points: [
            {
              name: "Family Involvement",
              statistics: [
                {
                  context:
                    "82% of heirs would rather have the money from the sale of the business than the business itself.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
                {
                  context:
                    "21% of respondents cited lack of qualification as a reason for not passing the business to family members.",
                  url: "",
                },
                {
                  context: "9% wanted family members to take another career path.",
                  url: "",
                },
              ],
            },
            {
              name: "Women Business Owners & Exit Strategy",
              statistics: [
                {
                  context: "83% of women business owners have a long-term exit strategy.",
                  url: "https://drive.google.com/file/d/17A1lQMd-I7eLGRGxhRDMEh8lMwCGdfYm/view?usp=sharing",
                },
              ],
            },
          ],
        },
        {
          category: "Business Valuation & Sale Readiness",
          research_points: [
            {
              name: "Business Valuation Considerations",
              statistics: [
                {
                  context:
                    "51% of business owners have not considered how their business would be valued in the event of a sale.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing",
                },
              ],
            },
          ],
        },
        {
          category: "After Exit",
          research_points: [
            {
              name: "Emotional and personal readiness",
              statistics: [
                {
                  context:
                    "Exit planning helps owners mentally prepare to exit by identifying goals and conditions for exit.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link",
                },
              ],
            },
          ],
        },
      ]);
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center">
        <div className="animate-pulse">Loading data...</div>
      </div>
    );
  }
  return <LongAccordion data={data} />;
};
export default AccordionWithApi;
