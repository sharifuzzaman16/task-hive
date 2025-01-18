import React, { useContext } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const BuyerHome = () => {

  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const { refetch, data: myTasks = [] } = useQuery({
    queryKey: ['myTasks', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-tasks?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail
  });


    const { data: payments = [] } = useQuery({
        queryKey: ['payment', userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments?email=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail, // Ensures the query only runs if userEmail exists
    });

  const totalPayments = payments.reduce((sum, payment) => (sum + payment.price || 0), 0)
  const pendingTasks = myTasks.reduce((sum, task) => sum + (task.required_workers || 0), 0)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-3xl text-blue-600">{myTasks.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Pending Tasks</h2>
          <p className="text-3xl text-yellow-600">{pendingTasks}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Payment</h2>
          <p className="text-3xl text-green-600">${totalPayments}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded overflow-hidden mt-10">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Task</th>
              <th className="text-left px-4 py-2">Buyer Email</th>
              <th className="text-left px-4 py-2">Payable Amount</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* {approvedSubmissions.map((submission) => (
              <tr key={submission._id} className="border-t">
                <td className="px-4 py-2">{submission.task_title}</td>
                <td className="px-4 py-2">{submission.buyer_name}</td>
                <td className="px-4 py-2">$ {submission.payable_amount}</td>
                <td className="px-4 py-2 capitalize text-bg-primary">{submission.status}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerHome;
