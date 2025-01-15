import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../pages/Dashboard/Common/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../pages/Dashboard/Common/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {


    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <DashboardNavbar />
            
            {/* Main Content */}
            <div className="flex flex-grow pt-[75px]">
                {/* Sidebar */}
                <div className="hidden md:block w-1/4 bg-bg-primary">
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
