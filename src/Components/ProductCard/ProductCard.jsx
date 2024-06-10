/** @format */
import { BiSolidUpArrow } from "react-icons/bi";
import { format, formatDistanceToNow } from "date-fns";
import VoteButton from "../VoteButton/VoteButton";

import { Link } from "react-router-dom";


const ProductCard = ({ product, refetch }) => {




   return (
      <div className=" flex items-center bg-base-100 shadow-xl">
         <figure className="w-3/5 h-40 ">
            <img className="h-full rounded-2xl" src={product?.product_image} alt="Movie" />
         </figure>
         <div className=" ml-3 mt-3 w-full ">
         <h3>Posted on: {format(new Date(product.timestamp), 'PPpp')}</h3>

            <Link to={`/product-details/${product._id}`} className="card-title text-2xl"> {product.productName} </Link>
            <div className="flex flex-col items-end mr-3 ">
                <VoteButton  refetch={refetch}  product={product}></VoteButton>
            {/* <button className="btn">
               <BiSolidUpArrow className="text-2xl"></BiSolidUpArrow>{" "}
               {product.votes}{" "}
            </button> */}
            </div>
            <div className="flex gap-2 my-3">
               {product.tags.map((tag) => (
                  <p className=" text-base text-gray-700" key={tag._id}> {tag.id}- </p>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
