import React, { useEffect, useState } from "react";
interface Plan {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}
const plans: Plan[] = [
  {
    title: "Become a PRSPERA Guest",
    price: "Free",
    features: [
      "SAMPLE each of the 12 services",
      "Enjoy FREE Tools and Gifts",
      "Chance to WIN our monthly lotteries of each of our offerings",
      "Be FIRST in line for exclusive platform updates and offers",
    ],
    highlight: false,
  },
  {
    title: "Become a PRSPERA Member",
    price: "$797",
    features: [
      "Grow Smarter to Exit Richer Immediately",
      "Get TIME on your side and STOP value destruction in your business NOW",
      "Start RECOVERING hard earned value in your business",
      "Find Out How Valuable You Truly Are — Then Pivot the Business, Strategize Value, and Structure For Tax Efficiency Before Time (and Value) Run Out.",
    ],
    highlight: true,
  },
];
const PricingPlan: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fetchUserDetails = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://api.prspera.com/extract-user-data/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user_data);
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserDetails(token);
    }
  }, []);
  const handlePaidClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/auth?plan=member&view=register";
    } else if (user?.paid) {
      window.location.href = "/dashboard";
    } else {
      alert(
        "You are already registered as a Guest, proceeding to upgrade your plan.",
      );
      window.location.href = "/payment";
    }
  };
  const handleFreeClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/auth?plan=guest&view=register";
    } else {
      window.location.href = "/dashboard";
    }
  };
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold text-gray-800 mb-12">
          Pricing Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 shadow-md flex flex-col justify-between ${
                plan.highlight
                  ? "bg-white text-gray-800"
                  : "bg-black text-white"
              }`}
            >
              <div>
                <p className="text-2xl text-center">Become a</p>
                <div className="flex cursor-pointer pt-4 items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
                    alt="Prospera Logo"
                    className="w-[190px] h-[30px]"
                  />
                  <span
                    className={`text-lg font-medium whitespace-nowrap max-sm:hidden ${
                      plan.highlight ? "text-black" : "text-white"
                    }`}
                  >
                    Grow Smarter
                    <span className="font-bold">.Exit Richer™️</span>
                  </span>
                </div>
                <p className="text-3xl font-extrabold mb-6 text-center pt-4">
                  {plan.price}
                </p>
                <ul className="space-y-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex justify-center items-center">
                {plan.highlight ? (
                  <button
                    className="w-full py-3 rounded-lg font-semibold transition text-black border border-gray-300"
                    onClick={handlePaidClick}
                  >
                    <div className="flex cursor-pointer pt-4 items-center gap-2 bg-white">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
                        alt="Prospera Logo"
                        className="w-[190px] h-[30px]"
                      />
                      <span
                        className={`text-lg font-medium whitespace-nowrap max-sm:hidden text-black `}
                      >
                        Grow Smarter
                        <span className="font-bold">.Exit Richer™️</span>
                      </span>
                    </div>
                    Click to Learn More
                  </button>
                ) : (
                  <button
                    className="w-full py-3 rounded-lg font-semibold transition bg-white text-black shadow-lg"
                    onClick={handleFreeClick}
                  >
                    <div className="flex cursor-pointer pt-4 items-center gap-2 bg-white">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9229a48c4e1f3b70f2231b9effad024402047f5"
                        alt="Prospera Logo"
                        className="w-[190px] h-[30px]"
                      />
                      <span
                        className={`text-lg font-medium whitespace-nowrap max-sm:hidden text-black `}
                      >
                        Grow Smarter
                        <span className="font-bold">.Exit Richer™️</span>
                      </span>
                    </div>
                    Click to Learn More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PricingPlan;
