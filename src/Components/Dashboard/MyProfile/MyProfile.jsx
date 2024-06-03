/** @format */

import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { useState } from "react";
import PaymentModal from "../../../Modal/PaymentModal";

const MyProfile = () => {
   const { user } = useAuth() || {};
   const {data} = useRole();
   const [isOpen,setIsOpen] = useState(false);
   const closeModal = () => {
    setIsOpen(false)
 }

   console.log(user);
   return (
      <div className="flex justify-center items-center h-screen ">
         <Helmet>
            <title>Profile</title>
         </Helmet>
         <div className="bg-white shadow-lg rounded-2xl w-3/5">
            {/* <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        /> */}
            <div className="flex flex-col items-center justify-center p-4 -mt-16">
               <a href="#" className="relative block">
                  <img
                     alt="profile"
                     src={user.photoURL}
                     className="mx-auto object-cover rounded-full h-32 w-32  border-2 border-white "
                  />
               </a>

               {/* <p className="p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full">
                  {role} User
               </p> */}
               <p className="flex flex-col text-2xl my-4 font-bold">{user?.displayName}</p>
               <p className="flex flex-col text-2xl font-bold">Status: {data?.membership} </p>
               
               <div className="w-full p-2 mt-4 rounded-lg">
                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
                     
                     <p className=" text-xl">
                        Email:   
                        <span className="font-bold ml-2 text-black ">
                           {user?.email}
                        </span>
                     </p>

                     <div>
                        <button onClick={()=> setIsOpen(true)}  className="bg-sky-500 font-bold px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1">
                           Subscribe
                        </button>
                      
                     </div>
                     {/* Payment Modal */}
                     <PaymentModal closeModal={closeModal} isOpen={isOpen} user={user}  ></PaymentModal>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MyProfile;
