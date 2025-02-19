import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTasks, FaClock, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const { data: availableTasks = [] } = useQuery({
    queryKey: ["availableTasks"],
    queryFn: async () => (await axiosSecure.get(`/available-tasks`)).data,
  });

  const { data: mySubmissions = [] } = useQuery({
    queryKey: ["mySubmissions", userEmail],
    queryFn: async () => (await axiosSecure.get(`/my-submissions?email=${userEmail}`)).data,
    enabled: !!userEmail,
  });

  const { data: earnings = [] } = useQuery({
    queryKey: ["earnings", userEmail],
    queryFn: async () => (await axiosSecure.get(`/earnings?email=${userEmail}`)).data,
    enabled: !!userEmail,
  });

  const pendingSubmissions = mySubmissions.filter(sub => sub.status === "pending");
  const totalEarnings = earnings.reduce((sum, earning) => sum + (earning.amount || 0), 0);

  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Dashboard | Worker Home - TaskHive</title>
      </Helmet>
      <h1 className="text-3xl font-bold">Welcome, {user?.displayName || "Worker"}!</h1>
      <p className="text-lg text-gray-600">Find tasks, track submissions, and monitor your earnings.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Available Tasks", value: availableTasks.length, color: "bg-blue-100 text-blue-600", icon: <FaTasks size={30} /> },
          { label: "Pending Submissions", value: pendingSubmissions.length, color: "bg-yellow-100 text-yellow-600", icon: <FaClock size={30} /> },
          { label: "Total Earnings", value: `$${totalEarnings}`, color: "bg-green-100 text-green-600", icon: <FaDollarSign size={30} /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className={`p-6 rounded-lg shadow-md text-center ${color}`}>
            <div className="flex justify-center mb-2">{icon}</div>
            <h2 className="text-xl font-semibold">{label}</h2>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Pending Submissions</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {['Task', 'Status', 'Amount'].map(header => (
                  <th key={header} className="px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map(submission => (
                <tr key={submission._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{submission.task_title}</td>
                  <td className="px-4 py-2">{submission.status}</td>
                  <td className="px-4 py-2">${submission.payable_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
