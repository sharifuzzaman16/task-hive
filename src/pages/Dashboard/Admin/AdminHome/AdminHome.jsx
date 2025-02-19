import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaUserTie, FaUsers, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: totalPrice = { totalPrice: 0 } } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => (await axiosSecure.get("/total-payments")).data,
  });

  const { data: withdrawals = [], refetch: refetchWithdrawals } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => (await axiosSecure.get("/withdrawal-requests")).data,
  });

  const totalWorker = users.filter((user) => user.role === "worker").length;
  const totalBuyer = users.filter((user) => user.role === "buyer").length;

  const { mutate: acceptPayment } = useMutation({
    mutationFn: async ({ withdrawalId, worker_email, withdrawal_coin }) => {
      return (await axiosSecure.patch(`/withdrawal-requests/${withdrawalId}`, {
        status: "success",
        worker_email,
        withdrawal_coin,
      })).data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Withdrawal request approved successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetchWithdrawals();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Dashboard | Admin Home - TaskHive</title>
      </Helmet>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-lg text-gray-600">Manage users, payments, and withdrawals.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Workers", value: totalWorker, color: "bg-blue-100 text-blue-600", icon: <FaUserTie size={30} /> },
          { label: "Total Buyers", value: totalBuyer, color: "bg-yellow-100 text-yellow-600", icon: <FaUsers size={30} /> },
          { label: "Total Payments", value: `$${totalPrice.totalPrice}`, color: "bg-green-100 text-green-600", icon: <FaDollarSign size={30} /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className={`p-6 rounded-lg shadow-md text-center ${color}`}>
            <div className="flex justify-center mb-2">{icon}</div>
            <h2 className="text-xl font-semibold">{label}</h2>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Pending Withdrawals</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {['Worker Email', 'Payment Method', 'Amount', 'Status', 'Action'].map(header => (
                  <th key={header} className="px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {withdrawals.map(withdrawal => (
                <tr key={withdrawal._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{withdrawal.worker_email}</td>
                  <td className="px-4 py-2">{withdrawal.payment_system}</td>
                  <td className="px-4 py-2">${withdrawal.withdrawal_amount}</td>
                  <td className="px-4 py-2 capitalize">{withdrawal.status}</td>
                  <td className="px-4 py-2">
                    {withdrawal.status !== "success" && (
                      <button
                        className="px-4 py-2 bg-success-green text-white rounded-lg"
                        onClick={() => acceptPayment({
                          withdrawalId: withdrawal._id,
                          worker_email: withdrawal.worker_email,
                          withdrawal_coin: withdrawal.withdrawal_coin,
                        })}
                      >
                        Accept
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
