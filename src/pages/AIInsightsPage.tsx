import React, { useEffect, useState } from "react";
import { useAI } from "../contexts/AIContext";
import PredictionChart from "../components/ai/PredictionChart";
import SentimentAnalysis from "../components/ai/SentimentAnalysis";
import RiskManagement from "../components/ai/RiskManagement";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "../contexts/WalletContext";

const AIInsightsPage: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState("SOL");
  const {
    insights,
    loading,
    error,
    fetchPricePrediction,
    fetchSentimentAnalysis,
    fetchRiskRecommendations,
  } = useAI();
  const { connected } = useWallet();
  const [aiModelStatus, setAiModelStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    if (connected && selectedToken) {
      // Fetch all AI insights when token changes
      const fetchAllInsights = async () => {
        setAiModelStatus("loading");
        try {
          await Promise.all([
            fetchPricePrediction(selectedToken),
            fetchSentimentAnalysis(selectedToken),
            fetchRiskRecommendations(selectedToken),
          ]);
          setAiModelStatus("success");
        } catch (err) {
          console.error("Error fetching AI insights:", err);
          setAiModelStatus("error");
        }
      };

      fetchAllInsights();
    }
  }, [
    connected,
    selectedToken,
    fetchPricePrediction,
    fetchSentimentAnalysis,
    fetchRiskRecommendations,
  ]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToken(e.target.value);
  };

  const handleRefresh = async () => {
    if (connected && selectedToken) {
      try {
        await Promise.all([
          fetchPricePrediction(selectedToken),
          fetchSentimentAnalysis(selectedToken),
          fetchRiskRecommendations(selectedToken),
        ]);
      } catch (err) {
        console.error("Error refreshing AI insights:", err);
      }
    }
  };

  if (!connected) {
    return (
      <div className="pt-[7rem] max-container padding-x flex flex-col items-center justify-center">
        <h2 className="text-[30px] font-bold text-white mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-[#A6AAB2] text-center max-w-[600px] mb-8">
          Please connect your wallet to access AI insights.
        </p>
        <WalletMultiButton className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white font-medium" />
      </div>
    );
  }

  return (
    <div className="pt-[7rem] max-container padding-x">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[40px] font-bold text-white">AI Insights</h1>
        <div className="flex items-center gap-4">
          <label htmlFor="token-select" className="text-[#A6AAB2] mr-2">
            Select Token:
          </label>
          <select
            id="token-select"
            value={selectedToken}
            onChange={handleTokenChange}
            className="bg-[#1E1E1E] text-white p-2 rounded-md"
          >
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BONK">BONK</option>
          </select>
          <button
            onClick={handleRefresh}
            className="bg-[#1E1E1E] text-white p-2 rounded-md flex items-center"
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {aiModelStatus === "success" && (
        <div className="bg-green-900/30 text-green-400 p-2 rounded-md mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          AI Model connected and working
        </div>
      )}

      {aiModelStatus === "error" && (
        <div className="bg-red-900/30 text-red-400 p-2 rounded-md mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          AI Model connection error
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#1E1E1E] p-6 rounded-xl">
            <h2 className="text-[24px] font-bold text-white mb-4">
              Price Prediction
            </h2>
            <PredictionChart
              token={selectedToken}
              predictedPrice={insights?.predictedPrice}
            />
          </div>

          <div className="bg-[#1E1E1E] p-6 rounded-xl">
            <h2 className="text-[24px] font-bold text-white mb-4">
              Sentiment Analysis
            </h2>
            <SentimentAnalysis sentiment={insights?.sentiment} />
          </div>

          <div className="bg-[#1E1E1E] p-6 rounded-xl">
            <h2 className="text-[24px] font-bold text-white mb-4">
              Risk Management
            </h2>
            <RiskManagement recommendations={insights?.riskRecommendations} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPage;
