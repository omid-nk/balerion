import { LuInstagram, LuYoutube, LuArrowLeft } from "react-icons/lu";
import Link from "next/link";

export default function SocialPromote() {
  return (
    <section className="*:dark:bg-dark my-6 flex flex-col justify-between gap-4 select-none *:flex-1 *:rounded-lg *:bg-white *:p-4 lg:flex-row">
      {/* instagram */}
      <div className="group flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="text-light flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-red-600 to-violet-600 p-1">
          <LuInstagram className="h-full w-full" />
        </div>
        <div className="bg-light rounded-xl px-6 py-4 dark:bg-zinc-950">
          <p className="text-dark/80 dark:text-light/80">تخفیف‌های روزانه در</p>
          <p className="font-morabba mt-2 text-xl font-black text-violet-700">
            صفحه اینستاگرام بالریون
          </p>
        </div>
        <Link
          href={"#"}
          className="bg-dark text-light flex items-center gap-1 rounded-sm px-1.5 py-0.5 transition-all group-hover:px-3 dark:bg-zinc-950"
        >
          <p>عضویت</p>
          <LuArrowLeft />
        </Link>
      </div>
      {/* youtube */}
      <div className="group flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="text-light flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-red-700 to-red-600 p-1">
          <LuYoutube className="h-full w-full" />
        </div>
        <div className="bg-light rounded-xl px-6 py-4 dark:bg-zinc-950">
          <p className="text-dark/80 dark:text-light/80">
            بروزترین نکات آموزشی
          </p>
          <p className="font-morabba mt-2 text-xl font-black text-red-600">
            کانال یوتیوب بالریون
          </p>
        </div>
        <Link
          href={"#"}
          className="bg-dark text-light flex items-center gap-1 rounded-sm px-1.5 py-0.5 transition-all group-hover:px-3 dark:bg-zinc-950"
        >
          <p>عضویت</p>
          <LuArrowLeft />
        </Link>
      </div>
    </section>
  );
}
