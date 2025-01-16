import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../context/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyTasks = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const { refetch, data: myTasks = [] } = useQuery({
    queryKey: ['myTasks', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-tasks?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // State to store the selected task
  const [selectedTask, setSelectedTask] = useState(null);

  // Mutation to update the task
  const { mutate } = useMutation({
    mutationFn: async (updatedTask) => {
      const res = await axiosPublic.patch(`/tasks/${selectedTask._id}`, updatedTask);
      return res.data;
    },
    onSuccess: () => {
      // Show a success alert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      // Refetch the tasks after the update is successful
      refetch();
      // Close the modal
      document.getElementById('my_modal_3').close();
    },
    onError: (err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  });

  const onSubmit = (data) => {
    const updatedTask = {
      task_title: data.title,
      task_detail: data.details,
      submission_info: data.submissionInfo,
    };

    mutate(updatedTask); // Trigger the mutation to update the task
  };

  // Open modal and set selected task data
  const openModal = (task) => {
    setSelectedTask(task);
    // Reset the form before opening the modal
    reset({
      title: task.task_title,
      details: task.task_detail,
      submissionInfo: task.submission_info,
    });
    document.getElementById('my_modal_3').showModal();
  };

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
                  <FaRegEdit
                    onClick={() => openModal(task)}  // Set the selected task
                    className="text-2xl text-success-green cursor-pointer"
                  />
                  <FaTrash onClick={() => handleDelete(task._id)} className="text-2xl text-error-red cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="task-title">
                Task Title
              </label>
              <input
                {...register('title', { required: true })}
                type="text"
                id="task-title"
                className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                placeholder="Task Title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="task-details">
                Task Details
              </label>
              <textarea
                {...register('details', { required: true })}
                id="task-details"
                className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                placeholder="Task Details"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="submission-info">
                Submission Info
              </label>
              <textarea
                {...register('submissionInfo', { required: true })}
                id="submission-info"
                className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                placeholder="Submission Info"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-bg-primary text-white text-lg font-semibold rounded-md"
            >
              Update Task
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyTasks;
