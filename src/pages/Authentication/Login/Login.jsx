import React from "react";
import loginIllustrations from "../../../assets/Sign in-pana.svg";

const Login = () => {
    return (
        <div className="flex bg-white w-4/5 h-[550px] mx-auto shadow-lg my-10">
            {/* Left side with image */}
            <div className="w-1/2">
                <img className="w-full h-full object-cover" src={loginIllustrations} alt="Login Illustration" />
            </div>

            {/* Right side with login form */}
            <div className="w-1/2 flex flex-col justify-center px-8 py-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
                <p className="text-gray-600 mb-4">Please login to your account.</p>

                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-bg-primary text-white text-lg font-semibold rounded-md"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-bg-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
