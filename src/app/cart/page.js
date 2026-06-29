"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuBrackets, LuTrash2 } from "react-icons/lu";

import { getCart, removeFromCart, subscribeToCartChanges } from "@/lib/cart";
import { createClient } from "@/lib/supabase/client";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

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
      .select("id, name, slug, cover_url, price")
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
    removeFromCart(id);
    loadCart();
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0,
  );

  const isEmpty = !loading && cartItems.length === 0;

  if (loading) {
    return (
      <div className="my-20 text-center text-gray-500">در حال بارگذاری...</div>
    );
  }

  if (isEmpty) {
    return (
      <section className="my-12 flex flex-col items-center justify-center gap-2 rounded-3xl border px-6 py-16 text-center">
        <LuBrackets className="text-primary mb-2 text-5xl" />
        <h2 className="text-lg font-bold">سبد خرید شما خالی است</h2>
      </section>
    );
  }

  return (
    <section className="my-10">
      <h1 className="mb-8 text-2xl font-bold">سبد خرید</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Products */}
        <div className="flex-1 space-y-4">
          {cartItems.map((course) => (
            <div key={course.id} className="flex gap-4 rounded-3xl border p-4">
              <Link href={`/course/${course.slug}`}>
                <Image
                  src={course.cover_url}
                  width={180}
                  height={100}
                  alt={course.name}
                  className="h-28 w-44 rounded-2xl object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <Link href={`/course/${course.slug}`} className="font-bold">
                  {course.name}
                </Link>

                <div className="flex justify-between">
                  <span>
                    {Number(course.price) === 0
                      ? "رایگان"
                      : `${course.price.toLocaleString()} تومان`}
                  </span>

                  <button
                    onClick={() => handleRemove(course.id)}
                    className="text-red-500"
                  >
                    <LuTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout */}
        <aside className="lg:w-96">
          <div className="rounded-3xl border p-6">
            <h3 className="mb-6 font-bold">خلاصه سفارش</h3>

            <div className="flex justify-between">
              <span>تعداد</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="mt-2 flex justify-between font-bold">
              <span>قابل پرداخت</span>
              <span>{totalPrice.toLocaleString()} تومان</span>
            </div>

            <button className="bg-primary text-light mt-6 w-full rounded-2xl py-4">
              ادامه پرداخت
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
