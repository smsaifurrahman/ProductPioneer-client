/** @format */

import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";

const ProductReviewPage = () => {
   const axiosSecure = useAxiosSecure();
   //fetch products data
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/products`);
         return data;
      },
   });

   // update product status
   const { mutateAsync } = useMutation({
      mutationFn: async ({ id, updatedStatus }) => {
         const { data } = await axiosSecure.patch(
            `/products/update-status/${id}`,
            updatedStatus
         );
         return data;
      },
      onSuccess: () => {
         refetch();
         toast.success("Products Status Changed Successfully");
      },
   });
   

   // Make a product featured
   const { mutateAsync: makeFeatured } = useMutation({
      mutationFn: async ({ id, featured }) => {
         const { data } = await axiosSecure.patch(
            `/products/make-featured/${id}`,featured
         );
         return data;
      },
      onSuccess: () => {
         refetch();
         toast.success("Products is marked as Featured");
      },
   });

   // change product status accept/ reject
   const handleProductStatusChange = async (id, productStatus) => {
      let updatedStatus = {};
      if (productStatus === "Accepted") {
         updatedStatus = {
            status: productStatus,
         };
      } else if (productStatus === "Rejected") {
         updatedStatus = {
            status: productStatus,
         };
      }

      await mutateAsync({ id, updatedStatus });
   };

   const handleMakeFeatured = async (id) => {
      const featured = {
         featured: true,
      };
     await makeFeatured({id, featured})
   };

   return (
      <div>
           <Helmet>
          <title> ProductPioneer | Product Review  </title>
        </Helmet>
      <SectionTitle heading={'Product review Details'}></SectionTitle>
        
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead className="font-bold text-xl text-black">
                  <tr >
                     <th>#</th>
                     <th>Product Name</th>
                     <th> View Details </th>
                     <th>Feature Product</th>
                     <th>Accept </th>
                     <th>Reject </th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {products.map((product, index) => (
                     <tr key={product._id} className="">
                        <th> {index + 1} </th>
                        <td> {product.productName} </td>
                        <td>
                           {" "}
                           <Link to={`/product-details/${product._id}`}>
                           <button className="btn bg-gray-500 text-white">
                              View Details
                           </button>{" "}
                           </Link>
                        </td>
                        <td>
                            
                           <button
                           disabled={product.featured}
                              onClick={() => handleMakeFeatured(product._id)}
                              className="btn bg-sky-500 text-white"
                           >
                              Make Featured
                           </button>{" "}
                        </td>
                        <td>
                          
                           <button
                              disabled={product.status === "Accepted"}
                              onClick={() =>
                                 handleProductStatusChange(
                                    product._id,
                                    "Accepted"
                                 )
                              }
                              className="btn btn-success text-white"
                           >
                              Accept
                           </button>{" "}
                        </td>
                        <td>
                           <button
                              disabled={product.status === "Rejected"}
                              onClick={() =>
                                 handleProductStatusChange(
                                    product._id,
                                    "Rejected"
                                 )
                              }
                              className="btn  text-white btn-error"
                           >
                              Reject
                           </button>{" "}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ProductReviewPage;
