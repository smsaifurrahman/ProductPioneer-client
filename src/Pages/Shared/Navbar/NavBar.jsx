/** @format */

import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const NavBar = () => {
   const { logOut, user } = useAuth();

   const navLinks = (
      <>
      <li>
      <NavLink
            to={"/"}
            className={({ isActive }) =>
               isActive
                  ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                  : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
            }
         >
            Home
         </NavLink>
      </li>
      <li>
      <NavLink
            to={"/products"}
            className={({ isActive }) =>
               isActive
                  ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                  : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
            }
         >
            Products
         </NavLink>
      </li>
      {/* <li>
      <NavLink
            to={"/"}
            className={({ isActive }) =>
               isActive
                  ? " font-bold text-xl text-gray-500 p-2 text-rounded-xl "
                  : "font-bold p-2 text-xl text-sky-500 rounded-xl "
            }
         >
            Home
         </NavLink>
      </li> */}
         {/* <li>
            {" "}
            <Link to={"/"}>Home</Link>{" "}
         </li>
         <li>
            {" "}
            <Link to={"/products"}>Products</Link>{" "}
         </li>
         {user && (
            <li>
               {" "}
               <Link to={"/private"}>Private</Link>{" "}
            </li>
         )} */}
      </>
   );

   //handle Logout
   const handleLogOut = async () => {
      try {
         await logOut();
         toast.success("You are logged out");
      } catch (err) {
         toast.error(err.message);
      }
   };

   return (
      <div className="navbar bg-base-100">
         <div className="navbar-start">
            <div className="dropdown">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-42"
               >
                  {navLinks}
               </ul>
            </div>
            <a className="btn btn-ghost text-3xl">ProductPioneer</a>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
         </div>
         <div className="navbar-end">
            {user ? (
               <div className="dropdown dropdown-end">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           title={user?.displayName}
                           referrerPolicy="no-referrer"
                           alt="Tailwind CSS Navbar component"
                           src={user?.photoURL}
                        />
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-48"
                  >
                     <li className="ml-3 text-xl font-bold">
                        {user?.displayName}
                     </li>
                     <li>
                        <Link
                           to={"/dashboard"}
                           className=" text-xl font-sans justify-between"
                        >
                           Dashboard
                        </Link>
                     </li>

                     <li
                      
                        onClick={handleLogOut}
                     >
                      <Link to={'/'}  className=" text-xl font-sans justify-between">Logout</Link>
                     </li>
                  </ul>
               </div>
            ) : (
               <>
                  {" "}
                  <Link to={"/login"}>
                     {" "}
                     <button className="btn mr-2">Login</button>{" "}
                  </Link>
                  <Link to={"/register"}>
                     {" "}
                     <button className="btn">Register</button>{" "}
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default NavBar;
