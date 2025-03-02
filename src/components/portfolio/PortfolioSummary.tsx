import React from "react";

interface PortfolioSummaryProps {
  balance: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ balance }) => {
  // Mock data for portfolio value
  const portfolioValue = 2580.75;
  const portfolioChange = 12.5;
  const isPositive = portfolioChange >= 0;

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-[#A6AAB2] mb-2">Portfolio Value</h3>
          <p className="text-[32px] font-bold text-white">
            ${portfolioValue.toFixed(2)}
          </p>
          <p
            className={`text-sm ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {portfolioChange}% (24h)
          </p>
        </div>

        <div>
          <h3 className="text-[#A6AAB2] mb-2">SOL Balance</h3>
          <p className="text-[32px] font-bold text-white">
            {balance.toFixed(2)} SOL
          </p>
          <p className="text-sm text-[#A6AAB2]">
            ${(balance * 150.25).toFixed(2)} USD
          </p>
        </div>

        <div>
          <h3 className="text-[#A6AAB2] mb-2">Assets Distribution</h3>
          <div className="h-16 bg-[#121212] rounded-lg flex overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: "45%" }}></div>
            <div
              className="bg-purple-500 h-full"
              style={{ width: "30%" }}
            ></div>
            <div className="bg-green-500 h-full" style={{ width: "15%" }}></div>
            <div
              className="bg-yellow-500 h-full"
              style={{ width: "10%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-blue-400">SOL 45%</span>
            <span className="text-purple-400">USDC 30%</span>
            <span className="text-green-400">RAY 15%</span>
            <span className="text-yellow-400">Other 10%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
