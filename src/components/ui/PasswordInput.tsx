import React, { useState } from "react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export function PasswordInput({
  label,
  required = false,
  placeholder = "Enter password",
  error,
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
          className={`border text-sm w-full px-4 py-2.5 pr-12 rounded-lg border-solid transition-colors focus:outline-none ${
            error ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-black'
          }`}
          required={required}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <i className="ti ti-eye" />
          ) : (
            <i className="ti ti-eye-off" />
          )}
        </button>
      </div>
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}