
import React from 'react';

// Types
interface CheckboxItemProps {
  checked?: boolean;
  text: string;
}

interface PricingCardProps {
  title: string;
  price?: string;
  features: string[];
  quote: string;
  showUpgradeButton?: boolean;
}

// CheckboxItem Component
const CheckboxItem: React.FC<CheckboxItemProps> = ({ checked = false, text }) => {
  const checkboxSvg = checked ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99967 14.6668C11.6815 14.6668 14.6663 11.682 14.6663 8.00016C14.6663 4.31826 11.6815 1.3335 7.99967 1.3335C4.31777 1.3335 1.33301 4.31826 1.33301 8.00016C1.33301 11.682 4.31777 14.6668 7.99967 14.6668ZM11.6377 6.3049L7.33301 10.6096L4.52827 7.8049L5.47108 6.8621L7.33301 8.72403L10.6949 5.36209L11.6377 6.3049Z" fill="black"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99967 14.6668C4.31777 14.6668 1.33301 11.682 1.33301 8.00016C1.33301 4.31826 4.31777 1.3335 7.99967 1.3335C11.6815 1.3335 14.6663 4.31826 14.6663 8.00016C14.6663 11.682 11.6815 14.6668 7.99967 14.6668ZM7.99967 13.3335C10.9452 13.3335 13.333 10.9457 13.333 8.00016C13.333 5.05464 10.9452 2.66683 7.99967 2.66683C5.05415 2.66683 2.66634 5.05464 2.66634 8.00016C2.66634 10.9457 5.05415 13.3335 7.99967 13.3335Z" fill="#9E9E9E"/>
    </svg>
  );

  return (
    <div className="flex items-center gap-3 text-[#626262] text-xl mb-4">
      <div>{checkboxSvg}</div>
      <span>{text}</span>
    </div>
  );
};

// PricingCard Component
const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  quote,
  showUpgradeButton = false,
}) => {
  return (
    <article className="w-[302px] rounded bg-white border-2 border-solid border-[rgba(158,158,158,0.5)] max-md:w-[45%] max-sm:w-full">
      <header className="text-center text-white text-2xl font-medium shadow-[0_6px_7.1px_0_rgba(0,0,0,0.25)] bg-[#555] p-4 rounded-[4px_4px_0_0]">
        {title}
      </header>
      
      {showUpgradeButton && (
        <div className="text-center px-5 py-10">
          <div className="text-black text-4xl font-semibold">{price}</div>
          <div className="text-[#626262] text-base italic mt-2">
            One Time Payment
          </div>
          <button className="w-full rounded text-white text-base cursor-pointer bg-black mt-5 p-4 border-[none]">
            Upgrade Now
          </button>
        </div>
      )}

      <div className="p-5">
        {features.map((feature, index) => (
          <CheckboxItem
            key={index}
            checked={showUpgradeButton}
            text={feature}
          />
        ))}
      </div>

      <footer className="text-black text-2xl font-medium leading-8 p-5">
        {quote}
      </footer>
    </article>
  );
};

// Hero Component
const Hero: React.FC = () => {
  return (
    <section className="text-center mb-10">
      <h1 className="text-[#D22F27] text-7xl font-normal max-w-[627px] mt-10 mx-auto my-0 max-sm:text-5xl">
        <span className="text-[#818181]">How you grow today </span>
        <span className="text-[#818181]">decides how you </span>
        <span className="text-[#007C7A]">win </span>
        <span className="text-[#818181]">or a </span>
        <span className="text-[#D22F27]">lose </span>
        <span className="text-[#818181]">tomorrow.</span>
      </h1>
      <p className="text-[#626262] text-[28px] font-light leading-8 max-w-[463px] mx-auto my-5 max-sm:text-xl">
        Join the world's ONLY SYSTEM to maximize, monetize your most lucrative
        business assets –
      </p>
      <p className="text-[#626262] text-[28px] font-light leading-8 max-w-[463px] mx-auto my-5 max-sm:text-xl">
        now you can grow and exit like you have always dreamed of. Or lose it
        all…forever.
      </p>
      <h2 className="text-[#777] text-7xl font-normal mx-auto my-10 max-sm:text-5xl">
        4 options. 1 decision.
      </h2>
      <div className="text-center text-[#626262] text-[28px] font-light leading-8 mx-auto my-10 max-sm:text-xl">
        <p>Whatever you decide we will not sell you or do follow ups.</p>
        <p className="mx-0 my-5">WE HAVE A NO SELLING PHILOSOPHY:</p>
        <p>
          We all love to buy, hate being sold to. Rather we will educate with
          FREE tools, webinars etc.
        </p>
        <p>
          We trust that you know your business best and what's best for you –
          only when you are adequately informed. Our job is to ensure you are
          fully informed by those who are goal congruent with you.
        </p>
      </div>
    </section>
  );
};

// SideBar Component
const SideBar: React.FC<{logoUrl: string}> = ({ logoUrl }) => {
  return (
    <aside className="absolute w-[150px] right-0 top-[137px] max-sm:hidden">
      <img
        src={logoUrl}
        alt="Side Logo"
        className="w-[140px] h-[35px]"
      />
      <div className="-rotate-90 text-black text-[21px] mt-12">
        <span>Grow Smarter.</span>
        <span className="font-bold">Exit Richer™</span>
      </div>
    </aside>
  );
};

// PricingSection Component
const PricingSection: React.FC = () => {
  const pricingOptions = [
    {
      title: "No, I'll never sell",
      features: [
        "No features",
        "I'm open to learning how value-multiplying CEOs think and become exit-ready, even if I never sell.",
        "Please don't contact me again.",
      ],
      quote: '"Exit readiness is equal to Value Readiness"',
    },
    {
      title: "No, not now",
      features: [
        "No features",
        "Reach out to me again in 60 days",
        "Please don't contact me again.",
      ],
      quote: '"Would your future self wish you had started today?"',
    },
    {
      title: "Yes, I'll start slowly",
      price: "$ 2,999",
      features: [
        "50 bids per month",
        "50 skills",
        "Custom cover photo",
        "Unlimited revisions",
        "Unlock rewards",
      ],
      quote: '"Would your future self wish you had started today?"',
      showUpgradeButton: true,
    },
    {
      title: "Yes, I'm all in",
      price: "$ 4,999",
      features: [
        "50 bids per month",
        "50 skills",
        "Custom cover photo",
        "Unlimited revisions",
        "Unlock rewards",
      ],
      quote: '"Would your future self wish you had started today?"',
      showUpgradeButton: true,
    },
  ];

  return (
    <section className="flex justify-center gap-6 mt-[60px] max-md:flex-wrap max-sm:flex-col">
      {pricingOptions.map((option, index) => (
        <PricingCard key={index} {...option} />
      ))}
    </section>
  );
};

// Main Index Component
export default function JoinPage() {
  return (
    <>
      <main className="relative px-20 py-10">
        <Hero />
        <PricingSection />
        <SideBar logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc" />
      </main>
    </>
  );
}
