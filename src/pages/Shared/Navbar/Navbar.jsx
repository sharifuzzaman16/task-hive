import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {

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
        <header className="bg-white border-b z-50 fixed w-full">
            <div className="navbar w-11/12  mx-auto h-[75px]">
                <div className="flex-1">
                    <Link to={'/'} className="text-xl font-bold text-text-primary">TaskHive</Link>
                </div>
                <div className="flex-none gap-4 items-center">
                    <a href="https://github.com/sharifuzzaman16" target="_balnk" className="hover:bg-bg-primary px-4 py-2.5 rounded-full border border-text-primary cursor-pointer hover:border-bg-primary hover:text-white text-text-primary">Join as a Developer</a>

                    {
                        firebaseUser ? <div className="flex items-center gap-4">
                            <a className="bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full">$ {user.role === 'admin' ? totalAvailableCoins : user.availableCoin} Coin</a>
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
                                    className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><Link to={'/dashboard/profile'}>Profile</Link></li>
                                    {user.role === 'admin' && <li><Link to={'/dashboard/admin-home'}>Dashboard</Link></li>}
                                    {user.role === 'worker' && <li><Link to={'/dashboard/worker-home'}>Dashboard</Link></li>}
                                    {user.role === 'buyer' && <li><Link to={'/dashboard/buyer-home'}>Dashboard</Link></li>}
                                    <li><a onClick={logOut}>Logout</a></li>
                                </ul>
                            </div>
                        </div> : <ul className="flex gap-2 mr-4">
                            <li>
                                <Link to={'/login'} className="link-hover cursor-pointer hover:text-bg-primary text-text-primary">Login</Link>
                            </li>
                            <li>
                                <a className="">/</a>
                            </li>
                            <li>
                                <Link to={'/register'} className="link-hover cursor-pointer hover:text-bg-primary text-text-primary">Register</Link>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </header>
    );
};

export default Navbar;