/** @format */

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Private from "./Private";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import MyProfile from "../Components/Dashboard/MyProfile/MyProfile";
import AddProduct from "../Form/AddProduct";
import MyProducts from "../Components/Dashboard/RegularUserMenu/MyProducts";
import UpdateProduct from "../Components/Dashboard/RegularUserMenu/UpdateProduct";
import ProductReviewPage from "../Pages/Dashboard/Moderator/ProductReviewPage";
import ReportedProducts from "../Pages/Dashboard/Moderator/ReportedProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import AddCoupons from "../Pages/Dashboard/Admin/AddCoupons";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import Products from "../Pages/Products";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Statistics from "../Pages/Dashboard/Admin/Statistics";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
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
         {
            path: "/private",
            element: (
               <PrivateRoute>
                  <Private></Private>
               </PrivateRoute>
            ),
         },
         {
            path: '/product-details/:id',
            element: <PrivateRoute> <ProductDetails></ProductDetails></PrivateRoute>
         },
         {
            path: '/products',
            element: <Products></Products>
         }
      ],
   },
   {
      path: "/dashboard",
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
         {
            path: "manage-users",
            element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>,
         },
         {
            path: "profile",
            element: (
               <PrivateRoute>
                  <MyProfile></MyProfile>
               </PrivateRoute>
            ),
         },
         {
            path: "add-product",
            element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
         },
         {
            path: "my-products",
            element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>,
         },
         {
            path: "update-product/:id",
            element: <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>,
         },
         {
            path: "product-review",
            element: <PrivateRoute><ModeratorRoute><ProductReviewPage></ProductReviewPage></ModeratorRoute></PrivateRoute>,
         },
         {
            path: "reported-products",
            element: <PrivateRoute><ModeratorRoute><ReportedProducts></ReportedProducts></ModeratorRoute></PrivateRoute>,
         },
         {
            path: 'add-coupons',
            element: <PrivateRoute><AdminRoute><AddCoupons></AddCoupons></AdminRoute></PrivateRoute>
         },
         {
            path: 'manage-coupons',
            element: <PrivateRoute> <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute></PrivateRoute>
         }
         ,
         {
            path: 'statistics',
            element: <PrivateRoute> <AdminRoute><Statistics></Statistics></AdminRoute></PrivateRoute>
         }
      ],
   },
]);

export default router;
