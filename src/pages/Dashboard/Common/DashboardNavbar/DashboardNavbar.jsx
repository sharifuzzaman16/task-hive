import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useUser from "../../../../hooks/useUser";

const DashboardNavbar = () => {

    const [user] = useUser();
    console.log(user)
    return (
        <header className="bg-white border-b fixed z-50 w-full">
            <div className="navbar w-11/12 mx-auto h-[75px]">
                <div className="flex-1">
                    <Link to={'/'} className="text-xl font-bold text-text-primary">TaskHive</Link>
                </div>
                <div className="flex-none gap-4 items-center">
                    <a className="bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full">$ {user.availableCoin} Coin</a>
                    <FaRegBell className="text-2xl"></FaRegBell>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
