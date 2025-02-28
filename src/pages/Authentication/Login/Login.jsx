import React, { useContext } from "react";
import loginIllustrations from "../../../assets/Sign in-pana.svg";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Helmet } from "react-helmet-async";

const Login = () => {

    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        loginUser(data.email, data.password)
            .then(result => {
                navigate('/');
                reset();
            })
            .catch(err => {
                // Show SweetAlert for incorrect login
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                });
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    role: 'worker',
                    availableCoin: 10,
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate('/dashboard');
                        }
                    })
                    .catch(err => {
                    });
            })
            .catch(err => {
                // Show SweetAlert for Google login failure
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: 'There was an issue logging in with Google. Please try again.',
                });
            });
    };

    return (
        <div className="flex bg-white w-4/5 h-[550px] mx-auto shadow-lg my-10">
            <Helmet>
                    <title>Login - TaskHive</title>
                  </Helmet>
            {/* Left side with image */}
            <div className="w-1/2">
                <img className="w-full h-full object-cover" src={loginIllustrations} alt="Login Illustration" />
            </div>

            {/* Right side with login form */}
            <div className="w-1/2 flex flex-col justify-center px-8 py-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
                <p className="text-gray-600 mb-4">Please login to your account.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
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

                    <div className="mb-6">
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

                    <button
                        type="submit"
                        className="w-full py-2.5 bg-bg-primary text-white text-lg font-semibold rounded-md"
                    >
                        Login
                    </button>
                </form>

                {/* Google Login Button */}
                <div className="flex justify-center my-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500 text-white text-lg font-semibold rounded-md"
                    >
                        <FcGoogle className="text-xl"></FcGoogle>Sign in with Google
                    </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-bg-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
