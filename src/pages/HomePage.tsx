import React from "react";
import Hero from "../components/hero";
// import FeaturesSection from "../components/FeaturesSection";
import AIPreviewSection from "../components/AIPreviewSection";
import FeaturesSection from "../components/FeaturesSection";
import { Link } from "react-router-dom";
import { useWallet } from "../contexts/WalletContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const HomePage: React.FC = () => {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturesSection />
      <AIPreviewSection />
      <section className="max-container padding-x py-16">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-10 rounded-2xl border border-blue-500/20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[32px] font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-[#A6AAB2] max-w-[600px] mb-8">
              Connect your wallet and experience the power of AI-enhanced
              trading on Solana.
            </p>

            {connected ? (
              <div className="flex gap-4">
                <Link
                  to="/trading"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-full text-white font-medium"
                >
                  Start Trading
                </Link>
                <Link
                  to="/ai-insights"
                  className="bg-transparent border border-blue-500 px-8 py-3 rounded-full text-white font-medium"
                >
                  View AI Insights
                </Link>
              </div>
            ) : (
              <WalletMultiButton className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-full text-white font-medium" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
