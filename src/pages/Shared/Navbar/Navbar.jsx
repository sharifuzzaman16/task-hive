import { Link } from "react-router-dom";

const Navbar = () => {

    const user = false;

    return (
        <header className="bg-white border-b">
            <div className="navbar w-11/12 mx-auto h-[75px]">
                <div className="flex-1">
                    <Link to={'/'} className="text-xl font-bold text-text-primary">TaskHive</Link>
                </div>
                <div className="flex-none gap-4 items-center">
                    <a className="hover:bg-bg-primary px-4 py-2.5 rounded-full border border-text-primary cursor-pointer hover:border-bg-primary hover:text-white text-text-primary">Join as a Developer</a>
                    
                    {
                        user ? <div className="flex items-center gap-4">
                            <a className="bg-[#FFF4E6] text-text-primary py-2.5 px-4 rounded-full shadow-sm">$ 400 Coin</a>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><a>Dashboard</a></li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        </div> : <ul className="flex gap-2 mr-4">
                            <li>
                                <a className="link-hover cursor-pointer hover:text-bg-primary text-text-primary">Login</a>
                            </li>
                            <li>
                                <a className="">/</a>
                            </li>
                            <li>
                                <a className="link-hover cursor-pointer hover:text-bg-primary text-text-primary">Register</a>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </header>
    );
};

export default Navbar;