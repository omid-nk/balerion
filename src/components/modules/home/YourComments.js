"use client";

import { HeadingTitle } from "./components/HeadingTitle";
import yourCommentsData from "@/data/yourCommentsData.json";
import Image from "next/image";
import { LuStar } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function YourComments() {
  const comments = yourCommentsData.yourCommentsData || [];

  const swiperParams = {
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <section className="my-12 select-none">
      {/* header */}
      <HeadingTitle namePart1={"نظرات"} namePart2={"دانشجو‌ها"} />

      {/* body */}
      <div className="relative sm:mx-4">
        <Swiper className="my-6" {...swiperParams}>
          {comments.map((item) => {
            const stars = Array.from({ length: item.star }, (_, i) => (
              <LuStar key={i} className="text-yellow-600" />
            ));

            return (
              <SwiperSlide className="w-full" key={item.id}>
                <div className="dark:bg-dark mx-3 flex min-h-44 flex-col justify-between rounded-lg bg-white p-3 text-xs">
                  <div className="p-1 pb-6">
                    <p className="line-clamp-3 text-xs/relaxed">{item.desc}</p>
                  </div>

                  <div className="border-dark/20 dark:border-light/20 flex flex-wrap items-center justify-between gap-y-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="to-primary h-10 w-10 rounded-full bg-linear-to-br from-blue-900 object-cover"
                      />
                      <div>
                        <p className="mb-1 font-bold">{item.name}</p>
                        <div className="flex items-center gap-0.5">{stars}</div>
                      </div>
                    </div>
                    <div className="bg-dark/5 dark:bg-light/5 rounded-sm px-2 py-1">
                      <p>دانشجوی {item.coursesOwn} دوره</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
