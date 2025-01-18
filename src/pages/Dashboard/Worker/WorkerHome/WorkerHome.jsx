import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const WorkerHome = () => {


  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const userEmail = user?.email;

  const { data: submissions = [] } = useQuery({
    queryKey: ['submission', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submissions?email=${userEmail}`)
      return res.data
    },
    enabled: !!userEmail
  })

  const approvedSubmissions = submissions.filter(submission => submission.status === 'approved');
  const pendingSubmissions = submissions.filter(submission => submission.status === 'pending').length;
  const totalEarnings = approvedSubmissions.reduce((sum, submission) => sum + (submission.payable_amount || 0), 0);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Submissions</h2>
          <p className="text-3xl text-blue-600">{submissions.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Pending Submissions</h2>
          <p className="text-3xl text-yellow-600">{pendingSubmissions}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Earnings</h2>
          <p className="text-3xl text-green-600">${totalEarnings}</p>
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
            {approvedSubmissions.map((submission) => (
              <tr key={submission._id} className="border-t">
                <td className="px-4 py-2">{submission.task_title}</td>
                <td className="px-4 py-2">{submission.buyer_name}</td>
                <td className="px-4 py-2">$ {submission.payable_amount}</td>
                <td className="px-4 py-2 capitalize text-bg-primary">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
