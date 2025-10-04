import React, { useState, useEffect, useRef } from "react";
import { Dot, Download } from "lucide-react";
// import { link } from "fs";

interface Statistic {
  context: string;
  URL: string;
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
  const [openSection, setOpenSection] = useState<string>("0-0");
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
      if (stat.URL && stat.URL.trim() !== "") {
        return stat.URL;
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
          {data
            .filter(category => category.category !== "")
            .map((category, index) => (
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
                        <div className="bg-neutral-100 px-4 sm:px-6 lg:px-8 py-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="min-w-0 text-gray-600 text-sm sm:text-base leading-relaxed space-y-2 mb-4 md:mb-0">
                              {researchPoint.statistics.map((stat, statIndex) => (
                                <div key={statIndex} className="flex items-start gap-2">
                                  <div className="flex-shrink-0 mt-1">
                                    <Dot size={20} className="text-gray-600" />
                                  </div>
                                  <span className="flex-1 leading-relaxed break-words">
                                    {stat.context}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {firstUrl && (
                              <div className="min-w-0 flex flex-col sm:flex-row flex-wrap gap-2 justify-start md:justify-center md:place-self-center">
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
                                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-[#1B7A9B] text-sm font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
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
  // sample data will be immediately to remove Loading state
  const [data, setData] = useState<Category[]>([
    {
      "category": "Are You Ready to Exit",
      "research_points": [
        {
          "name": "Reasons for Exiting",
          "statistics": [
            {
              "context": "65% of business owners say it is a good time to sell and they are ready to retire.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "49% are looking to find a work-life balance.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Emotional and Personal Readiness",
          "statistics": [
            {
              "context": "Exit planning helps owners mentally prepare to exit by identifying goals and conditions for exit.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            }
          ]
        },
        {
          "name": "Owner Readiness",
          "statistics": [
            {
              "context": "69% of business owners identified exit strategy on their priority list, up from 6% in 2013.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "68% of business owners have formal exit planning education, up from 35% in 2013.",
              "URL": ""
            },
            {
              "context": "56% of Millennial owners have written personal plans, 55% have written company plans, and 68% have written personal financial plans.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Confidence & Timing in Exit Planning",
          "statistics": [
            {
              "context": "71% of business owners are confident they can step back from their business in a tax-efficient manner.",
              "URL": "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Entrepreneurial Isolation",
          "statistics": [
            {
              "context": "46% of entrepreneurs struggle with feelings of isolation and loneliness.",
              "URL": "https://drive.google.com/file/d/1M8paaVKTp78ozFFiY_jwzIsGUT58DfUR/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Support and Burnout",
          "statistics": [
            {
              "context": "31% of entrepreneurs experience burnout due to lack of support from friends and family.",
              "URL": "https://drive.google.com/file/d/1M8paaVKTp78ozFFiY_jwzIsGUT58DfUR/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Emotional Bottleneck",
          "statistics": [
            {
              "context": "39% of entrepreneurs feel like they have no one to talk to about their stress.",
              "URL": "https://drive.google.com/file/d/1M8paaVKTp78ozFFiY_jwzIsGUT58DfUR/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Entrepreneur Mental Health and Burnout",
          "statistics": [
            {
              "context": "24% of business owners are currently experiencing burnout.",
              "URL": "https://drive.google.com/file/d/1I5n_a6WO9uc3Ka_s6sDTldvtNyB8QrQ5/view?usp=sharing"
            },
            {
              "context": "Entrepreneurs are 50% more likely to be directly or indirectly affected by mental health issues.",
              "URL": ""
            },
            {
              "context": "49% of entrepreneurs have at least one mental illness (depression, anxiety, or ADHD) – NIMH.",
              "URL": ""
            },
            {
              "context": "72% of entrepreneurs are impacted by a mental health condition.",
              "URL": ""
            },
            {
              "context": "56% have been diagnosed with anxiety, depression, or stressrelated problems.",
              "URL": ""
            },
            {
              "context": "42% of small business owners say they experienced burnout in the last month.",
              "URL": ""
            }
          ]
        }
      ]
    },
    {
      "category": "Planning & Strategy",
      "research_points": [
        {
          "name": "Exit Planning Awareness & Preparedness",
          "statistics": [
            {
              "context": "13% of businesses have not even considered the need for an exit plan.",
              "URL": "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
            },
            {
              "context": "3% of businesses were not sure whether they had an exit plan.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Formal Transition Planning",
          "statistics": [
            {
              "context": "78% have no formal transition plan.",
              "URL": "https://drive.google.com/file/d/1sB2Ma-FPou3pW4NSa5dOjREU7er43Yyj/view?usp=sharing"
            },
            {
              "context": "83% have no written transition plan.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Post-Transition Planning",
          "statistics": [
            {
              "context": "Less than 7% had a formal post-transition plan for what they were going to do \"next.\"",
              "URL": "https://drive.google.com/file/d/1sB2Ma-FPou3pW4NSa5dOjREU7er43Yyj/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Contingency Planning",
          "statistics": [
            {
              "context": "40% have no contingency plans for illness, death, or forced exit.",
              "URL": "https://drive.google.com/file/d/1sB2Ma-FPou3pW4NSa5dOjREU7er43Yyj/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Valuation Expectations",
          "statistics": [
            {
              "context": "90% of business owners overvalue their business by 50% to 100%.",
              "URL": "https://drive.google.com/file/d/141WLucd7v8szfWuqh6rnVZ6y39fWgVCw/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Exit Planning Awareness & Preparedness ",
          "statistics": [
            {
              "context": "67% of business owners are unfamiliar with all of their exit planning options. ",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "49% have done no planning at all. ",
              "URL": ""
            }
          ]
        },
        {
          "name": " Contingency Exit Planning",
          "statistics": [
            {
              "context": "57% of business owners have not considered how they would exit their business in the event of ill health or death.",
              "URL": "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
            },
            {
              "context": "52% of business owners have not considered how they would exit their business in the event of a dispute with a business partner.",
              "URL": ""
            },
            {
              "context": "59% of business owners have not considered how they would exit their business in the event of a natural disaster or crisis.",
              "URL": ""
            }
          ]
        }
      ]
    },
    {
      "category": "Choosing the Right Exit Path",
      "research_points": [
        {
          "name": "Exit Strategies Preferred",
          "statistics": [
            {
              "context": "52% of respondents prefer selling the business, with 41% planning to do so within five years.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "20% plan to leave the business to family, but 89% won't pass their business on because family members are not interested.",
              "URL": ""
            },
            {
              "context": "18% plan to close the business, and 10% don't know.",
              "URL": ""
            },
            {
              "context": "60% of first-generation business owners favor an internal exit, while 82% of second-generation business owners favor an internal exit.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Attitudes Toward Exit Strategies",
          "statistics": [
            {
              "context": "14% of business owners think they don't need an exit strategy.",
              "URL": "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
            },
            {
              "context": "21% of business owners don't want to sell their business.",
              "URL": ""
            },
            {
              "context": "24% of business owners think it's too early to consider an exit strategy.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Exit Strategy as a Priority",
          "statistics": [
            {
              "context": "Younger owners—Millennials and those in Generation X—view exit strategy as a priority, with 56% of Millennial owners having written personal plans, 55% written company plans, and 68% written personal financial plans.",
              "URL": "https://drive.google.com/file/d/1msYjAK0wBVpgFmydwkd-zJmyi2Wb7S7W/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Women Business Owners & Exit Strategy",
          "statistics": [
            {
              "context": "83% of women business owners have a long-term exit strategy.",
              "URL": "https://drive.google.com/file/d/17A1lQMd-I7eLGRGxhRDMEh8lMwCGdfYm/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Planned Exit Methods (All Owners)",
          "statistics": [
            {
              "context": "39% of business owners (men and women) plan to ultimately sell their business.",
              "URL": "https://drive.google.com/file/d/17A1lQMdI7eLGRGxhRDMEh8lMwCGdfYm/view?usp=sharing"
            },
            {
              "context": "21% plan to pass the business on to family members.",
              "URL": ""
            },
            {
              "context": "4% plan to close the business.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Selling Intentions by Gender & Experience",
          "statistics": [
            {
              "context": "Among women, 36% of first-time business owners plan to sell their business.",
              "URL": "https://drive.google.com/file/d/17A1lQMdI7eLGRGxhRDMEh8lMwCGdfYm/view?usp=sharing"
            },
            {
              "context": "Among women, 47% of those who had owned a previous business plan to sell.",
              "URL": ""
            },
            {
              "context": "For men, there was no correlation",
              "URL": ""
            }
          ]
        }
      ]
    },
    {
      "category": "Market, Timing & Advisors",
      "research_points": [
        {
          "name": "Market and Timing",
          "statistics": [
            {
              "context": "Timing is crucial; having an exit strategy allows you to capitalize on strong market conditions.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "The pandemic and shifting age of owners have made exit planning more critical..",
              "URL": ""
            }
          ]
        },
        {
          "name": "Advisor Involvement",
          "statistics": [
            {
              "context": "85% of owners who believed themselves to be best-in-class or better in exit planning had sought education, and 84% received outside advice.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            }
          ]
        },
        {
          "name": "Future Demand",
          "statistics": [
            {
              "context": "The number of businesses transitioning ownership is expected to double in the next 10-15 years, creating a significant demand for transition planning services.",
              "URL": "https://drive.google.com/file/d/1R9EGE5JZkdkNUpJcV7jjOoU4b3nCaZo0/view?usp=sharing"
            }
          ]
        }
      ]
    },
    {
      "category": "Family & Succession",
      "research_points": [
        {
          "name": "Family Involvement",
          "statistics": [
            {
              "context": "82% of heirs would rather have the money from the sale of the business than the business itself.",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "21% of respondents cited lack of qualification as a reason for not passing the business to family members.",
              "URL": ""
            },
            {
              "context": "9% wanted family members to take another career path.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Succession Planning vs. Other Planning",
          "statistics": [
            {
              "context": "48% of business owners have a pension in place, but only 36% have considered how their pension fits into their succession plan.",
              "URL": "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
            }
          ]
        }
      ]
    },
    {
      "category": "Business Valuation & Sale Readiness",
      "research_points": [
        {
          "name": "Business Valuation Considerations",
          "statistics": [
            {
              "context": "51% of business owners have not considered how their business would be valued in the event of a sale.",
              "URL": "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Preparation Time",
          "statistics": [
            {
              "context": "The average business owner spends 4-6 years preparing for a transition, but only 2-3 years actively planning.",
              "URL": "https://drive.google.com/file/d/1R9EGE5JZkdkNUpJcV7jjOoU4b3nCaZo0/view?usp=sharing"
            }
          ]
        },
        {
          "name": "Assets Under Management (AUM)",
          "statistics": [
            {
              "context": "Private credit surpassed $1tn of AUM at the start of 2022.",
              "URL": "https://drive.google.com/file/d/1GsB0KlEADjVzi6bX_7jhn0epq9Xv70Ds/view?usp=sharing"
            },
            {
              "context": "With $8bn in dry powder, Churchill is poised to seize opportunities as tighter credit markets favor strong, well-capitalized investors.",
              "URL": ""
            }
          ]
        }
      ]
    },
    {
      "category": "Life after Exit",
      "research_points": [
        {
          "name": "Entrepreneurial Stress Drivers",
          "statistics": [
            {
              "context": "For 60% of business owners, the ability to fundraise is their primary source of stress.",
              "URL": "https://drive.google.com/file/d/1I5n_a6WO9uc3Ka_s6sDTldvtNyB8QrQ5/view?usp=sharing"
            },
            {
              "context": "42% say the fear of failure is a main source of stress, but this number decreases as they age.",
              "URL": ""
            },
            {
              "context": "66% of female founders are stressed about the future.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Isolation, Stigma & Openness",
          "statistics": [
            {
              "context": "Entrepreneurs recently rated their loneliness levels a 7.6 out of 10.",
              "URL": "https://drive.google.com/file/d/1I5n_a6WO9uc3Ka_s6sDTldvtNyB8QrQ5/view?usp=sharing"
            },
            {
              "context": "27% of entrepreneurs struggle with feelings of loneliness and isolation.",
              "URL": ""
            },
            {
              "context": "81% of founders aren't open about their struggles with stress.",
              "URL": ""
            },
            {
              "context": "84% say there's still a stigma around mental health But over half (51%) say it's getting better",
              "URL": ""
            }
          ]
        },
        {
          "name": "Work-Life Balance & Social Impact",
          "statistics": [
            {
              "context": "73% spend less time with friends, 60% with spouses, 58% with children.",
              "URL": "https://drive.google.com/file/d/1I5n_a6WO9uc3Ka_s6sDTldvtNyB8QrQ5/view?usp=sharing"
            },
            {
              "context": "59% of founders say they sleep less since starting their business.",
              "URL": ""
            },
            {
              "context": "47% frequently discuss stress with their partners, 41% occasionally.",
              "URL": ""
            },
            {
              "context": "Women are 28% more likely to talk to partners about stress.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Coping Strategies & Resilience",
          "statistics": [
            {
              "context": "73% use exercise as a coping mechanism.",
              "URL": "https://drive.google.com/file/d/1I5n_a6WO9uc3Ka_s6sDTldvtNyB8QrQ5/view?usp=sharing"
            },
            {
              "context": "56% turn to friends/family, 48% hobbies, 35% meditation, 31% therapy, 20% journaling",
              "URL": ""
            },
            {
              "context": "Despite mental health impacts, 93% would start another company.",
              "URL": ""
            }
          ]
        },
        {
          "name": "Identity-Based Mental Health Experiences",
          "statistics": [
            {
              "context": "59% of entrepreneurs say race affects their entrepreneurial experience.",
              "URL": "https://drive.google.com/file/d/1I5n_a6WO9uc3Ka_s6sDTldvtNyB8QrQ5/view?usp=sharing"
            },
            {
              "context": "56% of white entrepreneurs say race positively impacts them.",
              "URL": ""
            },
            {
              "context": "66% of female founders are stressed about the future.",
              "URL": ""
            },
            {
              "context": "28% of male vs. 41% of female founders struggle with imposter syndrome.",
              "URL": ""
            },
            {
              "context": "36% of male vs. 31% of female entrepreneurs experience burnout.",
              "URL": ""
            }
          ]
        }
      ]
    },
    {
      "category": "",
      "research_points": [
        {
          "name": "General Statistics",
          "statistics": [
            {
              "context": "100% of business owners will leave their businesses, whether planned or otherwise..",
              "URL": "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view?usp=drive_link"
            },
            {
              "context": "More than 50% of owners said the COVID-19 pandemic made no impact on their plans to exit, while 11% said it made them want to exit sooner.",
              "URL": ""
            }
          ]
        }
      ]
    }
  ]);

  useEffect(() => {
    // Fetch real data in background and update when ready 
    fetch("https://api.prspera.com/api-statistics/")
      .then(response => response.json())
      .then(result => {
      console.log("API data fetched successfully:", result);
      setData(result);
    })
    .catch(error => console.error("Error fetching data:", error));
}, []);

  return <LongAccordion data={data} />;
};

export default AccordionWithApi;
