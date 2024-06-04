/** @format */


import React from "react";
import { MdPreview } from "react-icons/md";
import { TbReportOff } from "react-icons/tb";
import MenuItem from "../MenuItem/MenuItem";

const ModeratorMenu = () => {
   return (
      <div>
         <MenuItem
            icon={MdPreview}
            address={"/dashboard/product-review"}
            label={"Product Review Queue"}
         ></MenuItem>
         <MenuItem
            icon={TbReportOff}
            address={"/dashboard/reported-products"}
            label={"Reported Products"}
         ></MenuItem>
      </div>
   );
};

export default ModeratorMenu;
