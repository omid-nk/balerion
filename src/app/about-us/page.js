import Link from "next/link";
import {
  LuRocket,
  LuCode,
  LuGraduationCap,
  LuShieldCheck,
} from "react-icons/lu";

export const metadata = {
  title: "درباره ما",
  description: "",
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden px-6 py-16">
      {/* Glow */}
      <div className="bg-primary/10 absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-5xl space-y-16">
        {/* HERO */}
        <section className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">درباره بالریون</h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500">
            ما در بالریون تلاش می‌کنیم آموزش برنامه‌نویسی را ساده، کاربردی و
            پروژه‌محور کنیم تا هر کسی بتواند وارد دنیای واقعی توسعه نرم‌افزار
            شود.
          </p>
        </section>

        {/* VALUES */}
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: LuGraduationCap,
              title: "آموزش محور",
              desc: "یادگیری بر اساس پروژه‌های واقعی",
            },
            {
              icon: LuCode,
              title: "محتوای کاربردی",
              desc: "تمرکز روی مهارت‌های بازار کار",
            },
            {
              icon: LuRocket,
              title: "رشد سریع",
              desc: "مسیر یادگیری کوتاه و هدفمند",
            },
            {
              icon: LuShieldCheck,
              title: "کیفیت بالا",
              desc: "بررسی و به‌روزرسانی مداوم محتوا",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-light/40 dark:bg-dark/40 border-border rounded-2xl border p-5 text-center shadow-xl backdrop-blur-xl"
              >
                <div className="text-primary mb-3 flex justify-center">
                  <Icon className="size-6" />
                </div>

                <h3 className="text-sm font-semibold">{item.title}</h3>

                <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
              </div>
            );
          })}
        </section>

        {/* STORY */}
        <section className="bg-light/60 dark:bg-dark/40 border-border rounded-3xl border p-8 shadow-xl backdrop-blur-xl">
          <h2 className="text-lg font-bold">داستان ما</h2>

          <p className="mt-3 text-sm leading-7 text-zinc-500">
            بالریون با هدف ایجاد یک مسیر یادگیری ساده برای برنامه‌نویسی شروع شد.
            ما باور داریم آموزش نباید پیچیده و خسته‌کننده باشد.
          </p>

          <p className="mt-3 text-sm leading-7 text-zinc-500">
            هدف ما تبدیل شدن به یک پلتفرم کامل آموزش برنامه‌نویسی در ایران است.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-lg font-semibold">آماده شروع یادگیری هستی؟</h3>

          <p className="mt-2 text-sm text-zinc-500">
            همین الان اولین دوره خودت رو شروع کن
          </p>

          <Link
            href="/courses"
            className="bg-primary hover:bg-primary/90 shadow-primary/20 mt-5 inline-flex items-center rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            مشاهده دوره‌ها
          </Link>
        </section>
      </div>
    </main>
  );
}
