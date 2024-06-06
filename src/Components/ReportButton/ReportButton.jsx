import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { GoReport } from "react-icons/go";

const ReportButton = ({productId}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (productId) => {
          const email = user?.email
          const { data } = await axiosSecure.patch(`/products/report/${productId}`, {email});

    
          return data;
        },
        onSuccess: (data) => {
       
      
          toast.success('Your report is Saved')
       
        }
      });
      const handleReport = async (productId) => {
   
        await mutateAsync(productId)
      }
    return (
        <button onClick={()=> handleReport(productId)} >
            <GoReport  className="text-3xl text-red-500 font-bold" />
        </button>
    );
};

export default ReportButton;