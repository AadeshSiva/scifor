import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
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
  const navigate=useNavigate();
  const [IdNeeded, setIdNeeded] = useState<Task | null>(tasks.find(task => task.id === 1) || null);

  const [Mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddBusinessDetails = () => {
    const data = tasks.find(task => task.id === 1);
    setIdNeeded(data || null);
  };
  const handleBookwithHarishChauhan = () => {
    const data = tasks.find(task => task.id === 2);
    setIdNeeded(data || null);
  };
  const handleStrategicBusinessAsessment = () => {
    const data = tasks.find(task => task.id === 3);
    setIdNeeded(data || null);
  };
  const handleSkip = () => {
    const data = tasks.find(task => task.id === 3);
    setIdNeeded(data || null);
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
        console.log(popupClosed)
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
  const handleaddDetailButton=()=>{
    navigate('/businessdetails')
  }
  const local=localStorage?.getItem("add-details")
  useEffect(()=>{
     if(local == "true"){
      const data=tasks.find(task=>task.id===2);
      setIdNeeded(data)
     }
  },[local])
  return (
    <div className="flex relative mt-14 bg-gray-100 mx-auto">
      {/* Sidebar */}
      {!Mobile && (
        <aside className="fixed top-[65px] left-[8px] w-64 bg-white border border-gray-200 flex flex-col h-[calc(100vh-75px)] overflow-y-auto">
          <div className="flex justify-center border-b p-4 text-2xl font-bold text-gray-800">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
              alt="Prospera Logo"
              className="w-[175px] h-[24px]"
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
      )}
      {/* Main Content */}
      <main className="flex-1 flex bg-gray-100 h-[100%] p-8 flex-col items-center">
        <h1 className="text-2xl font-walbaum text-gray-700 mb-6">
          Welcome to your Prospera dashboard
        </h1>
        <div className="w-full max-w-2xl space-y-6">
          {/* Profile Info Card */}
          <div className="bg-white shadow-md rounded-lg p-6 px-16">
            <div className="divide-y divide-gray-200 text-gray-700">
              <div className="flex justify-between py-2">
                <span>Alias</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Name</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Company Email</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Phone</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Country</span>
              </div>
              <div></div>
            </div>
          </div>
          {/* Membership Card */}
          <div className="bg-white text-lg shadow-md rounded-lg px-16 py-2 flex items-center justify-between">
            <span>Membership</span>
            <span className="text-lg text-gray-600">Guest Plan</span>
            <button className="bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-12 py-1 rounded-lg hover:bg-primary transition-colors duration-300">
              Upgrade Plan
            </button>
          </div>
          {/* Tasks Section */}
          <div className="bg-white text-lg shadow-md rounded-lg py-2 flex flex-col mb-4 border-b border-gray-500">
            <div className="flex justify-center w-full gap-4 items-center border-b border-gray-500 h-10">
              <div className="w-96 h-4 bg-gray-200 rounded-lg overflow-hidden">
                <div className="h-4 bg-gray-400 rounded-lg" style={{ width: `${IdNeeded?.progress || 0}%` }}></div>
              </div>
              <span>{`${IdNeeded?.progress || 0}% Completed`}</span>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col justify-items-start mb-4 w-64">
                {IdNeeded?.id === 1 ? (
                  <button className="text-start text-sm w-64 py-2" onClick={handleAddBusinessDetails}>
                    <span className="flex flex-row">
                      <span className="mt-1 border-l border-gray-400">
                        <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2" />
                        Add Business Details
                      </span>
                    </span>
                  </button>
                ) : IdNeeded?.id === 2 ? (
                  <button className="text-start text-sm w-64 py-2 border border-gray-400" onClick={handleAddBusinessDetails}>
                    <span className="mt-1">
                      <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2 text-green-500" />
                      Add Business Details
                    </span>
                  </button>
                ) : (
                  <button className="text-start text-sm w-64 border border-gray-300 py-2  border border-gray-400" onClick={handleAddBusinessDetails}>
                    <span className="mt-1">
                      <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2 text-green-500" />
                      Add Business Details
                    </span>
                  </button>
                )}
                {IdNeeded?.id === 2 ? (
                  <button className="text-start text-sm w-64 py-2" onClick={handleBookwithHarishChauhan}>
                    <span className="flex flex-row">
                      <span className="mt-1 border-l border-gray-400">
                        <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2" />
                        Book with Harish Chauhan
                      </span>
                    </span>
                  </button>
                ) : IdNeeded?.id === 3 ? (
                  <button className="text-start text-sm w-64 py-2 border border-gray-400" onClick={handleBookwithHarishChauhan}>
                    <span className="flex flex-row">
                      <span className="mt-1">
                        <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2 text-green-500" />
                        Book with Harish Chauhan
                      </span>
                    </span>
                  </button>
                ) : (
                  <button className="text-start text-sm w-64 border border-gray-300 py-2 border border-gray-400" onClick={handleBookwithHarishChauhan}>
                    <span className="mt-1">
                      <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2" />
                      Book with Harish Chauhan
                    </span>
                  </button>
                )}
                {IdNeeded?.id === 3 ? (
                  <button className="text-start text-sm w-64 py-2" onClick={handleStrategicBusinessAsessment}>
                    <span className="flex flex-row">
                      <span className="mt-1 border-l border-gray-400">
                        <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2" />
                        Strategic Business Assessment
                      </span>
                    </span>
                  </button>
                ) : IdNeeded?.id === 4 ? (
                  <button className="text-start text-sm w-64 py-2 border border-gray-400" onClick={handleStrategicBusinessAsessment}>
                    <span className="flex flex-row">
                      <span className="mt-1">
                        <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2 text-green-500" />
                        Strategic Business Assessment
                      </span>
                    </span>
                  </button>
                ) : (
                  <button className="text-start text-sm w-64 border border-gray-400 py-2" onClick={handleStrategicBusinessAsessment}>
                    <span className="mt-1">
                      <FontAwesomeIcon icon={faCircleCheck} className="pr-2 w-5 h-5 pl-2" />
                      Strategic Business Assessment
                    </span>
                  </button>
                )}
              </div>
              <div>
                <div className="m-4">
                  <p className="text-sm border-b border-gray-400 pb-4">{IdNeeded?.description || ''}</p>
                  <div className="flex">
                    {IdNeeded?.button && (
                      <button className="bg-black text-[#DBA958] m-2 rounded-md px-2 text-md" onClick={handleaddDetailButton}>{IdNeeded?.button}</button>)}
                    {IdNeeded?.button1 && (
                      <div className="App">
                        <button className="bg-black text-[#DBA958] m-2 rounded-md px-2 text-md" onClick={handleGoogleMeet}>
                          <PopupButton
                            url="https://calendly.com/harishkc/30min"
                            rootElement={document.getElementById("root")}
                            text={IdNeeded.button1}
                          />
                        </button>
                      </div>)}
                    {IdNeeded?.button2 && (
                      <button className="bg-gray-300 text-gray-400 m-2 rounded-md px-2 text-md hover:bg-gray-400 hover:text-gray-500" onClick={handleSkip} >{IdNeeded?.button2}</button>)}
                  </div>
                </div>
                {(IdNeeded?.task1 || IdNeeded?.task2 || IdNeeded?.task3) && (
                  <div className="flex flex-col text-xs mx-10 gap-2">
                    {IdNeeded?.task1 && (
                      <div className="flex">
                        <button className="flex justify-between items-center w-52 bg-gray-50 p-2 rounded hover:bg-gray-100">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCircleCheck} className="pr-2 text-green-500" />
                            <span>{IdNeeded.task1}</span>
                          </div>
                          <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-300" />
                        </button>
                        <button className="text-xs h-6 w-24 bg-[#141C24] text-[#DBA958] rounded rounded-lg">
                          Take Assessment
                        </button>
                      </div>
                    )}
                    {IdNeeded?.task2 && (
                      <div className="flex">
                        <button className="flex justify-between items-center w-52 bg-gray-50 p-2 rounded hover:bg-gray-100">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCircleCheck} className="pr-2 text-green-500" />
                            <span>{IdNeeded.task2}</span>
                          </div>
                          <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-300" />
                        </button>
                        <button className="text-xs h-6 w-24 bg-[#141C24] text-[#DBA958] rounded rounded-lg">
                          Take Assessment
                        </button>
                      </div>
                    )}
                    {IdNeeded?.task3 && (
                      <div className="flex">
                        <button className="flex justify-between items-center w-52 bg-gray-50 p-2 rounded hover:bg-gray-100">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCircleCheck} className="pr-2 text-green-500" />
                            <span>{IdNeeded.task3}</span>
                          </div>
                          <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-300" />
                        </button>
                        <button className="text-xs h-6 w-24 bg-[#141C24] text-[#DBA958] rounded rounded-lg">
                          Take Assessment
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div >
      </main >
    </div >
  );
};
export default Dashboard;
