"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuShoppingCart, LuCheck, LuLoaderCircle } from "react-icons/lu";

import { addToCart, isInCart, subscribeToCartChanges } from "@/lib/cart";

export default function AddToCartButton({ courseId }) {
  const [loading, setLoading] = useState(false);

  const isAdded = useSyncExternalStore(
    subscribeToCartChanges,
    () => isInCart(courseId),
    () => false,
  );

  const handleAddToCart = async () => {
    if (loading || isAdded) return;

    setLoading(true);

    await new Promise((r) => setTimeout(r, 650));

    addToCart(courseId);

    setLoading(false);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      layout
      onClick={handleAddToCart}
      disabled={loading || isAdded}
      className={`relative overflow-hidden flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-medium transition-colors
      ${
        isAdded
          ? "bg-primary/85 text-white"
          : "bg-primary text-white hover:bg-primary/90"
      }`}
    >
      {/* Ripple */}
      {loading && (
        <motion.span
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute h-10 w-10 rounded-full bg-white"
        />
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <LuLoaderCircle className="animate-spin text-lg" />
            در حال افزودن...
          </motion.div>
        ) : isAdded ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 18, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 24,
            }}
            className="flex items-center gap-2"
          >
            <motion.div
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.05,
              }}
            >
              <LuCheck className="text-lg" />
            </motion.div>
            در سبد خرید
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{
                rotate: -12,
                y: -2,
              }}
            >
              <LuShoppingCart className="text-lg" />
            </motion.div>
            افزودن به سبد خرید
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
