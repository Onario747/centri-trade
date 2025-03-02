import React, { useState } from "react";
import { Link } from "react-router-dom";

const AIPreviewSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const aiFeatures = [
    {
      title: "Price Prediction",
      description:
        "LSTM neural networks analyze historical data to forecast future price movements with high accuracy.",
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
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      bgColor: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/30",
      details: [
        "Analyzes 30+ technical indicators",
        "Considers market volatility patterns",
        "Provides 7-day price forecasts",
        "Updates predictions in real-time",
      ],
    },
    {
      title: "Sentiment Analysis",
      description:
        "BERT models process social media and news to gauge market sentiment in real-time, giving you an edge in trading.",
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      bgColor: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/30",
      details: [
        "Analyzes Twitter, Reddit, and news sources",
        "Identifies bullish/bearish market signals",
        "Detects emerging trends and narratives",
        "Quantifies sentiment with confidence scores",
      ],
    },
    {
      title: "Risk Management",
      description:
        "Reinforcement learning algorithms optimize stop-loss and take-profit levels based on market conditions.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      bgColor: "from-green-500/20 to-green-600/5",
      borderColor: "border-green-500/30",
      details: [
        "Dynamically adjusts risk parameters",
        "Recommends optimal position sizing",
        "Calculates ideal stop-loss levels",
        "Suggests take-profit targets based on volatility",
      ],
    },
  ];

  return (
    <section className="max-container padding-x py-24 relative">
      {/* Background Elements */}
      <div className="absolute top-[30%] left-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] z-0"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] z-0"></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="inline-block mb-4 px-4 py-1.5 bg-blue-500/10 rounded-full">
          <p className="text-blue-400 font-medium text-sm">
            Powered by Advanced AI
          </p>
        </div>

        <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-4 text-center">
          AI-Powered Trading Insights
        </h2>
        <p className="text-[#A6AAB2] text-center max-w-[800px] mb-16">
          Our platform leverages state-of-the-art AI models to provide
          predictive price analysis, sentiment tracking, and risk management
          recommendations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-[#1E1E1E] p-8 rounded-xl border ${
                activeFeature === index
                  ? feature.borderColor
                  : "border-[#333333]/50"
              } transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer transform hover:-translate-y-1`}
              onClick={() => setActiveFeature(index)}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-[24px] font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-[#A6AAB2] mb-6">{feature.description}</p>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="w-full bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] mb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-[24px] font-bold text-white mb-6">
                {aiFeatures[activeFeature].title} Details
              </h3>

              <ul className="space-y-4 mb-8">
                {aiFeatures[activeFeature].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-[#A6AAB2]">{detail}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/ai-insights"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
              >
                <span>Explore AI Insights</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Link>
            </div>

            <div className="flex-1">
              {activeFeature === 0 && (
                <div className="bg-[#121212] p-6 rounded-xl border border-[#333333]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[#A6AAB2]">
                      SOL Price Prediction (7d)
                    </div>
                    <div className="text-green-400 font-medium">+12.5%</div>
                  </div>
                  <div className="h-[200px] bg-[#0A0A0A] rounded-lg mb-4 overflow-hidden">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path
                        d="M0,100 C30,90 60,110 90,80 C120,50 150,70 180,60"
                        fill="none"
                        stroke="#3772FF"
                        strokeWidth="2"
                      />
                      <path
                        d="M180,60 C210,50 240,40 270,30 C300,20 330,25 360,15"
                        fill="none"
                        stroke="#45B26B"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <path
                        d="M180,80 C210,70 240,60 270,50 C300,40 330,45 360,35"
                        fill="none"
                        stroke="#45B26B"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                        strokeDasharray="3,3"
                      />
                      <path
                        d="M180,40 C210,30 240,20 270,10 C300,0 330,5 360,0"
                        fill="none"
                        stroke="#45B26B"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                        strokeDasharray="3,3"
                      />
                      <path
                        d="M180,60 C210,50 240,40 270,30 C300,20 330,25 360,15 L360,150 L180,150 Z"
                        fill="url(#green-gradient)"
                        fillOpacity="0.1"
                      />
                      <defs>
                        <linearGradient
                          id="green-gradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#45B26B" />
                          <stop
                            offset="100%"
                            stopColor="#45B26B"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="flex justify-between text-xs text-[#A6AAB2]">
                    <span>Current: $150.25</span>
                    <span>Predicted: $172.50</span>
                  </div>

                  <div className="mt-4 p-3 bg-blue-900/20 rounded-lg">
                    <p className="text-blue-400 text-sm">AI Confidence: 85%</p>
                    <p className="text-[#A6AAB2] text-xs mt-1">
                      Based on 30-day historical data analysis
                    </p>
                  </div>
                </div>
              )}

              {activeFeature === 1 && (
                <div className="bg-[#121212] p-6 rounded-xl border border-[#333333]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[#A6AAB2]">
                      Market Sentiment Analysis
                    </div>
                    <div className="text-green-400 font-medium">Bullish</div>
                  </div>
                  <div className="flex justify-center my-6">
                    <div className="text-[72px]">😀</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-red-400">Bearish</span>
                      <span className="text-yellow-400">Neutral</span>
                      <span className="text-green-400">Bullish</span>
                    </div>
                    <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-green-400"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-purple-900/20 rounded-lg">
                    <p className="text-purple-400 text-sm">
                      Sentiment Score: 0.75
                    </p>
                    <p className="text-[#A6AAB2] text-xs mt-1">
                      Based on 5,000+ social media posts and news articles
                    </p>
                  </div>
                </div>
              )}

              {activeFeature === 2 && (
                <div className="bg-[#121212] p-6 rounded-xl border border-[#333333]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[#A6AAB2]">Risk Management</div>
                    <div className="text-blue-400 font-medium">
                      Recommendations
                    </div>
                  </div>
                  <div className="relative h-[200px] bg-[#0A0A0A] rounded-lg mb-4 overflow-hidden">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path
                        d="M0,100 C50,120 100,80 150,90 C200,100 250,70 300,60 C350,50 400,70 400,40"
                        fill="none"
                        stroke="#3772FF"
                        strokeWidth="2"
                      />
                      <line
                        x1="0"
                        y1="140"
                        x2="400"
                        y2="140"
                        stroke="#EF466F"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                      />
                      <line
                        x1="0"
                        y1="30"
                        x2="400"
                        y2="30"
                        stroke="#45B26B"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                      />
                      <circle cx="400" cy="40" r="5" fill="#3772FF" />
                      <text x="10" y="35" fill="#45B26B" fontSize="12">
                        Take Profit ($172.50)
                      </text>
                      <text x="10" y="155" fill="#EF466F" fontSize="12">
                        Stop Loss ($135.20)
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-red-900/20 rounded-lg">
                      <p className="text-red-400 text-sm font-medium">
                        Stop Loss
                      </p>
                      <p className="text-white text-lg">$135.20</p>
                      <p className="text-[#A6AAB2] text-xs">
                        -10% from current
                      </p>
                    </div>
                    <div className="p-3 bg-green-900/20 rounded-lg">
                      <p className="text-green-400 text-sm font-medium">
                        Take Profit
                      </p>
                      <p className="text-white text-lg">$172.50</p>
                      <p className="text-[#A6AAB2] text-xs">
                        +15% from current
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-400 text-sm">
                      Risk/Reward Ratio: 1:1.5
                    </p>
                    <p className="text-[#A6AAB2] text-xs mt-1">
                      Optimized based on current market volatility
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-4xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-blue-500/20">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>

            <p className="text-white text-lg italic mb-6">
              "The AI insights have completely transformed my trading strategy.
              The price predictions and sentiment analysis have helped me make
              more informed decisions, resulting in a 30% increase in my
              portfolio value."
            </p>

            <div>
              <p className="text-white font-medium">Alex Thompson</p>
              <p className="text-[#A6AAB2] text-sm">Professional Trader</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPreviewSection;
