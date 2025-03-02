import { useJupiter } from "@jup-ag/react-hook";
import { PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useWallet } from "../../contexts/WalletContext";

// Updated RouteInfo interface with all required properties
interface RouteInfo {
  marketInfos: {
    amm: {
      label: string;
    };
  }[];
  inAmount: JSBI;
  outAmount: JSBI;
  otherAmountThreshold: JSBI;
  slippageBps: number;
  swapMode: number;
  priceImpactPct: number;
  amount: JSBI;
}

interface OrderFormProps {
  pair: {
    from: string;
    to: string;
  };
  onPairChange?: (pair: { from: string; to: string }) => void;
}

// Token mint addresses (mainnet)
const TOKEN_MINTS: Record<string, string> = {
  SOL: "So11111111111111111111111111111111111111112", // Native SOL
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  BTC: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E", // BTC (Wrapped)
  ETH: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk", // ETH (Wrapped)
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
};

// Token decimals
const TOKEN_DECIMALS: Record<string, number> = {
  SOL: 9,
  USDC: 6,
  BTC: 8,
  ETH: 8,
  BONK: 5,
};

// Add this mock data near your token constants
const MOCK_ROUTES = {
  "SOL/USDC": [
    {
      marketInfos: [{ amm: { label: "Orca" } }, { amm: { label: "Raydium" } }],
      inAmount: JSBI.BigInt(1000000000), // 1 SOL in lamports
      outAmount: JSBI.BigInt(30500000), // $30.50 USDC
      otherAmountThreshold: JSBI.BigInt(0),
      slippageBps: 50,
      swapMode: 1,
      priceImpactPct: 0.12,
      amount: JSBI.BigInt(1000000000), // Add this line - same as inAmount
    },
  ],
  "BTC/USDC": [
    {
      marketInfos: [
        { amm: { label: "Jupiter" } },
        { amm: { label: "Raydium" } },
      ],
      inAmount: JSBI.BigInt(100000000), // 1 BTC (8 decimals)
      outAmount: JSBI.BigInt(64500000000), // $64,500 USDC
      otherAmountThreshold: JSBI.BigInt(0),
      slippageBps: 50,
      swapMode: 1,
      priceImpactPct: 0.05,
      amount: JSBI.BigInt(100000000), // Add this line - same as inAmount
    },
  ],
  "ETH/USDC": [
    {
      marketInfos: [{ amm: { label: "Raydium" } }],
      inAmount: JSBI.BigInt(100000000), // 1 ETH (8 decimals)
      outAmount: JSBI.BigInt(3200000000), // $3,200 USDC
      otherAmountThreshold: JSBI.BigInt(0),
      slippageBps: 50,
      swapMode: 1,
      priceImpactPct: 0.08,
    },
  ],
  "BONK/SOL": [
    {
      marketInfos: [{ amm: { label: "Orca" } }, { amm: { label: "Meteora" } }],
      inAmount: JSBI.BigInt(10000000), // 100 BONK (5 decimals)
      outAmount: JSBI.BigInt(120000), // 0.00012 SOL
      otherAmountThreshold: JSBI.BigInt(0),
      slippageBps: 50,
      swapMode: 1,
      priceImpactPct: 0.25,
    },
  ],
};

