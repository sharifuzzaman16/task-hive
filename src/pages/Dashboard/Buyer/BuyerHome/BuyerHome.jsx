import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FaTasks, FaClock, FaDollarSign } from "react-icons/fa";

const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const queryClient = useQueryClient();

  const { data: myTasks = [] } = useQuery({
    queryKey: ["myTasks", userEmail],
    queryFn: async () => (await axiosSecure.get(`/my-tasks?email=${userEmail}`)).data,
    enabled: !!userEmail,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["submission", userEmail],
    queryFn: async () => (await axiosSecure.get(`/submissions?email=${userEmail}`)).data,
    enabled: !!userEmail,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payment", userEmail],
    queryFn: async () => (await axiosSecure.get(`/payments?email=${userEmail}`)).data,
    enabled: !!userEmail,
  });

  const pendingSubmissions = submissions.filter(sub => sub.status === "pending");
  const totalPayments = payments.reduce((sum, payment) => sum + (payment.price || 0), 0);
  const pendingTasks = myTasks.reduce((sum, task) => sum + (task.required_workers || 0), 0);

  const { mutate: approveSubmission } = useMutation({
    mutationFn: async (submission) => {
      await axiosSecure.patch(`/submissions/${submission._id}`, { action: "approved" });
      await axiosSecure.post("/notifications", {
        message: `You have earned ${submission.payable_amount} from ${submission.buyer_email} for completing ${submission.task_title}`,
        toEmail: submission.worker_email,
        time: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["submission", userEmail]);
      Swal.fire("Approved!", "The submission has been approved.", "success");
    },
    onError: () => Swal.fire("Error", "Failed to approve the submission.", "error"),
  });

  const { mutate: rejectSubmission } = useMutation({
    mutationFn: async (submission) => {
      await axiosSecure.patch(`/submissions/${submission._id}`, { action: "reject" });
      await axiosSecure.post("/notifications", {
        message: `Your submission request has been rejected by ${submission.buyer_email} for not completing ${submission.task_title}`,
        toEmail: submission.worker_email,
        time: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["submission", userEmail]);
      queryClient.invalidateQueries(["myTasks", userEmail]);
      Swal.fire("Rejected!", "The submission has been rejected.", "success");
    },
    onError: () => Swal.fire("Error", "Failed to reject the submission.", "error"),
  });

  return (
    <div className="p-6">
      <Helmet>
        <title>Dashboard | Buyer Home - TaskHive</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.displayName || "Buyer"}!</h1>
      <p className="text-lg mb-6">Manage your tasks, submissions, and payments efficiently.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Tasks", value: myTasks.length, color: "bg-blue-100 text-blue-600", icon: <FaTasks size={30} /> },
          { label: "Pending Tasks", value: pendingTasks, color: "bg-yellow-100 text-yellow-600", icon: <FaClock size={30} /> },
          { label: "Total Payment", value: `$${totalPayments}`, color: "bg-green-100 text-green-600", icon: <FaDollarSign size={30} /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className={`p-6 rounded-lg shadow-md text-center ${color}`}>
            <div className="flex justify-center mb-2">{icon}</div>
            <h2 className="text-xl font-semibold">{label}</h2>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Pending Submissions</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {['Task', 'Worker', 'Amount', 'Action'].map(header => (
                  <th key={header} className="px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map(submission => (
                <tr key={submission._id} className="border-t">
                  <td className="px-4 py-2">{submission.task_title}</td>
                  <td className="px-4 py-2">{submission.worker_name}</td>
                  <td className="px-4 py-2">${submission.payable_amount}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => approveSubmission(submission)} className="px-3 py-1 bg-green-500 text-white rounded-lg">Accept</button>
                    <button onClick={() => rejectSubmission(submission)} className="px-3 py-1 bg-red-500 text-white rounded-lg">Reject</button>
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

export default BuyerHome;
