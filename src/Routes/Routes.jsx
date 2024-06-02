import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Private from "./Private";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";

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
      element: <DashboardLayout></DashboardLayout>
    }
  ]);
  
  export default router;