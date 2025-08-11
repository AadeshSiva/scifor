// components/authok/AuthModal.tsx
import React from "react";
import { AuthForm } from "@/components/authok/AuthForm";

export function AuthModal({
  open,
  onClose,
  initialTab = "register",
  onAuthSuccess,
}: {
  open: boolean;
  onClose: () => void;
  initialTab?: "login" | "register";
  onAuthSuccess: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[760px]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-200"
          aria-label="Close"
        >
          ✕
        </button>
        <AuthForm initialTab={initialTab} compact onSuccess={onAuthSuccess} />
      </div>
    </div>
  );
}