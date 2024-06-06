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

const router = createBrowserRouter([
   {
      path: "/",
      element: <Main></Main>,
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
            element: <ProductDetails></ProductDetails>
         },
      ],
   },
   {
      path: "/dashboard",
      element: <DashboardLayout></DashboardLayout>,
      children: [
         {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>,
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
            element: <AddProduct></AddProduct>,
         },
         {
            path: "my-products",
            element: <MyProducts></MyProducts>,
         },
         {
            path: "update-product/:id",
            element: <UpdateProduct></UpdateProduct>,
         },
         {
            path: "product-review",
            element: <ProductReviewPage></ProductReviewPage>,
         },
         {
            path: "reported-products",
            element: <ReportedProducts></ReportedProducts>,
         },
      ],
   },
]);

export default router;
