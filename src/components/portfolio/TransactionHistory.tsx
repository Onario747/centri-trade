import React from "react";

// Mock data for transactions
const mockTransactions = [
  {
    id: "1",
    type: "buy",
    asset: "SOL",
    amount: 2.5,
    price: 145.75,
    value: 364.38,
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
  },
  {
    id: "2",
    type: "sell",
    asset: "RAY",
    amount: 15.0,
    price: 3.85,
    value: 57.75,
    timestamp: Date.now() - 86400000 * 5, // 5 days ago
  },
  {
    id: "3",
    type: "buy",
    asset: "BONK",
    amount: 1250000,
    price: 0.00000058,
    value: 72.5,
    timestamp: Date.now() - 86400000 * 7, // 7 days ago
  },
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl">
      <h2 className="text-[24px] font-bold text-white mb-4">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {mockTransactions.map((tx) => (
          <div key={tx.id} className="border-b border-[#333333] pb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    tx.type === "buy"
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {tx.type === "buy" ? "+" : "-"}
                </div>
                <div>
                  <p className="text-white font-medium capitalize">
                    {tx.type} {tx.asset}
                  </p>
                  <p className="text-[#A6AAB2] text-sm">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  {tx.amount} {tx.asset}
                </p>
                <p className="text-[#A6AAB2] text-sm">${tx.value.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-[#A6AAB2] border border-[#333333] rounded-md hover:bg-[#333333] transition-colors">
        View All Transactions
      </button>
    </div>
  );
};

export default TransactionHistory;
