import React, { useState } from "react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  placeholder?: string;
}

export function PasswordInput({
  label,
  required = false,
  placeholder = "Enter password",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="text-base text-black flex items-center gap-1">
        <span>{label}</span>
        {required && <span className="text-black ml-1">*</span>}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="border text-sm w-full px-4 py-2.5 rounded-lg border-solid border-[#555]"
          required={required}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute -translate-y-2/4 text-[#555] cursor-pointer right-4 top-2/4"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <i className="ti ti-eye absolute -translate-y-2/4 text-[#555] cursor-pointer right-0 top-2/4" />
          ) : (
            <i className="ti ti-eye-off absolute -translate-y-2/4 text-[#555] cursor-pointer right-0 top-2/4" />
          )}
        </button>
      </div>
    </div>
  );
}
