import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageTask = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tasks')
      return res.data;
    }
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: async (taskId) => {
      const res = await axiosPublic.delete(`/tasks/${taskId}`)
      return res.data
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task deleted successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      // Refetch tasks to update the list
      refetch();
    },
    onError: (err) => {
      // Show error message
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  })

  const handleDelete = (taskId) => {
    // Confirm delete before making the mutation
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ff8c42',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId);  // Call the mutation to delete the task
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Task</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Task</th>
              <th className="text-left px-4 py-2">Buyer Email</th>
              <th className="text-left px-4 py-2">Required Worker</th>
              <th className="text-left px-4 py-2">Payable Amount</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="px-4 py-2">{task.task_title}</td>
                <td className="px-4 py-2">{task.buyer_email}</td>
                <td className="px-4 py-2 text-center">{task.required_workers}</td>
                <td className="px-4 py-2 text-center">$ {task.payable_amount}</td>
                <td className="px-4 py-2 flex  justify-center"><FaTrash 
                onClick={() => handleDelete(task._id)} className="text-2xl text-error-red cursor-pointer"></FaTrash></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
