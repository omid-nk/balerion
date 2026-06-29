import ThemeSwitcher from "./ThemeSwitcher";

export default function FooterAbout() {
  return (
    <>
      <h3 className="mb-4 text-base font-bold">درباره بالریون</h3>

      <p className="text-light/70 text-sm leading-8">
        شروع هر چیزی سخت است، اما وقتی مسیر درستی را انتخاب کنی می‌توانی با خیال
        راحت رشد کنی. در بالریون کنار شما هستیم تا برنامه‌نویسی را به شکلی
        کاربردی و پروژه‌محور یاد بگیرید.
      </p>

      <div className="mt-6">
        <ThemeSwitcher />
      </div>
    </>
  );
}
