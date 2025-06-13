import { CheckboxItem } from "@radix-ui/react-context-menu";
import { CheckCircle2Icon } from "lucide-react";

const PricingCard = ({
    index,
    title,
    price,
    features,
    quote,
    showUpgradeButton = false,
    onCardClick,
    onFeatureClick
  }) => {
    return (
      <article className="w-[302px] rounded bg-white border-2 border-solid border-[rgba(158,158,158,0.5)] max-md:w-[45%] max-sm:w-full flex flex-col justify-between">
        
        {/* Header */}
        <header className="text-center text-white text-2xl shadow-[0_6px_7.1px_0_rgba(0,0,0,0.25)] bg-[#555] p-4 rounded-t font-medium">
          {title}
        </header>
  
        {/* No features */}
        {index <= 1 && (
          <div className="h-[300px] flex justify-center items-center w-full font-semibold gap-2 text-black">
            <CheckCircle2Icon fill="black" size={20} className="text-white" />
            <span>No features</span>
          </div>
        )}
  
        {/* Price and Upgrade Button */}
        {showUpgradeButton && (
          <div className="text-center px-5 pt-8 pb-6">
            <div className="text-black text-4xl font-semibold">{price}</div>
            <div className="text-[#626262] text-base italic mt-2">
              One Time Payment
            </div>
            <button
              onClick={onCardClick}
              className="w-full rounded text-white text-base cursor-pointer bg-black mt-5 p-4 border-none"
            >
              Upgrade Now
            </button>
          </div>
        )}
  
        {/* Features List */}
        <div className="px-5 pb-5">
            {features.map((feature, i) =>
                index === 2 || index === 3 ? (
                <div
                    key={i}
                    className="flex items-center gap-3 text-[#626262] text-xl mb-4 mt-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                    <CheckCircle2Icon size={20} fill="black" className="text-white" />
                    <span>{feature}</span>
                </div>
                ) : (
                <CheckboxItem
                    key={i}
                    checked={false}
                    text={feature}
                    onClick={() => onFeatureClick?.(i, feature)} // Pass the correct index 'i'
                />
                )
            )}
            </div>
  
        {/* Footer */}
        <footer className="text-black text-xl font-medium leading-7 p-5 pt-0 mt-auto">
          {quote}
        </footer>
      </article>
    );
  }; 

  export default PricingCard