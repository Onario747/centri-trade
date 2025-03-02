import React, { useEffect, useRef } from "react";
import { createChart, IChartApi } from "lightweight-charts";

interface PredictionChartProps {
  token: string;
  predictedPrice?: number;
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  token,
  predictedPrice,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Mock historical data
  const getHistoricalData = (token: string) => {
    const basePrice =
      {
        SOL: 150,
        BTC: 65000,
        ETH: 3200,
        BONK: 0.00000068,
      }[token] || 100;

    // Generate 30 days of historical data with some randomness
    const now = new Date();
    const data = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);

      // Add some randomness to create a realistic price chart
      const randomFactor = 0.98 + Math.random() * 0.04; // Random between 0.98 and 1.02
      const price = basePrice * randomFactor * (1 + (30 - i) * 0.005); // Slight uptrend

      data.push({
        time: (date.getTime() / 1000) as number,
        value: price,
      });
    }
    return data;
  };

  // Generate future prediction data
  const getPredictionData = (token: string, predictedPrice?: number) => {
    if (!predictedPrice) return [];

    const now = new Date();
    const data = [];

    // Start from today
    data.push({
      time: (now.getTime() / 1000) as number,
      value:
        {
          SOL: 150,
          BTC: 65000,
          ETH: 3200,
          BONK: 0.00000068,
        }[token] || 100,
    });

    // Add 7 days of prediction
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);

      // Linear interpolation towards predicted price
      const currentPrice: number = data[0].value;
      const progress = i / 7;
      const interpolatedPrice: number =
        currentPrice + (predictedPrice - currentPrice) * progress;

      data.push({
        time: (date.getTime() / 1000) as number,
        value: interpolatedPrice,
      });
    }

    return data;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clear previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
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

    // Add historical line series
    const historicalSeries = chart.addLineSeries({
      color: "#3772FF",
      lineWidth: 2,
    });

    // Add prediction line series
    const predictionSeries = chart.addLineSeries({
      color: "#45B26B",
      lineWidth: 2,
      lineStyle: 1, // Dashed
    });

    // Set data
    const historicalData = getHistoricalData(token);
    const predictionData = getPredictionData(token, predictedPrice);

    historicalSeries.setData(
      historicalData.map((item) => ({
        time: item.time.toString() as any,
        value: item.value,
      }))
    );
    predictionSeries.setData(
      predictionData.map((item) => ({
        time: item.time.toString() as any,
        value: item.value,
      }))
    );

    // Fit content
    chart.timeScale().fitContent();

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
  }, [token, predictedPrice]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[#A6AAB2]">Current Price</div>
        <div className="text-white text-xl font-medium">
          $
          {token === "BONK"
            ? (0.00000068).toFixed(8)
            : {
                SOL: 150,
                BTC: 65000,
                ETH: 3200,
              }[token]?.toFixed(2) || "0.00"}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-[#A6AAB2]">Predicted Price (7d)</div>
        <div className="text-green-400 text-xl font-medium">
          ${predictedPrice?.toFixed(token === "BONK" ? 8 : 2) || "0.00"}
        </div>
      </div>

      <div ref={chartContainerRef} className="h-[300px]" />

      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#3772FF] rounded-full mr-2"></div>
          <span className="text-[#A6AAB2] text-sm">Historical</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#45B26B] rounded-full mr-2"></div>
          <span className="text-[#A6AAB2] text-sm">Prediction</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionChart;
