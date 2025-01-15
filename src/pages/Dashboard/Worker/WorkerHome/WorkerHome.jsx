import React from "react";

const WorkerHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Submissions</h2>
          <p className="text-3xl text-blue-600">15</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Pending Submissions</h2>
          <p className="text-3xl text-yellow-600">5</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Earnings</h2>
          <p className="text-3xl text-green-600">$200</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
