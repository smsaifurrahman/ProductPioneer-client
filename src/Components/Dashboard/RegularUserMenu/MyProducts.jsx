/** @format */

import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import UpdateProductModal from "../../../Modal/UpdateProductModal";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import SectionTitle from "../../SectionTitle/SectionTitle";

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

   // delete products
   const { mutateAsync } = useMutation({
      mutationFn: async (userEmail) => {
         const { data } = await axiosSecure.delete(`/products/${userEmail}`);
         return data;
      },
      onSuccess: (data) => {
         refetch();
      },
   });

   // Delete a product
   const handleProductDelete = async (id) => {
      try {
         Swal.fire({
            title: "Are you sure?",
            text: `You want to delete this product?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
         }).then(async (result) => {
            if (result.isConfirmed) {
               mutateAsync(id);
               Swal.fire({
                  title: "Deleted!",
                  text: "The product has been deleted.",
                  icon: "success",
               });
            }
         });
      } catch (err) {
         console.log(err);
         toast.error(err.message);
      }
   };

   return (
      <div>
         <SectionTitle heading={"Your Product Lists"}></SectionTitle>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead className="font-bold text-xl text-black">
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
                  {products.map((product, index) => (
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
                        <td className="text-center"> {product.votes} </td>
                        <td
                           className={`${
                              product.status === "Accepted"
                                 ? "text-green-500 font-bold"
                                 : product.status === "Rejected"
                                 ? "text-red-500 font-bold"
                                 : product.status === "Pending"
                                 ? "text-black-500 font-bold"
                                 : ""
                           }`}
                        >
                           {product.status}
                        </td>
                        <td className=" ">
                           <Link
                              to={`/dashboard/update-product/${product?._id}`}
                              className="btn  bg-blue-500  text-white rounded hover:bg-blue-700"
                           >
                              Update
                           </Link>
                        </td>
                        <td>
                           <MdDelete
                              onClick={() => handleProductDelete(product?._id)}
                              className="text-4xl text-red-500 cursor-pointer"
                           ></MdDelete>
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
