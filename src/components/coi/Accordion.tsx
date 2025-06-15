import React, { useState, useEffect, useRef } from 'react';
import { Dot } from 'lucide-react';

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

const LongAccordion: React.FC<LongAccordionProps> = ({
  data = [],
  className = ''
}) => {
  const [openSection, setOpenSection] = useState<string>('0-0'); // Only one section open at a time
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const navbarRef = useRef<HTMLDivElement>(null);

  // Toggle section open/close - only one can be open at a time
  const handleSectionToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? '' : sectionId);
  };

  // Handle category selection
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Always reset to first item when category changes
    setOpenSection('0-0');
  };

  // Handle PDF opening in new tab
  const handleOpenPdf = (url: string) => {
    // Convert Google Drive URL to preview URL if needed
    let viewUrl = url;
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (driveMatch && !url.includes('/view')) {
      const fileId = driveMatch[1];
      viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    }
    window.open(viewUrl, '_blank');
  };

  // Filter data based on selected category
  const filteredData = selectedCategory === 'All' 
    ? data 
    : data.filter(category => category.category === selectedCategory);

  // Generate unique ID for sections - FIXED: Use filtered array indices
  const generateId = (filteredCategoryIndex: number, researchIndex: number) => {
    return `${filteredCategoryIndex}-${researchIndex}`;
  };

  // Calculate continuous serial numbers - FIXED: Use filtered data for calculation
  const getSerialNumber = (categoryIndex: number, researchIndex: number) => {
    let serialNumber = 1;
    
    for (let i = 0; i < categoryIndex; i++) {
      serialNumber += filteredData[i].research_points.length;
    }
    serialNumber += researchIndex;
    
    return serialNumber;
  };

  // Set first item as open when filtered data changes
  useEffect(() => {
    if (filteredData.length > 0 && filteredData[0].research_points.length > 0) {
      setOpenSection('0-0');
    } else {
      setOpenSection('');
    }
  }, [selectedCategory]); // Changed dependency to selectedCategory

  return (
    <div className={`w-full ${className}`}>
      {/* Sticky Category Navigation - Multiple lines with flex wrap */}
      <div 
        ref={navbarRef}
        className="sticky top-[86px] z-10 bg-[#F5F5F5] px-8 py-4 border border-gray-500 shadow-lg rounded-lg max-w-4xl"
      >
        <div className="flex flex-wrap gap-2">
          {/* All button */}
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-50 border border-gray-500'
            }`}
          >
            All
          </button>
          
          {/* Category buttons */}
          {data.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.category
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-50 border border-gray-500'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto border-b border-gray-400 border-l border-r">
        {filteredData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {/* Research Points */}
            <div className="overflow-hidden shadow-lg">
              {category.research_points.map((researchPoint, researchIndex) => {
                const sectionId = generateId(categoryIndex, researchIndex);
                const isOpen = openSection === sectionId;
                const serialNumber = getSerialNumber(categoryIndex, researchIndex);
                
                return (
                  <div 
                    key={researchIndex} 
                    className="bg-white"
                  >
                    <button
                      className="flex items-center gap-2 w-full px-8 py-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 border-b-[.8px] border-gray-300"
                      onClick={() => handleSectionToggle(sectionId)}
                    >
                      <span className="text-black text-lg min-w-8">
                        {String(serialNumber).padStart(2, '0')}
                      </span>
                      <span className="text-black text-lg flex-1 font-medium">
                        {researchPoint.name}
                      </span>
                      <svg
                        className={`transform transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
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
                        <div className="bg-neutral-100 px-8 py-6 max-sm:p-4">
                          <div className="text-gray-600 text-base leading-relaxed space-y-4">
                            {researchPoint.statistics.map((stat, statIndex) => (
                              <div key={statIndex} className='flex items-start justify-between gap-4'>
                                <div className="flex items-start flex-1">
                                  <Dot size={30} className="flex-shrink-0 mt-1"/>
                                  <span>{stat.context}</span>
                                </div>
                                {stat.url && (
                                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                    <div className="w-20 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                                      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                        <path d="M6 8h20v16H6V8zm2 2v12h16V10H8zm6 4h8v2h-8v-2zm0 4h6v2h-6v-2z" fill="white"/>
                                      </svg>
                                    </div>
                                    <button
                                      onClick={() => handleOpenPdf(stat.url)}
                                      className="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors cursor-pointer underline text-center"
                                    >
                                      View PDF
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
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

      {/* Sample Data Display */}
      {data.length === 0 && (
        <div className="max-w-6xl mx-auto p-8 text-center text-gray-500">
          <p className="text-lg mb-4">No data available. Connect to your backend API at <code>/category-list</code></p>
          <p className="text-sm">Expected data structure:</p>
          <pre className="text-left bg-gray-100 p-4 rounded mt-4 text-xs overflow-auto">
{`[
  {
    "category": "Category Name",
    "research_points": [
      {
        "name": "Research Point Name",
        "statistics": [
          {
            "context": "Statistic context text",
            "url": "https://drive.google.com/file/d/..."
          }
        ]
      }
    ]
  }
]`}
          </pre>
        </div>
      )}
    </div>
  );
};

// Example of how to use with API data
const AccordionWithApi: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://intern-project-final-1.onrender.com/category-statistics/');
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSampleData();
      } finally {
        setLoading(false);
      }
    };

    const setSampleData = () => {
      setData([
        {
          category: "Business Exit Strategies for 2024",
          research_points: [
            {
              name: "Exit Planning",
              statistics: [
                { 
                  context: "75% of business owners want to exit their businesses within the next ten years.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view"
                },
                { 
                  context: "73% of privately held companies in the U.S. plan to transition within the next 10 years, representing a $14 trillion opportunity.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
                },
                { 
                  context: "48% of business owners who want to sell have no formal exit strategy.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view"
                }
              ]
            },
            {
              name: "Lack of Planning",
              statistics: [
                { 
                  context: "Only 17% of business owners actually have a formal exit plan.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
                },
                { 
                  context: "58% of owners have never had their business formally appraised.",
                  url: "https://drive.google.com/file/d/1gevHl4PV5zEPBfBI1JYIE6lgIP_ph3P7/view"
                }
              ]
            }
          ]
        },
        {
          category: "Choosing the Right Exit Path",  
          research_points: [
            {
              name: "Attitudes Toward Exit Strategies",
              statistics: [
                { 
                  context: "14% of business owners think they don't need an exit strategy.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
                }
              ]
            }
          ]
        },
        {
          category: "Market Valuation Trends",  
          research_points: [
            {
              name: "Business Valuation",
              statistics: [
                { 
                  context: "Average business sale multiples have increased by 15% in 2024.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
                }
              ]
            }
          ]
        },
        {
          category: "Succession Planning",  
          research_points: [
            {
              name: "Family Succession",
              statistics: [
                { 
                  context: "30% of family businesses survive into the second generation.",
                  url: "https://drive.google.com/file/d/1nfmrL7tfErQ6kJQrIN2tilJITK3HNPLP/view?usp=sharing"
                }
              ]
            }
          ]
        }
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