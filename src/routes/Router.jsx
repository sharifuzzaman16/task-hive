import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome/BuyerHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
  }
]);

export default router;
