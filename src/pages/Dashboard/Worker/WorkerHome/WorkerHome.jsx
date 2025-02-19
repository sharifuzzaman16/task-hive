import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const WorkerHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;

  const { data: submissions = [] } = useQuery({
    queryKey: ['submission', userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const approvedSubmissions = submissions.filter((submission) => submission.status === 'approved');
  const pendingSubmissions = submissions.filter((submission) => submission.status === 'pending').length;
  const totalEarnings = approvedSubmissions.reduce((sum, submission) => sum + (submission.payable_amount || 0), 0);

  // Static data for demonstration (if needed)
  const staticSubmissions = [
    {
      _id: "1",
      task_title: "Website Design",
      buyer_name: "john.doe@example.com",
      payable_amount: 150,
      status: "approved",
    },
    {
      _id: "2",
      task_title: "Logo Creation",
      buyer_name: "jane.doe@example.com",
      payable_amount: 100,
      status: "pending",
    },
  ];

  const allSubmissions = submissions.length > 0 ? submissions : staticSubmissions;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Dashboard | Worker Home - TaskHive</title>
      </Helmet>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.displayName || "Worker"}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700">Total Submissions</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{allSubmissions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700">Pending Submissions</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{pendingSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">${totalEarnings}</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700 uppercase">Task</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700 uppercase">Buyer Email</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700 uppercase">Payable Amount</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allSubmissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-gray-800">{submission.task_title}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{submission.buyer_name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">$ {submission.payable_amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      submission.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;