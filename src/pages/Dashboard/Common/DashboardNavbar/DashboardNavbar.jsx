import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const DashboardNavbar = () => {

    const [user] = useUser();

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const totalAvailableCoins = users.reduce((total, user) => {
        return total + Number(user.availableCoin || 0); // Convert availableCoin to a number
    }, 0);


    return (
        <header className="bg-white border-b fixed z-50 w-full">
            <div className="navbar w-11/12 mx-auto h-[75px]">
                <div className="flex-1">
                    <Link to={'/'} className="text-xl font-bold text-text-primary">TaskHive</Link>
                </div>
                <div className="flex-none gap-4 items-center">
                    <a className="bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full">$ {user.role === 'admin' ? totalAvailableCoins : user.availableCoin} Coin</a>
                    <FaRegBell className="text-2xl"></FaRegBell>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
