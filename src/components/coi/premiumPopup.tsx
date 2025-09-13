"use client";
import * as React from "react";
import { FeatureList } from "@/components/ui/feature-list";
import { NotificationBox } from "@/components/ui/notification-box";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PremiumPopupProps {
  onUnlockAccess?: () => void;
  className?: string;
}
const premiumFeatures = [
  { id: "business-email", text: "Business Email" },
  { id: "showcase-skills", text: "Showcase up to 50 skills" },
  { id: "custom-cover", text: "Custom cover photo" },
  { id: "unlimited-revisions", text: "Unlimited revisions" },
  { id: "exclusive-rewards", text: "Unlock exclusive rewards" },
  { id: "webinar-invites", text: "Private webinar invites" },
  { id: "early-access", text: "Early access to community updates" }
];
export const PremiumPopup: React.FC<PremiumPopupProps> = ({
  onUnlockAccess,
  className
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate()
  const handleUnlockAccess = async () => {
    navigate("/join")
  };
  return (
    <article
      className={`sticky top-[86px] w-full max-w-sm bg-white p-8 px-3 rounded-3xl border-4 border-gray-300 shadow-lg flex-shrink-0 self-start`}
      role="dialog"
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
    >
      <header className="text-center">
        <h1
          id="popup-title"
          className="text-[rgba(43,43,43,1)] text-2xl font-normal text-center self-center"
        >
          Yes, I'm all in 🚀
        </h1>
        <h2
          id="popup-description"
          className="text-[#555] text-xl self-center mt-6"
        >
          Unlock Elite Access with Unlimited Perks
        </h2>
      </header>
      <section className="mt-8" aria-label="Premium features">
        <FeatureList features={premiumFeatures} />
      </section>
      <NotificationBox
        message="Next Webinar: May 22/25 – Only 53 Spots Available"
        className="mt-8"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUnlockAccess();
        }}
        className="mt-8"
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white font-semibold bg-black hover:bg-gray-800 disabled:opacity-50 px-[70px] py-[13px] rounded-lg transition-colors"
          aria-describedby="cta-description"
        >
          {isSubmitting ? "Processing..." : "Unlock My Access Now !"}
        </Button>
      </form>
      <footer className="mt-4">
        <blockquote className="text-[#555] text-[10px] font-normal self-center text-center">
          "Would your future self wish you had started today?''
        </blockquote>
      </footer>
    </article>
  );
};