/** @format */

import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import UpdateCouponModal from "../../../Modal/UpdateCouponModal";
import UpdateCoupon from "../../../Modal/UpdateCoupon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageCoupons = () => {
   const axiosSecure = useAxiosSecure();

   const [coupon, setCoupon] = useState();
   const [isOpen, setIsOpen] = useState(false);

   const closeModal = () => {
      setIsOpen(false);
   };

   const {
      data: coupons = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["coupons"],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/coupons`);
         return data;
      },
   });

     // delete Coupon
  const { mutateAsync } = useMutation({
   mutationFn: async (couponId) => {
     const { data } = await axiosSecure.delete(`/coupons/${couponId}`);
     return data;
   },
   onSuccess: (data) => {
     refetch();
   //   toast.success('Coupon deleted successfully');
   }
 });

   // Delete coupon
  const handleDelete = async (couponId) => {


   try {
     Swal.fire({
       title: "Are you sure?",
       text: `You want to delete the coupon?`,
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes"
     }).then(async (result) => {
       if (result.isConfirmed) {
        await mutateAsync(couponId)
         Swal.fire({
           title: "Deleted!",
           text: "Coupon has been deleted.",
           icon: "success"
         });
       }
     });
   } catch (err) {
     console.log(err);
     toast.error(err.message);
   }
 };



   return (
      <div>
         <h2 className="text-3xl  font-bold text-center my-6">
            {" "}
            All Coupons here
         </h2>

         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead  className="font-bold text-xl text-black">
                  <tr >
                     <th>#</th>
                     <th>Coupon Code</th>
                     <th className=""> Description </th>
                     <th> Expiry Date </th>
                     <th> Discount % </th>
                     <th> Actions </th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {coupons.map((coupon, index) => (
                     <tr key={coupon._d}>
                        <th> {index + 1} </th>
                        <td> {coupon.couponCode} </td>
                        <td> {coupon.description} </td>
                        <td className="text-center"> {coupon.expiryDate} </td>
                        <td className="text-center">
                           {" "}
                           {coupon.discountPercent} %{" "}
                        </td>
                        <td className="flex items-center gap-2">
                           {" "}
                           <button
                              onClick={() => {
                                 setCoupon(coupon);
                                 setIsOpen(true);
                              }}
                              htmlFor="my_modal_6"
                              className="btn"
                           >
                              Update
                           </button>
                           <MdDelete onClick={()=> handleDelete(coupon._id)} className="text-4xl text-red-500"></MdDelete>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {/* The button to open modal */}
         {/* <label htmlFor="my_modal_6" className="btn">
            open modal
         </label> */}

         {/* Put this part before </body> tag */}
         <UpdateCoupon
            closeModal={closeModal}
            setIsOpen={setIsOpen}
            refetch={refetch}
            isOpen={isOpen}
            coupon={coupon}
         ></UpdateCoupon>
         {/* <input type="checkbox" id="my_modal_6" className="modal-toggle" />
         <div className="modal" role="dialog">
            <div className="modal-box">
               <form
                //   onSubmit={handleSubmit}
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
               <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                     Close!
                  </label>
               </div>
            </div>
         </div> */}
      </div>
   );
};

export default ManageCoupons;
