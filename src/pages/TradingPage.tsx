import React, { useState, useCallback, useEffect } from "react";
// import PriceChart from "../components/trading/PriceChart";
import OrderForm from "../components/trading/OrderForm";
// import OrderHistory from "../components/trading/OrderHistory";
import { useWallet } from "../contexts/WalletContext";
import OrderHistory from "../components/trading/OrderHistory";
import PriceChart from "../components/trading/PriceChart";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const TradingPage: React.FC = () => {
  const { connected, balance } = useWallet();
  const [selectedPair, setSelectedPair] = useState({ from: "SOL", to: "USDC" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (connected) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedPair, connected]);

  const handlePairChange = useCallback(
    (newPair: { from: string; to: string }) => {
      setSelectedPair(newPair);
    },
    []
  );

  if (!connected) {
    return (
      <div className="pt-[7rem] max-container padding-x flex flex-col items-center justify-center">
        <h2 className="text-[30px] font-bold text-white mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-[#A6AAB2] text-center max-w-[600px] mb-8">
          Please connect your wallet to access the trading features.
        </p>
        <WalletMultiButton className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white font-medium" />
      </div>
    );
  }

  return (
    <div className="pt-[7rem] max-container padding-x">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[40px] font-bold text-white">Trading</h1>
        <div className="text-white">
          <span className="text-[#A6AAB2] mr-2">Balance:</span>
          {balance.toFixed(4)} SOL
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PriceChart pair={selectedPair} />
            </div>
            <div>
              <OrderForm pair={selectedPair} onPairChange={handlePairChange} />
            </div>
          </div>
          <div className="mt-8">
            <OrderHistory />
          </div>
        </>
      )}
    </div>
  );
};

export default TradingPage;
