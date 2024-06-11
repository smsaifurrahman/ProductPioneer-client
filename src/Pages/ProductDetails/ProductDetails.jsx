/** @format */

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import VoteButton from "../../Components/VoteButton/VoteButton";
import { format, formatDistanceToNow } from "date-fns";
import useAuth from "../../hooks/useAuth";
import ReviewForm from "../../Form/ReviewForm";
import ReviewSlider from "../../Components/Slider/ReviewSlider";
import { useState } from "react";
import ReportButton from "../../Components/ReportButton/ReportButton";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
   const { user } = useAuth();
   const params = useParams();
   const axiosSecure = useAxiosSecure();
   const [reviewRefetch, setReviewRefetch] = useState(() => {});

   const {
      data: product,
      error,
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["product", params.id],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/product/${params.id}`);
         return data;
      },
      enabled: !!params.id, // Ensure the query only runs if params.id is truthy
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error loading product</div>;
   }

   return (
      <div className="mt-10 grid  grid-cols-1 md:grid-cols-2 gap-4">
          <Helmet>
          <title> ProductPioneer | Product Details  </title>
        </Helmet>
         <div className="">
            <figure className="w-full h-72">
               <img
                  className="w-full h-full rounded-xl"
                  src={product.product_image}
                  alt="Shoes"
               />
            </figure>
            <h3>Posted on: {format(new Date(product.timestamp), "PPpp")}</h3>
            <h2 className="card-title text-4xl my-4">{product.productName}</h2>
            {/* <div className="flex flex-col items-end mr-3">
               <VoteButton refetch={refetch} product={product} />
            </div> */}
            <p>
               <span className="text-2xl font-bold">Description:</span>{" "}
               {product.productDescription}
            </p>
            <h2 className="my-2 text-xl font-bold">
               Visit for details:{" "}
               <a
                  href={product.externalLinks}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {product.externalLinks}
               </a>
            </h2>
            <div className="flex gap-2 my-3 text-xl font-bold">
               Relevant for:{" "}
               {product.tags.map((tag) => (
                  <p className=" text-base text-gray-700" key={tag._id}>
                     {" "}
                     {tag.id}-{" "}
                  </p>
               ))}
            </div>
         </div>
         {/* Review section */}
         <div className="">
            <div>
               <ReviewSlider
                  setReviewRefetch={setReviewRefetch}
                  productId={product?._id}
               ></ReviewSlider>
            </div>
            <div className="flex my-6 items-center justify-between">
               <div className="flex font-bold items-center gap-3">
                  <h2>Do you like it? then Vote:</h2>
                  <VoteButton refetch={refetch} product={product}></VoteButton>
               </div>
               <div className="flex font-bold gap-3">
                  <h3>Want to report this product?</h3>
                  <ReportButton productId = {product?._id} ></ReportButton>
               </div>
            </div>
            <div className="my-6">
               <h3 className="text-xl  my-4 font-bold:"> Post Your comment </h3>
               <ReviewForm
                  reviewRefetch={reviewRefetch}
                  product={product}
                  user={user}
               ></ReviewForm>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;
