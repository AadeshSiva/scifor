import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
import { PopupButton } from "react-calendly";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
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
    description: "Provide your business information to help us understand your business better. Adding accurate details allows us to guide you effectively in building, growing, and positioning your business for a higher valuation.",
    progress: 0,
    button: "Add Details"
  },
  {
    id: 2,
    title: "Book with Harish Chauhan",
    description:
      "You've successfully added your business details. Now, take the next step by booking a session with Harish to gain expert insights, refine your strategies, and explore new opportunities for growth.",
    progress: 20,
    button1: "Book a Google Meet with Harish",
    button2: "skip now"
  },
  {
    id: 3,
    title: "Strategic Business Assessment",
    description: "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 40,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
  {
    id: 4,
    title: "Strategic Business Assessment",
    description: "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 60,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
  {
    id: 5,
    title: "Strategic Business Assessment",
    description: "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 80,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
  {
    id: 6,
    title: "Strategic Business Assessment",
    description: "Strengthen your business foundation with these essential assessments. Complete each one to gain clarity on your assets, returns, and brand positioning.",
    progress: 100,
    task1: "1.Business Assets Checklist",
    task2: "2.ROI/COI Calculator",
    task3: "3.Brand Diagnostic",
  },
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [IdNeeded, setIdNeeded] = useState<Task | null>(tasks.find(task => task.id === 1) || null);
  const [Mobile, setMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleSkip = () => {
    const data = tasks.find(task => task.id === 3);
    setIdNeeded(data || null);
    if (Mobile) setSidebarOpen(false);
  }
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
          setIdNeeded(data);
        }
      }, 500);
    } else {
      console.error("Calendly script not loaded yet.");
    }
  }
  const handleaddDetailButton = () => {
    navigate('/businessdetails');
  }
  const local = sessionStorage?.getItem("add-details");
  if (local) {
    useEffect(() => {
      if (local == "true") {
        const data = tasks.find(task => task.id === 2);
        setIdNeeded(data);
      }
    }, [local]);
  }
  const assign1 = sessionStorage?.getItem("assign-1");
  if (assign1) {
    useEffect(() => {
      if (assign1 == "true") {
        const data = tasks.find(task => task.id === 4);
        setIdNeeded(data);
      }
    }, [assign1]);
  }
  const assign2 = sessionStorage?.getItem("assign-2");
  if (assign2) {
    useEffect(() => {
      if (assign2 == "true") {
        const data = tasks.find(task => task.id === 5);
        setIdNeeded(data);
      }
    }, [assign2]);
  }
  const assign3 = sessionStorage?.getItem("assign-3");
  if (assign3) {
    useEffect(() => {
      if (assign3 == "true") {
        const data = tasks.find(task => task.id === 6);
        setIdNeeded(data);
      }
    }, [assign3]);
  }
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleassignment1 = () => {
    navigate("/brandassignment")
    const data = tasks.find(task => task.id === 4);
    setIdNeeded(data || null);
  }
  const handleassignment2 = () => {
    navigate("/roiassignment")
    const data = tasks.find(task => task.id === 5);
    setIdNeeded(data || null);
  }
  const handleassignment3 = () => {
    navigate("/brand-diagnostic")
    const data = tasks.find(task => task.id === 6);
    setIdNeeded(data || null);
  }
  const handleUpgrade = () => {
    navigate("/payment")
  }
  console.log(user)
  return (
    <div className="flex relative bg-gray-100 min-h-screen">
      {Mobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} className="text-gray-700" />
        </button>
      )}
      {(sidebarOpen || !Mobile) && (
        <aside className={`fixed top-0 left-0 w-64 bg-white border border-gray-200 flex flex-col h-full overflow-y-auto z-40 
          ${Mobile ? 'shadow-xl' : ''} transition-transform duration-300 ${Mobile && !sidebarOpen ? '-translate-x-full' : ''}`}>
          <nav className="flex-1 px-4 space-y-3 text-gray-700 mt-20">
            <a href="#" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a href="/brand-diagnostic-details" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <ClipboardList size={18} /> Brand Diagnostic
            </a>
            <a href="/roicalculation" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <Calculator size={18} /> ROI Calculator
            </a>
            <a href="/exitwealth" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <TrendingUp size={18} /> Exit Wealth Calculator
            </a>
            <a href="/brandassets" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <ClipboardList size={18} /> Brand Assets Checklist
            </a>
            <a href="/groupchat" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <MessageCircle size={18} /> Anonymous Group Chat
            </a>
            <a href="/aiagent" className="flex items-center gap-3 py-2 hover:text-yellow-600">
              <Bot size={18} /> AI Agent Chat
            </a>
          </nav>
          <div className="p-4 space-y-2 mt-auto mb-8">
            <a href="/setting" className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600">
              <Settings size={18} /> Settings
            </a>
            <button className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600" onClick={handleLogout}>
              <LogOut size={18} /> Log out
            </button>
          </div>
        </aside>
      )}
      <main className={`flex-1 bg-gray-100 min-h-screen p-4 md:p-8 ${Mobile ? 'ml-0' : 'ml-64'}`}>
        <h1 className="text-xl flex justify-center md:text-2xl font-walbaum text-gray-700 mb-6 mt-14 text-center md:text-left">
          <div className="flex flex-col text-center"> 
            <span>Welcome to your Prspera dashboard,</span>
            <span>[{user.full_name}]</span>
          </div>
        </h1>
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
            <div className="divide-y divide-gray-200 text-gray-700">
              <div className="flex justify-between py-2">
                <span>Alias</span>
                <span className="text-gray-400">{user.username}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Name</span>
                <span className="text-gray-400">{user.full_name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Company Email</span>
                <span className="text-gray-400">{user.email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Phone</span>
                <span className="text-gray-400">{user.phone_number}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Country</span>
                <span className="text-gray-400">Not Provided</span>
              </div>
            </div>
          </div>
          {!user.paid && (
            <div className="bg-white text-md md:text-lg shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-medium">Membership</span>
              <span className="text-gray-600">Guest Plan</span>
              <button className="bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-6 py-1 rounded-lg hover:bg-primary transition-colors duration-300 w-full md:w-auto" onClick={handleUpgrade}>
                Upgrade Plan
              </button>
            </div>)}
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col mb-4">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 pb-4 mb-4 border-b border-gray-300">
              <div className="w-full md:w-3/4 h-4 bg-gray-200 rounded-lg overflow-hidden">
                <div className="h-4 bg-gray-400 rounded-lg transition-all duration-500" style={{ width: `${IdNeeded?.progress || 0}%` }}></div>
              </div>
              <span className="text-sm md:text-base whitespace-nowrap">{`${IdNeeded?.progress || 0}% Completed`}</span>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="flex flex-col w-full md:w-1/3 gap-2">
                <button
                  className={`text-start text-sm p-3 rounded-lg border ${IdNeeded?.id === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <span className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`mr-2 ${IdNeeded && IdNeeded.id > 1 ? 'text-green-500' : 'text-gray-400'}`}
                    />
                    Add Business Details
                  </span>
                </button>
                <button
                  className={`text-start text-sm p-3 rounded-lg border ${IdNeeded?.id === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <span className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`mr-2 ${IdNeeded && IdNeeded.id > 2 ? 'text-green-500' : 'text-gray-400'}`}
                    />
                    Book with Harish Chauhan
                  </span>
                </button>
                <button
                  className={`text-start text-sm p-3 rounded-lg border ${IdNeeded && IdNeeded.id >= 3 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <span className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`mr-2 ${IdNeeded && IdNeeded.id > 3 ? 'text-green-500' : 'text-gray-400'}`}
                    />
                    Strategic Business Assessment
                  </span>
                </button>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-4">
                  <p className="text-sm md:text-base text-gray-700 pb-4">{IdNeeded?.description || ''}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {IdNeeded?.button && (
                      <button
                        className="bg-black text-[#DBA958] py-2 px-4 rounded-md text-sm md:text-base w-full sm:w-auto"
                        onClick={handleaddDetailButton}
                      >
                        {IdNeeded.button}
                      </button>
                    )}
                    {IdNeeded?.button1 && (
                      <div className="App">
                        <button className="bg-black text-[#DBA958] m-2 rounded-md p-2 text-md" onClick={handleGoogleMeet}>
                          <PopupButton
                            url="https://calendly.com/harishkc/30min"
                            rootElement={document.getElementById("root")}
                            text={IdNeeded.button1}
                          />
                        </button>
                      </div>)}
                    {IdNeeded?.button2 && (
                      <button
                        className="bg-gray-300 text-gray-600 px-4 h-10 mt-2 rounded-md text-sm md:text-base w-full sm:w-auto hover:bg-gray-400 transition-colors"
                        onClick={handleSkip}
                      >
                        {IdNeeded.button2}
                      </button>
                    )}
                  </div>
                </div>
                {(IdNeeded?.task1 || IdNeeded?.task2 || IdNeeded?.task3) && (
                  <div className="flex flex-col gap-3">
                    {IdNeeded?.task1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <div className="flex items-center">
                          {(IdNeeded.id == 4 || IdNeeded.id == 5 || IdNeeded.id == 6) && (<FontAwesomeIcon icon={faCircleCheck} className="mr-2 text-green-500" />)}
                          <span className="text-sm">{IdNeeded.task1}</span>
                        </div>
                        {
                          IdNeeded.id == 4 || IdNeeded.id == 5 || IdNeeded.id == 6 ? (
                            <button className="text-xs bg-[#141C24] text-[#DBA958] py-1 px-3 rounded whitespace-nowrap">
                              View Result
                            </button>
                          ) : (
                            <button className="text-xs bg-[#141C24] text-[#DBA958] py-1 px-3 rounded whitespace-nowrap" onClick={handleassignment1}>
                              Take Assessment
                            </button>
                          )}
                      </div>
                    )}
                    {IdNeeded?.task2 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <div className="flex items-center">
                          {(IdNeeded.id == 5 || IdNeeded.id == 6) && (<FontAwesomeIcon icon={faCircleCheck} className="mr-2 text-green-500" />)}
                          <span className="text-sm">{IdNeeded.task2}</span>
                        </div>
                        {
                          IdNeeded.id == 5 || IdNeeded.id == 6 ? (
                            <button className="text-xs bg-[#141C24] text-[#DBA958] py-1 px-3 rounded whitespace-nowrap">
                              View Result
                            </button>
                          ) : (
                            <button className="text-xs bg-[#141C24] text-[#DBA958] py-1 px-3 rounded whitespace-nowrap" onClick={handleassignment2}>
                              Take Assessment
                            </button>
                          )}
                      </div>
                    )}
                    {IdNeeded?.task3 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <div className="flex items-center">
                          {IdNeeded.id == 6 && (<FontAwesomeIcon icon={faCircleCheck} className="mr-2 text-green-500" />)}
                          <span className="text-sm">{IdNeeded.task3}</span>
                        </div>
                        {
                          IdNeeded.id == 6 ? (
                            <button className="text-xs bg-[#141C24] text-[#DBA958] py-1 px-3 rounded whitespace-nowrap">
                              View Result
                            </button>
                          ) : (
                            <button className="text-xs bg-[#141C24] text-[#DBA958] py-1 px-3 rounded whitespace-nowrap" onClick={handleassignment3}>
                              Take Assessment
                            </button>
                          )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;