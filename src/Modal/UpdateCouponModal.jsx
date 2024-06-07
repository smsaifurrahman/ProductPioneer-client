/** @format */

import PropTypes from "prop-types";
import {
   Dialog,
   Transition,
   TransitionChild,
   DialogPanel,
   DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const UpdateCouponModal = ({ coupon, isOpen }) => {

   const navigate = useNavigate()
   const handleUpdate = e => {
      e.preventDefault();
      console.log('clicked on modal');
      navigate('/dashboard/manage-coupons')
   }
   return (
      <div>
         <h1></h1>
         <input type="checkbox" id="my_modal_6" className="modal-toggle" />
         <div className="modal" role="dialog">
            <div className="modal-box">
               <form
                    onSubmit={handleUpdate}
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
                     {/* <button
                        type="submit"
                        className="btn "
                     >
                        Add Coupons
                     </button> */}
                     <div className="modal-action">
                        <label type='submit' htmlFor="my_modal_6" className="btn px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-700">
                           Close!
                        </label>
                     </div>
                     <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-700">
                           Close!
                        </label>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

UpdateCouponModal.propTypes = {
   setIsEditModalOpen: PropTypes.func,
   isOpen: PropTypes.bool,
};

export default UpdateCouponModal;
