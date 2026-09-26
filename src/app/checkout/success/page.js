import Link from "next/link";

import { LuArrowLeft, LuCircleCheck } from "react-icons/lu";

export default async function CheckoutSuccessPage({ searchParams }) {
  const params = await searchParams;

  const orderId = params?.order;

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full text-center">
        <div className="bg-primary/10 text-primary mx-auto flex size-16 items-center justify-center rounded-full">
          <LuCircleCheck size={32} />
        </div>

        <h1 className="mt-5 text-xl font-bold">سفارش با موفقیت ثبت شد</h1>

        <p className="text-dark/50 dark:text-light/50 mx-auto mt-3 max-w-md text-sm leading-7">
          پرداخت تستی با موفقیت انجام شد و دوره‌های خریداری‌شده به حساب شما
          اضافه شدند.
        </p>

        {orderId && (
          <p className="text-dark/40 dark:text-light/40 mt-4 text-xs">
            شماره سفارش: {orderId}
          </p>
        )}

        <Link
          href="/profile/my-courses"
          className="bg-primary hover:bg-primary/90 mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors"
        >
          مشاهده دوره‌های من
          <LuArrowLeft size={17} />
        </Link>
      </div>
    </main>
  );
}
