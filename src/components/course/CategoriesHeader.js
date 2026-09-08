import Breadcrumb from "@/components/shared/Breadcrumb";

export default function CategoriesHeader({ category }) {
  return (
    <header className="from-dark via-dark/95 to-dark text-light relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-b px-4 py-12 sm:px-6 sm:py-14 md:py-16">
      {/* Glow */}
      <div className="bg-primary/15 absolute -top-20 left-1/2 size-56 -translate-x-1/2 rounded-full blur-3xl sm:size-72" />

      <div className="bg-primary/10 absolute -right-20 -bottom-20 size-56 rounded-full blur-3xl sm:right-10 sm:size-72" />

      {/* Breadcrumb */}
      <div className="relative mb-6 flex w-full items-center justify-center self-start md:absolute md:top-6 md:right-6 md:mb-0 md:w-fit">
        <div className="bg-light dark:bg-dark rounded-full px-3 py-1 sm:px-4">
          <Breadcrumb
            items={[
              {
                title: "خانه",
                href: "/",
              },
              {
                title: "دوره‌ها",
                href: "/courses",
              },
              {
                title: category.name,
              },
            ]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
          دوره‌های {category.name}
        </h1>

        {/* Description */}
        <p className="text-light/60 mt-4 max-w-xl text-xs leading-7 sm:text-sm sm:leading-8">
          دوره‌های آموزشی مرتبط با {category.name} را مشاهده و یادگیری خود را
          شروع کنید.
        </p>
      </div>
    </header>
  );
}
