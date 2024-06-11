/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ProductCard from "../Components/ProductCard/ProductCard";
import { useState } from "react";
import { Helmet } from "react-helmet";
import SectionTitle from "../Components/SectionTitle/SectionTitle";

const Products = () => {
   const axiosPublic = useAxiosPublic();
   const [itemPerPage, setItemPerPage] = useState(6);
   const [productCount, setProductCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [search, setSearch] = useState('');

   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products", currentPage, itemPerPage,search],
      queryFn: async () => {
         const { data } = await axiosPublic(
            `/all-products?page=${currentPage}&size=${itemPerPage}&search=${search}`
         );
        //   setProductCount(data.length)
         return data;
      },
   });
   const { data: productsCount = [] } = useQuery({
      queryKey: ["products-count" , search],
      queryFn: async () => {
         const { data } = await axiosPublic(`/products-count?search=${search}`);
         console.log(data);
         setProductCount(data.count);
         return data;
      },
   });

   const numberOfPages = Math.ceil(productCount / itemPerPage);

   const pages = [
      ...Array(numberOfPages)
         .keys()
         .map((element) => element + 1),
   ];

   // handle pagination button
   const handlePaginationButton = (value) => {
      setCurrentPage(value);
   };

   // handle search
   const handleSearch = e => {
    e.preventDefault();
    const text = e.target.search.value;
   setSearch(text)
   }
   console.log(search);

   if (isLoading)
      return <span className="loading loading-dots loading-lg"></span>;
   return (
      <div>
          <Helmet>
          <title> All Products </title>
        </Helmet>
         <SectionTitle heading={'All Products'}></SectionTitle>

         <div className="flex items-center justify-center my-8">
            <div className="w-96 flex flex-col items-center justify-center">
               <form onSubmit={handleSearch}>
                  <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                     <input
                        className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                        type="text"
                        name="search"
                        placeholder="Search"
                        aria-label="Enter Job Title"
                     />

                     <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                        Search
                     </button>
                  </div>
               </form>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
               <ProductCard key={product._id} product={product}></ProductCard>
            ))}
         </div>
         {/* Paginations buttons */}
         <div className="flex justify-center my-12">
            <button
               disabled={currentPage === 1}
               onClick={() => handlePaginationButton(currentPage - 1)}
               className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
            >
               <div className="flex items-center -mx-1">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 mx-1 rtl:-scale-x-100"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                     />
                  </svg>

                  <span className="mx-1">previous</span>
               </div>
            </button>

            {pages.map((btnNum) => (
               <button
                  onClick={() => handlePaginationButton(btnNum)}
                  key={btnNum}
                  className={`hidden ${
                     currentPage === btnNum ? "bg-blue-500 text-white" : ""
                  } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
               >
                  {btnNum}
               </button>
            ))}

            <button
               disabled={currentPage === numberOfPages}
               onClick={() => handlePaginationButton(currentPage + 1)}
               className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
            >
               <div className="flex items-center -mx-1">
                  <span className="mx-1">Next</span>

                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 mx-1 rtl:-scale-x-100"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                     />
                  </svg>
               </div>
            </button>
         </div>
      </div>
   );
};

export default Products;
