/** @format */

import { Link, NavLink, useNavigate } from "react-router-dom";
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
            <Link
               to={"/"}
               className="  font-bold  text-gray-500  cursor-pointer text-3xl"
            >
               Product
               <span className="text-orange-500 text-3xl ">Pioneer</span>
            </Link>
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

                     <li onClick={handleLogOut}>
                        <Link
                          
                           className=" text-xl font-sans justify-between"
                        >
                           Logout
                        </Link>
                     </li>
                  </ul>
               </div>
            ) : (
               <>
                  {" "}
                  <Link to={"/login"}>
                     {" "}
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold mr-2">Login</button>{" "}
                  </Link>
                  <Link to={"/register"}>
                     {" "}
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold">Register</button>{" "}
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default NavBar;
