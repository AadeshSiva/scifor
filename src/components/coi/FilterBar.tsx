import * as React from "react";
import { cn } from "@/lib/utils";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "ready", label: "Are You Ready to Exit?" },
  { id: "planning", label: "Planning & Strategy" },
  { id: "path", label: "Choosing the Right Exit Path" },
  { id: "market", label: "Market, Timing & Advisors" },
];

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  isActive = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "text-sm font-normal h-[42px] border shrink-0 cursor-pointer font-linear",
        "transition-all duration-[0.2s] ease-[ease] px-4 py-[11px] rounded-xl",
        "border-solid border-black",
        "hover:bg-black hover:text-white",
        "focus:outline-none focus:ring-2 focus:bg-black focus:text-white",
        "max-md:text-[13px] max-md:px-3 max-md:py-[11px]",
        "max-sm:text-xs max-sm:h-9 max-sm:min-w-max max-sm:px-3 max-sm:py-2",
        isActive && "bg-black text-white font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <nav
      className="flex h-16 items-center gap-6 shadow-[0px_4px_4.2px_0px_rgba(0,0,0,0.25)]
                overflow-x-auto whitespace-nowrap bg-white px-4 py-[11px] rounded-2xl
                max-md:gap-4 max-md:px-3 max-md:py-[11px]
                max-sm:gap-2 max-sm:h-auto max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:p-2"
      role="navigation"
      aria-label="Content filters"
    >
      {filterOptions.map((option) => (
        <FilterButton
          key={option.id}
          isActive={activeFilter === option.id}
          onClick={() => onFilterChange(option.id)}
          role="tab"
          aria-selected={activeFilter === option.id}
          aria-controls={`${option.id}-content`}
        >
          {option.label}
        </FilterButton>
      ))}
    </nav>
  );
};