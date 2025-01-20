import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../../context/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const TaskDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: task, isLoading } = useQuery({
        queryKey: ["task", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/details/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-500">Loading task details...</p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const submission_details = e.target.submissionDetails.value;

        const submissionInfo = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            current_date: new Date(),
            worker_email: user.email,
            worker_name: user.displayName,
            buyer_name: task.buyer_name,
            buyer_email: task.buyer_email,
            submission_details: submission_details,
            status: 'pending',
        }

        axiosPublic.post('/submissions', submissionInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Work submit successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/submissions');
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



    return (
        <div>
            <Helmet>
                <title>{task.task_detail} - TaskHive</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">Task Details</h1>
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Task Details Section */}
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={task?.task_image_url}
                            alt={task?.task_title}
                            className="w-full h-64 md:h-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {task?.task_title}
                        </h1>
                        <p className="text-gray-700 mb-2">
                            <strong>Description:</strong> {task?.task_detail}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Required Workers:</strong> {task?.required_workers}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Payable Amount:</strong> ${task?.payable_amount}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Completion Date:</strong> {task?.completion_date}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Submission Info:</strong> {task?.submission_info}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Buyer Name:</strong> {task?.buyer_name}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Buyer Email:</strong> {task?.buyer_email}
                        </p>
                    </div>
                </div>

                {/* Submission Form */}
                <div className="p-6 border-t mt-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Submit Your Work
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="submissionDetails"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Submission Details:
                            </label>
                            <textarea
                                id="submissionDetails"
                                name="submissionDetails"
                                rows="6"
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-bg-primary p-4"
                                placeholder="Describe your work here..."
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            value={'Submit Work'}
                            className="w-full bg-bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow focus:ring-2 focus:ring-bg-primary focus:ring-offset-2 transition duration-300"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
