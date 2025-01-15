import React from "react";

const MySubMissions = () => {
  const submissions = [
    { id: 1, task: "Logo Design", date: "2025-01-10", status: "Approved" },
    { id: 2, task: "Website Development", date: "2025-01-12", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Task</th>
              <th className="text-left px-4 py-2">Submission Date</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-t">
                <td className="px-4 py-2">{submission.task}</td>
                <td className="px-4 py-2">{submission.date}</td>
                <td className="px-4 py-2">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubMissions;
