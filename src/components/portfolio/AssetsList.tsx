import React from "react";

// Mock data for assets
const mockAssets = [
  {
    id: "1",
    symbol: "SOL",
    name: "Solana",
    amount: 10.5,
    price: 150.25,
    value: 1577.63,
    change: 5.2,
  },
  {
    id: "2",
    symbol: "USDC",
    name: "USD Coin",
    amount: 750,
    price: 1,
    value: 750,
    change: 0,
  },
  {
    id: "3",
    symbol: "RAY",
    name: "Raydium",
    amount: 45.8,
    price: 3.75,
    value: 171.75,
    change: -2.1,
  },
  {
    id: "4",
    symbol: "BONK",
    name: "Bonk",
    amount: 1250000,
    price: 0.00000065,
    value: 81.25,
    change: 15.3,
  },
];

const AssetsList: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl">
      <h2 className="text-[24px] font-bold text-white mb-4">Your Assets</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#A6AAB2] border-b border-[#333333]">
              <th className="text-left py-3">Asset</th>
              <th className="text-right py-3">Amount</th>
              <th className="text-right py-3">Price</th>
              <th className="text-right py-3">Value</th>
              <th className="text-right py-3">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {mockAssets.map((asset) => (
              <tr key={asset.id} className="border-b border-[#333333]">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center mr-3">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{asset.name}</p>
                      <p className="text-[#A6AAB2] text-sm">{asset.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right text-white">
                  {asset.amount.toLocaleString(undefined, {
                    maximumFractionDigits: asset.price < 0.01 ? 0 : 2,
                  })}
                </td>
                <td className="py-4 text-right text-white">
                  $
                  {asset.price < 0.01
                    ? asset.price.toFixed(8)
                    : asset.price.toFixed(2)}
                </td>
                <td className="py-4 text-right text-white">
                  ${asset.value.toFixed(2)}
                </td>
                <td className="py-4 text-right">
                  <span
                    className={
                      asset.change >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {asset.change >= 0 ? "+" : ""}
                    {asset.change}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsList;
