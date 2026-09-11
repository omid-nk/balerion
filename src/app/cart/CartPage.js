"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuShoppingCart } from "react-icons/lu";

import { clearCart, getCart, subscribeToCartChanges } from "@/lib/cart";

import { getCartCourses } from "@/services/cart";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const [courseIds, setCourseIds] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    const ids = getCart();

    setCourseIds(ids);

    if (!ids.length) {
      setCourses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getCartCourses(ids);

      /*
       * Supabase نتیجه را الزاماً به همان ترتیب
       * localStorage برنمی‌گرداند.
       *
       * پس ترتیب سبد را حفظ می‌کنیم.
       */
      const courseMap = new Map(
        data.map((course) => [String(course.id), course]),
      );

      const orderedCourses = ids
        .map((id) => courseMap.get(String(id)))
        .filter(Boolean);

      setCourses(orderedCourses);
    } catch (error) {
      console.error("loadCart:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();

    return subscribeToCartChanges(loadCart);
  }, [loadCart]);

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
      <main className="ring-border flex min-h-80 flex-col items-center justify-center rounded-lg p-12 text-center ring select-none">
        <motion.div
          className="mb-6"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="bg-primary/10 text-primary flex size-20 items-center justify-center rounded-2xl">
            <LuShoppingCart size={38} strokeWidth={1.7} />
          </div>
        </motion.div>

        <h2 className="mb-2 text-lg font-bold">سبد خرید شما خالی است.</h2>

        <p className="text-dark-1/50 dark:text-light-1/50 text-sm">
          هنوز هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید.
        </p>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">سبد خرید</h1>

          <p className="text-dark/50 dark:text-light/50 mt-1 text-sm">
            دوره‌های انتخاب‌شده خود را بررسی کنید.
          </p>
        </div>

        <span className="bg-primary/10 text-primary rounded-lg px-3 py-2 text-xs font-medium">
          {courses.length} دوره
        </span>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="space-y-3">
          {courses.map((course) => (
            <CartItem key={course.id} course={course} onRemove={loadCart} />
          ))}
        </section>

        <CartSummary courses={courses} onClear={handleClear} />
      </div>
    </main>
  );
}
