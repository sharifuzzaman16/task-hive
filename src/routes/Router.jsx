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
import TaskDetails from "../pages/Dashboard/Worker/TaskList/TaskDetails/TaskDetails";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../components/Unauthorized";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute"


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
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "/dashboard/worker-home",
        element: <WorkerRoute><WorkerHome></WorkerHome></WorkerRoute>
      },
      {
        path: "/dashboard/tasks",
        element: <WorkerRoute><TaskList></TaskList></WorkerRoute>
      },
      {
        path: "/dashboard/tasks/details/:id",
        element: <WorkerRoute><TaskDetails></TaskDetails></WorkerRoute>
      },
      {
        path: "/dashboard/submissions",
        element: <WorkerRoute><MySubMissions></MySubMissions></WorkerRoute>
      },
      {
        path: "/dashboard/withdrawals",
        element: <WorkerRoute><Withdrawals></Withdrawals></WorkerRoute>
      },
      {
        path: "/dashboard/buyer-home",
        element: <BuyerRoute><BuyerHome></BuyerHome></BuyerRoute>
      },
      {
        path: "/dashboard/add-tasks",
        element: <BuyerRoute><AddNewTask></AddNewTask></BuyerRoute>
      },
      {
        path: "/dashboard/my-tasks",
        element: <BuyerRoute><MyTasks></MyTasks></BuyerRoute>
      },
      {
        path: "/dashboard/purchase",
        element: <BuyerRoute><PurchaseCoin></PurchaseCoin></BuyerRoute>
      },
      {
        path: "/dashboard/payment",
        element: <BuyerRoute><Payment></Payment></BuyerRoute>
      },
      {
        path: "/dashboard/payment-history",
        element: <BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute>
      },
      {
        path: "/dashboard/admin-home",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: "/dashboard/manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "/dashboard/manage-tasks",
        element: <AdminRoute><ManageTask></ManageTask></AdminRoute>
      },

    ]
  },
  {
    path: "/unauthorized",
    element: <Unauthorized></Unauthorized>
  }
]);

export default router;
