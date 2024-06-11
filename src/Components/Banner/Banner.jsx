/** @format */

import {
   Navigation,
   Pagination,
   Scrollbar,
   A11y,
   Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
   return (
      <div>
         <Swiper
            modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 5000 }}
            style={{ height: "100%" }} // Ensure Swiper takes up 100% height of its container
            className="rounded-2xl"
         >
            <SwiperSlide className="rounded-2xl">
               <div className="relative text-center rounded-2xl ">
                  <div className="h-[300px] md:h-[650px] relative rounded-2xl">
                     {/* Background image */}
                     <div
                        className="absolute inset-0 bg-cover object-contain bg-center rounded-2xl"
                        style={{
                           backgroundImage: `url('https://i.ibb.co/HNYF52Q/bg.jpg')`,
                        }}
                     ></div>

                     {/* Overlay */}
                     <div className="absolute inset-0 bg-black opacity-40  rounded-2xl "></div>

                     {/* Text */}
                     <div className="absolute inset-0 flex items-center justify-center text-white font-bold md:text-xl px-4 py-2">
                        <h1 className="text-center  text-5xl">
                           {" "}
                           Discover the Latest in Tech Innovation
                        </h1>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="relative text-center rounded-2xl">
                  <div className="h-[300px] md:h-[650px] relative rounded-2xl">
                     {/* Background image */}
                     <div
                        className="absolute inset-0 bg-cover bg-center rounded-2xl"
                        style={{
                           backgroundImage: `url('https://i.ibb.co/4VcFr7J/bg1.jpg')`,
                        }}
                     ></div>

                     {/* Overlay */}
                     <div className="absolute inset-0 bg-black opacity-40  rounded-2xl"></div>

                     {/* Text */}
                     <div className="absolute inset-0 flex items-center justify-center text-white font-bold md:text-xl px-4 py-2">
                        <h1 className="text-center  text-5xl">
                        Join the Community of Innovators and Tech Enthusiasts
                        </h1>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="relative text-center rounded-2xl">
                  <div className="h-[300px] md:h-[650px] relative rounded-2xl">
                     {/* Background image */}
                     <div
                        className="absolute inset-0 bg-cover bg-center rounded-2xl"
                        style={{
                           backgroundImage: `url('https://i.ibb.co/Nrk1cqZ/bg2.jpg')`,
                        }}
                     ></div>

                     {/* Overlay */}
                     <div className="absolute inset-0 bg-black opacity-40  rounded-2xl"></div>

                     {/* Text */}
                     <div className="absolute inset-0 flex items-center justify-center text-white font-bold md:text-xl px-4 py-2">
                        <h1 className="text-center  text-5xl">
                        Connect, Share, and Upvote Your Favorite Products
                        </h1>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
        
         </Swiper>
      </div>
   );
};

export default Banner;
