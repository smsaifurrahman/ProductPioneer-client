/** @format */

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import CouponCard from "./CouponCard";
import SectionTitle from "../SectionTitle/SectionTitle";

const Coupons = () => {
   const axiosPublic = useAxiosPublic();
   const { data: coupons = [] } = useQuery({
      queryKey: ["coupons"],
      queryFn: async () => {
         const { data } = await axiosPublic("/coupons");
         // setFeaturedRefetch(()=> refetch())
         return data;
      },
   });
   return (
      <div>
        <SectionTitle heading={'Grab the discount'}> </SectionTitle>
         <Swiper
         className="mb-4"
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
         >
            {
                coupons?.map(coupon => <SwiperSlide coupon={coupon} key={coupon._id} >
                            <CouponCard coupon={coupon}> </CouponCard>
                    </SwiperSlide> )
            }
           
            ...
         </Swiper>
      </div>
   );
};

export default Coupons;
