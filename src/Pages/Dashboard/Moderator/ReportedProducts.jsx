/** @format */

import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ReportedProducts = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: reportedProducts = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["reportedProducts"],
      queryFn: async () => {
         const { data } = await axiosSecure("/reported-products");
         console.log(data);
         return data;
      },
   });


   
  // delete reported product
  const { mutateAsync } = useMutation({
    mutationFn: async (productId) => {
      const { data } = await axiosSecure.delete(`/products/${productId}`);
      return data;
    },
    onSuccess: (data) => {
      refetch();
      toast.success('User deleted successfully');
    }
  });

  //handleDelete

  const handleDelete = async (productId) => {

    try {
        Swal.fire({
          title: "Are you sure?",
          text: `You want to delete the product`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(async (result) => {
          if (result.isConfirmed) {
             await mutateAsync(productId);
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success"
            });
          }
        });
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };
   

   if(isLoading) return <span className="loading loading-dots loading-lg"></span>

   return (
      <div>
         reported products {reportedProducts.length}
         <h2 className="text-3xl  font-bold text-center my-6">
            Reported Products Lists
         </h2>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead  className="font-bold text-xl text-black">
                  <tr>
                     <th>#</th>
                     <th>Product Name</th>
                     <th>Reported Counts</th>
                     <th>View Details</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {reportedProducts.map((product, index) => (
                     <tr key={product._id}>
                        <th> {index + 1} </th>
                        <td> {product?.productName} </td>
                        <td> {product?.reported} times </td>
                        <td>
                        <Link to={`/product-details/${product._id}`}>
                           <button className="btn btn-outline btn-success">
                              View Details
                           </button>{" "}
                           </Link>
                        </td>
                        <td className="text-red-500 text-3xl">
                           {" "}
                           <MdDelete
                             onClick={() => handleDelete(product._id)}
                           ></MdDelete>{" "}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ReportedProducts;
