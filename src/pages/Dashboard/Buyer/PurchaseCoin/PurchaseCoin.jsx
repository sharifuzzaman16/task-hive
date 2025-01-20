import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const PurchaseCoin = () => {
  const navigate = useNavigate();

  // Coin packages
  const packages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  // Handle card click
  const handlePayment = (coins, price) => {
    navigate(`/dashboard/payment`, { state: { coins, price } });
  };

  return (
    <div className="">
      <Helmet>
              <title>Dashboard | PurchaseCoin - TaskHive</title>
            </Helmet>
     <h1 className="text-2xl font-bold mb-4">Purchase Coin</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.coins}
            className="w-64 bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => handlePayment(pkg.coins, pkg.price)}
          >
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              {pkg.coins} Coins
            </h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">${pkg.price}</p>
              <p className="text-sm text-gray-500 mt-2">({parseInt(pkg.coins / pkg.price)} coins per $1)</p>
            </div>
            <button className="w-full bg-green-500 text-white mt-6 py-2 rounded-md font-medium hover:bg-green-600">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
