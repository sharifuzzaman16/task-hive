import { Outlet, Navigate } from "react-router-dom";
import DashboardNavbar from "../../pages/Dashboard/Common/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../pages/Dashboard/Common/DashboardSidebar/DashboardSidebar";
import WorkerHome from "../../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import BuyerHome from "../../pages/Dashboard/Buyer/BuyerHome/BuyerHome";
import AdminHome from "../../pages/Dashboard/Admin/AdminHome/AdminHome";

const DashboardLayout = () => {
    // Replace this with your actual authentication or context data
    const user = {
        role: "buyer", // Example: "worker", "buyer", or "admin"
    };

    // Determine which component to show based on the user's role
    const getDashboardHome = () => {
        if (user.role === "worker") {
            return <WorkerHome />;
        } else if (user.role === "buyer") {
            return <BuyerHome />;
        } else if (user.role === "admin") {
            return <AdminHome />;
        } else {
            // Redirect to login or error page if the role is invalid
            return <Navigate to="/login" />;
        }
    };

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
                    {/* Show the default dashboard home based on the role */}
                    <Outlet />
                    {getDashboardHome()}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
