import React from "react";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  // Add more countries as needed
];

const CountrySelect: React.FC<CountrySelectProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-[61px] border text-base px-4 py-0 rounded-xl border-solid border-[rgba(0,0,0,0.3)] ${className}`}
      aria-label="Select country"
    >
      <option value="" disabled>Please Select</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;