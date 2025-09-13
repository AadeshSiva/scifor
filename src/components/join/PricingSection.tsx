import PricingCard from "./PriceCard";

const PricingSection = ({ onModalOpen }) => {
  const pricingOptions = [
    {
      title: "No, I'll never sell",
      features: [
        "I'm open to learning how value-multiplying CEOs think and become exit-ready, even if I never sell.",
        "Please don't contact me again.",
      ],
      quote: '"Exit readiness is equal to Value Readiness"',
      modalType: 'valueMultiplying'
    },
    {
      title: "No, not now",
      features: [
        "Reach out to me again in 60 days",
        "Please don't contact me again.",
      ],
      quote: '"Would your future self wish you had started today?"',
      modalType: 'pause'
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
      modalType: 'upgrade'
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
      modalType: 'upgrade'
    },
  ];
  const handleFeatureClick = (cardIndex, featureIndex, feature) => {
    const option = pricingOptions[cardIndex];
    if (cardIndex === 0) {
      if (featureIndex === 0)
        onModalOpen('valueMultiplying');
    } else if (featureIndex === 1)
      onModalOpen('respectChoice');
    if (cardIndex === 1) {
      if (featureIndex === 0)
        onModalOpen('pause');
    } else if (featureIndex === 1)
      onModalOpen('respectChoice')
  }
  return (
    <section className="flex justify-center gap-6 mt-[60px] max-md:flex-wrap max-sm:flex-col">
      {pricingOptions.map((option, index) => (
        <PricingCard
          key={index}
          index={index}
          {...option}
          onCardClick={() => onModalOpen(option.modalType)}
          onFeatureClick={(featureIndex, feature) => handleFeatureClick(index, featureIndex, feature)}
        />
      ))}
    </section>
  );
};
export default PricingSection