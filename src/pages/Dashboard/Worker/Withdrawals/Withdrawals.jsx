import React, { useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Withdrawals = () => {
  const axiosPublic = useAxiosPublic();
  const [user] = useUser();
  const totalCoins = user.availableCoin;
  const paymentSystems = ["Bkash", "Rocket", "Nagad", "Other"];
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");

  const handleCoinsChange = (e) => {
    const withdrawalCoins = Number(e.target.value);
    if (withdrawalCoins < 200) {
      setError("Minimum withdrawal coins is 200.");
      return;
    }
    if (withdrawalCoins > totalCoins) {
      setError(`You cannot withdraw more than ${totalCoins} coins.`);
      return;
    }
    setError("");
    setWithdrawalAmount((withdrawalCoins / 20).toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const withdrawal_coin = parseInt(form.withdrawal_coin.value);
    const withdrawal_amount = parseInt(form.withdrawal_amount.value);
    const payment_system = form.payment_system.value;
    const worker_email = user.email;
    const worker_name = user.name;
    const withdrawal_date = new Date();
    const status = "pending";

    const withdrawalRequest = {
      withdrawal_coin,
      withdrawal_amount,
      payment_system,
      worker_email,
      worker_name,
      withdrawal_date,
      status,
    };

    try {
      const response = await axiosPublic.post("/withdrawal-requests", withdrawalRequest);
      if (response.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successful Request!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const isSubmitDisabled =
    withdrawalAmount <= 0 ||
    withdrawalAmount > totalCoins / 20 ||
    error ||
    !accountNumber;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Withdraw Funds</h2>

        <p className="mb-4 text-gray-600">
          Total Coins: <span className="font-bold">{totalCoins}</span>
          &nbsp;| Withdrawal Amount:{" "}
          <span className="font-bold">${(totalCoins / 20).toFixed(2)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="coinToWithdraw" className="block font-medium text-gray-700">
              Coins to Withdraw (Min: 200 {totalCoins > 200 && `, Max: ${totalCoins}`})
            </label>
            <input
              name="withdrawal_coin"
              type="number"
              id="coinToWithdraw"
              required
              onChange={handleCoinsChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label htmlFor="withdrawAmount" className="block font-medium text-gray-700">
              Withdrawal Amount ($)
            </label>
            <input
              name="withdrawal_amount"
              type="number"
              id="withdrawAmount"
              value={withdrawalAmount}
              readOnly
              className="w-full mt-1 p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="paymentSystem" className="block font-medium text-gray-700">
              Select Payment System
            </label>
            <select
              name="payment_system"
              required
              id="paymentSystem"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
            >
              <option value="">Choose Payment System</option>
              {paymentSystems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="accountNumber" className="block font-medium text-gray-700">
              Account Number
            </label>
            <input
              name="account_number"
              required
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter Account Number"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full p-2 rounded-md text-white ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
              }`}
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdrawals;
