/** @format */

import MenuItem from "../MenuItem/MenuItem";
import { FaRegUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { SiBookmyshow } from "react-icons/si";




const RegularUserMenu = () => {
   return (
      <div>
         <MenuItem
            icon={FaRegUser}
            address={"/dashboard/profile"}
            label={"My Profile"}
         ></MenuItem>
         <MenuItem
            icon={IoMdAdd}
            address={"/dashboard/manage-users"}
            label={"Add Product"}
         ></MenuItem>
         <MenuItem
            icon={SiBookmyshow}
            address={"/dashboard/coupons"}
            label={"My Products"}
         ></MenuItem>
      </div>
   );
};

export default RegularUserMenu;
