import React from "react";

interface RiskManagementProps {
  recommendations?: {
    stopLoss: number;
    takeProfit: number;
  };
}

const RiskManagement: React.FC<RiskManagementProps> = ({ recommendations }) => {
  if (!recommendations) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-[#A6AAB2]">No risk management data available</div>
      </div>
    );
  }

  const { stopLoss, takeProfit } = recommendations;

  const riskRewardRatio = ((takeProfit - stopLoss) / stopLoss).toFixed(2);

  const isGoodRatio = parseFloat(riskRewardRatio) >= 2;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[#A6AAB2]">Suggested Stop Loss</div>
          <div className="text-red-400 font-medium">
            ${stopLoss.toFixed(stopLoss < 0.01 ? 8 : 2)}
          </div>
        </div>
        <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
          <div
            className="h-full bg-red-400 rounded-full"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[#A6AAB2]">Suggested Take Profit</div>
          <div className="text-green-400 font-medium">
            ${takeProfit.toFixed(takeProfit < 0.01 ? 8 : 2)}
          </div>
        </div>
        <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-[#121212] rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-[#A6AAB2]">Risk-Reward Ratio</div>
          <div
            className={isGoodRatio ? "text-green-400" : "text-yellow-400"}
            style={{ fontWeight: "500" }}
          >
            1:{riskRewardRatio}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white font-medium mb-2">Risk Assessment</h3>
        <div className="flex space-x-2 mb-4">
          {["Low", "Medium", "High"].map((level) => (
            <div
              key={level}
              className={`flex-1 py-2 text-center rounded-md ${
                level === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "bg-[#121212] text-[#A6AAB2]"
              }`}
            >
              {level}
            </div>
          ))}
        </div>

        <p className="text-[#A6AAB2] text-sm">
          This asset currently has a{" "}
          <span className="text-yellow-400">medium risk</span> profile. Consider
          using the suggested stop loss and take profit levels to manage your
          risk.
        </p>
      </div>

      <div className="mt-6 p-4 bg-[#121212] rounded-md">
        <h3 className="text-white font-medium mb-2">AI Recommendations</h3>
        <ul className="text-[#A6AAB2] text-sm space-y-2">
          <li>
            • Set stop loss at ${stopLoss.toFixed(stopLoss < 0.01 ? 8 : 2)} to
            limit potential losses
          </li>
          <li>
            • Consider taking profits at $
            {takeProfit.toFixed(takeProfit < 0.01 ? 8 : 2)}
          </li>
          <li>• Don't invest more than 5% of your portfolio in this asset</li>
          <li>• Consider dollar-cost averaging for entry</li>
        </ul>
      </div>
    </div>
  );
};

export default RiskManagement;
