/** @format */

import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { useState } from "react";
import PaymentModal from "../../../Modal/PaymentModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyProfile = () => {
   const { user } = useAuth() || {};
   const { data, isLoading, refetch } = useRole();
   const [isOpen, setIsOpen] = useState(false);
   const axiosSecure = useAxiosSecure();
   const [couponApplied, setCouponApplied] = useState(false);
   const [subscriptionFee, setSubscriptionFee] = useState(250);
   // let subscriptionFee = 250;
   const closeModal = () => {
      setIsOpen(false);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const couponCode = form.couponCode.value;
      const { data } = await axiosSecure.get(`/coupons/discount/${couponCode}`);
      if (data.message) {
         return toast.error("Please Enter a valid Coupon");
      }

      // discount amount
      const discountedAmount = subscriptionFee - subscriptionFee * (data / 100);

      setSubscriptionFee(discountedAmount);
      setCouponApplied(true);
   };

   console.log(user);
   if (isLoading)
      return <span className="loading loading-dots loading-lg"></span>;
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
               <div
                  className={` pl-4 ${
                     data.membership === "verified" && "md:ml-60 ml-4"
                  } mb-6`}
               >
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
                  <p className=" text-2xl  font-bold">
                     Status: 
                     <span className={ `${data.membership==='unverified'? 'uppercase text-red-400 ml-2' : 'text-green-500 uppercase ml-2'  }  `}>
                        
                        {data?.membership}
                     </span>
                  </p>
               </div>
               {data?.membership === "unverified" && (
                  <div className="my-4">
                     {couponApplied ? (
                        <p className="my-3 mr-4 font-bold text-green-500 text-xl">
                           
                           Congratulations!! You Got Discount. 
                            <br />
                            Subscribe Now!!
                           
                        </p>
                     ) : (
                        <div>
                           <p>Want to use your coupon?</p>
                           <div className="my-4">
                              <form onSubmit={handleSubmit}>
                                 <input
                                    className="w-3/5 mr-2 px-3 py-2 border rounded"
                                    type="text"
                                    name="couponCode"
                                 />
                                 <input
                                    className="btn bg-green-500 text-white px-3 py-2 "
                                    type="submit"
                                    value={"Apply"}
                                 />
                              </form>
                           </div>
                        </div>
                     )}

                     <button
                        onClick={() => setIsOpen(true)}
                        className="bg-sky-500 font-bold px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-sky-300 block mb-1"
                     >
                        Subscribe For only $ {subscriptionFee}/month
                     </button>
                  </div>
               )}
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
