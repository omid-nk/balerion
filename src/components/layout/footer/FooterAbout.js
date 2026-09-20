import { LuChartNoAxesGantt } from "react-icons/lu";

import ThemeToggle from "@/components/shared/ThemeToggle";

export default function FooterAbout() {
  return (
    <section className="p-2">
      <h3 className="mb-4 flex items-center gap-1 text-lg">
        <span className="text-primary">
          <LuChartNoAxesGantt />
        </span>
        درباره بالریون
        <span className="text-primary">
          <LuChartNoAxesGantt />
        </span>
      </h3>

      <p className="text-light/60 text-base/loose">
        شروع هر چیزی سخت است، اما وقتی مسیر درستی را انتخاب کنی می‌توانی با خیال
        راحت رشد کنی. در بالریون کنار شما هستیم تا برنامه‌نویسی را به شکلی
        کاربردی و پروژه‌محور یاد بگیرید.
      </p>

      <ThemeToggle />
    </section>
  );
}
