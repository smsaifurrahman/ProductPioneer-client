import React from 'react';
import { Link } from 'react-router-dom';

const CouponCard = ({coupon}) => {
    return (
        <div className=" mx-auto  shadow-lg bg-orange-50 rounded-2xl overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-5xl font-bold text-gray-800"> {coupon.discountPercent} % OFF</h2>
              <span className="text-xl text-gray-600">Expires: {coupon.expiryDate} </span>
            </div>
            <p className="mt-4 text-xl text-gray-600"> {coupon.description} </p>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/3 flex flex-col items-center">
            <div className="w-full">
              <span className="block text-gray-500">Coupon Code:</span>
              <span className="block text-xl font-bold text-gray-800 bg-gray-200 p-4 rounded mt-2 text-center"> {coupon.couponCode} </span>
            </div>
            <Link to={'/dashboard/profile'}  className="mt-6 text-center font-bold px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 w-full"> Subscribe </Link>
          </div>
        </div>
      </div>
      
    );
};

export default CouponCard;