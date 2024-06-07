/** @format */

import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Coupon = () => {
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate()

   const { mutateAsync } = useMutation({
      mutationFn: async (couponData) => {
         const { data } = await axiosSecure.post(`/coupons`, couponData);
         return data;
      },
      onSuccess: () => {
         toast.success("Coupon is added successfully");
         navigate('/dashboard/manage-coupons')

         //    navigate('/dashboard/my-products');
         //    setLoading(false);
      },
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      // setLoading(true);
      const form = e.target;
      const couponCode = form.code.value;
      const expiryDate = form.date.value;
      const description = form.description.value;
      const discountPercent = form.discountPercent.value;

      const couponData = {
         couponCode,
         expiryDate,
         description,
         discountPercent,
      };

      try {
         await mutateAsync(couponData);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="md:w-3/5 md:ml-48 p-4 border-2 rounded-2xl">
         <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
         >
            <div className="md:col-span-2">
               <label className="block font-bold text-gray-700">
                  Coupon code:
               </label>
               <input
                  type="text"
                  name="code"
                  className="w-full px-3 py-2 border rounded"
                  required
               />
            </div>
            <div className="md:col-span-2">
               <label className="block font-bold text-gray-700">
                  Expiry date:
               </label>
               <input
                  type="date"
                  name="date"
                  className="w-full px-3 py-2 border rounded"
                  required
               />
            </div>
            <div className="md:col-span-2">
               <label className="block font-bold text-gray-700">
                  Discount %
               </label>
               <input
                  className="w-full px-3 py-2 border rounded"
                  type="number"
                  name="discountPercent"
                  required
               />
            </div>
            <div className="md:col-span-2">
               <label className="block font-bold text-gray-700">
                  Description:
               </label>
               <textarea
                  name="description"
                  className="w-full px-3 py-2 border rounded"
                  required
               />
            </div>

            <div className="md:col-span-2">
               <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-700"
               >
                  Add Coupons
               </button>
            </div>
         </form>
      </div>
   );
};

export default Coupon;
