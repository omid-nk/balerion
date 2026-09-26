"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LuArrowRight,
  LuCheck,
  LuCreditCard,
  LuLoaderCircle,
  LuLockKeyhole,
} from "react-icons/lu";

import toast from "react-hot-toast";

import { clearCart } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function CheckoutPage() {
  const router = useRouter();

  const { courses, loading } = useCart();

  const [submitting, setSubmitting] = useState(false);

  const summary = courses.reduce(
    (acc, course) => {
      const price = Number(course.price) || 0;

      const discountPrice =
        course.discount_price !== null ? Number(course.discount_price) : null;

      const hasDiscount =
        price > 0 && discountPrice !== null && discountPrice < price;

      const finalPrice = hasDiscount ? discountPrice : price;

      acc.originalTotal += price;
      acc.total += finalPrice;

      return acc;
    },
    {
      originalTotal: 0,
      total: 0,
    },
  );

  const discount = summary.originalTotal - summary.total;

  async function handlePayment() {
    if (!courses.length || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const courseIds = courses.map((course) => course.id);

      const orderResponse = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseIds,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "ایجاد سفارش انجام نشد.");
      }

      const paymentResponse = await fetch("/api/checkout/test-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || "پرداخت انجام نشد.");
      }

      clearCart();

      router.push(`/checkout/success?order=${orderData.orderId}`);
    } catch (error) {
      console.error("handlePayment:", error);

      toast.error(error.message || "خطایی در پردازش سفارش رخ داد.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <LuLoaderCircle size={28} className="text-primary animate-spin" />
      </main>
    );
  }

  if (!courses.length) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-border flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed">
          <div className="text-center">
            <h1 className="text-lg font-bold">سبد خرید شما خالی است</h1>

            <p className="text-dark/45 dark:text-light/45 mt-2 text-sm">
              برای ادامه ابتدا یک دوره انتخاب کنید.
            </p>

            <Link
              href="/courses"
              className="bg-primary hover:bg-primary/90 mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors"
            >
              مشاهده دوره‌ها
              <LuArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}

      <header className="mb-10">
        <Link
          href="/profile/cart"
          className="text-dark/45 dark:text-light/45 hover:text-primary mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <LuArrowRight size={16} />
          بازگشت به سبد خرید
        </Link>

        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          پرداخت سفارش
        </h1>

        <p className="text-dark/45 dark:text-light/45 mt-2 text-sm">
          سفارش خود را بررسی کنید و پرداخت را انجام دهید.
        </p>
      </header>

      {/* Checkout */}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] xl:gap-16">
        {/* Order */}

        <section className="min-w-0">
          <div className="mb-5">
            <h2 className="text-lg font-bold">سفارش شما</h2>

            <p className="text-dark/40 dark:text-light/40 mt-1 text-sm">
              {formatPrice(courses.length)} دوره در این سفارش
            </p>
          </div>

          <div className="border-border divide-border divide-y rounded-2xl border">
            {courses.map((course) => {
              const price = Number(course.price) || 0;

              const discountPrice =
                course.discount_price !== null
                  ? Number(course.discount_price)
                  : null;

              const hasDiscount =
                price > 0 && discountPrice !== null && discountPrice < price;

              const finalPrice = hasDiscount ? discountPrice : price;

              return (
                <div
                  key={course.id}
                  className="flex items-center justify-between gap-6 px-5 py-5 sm:px-6"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <LuCheck size={17} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm leading-6 font-bold sm:text-[15px]">
                        {course.name}
                      </h3>

                      <p className="text-dark/40 dark:text-light/40 mt-1 text-xs">
                        دسترسی دائمی به دوره
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-left">
                    {hasDiscount && (
                      <div className="text-dark/35 dark:text-light/35 mb-1 text-xs line-through">
                        {formatPrice(price)}
                      </div>
                    )}

                    {finalPrice === 0 ? (
                      <span className="text-primary text-sm font-bold">
                        رایگان
                      </span>
                    ) : (
                      <div className="whitespace-nowrap">
                        <span className="text-sm font-bold">
                          {formatPrice(finalPrice)}
                        </span>

                        <span className="text-dark/40 dark:text-light/40 mr-1 text-[11px]">
                          تومان
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border-border rounded-xl border p-4">
              <p className="text-sm font-bold">دسترسی فوری</p>

              <p className="text-dark/40 dark:text-light/40 mt-1 text-xs leading-5">
                پس از پرداخت موفق، دوره‌ها به حساب شما اضافه می‌شوند.
              </p>
            </div>

            <div className="border-border rounded-xl border p-4">
              <p className="text-sm font-bold">دسترسی دائمی</p>

              <p className="text-dark/40 dark:text-light/40 mt-1 text-xs leading-5">
                پس از خرید می‌توانید هر زمان به دوره‌ها دسترسی داشته باشید.
              </p>
            </div>
          </div>
        </section>

        {/* Payment */}

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="border-border rounded-2xl border p-6 sm:p-7">
            {/* Payment header */}

            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">اطلاعات پرداخت</h2>

                <p className="text-dark/40 dark:text-light/40 mt-1 text-xs">
                  مبلغ نهایی سفارش
                </p>
              </div>

              <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-xl">
                <LuCreditCard size={21} />
              </div>
            </div>

            {/* Summary */}

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-dark/45 dark:text-light/45">
                  قیمت دوره‌ها
                </span>

                <span>{formatPrice(summary.originalTotal)} تومان</span>
              </div>

              {discount > 0 && (
                <div className="text-primary flex items-center justify-between gap-4 text-sm">
                  <span>تخفیف</span>

                  <span className="font-medium">
                    {formatPrice(discount)} تومان
                  </span>
                </div>
              )}

              <div className="border-border border-t pt-5">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-bold">مبلغ قابل پرداخت</span>

                  {summary.total === 0 ? (
                    <span className="text-primary text-xl font-black">
                      رایگان
                    </span>
                  ) : (
                    <div className="text-left">
                      <div>
                        <span className="text-primary text-2xl font-black">
                          {formatPrice(summary.total)}
                        </span>
                      </div>

                      <span className="text-dark/40 dark:text-light/40 text-xs">
                        تومان
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment method */}

            <div className="mt-7">
              <p className="mb-3 text-sm font-bold">روش پرداخت</p>

              <div className="border-primary bg-primary/[0.04] flex items-center gap-3 rounded-xl border p-4">
                <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg text-white">
                  <LuCreditCard size={17} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-bold">پرداخت آنلاین</p>

                  <p className="text-dark/40 dark:text-light/40 mt-1 text-[11px]">
                    پرداخت امن از طریق درگاه
                  </p>
                </div>

                <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-white">
                  <LuCheck size={13} />
                </div>
              </div>
            </div>

            {/* Button */}

            <button
              type="button"
              onClick={handlePayment}
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <LuLoaderCircle size={18} className="animate-spin" />
                  در حال پردازش...
                </>
              ) : (
                <>
                  <LuLockKeyhole size={17} />
                  پرداخت و ثبت سفارش
                </>
              )}
            </button>

            {/* Security */}

            <div className="text-dark/35 dark:text-light/35 mt-4 flex items-start justify-center gap-1.5 text-center text-[10px] leading-5">
              <LuLockKeyhole size={13} className="mt-0.5 shrink-0" />
              پرداخت شما به صورت امن پردازش خواهد شد.
            </div>

            <p className="text-dark/30 dark:text-light/30 mt-3 text-center text-[10px] leading-5">
              درگاه واقعی هنوز متصل نشده است و این پرداخت در حال حاضر برای تست
              فرآیند سفارش استفاده می‌شود.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
