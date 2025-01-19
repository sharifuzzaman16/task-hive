import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import TaskCard from "../../../../components/TaskCard";

const TaskList = () => {
  const axiosPublic = useAxiosPublic();


  const [page, setPage] = useState(1);
  const tasksPerPage = 9;

  const { data: { tasks = [], totalTasks = 0 } = {}, isLoading } = useQuery({
    queryKey: ["tasks", page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?page=${page}&limit=${tasksPerPage}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task}></TaskCard>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
