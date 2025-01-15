import React, { useContext } from "react";
import registerIllustration from "../../../assets/Mobile login-cuate.svg";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Registration successful!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        reset();
                        navigate('/dashboard');
                    })
                    .catch(err => {
                        console.log(err.message)
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: `${err.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            })
            .catch(err => {
                console.log(err.message)
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
        <div className="flex bg-white w-4/5 h-[700px] mx-auto shadow-lg my-10">
            {/* Left side with image */}
            <div className="w-1/2">
                <img className="w-full h-full object-cover" src={registerIllustration} alt="Registration Illustration" />
            </div>

            {/* Right side with registration form */}
            <div className="w-1/2 flex flex-col justify-center px-8 py-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Account</h2>
                <p className="text-gray-600 mb-4">Please fill in the details below to sign up.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="full-name">
                            Full Name
                        </label>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            id="full-name"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email', { required: true })}
                            type="email"
                            id="email"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Dropdown for Role (Worker/Buyer) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="role">
                            Role
                        </label>
                        <select
                            {...register('role', { required: true })}
                            id="role"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            required
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="worker">Worker</option>
                            <option value="buyer">Buyer</option>
                        </select>
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

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register('password', { required: true })}
                            type="password"
                            id="password"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            placeholder="Enter your password"
                            required
                        />
                    </div>



                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-bg-primary text-white text-lg font-semibold rounded-md"
                    >
                        Register
                    </button>
                </form>

                {/* Link to Login */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-bg-primary hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
