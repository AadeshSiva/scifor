import React, { useState, useEffect, useRef } from 'react';
import { Dot } from 'lucide-react';

interface Statistic {
  context: string;
}

interface ResearchPoint {
  name: string;
  statistics: Statistic[];
}

interface Category {
  category: string;
  category_url: string;
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
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeResearchPoint, setActiveResearchPoint] = useState<string>('');
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const researchRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const navbarRef = useRef<HTMLDivElement>(null);

  // Toggle section open/close
  const handleSectionToggle = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  // Scroll to category
  const scrollToCategory = (categoryName: string) => {
    const element = categoryRefs.current[categoryName];
    if (element) {
      const navbarHeight = navbarRef.current?.offsetHeight || 0;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll events for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = navbarRef.current?.offsetHeight || 0;
      const scrollPosition = window.scrollY + navbarHeight + 100;

      // Find active category
      let currentCategory = '';
      Object.entries(categoryRefs.current).forEach(([categoryName, element]) => {
        if (element && element.offsetTop <= scrollPosition) {
          currentCategory = categoryName;
        }
      });
      setActiveCategory(currentCategory);

      // Find active research point
      let currentResearchPoint = '';
      Object.entries(researchRefs.current).forEach(([researchName, element]) => {
        if (element && element.offsetTop <= scrollPosition) {
          currentResearchPoint = researchName;
        }
      });
      setActiveResearchPoint(currentResearchPoint);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  // Generate unique ID for sections
  const generateId = (categoryIndex: number, researchIndex: number) => {
    return `${categoryIndex}-${researchIndex}`;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Sticky Category Navigation */}
            <div 
        ref={navbarRef}
        className="sticky top-[86px] z-10 bg-white px-8 py-4 border border-gray-500 shadow-lg rounded-lg"
        >
        <div className="flex flex-wrap gap-2 max-w-6xl">
            {data.map((category, index) => (
            <button
                key={index}
                onClick={() => scrollToCategory(category.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-white border border-gray-500'
                }`}
            >
                {category.category}
            </button>
            ))}
        </div>
        </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto border-b border-gray-400 border-l border-r">
        {data.map((category, categoryIndex) => (
          <div 
            key={categoryIndex}
            ref={el => categoryRefs.current[category.category] = el}
          >

            {/* Research Points */}
            <div className="overflow-hidden shadow-lg">
              {category.research_points.map((researchPoint, researchIndex) => {
                const sectionId = generateId(categoryIndex, researchIndex);
                const isOpen = openSections.has(sectionId);
                
                return (
                  <div 
                    key={researchIndex} 
                    className="bg-white"
                    ref={el => researchRefs.current[researchPoint.name] = el}
                  >
                    <button
                      className={`flex items-center gap-2 w-full px-8 py-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 border-b-[.8px] border-gray-300 ${
                        activeResearchPoint === researchPoint.name ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => handleSectionToggle(sectionId)}
                    >
                      <span className="text-black text-lg min-w-8">
                        {String(researchIndex + 1).padStart(2, '0')}
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
                        <div className="flex justify-between items-start gap-8 bg-neutral-100 px-8 py-6 max-sm:flex-col max-sm:gap-4 max-sm:p-4">
                          <div className="text-gray-600 text-base leading-relaxed flex-1 space-y-3">
                            {researchPoint.statistics.map((stat, statIndex) => (
                              <p key={statIndex} className='flex items-start'>
                                <Dot size={30} className="flex-shrink-0 mt-1"/>
                                <span>{stat.context}</span>
                              </p>
                            ))}
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <div className="w-24 h-20 bg-gray-600 rounded-lg flex items-center justify-center">
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M6 8h20v16H6V8zm2 2v12h16V10H8zm6 4h8v2h-8v-2zm0 4h6v2h-6v-2z" fill="white"/>
                              </svg>
                            </div>
                            <a 
                              href={category.category_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors"
                            >
                              report.pdf
                            </a>
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

      {/* Sample Data Display (remove this when connecting to backend) */}
      {data.length === 0 && (
        <div className="max-w-6xl mx-auto p-8 text-center text-gray-500">
          <p className="text-lg mb-4">No data available. Connect to your backend API at <code>/category-list</code></p>
          <p className="text-sm">Expected data structure:</p>
          <pre className="text-left bg-gray-100 p-4 rounded mt-4 text-xs overflow-auto">
{`[
  {
    "category": "Category Name",
    "category_url": "https://...",
    "research_points": [
      {
        "name": "Research Point Name",
        "statistics": [
          {
            "context": "Statistic context text"
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
        // Fallback to sample data for demonstration
        setSampleData();
      } finally {
        setLoading(false);
      }
    };

    const setSampleData = () => {
      setData([
        {
          category: "Business Exit Strategies for 2024",
          category_url: "https://example.com/report1.pdf",
          research_points: [
            {
              name: "Exit Planning",
              statistics: [
                { context: "75% of business owners want to exit their businesses within the next ten years." },
                { context: "73% of privately held companies in the U.S. plan to transition within the next 10 years, representing a $14 trillion opportunity." },
                { context: "48% of business owners who want to sell have no formal exit strategy." }
              ]
            },
            {
              name: "Lack of Planning",
              statistics: [
                { context: "Only 17% of business owners actually have a formal exit plan." },
                { context: "58% of owners have never had their business formally appraised." }
              ]
            }
          ]
        },
        {
          category: "Family Business Succession",  
          category_url: "https://example.com/report2.pdf",
          research_points: [
            {
              name: "Survival Rates",
              statistics: [
                { context: "Only 30% of all family-owned businesses survive into the second generation." },
                { context: "Only 12% survive into the third generation." },
                { context: "Only 3% operate at the fourth generation and beyond." }
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