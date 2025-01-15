import React from "react";

const AdminHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-3xl text-blue-600">120</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Active Tasks</h2>
          <p className="text-3xl text-yellow-600">45</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Pending Withdrawals</h2>
          <p className="text-3xl text-red-600">8</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
