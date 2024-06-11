/** @format */

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Featured = () => {
    const axiosPublic = useAxiosPublic()  
  const {data: featuredProducts= [], isLoading:featuredLoading, refetch} = useQuery({
    queryKey: ['featuredProducts'],   
        queryFn: async () => {
            const {data} = await axiosPublic('/featured');
            // setFeaturedRefetch(()=> refetch())
            return data

        }
    })
    
    if(featuredLoading) return <span className="loading loading-dots loading-lg"></span>
   return (
     <div>
          
         <SectionTitle heading={'Latest Featured'} > </SectionTitle>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {
            featuredProducts.map(product => <ProductCard refetch={refetch} product={product} key={product._id}></ProductCard>)
         }
      </div>
     </div>
   );
};

export default Featured;
