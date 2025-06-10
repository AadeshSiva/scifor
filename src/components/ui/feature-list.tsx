import * as React from "react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: string;
  text: string;
  icon?: string;
}

interface FeatureListProps {
  features: FeatureItem[];
  className?: string;
}

export const FeatureList: React.FC<FeatureListProps> = ({ features, className }) => {
  return (
    <ul className={cn("space-y-4", className)} role="list">
      {features.map((feature) => (
        <li key={feature.id} className="flex items-stretch gap-3">
          <img
            src={feature.icon || "https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/e126d12a43fa77a502974ac5ba6fce861dea86e7?placeholderIfAbsent=true"}
            alt="Feature checkmark"
            className="aspect-[1] object-contain w-6 shrink-0"
            aria-hidden="true"
          />
          <span className="basis-auto text-base font-medium text-black">
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  );
};