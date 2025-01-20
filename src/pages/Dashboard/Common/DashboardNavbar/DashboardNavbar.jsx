import React, { useContext } from "react";
import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../context/AuthProvider";

const DashboardNavbar = ({ toggleSidebar }) => {
    const [user] = useUser();
    const { user: firebaseUser, logOut } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });
    const { data: notifications = [] } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications?email=${firebaseUser.email}`);
            return res.data;
        },
    });

    console.log(notifications)

    const totalAvailableCoins = users.reduce((total, user) => {
        return total + Number(user.availableCoin || 0); // Convert availableCoin to a number
    }, 0);

    return (
        <header className="bg-white border-b fixed z-50 w-full">
            <div className="navbar w-11/12 mx-auto h-[75px]">
                <div className="flex-1 flex items-center">
                    {/* Hamburger Button for Mobile */}
                    <button
                        className="md:hidden text-xl mr-4"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    <Link to={'/'} className="text-xl font-bold text-text-primary">TaskHive</Link>
                </div>
                <div className="flex-none gap-4 items-center">
                    <a className="bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full">
                        $ {user.role === 'admin' ? totalAvailableCoins : user.availableCoin} Coin
                    </a>
                    {
                        user.role === 'worker' && <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="indicator">
                                <FaRegBell className="text-2xl cursor-pointer" />
                                {
                                    notifications.length > 0 ? <span className="badge badge-xs bg-error-red indicator-item"></span> : ""
                                }
                            </div>
                            <div
                                tabIndex={0}
                                className="menu menu-sm mt-7 dropdown-content bg-base-200 rounded-lg z-[1] w-[450px] p-3 flex flex-col gap-3 shadow h-[500px] overflow-y-auto">
                                {
                                    notifications.map(notification => <div key={notification._id} className="bg-white p-4 rounded-lg w-full shadow">
                                        <h1 className="text-lg text-text-primary">{notification.message}</h1>
                                        <p className="text-text-secondary">{new Date(notification.time).toLocaleString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}</p>
                                    </div>)
                                }
                            </div>
                        </div>
                    }

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img
                                    alt={firebaseUser.displayName}
                                    src={firebaseUser.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-200 rounded-lg z-[1] mt-3 w-52 p-2 shadow">
                            {user.role === 'admin' && <li><Link to={'/dashboard/admin-home'}>Dashboard</Link></li>}
                            {user.role === 'worker' && <li><Link to={'/dashboard/worker-home'}>Dashboard</Link></li>}
                            {user.role === 'buyer' && <li><Link to={'/dashboard/buyer-home'}>Dashboard</Link></li>}
                            <li><a>Settings</a></li>
                            <li><a onClick={logOut}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
