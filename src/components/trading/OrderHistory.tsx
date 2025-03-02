import React from "react";

const mockOrders = [
  {
    id: "1",
    type: "market",
    tokenIn: "SOL",
    tokenOut: "USDC",
    amount: 2.5,
    price: 150.25,
    timestamp: Date.now() - 3600000,
    status: "completed",
  },
  {
    id: "2",
    type: "limit",
    tokenIn: "SOL",
    tokenOut: "USDC",
    amount: 1.0,
    price: 160.0,
    timestamp: Date.now() - 7200000,
    status: "pending",
  },
  {
    id: "3",
    type: "stop",
    tokenIn: "SOL",
    tokenOut: "USDC",
    amount: 3.0,
    price: 140.5,
    timestamp: Date.now() - 10800000,
    status: "pending",
  },
];

const OrderHistory: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl">
      <h2 className="text-[24px] font-bold text-white mb-4">Order History</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#A6AAB2] border-b border-[#333333]">
              <th className="text-left py-3">Type</th>
              <th className="text-left py-3">Pair</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Price</th>
              <th className="text-left py-3">Time</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-[#333333]">
                <td className="py-3 capitalize text-white">{order.type}</td>
                <td className="py-3 text-white">
                  {order.tokenIn}/{order.tokenOut}
                </td>
                <td className="py-3 text-white">
                  {order.amount} {order.tokenIn}
                </td>
                <td className="py-3 text-white">
                  {order.price} {order.tokenOut}
                </td>
                <td className="py-3 text-[#A6AAB2]">
                  {new Date(order.timestamp).toLocaleTimeString()}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      order.status === "completed"
                        ? "bg-green-900 text-green-300"
                        : order.status === "pending"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#A6AAB2]">No orders yet</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
