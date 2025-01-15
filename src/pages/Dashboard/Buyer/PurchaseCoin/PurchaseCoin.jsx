import React, { useState } from "react";

const PurchaseCoin = () => {
  const [coinAmount, setCoinAmount] = useState(0);

  const handlePurchase = () => {
    alert(`You purchased ${coinAmount} coins`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Purchase Coin</h1>
      <input
        type="number"
        value={coinAmount}
        onChange={(e) => setCoinAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter amount"
      />
      <button
        onClick={handlePurchase}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Purchase
      </button>
    </div>
  );
};

export default PurchaseCoin;
