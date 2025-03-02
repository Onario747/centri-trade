import { createChart, IChartApi } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

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
  const getHistoricalData = (token: string) => {
    const basePrice =
      {
        SOL: 150,
        BTC: 65000,
        ETH: 3200,
        BONK: 0.00000068,
      }[token] || 100;
    const now = new Date();
    const data = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(i % 24);

      const randomFactor = 0.98 + Math.random() * 0.04;
      const price = basePrice * randomFactor * (1 + (30 - i) * 0.005);

      data.push({
        time: date.getTime(),
        value: price,
      });
    }
    return data;
  };
  const getPredictionData = (token: string, predictedPrice?: number) => {
    if (!predictedPrice) return [];

    const now = new Date();
    const data = [];
    const currentPrice =
      {
        SOL: 150,
        BTC: 65000,
        ETH: 3200,
        BONK: 0.00000068,
      }[token] || 100;
    for (let i = 0; i <= 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      date.setHours(i * 3);
      const progress = i / 7;
      const interpolatedPrice =
        currentPrice + (predictedPrice - currentPrice) * progress;

      data.push({
        time: date.getTime(),
        value: interpolatedPrice,
      });
    }

    return data;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

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

    const historicalSeries = chart.addAreaSeries({
      topColor: "rgba(55, 114, 255, 0.56)",
      bottomColor: "rgba(55, 114, 255, 0.04)",
      lineColor: "#3772FF",
      lineWidth: 2,
    });

    const predictionSeries = chart.addAreaSeries({
      topColor: "rgba(69, 178, 107, 0.56)",
      bottomColor: "rgba(69, 178, 107, 0.04)",
      lineColor: "#45B26B",
      lineWidth: 2,
      lineStyle: 1,
    });
    const historicalData = getHistoricalData(token);
    const predictionData = getPredictionData(token, predictedPrice);

    historicalSeries.setData(
      historicalData.map((item, index) => ({
        time: index as any,
        value: item.value,
      }))
    );
    predictionSeries.setData(
      predictionData.map((item, index) => ({
        time: (historicalData.length + index) as any,
        value: item.value,
      }))
    );

    // Fit content
    chart.timeScale().fitContent();

    chartRef.current = chart;

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
