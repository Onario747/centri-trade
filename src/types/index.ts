// Common types used across the application

export interface TokenInfo {
  symbol: string;
  name: string;
  logoURI: string;
  address: string;
  decimals: number;
}

export interface OrderType {
  type: "market" | "limit" | "stop" | "take_profit";
  price?: number;
  amount: number;
  tokenIn: string;
  tokenOut: string;
  timestamp: number;
  status: "pending" | "completed" | "cancelled";
}

export interface AIInsight {
  predictedPrice?: number;
  sentiment?: {
    score: number;
    label: "positive" | "negative" | "neutral";
  };
  riskRecommendations?: {
    stopLoss: number;
    takeProfit: number;
  };
}
