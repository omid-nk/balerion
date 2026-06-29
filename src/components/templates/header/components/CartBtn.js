"use client";

import { useEffect, useState } from "react";
import { subscribeToCartChanges, getCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";

export default function CartBtn() {
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    const checkCart = () => {
      const cart = getCart();
      setHasItems(cart.length > 0);
    };

    checkCart();

    return subscribeToCartChanges(checkCart);
  }, []);

  return (
    <Link href="/cart" className="relative p-1">
      <LuShoppingBag className="size-5" />
      <AnimatePresence>
        {hasItems && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.7, opacity: 0.7 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            className="absolute top-0 -right-0.5 h-2 w-2 rounded-full bg-warning"
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
