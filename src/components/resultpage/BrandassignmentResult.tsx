import { useEffect, useState } from "react";

interface Task {
  id: number;
  title?: string;
  description: string;
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

interface SurveyResponse {
  id: number;
  question: string;
  answer: string;
  section: string;
}

const BranchassignmentResult: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("access_token");

  const tasks: Task[] = [
    {
      id: 1,
      title: "SECTION 1 – LEADERSHIP",
      description: "1. Our company values are well demonstrated by leaders and staff.",
    },
    {
      id: 1,
      description: "2. Our company is clear on how we are different than our competitors.",
    },
    {
      id: 1,
      description: "3. Our company has assigned experienced individuals and sufficient resources to responsibly develop the company Brand.",
    },
    {
      id: 1,
      description: "4. Our leadership understands how the company Brand and the Branding process can grow and enrich the business.",
    },
    {
      id: 1,
      description: "5. Our leadership has trademarked the company name, logo, special statements and related Brand assets and protects them.",
    },
    {
      id: 1,
      description: "6. Our leaders and stakeholders actively participate in the growth of the Brand and its equity/goodwill within their respective positions.",
    },
    {
      id: 1,
      description: "7. Our leadership knows how the Brand will make them money during their personal or company Exit / Succession.",
    },
    {
      id: 1,
      description: "8. Our company philosophy is well demonstrated by leaders, staff, partners and associates.",
    },
    {
      id: 1,
      description: "9. Our company philosophy strengthens our Brand, client base and attracts prospects.",
    },
    {
      id: 1,
      description: "10. Leadership and staff are proud of the company Brand and champion it sincerely.",
    },
    {
      id: 2,
      title: "SECTION 2 - MESSAGE",
      description: "1. Our Brand message is clear and concise",
    },
    {
      id: 2,
      description: "2. Our Brand message is consistent throughout internal and external communications and initiatives",
    },
    {
      id: 2,
      description: "3. Our Brand message is remembered and mentioned, in a positive fashion and on a regular basis, by our leaders, staff, customers, prospects and even our competitors.",
    },
    {
      id: 2,
      description: "4. Our Brand message genuinely represents our business philosophy.",
    },
    {
      id: 2,
      description: "5. Our message is well managed by our publicity, marketing, communications, advertising and/or graphic design suppliers.",
    },
    {
      id: 2,
      description: "6. Our Brand message is unique to that of our competitors or anyone else in the industry.",
    },
    {
      id: 2,
      description: "7. Our Brand Message is quickly repaired or corrected in the event that it has been damaged or misunderstood in the marketplace.",
    },
    {
      id: 2,
      description: "8. Our staff positively reinforces our Brand message in day to day conversations among themselves, with suppliers and customers.",
    },
    {
      id: 2,
      description: "9. Our Brand message is unchanging from campaign to campaign, year after year so that its value and goodwill are compounded.",
    },
    {
      id: 2,
      description: "10. The industry, our customers and prospects revere our Brand.",
    },
    {
      id: 3,
      title: "SECTION 3 – OPERATIONS",
      description: "1. Our Branding initiatives are smart and measured for performance.",
    },
    {
      id: 3,
      description: "2. During staff performance reviews, our company assesses how each leader and staff member increases the value of our Brand.",
    },
    {
      id: 3,
      description: "3. Each product and service offering expresses our Brand philosophy.",
    },
    {
      id: 3,
      description: "4. Our staff and company members know how their work realises the company philosophy and delivers on our Brand promise.",
    },
    {
      id: 3,
      description: "5. Our business philosophy helps company management prioritize issues and overcome difficult situations.",
    },
    {
      id: 3,
      description: "6. Our business philosophy and Brand promise is well documented and available for all who need and want it.",
    },
    {
      id: 3,
      description: "7. Our company implements our Brand promise in new product / service development, employee learning programs, compensation and market strategy.",
    },
    {
      id: 3,
      description: "8. We have financial systems to quantify the value of our Brand.",
    },
    {
      id: 3,
      description: "9. Our customers and staff consistently experience our Brand promise.",
    },
    {
      id: 3,
      description: "10. The Brand and business philosophy are consistent inside and outside our business.",
    },
    {
      id: 4,
      title: "SECTION 4 – BRAND ARTIFACTS",
      description: "1. Our company has the necessary Branding artifacts to promote our company and its philosophy.",
    },
    {
      id: 4,
      description: "2. Our philosophy is consistently expressed in our Branding artifacts.",
    },
    {
      id: 4,
      description: "3. I am happy about our company name, logo, corporate identity (Business Cards, Letterhead, Website, Signs etc) and campaigns.",
    },
    {
      id: 4,
      description: "4. I am happy with our company's reputation.",
    },
    {
      id: 4,
      description: "5. We carefully monitor the consistency, timeliness and effectiveness of our communications and marketing material.",
    },
    {
      id: 4,
      description: "6. We understand what management, staff, customers and partners feel about our company, our offerings and the way we do business.",
    },
    {
      id: 4,
      description: "7. We are careful to address only those requests and concerns that can be fulfilled with our company philosophy and Brand promise.",
    },
    {
      id: 4,
      description: "8. Our Branding efforts attract the customers, employees and partners that we need, want and like to have.",
    },
    {
      id: 4,
      description: "9. Our Branding artifacts are well distributed to the appropriate target audiences.",
    },
    {
      id: 4,
      description: "10. Our company's internal and external Branding artifacts unify how employees and customers experience our company.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.warn("No access token found in localStorage");
        setDataLoading(false);
        return;
      }
      try {
        setDataLoading(true);
        setError(null);
        
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
        const surveyResponse = await fetch("https://api.prspera.com/brand-surveys/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (surveyResponse.ok) {
          const surveyDataResponse = await surveyResponse.json();
          setSurveyData(surveyDataResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const getAnswerForQuestion = (question: string): string => {
    const response = surveyData.find(item => 
      item.question.toLowerCase().includes(question.toLowerCase().substring(3)) // Remove number prefix
    );
    return response?.answer || "Not answered";
  };
  const getScoreColor = (answer: string): string => {
    const lowerAnswer = answer.toLowerCase();
    if (lowerAnswer.includes('strongly agree') || lowerAnswer.includes('always')) {
      return "text-green-600 bg-green-100";
    } else if (lowerAnswer.includes('agree') || lowerAnswer.includes('often')) {
      return "text-blue-600 bg-blue-100";
    } else if (lowerAnswer.includes('neutral') || lowerAnswer.includes('sometimes')) {
      return "text-yellow-600 bg-yellow-100";
    } else if (lowerAnswer.includes('disagree') || lowerAnswer.includes('rarely')) {
      return "text-orange-600 bg-orange-100";
    } else if (lowerAnswer.includes('strongly disagree') || lowerAnswer.includes('never')) {
      return "text-red-600 bg-red-100";
    }
    return "text-gray-600 bg-gray-100";
  };

  const formatAnswer = (answer: string): string => {
    if (!answer || answer === "Not answered") return "Not answered";
    return answer.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Brand Diagnostic Results
              </h1>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Assessment Completed
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="space-y-8">
          {[1, 2, 3, 4].map(sectionId => {
            const sectionTasks = tasks.filter(task => task.id === sectionId);
            const sectionTitle = sectionTasks.find(task => task.title)?.title || `Section ${sectionId}`;
            
            return (
              <div key={sectionId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">{sectionTitle}</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {sectionTasks.map((task, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(getAnswerForQuestion(task.description))}`}>
                            {formatAnswer(getAnswerForQuestion(task.description))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default BranchassignmentResult;