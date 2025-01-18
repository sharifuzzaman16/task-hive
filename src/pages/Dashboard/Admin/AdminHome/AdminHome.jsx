import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {

  const axiosPublic = useAxiosPublic();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const { data: totalPrice = [] } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => {
      const res = await axiosPublic.get("/total-payments");
      return res.data;
    },
  });

  const totalWorker = users.filter(user => user.role === 'worker').length;
  const totalBuyer = users.filter(user => user.role === 'buyer').length;
  
  const { data: withdrawals = [] } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/withdrawal-requests')
      return res.data;
    }
  });

  const pendingWithdrawalsCount = withdrawals.filter(withdrawal => withdrawal.status === 'pending').length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Worker</h2>
          <p className="text-3xl text-blue-600">{totalWorker}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Buyer</h2>
          <p className="text-3xl text-yellow-600">{totalBuyer}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Payments</h2>
          <p className="text-3xl text-red-600">${totalPrice.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
