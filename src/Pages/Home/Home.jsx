/** @format */

import { useState } from "react";
import Featured from "../Featured/Featured";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import Banner from "../../Components/Banner/Banner";

import Coupons from "../../Components/Coupons/Coupons";
import { Helmet } from "react-helmet";

const Home = () => {
   return (
      <div>
          <Helmet>
          <title> ProductPioneer | Home  </title>
        </Helmet>
         <Banner></Banner>
         <Featured></Featured>
         <TrendingProducts></TrendingProducts>
         <Coupons></Coupons>
  
         
      </div>
   );
};

export default Home;
