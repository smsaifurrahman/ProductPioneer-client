/** @format */

import { useMutation } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ReviewForm = ({ product, user, reviewRefetch }) => {
   const axiosSecure = useAxiosSecure();

   const { mutateAsync } = useMutation({
      mutationFn: async (reviewData) => {
         const { data } = await axiosSecure.post(`/reviews`, reviewData);
         return data;
      },
      onSuccess: () => {
         toast.success("Your review is Posted");
         reviewRefetch();

         //    navigate('/dashboard/my-products');
         //    setLoading(false);
      },
   });

   //handle form
   const handleSubmit = async (e) => {
      e.preventDefault();
      // setLoading(true);
      const form = e.target;
      const userName = form.name.value;
      const userImage = form.image.value;
      const description = form.description.value;
      const rating = form.rating.value;
      const productId = product?._id;
      const reviewData = {
         productId,
         userName,
         userImage,
         rating,
         description,
      };

      console.log(reviewData);

      try {
         await mutateAsync(reviewData);
         form.reset();
      } catch (err) {
         console.log(err);
         toast.error(err.message);
         // setLoading(false);
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
      >
         <div className="md:col-span-2">
            <label className="block font-bold text-gray-700">Your Name:</label>
            <input
               defaultValue={user?.displayName}
               disabled
               type="text"
               name="name"
               className="w-full px-3 py-2 border rounded"
               required
            />
         </div>
         <div className="md:col-span-2">
            <label className="block font-bold text-gray-700">Your Image:</label>
            <input
               defaultValue={user?.photoURL}
               type="text"
               name="image"
               className="w-full px-3 py-2 border rounded"
               required
            />
         </div>
         <div className="md:col-span-2">
            <label className="block font-bold text-gray-700">
               Your Rating:
            </label>
            <input
               className="w-full px-3 py-2 border rounded"
               type="number"
               name="rating"
               min="1"
               max="5"
               required
            />
         </div>
         <div className="md:col-span-2">
            <label className="block font-bold text-gray-700">
               Description:
            </label>
            <textarea
               name="description"
               className="w-full px-3 py-2 border rounded"
               required
            />
         </div>

         <div className="md:col-span-2">
            <button
               type="submit"
               className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
               Submit
            </button>
         </div>
      </form>
   );
};

export default ReviewForm;
