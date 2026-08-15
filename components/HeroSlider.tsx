"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {
    const { data } = await supabase
      .from("slider_images")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setSlides(data);
    }
  }

  if (slides.length === 0) {
    return (
      <div className="h-64 md:h-96 lg:h-[450px] bg-white/10 rounded-3xl flex items-center justify-center text-white">
        Slider Images Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-3xl overflow-hidden shadow-2xl"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-64 md:h-96 lg:h-[450px] overflow-hidden">

              <div className="absolute inset-0 flex items-center justify-center bg-white">

  <img
    src={item.image_url}
    alt="Slider"
    className="max-w-full max-h-full object-contain"
  />

</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}