"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
export default function Hero({ slider }) {
  return (
    <div className="hero-section">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          speed={2000}
          loop={true}
          centeredSlides={"true"}
          className="hero_slider"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {slider?.map((slide) => (
            <SwiperSlide key={slide?.id}>
              <div className="img">
                <img src={slide?.image} alt={slide?.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
