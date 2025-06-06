/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { createChart, IChartApi, UTCTimestamp } from "lightweight-charts";

interface PriceChartProps {
  pair: {
    from: string;
    to: string;
  };
}

interface CandleData {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Mock Data Generator
const generateMockPriceData = (
  token: string,
  timeframe: string
): CandleData[] => {
  // Base prices for different tokens
  const basePrices = {
    SOL: 150,
    BTC: 65000,
    ETH: 3200,
    BONK: 0.00000068,
  };

  const basePrice = basePrices[token as keyof typeof basePrices] || 100;
  const now = new Date();
  const candles: CandleData[] = [];
  let numCandles = 50;
  let intervalMinutes = 60;

  switch (timeframe) {
    case "1h":
      numCandles = 24;
      intervalMinutes = 5;
      break;
    case "1d":
      numCandles = 24;
      intervalMinutes = 60;
      break;
    case "1w":
      numCandles = 7;
      intervalMinutes = 24 * 60;
      break;
    case "1m":
      numCandles = 30;
      intervalMinutes = 24 * 60;
      break;
  }

  let lastPrice = basePrice;
  let trend = 0.5; 
  const startDate = new Date(now);
  startDate.setMinutes(startDate.getMinutes() - numCandles * intervalMinutes);

  for (let i = 0; i < numCandles; i++) {
    const time = i as UTCTimestamp;
    trend = trend * 0.95 + Math.random() * 0.1;
    const movement = (Math.random() - 0.5 + trend) * 0.02;
    const open = lastPrice;
    const close = open * (1 + movement);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);

    candles.push({
      time,
      open,
      high,
      low,
      close,
    });

    lastPrice = close;
  }

  return candles;
};

const PriceChart: React.FC<PriceChartProps> = ({ pair }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [timeframe, setTimeframe] = useState<"1h" | "1d" | "1w" | "1m">("1d");
  const [priceData, setPriceData] = useState<CandleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  const tokenIdMap: Record<string, string> = {
    SOL: "solana",
    BTC: "bitcoin",
    ETH: "ethereum",
    BONK: "bonk",
    USDC: "usd-coin",
  };

  const toggleMockData = () => {
    setUseMockData((prev) => !prev);
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    const fetchPriceData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (useMockData) {
          const mockCandles = generateMockPriceData(pair.from, timeframe);
          setPriceData(mockCandles);
          setCurrentPrice(mockCandles[mockCandles.length - 1].close);
        } else {
          const fromId = tokenIdMap[pair.from];
          if (!fromId) {
            throw new Error(`Unsupported token: ${pair.from}`);
          }

          let days = 1;
          switch (timeframe) {
            case "1h":
              days = 1;
              break;
            case "1d":
              days = 7;
              break;
            case "1w":
              days = 30;
              break;
            case "1m":
              days = 90;
              break;
          }

          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${fromId}/market_chart?vs_currency=usd&days=${days}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch price data");
          }

          const data = await response.json();

          const prices = data.prices;
          if (!prices || !prices.length) {
            throw new Error("No price data available");
          }
          setCurrentPrice(prices[prices.length - 1][1]);
          const candles: CandleData[] = [];
          const interval = Math.floor(prices.length / 50); 

          for (let i = 0; i < prices.length; i += interval) {
            const chunk = prices.slice(i, i + interval);
            if (chunk.length > 0) {
              const openTime = chunk[0][0];
              const open = chunk[0][1];
              const close = chunk[chunk.length - 1][1];
              const priceValues = chunk.map((p: any) => p[1]);
              const high = Math.max(...priceValues);
              const low = Math.min(...priceValues);

              candles.push({
                time: (openTime / 1000) as UTCTimestamp,
                open,
                high,
                low,
                close,
              });
            }
          }

          setPriceData(candles);
        }
      } catch (err) {
        console.error("Error with price data:", err);
        setError("Failed to load price data. Try switching to Demo Mode.");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [pair.from, pair.to, timeframe, useMockData, tokenIdMap]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#1E1E1E" },
        textColor: "#A6AAB2",
      },
      grid: {
        vertLines: { color: "#232323" },
        horzLines: { color: "#232323" },
      },
      timeScale: {
        borderColor: "#333333",
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Set data
    if (priceData.length > 0) {
      candlestickSeries.setData(priceData);
      chart.timeScale().fitContent();
    }

    chartRef.current = chart;

    // Handle resize
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [pair.from, pair.to, timeframe, priceData]);

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[24px] font-bold text-white">
          {pair.from}/{pair.to} Chart
        </h2>

        <div className="flex gap-2">
          {/* Add Mock Data Toggle */}
          <button
            type="button"
            onClick={toggleMockData}
            className={`px-3 py-1 rounded-md text-sm ${
              useMockData
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {useMockData ? "Demo Data: ON" : "Demo Data: OFF"}
          </button>

          {currentPrice && (
            <div className="text-white text-xl font-medium">
              ${currentPrice.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      <div className="flex mb-4 space-x-2">
        {(["1h", "1d", "1w", "1m"] as const).map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1 rounded-md ${
              timeframe === tf
                ? "bg-blue-600 text-white"
                : "bg-[#121212] text-[#A6AAB2]"
            }`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      {loading && priceData.length === 0 ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[400px] text-red-400">
          {error}
        </div>
      ) : (
        <div ref={chartContainerRef} className="h-[400px]" />
      )}
    </div>
  );
};

export default PriceChart;
