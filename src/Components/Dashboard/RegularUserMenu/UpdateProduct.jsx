/** @format */

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect, useState } from "react";
import { imageUpload } from "../../../api/utils";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const KeyCodes = {
   comma: 188,
   enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const UpdateProduct = () => {
   const params = useParams() || {};
   const [loading, setLoading] = useState(false);
   const [tags, setTags] = useState([]);

   const { data: productData = {}, refetch, isLoading } = useQuery({
      queryKey: ["productData", params.id],
      queryFn: async () => {
         const { data } = await axiosSecure(`/product/${params?.id}`);
         return data;
      },
   });

   useEffect(() => {
      if (productData?.tags) {
         setTags(productData.tags);
      }
   }, [productData]);

   const handleDelete = (i) => {
      setTags(tags.filter((tag, index) => index !== i));
   };

   const handleAddition = (tag) => {
      setTags([...tags, tag]);
   };

   const { mutateAsync, isLoading: isMutating } = useMutation({
      mutationFn: async (updatedProductData) => {
         const { data } = await axiosSecure.patch(`/products/${params.id}`, updatedProductData);
         return data;
      },
      onSuccess: () => {
         toast.success("Product updated successfully");
         refetch();
         setLoading(false);
      },
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const form = e.target;
      const productName = form.productName.value;
      const productImage = form.productImage.files[0];
      const productDescription = form.description.value;
      const externalLinks = form.externalLinks.value;
      let product_image = productData?.product_image;

      try {
         if (productImage) {
            product_image = await imageUpload(productImage);
         }

         const updatedProductData = {
            productName,
            product_image,
            productDescription,
            externalLinks,
            tags,
         };

         await mutateAsync(updatedProductData);
      } catch (err) {
         console.log(err);
         toast.error(err.message);
         setLoading(false);
      }
   };

   if (loading || isLoading || isMutating) {
      return <span className="loading loading-dots loading-lg"></span>;
   }

   return (
      <div>
         <h2 className="text-3xl text-center my-6 font-bold">Update this Product</h2>
         <div className="md:w-3/4 mx-auto p-4 bg-white border rounded shadow-md">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
               <div className="md:col-span-2">
                  <label className="block text-gray-700">Product Name:</label>
                  <input
                     type="text"
                     defaultValue={productData.productName}
                     name="productName"
                     className="w-full px-3 py-2 border rounded"
                     required
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-gray-700">Product Image:</label>
                  <input
                     type="file"
                     name="productImage"
                     className="w-full px-3 py-2 border rounded"
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-gray-700">Description:</label>
                  <textarea
                     defaultValue={productData.productDescription}
                     name="description"
                     className="w-full px-3 py-2 border rounded"
                     required
                  />
               </div>

               <div className="md:col-span-2">
                  <label className="block text-gray-700">Tags:</label>
                  <ReactTags
                     tags={tags}
                     handleDelete={handleDelete}
                     handleAddition={handleAddition}
                     delimiters={delimiters}
                     inputFieldPosition="inline"
                     classNames={{
                        tags: "react-tags",
                        tagInput: "react-tags__input",
                        tagInputField: "w-full px-3 py-2 border rounded",
                        selected: "react-tags__selected",
                        tag: "react-tags__tag inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded mr-2",
                        remove: "react-tags__remove ml-2 cursor-pointer text-red-500",
                     }}
                     renderTag={({ tag, key, className, onRemove }) => (
                        <span key={key} className={className}>
                           {tag.text}
                           <FontAwesomeIcon
                              icon={faTimes}
                              onClick={() => onRemove(key)}
                              className="ml-2 cursor-pointer text-red-500"
                           />
                        </span>
                     )}
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-gray-700">External Links:</label>
                  <input
                     type="text"
                     defaultValue={productData.externalLinks}
                     name="externalLinks"
                     className="w-full px-3 py-2 border rounded"
                  />
               </div>
               <div className="md:col-span-2">
                  <button
                     type="submit"
                     className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                     Update
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default UpdateProduct;