const OrderForm: React.FC<OrderFormProps> = ({ pair, onPairChange }) => {
  const { connected, publicKey, balance } = useWallet();
  const [orderType, setOrderType] = useState<
    "market" | "limit" | "stop" | "take_profit"
  >("market");
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("1");
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [slippageError, setSlippageError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const mockSwapExecuted = useRef(false);

  const availablePairs = [
    { from: "SOL", to: "USDC" },
    { from: "BTC", to: "USDC" },
    { from: "ETH", to: "USDC" },
    { from: "BONK", to: "SOL" },
  ];
  const getAmountInLamports = useCallback(() => {
    if (!amount || isNaN(parseFloat(amount))) return JSBI.BigInt(0);
    const decimals = TOKEN_DECIMALS[pair.from] || 9;
    return JSBI.BigInt(Math.floor(parseFloat(amount) * 10 ** decimals));
  }, [amount, pair.from]);

  const {
    exchange,
    loading: jupiterLoading,
    error: jupiterError,
    refresh,
    routes: jupiterRoutes,
  } = useJupiter({
    amount: getAmountInLamports(),
    inputMint: connected ? new PublicKey(TOKEN_MINTS[pair.from]) : undefined,
    outputMint: connected ? new PublicKey(TOKEN_MINTS[pair.to]) : undefined,
    slippageBps: Math.floor(parseFloat(slippage) * 100),
    debounceTime: 250,
  });

  useEffect(() => {
    setAmountError(null);

    if (!amount) return;

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      setAmountError("Please enter a valid number");
      return;
    }

    if (amountNum <= 0) {
      setAmountError("Amount must be greater than 0");
      return;
    }

    if (pair.from === "SOL" && amountNum > balance) {
      setAmountError(
        `Insufficient balance. You have ${balance.toFixed(4)} SOL`
      );
      return;
    }
  }, [amount, balance, pair.from]);

  useEffect(() => {
    setSlippageError(null);

    if (!slippage) return;

    const slippageNum = parseFloat(slippage);
    if (isNaN(slippageNum)) {
      setSlippageError("Please enter a valid number");
      return;
    }

    if (slippageNum < 0.1) {
      setSlippageError("Slippage must be at least 0.1%");
      return;
    }

    if (slippageNum > 10) {
      setSlippageError("Slippage should not exceed 10%");
      return;
    }
  }, [slippage]);

  useEffect(() => {
    if (useMockData) {
      const pairKey = `${pair.from}/${pair.to}`;
      const mockRouteData = MOCK_ROUTES[pairKey] || [];

      const routesWithAmount = mockRouteData.map((route) => ({
        ...route,
        amount: route.inAmount,
      }));

      setRoutes(routesWithAmount);
      setSelectedRoute(routesWithAmount[0] || null);
    } else if (jupiterRoutes) {
      setRoutes(jupiterRoutes);
      setSelectedRoute(jupiterRoutes[0] || null);
    }
  }, [jupiterRoutes, pair.from, pair.to, useMockData]);

  const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [from, to] = e.target.value.split("/");
    if (onPairChange) {
      onPairChange({ from, to });
    }
    setAmount("");
    setError(null);
    setSuccess(null);
  };

  const formatOutputAmount = (amount: JSBI | number): string => {
    if (typeof amount === "number") {
      return amount.toFixed(6);
    }
    return JSBI.toNumber(amount).toFixed(6);
  };
  const executeSwap = async () => {
    if (!connected && !useMockData) {
      setError("Please connect your wallet first");
      return false;
    }

    if (!selectedRoute) {
      setError("No route available for this swap");
      return false;
    }

    try {
      if (useMockData) {
        mockSwapExecuted.current = true;
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return true;
      } else {
        const swapResult = await exchange({
          routeInfo: selectedRoute as RouteInfo,
          userPublicKey: new PublicKey(publicKey!),
        });
        if ("error" in swapResult && swapResult.error) {
          throw new Error(swapResult.error.toString());
        }
        return true;
      }
    } catch (err) {
      console.error("Swap error:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (amountError || slippageError) {
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (orderType !== "market") {
      setError("Only market orders are supported at the moment");
      return;
    }

    setLoading(true);

    try {
      const success = await executeSwap();

      if (success) {
        setSuccess(`Successfully swapped ${amount} ${pair.from} to ${pair.to}`);
        setAmount("");
        setTimeout(() => {
          refresh();
        }, 2000);
      }
    } catch (err) {
      console.error("Swap error:", err);
      setError(
        `Swap failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    refresh();
  };

  const toggleMockMode = () => {
    setUseMockData((prev) => !prev);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl">
      <h2 className="text-[24px] font-bold text-white mb-4">Place Order</h2>

      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={toggleMockMode}
          className={`px-3 py-1 rounded-md text-sm ${
            useMockData
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {useMockData ? "Demo Mode: ON" : "Demo Mode: OFF"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[#A6AAB2] mb-2">Trading Pair</label>
          <select
            className="w-full bg-[#121212] text-white p-3 rounded-md"
            value={`${pair.from}/${pair.to}`}
            onChange={handlePairChange}
          >
            {availablePairs.map((p) => (
              <option key={`${p.from}/${p.to}`} value={`${p.from}/${p.to}`}>
                {p.from}/{p.to}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-[#A6AAB2] mb-2">Order Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`py-2 px-4 rounded-md ${
                orderType === "market"
                  ? "bg-blue-600 text-white"
                  : "bg-[#121212] text-[#A6AAB2]"
              }`}
              onClick={() => setOrderType("market")}
            >
              Market
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded-md ${
                orderType === "limit"
                  ? "bg-blue-600 text-white"
                  : "bg-[#121212] text-[#A6AAB2]"
              }`}
              onClick={() => setOrderType("limit")}
              disabled
            >
              Limit
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#A6AAB2] mb-2">
            Amount ({pair.from})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full bg-[#121212] text-white p-3 rounded-md ${
              amountError ? "border border-red-500" : ""
            }`}
            placeholder="Enter amount"
            required
          />
          {amountError && (
            <p className="text-red-500 text-sm mt-1">{amountError}</p>
          )}

          {pair.from === "SOL" && (
            <div className="flex justify-between mt-1">
              <button
                type="button"
                className="text-blue-400 text-sm"
                onClick={() => setAmount((balance * 0.25).toFixed(4))}
              >
                25%
              </button>
              <button
                type="button"
                className="text-blue-400 text-sm"
                onClick={() => setAmount((balance * 0.5).toFixed(4))}
              >
                50%
              </button>
              <button
                type="button"
                className="text-blue-400 text-sm"
                onClick={() => setAmount((balance * 0.75).toFixed(4))}
              >
                75%
              </button>
              <button
                type="button"
                className="text-blue-400 text-sm"
                onClick={() => setAmount((balance * 0.99).toFixed(4))}
              >
                Max
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-[#A6AAB2] mb-2">
            Slippage Tolerance (%)
          </label>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            className={`w-full bg-[#121212] text-white p-3 rounded-md ${
              slippageError ? "border border-red-500" : ""
            }`}
            placeholder="Enter slippage"
            min="0.1"
            max="10"
            step="0.1"
          />
          {slippageError && (
            <p className="text-red-500 text-sm mt-1">{slippageError}</p>
          )}

          <div className="flex justify-between mt-1">
            <button
              type="button"
              className="text-blue-400 text-sm"
              onClick={() => setSlippage("0.5")}
            >
              0.5%
            </button>
            <button
              type="button"
              className="text-blue-400 text-sm"
              onClick={() => setSlippage("1")}
            >
              1%
            </button>
            <button
              type="button"
              className="text-blue-400 text-sm"
              onClick={() => setSlippage("2")}
            >
              2%
            </button>
            <button
              type="button"
              className="text-blue-400 text-sm"
              onClick={() => setSlippage("3")}
            >
              3%
            </button>
          </div>
        </div>

        {routes.length > 0 && amount && !amountError && (
          <div className="mb-6 p-4 bg-[#121212] rounded-md">
            <div className="flex justify-between text-[#A6AAB2] mb-2">
              <span>You'll receive approximately:</span>
              <span className="text-white font-medium">
                {selectedRoute?.outAmount
                  ? formatOutputAmount(Number(selectedRoute.outAmount))
                  : "0"}{" "}
                {pair.to}
              </span>
            </div>
            <div className="flex justify-between text-[#A6AAB2] mb-2">
              <span>Price:</span>
              <span className="text-white">
                1 {pair.from} ≈{" "}
                {selectedRoute?.outAmount && amount
                  ? (() => {
                      const outAmount = selectedRoute.outAmount;
                      const inAmount = getAmountInLamports();
                      if (JSBI.EQ(inAmount, JSBI.BigInt(0))) {
                        return "0";
                      }
                      const outNum = Number(outAmount.toString());
                      const inNum = Number(inAmount.toString());
                      const ratio = outNum / inNum;
                      return (
                        ratio *
                        Math.pow(
                          10,
                          TOKEN_DECIMALS[pair.from] - TOKEN_DECIMALS[pair.to]
                        )
                      ).toFixed(6);
                    })()
                  : "0"}{" "}
                {pair.to}
              </span>
            </div>
            <div className="flex justify-between text-[#A6AAB2] mb-2">
              <span>Price Impact:</span>
              <span
                className={
                  selectedRoute?.priceImpactPct !== undefined &&
                  selectedRoute.priceImpactPct > 1
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {selectedRoute?.priceImpactPct !== undefined
                  ? selectedRoute.priceImpactPct.toFixed(2)
                  : "0"}
                %
              </span>
            </div>
            <div className="flex justify-between text-[#A6AAB2]">
              <span>Route:</span>
              <span className="text-white">
                {selectedRoute?.marketInfos
                  ?.map((info) => info.amm.label)
                  .join(" → ")}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-900/50 text-green-200 rounded-md">
            {success}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-md font-medium ${
            loading || jupiterLoading || !amount || amountError || slippageError
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          }`}
          disabled={
            loading ||
            jupiterLoading ||
            !amount ||
            !!amountError ||
            !!slippageError
          }
        >
          {loading || jupiterLoading
            ? "Processing..."
            : `Swap ${pair.from} to ${pair.to}`}
        </button>
      </form>

      {/* Route Information */}
      {selectedRoute && (
        <div className="mb-6 p-3 bg-[#121212] rounded-lg">
          <div className="flex justify-between text-[#A6AAB2] text-sm mb-2">
            <span>Route</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="text-blue-400 hover:text-blue-300"
            >
              Refresh
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-white">
              {selectedRoute?.marketInfos
                ?.map((info) => info.amm.label)
                .join(" → ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
