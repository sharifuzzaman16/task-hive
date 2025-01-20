import React, { useContext, useState } from "react";
import registerIllustration from "../../../assets/Mobile login-cuate.svg";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const image_hosting_key = import.meta.env.VITE_image_hosting_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [passwordStrength, setPasswordStrength] = useState("");

    // Check password strength
    const checkPasswordStrength = (password) => {
        const strength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setPasswordStrength(strength.test(password) ? "strong" : "weak");
    };

    const onSubmit = async (data) => {
        const imageFile = { image: data.photo[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (res.data.success) {
            createUser(data.email, data.password)
                .then((result) => {
                    updateUserProfile(data.name, res.data.data.display_url)
                        .then(() => {
                            const availableCoin = data.role === "buyer" ? 50 : 10;
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                photo: res.data.data.display_url,
                                role: data.role,
                                availableCoin,
                            };
                            axiosPublic
                                .post("/users", userInfo)
                                .then((res) => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            title: "Registration successful!",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        });
                                        reset();
                                        navigate("/");
                                    }
                                })
                                .catch((err) => {
                                    Swal.fire({
                                        position: "center",
                                        icon: "error",
                                        title: `${err.message}`,
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                });
                        })
                        .catch((err) => {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: `${err.message}`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        });
                })
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${err.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    };

    return (
        <div className="flex bg-white w-4/5 h-[700px] mx-auto shadow-lg my-10">
            <Helmet>
                    <title>Register - TaskHive</title>
                  </Helmet>
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
                            {...register("name", { required: "Full Name is required" })}
                            type="text"
                            id="full-name"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            id="email"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Dropdown for Role (Worker/Buyer) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="role">
                            Role
                        </label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            id="role"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                        >
                            <option value="" disabled>
                                Select your role
                            </option>
                            <option value="worker">Worker</option>
                            <option value="buyer">Buyer</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                onChange: (e) => checkPasswordStrength(e.target.value),
                            })}
                            type="password"
                            id="password"
                            className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-primary"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        <p className={`mt-1 text-sm ${passwordStrength === "strong" ? "text-green-500" : "text-red-500"}`}>
                            {passwordStrength === "strong" ? "Password is strong" : "Password is weak"}
                        </p>
                    </div>

                    {/* Photo URL */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="photo-url">
                            Photo URL
                        </label>
                        <input
                            {...register("photo", { required: "Photo is required" })}
                            required
                            type="file"
                            className="file-input file-input-bordered w-full mt-2"
                        />
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="w-full py-2.5 bg-bg-primary text-white text-lg font-semibold rounded-md">
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
