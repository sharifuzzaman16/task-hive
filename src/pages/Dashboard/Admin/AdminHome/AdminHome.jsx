import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminHome = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // Fetch users data
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  // Fetch total payments
  const { data: totalPrice = [] } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => {
      const res = await axiosPublic.get("/total-payments");
      return res.data;
    },
  });

  // Calculate total workers and buyers
  const totalWorker = users.filter((user) => user.role === "worker").length;
  const totalBuyer = users.filter((user) => user.role === "buyer").length;

  // Fetch withdrawal requests
  const { data: withdrawals = [], refetch: refetchWithdrawals } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/withdrawal-requests");
      return res.data;
    },
  });

  // Mutation to accept a withdrawal request
  const { mutate: acceptPayment } = useMutation({
    mutationFn: async ({ withdrawalId, worker_email, withdrawal_coin }) => {
      const res = await axiosPublic.patch(`/withdrawal-requests/${withdrawalId}`, {
        status: "success",
        worker_email,
        withdrawal_coin,
      });
      return res.data;
    },
    onMutate: async ({ withdrawalId }) => {
      await queryClient.cancelQueries(["withdrawals"]);

      // Optimistic update: update the UI before server response
      const previousWithdrawals = queryClient.getQueryData(["withdrawals"]);
      queryClient.setQueryData(["withdrawals"], (old) =>
        old.map((withdrawal) =>
          withdrawal._id === withdrawalId
            ? { ...withdrawal, status: "success" }
            : withdrawal
        )
      );

      return { previousWithdrawals };
    },
    onError: (err, variables, context) => {
      console.error("Error updating withdrawal:", err);
      // Rollback to previous state
      queryClient.setQueryData(["withdrawals"], context.previousWithdrawals);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.response?.data?.message || err.message || "Failed to update"}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Withdrawal request approved successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetchWithdrawals();
    },
  });

  // Handle button click for updating withdrawal status
  const handleUpdate = (withdrawalId, worker_email, withdrawal_coin) => {
    acceptPayment({ withdrawalId, worker_email, withdrawal_coin });
  };

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
      <div>
        <div className="bg-white shadow rounded overflow-hidden mt-10">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Worker Email</th>
                <th className="text-left px-4 py-2">Payment Method</th>
                <th className="text-left px-4 py-2">Withdrawal Amount</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id} className="border-t">
                  <td className="px-4 py-2">{withdrawal.worker_email}</td>
                  <td className="px-4 py-2">{withdrawal.payment_system}</td>
                  <td className="px-4 py-2">${withdrawal.withdrawal_amount}</td>
                  <td className="px-4 py-2 capitalize">{withdrawal.status}</td>
                  <td className="px-4 py-2">
                    {withdrawal.status !== "success" && (
                      <button
                        className="px-4 py-2 bg-success-green text-white rounded-lg"
                        onClick={() =>
                          handleUpdate(
                            withdrawal._id,
                            withdrawal.worker_email,
                            withdrawal.withdrawal_coin
                          )
                        }
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
