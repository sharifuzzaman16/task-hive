import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../pages/Dashboard/Common/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../pages/Dashboard/Common/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Navbar (Make sure it has higher z-index on mobile) */}
            <DashboardNavbar toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex flex-grow pt-[75px]">
                {/* Sidebar (visible on desktop, hidden on mobile) */}
                <div className={`hidden md:block w-1/4 bg-bg-primary z-40`}>
                    <DashboardSidebar />
                </div>

                {/* Sidebar on mobile (hidden by default, visible when sidebarOpen is true) */}
                <div
                    className={`md:hidden fixed inset-0 bg-bg-primary transition-all duration-300 ease-in-out ${
                        sidebarOpen ? "block pt-[75px]" : "hidden"
                    } z-30`}
                >
                    <DashboardSidebar />
                </div>

                {/* Main Outlet */}
                <div className="w-full md:w-3/4 bg-bg-secondary overflow-auto p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
