import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import TaskList from "../pages/Dashboard/Worker/TaskList/TaskList"
import MySubMissions from "../pages/Dashboard/Worker/MySubMissions/MySubMissions";
import Withdrawals from "../pages/Dashboard/Worker/Withdrawals/Withdrawals";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import ManageTask from "../pages/Dashboard/Admin/ManageTask/ManageTask";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome"
import AddNewTask from "../pages/Dashboard/Buyer/AddNewTask/AddNewTask";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks/MyTasks";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin/PurchaseCoin";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome/BuyerHome";
import Payment from "../pages/Dashboard/Buyer/PurchaseCoin/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory/PaymentHistory";


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
    children: [
      {
        path: "/dashboard/worker-home",
        element: <WorkerHome></WorkerHome>
      },
      {
        path: "/dashboard/tasks",
        element: <TaskList></TaskList>
      },
      {
        path: "/dashboard/submissions",
        element: <MySubMissions></MySubMissions>
      },
      {
        path: "/dashboard/withdrawals",
        element: <Withdrawals></Withdrawals>
      },
      {
        path: "/dashboard/buyer-home",
        element: <BuyerHome></BuyerHome>
      },
      {
        path: "/dashboard/add-tasks",
        element: <AddNewTask></AddNewTask>
      },
      {
        path: "/dashboard/my-tasks",
        element: <MyTasks></MyTasks>
      },
      {
        path: "/dashboard/purchase",
        element: <PurchaseCoin></PurchaseCoin>
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "/dashboard/admin-home",
        element: <AdminHome></AdminHome>
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "/dashboard/manage-tasks",
        element: <ManageTask></ManageTask>
      },

    ]
  }
]);

export default router;
