"use client";

import { motion } from "motion/react";
import { LuShoppingCart } from "react-icons/lu";

import { clearCart } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { courseIds, courses, loading, reload } = useCart();

  function handleClear() {
    clearCart();
  }

  if (loading) {
    return (
      <main className="grid min-h-80 place-items-center">
        <div className="text-primary flex items-center gap-3 text-sm">
          <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          در حال بارگذاری سبد خرید...
        </div>
      </main>
    );
  }

  if (!courseIds.length || !courses.length) {
    return (
      <main className="ring-border flex min-h-80 flex-col items-center justify-center rounded-lg p-6 text-center ring select-none sm:p-12">
        <motion.div
          className="mb-5 sm:mb-6"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="bg-primary/10 text-primary flex size-18 items-center justify-center rounded-2xl sm:size-20">
            <LuShoppingCart
              size={34}
              strokeWidth={1.7}
              className="sm:size-38"
            />
          </div>
        </motion.div>

        <h2 className="mb-2 text-base font-bold sm:text-lg">
          سبد خرید شما خالی است.
        </h2>

        <p className="text-dark-1/50 dark:text-light-1/50 text-xs sm:text-sm">
          هنوز هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید.
        </p>
      </main>
    );
  }

  return (
    <main className="pb-16 sm:pb-20">
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <div className="min-w-0">
          <h1 className="text-lg font-bold sm:text-xl">سبد خرید</h1>

          <p className="text-dark/50 dark:text-light/50 mt-1 text-xs sm:text-sm">
            دوره‌های انتخاب‌شده خود را بررسی کنید.
          </p>
        </div>

        <span className="bg-primary/10 text-primary shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-medium sm:px-3 sm:py-2 sm:text-xs">
          {courses.length} دوره
        </span>
      </div>

      <div className="grid items-start gap-4 sm:gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="min-w-0 space-y-3">
          {courses.map((course) => (
            <CartItem key={course.id} course={course} onRemove={reload} />
          ))}
        </section>

        <aside className="min-w-0 xl:sticky xl:top-5">
          <CartSummary courses={courses} onClear={handleClear} />
        </aside>
      </div>
    </main>
  );
}
