/** @format */

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
   const { createUser, updateUserProfile } = useAuth();
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";
   const handleRegister = async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const photo = form.photoURL.value;

      try {
         const result = await createUser(email, password);
         console.log(result);

         //3. Save username and photo
         await updateUserProfile(name, photo);

         // save user info in database
         const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            role: "regular",
            membership: "unverified",
         };

         try {
            const { data } = await axiosPublic.post("/users", userInfo);
            console.log(data);
         } catch (err) {
            console.log(err.message);
         }

         navigate(from, { replace: true });

         
         toast.success("Registration is Successful");
      } catch (err) {
         // console.log(err);
         toast.error(err.message);
      }
   };

   return (
      <section className="bg-white dark:bg-gray-900">
         <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form onSubmit={handleRegister} className="w-full max-w-md">
               <div className="flex justify-center mx-auto">
                  <img
                     className="w-auto h-7 sm:h-8"
                     src="https://merakiui.com/images/logo.svg"
                     alt=""
                  />
               </div>

               <div className="flex items-center justify-center mt-6">
                  <a
                     href="#"
                     className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                  >
                     Register here
                  </a>
               </div>

               <div className="relative flex items-center mt-8">
                  <span className="absolute">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                     </svg>
                  </span>

                  <input
                     type="text"
                     name="name"
                     className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Username"
                  />
               </div>

               <div className="relative flex items-center mt-6">
                  <span className="absolute">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                     </svg>
                  </span>

                  <input
                     type="email"
                     name="email"
                     className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Email address"
                  />
               </div>
               <div className="relative flex items-center mt-8">
                  <span className="absolute">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                     </svg>
                  </span>

                  <input
                     type="text"
                     name="photoURL"
                     className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="PhotoURL"
                  />
               </div>

               <div className="relative flex items-center mt-4">
                  <span className="absolute">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                     </svg>
                  </span>

                  <input
                     type="password"
                     name="password"
                     className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Password"
                  />
               </div>

               <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                     Register
                  </button>

                  <div className="mt-6 text-center ">
                     <Link
                        to={"/login"}
                        href="#"
                        className="text-sm  hover:underline dark:text-blue-400"
                     >
                        Already have an account?{" "}
                        <span className="font-bold text-blue-500">Login</span>
                     </Link>
                  </div>
               </div>
            </form>
         </div>
      </section>
   );
};

export default Register;
