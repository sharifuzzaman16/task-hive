import React from "react";
import { Link } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdPayment, MdSubject } from "react-icons/md";
import { FaHouse, FaUsers } from "react-icons/fa6";
import { FaCog, FaHistory, FaTasks } from "react-icons/fa";
import useUser from "../../../../hooks/useUser";

const DashboardSidebar = () => {
    const [user] = useUser();

    const navigationConfig = {
        worker: [
            { to: "/dashboard/worker-home", label: "Home", icon: <FaHouse /> },
            { to: "/dashboard/tasks", label: "Tasks List", icon: <FaTasks /> },
            { to: "/dashboard/submissions", label: "My Submissions", icon: <MdSubject /> },
            { to: "/dashboard/withdrawals", label: "Withdrawals", icon: <BiMoneyWithdraw /> },
        ],
        buyer: [
            { to: "/dashboard/buyer-home", label: "Home", icon: <FaHouse /> },
            { to: "/dashboard/add-tasks", label: "Add New Tasks", icon: <FaTasks /> },
            { to: "/dashboard/my-tasks", label: "My Tasks", icon: <MdSubject /> },
            { to: "/dashboard/purchase", label: "Purchase Coin", icon: <MdPayment /> },
            { to: "/dashboard/payment-history", label: "Payment History", icon: <FaHistory /> },
        ],
        admin: [
            { to: "/dashboard/admin-home", label: "Home", icon: <FaHouse /> },
            { to: "/dashboard/manage-users", label: "Manage Users", icon: <FaUsers /> },
            { to: "/dashboard/manage-tasks", label: "Manage Tasks", icon: <FaTasks /> },
            { to: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
        ],
    };

    const menuItems = navigationConfig[user.role] || [];

    return (
        <div className="bg-bg-primary flex flex-col items-center  h-full text-text-primary p-5">
            <div className="flex flex-col items-center">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <h2 className="text-xl capitalize mt-2 font-semibold">{user.name} <span>({user.role})</span></h2>
            </div>
            <div className="divider"></div>
            <nav className="flex w-full flex-col space-y-4">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className="flex items-center space-x-2 hover:bg-gray-700 p-2 text-lg text-text-primary hover:text-white rounded"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default DashboardSidebar;
