import React from "react";

const Withdrawals = () => {
  const withdrawals = [
    { id: 1, amount: "$50", date: "2025-01-08", status: "Completed" },
    { id: 2, amount: "$30", date: "2025-01-10", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Withdrawals</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id} className="border-t">
                <td className="px-4 py-2">{withdrawal.amount}</td>
                <td className="px-4 py-2">{withdrawal.date}</td>
                <td className="px-4 py-2">{withdrawal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdrawals;
