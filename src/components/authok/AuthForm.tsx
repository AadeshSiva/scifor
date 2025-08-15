// // components/authok/AuthForm.tsx
// import { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import { RegisterForm } from "./RegisterForm";

// type Tab = "login" | "register";

// export function AuthForm({
//   initialTab = "login",
//   onSuccess,
//   compact = false,
// }: {
//   initialTab?: Tab;
//   onSuccess?: (user?: any) => void;
//   compact?: boolean;
// }) {
//   const [activeTab, setActiveTab] = useState<Tab>(initialTab);
//   useEffect(() => setActiveTab(initialTab), [initialTab]);

//   const Wrapper = ({ children }: { children: React.ReactNode }) =>
//     compact ? (
//       <>{children}</>
//     ) : (
//       <div className="flex w-full h-screen items-center justify-center">
//         {children}
//       </div>
//     );

//   return (
//     <Wrapper>
//       <div className="w-full max-w-[700px] max-h-[95vh] overflow-y-auto shadow-lg bg-white px-6 py-4 rounded-2xl sm:px-8 sm:py-6">
//         <div className="flex mb-6 border-b border-gray-300">
//           {(["login", "register"] as Tab[]).map((tab) => (
//             <button
//               key={tab}
//               type="button"
//               className={`w-1/2 text-center text-2xl sm:text-xl py-4 ${
//                 activeTab === tab ? "font-semibold border-b-4 border-black" : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {activeTab === "login" ? (
//           <LoginForm
//             onSwitchToRegister={() => setActiveTab("register")}
//             onSuccess={onSuccess}
//           />
//         ) : (
//           <RegisterForm
//             onSwitchToLogin={() => setActiveTab("login")}
//             onSuccess={onSuccess}
//           />
//         )}
//       </div>
//     </Wrapper>
//   );
// }

// import { RegisterForm } from "./RegisterForm";

// export function AuthForm({
//   onSuccess,
//   compact = false,
//   onClose,
// }: {
//   onSuccess?: (user?: any) => void;
//   compact?: boolean;
//   onClose?: () => void;
// }) {
//   const Wrapper = ({ children }: { children: React.ReactNode }) =>
//     compact ? (
//       <>{children}</>
//     ) : (
//       <div className="flex w-full h-screen items-center justify-center">
//         {children}
//       </div>
//     );

//   return (
//     <Wrapper>
//       <div className="w-full max-w-[700px] max-h-[95vh] overflow-y-auto shadow-lg bg-white px-6 py-4 rounded-2xl sm:px-8 sm:py-6">
//         {/* No tabs, just the register form */}
//         <RegisterForm
//           onSwitchToLogin={() => {}} // Empty function since we don't want login
//           onSuccess={onSuccess}
//           onClose={onClose}
//         />
//       </div>
//     </Wrapper>
//   );
// }

// // components/authok/AuthForm.tsx
// import { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import { RegisterForm } from "./RegisterForm";

// type Tab = "login" | "register";

// export function AuthForm({
//   initialTab = "login",
//   onSuccess,
//   compact = false,
// }: {
//   initialTab?: Tab;
//   onSuccess?: (user?: any) => void;
//   compact?: boolean;
// }) {
//   const [activeTab, setActiveTab] = useState<Tab>(initialTab);
//   useEffect(() => setActiveTab(initialTab), [initialTab]);

//   const Wrapper = ({ children }: { children: React.ReactNode }) =>
//     compact ? (
//       <>{children}</>
//     ) : (
//       <div className="flex w-full h-screen items-center justify-center">
//         {children}
//       </div>
//     );

//   return (
//     <Wrapper>
//       <div className="w-full max-w-[700px] max-h-[95vh] overflow-y-auto shadow-lg bg-white px-6 py-4 rounded-2xl sm:px-8 sm:py-6">
//         <div className="flex mb-6 border-b border-gray-300">
//           {(["login", "register"] as Tab[]).map((tab) => (
//             <button
//               key={tab}
//               type="button"
//               className={`w-1/2 text-center text-2xl sm:text-xl py-4 ${
//                 activeTab === tab ? "font-semibold border-b-4 border-black" : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {activeTab === "login" ? (
//           <LoginForm
//             onSwitchToRegister={() => setActiveTab("register")}
//             onSuccess={onSuccess}
//           />
//         ) : (
//           <RegisterForm
//             onSwitchToLogin={() => setActiveTab("login")}
//             onSuccess={onSuccess}
//           />
//         )}
//       </div>
//     </Wrapper>
//   );
// }

// import { RegisterForm } from "./RegisterForm";

// export function AuthForm({
//   onSuccess,
//   compact = false,
//   onClose,
// }: {
//   onSuccess?: (user?: any) => void;
//   compact?: boolean;
//   onClose?: () => void;
// }) {
//   const Wrapper = ({ children }: { children: React.ReactNode }) =>
//     compact ? (
//       <>{children}</>
//     ) : (
//       <div className="flex w-full h-screen items-center justify-center">
//         {children}
//       </div>
//     );

//   return (
//     <Wrapper>
//       <div className="w-full max-w-[700px] max-h-[95vh] overflow-y-auto shadow-lg bg-white px-6 py-4 rounded-2xl sm:px-8 sm:py-6">
//         {/* No tabs, just the register form */}
//         <RegisterForm
//           onSwitchToLogin={() => {  }} // Empty function since we don't want login
//           onSuccess={onSuccess}
//           onClose={onClose}
//         />
//       </div>
//     </Wrapper>
//   );
// }

import { useState } from "react";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthForm({
  onSuccess,
  compact = false,
  onClose,
}: {
  onSuccess?: (user?: any) => void;
  compact?: boolean;
  onClose?: () => void;
}) {
  const [view, setView] = useState<"register" | "login">("register");

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    compact ? (
      <>{children}</>
    ) : (
      <div className="flex w-full h-screen items-center justify-center">{children}</div>
    );

  return (
    <Wrapper>
      <div className="w-full max-w-[700px] max-h-[95vh] overflow-y-auto shadow-lg bg-white px-6 py-4 rounded-2xl sm:px-8 sm:py-6">
        {view === "login" ? (
          <LoginForm
            onSwitchToRegister={() => setView("register")}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={() => setView("login")}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        )}
      </div>
    </Wrapper>
  );
}
