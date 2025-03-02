import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../../contexts/WalletContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Hero = () => {
  const { connected } = useWallet();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroElements = heroRef.current.querySelectorAll(".parallax");

        heroElements.forEach((element, index) => {
          const speed = 0.1 * (index + 1);
          const yPos = scrollY * speed;
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative pt-[7rem] pb-[4rem] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-purple-900/10"></div>
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px] parallax"></div>
        <div className="absolute top-[40%] right-[15%] w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[100px] parallax"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/assets/images/grid-pattern.svg')] bg-center opacity-10 z-0"></div>

      {/* Content */}
      <div className="max-container padding-x relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="flex-1 max-w-[600px]">
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI-Powered
              </span>{" "}
              Trading on Solana
            </h1>
            <p className="text-[#A6AAB2] text-lg mt-6 mb-8">
              Experience the future of trading with our advanced platform.
              Leverage AI insights, execute limit orders, and manage risk—all on
              Solana's lightning-fast blockchain.
            </p>

            <div className="flex flex-wrap gap-4">
              {connected ? (
                <Link
                  to="/trading"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
                >
                  Start Trading
                </Link>
              ) : (
                <WalletMultiButton className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20" />
              )}

              <Link
                to="/ai-insights"
                className="px-8 py-4 bg-transparent border border-blue-500 hover:bg-blue-500/10 rounded-full text-white font-medium transition-all duration-300"
              >
                Explore AI Insights
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12">
              <div>
                <p className="text-[32px] font-bold text-white">$2.5B+</p>
                <p className="text-[#A6AAB2]">Trading Volume</p>
              </div>
              <div>
                <p className="text-[32px] font-bold text-white">50K+</p>
                <p className="text-[#A6AAB2]">Active Users</p>
              </div>
              <div>
                <p className="text-[32px] font-bold text-white">99.9%</p>
                <p className="text-[#A6AAB2]">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right Content - Trading Interface Preview */}
          <div className="flex-1 w-full max-w-[600px]">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-[#1E1E1E] p-6 rounded-2xl border border-[#333333] shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-bold">SOL/USDC</h3>
                  <span className="text-green-400 font-medium">
                    $150.25 (+5.2%)
                  </span>
                </div>

                {/* Mock Chart */}
                <div className="h-[200px] bg-[#121212] rounded-lg mb-6 overflow-hidden">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <path
                      d="M0,150 C50,120 100,180 150,100 C200,20 250,80 300,50 C350,20 400,70 400,100"
                      fill="none"
                      stroke="#3772FF"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,150 C50,120 100,180 150,100 C200,20 250,80 300,50 C350,20 400,70 400,100 L400,200 L0,200 Z"
                      fill="url(#gradient)"
                      fillOpacity="0.2"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3772FF" />
                        <stop
                          offset="100%"
                          stopColor="#3772FF"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Mock Trading Interface */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="bg-[#121212] p-3 rounded-lg">
                      <div className="flex justify-between text-[#A6AAB2] text-sm mb-1">
                        <span>Amount (SOL)</span>
                        <span>Balance: 10.5 SOL</span>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value="2.5"
                          readOnly
                          className="bg-transparent text-white w-full focus:outline-none"
                        />
                        <span className="text-white">SOL</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors">
                    Buy
                  </button>
                  <button className="bg-[#333333] hover:bg-[#444444] text-white py-3 rounded-lg font-medium transition-colors">
                    Sell
                  </button>
                </div>

                {/* AI Recommendation */}
                <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/20 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-blue-400 font-medium">
                      AI Recommendation
                    </p>
                    <p className="text-white">
                      Strong buy signal with 85% confidence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-20 text-center">
          <p className="text-[#A6AAB2] mb-6">Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <img
              src="https://th.bing.com/th/id/OIP.x9mqYWXUlI22C3iHDwFKaQHaEK?rs=1&pid=ImgDetMain"
              alt="Solana"
              className="h-8"
            />
            <img
              src="https://www.tbstat.com/wp/uploads/2024/01/jupiter-dex-aggregator-1200x675.jpeg"
              alt="Jupiter"
              className="h-8"
            />
            <img
              src="https://th.bing.com/th/id/OIP.cKDVrvr_96wMEIaix3mmBwHaD4?rs=1&pid=ImgDetMain"
              alt="Phantom"
              className="h-8"
            />
            <img
              src="https://avatars.githubusercontent.com/u/89903469?s=280&v=4"
              alt="Solflare"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
