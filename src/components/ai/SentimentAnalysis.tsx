import React from "react";

interface SentimentAnalysisProps {
  sentiment?: {
    score: number;
    label: "positive" | "negative" | "neutral";
  };
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ sentiment }) => {
  if (!sentiment) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-[#A6AAB2]">No sentiment data available</div>
      </div>
    );
  }

  const { score, label } = sentiment;

  const getColor = () => {
    if (label === "positive") return "#45B26B";
    if (label === "negative") return "#EF466F";
    return "#FFB800";
  };

  const getEmoji = () => {
    if (label === "positive") return "😀";
    if (label === "negative") return "😞";
    return "😐";
  };

  const getDescription = () => {
    if (score > 0.7)
      return "Very positive sentiment indicates strong bullish signals.";
    if (score > 0.5)
      return "Positive sentiment suggests potential upward movement.";
    if (score > 0.4) return "Neutral sentiment with slight positive bias.";
    if (score > 0.3) return "Neutral sentiment with slight negative bias.";
    if (score > 0.2)
      return "Negative sentiment suggests potential downward pressure.";
    return "Very negative sentiment indicates strong bearish signals.";
  };

  const percentage = score * 100;

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="text-[72px]">{getEmoji()}</div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-[#A6AAB2]">Market Sentiment</div>
        <div className="text-white font-medium capitalize">{label}</div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-red-400">Bearish</span>
          <span className="text-yellow-400">Neutral</span>
          <span className="text-green-400">Bullish</span>
        </div>
        <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: getColor(),
            }}
          ></div>
        </div>
      </div>

      <div className="text-center text-[#A6AAB2] mt-6">
        <p>{getDescription()}</p>
      </div>

      <div className="mt-6 p-4 bg-[#121212] rounded-md">
        <h3 className="text-white font-medium mb-2">Sources of Analysis</h3>
        <ul className="text-[#A6AAB2] text-sm space-y-2">
          <li>
            • <span className="text-blue-400">AI Model:</span> FinBERT sentiment
            analysis
          </li>
          <li>• Social media sentiment analysis</li>
          <li>• Trading volume patterns</li>
          <li>• Market momentum indicators</li>
        </ul>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
