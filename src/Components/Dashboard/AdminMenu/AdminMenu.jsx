/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import MenuItem from "../MenuItem/MenuItem";
import { FcStatistics } from "react-icons/fc";
import { FaUsersLine } from "react-icons/fa6";
import { RiCoupon5Line } from "react-icons/ri";


const AdminMenu = () => {
   return (
      <div>
         <MenuItem icon={FcStatistics} address={'/dashboard/statistics'} label={'Statistics'}></MenuItem>
         <MenuItem icon={FaUsersLine} address={'/dashboard/manage-users'} label={'Manage User'}></MenuItem>
         <MenuItem icon={RiCoupon5Line} address={'/dashboard/coupons'} label={'Manage Coupons'}></MenuItem>
      </div>
   );
};

export default AdminMenu;
