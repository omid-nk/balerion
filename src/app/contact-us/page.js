import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuClock,
  LuInstagram,
  LuSend,
  LuMessageSquare,
  LuArrowDown,
} from "react-icons/lu";

export default function Page() {
  const faqs = [
    {
      q: "چقدر طول می‌کشد تا سفارش ارسال شود؟",
      a: "تمام سفارش‌ها در سریع‌ترین زمان ممکن پردازش شده و معمولاً بین ۱ تا ۳ روز کاری ارسال می‌شوند.",
    },
    {
      q: "اگر محصول مشکل داشت چه کار کنم؟",
      a: "تا ۷ روز امکان مرجوعی و تعویض کالا طبق قوانین فروشگاه وجود دارد.",
    },
    {
      q: "پشتیبانی در چه ساعاتی پاسخگو است؟",
      a: "شنبه تا پنجشنبه از ساعت ۹ صبح تا ۹ شب.",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {/* Hero */}
      <section className="text-center">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-500">
          ارتباط با ما
        </span>

        <h1 className="mt-6 text-5xl font-black md:text-7xl">
          همیشه کنار
          <span className="text-primary"> شما</span>
          هستیم.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-500">
          اگر سوالی درباره سفارش، محصولات یا همکاری با بالریون دارید، تیم
          پشتیبانی ما آماده پاسخگویی است.
        </p>
      </section>

      {/* Contact Cards */}

      <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border dark:border-light/10 border-dark/10 p-7">
          <LuPhone className="text-primary mb-5" size={34} />

          <h3 className="text-xl font-bold">تماس تلفنی</h3>

          <p className="mt-3 text-zinc-500">021-12345678</p>
        </div>

        <div className="rounded-3xl border dark:border-light/10 border-dark/10 p-7">
          <LuMail className="text-primary mb-5" size={34} />

          <h3 className="text-xl font-bold">ایمیل</h3>

          <p className="mt-3 break-all text-zinc-500">support@balerion.ir</p>
        </div>

        <div className="rounded-3xl border dark:border-light/10 border-dark/10 p-7">
          <LuMapPin className="text-primary mb-5" size={34} />

          <h3 className="text-xl font-bold">آدرس</h3>

          <p className="mt-3 text-zinc-500 leading-7">
            تهران، خیابان آزادی، پلاک ۱۲۳
          </p>
        </div>

        <div className="rounded-3xl border dark:border-light/10 border-dark/10 p-7">
          <LuClock className="text-primary mb-5" size={34} />

          <h3 className="text-xl font-bold">ساعات کاری</h3>

          <p className="mt-3 text-zinc-500">۹ صبح تا ۹ شب</p>
        </div>
      </section>

      {/* Middle */}

      <section className="mt-24 grid gap-10 lg:grid-cols-2">
        {/* left */}

        <div className="rounded-4xl border dark:border-light/10 border-dark/10 p-10">
          <h2 className="text-3xl font-bold">راه‌های ارتباط</h2>

          <p className="mt-4 leading-8 text-zinc-500">
            سریع‌ترین راه ارتباط با تیم بالریون استفاده از تلگرام، واتساپ یا
            اینستاگرام است.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href="#"
              className="flex items-center justify-between rounded-2xl border dark:border-light/10 border-dark/10 p-5 transition hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <LuInstagram className="text-primary" />

                <div>
                  <p className="font-bold">اینستاگرام</p>

                  <span className="text-sm text-zinc-500">@balerion</span>
                </div>
              </div>

              <LuSend />
            </a>

            <a
              href="#"
              className="flex items-center justify-between rounded-2xl border dark:border-light/10 border-dark/10 p-5 transition hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <LuMessageSquare className="text-primary" />

                <div>
                  <p className="font-bold">تلگرام</p>

                  <span className="text-sm text-zinc-500">@balerion</span>
                </div>
              </div>

              <LuSend />
            </a>
          </div>
        </div>

        {/* Right */}

        <div className="rounded-4xl border  dark:border-light/10 border-dark/10 p-10">
          <h2 className="text-3xl font-bold">چرا بالریون؟</h2>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-900">
              <h3 className="text-4xl font-black text-primary">+500</h3>

              <p className="mt-2 text-zinc-500">محصول</p>
            </div>

            <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-900">
              <h3 className="text-4xl font-black text-primary">+3000</h3>

              <p className="mt-2 text-zinc-500">مشتری</p>
            </div>

            <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-900">
              <h3 className="text-4xl font-black text-primary">24/7</h3>

              <p className="mt-2 text-zinc-500">پشتیبانی</p>
            </div>

            <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-900">
              <h3 className="text-4xl font-black text-primary">★4.9</h3>

              <p className="mt-2 text-zinc-500">رضایت کاربران</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="mt-24">
        <h2 className="mb-10 text-center text-4xl font-black">سوالات متداول</h2>

        <div className="space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border dark:border-light/10 border-dark/10 p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                {faq.q}

                <LuArrowDown className="transition group-open:rotate-180" />
              </summary>

              <p className="mt-5 leading-8 text-zinc-500">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
