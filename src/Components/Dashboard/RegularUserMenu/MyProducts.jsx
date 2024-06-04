/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import UpdateProductModal from "../../../Modal/UpdateProductModal";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";

const MyProducts = () => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   //fetch products data
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/products/${user?.email}`);
         return data;
      },
   });

   return (
      <div>
         <h2 className="text-3xl  font-bold text-center my-6">
            {" "}
            Your product Lists
         </h2>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Product Name</th>
                     <th>Product Image</th>
                     <th> Number of Votes</th>
                     <th> Status </th>
                     <th> Update </th>
                     <th> Delete </th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {products.map((product,index) => (
                     <tr key={product._id}>
                        <th> {index + 1} </th>
                        <td> {product.productName} </td>
                        <td>
                           <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                 <img
                                    src={product["product_image"]}
                                    alt="Avatar Tailwind CSS Component"
                                 />
                              </div>
                           </div>
                        </td>
                        <td> {product.votes} </td>
                        <td> {product.status} </td>
                        <td className=" ">
                           <Link to={`/dashboard/update-product/${product?._id}`} className="btn btn-outline btn-success">
                              Update
                           </Link>
                        </td>
                        <td>
                           <MdDelete className="text-4xl text-red-500"></MdDelete>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default MyProducts;
