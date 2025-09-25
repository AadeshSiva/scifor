import { useState } from "react";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
export function AuthForm({
  onSuccess,
  compact = false,
  onClose,
  initialView = "register",
}: {
  onSuccess?: (user?: any) => void;
  compact?: boolean;
  onClose?: () => void;
  initialView?: "register" | "login";
}) {
  const [view, setView] = useState<"register" | "login">(initialView);
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    compact ? (
      <>{children}</>
    ) : (
      <div className="flex w-full h-screen items-center justify-center">
        {children}
      </div>
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
