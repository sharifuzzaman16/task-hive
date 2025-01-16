import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../context/AuthProvider";

const MyTasks = () => {

  const axiosPublic = useAxiosPublic();
  const {user} = useContext(AuthContext);
  const userEmail = user?.email;
  
  const {refetch, data: myTasks = []} = useQuery({
    queryKey: ['myTasks', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-tasks?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail
  }) 
  console.log(myTasks);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Task</th>
              <th className="text-left px-4 py-2">Completion Date</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="px-4 py-2">{task.task_title}</td>
                <td className="px-4 py-2">{task.completion_date}</td>
                <td className="px-4 py-2 flex gap-2 items-center">
                    <FaRegEdit className="text-2xl text-success-green"></FaRegEdit>
                    <FaTrash className="text-2xl text-error-red"></FaTrash>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
