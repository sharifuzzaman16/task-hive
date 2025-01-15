import React from "react";

const TaskList = () => {
  const tasks = [
    { id: 1, name: "Logo Design", status: "In Progress" },
    { id: 2, name: "Website Development", status: "Completed" },
    { id: 3, name: "Mobile App Design", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Task</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="px-4 py-2">{task.name}</td>
                <td className="px-4 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
