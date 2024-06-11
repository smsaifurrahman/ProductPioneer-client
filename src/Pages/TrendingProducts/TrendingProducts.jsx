/** @format */

import { QueryClient, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const TrendingProducts = () => {
   const axiosPublic = useAxiosPublic();
   const {
      data: trendingProducts = [],
      isLoading: trendingLoading,
      refetch,
   } = useQuery({
      queryKey: ["trendingProducts"],
      queryFn: async () => {
         const { data } = await axiosPublic("/trending");
         return data;
      },
   });
   if (trendingLoading)
      return <span className="loading loading-dots loading-lg"></span>;
   return (
      <div>
        <SectionTitle heading={'Trending Products'}></SectionTitle>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingProducts.map((product) => (
               <ProductCard
                  refetch={refetch}
                  product={product}
                  key={product._id}
               ></ProductCard>
            ))}
         </div>
         <div className="flex items-center justify-center">
            <Link to={'/products'} className="btn border-orange-500 my-6 font-bold btn-outline"> Show All Products </Link>
         </div>
      </div>
   );
};

export default TrendingProducts;
