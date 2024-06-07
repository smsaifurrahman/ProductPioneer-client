/** @format */

import PropTypes from "prop-types";
import {
   Dialog,
   Transition,
   TransitionChild,
   DialogPanel,
   DialogTitle,
} from "@headlessui/react";
// import { format } from 'date-fns'
import { Fragment } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateCoupon = ({ closeModal, refetch, isOpen, coupon, user }) => {


    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
       mutationFn: async (couponData) => {
          const { data } = await axiosSecure.patch(`/coupons/${coupon._id}`, couponData);
          return data;
       },
       onSuccess: () => {
          toast.success("Coupon is updated successfully");
          closeModal()
          refetch();
 
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
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <TransitionChild
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <TransitionChild
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 scale-95"
                     enterTo="opacity-100 scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95"
                  >
                     <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <DialogTitle
                           as="h3"
                           className="text-lg font-medium text-center leading-6 text-gray-900"
                        >
                           Review Information before subscribing
                        </DialogTitle>

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
                                 defaultValue={coupon?.couponCode}
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
                                 defaultValue={coupon?.expiryDate}
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
                                 defaultValue={coupon?.discountPercent}
                                 name="discountPercent"
                                 required
                              />
                           </div>
                           <div className="md:col-span-2">
                              <label className="block font-bold text-gray-700">
                                 Description:
                              </label>
                              <textarea
                                 defaultValue={coupon?.description}
                                 name="description"
                                 className="w-full px-3 py-2 border rounded"
                                 required
                              />
                           </div>

                           <div className="md:col-span-2 flex justify-between items-center btn-secondary">
                              <button  type="submit" className="btn ">
                                 Update
                              </button>
                              <button
                                 onClick={closeModal}
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                              >
                                 Cancel
                              </button>
                           </div>
                        </form>
                     </DialogPanel>
                  </TransitionChild>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
};

UpdateCoupon.propTypes = {
   bookingInfo: PropTypes.object,
   closeModal: PropTypes.func,
   isOpen: PropTypes.bool,
};

export default UpdateCoupon;
