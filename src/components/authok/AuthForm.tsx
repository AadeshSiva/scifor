import { useState } from "react";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthPage() {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <AuthForm />
      </div>
    );
  }
  
  export function AuthForm() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
    return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full max-w-[700px] max-h-[95vh] overflow-y-auto shadow-lg bg-white px-6 py-4 rounded-2xl sm:px-8 sm:py-6">
        <div className="flex mb-6 border-b border-gray-300">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`w-1/2 text-center text-2xl sm:text-xl py-4 ${
                activeTab === tab ? "font-semibold border-b-4 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab as "login" | "register")}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {activeTab === "login" ? <LoginForm onSwitchToRegister={() => setActiveTab("register")} /> : <RegisterForm onSwitchToLogin={() => setActiveTab("login")} />}
      </div>
      </div>
    );
  }