"use client";

import { useSyncExternalStore } from "react";
import { LuShoppingCart, LuCheck } from "react-icons/lu";

import { addToCart, isInCart, subscribeToCartChanges } from "@/lib/cart";

export default function AddToCartButton({ courseId }) {
  const isAdded = useSyncExternalStore(
    subscribeToCartChanges,
    () => isInCart(courseId),
    () => false,
  );

  const handleAddToCart = () => {
    addToCart(courseId);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`flex items-center gap-1 rounded-lg px-6 py-3 text-xs transition sm:text-sm md:px-10 ${
        isAdded
          ? "bg-green-500 text-white"
          : "bg-primary text-light cursor-pointer"
      }`}
    >
      {isAdded ? (
        <>
          <LuCheck className="text-lg" />
          در سبد خرید
        </>
      ) : (
        <>
          <LuShoppingCart className="mb-0.5 text-lg" />
          افزودن به سبد خرید
        </>
      )}
    </button>
  );
}
