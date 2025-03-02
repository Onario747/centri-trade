import React from "react";
import { useWallet } from "../contexts/WalletContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import AssetsList from "../components/portfolio/AssetsList";
import TransactionHistory from "../components/portfolio/TransactionHistory";

const PortfolioPage: React.FC = () => {
  const { connected, balance } = useWallet();

  if (!connected) {
    return (
      <div className="pt-[7rem] max-container padding-x flex flex-col items-center justify-center">
        <h2 className="text-[30px] font-bold text-white mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-[#A6AAB2] text-center max-w-[600px] mb-8">
          Please connect your wallet to view your portfolio.
        </p>
        <WalletMultiButton className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white font-medium" />
      </div>
    );
  }

  return (
    <div className="pt-[7rem] max-container padding-x">
      <h1 className="text-[40px] font-bold text-white mb-6">Portfolio</h1>

      <div className="space-y-8">
        <PortfolioSummary balance={balance} />

        <AssetsList />

        <TransactionHistory />
      </div>
    </div>
  );
};

export default PortfolioPage;
