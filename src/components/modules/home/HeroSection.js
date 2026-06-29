"use client";

import Image from "next/image";
import SearchBar from "./components/SearchBar";
import { LuScrollText, LuBrainCircuit } from "react-icons/lu";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HeroSection() {
  const words = ["برنامه‌نویسی", "فرانت‌اند", "بک‌اند", "امنیت", "هوش مصنوعی"];

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    let timeout;

    // تایپ کردن
    if (!isDeleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 120);
    }

    // پاک کردن
    else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, 60);
    }

    // مکث بعد از تایپ کامل
    else if (!isDeleting && charIndex > currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    }

    // رفتن به کلمه بعدی
    else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <section className="my-10 flex flex-col-reverse items-center justify-center gap-8 select-none sm:my-12 md:my-24 lg:flex-row lg:gap-6">
      {/* Right */}
      <div className="flex max-w-xl flex-col gap-6">
        <h2 className="font-morabba text-center text-xl/loose sm:text-right sm:text-3xl/loose">
          {/* Animated Word */}
          <motion.span
            className="bg-primary/5 text-primary dark:border-light/20 relative ml-3 inline-block border border-zinc-300 px-2.5 py-2 font-bold"
            initial={{ opacity: 0.7, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {displayed}
            <span className="text-dark dark:text-light mr-2 animate-pulse">
              |
            </span>

            {/* corners */}
            <span className="absolute -top-1 -left-1 block h-2 w-2 bg-zinc-300" />
            <span className="absolute -top-1 -right-1 block h-2 w-2 bg-zinc-300" />
            <span className="absolute -bottom-1 -left-1 block h-2 w-2 bg-zinc-300" />
            <span className="absolute -right-1 -bottom-1 block h-2 w-2 bg-zinc-300" />
          </motion.span>
          رو همین امروز
          <br /> شروع‌کن و مسیر شغلی‌ات رو بساز!
        </h2>

        <p className="text-dark/60 dark:text-light/60 text-center text-sm/relaxed sm:text-right sm:text-base/relaxed">
          با آموزش‌های پروژه‌محور و فارسی بالریون، قدم‌به‌قدم تا بازار کار در
          کنار تو هستیم. بدون اتلاف وقت، یاد بگیر و وارد دنیای برنامه‌نویسی شو.
        </p>

        {/* search form */}
        <div className="lg:max-w-sm">
          <SearchBar />
        </div>

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

      {/* Left */}
      <div className="max-w-xs sm:max-w-sm md:max-w-lg">
        <Image
          src={"/images/home/young-man.webp"}
          width={800}
          height={0}
          alt="hero section image"
          className="h-full object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}
