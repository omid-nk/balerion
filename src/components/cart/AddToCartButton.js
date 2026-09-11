"use client";

import { useEffect, useState } from "react";
import { LuCheck, LuShoppingCart } from "react-icons/lu";
import toast from "react-hot-toast";

import { addToCart, isInCart, subscribeToCartChanges } from "@/lib/cart";

export default function AddToCartButton({
  courseId,
  isFree = false,
  className = "",
}) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isInCart(courseId));

    return subscribeToCartChanges(() => {
      setInCart(isInCart(courseId));
    });
  }, [courseId]);

  function handleClick() {
    if (isFree) {
      // فعلاً ثبت‌نام رایگان را بعداً پیاده می‌کنیم.
      toast.success("ثبت‌نام رایگان به‌زودی فعال می‌شود.");
      return;
    }

    if (inCart) {
      toast("این دوره قبلاً در سبد خرید شماست.");
      return;
    }

    addToCart(courseId);

    setInCart(true);

    toast.success("دوره به سبد خرید اضافه شد.");
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {inCart && !isFree ? (
        <LuCheck className="size-4" />
      ) : (
        !isFree && <LuShoppingCart className="size-4" />
      )}

      {isFree
        ? "ثبت‌نام رایگان"
        : inCart
          ? "در سبد خرید"
          : "افزودن به سبد خرید"}
    </button>
  );
}
