import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface RequestParams {
  action: "currentPrice" | "historicalPrices";
  token: string;
  days?: number;
}

serve(async (req) => {
  // Enable CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { action, token, days = 30 } = (await req.json()) as RequestParams;

    // Map token symbols to CoinGecko IDs
    const tokenIdMap: Record<string, string> = {
      SOL: "solana",
      BTC: "bitcoin",
      ETH: "ethereum",
      BONK: "bonk",
      USDC: "usd-coin",
    };

    const coinId = tokenIdMap[token];
    if (!coinId) {
      return new Response(
        JSON.stringify({ error: `No CoinGecko ID for token: ${token}` }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    let data;

    if (action === "currentPrice") {
      // Fetch current price
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const priceData = await response.json();
      data = priceData[coinId]?.usd;

      if (!data) {
        throw new Error(`No price data for ${token}`);
      }
    } else if (action === "historicalPrices") {
      // Fetch historical prices
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const chartData = await response.json();
      data = chartData.prices || [];
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response(JSON.stringify({ data }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
