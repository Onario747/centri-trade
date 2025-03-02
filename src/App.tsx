import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
// import HomePage from "./pages/HomePage";
// import TradingPage from "./pages/TradingPage";
// import AIInsightsPage from "./pages/AIInsightsPage";
import PortfolioPage from "./pages/PortfolioPage";
import { WalletProvider } from "./contexts/WalletContext";
import { AIProvider } from "./contexts/AIContext";
import HomePage from "./pages/HomePage";
import TradingPage from "./pages/TradingPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import { JupiterProvider } from "@jup-ag/react-hook";
import { Connection } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");

function App() {
  return (
    <Router>
      <WalletProvider>
        <JupiterProvider connection={connection} userPublicKey={undefined}>
          <AIProvider>
            <main className="bg-black min-h-screen relative">
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trading" element={<TradingPage />} />
                <Route path="/ai-insights" element={<AIInsightsPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
              </Routes>
            </main>
          </AIProvider>
        </JupiterProvider>
      </WalletProvider>
    </Router>
  );
}

export default App;
