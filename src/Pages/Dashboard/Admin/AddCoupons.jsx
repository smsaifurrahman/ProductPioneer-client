import React from 'react';
import Coupon from '../../../Form/Coupon';

const AddCoupons = () => {
    return (
        <div>
             <h2 className="text-3xl  font-bold text-center my-6">
            {" "}
             Add Coupons here
         </h2>
            <Coupon></Coupon>
        </div>
    );
};

export default AddCoupons;