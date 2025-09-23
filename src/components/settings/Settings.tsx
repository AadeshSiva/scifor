import { useAuth } from "@/utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting: React.FC = () => {
  const [mobileView, setMobileView] = useState<Boolean>(false);
  const navigate = useNavigate()
  const handleProfleView = () => {
    navigate('/profileView')
  }
  const handleUsernameView = () => {
    navigate('/usernameView')
  }
  const handleEmailIdView = () => {
    navigate('/emailView')
  }
  const handlePasswordView = () => {
    navigate('/passwordView')
  }
  const handleHistoryView = () => {
    navigate('/historyView')
  }
  const { user } = useAuth();
  return (
    <>
      <div>
        {!mobileView &&
          <div className="flex flex-col mt-16 w-full min-h-screen justify-center items-center overflow-hidden">
            <div className="flex flex-col w-1/2 h-[80vh] justify-left items-left p-4 gap-8">
              <div className="flex justify-left items-left">
                <span className="text-2xl items-left">Basic Information</span>
              </div>
              <div className="flex flex-col h-[60vh] w-[50vw]">
                <button className="flex justify-between border border-gray-500 p-6 rounded-t-lg bg-gray-200" onClick={handleProfleView}>
                  <span>Profile Information</span>
                  <span>{user?.full_name}<span className="ml-4">{'>'}</span> </span>
                </button>
                <button className="flex justify-between border border-gray-500 p-6 bg-gray-200" onClick={handleUsernameView}>
                  <span>Change Username</span>
                  <span>{user.username} <span className="ml-4">{'>'}</span></span>
                </button>
                <button className="flex justify-between border border-gray-500 p-6 bg-gray-200" onClick={handleEmailIdView}>
                  <span>Change Email ID</span>
                  <span>{user.email}<span className="ml-4">{'>'}</span></span>
                </button>
                <button className="flex justify-between border border-gray-500 p-6 bg-gray-200" onClick={handlePasswordView}>
                  <span>Change Password</span>
                  <span>. . . . . . <span className="ml-4">{'>'}</span></span>
                </button>
                <button className="flex justify-between border border-gray-500 p-6 rounded-b-lg bg-gray-200 w-full" onClick={handleHistoryView}>
                  <span>Purchase History</span>
                  <span className="ml-4">{'>'}</span>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};
export default Setting;
