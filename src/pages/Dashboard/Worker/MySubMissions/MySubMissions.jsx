import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MySubMissions = () => {

  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;
  
  const {data: submissions = [] } = useQuery({
    queryKey: ['submission', userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?email=${userEmail}`)
      return res.data
    },
    enabled: !!userEmail
  })


  return (
    <div>
      <Helmet>
              <title>Dashboard | My Submissions - TaskHive</title>
            </Helmet>
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      <div className="bg-white shadow rounded overflow-hidden">
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
            {submissions.map((submission) => (
              <tr key={submission._id} className="border-t">
                <td className="px-4 py-2">{submission.task_title}</td>
                <td className="px-4 py-2">{submission.buyer_email}</td>
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

export default MySubMissions;
