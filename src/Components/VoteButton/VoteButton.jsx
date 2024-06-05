/** @format */

import { useMutation } from "@tanstack/react-query";
import { BiSolidUpArrow } from "react-icons/bi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import { useState } from "react";

const VoteButton = ({product, refetch}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [hasVoted, setHasVoted] = useState(false);
    const sameUser = user?.email === product.productOwner.email;


    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
          const { data } = await axiosSecure.patch(`/products/increase-vote/${id}`);
          setHasVoted(true)
          return data;
        },
        onSuccess: (data) => {
          refetch();
          toast.success('You voted successfully')
       
        }
      });
      const handleVoting = async (id) => {
        if(!user) {
            toast.error('Please Login to Vote')
           return navigate('/login')
        }
        await mutateAsync(id)
      }
   return (
      <button disabled={hasVoted || sameUser } onClick={() => handleVoting(product._id)} className="btn">
         <BiSolidUpArrow className="text-2xl"></BiSolidUpArrow> {product.votes}{" "}
      </button>
   );
};

export default VoteButton;
