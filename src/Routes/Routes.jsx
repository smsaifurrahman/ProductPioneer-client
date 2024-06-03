import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Private from "./Private";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
           path: '/',
           element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>

        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
          path: '/private',
          element: <PrivateRoute><Private></Private></PrivateRoute>

        }
      ]
     
    },
    {
      path: '/dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children: [
        {
          path: 'manage-users',
          element: <ManageUsers></ManageUsers>
        }
      ]
    }
  ]);
  
  export default router;