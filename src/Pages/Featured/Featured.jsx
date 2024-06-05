/** @format */

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Featured = () => {
    const axiosPublic = useAxiosPublic()
    const {data: featuredProducts= [], isLoading:featuredLoading, refetch} = useQuery({
    queryKey: ['products'],   
        queryFn: async () => {
            const {data} = await axiosPublic('/featured');
            console.log(data);
            return data

        }
    })
    
    if(featuredLoading) return <span className="loading loading-dots loading-lg"></span>
   return (
     <div>
          <h2 className="text-3xl  font-bold text-center my-6">
            {" "}
            Latest Featured
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {
            featuredProducts.map(product => <ProductCard refetch={refetch} product={product} key={product._id}></ProductCard>)
         }
      </div>
     </div>
   );
};

export default Featured;
