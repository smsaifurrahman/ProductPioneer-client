/** @format */

import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Login = () => {
   const { googleSignIn,signIn } = useAuth();
   const axiosPublic = useAxiosPublic()
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   // handle login
   const handleLogin = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
 

      try {
        await signIn(email, password)
         navigate(from,  { replace: true });
         toast.success("Sign in Successful");
      } catch (err) {
         // console.log(err);
         toast.error(err.message);
        
      }
   };

   // Handle google sign in
   const handleGoogleSignIn = async () => {
      try {
        const result = await googleSignIn();
         // navigate(from);
       
         toast.success("Login in Successful");
         const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            role: 'regular',
            membership: 'unverified'
         }

        try{
         const {data} =  await axiosPublic.post('/users',userInfo) 
         console.log(data);
        } catch(err) {
         console.log(err.message);
        }



         navigate(from, { replace: true });
      } catch (err) {
         // console.log(err);
         toast.error(err.message);
      }
   };

   return (
     <div>
       <h1 className="text-center my-3 font-bold text-xl">Please login here</h1>
       <div className="w-full max-w-md p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      
         <div className="flex justify-center mx-auto">
            <img
               className="w-auto h-7 sm:h-8"
               src="https://merakiui.com/images/logo.svg"
               alt=""
            />
         </div>

         <form onSubmit={handleLogin} className="mt-6">
            <div>
               <label
                  htmlFor="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
               >
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
               />
            </div>

            <div className="mt-4">
               <div className="flex items-center justify-between">
                  <label
                     htmlFor="password"
                     className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                     Password
                  </label>
                  <a
                     href="#"
                     className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                  >
                     Forget Password?
                  </a>
               </div>

               <input
                  type="password"
                  name="password"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
               />
            </div>

            <div className="mt-6">
               <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign In
               </button>
            </div>
         </form>

         <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

            <a
               href="#"
               className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
               or login with Social Media
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
         </div>

         <div className="flex items-center mt-6 -mx-2">
            <button
               type="button"
               className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
            >
               <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
               </svg>

               <button onClick={handleGoogleSignIn} className=" mx-2 sm:inline">
                  Sign in with Google
               </button>
            </button>
         </div>

         <p className="mt-8 text-xs font-light text-center text-gray-400">
            <Link
               to={"/register"}
               href="#"
               className="text-sm  hover:underline dark:text-blue-400"
            >
               New here ?{" "}
               <span className="font-bold text-blue-500">Register</span>
            </Link>
         </p>
      </div>
     </div>
   );
};

export default Login;
