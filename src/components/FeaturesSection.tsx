import React from "react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Limit Orders",
      description:
        "Set your desired price and let the order execute automatically when conditions are met.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: "Stop Loss",
      description:
        "Protect your investments by automatically selling when prices drop below your threshold.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      ),
    },
    {
      title: "Take Profit",
      description:
        "Lock in gains by automatically selling when your target price is reached.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Order History",
      description:
        "Track all your transactions with detailed history and performance analytics.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-container padding-x py-20 relative">
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] z-0"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-purple-500/5 blur-[100px] z-0"></div>

      <div className="flex flex-col items-center relative z-10">
        <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-4">
          Core Trading Features
        </h2>
        <p className="text-[#A6AAB2] text-center max-w-[800px] mb-16">
          Our platform offers advanced trading capabilities powered by Jupiter's
          Swap API on Solana, giving you the tools you need for successful
          trading.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] p-6 rounded-xl border border-[#333333]/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:translate-y-[-5px]"
            >
              <div className="w-12 h-12 rounded-lg bg-[#121212] flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-[20px] font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#A6AAB2]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
