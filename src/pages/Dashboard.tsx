// src/App.tsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Calculator,
  TrendingUp,
  MessageCircle,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Add Business Details",
    description:
      "Provide your business information to help us understand your business better. Adding accurate details allows us to guide you effectively in building, growing, and positioning your business for a higher valuation.",
  },
  {
    id: 2,
    title: "Update Profile Details",
    description:
      "Keep your profile up-to-date to ensure accurate recommendations. Updated profiles help us personalize strategies for your business growth.",
  },
  {
    id: 3,
    title: "Check Brand Diagnostic",
    description:
      "Run a diagnostic check on your brand to identify strengths and weaknesses. This will help us guide you with precise recommendations.",
  },
  {
    id: 4,
    title: "Add Business Documents",
    description:
      "Upload important business documents to verify and validate your company profile. This increases trust and valuation potential.",
  },
];

const Dashboard: React.FC = () => {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(tasks[0]);

  const handleClick = (task: Task) => {
    setActiveTask(task);

    // Add to completed only if not already
    if (!completed.includes(task.id)) {
      setCompleted([...completed, task.id]);
    }
  };

  const progress = (completed.length / tasks.length) * 100;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 text-2xl font-bold text-gray-800">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
            alt="Prospera Logo"
            className="w-[195px] h-[34px]"
          />
        </div>
        <nav className="flex-1 px-4 space-y-3 text-gray-700">
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <ClipboardList size={18} /> Brand Diagnostic
          </a>
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <Calculator size={18} /> ROI Calculator
          </a>
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <TrendingUp size={18} /> Exit Wealth Calculator
          </a>
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <ClipboardList size={18} /> Brand Assets Checklist
          </a>
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <MessageCircle size={18} /> Anonymous Group Chat
          </a>
          <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
            <Bot size={18} /> AI Agent Chat
          </a>
        </nav>

        <div className="p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600">
            <Settings size={18} /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600">
            <LogOut size={18} /> Log out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        {/* Welcome Message */}
        <h1 className="text-2xl font-walbaum text-gray-700 mb-6">
          Welcome to your Prospera dashboard
        </h1>

        <div className="w-full max-w-2xl space-y-6">
          {/* Profile Info Card */}
          <div className="bg-white shadow-md rounded-lg p-6 px-16">
            <div className="divide-y divide-gray-200 text-gray-700">
              <div className="flex justify-between py-2">
                
              </div>
              <div className="flex justify-between py-2">
                
              </div>
              <div className="flex justify-between py-2">
                
              </div>
              <div className="flex justify-between py-2">
                
              </div>
              <div className="flex justify-between py-2">
                
              </div>
            </div>
          </div>

          {/* Membership Card */}
          <div className="bg-white text-lg shadow-md rounded-lg px-16 py-2 flex items-center justify-between">
            <span>Membership</span>
            <span className="text-lg text-gray-600">Guest Plan</span>
            <button className="bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-12 py-1   rounded-lg hover:bg-primary transition-colors duration-300">
              Upgrade Plan
            </button>
          </div>

          {/* Combined Progress + Actions + Info in one Card */}
          {/* <div className="bg-white shadow-md rounded-lg p-6">
            
            <div className="mb-4 flex justify-between text-sm items-center mx-40">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                <div
                  className="bg-gray-300 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{progress}% Completed</span>
            </div>


            <div className="grid grid-cols-2 gap-6">

              <div className="space-y-2 border-r pr-4">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleClick(task)}
                    className={`w-full flex items-center gap-2 py-2 px-3 rounded-md border text-left transition-colors duration-300
                ${
                  activeTask?.id === task.id
                    ? "bg-gray-200 border-gray-400 text-gray-700 "
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
                  >
                    <img
                      //   src="https://cdn-icons-png.flaticon.com/512/845/845646.png" //
                      src="/assets/tick.png"
                      alt="task icon"
                      className="w-5 h-5 object-contain"
                    />{" "}
                    {task.title}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-600 flex flex-col justify-between">
                {activeTask && (
                  <>
                    <div>
                      <h3 className="font-bold mb-2 text-black ">{activeTask.title}</h3>
                      <p>{activeTask.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (activeTask?.id === 1) {
                          window.open("/form1", "_blank");
                        } else if (activeTask?.id === 2) {
                          window.open("/form2", "_blank");
                        } else if (activeTask?.id === 3) {
                          window.open("/form3", "_blank");
                        }
                      }}
                      className="mt-4 bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-8 py-1   rounded-lg hover:bg-primary transition-colors duration-300 self-start"
                    >
                      Add Details
                    </button>
                  </>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
