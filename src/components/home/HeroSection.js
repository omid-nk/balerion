"use client";

import Image from "next/image";
import { LuScrollText, LuBrainCircuit } from "react-icons/lu";

import SearchBar from "@/components/shared/SearchBar";
import AnimatedWords from "@/components/home/AnimatedWords";

export default function HeroSection() {
  return (
    <section className="my-12 flex flex-col-reverse items-center justify-center gap-8 select-none sm:my-12 md:my-24 lg:flex-row lg:gap-6">
      {/* Content */}
      <div className="flex max-w-xl flex-col gap-6">
        <h2 className="font-morabba text-center text-xl/loose sm:text-right sm:text-3xl/loose">
          <AnimatedWords />
          رو همین امروز
          <br />
          شروع‌کن و مسیر شغلی‌ات رو بساز!
        </h2>

        <p className="text-dark/60 dark:text-light/60 text-center text-sm/relaxed sm:text-right sm:text-base/relaxed">
          با آموزش‌های پروژه‌محور و فارسی بالریون، قدم‌به‌قدم تا بازار کار در
          کنار تو هستیم. بدون اتلاف وقت، یاد بگیر و وارد دنیای برنامه‌نویسی شو.
        </p>

        {/* Search */}
        <div className="lg:max-w-sm">
          <SearchBar />
        </div>

        {/* Features */}
        <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 px-4">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <LuScrollText className="text-secondary text-xl" />
            آموزش ویژه بازار کار
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base">
            <LuBrainCircuit className="text-secondary text-xl" />
            مجهز به هوش مصنوعی
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative max-w-xs sm:max-w-sm md:max-w-lg">
        <Image
          src="/images/home/man-coding.png"
          width={800}
          height={800}
          alt="hero section image"
          className="h-full object-cover"
          loading="eager"
        />
        <span className="dark:bg-primary/10 bg-primary/20 absolute top-0 right-0 bottom-0 left-0 -z-10 block blur-3xl" />
      </div>
    </section>
  );
}
