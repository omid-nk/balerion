"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

import { getCart, removeFromCart, subscribeToCartChanges } from "@/lib/cart";

import CartItem from "@/components/modules/cart/CartItem";
import CheckoutCard from "@/components/modules/cart/CheckoutCard";
import CartSkeleton from "@/components/modules/cart/CartSkeleton";
import EmptyCart from "@/components/modules/cart/EmptyCart";

export default function CartPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [removingIds, setRemovingIds] = useState([]);

  const loadCart = async () => {
    setLoading(true);

    const ids = getCart();

    if (!ids.length) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("courses")
      .select(
        `
        id,
        name,
        slug,
        cover_url,
        price
      `,
      )
      .in("id", ids);

    if (error) {
      console.error(error);
      setCartItems([]);
      setLoading(false);
      return;
    }

    const order = new Map(ids.map((id, index) => [String(id), index]));

    const orderedItems = [...(data || [])].sort(
      (a, b) => order.get(String(a.id)) - order.get(String(b.id)),
    );

    setCartItems(orderedItems);

    setLoading(false);
  };

  useEffect(() => {
    loadCart();

    return subscribeToCartChanges(loadCart);
  }, []);

  const handleRemove = (id) => {
    if (removingIds.includes(id)) return;

    setRemovingIds((prev) => [...prev, id]);

    setCartItems((prev) => prev.filter((item) => item.id !== id));

    setTimeout(() => {
      removeFromCart(id);

      setRemovingIds((prev) => prev.filter((item) => item !== id));

      loadCart();

      toast.success("دوره از سبد خرید حذف شد.");
    }, 350);
  };

  const handleCheckout = () => {
    toast.error("در حال حاضر پرداخت غیرفعال است.");
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0,
  );

  if (loading) {
    return <CartSkeleton />;
  }

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <section className="my-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">سبد خرید</h1>

        <p className="mt-2 opacity-70">
          دوره‌های انتخاب شده را بررسی و پرداخت کنید.
        </p>
      </div>

      <LayoutGroup>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left */}

          <div className="flex-1 gap-4 flex flex-col">
            <AnimatePresence mode="popLayout">
              {cartItems.map((course) => (
                <CartItem
                  key={course.id}
                  course={course}
                  onRemove={handleRemove}
                  isRemoving={removingIds.includes(course.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="lg:w-96">
            <CheckoutCard
              cartItems={cartItems}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </LayoutGroup>
    </section>
  );
}
