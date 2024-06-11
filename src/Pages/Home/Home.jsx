/** @format */

import { useState } from "react";
import Featured from "../Featured/Featured";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Coupons from "../../Components/Coupons/Coupons";

const Home = () => {
   return (
      <div>
         <Banner></Banner>
         <Featured></Featured>
         <TrendingProducts></TrendingProducts>
         <Coupons></Coupons>
         <Footer></Footer>
         
      </div>
   );
};

export default Home;
