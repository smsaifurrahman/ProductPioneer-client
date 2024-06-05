/** @format */
import { BiSolidUpArrow } from "react-icons/bi";
import { format, formatDistanceToNow } from "date-fns";
import VoteButton from "../VoteButton/VoteButton";

const ProductCard = ({ product, refetch }) => {




   return (
      <div className=" flex items-center bg-base-100 shadow-xl">
         <figure className="w-3/5">
            <img src={product?.product_image} alt="Movie" />
         </figure>
         <div className=" ml-3 mt-3 w-full ">
         <h3>Posted on: {format(new Date(product.timestamp), 'PPpp')}</h3>

            <h2 className="card-title text-2xl"> {product.productName} </h2>
            <div className="flex flex-col items-end mr-3 ">
                <VoteButton refetch={refetch} product={product}></VoteButton>
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
