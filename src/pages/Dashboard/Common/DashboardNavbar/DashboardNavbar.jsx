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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0}>
                            <FaRegBell className="text-2xl cursor-pointer" />
                        </div>
                        <div
                            tabIndex={0}
                            className="menu menu-sm mt-7 dropdown-content bg-base-200 rounded-lg z-[1] w-80 p-3 flex flex-col gap-3 shadow max-h-80 overflow-y-auto">
                            <div className="bg-white p-4 rounded-lg w-full shadow">
                                <h1 className="text-lg text-text-primary">Lorem ipsum dolor sit amet.</h1>
                                <p className="text-text-secondary">20-Jan-2025</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg w-full shadow-lg">
                                <h1 className="text-lg text-text-primary">Lorem ipsum dolor sit amet.</h1>
                                <p className="text-text-secondary">20-Jan-2025</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg w-full shadow-lg">
                                <h1 className="text-lg text-text-primary">Lorem ipsum dolor sit amet.</h1>
                                <p className="text-text-secondary">20-Jan-2025</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg w-full shadow-lg">
                                <h1 className="text-lg text-text-primary">Lorem ipsum dolor sit amet.</h1>
                                <p className="text-text-secondary">20-Jan-2025</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg w-full shadow-lg">
                                <h1 className="text-lg text-text-primary">Lorem ipsum dolor sit amet.</h1>
                                <p className="text-text-secondary">20-Jan-2025</p>
                            </div>
                        </div>
                    </div>

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
