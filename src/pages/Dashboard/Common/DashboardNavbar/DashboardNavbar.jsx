import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
    const user = {
        name: 'John Doe',
        role: 'Buyer', // Can be 'Worker', 'Buyer', or 'Admin'
        email: 'johndoe@example.com',
        totalTasks: 12,
        totalEarnings: 50,
    };// Fetching user data from the context
    return (
        <header className="bg-white border-b fixed z-50 w-full">
            <div className="navbar w-11/12 mx-auto h-[75px]">
                <div className="flex-1">
                    <Link to={'/'} className="text-xl font-bold text-text-primary">TaskHive</Link>
                </div>
                <div className="flex-none gap-4 items-center">
                    <a className="bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full">$ 400 Coin</a>
                    <FaRegBell className="text-2xl"></FaRegBell>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
