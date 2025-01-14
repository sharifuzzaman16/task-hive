import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Shared/Navbar/Navbar";
import Footer from "../../pages/Shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-screen-2xl mx-auto bg-[#FFF4E6]">
            <Navbar></Navbar>
            <main className="min-h-screen pt-[75px]">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;