import React, { useEffect, useState } from 'react';

interface Question {
  id: string;
  text: string;
  section: string;
  answer?: string;
}

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

// Updated questions array based on the actual data from the image
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

// Your existing tasks array remains the same
const tasks: Task[] = [
  // ... (your existing tasks array)
];

const BrandDiagnosticResult: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);

  // Group questions by section for display
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.section]) {
      acc[question.section] = [];
    }
    acc[question.section].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  // Group tasks by their title (category)
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
        // Set mock data based on the image
        setUserData({
          country: "",
          role: "",
          id: "1",
          email: "xyz@gmail.com",
          full_name: "Uda Mahesh",
          username: "GrayShip123",
          email_verified: true,
          paid: true,
          iswebinarformfilled: true,
          is_staff: false
        });
        return;
      }

      try {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({
          country: "",
          role: "",
          id: "1",
          email: "xyz@gmail.com",
          full_name: "Uda Mahesh",
          username: "GrayShip123",
          email_verified: true,
          paid: true,
          iswebinarformfilled: true,
          is_staff: false
        });
      }
    };

    fetchData();
  }, []);
  return (
    <div className="roi-result-container p-6 bg-white mt-16">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Name</span>
              <span className="text-gray-900 font-semibold">
                {userData?.full_name || "Uda Mahesh"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Alias</span>
              <span className="text-gray-900 font-semibold">
                {userData?.username || "GrayShip123"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Email ID</span>
              <span className="text-gray-900 font-semibold">
                {userData?.email || "xyz@gmail.com"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Submitted Date</span>
              <span className="text-gray-900 font-semibold">
                08/09/2024
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="questionnaire-results mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Questionnaire Results</h2>
        {Object.entries(groupedQuestions).map(([section, sectionQuestions]) => (
          <div key={section} className="section mb-6 border border-gray-200 rounded-lg">
            <div className="section-header bg-gray-100 p-4 font-bold text-lg border-b">
              {section}
            </div>
            <div className="questions">
              {sectionQuestions.map((question) => (
                <div key={question.id} className="question-item grid grid-cols-3 p-4 border-b border-gray-100">
                  <div className="question-text col-span-2">
                    {question.text}
                  </div>
                  <div className={`answer text-right font-semibold ${question.answer === 'YES' ? 'text-green-600' :
                    question.answer === 'NO' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                    {question.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="issues-table">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDiagnosticResult;