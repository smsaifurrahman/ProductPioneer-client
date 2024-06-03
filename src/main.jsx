/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
     <HelmetProvider>
     <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
         <Toaster />
      </AuthProvider>
      </QueryClientProvider>
     </HelmetProvider>
   </React.StrictMode>
);
