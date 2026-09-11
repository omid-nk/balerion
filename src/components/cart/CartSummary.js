"use client";

import Link from "next/link";
import { LuArrowLeft, LuShoppingCart, LuTrash2 } from "react-icons/lu";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function CartSummary({ courses, onClear }) {
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

  return (
    <aside className="bg-light dark:bg-dark h-fit rounded-xl p-5">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
          <LuShoppingCart size={18} />
        </div>

        <h2 className="text-base font-bold">خلاصه سفارش</h2>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-dark/50 dark:text-light/50">تعداد دوره</span>

          <span className="font-medium">{formatPrice(courses.length)}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-dark/50 dark:text-light/50">قیمت دوره‌ها</span>

          <span>{formatPrice(summary.originalTotal)} تومان</span>
        </div>

        {discount > 0 && (
          <div className="text-primary flex items-center justify-between gap-3">
            <span>تخفیف</span>

            <span>{formatPrice(discount)} تومان</span>
          </div>
        )}

        <div className="border-dark/10 dark:border-light/10 border-t pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="font-bold">مبلغ قابل پرداخت</span>

            <div className="text-left">
              {summary.total === 0 ? (
                <span className="text-primary text-lg font-bold">رایگان</span>
              ) : (
                <span className="text-primary text-lg font-bold">
                  {formatPrice(summary.total)}
                  <span className="mr-1 text-xs font-normal">تومان</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <Link
          href="/checkout"
          className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-colors"
        >
          ادامه و پرداخت
          <LuArrowLeft size={17} />
        </Link>

        <button
          type="button"
          onClick={onClear}
          className="text-alert hover:bg-alert/10 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs transition-colors"
        >
          <LuTrash2 size={15} />
          حذف همه دوره‌ها
        </button>
      </div>
    </aside>
  );
}
