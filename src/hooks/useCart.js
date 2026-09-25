"use client";

import { useCallback, useEffect, useState } from "react";

import { getCart, setCart, subscribeToCartChanges } from "@/lib/cart";

import { getCartCourses } from "@/services/cart/get-cart-courses";

export function useCart() {
  const [courseIds, setCourseIds] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    const ids = getCart();

    if (!ids.length) {
      setCourseIds([]);
      setCourses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getCartCourses(ids);

      /*
       * Supabase الزاماً نتیجه را به ترتیب
       * localStorage برنمی‌گرداند.
       *
       * Map باعث می‌شود:
       * - ترتیب سبد حفظ شود
       * - IDهای نامعتبر مشخص شوند
       */
      const courseMap = new Map(
        data.map((course) => [String(course.id), course]),
      );

      const validIds = ids.filter((id) => courseMap.has(String(id)));

      const orderedCourses = validIds
        .map((id) => courseMap.get(String(id)))
        .filter(Boolean);

      /*
       * اگر دوره‌ای حذف یا غیرفعال شده باشد،
       * localStorage را هم با وضعیت واقعی هماهنگ می‌کنیم.
       */
      if (validIds.length !== ids.length) {
        setCart(validIds);
      }

      setCourseIds(validIds);
      setCourses(orderedCourses);
    } catch (error) {
      console.error("useCart:", error);

      setCourseIds([]);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();

    return subscribeToCartChanges(loadCart);
  }, [loadCart]);

  return {
    courseIds,
    courses,
    loading,
    reload: loadCart,
  };
}
