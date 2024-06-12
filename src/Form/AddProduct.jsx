/** @format */

import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../api/utils";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";

const KeyCodes = {
   comma: 188,
   enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
   const { user } = useAuth();
   const [tags, setTags] = useState([]);
   const [loading, setLoading] = useState(false);
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();

   const handleDelete = (i) => {
      setTags(tags.filter((tag, index) => index !== i));
   };

   const handleAddition = (tag) => {
      setTags([...tags, tag]);
   };

   const { mutateAsync } = useMutation({
      mutationFn: async (roomData) => {
         const { data } = await axiosSecure.post(`/products`, roomData);
         console.log(data);
         return data;
      },

      onSuccess: (data) => {
         if (data.message === "unverified") {
            navigate("/dashboard/profile");
            return Swal.fire({
               position: "center",
               icon: "error",
               title: "Please subscribe to Add more products",
               showConfirmButton: false,
               timer: 3000,
            });
         }
         toast.success("Data Saved successfully");
         navigate("/dashboard/my-products");
         setLoading(false);
      },
   });

   //handle form
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const form = e.target;
      const productName = form.productName.value;
      const productImage = form.productImage.files[0];
      const productDescription = form.description.value;
      const externalLinks = form.externalLinks.value;
      const productOwner = {
         name: user?.displayName,
         image: user?.photoURL,
         email: user?.email,
      };
      const status = "Pending";
      const votes = 0;

      try {
         const product_image = await imageUpload(productImage);
         console.log(product_image);
         const productData = {
            productName,
            product_image,
            productDescription,
            externalLinks,
            productOwner,
            status,
            votes,
            tags,
         };

         await mutateAsync(productData);
      } catch (err) {
         console.log(err);
         toast.error(err.message);
         setLoading(false);
      }
   };

   // handle Image change
   //    const handleImage = (image) => {
   //     setImagePreview(URL.createObjectURL(image));
   //     setImageText(image.name);
   //  };

   return (
      <div>
           <Helmet>
          <title> ProductPioneer | Add Product  </title>
        </Helmet>
         <SectionTitle heading={'Add New Product'} ></SectionTitle>
         <div
            className=" md:w-3/4 mx-auto p-4 bg-white border rounded 
    shadow-md"
         >
            <form
               onSubmit={handleSubmit}
               className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
            >
               <div className="md:col-span-2">
                  <label className="block text-gray-700">Product Name:</label>
                  <input
                     type="text"
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
                     required
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-gray-700">Description:</label>
                  <textarea
                     name="description"
                     className="w-full px-3 py-2 border rounded"
                     required
                  />
               </div>
               <div>
                  <label className="block text-gray-700">
                     Product Owner Name:
                  </label>
                  <input
                     defaultValue={user?.displayName}
                     disabled
                     type="text"
                     name="ownerName"
                     className="w-full px-3 py-2 border rounded"
                     required
                  />
               </div>
               <div>
                  <label className="block text-gray-700">Owner Image:</label>
                  <input
                     type="text"
                     defaultValue={user?.photoURL}
                     disabled
                     name="ownerImage"
                     className="w-full px-3 py-2 border rounded"
                     required
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-gray-700">Owner Email:</label>
                  <input
                     type="email"
                     defaultValue={user?.email}
                     disabled
                     name="ownerEmail"
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
                        remove:
                           "react-tags__remove ml-2 cursor-pointer text-red-500",
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
                     required
                     type="text"
                     name="externalLinks"
                     className="w-full px-3 py-2 border rounded"
                  />
               </div>
               <div className="md:col-span-2">
                  <button
                     type="submit"
                     className="w-full px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                     Add Product
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddProduct;
