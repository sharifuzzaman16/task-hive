import React from "react";
import { useForm } from "react-hook-form";
import useUser from "../../../../hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddNewTask = () => {

  const [user, refetch] = useUser();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    const requiredWorkers = parseInt(data.requiredWorkers);
    const payableAmount = parseInt(data.payableAmount);
    const availableCoin = user.availableCoin;
    const totalPayableAmount = requiredWorkers * payableAmount;
    if (totalPayableAmount > availableCoin) {
      Swal.fire({
        title: "Not available Coin",
        text: "You don't have enough coin!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#ff8c42",
        cancelButtonColor: "#d33",
        confirmButtonText: "Purchase Coin!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard/purchase');
        }
      });
    }
    else {

      const taskInfo = {
        task_title: data.title,
        task_detail: data.details,
        required_workers: data.requiredWorkers,
        payable_amount: data.payableAmount,
        completion_date: data.completionDate,
        submission_info: data.submissionInfo,
        task_image_url: data.photo,
        user_email: user.email,

      }

      axiosPublic.post('/tasks', taskInfo)
        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Task added successful!",
              showConfirmButton: false,
              timer: 1500
            });
            reset();
            navigate('/dashboard/my-tasks');
            refetch();
          }
        })
        .catch(err => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1500
          });
        })
    }
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
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
        <div className="mb-4 flex gap-4 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700" htmlFor="required-workers">
              Required Workers
            </label>
            <input
              {...register('requiredWorkers', { required: true })}
              id="required-workers"
              type="number"
              className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
              placeholder="Required Workers"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700" htmlFor="required-workers">
              Payable Amount
            </label>
            <input
              {...register('payableAmount', { required: true })}
              id="required-workers"
              type="number"
              className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
              placeholder="Payable Amount"
              required
            />
          </div>
        </div>



        {/* Photo URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="photo-url">
            Photo URL
          </label>
          <input
            {...register('photo', { required: true })}
            type="url"
            id="photo-url"
            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
            placeholder="Enter your photo URL"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="completion-date">
            Completion Date
          </label>
          <input
            {...register('completionDate', { required: true })}
            type="date"
            id="completion-date"
            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
            placeholder="Completion Date"
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
          Add New Task
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;
