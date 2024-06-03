/** @format */

import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { useState } from "react";
import PaymentModal from "../../../Modal/PaymentModal";

const MyProfile = () => {
   const { user } = useAuth() || {};
   const { data, isLoading, refetch} = useRole();
   const [isOpen, setIsOpen] = useState(false);
   const subscriptionFee = 50;
   const closeModal = () => {
      setIsOpen(false);
   };

   console.log(user);
   if(isLoading) return <span className="loading loading-dots loading-lg"></span>
   return (
      <div className="flex justify-center items-center h-screen ">
         <Helmet>
            <title>Profile</title>
         </Helmet>
         <div className=" bg-white shadow-lg rounded-2xl w-full md:p-0 p-2 md:w-4/6">
            <img
               alt="profile"
               src="https://i.ibb.co/zXMPWNs/sky.jpg"
               className="w-full mb-4 rounded-t-lg h-36"
            />
            <div className=" pl-8 -mt-16">
               <a href="#" className="relative block">
                  <img
                     alt="profile"
                     src={user.photoURL}
                     className="mx-auto object-cover rounded-full h-32 w-32  border-2 border-white "
                  />
               </a>
            </div>
         <div className="flex justify-between">
         <div className={` pl-4 ${data.membership === 'verified' && "md:ml-72 ml-4"} mb-6`}>
               {/* <p className="p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full">
                  {role} User
               </p> */}
               <p className="flex flex-col text-2xl mt-4 font-bold">
                  Name: {user?.displayName}
               </p>
               <p className=" text-xl">
                  Email:
                  <span className="font-bold ml-2 text-black ">
                     {user?.email}
                  </span>
               </p>
               <p className=" text-2xl font-bold">
                  Status:
                  <span className="text-green-500 uppercase ">
                     {" "}
                     {data?.membership}{" "}
                  </span>{" "}
               </p>
            </div>
            {
               data?.membership === 'unverified' && <div className="my-4">
               <p>Want to use your coupon?</p>
               <button
                  onClick={() => setIsOpen(true)}
                  className="bg-sky-500 font-bold px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-sky-300 block mb-1"
               >
                  Subscribe For only $ {subscriptionFee}
               </button>
            </div>
            }
         </div>
            {/* Payment Modal */}
            <PaymentModal
               refetch={refetch}
               subscriptionFee={subscriptionFee}
               closeModal={closeModal}
               isOpen={isOpen}
               user={user}
            ></PaymentModal>
         </div>
      </div>
   );
};

export default MyProfile;
