import React from "react";

const ManageUsers = () => {
  const users = [
    { id: 1, name: "John Doe", role: "Worker" },
    { id: 2, name: "Jane Smith", role: "Admin" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">User</th>
              <th className="text-left px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
