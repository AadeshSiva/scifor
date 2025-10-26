import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  LayoutDashboard,
  ClipboardList,
  Calculator,
  TrendingUp,
  MessageCircle,
  Settings,
  Bot,
  LogOut,
} from "lucide-react";
import { PopupButton } from "react-calendly";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import Setting from "../settings/Settings";
import { useContext } from "react";
import UserContext from "../settings/Context/UserContext";
import DetailsResult from "../resultpage/DetailsResult";
import BranchassignmentResult from "../resultpage/BrandassignmentResult";
import ROIassignmentResult from "../resultpage/ROIassignmentResult";
import BrandDiagnosticResult from "../resultpage/BrandDiagnosticResult";

type Task = {
  id: number;
  title: string;
  description: string;
  progress: number;
  task1?: string;
  task2?: string;
  task3?: string;
  button?: string;
  button1?: string;
  button2?: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Add Business Details",
    description:
      "Provide your business information to help us understand your business better. Adding accurate details allows us to guide you effectively in building, growing, and positioning your business for a higher valuation.",
    progress: 0,
    button: "Add Details",
  },
  {
    id: 2,
    title: "Book with Harish Chauhan",
    description:
      "You've successfully added your business details. Now, take the next step by booking a session with Harish to gain expert insights, refine your strategies, and explore new opportunities for growth.",
    progress: 20,
    button1: "Book a Google Meet with Harish",
    button2: "skip now",
  },
  {
    id: 3,
    title: "Strategic Business Assessment",
    description:
      "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 40,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
  {
    id: 4,
    title: "Strategic Business Assessment",
    description:
      "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 60,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
  {
    id: 5,
    title: "Strategic Business Assessment",
    description:
      "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 80,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
  {
    id: 6,
    title: "Strategic Business Assessment",
    description:
      "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 100,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [IdNeeded, setIdNeeded] = useState<Task | null>(
    tasks.find((task) => task.id === 1) || null
  );
  const [Mobile, setMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ctx = useContext(UserContext);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [viewAssignment1 ,setAssignment1]=useState<boolean>(false);
  const [viewAssignment2 ,setAssignment2]=useState<boolean>(false);
  const [viewAssignment3 ,setAssignment3]=useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fix: Use proper useEffect hooks for session storage
  useEffect(() => {
    const local = sessionStorage?.getItem("add-details");
    if (local === "true") {
      const data = tasks.find((task) => task.id === 2);
      setIdNeeded(data || null);
    }

    const assign1 = sessionStorage?.getItem("assign-1");
    if (assign1 === "true") {
      const data = tasks.find((task) => task.id === 4);
      setIdNeeded(data || null);
    }

    const assign2 = sessionStorage?.getItem("assign-2");
    if (assign2 === "true") {
      const data = tasks.find((task) => task.id === 5);
      setIdNeeded(data || null);
    }

    const assign3 = sessionStorage?.getItem("assign-3");
    if (assign3 === "true") {
      const data = tasks.find((task) => task.id === 6);
      setIdNeeded(data || null);
    }
  }, []);

  console.log(user);

  const handleSkip = () => {
    const data = tasks.find((task) => task.id === 3);
    setIdNeeded(data || null);
    if (Mobile) setSidebarOpen(false);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleMeet = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/harishkc/30min",
      });
      const interval = setInterval(() => {
        const popupClosed = !document.querySelector(".calendly-overlay");
        if (popupClosed) {
          clearInterval(interval);
          const data = tasks.find((task) => task.id === 3);
          setIdNeeded(data || null);
        }
      }, 500);
    } else {
      console.error("Calendly script not loaded yet.");
    }
  };

  const handleaddDetailButton = () => {
    navigate("/businessdetails");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleassignment1 = () => {
    navigate("/brandassignment");
    const data = tasks.find((task) => task.id === 4);
    setIdNeeded(data || null);
  };

  const handleassignment2 = () => {
    navigate("/roiassignment");
    const data = tasks.find((task) => task.id === 5);
    setIdNeeded(data || null);
  };

  const handleassignment3 = () => {
    navigate("/brand-diagnostic");
    const data = tasks.find((task) => task.id === 6);
    setIdNeeded(data || null);
  };

  const handleUpgrade = () => {
    navigate("/pricing-plan");
  };

  const handleSettingPage = (e: React.MouseEvent) => {
    e.preventDefault();
    ctx.setEnabledSetting(true);
    ctx?.setUrl(window.location.pathname);
    setViewDetails(false);
    setAssignment1(false);
    setAssignment2(false);
    setAssignment3(false);
  };

  const handleDashboard = () => {
    ctx.setEnabledSetting(false);
    setViewDetails(false);
    setAssignment1(false);
    setAssignment2(false);
    setAssignment3(false);
    if (Mobile) setSidebarOpen(false);
  };

  const handleViewResult = () => {
    setViewDetails(true);
    if (Mobile) setSidebarOpen(false);
  };

  const closeSidebar = () => {
    if (Mobile) {
      setSidebarOpen(false);
    }
  };
  const handleAssignmentResult=()=>{
    if(IdNeeded.id==4){
      setAssignment1(true);
    }
    else if(IdNeeded.id==5){
      setAssignment2(true);
    }
    else if(IdNeeded.id==6){
      setAssignment3(true);
    }
  }

  return (
    <div className="flex relative bg-gray-100 min-h-screen">
      {/* Mobile Menu Button */}
      {Mobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} className="text-gray-700" />
        </button>
      )}

      {/* Sidebar */}
      {(sidebarOpen || !Mobile) && (
        <aside
          className={`fixed top-0 left-0 w-64 bg-white border border-gray-200 flex flex-col h-full overflow-y-auto z-40 
          ${Mobile ? "shadow-xl" : ""} transition-transform duration-300 ${
            Mobile && !sidebarOpen ? "-translate-x-full" : ""
          }`}
        >
          <nav className="flex-1 px-4 space-y-3 text-gray-700 mt-20">
            <a
              className="flex items-center gap-3 py-2 hover:text-yellow-600 cursor-pointer"
              onClick={handleDashboard}
            >
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a
              href="/brand-diagnostic-details"
              className="flex items-center gap-3 py-2 hover:text-yellow-600"
              onClick={closeSidebar}
            >
              <ClipboardList size={18} /> Brand Diagnostic
            </a>
            <a
              href="/roicalculation"
              className="flex items-center gap-3 py-2 hover:text-yellow-600"
              onClick={closeSidebar}
            >
              <Calculator size={18} /> ROI Calculator
            </a>
            <a 
              href="/exitwealth" 
              className="flex items-center gap-3 py-2 hover:text-yellow-600"
              onClick={closeSidebar}
            >
              <TrendingUp size={18} /> Exit Wealth Calculator
            </a>
            <a 
              href="/brandassets" 
              className="flex items-center gap-3 py-2 hover:text-yellow-600"
              onClick={closeSidebar}
            >
              <ClipboardList size={18} /> Brand Assets Checklist
            </a>
            <a 
              href="/groupchat" 
              className="flex items-center gap-3 py-2 hover:text-yellow-600"
              onClick={closeSidebar}
            >
              <MessageCircle size={18} /> Anonymous Group Chat
            </a>
            <a 
              href="/aiagent" 
              className="flex items-center gap-3 py-2 hover:text-yellow-600"
              onClick={closeSidebar}
            >
              <Bot size={18} /> AI Agent Chat
            </a>
          </nav>
          <div className="p-4 space-y-2 mt-auto mb-8">
            <a
              onClick={handleSettingPage}
              className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600 cursor-pointer"
            >
              <Settings size={18} /> Settings
            </a>
            <button
              className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600 w-full text-left"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Log out
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        !Mobile ? "ml-0 lg:ml-64" : "ml-0"
      }`}>
        {!ctx.enabledSetting && !viewDetails && !viewAssignment1 && !viewAssignment2 && !viewAssignment3 &&(
          <main className="bg-gray-100 min-h-screen p-4 md:p-6 lg:p-8">
            {/* Welcome Header */}
            <div className="flex flex-col items-center justify-center max-w-6xl mx-auto">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-walbaum text-gray-700 mb-6 mt-4 md:mt-8 text-center md:text-left">
                <div className="flex flex-col">
                  <span>Welcome to your Prspera dashboard,</span>
                  <span className="flex text-blue-600 items-center justify-center">{user.full_name} </span>
                </div>
              </h1>

              <div className="w-full max-w-6xl mx-auto space-y-6">
                {/* User Info Card */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Alias</span>
                      <span className="text-gray-900">{user.username || "Detail Not Provided"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Name</span>
                      <span className="text-gray-900">{user.full_name || "Detail Not Provided"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Company Email</span>
                      <span className="text-gray-900">{user.email || "Detail Not Provided"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Phone</span>
                      <span className="text-gray-900">{user.phone_number || "Detail Not Provided"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Country</span>
                      <span className="text-gray-900">{user.country || "Detail Not Provided"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">Status</span>
                      <span className={`font-semibold ${user.paid ? 'text-green-600' : 'text-orange-600'}`}>
                        {user.paid ? "Premium Member" : "Guest Plan"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upgrade Card */}
                {!user.paid && (
                  <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">Upgrade Your Experience</h3>
                        <p className="text-gray-600 mt-1">Unlock all features with our premium plan</p>
                      </div>
                      <button
                        className="bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-6 py-3 rounded-lg hover:bg-primary transition-colors duration-300 w-full md:w-auto font-semibold"
                        onClick={handleUpgrade}
                      >
                        Upgrade Plan
                      </button>
                    </div>
                  </div>
                )}

                {/* Progress Section */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                  {/* Progress Header */}
                  <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 pb-4 mb-4 border-b border-gray-300">
                    <div className="w-full md:flex-1">
                      <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="h-4 bg-blue-600 rounded-lg transition-all duration-500"
                          style={{ width: `${IdNeeded?.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm md:text-base font-semibold whitespace-nowrap">{`${
                      IdNeeded?.progress || 0
                    }% Completed`}</span>
                  </div>

                  {/* Progress Content */}
                  <div className="w-full flex flex-col lg:flex-row gap-6">
                    {/* Task Navigation */}
                    <div className="flex flex-col w-full lg:w-1/3 gap-3">
                      {[1, 2, 3].map((taskId) => (
                        <button
                          key={taskId}
                          className={`text-start p-3 rounded-lg border transition-all duration-200 ${
                            IdNeeded?.id === taskId
                              ? "border-blue-500 bg-blue-50 shadow-sm"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <span className="flex items-center text-sm">
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className={`mr-3 ${
                                IdNeeded && IdNeeded.id > taskId ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                            {tasks.find(t => t.id === taskId)?.title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Task Details */}
                    <div className="w-full lg:w-2/3">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {IdNeeded?.title}
                        </h3>
                        <p className="text-gray-700 pb-4 leading-relaxed">
                          {IdNeeded?.description || ""}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          {IdNeeded?.button && (
                            <button
                              className="bg-black text-[#DBA958] py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto"
                              onClick={handleaddDetailButton}
                            >
                              {IdNeeded.button}
                            </button>
                          )}
                          {IdNeeded?.button1 && (
                            <button
                              className="bg-black text-[#DBA958] py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto"
                              onClick={handleGoogleMeet}
                            >
                              {IdNeeded.button1}
                            </button>
                          )}
                          {IdNeeded?.button2 && (
                            <button
                              className="bg-gray-300 text-gray-600 py-2 px-6 rounded-md font-medium hover:bg-gray-400 transition-colors w-full sm:w-auto"
                              onClick={handleSkip}
                            >
                              {IdNeeded.button2}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Tasks List */}
                      {(IdNeeded?.task1 || IdNeeded?.task2 || IdNeeded?.task3) && (
                        <div className="space-y-4">
                          {[IdNeeded.task1, IdNeeded.task2, IdNeeded.task3].map((task, index) => (
                            task && (
                              <div 
                                key={index}
                                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg gap-3 border border-gray-200"
                              >
                                <div className="flex items-center flex-1">
                                  {(IdNeeded.id >= 4 + index) && (
                                    <FontAwesomeIcon
                                      icon={faCircleCheck}
                                      className="mr-3 text-green-500 flex-shrink-0"
                                    />
                                  )}
                                  <span className="text-sm font-medium">{task}</span>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                  <button 
                                    className="text-xs bg-[#141C24] text-[#DBA958] py-2 px-4 rounded whitespace-nowrap hover:bg-gray-800 transition-colors w-full sm:w-auto"
                                    onClick={handleViewResult}
                                  >
                                    View All Details
                                  </button>
                                  {IdNeeded.id >= 4 + index ? (
                                    <button className="text-xs bg-green-600 text-white py-2 px-4 rounded whitespace-nowrap hover:bg-green-700 transition-colors w-full sm:w-auto"
                                    onClick={handleAssignmentResult}>
                                      View Result
                                    </button>
                                  ) : (
                                    <button
                                      className="text-xs bg-[#141C24] text-[#DBA958] py-2 px-4 rounded whitespace-nowrap hover:bg-gray-800 transition-colors w-full sm:w-auto"
                                      onClick={index === 0 ? handleassignment1 : index === 1 ? handleassignment2 : handleassignment3}
                                    >
                                      View Assessment
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* Settings Page */}
        {ctx.enabledSetting && (
          <div className="w-full">
            <Setting />
          </div>
        )}

        {/* Details Result Page */}
        {viewDetails && (
          <div className="w-full">
            <DetailsResult />
          </div>
        )}
       {viewAssignment1 && (
          <div className="w-full">
            <BranchassignmentResult/>
          </div>
        )}
         {viewAssignment2 && (
          <div className="w-full">
            <ROIassignmentResult/>
          </div>
        )}
        {viewAssignment3 && (
          <div className="w-full">
            <BrandDiagnosticResult/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;