import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [selectedSubmission, setSelectedSubmission] = useState(null); // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  const queryClient = useQueryClient();

  const { data: myTasks = [] } = useQuery({
    queryKey: ["myTasks", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tasks?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["submission", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payment", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const pendingSubmissions = submissions.filter(
    (submission) => submission.status === "pending"
  );

  const totalPayments = payments.reduce(
    (sum, payment) => sum + (payment.price || 0),
    0
  );

  const pendingTasks = myTasks.reduce(
    (sum, task) => sum + (task.required_workers || 0),
    0
  );

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSubmission(null);
    setIsModalOpen(false);
  };

  const { mutate: approveSubmission } = useMutation({
    mutationFn: async (submissionId) => {
      const res = await axiosSecure.patch(`/submissions/${submissionId}`, { action: "approved" });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", userEmail] });
      Swal.fire("Approved!", "The submission has been approved.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve the submission.", "error");
    },
  });

  const { mutate: rejectSubmission } = useMutation({
    mutationFn: async (submissionId) => {
      const res = await axiosSecure.patch(`/submissions/${submissionId}`, { action: "reject" });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", userEmail] });
      queryClient.invalidateQueries({ queryKey: ["myTasks", userEmail] });
      Swal.fire("Rejected!", "The submission has been rejected.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject the submission.", "error");
    },
  });

  const handleApprove = (submissionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this submission.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveSubmission(submissionId);
      }
    });
  };

  const handleReject = (submissionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this submission.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectSubmission(submissionId);
      }
    });
  };

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
              <th className="text-left px-4 py-2">Worker Name</th>
              <th className="text-left px-4 py-2">Payable Amount</th>
              <th className="text-left px-4 py-2">View Submission</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions.map((submission) => (
              <tr key={submission._id} className="border-t">
                <td className="px-4 py-2">{submission.task_title}</td>
                <td className="px-4 py-2">{submission.worker_name}</td>
                <td className="px-4 py-2">$ {submission.payable_amount}</td>
                <td className="px-4 py-2"><button
                  onClick={() => handleViewSubmission(submission)}
                  className="px-4 py-2 bg-bg-primary text-white rounded-lg"
                >
                  View
                </button></td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleApprove(submission._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(submission._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
            <p><strong>Submission Details:</strong> {selectedSubmission.submission_details}</p>
            <p><strong>Worker:</strong> {selectedSubmission.worker_name}</p>
            <p><strong>Payable Amount:</strong> ${selectedSubmission.payable_amount}</p>
            <p><strong>Status:</strong> {selectedSubmission.status}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
