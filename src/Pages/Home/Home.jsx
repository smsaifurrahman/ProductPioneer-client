/** @format */

import { useState } from "react";
import Featured from "../Featured/Featured";
import TrendingProducts from "../TrendingProducts/TrendingProducts";

const Home = () => {
   return (
      <div>
         <Featured></Featured>
         <TrendingProducts></TrendingProducts>
      </div>
   );
};

export default Home;
