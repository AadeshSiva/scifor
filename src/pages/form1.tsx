// src/pages/form1.tsx
import React from "react";
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

const Form1: React.FC = () => {
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
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <ClipboardList size={18} /> Brand Diagnostic
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <Calculator size={18} /> ROI Calculator
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <TrendingUp size={18} /> Exit Wealth Calculator
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <ClipboardList size={18} /> Brand Assets Checklist
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <MessageCircle size={18} /> Anonymous Group Chat
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 hover:text-yellow-600"
          >
            <Bot size={18} /> AI Agent Chat
          </a>
        </nav>

        <div className="p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600"
          >
            <Settings size={18} /> Settings
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 text-gray-600 hover:text-yellow-600"
          >
            <LogOut size={18} /> Log out
          </a>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 mx-20 mt-12 overflow-y-auto">
        <form className="space-y-6 text-sm text-gray-700 max-w-3xl">
          {/* Basic Info */}
          <div className="flex flex-row items-center justify-between">
            <label className="font-medium mb-1">Business Name:</label>
            <input type="text" className="border rounded-md px-32 py-1" />
          </div>

          <div className="flex flex-row items-center justify-between">
            <label className="font-medium mb-1">Industry:</label>
            <input type="text" className="border rounded-md px-32 py-1" />
          </div>

          <div className="flex flex-row items-center justify-between">
            <label className="font-medium mb-1">
              Company Incorporation Date:
            </label>
            <input type="date" className="border rounded-md px-32 py-1" />
          </div>

          <div className="flex flex-row items-center justify-between">
            <label className="font-medium mb-1">Address 1:</label>
            <input type="text" className="border rounded-md px-32 py-1" />
          </div>

          <div className="flex flex-row items-center justify-between">
            <label className="font-medium mb-1">Address 2:</label>
            <input type="text" className="border rounded-md px-32 py-1" />
          </div>

          <div className="flex flex-row items-center justify-between">
            <label className="font-medium mb-1">Country:</label>
            <input type="text" className="border rounded-md px-32 py-1" />
          </div>

          {/* Stage of Growth */}
          <div>
            <label className="block font-medium">Stage of Growth:</label>
            <div className="flex flex-col gap-2 mt-2 mx-20">
              {[
                "startup",
                "growing",
                "mature",
                "recently acquired/merged",
                "turnaround",
                "insolvent",
              ].map((stage) => (
                <label
                  key={stage}
                  className="flex justify-between items-center"
                >
                  <span>{stage}</span>
                  <input type="checkbox" className="w-4 h-4" />
                </label>
              ))}
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label className="block font-medium">Company Size:</label>
            <div className="flex gap-6 mt-2">
              {["Small", "Medium", "Large", "Global"].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input type="radio" name="companySize" /> {size}
                </label>
              ))}
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium">Your Role:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {[
                "CEO/Exec/Owner",
                "HR",
                "Ops",
                "Advertising",
                "Marketing",
                "Customer Service",
                "Finance",
                "Sales",
                "Technology",
                "Strategy",
                "Other",
              ].map((role) => (
                <label key={role} className="flex items-center gap-2">
                  <input type="radio" name="role" /> {role}
                </label>
              ))}
            </div>
          </div>

          {/* Offerings */}
          <div>
            <label className="block font-medium">Offerings:</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="offerings" /> Products
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="offerings" /> Services
              </label>
            </div>
          </div>

          {/* Company Succession Plan */}
          <div>
            <label className="block font-medium">
              Company Succession Plan:
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="succession" /> Exists
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="succession" /> Non-Existent
              </label>
            </div>
          </div>

          {/* Company Business Plan */}
          <div>
            <label className="block font-medium">Company Business Plan:</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="bizplan" /> Exists
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="bizplan" /> Non-Existent
              </label>
            </div>
          </div>

          {/* Revenue, Profit */}
          <div>
            <label className="block font-medium">Revenues (last 3 yrs):</label>
            <div className="flex gap-6 mt-2">
              {["Unknown", "Unimportant", "Unmanaged"].map((rev) => (
                <label key={rev} className="flex items-center gap-2">
                  <input type="radio" name="revenues" /> {rev}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Profits (last 3 yrs):</label>
            <div className="flex gap-6 mt-2">
              {["Unknown", "Unimportant", "Unmanaged"].map((p) => (
                <label key={p} className="flex items-center gap-2">
                  <input type="radio" name="profits" /> {p}
                </label>
              ))}
            </div>
          </div>

          {/* Cash Flow */}
          <div>
            <label className="block font-medium">Cash Flow Position:</label>
            <div className="flex gap-6 mt-2">
              {["Weak", "Sufficient", "Strong"].map((c) => (
                <label key={c} className="flex items-center gap-2">
                  <input type="radio" name="cashflow" /> {c}
                </label>
              ))}
            </div>
          </div>

          {/* Asset Management */}
          <div>
            <label className="block font-medium">Asset Management:</label>
            <div className="flex gap-6 mt-2">
              {["Weak", "Sufficient", "Strong"].map((a) => (
                <label key={a} className="flex items-center gap-2">
                  <input type="radio" name="assets" /> {a}
                </label>
              ))}
            </div>
          </div>

          {/* Staff Turnover */}
          <div>
            <label className="block font-medium">Staff Turnover:</label>
            <div className="flex gap-6 mt-2">
              {["High", "Low", "Unchanging"].map((s) => (
                <label key={s} className="flex items-center gap-2">
                  <input type="radio" name="staff" /> {s}
                </label>
              ))}
            </div>
          </div>

          {/* HR, IT, Sales, Marketing */}
          <div>
            <label className="block font-medium">HR Processes:</label>
            <div className="flex gap-6 mt-2">
              {["Formal", "Informal"].map((hr) => (
                <label key={hr} className="flex items-center gap-2">
                  <input type="radio" name="hr" /> {hr}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">IT Processes:</label>
            <div className="flex gap-6 mt-2">
              {["Formal", "Informal"].map((it) => (
                <label key={it} className="flex items-center gap-2">
                  <input type="radio" name="it" /> {it}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Sales Processes:</label>
            <div className="flex gap-6 mt-2">
              {["Formal", "Informal"].map((sales) => (
                <label key={sales} className="flex items-center gap-2">
                  <input type="radio" name="sales" /> {sales}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">
              Public Relations/Advertising Plan:
            </label>
            <div className="flex gap-6 mt-2">
              {["Formal", "Informal"].map((pr) => (
                <label key={pr} className="flex items-center gap-2">
                  <input type="radio" name="pr" /> {pr}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Marketing Strategy:</label>
            <div className="flex gap-6 mt-2">
              {["Formal", "Informal"].map((m) => (
                <label key={m} className="flex items-center gap-2">
                  <input type="radio" name="marketing" /> {m}
                </label>
              ))}
            </div>
          </div>

          {/* Culture */}
          <div>
            <label className="block font-medium">Culture:</label>
            <textarea
              className="mt-1 w-full border rounded-md p-2"
              rows={3}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Form1;
