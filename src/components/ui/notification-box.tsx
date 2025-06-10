import * as React from "react";
import { cn } from "@/lib/utils";

interface NotificationBoxProps {
  icon?: string;
  message: string;
  className?: string;
}

export const NotificationBox: React.FC<NotificationBoxProps> = ({
  icon,
  message,
  className
}) => {
  return (
    <aside
      className={cn(
        "bg-neutral-100 border self-stretch flex items-stretch gap-3 overflow-hidden text-xs text-[#555] font-normal px-[30px] py-4 rounded-xl border-[rgba(158,158,158,0.5)] border-solid",
        className
      )}
      role="complementary"
      aria-label="Webinar notification"
    >
      <img
        src={icon || "https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/28355e2b699fbd84f38e9b401807427bb066ae82?placeholderIfAbsent=true"}
        alt="Notification icon"
        className="aspect-[1] object-contain w-4 shrink-0"
        aria-hidden="true"
      />
      <div className="text-[#555] grow shrink w-[259px] basis-auto">
        {message}
      </div>
    </aside>
  );
};