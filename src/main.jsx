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
import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
         <Toaster />
      </AuthProvider>
      </QueryClientProvider>
   </React.StrictMode>
);
