"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  LuChevronDown,
  LuReplaceAll,
  LuServer,
  LuFolderCode,
  LuLightbulb,
  LuMonitorDot,
  LuTabletSmartphone,
  LuBot,
} from "react-icons/lu";

import TitleHeading from "../shared/TitleHeading";

const icons = {
  LuReplaceAll,
  LuServer,
  LuFolderCode,
  LuLightbulb,
  LuMonitorDot,
  LuTabletSmartphone,
  LuChevronDown,
  LuBot,
};

export default function CategoriesListClient({ categories }) {
  return (
    <section className="relative select-none">
      {/* Header */}
      <TitleHeading title="دسته‌بندی دوره‌ها" />

      {/* Lists */}
      <Swiper
        modules={[Pagination]}
        className="relative"
        loop={false}
        pagination={{
          clickable: false,
        }}
        slidesPerView={2}
        breakpoints={{
          375: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((item) => {
          const Icon = icons[item.icon];

          return (
            <SwiperSlide key={item.id}>
              <Link
                href={`/courses/${item.slug}`}
                className="hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20 border-dark/10 dark:bg-dark bg-light mx-0.5 mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-xl border py-10 transition-all sm:gap-6 sm:py-14 md:mx-1.5 dark:border-zinc-950/20"
              >
                {Icon && (
                  <Icon className="text-dark dark:text-light text-4xl" />
                )}

                <p className="dark:text-light/60 text-dark/60 line-clamp-1 text-xs">
                  {item.name}
                </p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
